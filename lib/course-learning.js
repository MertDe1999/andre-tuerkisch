/* Course progression and replayable generated tasks. Browser-only persistence. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports;
 const W=node?require('../data/words'):root.AndreWords,T=node?require('./turkish'):root.Turkish,B=node?require('./building-blocks'):root.TurkishBlocks;
 const C=node?require('./course'):root.AndreCourse,G=node?require('./course-grammar'):root.AndreCourseGrammar,Old=node?require('./learning'):root.AndreLearning;
 const LegacyCourse=node?require('./curriculum'):root.AndreCurriculum;
 const KEY='andreTurkishSentenceCourseV3';
 const fresh=()=>({...Old.empty(),version:3,opened:1,standard:false,mastery:{},coreVersion:1});
 const integer=(x,low,high)=>Math.min(high,Math.max(low,Number.isInteger(x)?x:low));
 class Engine extends Old.Engine{
  constructor(options={}){super(options);this.grammar=new G.Manager(this.storage);this.poolKey='';this.pool=[];this.state=this.loadCourse();if(this.state.current)G.register(this.state.current.task);this.save();}
  loadCourse(){const saved=this.read(KEY);if(saved?.version===3){const s={...fresh(),...saved};s.level=integer(s.level,1,160);s.highestLevel=integer(s.highestLevel,s.level,160);s.opened=Math.max(Math.ceil(s.highestLevel/5),integer(s.opened,1,32));s.standard=s.standard===true||s.highestLevel>=81;s.mastery=s.mastery&&typeof s.mastery==='object'?s.mastery:{};s.current=this.validCurrent(s.current)?s.current:null;if(s.current)s.current.tokens=s.current.tokens.map(Old.cleanToken).filter(Boolean);return s;}
   const previous=this.read(Old.KEY),s=fresh();if(previous?.version===2){s.level=integer(previous.level,1,160);s.highestLevel=integer(previous.highestLevel,s.level,160);s.opened=Math.ceil(s.highestLevel/5);s.standard=s.highestLevel>=81;s.completed=integer(previous.completed,0,Number.MAX_SAFE_INTEGER);s.words=previous.words||{};s.legacy={level:s.level,previousVersion:2};
    const clean=Old.cleanState(previous),cur=clean.current,original=LegacyCourse.tasks.find(t=>t.id===cur?.taskId);
    if(original&&!cur.finished){const task=LegacyCourse.forLevel(original,cur.levelAtStart);task.uses=C.uses(task.groups.flatMap(g=>g.slots),C.bandAt(task.min).index+1);s.current={...cur,task};}
   }
   return s;
  }
  validCurrent(cur){try{return cur&&cur.task?.groups?.length&&cur.task.groups.every(g=>g.slots.length&&g.slots.every(s=>W.byId[s.lemma]&&T.surface(s)))&&Array.isArray(cur.tokens)&&cur.tokens.every(t=>W.byId[t.lemma]);}catch{return false;}}
  save(){if(!this.state||this.state.version!==3)return true;try{this.storage.setItem(KEY,JSON.stringify(this.state));this.storageError='';return true;}catch{this.storageError='Der Browser konnte den Lernstand nicht speichern.';return false;}}
  unlocked(){const raw=this.read(Old.UNLOCK)||{};return new Set(W.words.filter(w=>{const p=raw[w.id]||raw[T.norm(w.tr)];return p?.toTurkish===true&&p?.toGerman===true;}).map(w=>w.id));}
  task(){return this.state.current?.task||null;}
  refreshPool(){const words=this.unlocked(),batch=Math.floor(this.state.completed/20),signature=[...words].sort().join(',')+'|'+this.state.opened+'|'+this.state.standard+'|'+batch;if(signature===this.poolKey)return;
   this.poolKey=signature;const end=C.bands[this.state.opened-1].end;
   this.pool=C.tasks.filter(t=>t.min<=end&&t.requires.every(id=>words.has(id))).flatMap(t=>C.variants(C.forLevel(t,this.state.level,{standard:this.state.standard}),words));
   this.pool.push(...C.generate({words,section:this.state.opened,standard:this.state.standard,seed:this.state.opened*1531+batch*7919,limit:100}));
   for(const t of this.pool)G.register(t);
  }
  available(){this.refreshPool();const known=this.grammar.unlocked();return this.pool.filter(t=>G.canTask(t,known));}
  stat(kind,id){return this.state[kind][id]||=( {correct:0,errors:0,families:[],stage:-1,dueAt:0,dueSequence:0,errorSequence:0,lastAdvanceDay:'',lastSeen:0});}
  bandReady(band){return G.core[band.index].every(id=>this.grammar.state.unlocked[id]&&(this.state.mastery[band.id+':'+G.goal(id)]?.length||0)>=2);}
  missingSkills(){const band=C.bands[this.state.opened-1];return G.core[band.index].filter(id=>(this.state.mastery[band.id+':'+G.goal(id)]?.length||0)<2).map(id=>G.byId[id]);}
  missingWords(){const known=this.unlocked(),current=this.state.current;return current&&!current.finished?current.task.requires.filter(id=>!known.has(id)).map(id=>W.byId[id]):C.bands.slice(0,this.state.opened).flatMap(s=>s.words).map(tr=>W.byLemma[tr]).filter(w=>w&&!known.has(w.id));}
  missingGrammar(){this.refreshPool();const known=this.grammar.unlocked(),band=C.bandAt(this.state.level),current=this.state.current;const ids=current&&!current.finished?G.required(current.task):G.core[band.index];return ids.filter(id=>!known.has(id)).map(id=>G.byId[id]).filter(Boolean);}
  begin(task,kind='current',target=null){const cur=super.begin(task,kind,target);cur.task=C.copy(task);cur.tokens=cur.tokens.map(Old.cleanToken);cur.assisted=false;this.save();return cur;}
  next(){const current=this.state.current,words=this.unlocked(),known=this.grammar.unlocked();
   if(current&&!current.finished){if(current.task.requires.every(id=>words.has(id))&&G.canTask(current.task,known)){
     current.tokens=current.tokens.filter(t=>words.has(t.lemma));
     for(const token of current.tokens)if(!B.plan(token).every(op=>known.has(G.key(op)))){token.features=B.baseFeatures(token.lemma);delete token.form;delete token.attachments;}
     this.save();return current;
    }return null;}
   const all=this.available();if(!all.length){this.state.current=null;this.save();return null;}
   const band=C.bandAt(this.state.level),needed=this.missingSkills().map(e=>e.id);
   if(!all.some(t=>t.band===band.id)||(this.state.level===band.end&&G.core[band.index].some(id=>!known.has(id)))){this.state.current=null;this.save();return null;}
   const currentPool=all.filter(t=>t.band===band.id||G.required(t).some(id=>needed.includes(id)));
   const older=all.filter(t=>t.min<band.start),dueTargets=t=>[...t.requires.filter(id=>this.state.words[id]&&this.due(this.state.words[id])),...G.required(t).filter(id=>this.state.skills[id]&&this.due(this.state.skills[id]))];
   const counts={current:0,targeted:0,older:0},weak={};for(const item of this.state.block){counts[item.kind]=(counts[item.kind]||0)+1;if(item.kind==='targeted')weak[item.target]=(weak[item.target]||0)+1;}
   const targeted=all.filter(t=>dueTargets(t).some(id=>(weak[id]||0)<6)),pools={current:currentPool,targeted,older},targets={current:12,targeted:5,older:3};
   let kind=Object.keys(pools).filter(k=>pools[k].length).sort((a,b)=>(targets[b]-counts[b])-(targets[a]-counts[a]))[0]||'older',pool=pools[kind];if(!pool?.length)pool=all;
   const freshGoal=(id,t)=>needed.includes(id)&&!(this.state.mastery[band.id+':'+G.goal(id)]||[]).includes(t.answer);
   if(kind==='current'&&this.state.level===band.end){const pending=pool.filter(t=>G.required(t).some(id=>freshGoal(id,t)));if(pending.length)pool=pending;}
   const seenCases=new Set(this.state.block.flatMap(x=>x.cases||[])),cases=['bare','accusative','dative','locative','ablative','genitive'],missing=cases.filter(c=>!seenCases.has(c)&&all.some(t=>t.cases.includes(c)));
   if(this.state.level>=40&&missing.length&&20-this.state.block.length<=missing.length){pool=all.filter(t=>t.cases.includes(missing[0]));kind='older';}
   const task=this.pick(pool,t=>1+G.required(t).filter(id=>freshGoal(id,t)).length*4+(t.person?2/(1+(this.state.people[t.person]||0)):0));
   return this.begin(task,kind,kind==='targeted'?dueTargets(task).find(id=>(weak[id]||0)<6):null);
  }
  check({unknown=false}={}){const cur=this.state.current;if(!cur||cur.finished)return {ignored:true};const task=cur.task,known=this.grammar.unlocked(),words=this.unlocked();
   if(!task.requires.every(id=>words.has(id))||!G.canTask(task,known)||cur.tokens.some(t=>!words.has(t.lemma)))return {ignored:true,needsGrammar:true};
   const result=unknown?{correct:false,issue:{area:'grammar',skill:task.skills[0]}}:Old.evaluate(task,cur.tokens);
   const direct=!cur.rated&&!cur.assisted&&cur.attempts===0;cur.attempts++;let delta=0;
   if(result.correct){cur.finished=true;this.state.completed++;
    for(const id of G.required(task)){this.success('skills',id,task.family,direct);if(direct&&G.byId[id]){const goal=C.bandAt(this.state.level).id+':'+G.goal(id),mastered=this.state.mastery[goal]||=[];if(!mastered.includes(task.answer))mastered.push(task.answer);this.state.mastery[goal]=mastered.slice(-4);}}
    for(const id of task.requires)this.success('words',id,task.family,direct);
   }else{const id=result.issue.expected||G.required(task)[0],kind=result.issue.expected?'words':'skills';if(id){const stat=this.stat(kind,id);stat.errors++;stat.stage=0;stat.errorSequence=this.state.completed+4+Math.floor(this.random()*3);}}
   if(!cur.rated){cur.rated=true;cur.firstOutcome=result.correct?'correct':'wrong';if(direct&&cur.kind==='current'){
     const band=C.bandAt(this.state.level);delta=result.correct?(this.state.level<band.end||this.bandReady(band)?1:0):-1;
     const next=Math.max(1,Math.min(160,this.state.level+delta));delta=next-this.state.level;this.state.level=next;this.state.highestLevel=Math.max(this.state.highestLevel,next);
     this.state.opened=Math.max(this.state.opened,Math.ceil(next/5));if(next>=81)this.state.standard=true;
    }}
   const last=this.state.block.at(-1);if(last?.taskId===task.id)last.cases=task.cases;
   this.save();return {...result,delta,direct,level:this.state.level,kind:cur.kind};
  }
  hint(){const cur=this.state.current;if(!cur)return null;cur.assisted=true;cur.rated=true;cur.firstOutcome='help';this.save();return 'Lösung: '+cur.task.answer;}
  coverageReport(items=this.state.block){const eligible=['bare','accusative','dative','locative','ablative','genitive'].filter(c=>this.available().some(t=>t.cases.includes(c))),covered=[...new Set(items.flatMap(x=>x.cases||[]))];return {count:items.length,covered,missing:eligible.filter(c=>!covered.includes(c)),mix:items.reduce((m,x)=>(m[x.kind]=(m[x.kind]||0)+1,m),{})};}
 }
 const api={...Old,Engine,KEY};if(node)module.exports=api;else root.AndreCourseLearning=api;
})(typeof globalThis==='object'?globalThis:this);
