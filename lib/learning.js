/* Persistent task state, first-attempt rating and spaced retrieval. No background work. */
(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const W=node?require('../data/words.js'):root.AndreWords;
  const T=node?require('./turkish.js'):root.Turkish;
  const B=node?require('./building-blocks.js'):root.TurkishBlocks;
  const C=node?require('./curriculum.js'):root.AndreCurriculum;
  const KEY='andreTurkishSentenceLearningV2', UNLOCK='andreTurkishUnlockProgressV1', LEGACY='andreTurkishSentenceLearningV1';
  const day=stamp=>{const d=new Date(stamp);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
  const tomorrow=stamp=>{const d=new Date(stamp);d.setHours(0,0,0,0);d.setDate(d.getDate()+1);return d.getTime();};
  const count=(n,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=0?Math.min(n,max):0;
  const obj=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
  const lemmaKey=text=>String(text||'').normalize('NFC').trim().toLocaleLowerCase('tr-TR');
  const knownTask=new Map(C.tasks.map(t=>[t.id,t]));
  const cases=['bare','accusative','dative','locative','ablative','genitive'];
  function empty(){return {version:2,level:1,highestLevel:1,completed:0,started:0,introduced:[],words:{},skills:{},people:{},current:null,block:[],lastBlock:null,history:[],legacy:null};}
  function cleanStat(value={}){
    return {correct:count(value.correct),errors:count(value.errors),families:Array.isArray(value.families)?[...new Set(value.families.filter(x=>knownTask.has(x)))].slice(-30):[],
      stage:Number.isInteger(value.stage)?Math.max(-1,Math.min(5,value.stage)):-1,dueAt:count(value.dueAt),dueSequence:count(value.dueSequence),
      errorSequence:count(value.errorSequence),lastAdvanceDay:typeof value.lastAdvanceDay==='string'?value.lastAdvanceDay.slice(0,10):'',lastSeen:count(value.lastSeen)};
  }
  function cleanToken(token){
    if(!obj(token)||!W.byId[token.lemma]||!obj(token.features)) return null;
    const features={};
    const values={case:['bare','accusative','dative','locative','ablative','genitive','instrumental'],poss:T.people,person:T.people,predicatePerson:T.people,
      tense:['infinitive','present','past','reported','future','aorist','necessity','conditional','imperative','optative','ma','dik','acak','an','ip','ince','arak','madan','ken'],
      voice:['active','passive','reflexive','reciprocal','causative'],register:['standard','colloquial']};
    for(const [key,value] of Object.entries(token.features)){
      if(['plural','negative','question','ability','past'].includes(key)&&typeof value==='boolean') features[key]=value;
      else if(values[key]?.includes(value)) features[key]=value;
    }
    if(features.voice==='active') delete features.voice;
    const text=value=>typeof value==='string'&&value.length<=160&&/^[a-zçğıöşüİı ]+$/i.test(value)?value:null;
    const attachments=Array.isArray(token.attachments)?token.attachments.slice(0,12).flatMap(part=>{
      if(!obj(part)||!['verb','plural','poss','case','predicate'].includes(part.stage)||!obj(part.features))return [];
      const clean=cleanToken({lemma:token.lemma,features:part.features});
      const block=typeof part.block==='string'&&part.block.length<=160&&/^-?[a-zçğıöşüİı ]+$/i.test(part.block)?{block:part.block}:{};
      return [{stage:part.stage,features:clean.features,form:text(part.form),...block}];
    }):[];
    return {id:String(token.id||'').slice(0,80),lemma:token.lemma,features,nominal:token.nominal===true,form:text(token.form),attachments,
      ...(T.people.includes(token.nominalPerson)?{nominalPerson:token.nominalPerson}:{}),group:typeof token.group==='string'?token.group.slice(0,30):null};
  }
  function cleanState(saved){
    const state=empty();if(!obj(saved)||saved.version!==2) return state;
    state.level=Math.max(1,count(saved.level,C.maxLevel));state.highestLevel=Math.max(state.level,count(saved.highestLevel,C.maxLevel));
    state.completed=count(saved.completed);state.started=count(saved.started);
    state.introduced=Array.isArray(saved.introduced)?[...new Set(saved.introduced.filter(x=>C.bySkill[x]))]:[];
    for(const kind of ['words','skills'])if(obj(saved[kind]))for(const [id,value] of Object.entries(saved[kind])){
      if((kind==='words'?W.byId[id]:C.bySkill[id])&&obj(value)) state[kind][id]=cleanStat(value);
    }
    for(const p of T.people) state.people[p]=count(saved.people?.[p]);
    state.history=Array.isArray(saved.history)?saved.history.filter(x=>knownTask.has(x)).slice(-30):[];
    if(obj(saved.legacy)) state.legacy={level:count(saved.legacy.level,10000),levelCorrect:count(saved.legacy.levelCorrect),mistakes:count(saved.legacy.mistakes)};
    const cleanBlock=items=>Array.isArray(items)?items.filter(x=>obj(x)&&knownTask.has(x.taskId)&&['current','targeted','older'].includes(x.kind)).slice(0,20).map(x=>({taskId:x.taskId,kind:x.kind,target:C.bySkill[x.target]||W.byId[x.target]?x.target:null})):[];
    state.block=cleanBlock(saved.block);
    state.lastBlock=Array.isArray(saved.lastBlock)?cleanBlock(saved.lastBlock):null;
    const cur=saved.current;
    if(obj(cur)&&knownTask.has(cur.taskId)&&['intro','current','targeted','older'].includes(cur.kind)){
      const task=knownTask.get(cur.taskId);
      const tokens=Array.isArray(cur.tokens)?cur.tokens.slice(0,60).map(cleanToken).filter(Boolean):[];
      const validGroups=new Set(task.groups.map(g=>g.id));
      for(const token of tokens)if(!validGroups.has(token.group)) token.group=null;
      if(cur.blocksVersion!==2){
        const effective=C.forLevel(task,Math.max(1,count(cur.levelAtStart,C.maxLevel)));
        for(const token of tokens)if(W.byId[token.lemma].type==='verb'){
          const migrate=part=>{
            let old;try{old=T.surface({lemma:token.lemma,features:part.features});}catch{}
            const f=part.features;
            if(!part.form&&Object.keys(f).length===2&&f.tense==='imperative'&&f.person==='sen')part.features=B.baseFeatures(token.lemma);
            else if(f.tense==='present')part.features={...f,register:effective.verbRegister};
            if(old&&part.form===old)try{part.form=T.surface({lemma:token.lemma,features:part.features});}catch{}
          };
          migrate(token);token.attachments.forEach(migrate);
        }
      }
      state.current={taskId:task.id,id:count(cur.id),kind:cur.kind,target:C.bySkill[cur.target]?cur.target:null,
        levelAtStart:Math.max(1,count(cur.levelAtStart,C.maxLevel)),assisted:cur.assisted===true,rated:cur.rated===true||count(cur.attempts)>0,
        firstOutcome:['correct','wrong','help'].includes(cur.firstOutcome)?cur.firstOutcome:null,attempts:count(cur.attempts,100),
        finished:cur.finished===true,hintLevel:count(cur.hintLevel,3),blocksVersion:2,bankSeed:Math.max(1,count(cur.bankSeed,2147483646)||count(cur.id)||1),tokens};
    }
    return state;
  }
  function unlocks(raw){
    if(!obj(raw)) return {};
    return Object.fromEntries(W.words.map(w=>[lemmaKey(w.tr),{toTurkish:raw[lemmaKey(w.tr)]?.toTurkish===true,toGerman:raw[lemmaKey(w.tr)]?.toGerman===true}]));
  }
  function expectedSurface(slot){return T.norm(T.surface(slot));}
  function featureSkill(slot,field,fallback){
    const f=slot.features,verb=W.byId[slot.lemma].type==='verb';
    const tense={present:'present',past:'past',future:'future',reported:'reported',aorist:'aorist',necessity:'necessity',conditional:'conditional',imperative:'imperative',optative:'optative',ma:'nominalMa',dik:'nominalDik',acak:'nominalFuture',an:'relativeAn',ip:'ip',ince:'ince',arak:'arak',madan:'beforeAfter',ken:'ken'};
    const map={case:f.case==='bare'?'bare':f.case,poss:verb?tense[f.tense]:'possessive',plural:'plural',voice:f.voice,negative:'negative',tense:tense[f.tense],ability:'ability',person:T.people.indexOf(f.person)>3?'otherPeople':'present',predicatePerson:'possessiveCase',question:verb?(f.tense==='past'?'pastQuestions':'verbQuestion'):'nominalQuestion',past:'nominalPast',register:'present'};
    return C.bySkill[map[field]]?map[field]:fallback;
  }
  function evaluate(task,tokens){
    const expected=task.groups.flatMap(g=>g.slots);
    const roots=new Set(expected.map(s=>s.lemma));
    const extra=tokens.find(t=>t.group&&!roots.has(t.lemma));
    if(extra){
      const missing=expected.find(s=>W.byId[s.lemma].type===W.byId[extra.lemma]?.type&&!tokens.some(t=>t.lemma===s.lemma&&t.group));
      return {correct:false,issue:{area:'word',word:extra.lemma,expected:(missing||expected[0]).lemma}};
    }
    for(const group of task.groups){
      const actual=tokens.filter(t=>t.group===group.id);
      const slots=group.slots.filter(slot=>!optionalPronoun(slot,group)||actual.some(t=>t.lemma===slot.lemma));
      if(actual.length!==slots.length) return {correct:false,issue:{area:actual.length<slots.length?'missing':'extra',skill:task.skills[0]}};
      const remaining=[...actual];
      for(let i=0;i<slots.length;i++){
        const slot=slots[i];let match=group.ordered?0:remaining.findIndex(t=>t.lemma===slot.lemma&&safeSurface(t)===expectedSurface(slot));
        if(match<0) match=remaining.findIndex(t=>t.lemma===slot.lemma);
        const token=remaining[match];
        if(!token || token.lemma!==slot.lemma){
          const elsewhere=tokens.find(t=>t.lemma===slot.lemma&&t.group&&t.group!==group.id);
          return {correct:false,issue:{area:elsewhere?'role':'word',word:token?.lemma,expected:slot.lemma,skill:task.skills[0],group:group.label}};
        }
        if(safeSurface(token)!==expectedSurface(slot)){
          const fields=['case','poss','plural','voice','negative','tense','ability','person','predicatePerson','question','past','register'];
          const field=fields.find(key=>(token.features[key]??null)!==(slot.features[key]??null));
          return {correct:false,issue:{area:'grammar',field:field||'form',skill:featureSkill(slot,field,task.skills[0]),word:slot.lemma,expected:expectedSurface(slot),actual:safeSurface(token)}};
        }
        remaining.splice(match,1);
      }
    }
    return {correct:true};
  }
  function optionalPronoun(slot,group){
    const entry=W.byId[slot.lemma];
    if(entry.type!=='pronoun'||Object.keys(slot.features).length) return false;
    return group.slots.some(s=>W.byId[s.lemma].type==='verb'&&s.features.person===entry.tr&&!['an','ma','dik','acak','ip','ince','arak','ken'].includes(s.features.tense))||
      group.slots.some(s=>s.features.predicatePerson===entry.tr);
  }
  function safeSurface(token){try{return T.norm(B.surface(token));}catch{return '';}}
  class Engine{
    constructor({storage,clock=()=>Date.now(),random=Math.random}={}){
      this.storage=storage||root.localStorage;this.clock=clock;this.random=random;this.storageError='';
      this.damagedRaw=null;this.state=this.load();
    }
    read(key){try{return JSON.parse(this.storage.getItem(key)||'null');}catch{return null;}}
    load(){
      const saved=this.read(KEY);
      if(obj(saved)&&saved.version===2) return cleanState(saved);
      try{this.damagedRaw=this.storage.getItem(KEY);}catch{}
      const state=empty(), old=this.read(LEGACY);
      if(obj(old))state.legacy={level:count(old.level,10000),levelCorrect:count(old.levelCorrect),mistakes:count(old.mistakes)};
      return state;
    }
    preserveDamaged(){
      if(this.damagedRaw!==null){this.storage.setItem(KEY+'DamagedBackup',this.damagedRaw);this.damagedRaw=null;}
    }
    save(){try{this.preserveDamaged();this.storage.setItem(KEY,JSON.stringify(this.state));this.storageError='';return true;}catch{this.storageError='Der Browser konnte den Lernstand nicht speichern. Bitte exportiere eine Sicherung.';return false;}}
    unlocked(){const saved=unlocks(this.read(UNLOCK));return new Set(W.words.filter(w=>saved[lemmaKey(w.tr)]?.toTurkish&&saved[lemmaKey(w.tr)]?.toGerman).map(w=>w.id));}
    available({includeUnintroduced=false}={}){
      const unlocked=this.unlocked(), introduced=new Set(this.state.introduced);
      return C.tasks.filter(t=>t.requires.every(id=>unlocked.has(id))&&t.skills.every(id=>
        (includeUnintroduced || introduced.has(id))&&C.prerequisites(id).every(p=>introduced.has(p))));
    }
    stat(kind,id){return this.state[kind][id] ||= cleanStat();}
    bandReady(band){return C.skills.filter(s=>s.band===band.id).every(s=>(this.state.skills[s.id]?.families.length||0)>=2);}
    missingSkills(){return C.skills.filter(s=>s.band===C.bandAt(this.state.level).id&&(this.state.skills[s.id]?.families.length||0)<2);}
    missingWords(){
      const current=C.bandAt(this.state.level), unlocked=this.unlocked();
      const unmet=C.skills.filter(s=>s.min<=this.state.level&&s.band===current.id&&(!this.state.introduced.includes(s.id)||(this.state.skills[s.id]?.families.length||0)<2));
      const pending=unmet.find(s=>!this.state.introduced.includes(s.id)&&C.prerequisites(s.id).every(id=>this.state.introduced.includes(id)));
      const pool=C.tasks.filter(t=>t.band===current.id&&t.min<=this.state.level&&(pending?t.skills.includes(pending.id):!unmet.length||t.skills.some(id=>unmet.some(s=>s.id===id))));
      const candidates=pool.map(t=>({t,missing:t.requires.filter(id=>!unlocked.has(id))})).filter(x=>x.missing.length).sort((a,b)=>a.missing.length-b.missing.length);
      return [...new Set(candidates.slice(0,3).flatMap(x=>x.missing))].slice(0,8).map(id=>W.byId[id]);
    }
    due(stat){return (stat.errorSequence>0&&this.state.completed>=stat.errorSequence)||(stat.stage>=0&&((stat.dueSequence>0&&this.state.completed>=stat.dueSequence)||(stat.dueAt>0&&this.clock()>=stat.dueAt)));}
    pick(pool,score=()=>1){
      const fresh=pool.filter(t=>!this.state.history.slice(-2).includes(t.id));if(fresh.length)pool=fresh;
      let roll=this.random()*pool.reduce((sum,t)=>sum+Math.max(.01,score(t)),0);
      for(const t of pool){roll-=Math.max(.01,score(t));if(roll<=0)return t;}
      return pool.at(-1);
    }
    next(){
      const previous=this.state.current;
    if(previous&&!previous.finished && knownTask.get(previous.taskId).requires.every(id=>this.unlocked().has(id))){
      const expected=knownTask.get(previous.taskId).groups.flatMap(g=>g.slots);
      if(expected.some(s=>previous.tokens.filter(t=>t.lemma===s.lemma).length<expected.filter(x=>x.lemma===s.lemma).length)){
        previous.tokens=expected.map((s,i)=>({id:'recovered-'+previous.id+'-'+i,lemma:s.lemma,features:{},nominal:s.nominal===true,group:null}));this.save();
      }
      return previous;
    }
      const intro=C.skills.find(s=>s.min<=this.state.level&&!this.state.introduced.includes(s.id)&&C.prerequisites(s.id).every(p=>this.state.introduced.includes(p))&&
        this.available({includeUnintroduced:true}).some(t=>t.skills.includes(s.id)&&t.min<=this.state.level));
      if(intro){
        const pool=this.available({includeUnintroduced:true}).filter(t=>t.skills.includes(intro.id)&&t.min<=this.state.level);
        return this.begin(this.pick(pool),'intro',intro.id);
      }
      const all=this.available();if(!all.length){this.state.current=null;this.save();return null;}
      const band=C.bandAt(this.state.level);
      const current=all.filter(t=>t.band===band.id&&t.min<=this.state.level);
      const older=all.filter(t=>t.min<band.start);
      const needed=this.missingSkills();
      const dueSkills=C.skills.filter(s=>this.state.skills[s.id]&&this.due(this.state.skills[s.id]));
      const dueWords=W.words.filter(w=>this.state.words[w.id]&&this.due(this.state.words[w.id]));
      const dueTargets=t=>[...t.skills.filter(id=>dueSkills.some(s=>s.id===id)),...t.requires.filter(id=>dueWords.some(w=>w.id===id))];
      let targeted=all.filter(t=>dueTargets(t).length);
      const weakCounts={};for(const item of this.state.block)if(item.kind==='targeted'&&item.target)weakCounts[item.target]=(weakCounts[item.target]||0)+1;
      targeted=targeted.filter(t=>dueTargets(t).some(id=>(weakCounts[id]||0)<6));
      const counts={current:0,targeted:0,older:0};for(const item of this.state.block)counts[item.kind]++;
      const targets={current:12,targeted:5,older:3};
      const pools={current,targeted,older};
      let kind=Object.keys(pools).filter(k=>pools[k].length).sort((a,b)=>(targets[b]-counts[b])-(targets[a]-counts[a]))[0]||'older';
      let pool=pools[kind] || all;if(!pool.length)pool=all;
      let target=null;
      if(kind==='current'&&this.state.level===band.end&&needed.length){
        const unmet=pool.filter(t=>t.skills.some(id=>needed.some(s=>s.id===id)));if(unmet.length)pool=unmet;
      }
      const availableCases=cases.filter(c=>all.some(t=>t.cases.includes(c)));
      const covered=new Set(this.state.block.flatMap(x=>knownTask.get(x.taskId).cases));
      const missing=availableCases.filter(c=>!covered.has(c));
      const remaining=20-this.state.block.length;
      if(this.state.level>=40&&missing.length&&remaining<=missing.length+1){
        const cover=all.filter(t=>t.cases.includes(missing[0]));
        if(cover.length){pool=cover;kind=cover.some(t=>current.includes(t))?'current':'older';}
      }
      const accCount=this.state.block.filter(x=>knownTask.get(x.taskId).cases.includes('accusative')).length;
      const chosen=this.pick(pool,t=>{
        const person=t.person?1/(1+(this.state.people[t.person]||0)):1;
        const unseen=t.skills.some(id=>!this.state.skills[id]?.families.includes(t.family))?3:1;
        const accumulator=this.state.level>=40&&accCount<6&&t.cases.includes('accusative')?2:1;
        const reviews=[...t.skills.map(id=>this.state.skills[id]),...t.requires.map(id=>this.state.words[id])].filter(s=>s&&this.due(s));
        const urgency=kind==='targeted'?Math.max(1,...reviews.map(s=>1+Math.min(5,s.errors)+Math.min(14,Math.max(0,(this.clock()-s.dueAt)/86400000)))):1;
        return person*unseen*accumulator*urgency;
      });
      if(kind==='targeted')target=dueTargets(chosen).find(id=>(weakCounts[id]||0)<6);
      return this.begin(chosen,kind,target);
    }
    coverageReport(items=this.state.block){
      const available=this.available();
      const eligible=cases.filter(c=>available.some(t=>t.cases.includes(c)));
      const covered=[...new Set(items.flatMap(item=>knownTask.get(item.taskId).cases))];
      const mix={current:0,targeted:0,older:0};for(const item of items)mix[item.kind]++;
      return {count:items.length,covered,missing:eligible.filter(c=>!covered.includes(c)),unavailable:cases.filter(c=>!eligible.includes(c)),mix};
    }
    begin(task,kind,target){
      if(!task)return null;
      const instance=++this.state.started;
      const tokens=task.groups.flatMap(g=>g.slots).map((slot,i)=>({id:'token-'+instance+'-'+i,lemma:slot.lemma,
        features:B.baseFeatures(slot.lemma),nominal:slot.nominal===true,...(slot.nominalPerson?{nominalPerson:slot.nominalPerson}:{}),group:null}));
      // Distractors are unlocked lexical roots of the same word classes only.
      const used=new Set(tokens.map(t=>t.lemma));
      const types=new Set(tokens.map(t=>W.byId[t.lemma].type));
      const unlocked=this.unlocked();
      const distractors=W.words.filter(w=>unlocked.has(w.id)&&types.has(w.type)&&!used.has(w.id));
      for(let i=0;i<2&&distractors.length;i++){
        const scored=distractors.map(w=>({w,score:Math.min(...tokens.filter(t=>W.byId[t.lemma].type===w.type).map(t=>B.similar(w.tr,W.byId[t.lemma].tr)))})).sort((a,b)=>a.score-b.score);
        const near=scored.filter(x=>x.score<=scored[0].score+.25).slice(0,6);
        const w=near[Math.floor(this.random()*near.length)].w;distractors.splice(distractors.indexOf(w),1);
        tokens.push({id:'extra-'+this.state.started+'-'+w.id,lemma:w.id,features:B.baseFeatures(w.id),nominal:w.type==='adj',group:null});
      }
      this.state.current={taskId:task.id,id:this.state.started,kind,target,blocksVersion:2,bankSeed:1+Math.floor(this.random()*2147483645),levelAtStart:this.state.level,assisted:kind==='intro',rated:false,firstOutcome:null,attempts:0,finished:false,hintLevel:0,tokens};
      if(kind!=='intro'){
        if(this.state.block.length>=20){this.state.lastBlock=this.state.block;this.state.block=[];}
        this.state.block.push({taskId:task.id,kind,target});
      }
      if(task.person)this.state.people[task.person]=(this.state.people[task.person]||0)+1;
      this.state.history.push(task.id);this.state.history=this.state.history.slice(-30);
      this.save();return this.state.current;
    }
    hint(){
      const cur=this.state.current;if(!cur||cur.finished)return null;
      cur.assisted=true;cur.hintLevel=Math.min(3,cur.hintLevel+1);
      if(!cur.rated){cur.rated=true;cur.firstOutcome='help';}
      this.save();const task=C.forLevel(knownTask.get(cur.taskId),cur.levelAtStart);
      if(cur.hintLevel===1)return 'Prüfziel: '+task.skills.map(id=>C.bySkill[id].title).join(', ')+'. Ordne die Wörter den passenden Satzteilen zu.';
      if(cur.hintLevel===2)return task.skills.map(id=>C.bySkill[id].help).join(' ');
      return 'Lösung: '+task.answer+'. Setze sie selbst zusammen.';
    }
    error(issue){
      const cur=this.state.current,task=knownTask.get(cur.taskId);
      const kind=issue.area==='word'?'words':'skills';const id=kind==='words'?issue.expected:issue.skill||task.skills[0];
      if(!id)return;const stat=this.stat(kind,id);stat.errors++;stat.stage=0;
      stat.errorSequence=this.state.completed+4+Math.floor(this.random()*3);stat.dueSequence=0;stat.dueAt=tomorrow(this.clock());
    }
    success(kind,id,family,direct){
      const stat=this.stat(kind,id);stat.correct++;stat.lastSeen=this.state.completed;
      if(!direct)return;
      if(kind==='skills'&&!stat.families.includes(family))stat.families.push(family);
      stat.families=stat.families.slice(-30);
      const due=this.due(stat), today=day(this.clock());
      if(stat.stage<0){stat.stage=0;stat.dueSequence=this.state.completed+10;stat.dueAt=tomorrow(this.clock());}
      else if(due && stat.lastAdvanceDay!==today){
        stat.stage=Math.min(5,stat.stage+1);stat.dueSequence=0;stat.dueAt=this.clock()+[0,1,3,7,21,60][stat.stage]*86400000;stat.lastAdvanceDay=today;
      }
      if(due)stat.errorSequence=0;
    }
    check({unknown=false}={}){
      const cur=this.state.current;if(!cur||cur.finished)return {ignored:true};
      const task=C.forLevel(knownTask.get(cur.taskId),cur.levelAtStart), result=unknown?{correct:false,issue:{area:'grammar',skill:task.skills[0]}}:evaluate(task,cur.tokens);
      let delta=0;
      const first=cur.attempts===0, direct=first&&!cur.assisted;
      cur.attempts++;
      if(!cur.rated){
        cur.rated=true;cur.firstOutcome=result.correct?'correct':'wrong';
        if(cur.kind==='current'&&!cur.assisted){
          if(result.correct){
            for(const id of task.skills){const stat=this.stat('skills',id);if(!stat.families.includes(task.family))stat.families.push(task.family);}
            const band=C.bandAt(this.state.level);
            if(this.state.level<band.end||this.bandReady(band))delta=this.state.level<C.maxLevel?1:0;
          }else delta=this.state.level>1?-1:0;
          this.state.level=Math.max(1,Math.min(C.maxLevel,this.state.level+delta));this.state.highestLevel=Math.max(this.state.highestLevel,this.state.level);
        }
      }
      if(result.correct){
        cur.finished=true;this.state.completed++;
        if(cur.kind==='intro')for(const id of task.skills){if(!this.state.introduced.includes(id))this.state.introduced.push(id);}
        for(const id of task.skills)this.success('skills',id,task.family,direct);
        for(const id of task.requires)this.success('words',id,task.family,direct);
      }else this.error(result.issue);
      this.save();return {...result,delta,direct,level:this.state.level,kind:cur.kind};
    }
    snapshot(){return JSON.stringify({format:'andre-turkish-backup',version:2,exportedAt:this.clock(),learning:this.state,unlocks:unlocks(this.read(UNLOCK))},null,2);}
    import(text){
      const backup=JSON.parse(text);
      if(!obj(backup)||backup.format!=='andre-turkish-backup'||backup.version!==2||!obj(backup.learning)||backup.learning.version!==2||!obj(backup.unlocks))throw new Error('Diese Datei ist keine gültige Lernstand-Sicherung.');
      const learning=cleanState(backup.learning), progress=unlocks(backup.unlocks);
      const oldLearning=this.storage.getItem(KEY),oldUnlocks=this.storage.getItem(UNLOCK);
      try{this.preserveDamaged();this.storage.setItem(UNLOCK,JSON.stringify(progress));this.storage.setItem(KEY,JSON.stringify(learning));}
      catch(error){try{oldUnlocks===null?this.storage.removeItem(UNLOCK):this.storage.setItem(UNLOCK,oldUnlocks);oldLearning===null?this.storage.removeItem(KEY):this.storage.setItem(KEY,oldLearning);}catch{}throw new Error('Der Browser konnte die Sicherung nicht vollständig übernehmen.');}
      this.state=learning;this.storageError='';return true;
    }
    reset(){const previous=this.state;this.state=empty();if(this.save())return true;this.state=previous;return false;}
  }
  const api={Engine,evaluate,empty,cleanState,cleanToken,unlocks,KEY,UNLOCK,LEGACY,day,optionalPronoun};
  if(node)module.exports=api;else root.AndreLearning=api;
})(typeof globalThis==='object'?globalThis:this);
