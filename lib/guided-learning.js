/* Sentence-led rounds, persistent frontier and temporary practice permissions. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports;
 const Old=node?require('./course-learning'):root.AndreCourseLearning,C=node?require('./course'):root.AndreCourse,G=node?require('./course-grammar'):root.AndreCourseGrammar,I=node?require('./interest-generator'):root.AndreInterestGenerator,W=node?require('../data/words'):root.AndreWords,B=node?require('./building-blocks'):root.TurkishBlocks,P=node?require('./learning-path'):root.AndreLearningPath;
 const requireSurface=node?require('./turkish').surface:root.Turkish.surface;
 const KEY='andreGuidedPathV1',THEMES=I.themes.map(t=>t.id),THRESHOLD=.8;
 class Engine extends Old.Engine{
  constructor(options={}){super(options);const saved=this.read(KEY);this.flow=saved?.version===1&&saved.completed&&typeof saved.completed==='object'?saved:{version:1,level:1,frontier:1,completed:{},round:null};
   if(!saved){this.state.previousSentenceLevel||={level:this.state.level,highestLevel:this.state.highestLevel,opened:this.state.opened};const known=this.grammar.unlocked();for(const lesson of P.lessons){if(lesson.targets.some(id=>!known.has(id))||P.wordIds(lesson.level).some(id=>!this.unlocked().has(id)))break;this.flow.completed[lesson.level]=true;this.flow.frontier=Math.min(160,lesson.level+1);}this.flow.level=this.flow.frontier;if(this.flow.completed[160])this.flow.finished=true;}
   this.flow.level=Math.max(1,Math.min(160,Number(this.flow.level)||1));this.flow.frontier=Math.max(this.flow.level,Math.min(160,Number(this.flow.frontier)||1));if(this.flow.round&&(!Array.isArray(this.flow.round.items)||!this.flow.round.counts||!Array.isArray(this.flow.round.seen)))this.flow.round=null;if(this.state.current&&!this.state.current.finished&&this.state.current.roundLevel===undefined){this.state.current.roundLevel=this.flow.level;this.state.current.direction='tr';this.state.current.roundTheme=this.state.selectedTheme||THEMES[0];this.state.current.kind='intro';this.state.current.draft='';}
   this.syncProgress();this.save();
  }
  requiredFor(task){this._grammarCache||=new WeakMap();if(!this._grammarCache.has(task))this._grammarCache.set(task,G.required(task));return this._grammarCache.get(task);}
  canTask(task,known){return this.requiredFor(task).every(id=>known.has(id));}
  syncProgress(){if(!this.flow)return;this.state.level=this.flow.level;this.state.highestLevel=this.flow.frontier;this.state.opened=Math.ceil(this.state.level/5);this.state.standard=this.flow.frontier>=81;this.progress={level:this.state.level,cefr:C.bandAt(this.state.level).cefr,section:this.state.opened};return this.progress;}
  save(){const ok=super.save();if(this.flow)try{this.storage.setItem(KEY,JSON.stringify(this.flow));}catch{this.storageError='Der Browser konnte die Runde nicht speichern.';return false;}return ok;}
  unlocked(){return new Set([...super.unlocked(),...P.auto]);}
  lesson(){return P.at(this.flow?.level||1);}
  preparationLevel(){return this.flow.frontier;}
  missingWords(){const known=this.unlocked();return P.wordIds(this.preparationLevel()).filter(id=>!known.has(id)).map(id=>W.byId[id]);}
  wordsReady(){return !this.missingWords().length;}
  practiceGrammar(){const known=this.grammar.unlocked(),lesson=this.lesson();if(!this.wordsReady())return known;lesson.allowed.forEach(id=>known.add(id));
   const concepts=new Set(P.lessons.slice(0,lesson.level).flatMap(l=>l.targets).map(id=>G.byId[id]).filter(Boolean).map(e=>e.group+'|'+e.label));
   for(const e of G.entries)if(e.min<=C.bands[lesson.band-1].end&&concepts.has(e.group+'|'+e.label))known.add(e.id);
   return known;
  }
  recordGrammar(counts){this.flow.grammarEvidence||={};for(const [id,forms] of Object.entries(counts)){if(this.grammar.state.unlocked[id])continue;const saved=this.flow.grammarEvidence[id]||={tr:[],de:[]};for(const d of ['tr','de'])saved[d]=[...new Set([...saved[d],...forms[d]])].slice(-3);this.grammar.state.counts[id]={tr:saved.tr.length,de:saved.de.length,seen:[...new Set([...saved.tr,...saved.de])].slice(-6)};if(saved.tr.length>=3&&saved.de.length>=3)this.grammar.state.unlocked[id]=true;}this.grammar.save();}
  missingGrammar(){return this.lesson().targets.filter(id=>!this.grammar.state.unlocked[id]).map(id=>G.byId[id]);}
  missingSkills(){return this.missingGrammar();}
  refreshPool(){super.refreshPool();const signature=this.poolKey; if(this.guidedPoolKey===signature)return;this.guidedPoolKey=signature;const words=this.unlocked(),known=this.practiceGrammar();
   const generated=I.generate({words,section:this.state.opened,standard:this.state.standard,seed:this.state.started*331+this.state.completed*7919+this.state.level*997,perTheme:8,allow:t=>this.canTask(t,known)});generated.forEach(t=>G.register(t));this.pool.push(...generated);
   for(const goal of this.requirements()){let examples=this.pool.filter(t=>this.requiredFor(t).includes(goal)&&this.canTask(t,known));if(new Set(examples.map(t=>t.answer)).size>=3)continue;
    const refs=G.byId[goal]?.examples.map(x=>x.task).filter(t=>t.min<=C.bandAt(this.state.level).end&&t.requires.every(id=>words.has(id))&&this.canTask(t,known))||[];
    for(const t of refs){const variants=C.variants(C.forLevel(t,this.state.level,{standard:this.state.standard}),words,{interests:true});for(const v of variants){G.register(v);if(this.canTask(v,known)&&this.requiredFor(v).includes(goal))this.pool.push(v);}}
    examples=this.pool.filter(t=>this.requiredFor(t).includes(goal)&&this.canTask(t,known));if(new Set(examples.map(t=>t.answer)).size<3&&examples.length){const source=examples[0];for(const name of [W.byLemma.mert,W.byLemma.andré].filter(Boolean)){const t=C.copy(source);t.ast=undefined;t.groups[0].slots.unshift({lemma:name.id,features:{}});t.requires=[...new Set([...t.requires,name.id])];t.de=name.deGrammar.singular+', '+t.de[0].toLocaleLowerCase('de-DE')+t.de.slice(1);t.answer=t.groups.flatMap(g=>g.slots).map(s=>requireSurface(s)).join(' ');t.id+=':address:'+name.id;t.family=t.id;G.register(t);this.pool.push(t);}}
   }
  }
  available(){if(!this.wordsReady())return [];this.refreshPool();const known=this.practiceGrammar();return this.pool.filter(t=>this.canTask(t,known));}
  round(){if(!this.flow.round||this.flow.round.level!==this.flow.level)this.flow.round={level:this.flow.level,intro:0,items:[],counts:{},seen:[],serial:0};return this.flow.round;}
  requirements(){return this.lesson().targets.filter(id=>!this.grammar.state.unlocked[id]);}
  need(){const round=this.round();return this.requirements().flatMap(id=>['tr','de'].filter(d=>(round.counts[id]?.[d]?.length||0)<3).map(d=>({id,d})));}
  roundSummary(){const r=this.round(),rated=r.items.filter(x=>!x.practice);return {done:rated.length,total:46,correct:rated.filter(x=>x.direct).length,topics:THEMES.map(id=>({id,tr:r.items.some(x=>x.theme===id&&x.direction==='tr'&&!x.practice),de:r.items.some(x=>x.theme===id&&x.direction==='de'&&!x.practice)})),level:this.flow.level,result:r.result||null};}
  selectTheme(id){if(this.state.current&&!this.state.current.finished){this.state.themeTasks||={};this.state.themeTasks[this.state.selectedTheme||'mixed']=this.state.current;}this.state.selectedTheme=THEMES.includes(id)?id:null;this.state.current=this.state.themeTasks?.[this.state.selectedTheme||'mixed']||null;this.poolKey='';this.save();}
  begin(task,kind='current',target=null){const cur=super.begin(task,kind,target);cur.roundLevel=this.flow.level;cur.direction='tr';cur.roundTheme=this.state.selectedTheme||task.primaryTheme||THEMES[0];cur.free=this.flow.finished===true;cur.draft='';this.save();return cur;}
  next(){this.syncProgress();if(!this.wordsReady())return null;if(this.flow.finished){const old=this.state.current;if(old&&!old.finished&&old.free)return old;const pool=this.available().filter(t=>!this.state.selectedTheme||t.themes?.includes(this.state.selectedTheme)||t.primaryTheme===this.state.selectedTheme);if(!pool.length)return null;const fresh=pool.filter(t=>!(this.state.recentAnswers||[]).includes(t.answer)),t=(fresh.length?fresh:pool)[Math.floor(this.random()*(fresh.length||pool.length))];this.state.recentAnswers=[...(this.state.recentAnswers||[]),t.answer].slice(-100);const cur=this.begin(t,'older');cur.free=true;cur.direction=this.state.completed%2?'de':'tr';cur.roundLevel=160;cur.draft='';this.save();return cur;}const r=this.round(),cur=this.state.current;
   if(cur&&!cur.finished&&cur.roundLevel===r.level&&cur.task.requires.every(id=>this.unlocked().has(id))&&this.canTask(cur.task,this.practiceGrammar()))return cur;
   const all=this.available();if(!all.length)return null;
   const pending=THEMES.flatMap(theme=>['tr','de'].filter(direction=>!r.items.some(x=>x.theme===theme&&x.direction===direction&&!x.practice)).map(direction=>({theme,direction})));
   let slot=pending.find(x=>x.theme===this.state.selectedTheme)||pending[0],practice=false,need=null;
   if(r.intro<2)slot={theme:this.state.selectedTheme||pending[0]?.theme||THEMES[0],direction:'tr',intro:true};
   else if(this.state.selectedTheme&&!pending.some(x=>x.theme===this.state.selectedTheme)&&pending.length){slot={theme:this.state.selectedTheme,direction:'tr'};practice=true;}
   else if(!slot){need=this.need()[0];slot={theme:this.state.selectedTheme||THEMES[r.serial%THEMES.length],direction:need?.d||'tr'};}
   let choices=all.filter(t=>t.primaryTheme===slot.theme||t.themes?.includes(slot.theme));
   if(need){const focused=all.filter(t=>this.requiredFor(t).includes(need.id)&&!r.counts[need.id]?.[need.d]?.includes(t.answer));if(focused.length)choices=focused;}
   const goals=new Set(this.requirements()),focused=choices.filter(t=>this.requiredFor(t).some(id=>goals.has(id)));if(focused.length)choices=focused;
   if(!choices.length)return null;const unseen=choices.filter(t=>!r.seen.includes(t.answer));if(unseen.length)choices=unseen;
   const t=this.pick(choices,t=>1+(t.min>=C.bandAt(this.flow.level).start?3:0)+Math.min(4,[...t.requires.map(id=>this.state.words[id]),...this.requiredFor(t).map(id=>this.state.skills[id])].filter(s=>s&&this.due(s)).length)),next=this.begin(t,slot.intro?'intro':practice?'older':'current');next.direction=slot.direction;next.roundLevel=r.level;next.roundTheme=slot.theme;next.practice=practice;next.draft='';next.focusGoal=need?.id||null;r.serial++;r.seen.push(t.answer);r.seen=r.seen.slice(-100);this.save();return next;
  }
  check({unknown=false,answer}={}){const cur=this.state.current;if(!cur||cur.finished)return {ignored:true};if(cur.roundLevel!==this.flow.level||!this.wordsReady())return {ignored:true};
   const task=cur.task,known=this.practiceGrammar();if(!this.canTask(task,known)||!task.requires.every(id=>this.unlocked().has(id)))return {ignored:true,needsGrammar:true};
   const result=cur.direction==='de'?{correct:!unknown&&[task.de,...(task.deAlternatives||[])].some(a=>G.alternatives(a,'de').includes(G.norm(answer??cur.draft,'de'))),issue:{area:'grammar'}}:unknown?{correct:false,issue:{area:'grammar'}}:Old.evaluate(task,cur.tokens);
   const direct=!cur.rated&&!cur.assisted&&cur.attempts===0;cur.attempts++;let transition=null;
   if(!cur.rated){cur.rated=true;cur.firstOutcome=result.correct&&direct?'correct':cur.assisted?'help':'wrong';}
   if(result.correct||unknown){cur.finished=true;this.state.completed++;const r=this.round();
    if(cur.free){if(result.correct&&cur.firstOutcome==='correct')this.recordGrammar(Object.fromEntries(this.requiredFor(task).map(id=>[id,{tr:cur.direction==='tr'?[task.answer]:[],de:cur.direction==='de'?[task.answer]:[]}])));}else if(cur.kind==='intro')r.intro++;
    else{const success=result.correct&&cur.firstOutcome==='correct';r.items.push({id:cur.id,theme:cur.roundTheme,direction:cur.direction,answer:task.answer,direct:success,practice:cur.practice===true});
     if(success&&!cur.practice)for(const id of this.requiredFor(task)){const count=r.counts[id]||={tr:[],de:[]};if(!count[cur.direction].includes(task.answer))count[cur.direction].push(task.answer);}
     if(!cur.practice)transition=this.finishRound();
    }
    this.state.themeTasks||={};for(const [key,x] of Object.entries(this.state.themeTasks))if(x.id===cur.id)delete this.state.themeTasks[key];
   }
   if(result.correct){for(const id of task.requires)this.success('words',id,task.family,cur.firstOutcome==='correct');for(const id of this.requiredFor(task))this.success('skills',id,task.family,cur.firstOutcome==='correct');}else{const id=this.requiredFor(task)[0];if(id){const s=this.stat('skills',id);s.errors++;s.stage=0;s.errorSequence=this.state.completed+4;}}
   this.syncProgress();this.save();return {...result,direct:direct&&result.correct,delta:transition?.delta||0,level:this.flow.level,transition,kind:cur.kind};
  }
  finishRound(){const r=this.round(),coverage=THEMES.every(theme=>['tr','de'].every(direction=>r.items.some(x=>x.theme===theme&&x.direction===direction&&!x.practice)));if(!coverage)return null;
   const items=r.items.filter(x=>!x.practice),accuracy=items.filter(x=>x.direct).length/items.length,limit=46+Math.max(18,this.requirements().length*8);
   if(accuracy>=THRESHOLD&&this.need().length&&items.length<limit)return null;
   const unmet=this.need(),pass=accuracy>=THRESHOLD&&!unmet.length,old=this.flow.level;
   if(pass){this.recordGrammar(r.counts);
    this.grammar.save();this.flow.completed[old]=true;this.flow.level=Math.min(160,old+1);this.flow.frontier=Math.max(this.flow.frontier,this.flow.level);if(old===160)this.flow.finished=true;
   }else this.flow.level=Math.max(1,old-1);
   const report={pass,reason:pass?null:accuracy<THRESHOLD?'accuracy':'forms',need:unmet.map(x=>x.id),correct:items.filter(x=>x.direct).length,total:items.length,from:old,to:this.flow.level,delta:this.flow.level-old};this.flow.lastRound=report;this.flow.round=null;this.state.themeTasks={};this.poolKey='';this.save();return report;
  }
  hint(){const cur=this.state.current;if(!cur)return null;cur.assisted=true;this.save();return cur.direction==='de'?cur.task.de:cur.task.answer;}
 }
 const api={...Old,Engine,PATH_KEY:KEY,THRESHOLD};if(node)module.exports=api;else root.AndreCourseLearning=api;
})(typeof globalThis==='object'?globalThis:this);
