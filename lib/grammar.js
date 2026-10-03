/* Each concrete allomorph and grammar rule has its own persistent unlock. */
(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const W=node?require('../data/words'):root.AndreWords;
  const T=node?require('./turkish'):root.Turkish;
  const B=node?require('./building-blocks'):root.TurkishBlocks;
  const C=node?require('./curriculum'):root.AndreCurriculum;
  const KEY='andreTurkishGrammarUnlockV1';
  const caseNames={dative:'Dativ',locative:'Lokativ',ablative:'Ablativ',accusative:'Akkusativ',genitive:'Genitiv',instrumental:'Mit-Form'};
  const personNames={ben:'ich',sen:'du',o:'er/sie/es',biz:'wir',siz:'ihr/Sie',onlar:'sie (Mehrzahl)'};
  const tenseNames={present:'Präsens',past:'Vergangenheit',reported:'Berichtete Vergangenheit',future:'Zukunft',aorist:'Gewohnheit',necessity:'Notwendigkeit',conditional:'Bedingung',imperative:'Aufforderung',optative:'Wunsch',ma:'Handlung als Nomen',dik:'Abhängiger Inhalt',acak:'Zukünftiger Inhalt',an:'Relativform',ip:'Verbindung',ince:'Als/sobald',arak:'Begleitung',madan:'Ohne/vor',ken:'Während',infinitive:'Infinitiv'};
  function changes(op){
    const values=Object.fromEntries(Object.entries(op.after).filter(([k,v])=>op.replace||op.before[k]!==v).filter(([,v])=>v!==false&&v!=null));
    // Two internal fields denote the same nominal person. A zero third-person
    // ending must not create a second visible entry for an identical question.
    if(op.stage==='predicate'){
      if(values.predicatePerson){values.person=values.predicatePerson;delete values.predicatePerson;}
      if(values.person==='o')delete values.person;
    }
    if(values.register==='standard')delete values.register;
    return Object.fromEntries(Object.entries(values).sort(([a],[b])=>a.localeCompare(b)));
  }
  const key=op=>op.stage+':'+JSON.stringify(changes(op))+':'+op.text;
  const groupFor=op=>op.stage==='case'?'cases':op.stage==='plural'||op.stage==='poss'?'possession':op.stage==='predicate'?(op.after.question?'questions':'copula'):'verbs';
  function label(op){
    const f=op.after;
    if(op.stage==='case')return caseNames[f.case];
    if(op.stage==='plural')return 'Mehrzahl';
    if(op.stage==='poss')return 'Besitz · '+personNames[f.poss];
    if(op.stage==='predicate')return (f.question?'Frage':f.past?'Vergangenheit':'sein')+' · '+personNames[f.predicatePerson||f.person||'o'];
    return [tenseNames[f.tense],f.voice&&f.voice!=='active'?({passive:'Passiv',reflexive:'Reflexiv',reciprocal:'Miteinander',causative:'Veranlassung'})[f.voice]:'',f.ability?'können':'',f.negative?'verneint':'',f.question?'Frage':'',f.person?personNames[f.person]:'',f.tense==='present'&&f.register==='colloquial'?'Alltag':''].filter(Boolean).join(' · ');
  }
  const entries=[],byId=Object.create(null),examples=new Set();
  function add(op,slot,min=1){
    const id=key(op);
    if(!byId[id]){const e={id,text:op.text,label:label(op),group:groupFor(op),type:op.stage==='verb'?'verb':op.stage==='predicate'?'adj':'noun',min,examples:[]};byId[id]=e;entries.push(e);}
    const e=byId[id];e.min=Math.min(e.min,min);
    if(!slot)return;
    const signature=id+'|'+slot.lemma+'|'+JSON.stringify(slot.features)+'|'+!!slot.nominal;
    if(examples.has(signature))return;examples.add(signature);
    const steps=B.plan(slot);
    const requires=[...new Set([slot.lemma,...[slot.features.person,slot.features.poss,slot.features.predicatePerson].map(p=>W.byLemma[p]?.id).filter(Boolean)])];
    e.examples.push({key:signature,slot,requires,steps,min});
  }
  // Include all variants, even when the present vocabulary cannot yet demonstrate one.
  for(const stem of ['a','e','u','ü','ak','ek','uk','ük']){
    for(const name of Object.keys(caseNames)){const delta=B.difference(stem,T.noun(stem,{case:name}));add({...delta,stage:'case',before:{},after:{case:name}});}
    add({...B.difference(stem,T.noun(stem,{plural:true})),stage:'plural',before:{},after:{plural:true}});
    for(const person of T.people){
      add({...B.difference(stem,T.noun(stem,{poss:person})),stage:'poss',before:{},after:{poss:person}});
      for(const past of [false,true])for(const question of [false,true]){
        const f={predicatePerson:person,...(past?{past:true}:{}),...(question?{question:true}:{})};
        const delta=B.difference(stem,T.nominal(stem,{person,past,question}));if(delta)add({...delta,stage:'predicate',before:{},after:f});
      }
    }
  }
  const slotsSeen=new Set();
  for(const authored of C.tasks)for(const level of [...new Set([authored.min,Math.max(81,authored.min)])]){
    const task=C.forLevel(authored,level);
    for(const original of task.groups.flatMap(g=>g.slots)){
      const word=W.byId[original.lemma];
      for(const w of W.words.filter(w=>w.type===word.type)){
        const slot={...original,lemma:w.id},signature=slot.lemma+'|'+JSON.stringify(slot.features)+'|'+!!slot.nominal;
        if(slotsSeen.has(signature))continue;slotsSeen.add(signature);
        try{
          const steps=B.plan(slot);
          for(const step of steps){
            const partial={lemma:slot.lemma,features:step.after,...(slot.nominal?{nominal:true}:{}),...(slot.nominalPerson?{nominalPerson:slot.nominalPerson}:{})};
            add(step,partial,authored.min);
          }
        }catch{/* Morphology intentionally supports only the catalogued verb voices. */}
      }
    }
  }
  for(const rule of C.skills){
    const e={id:'rule:'+rule.id,text:rule.title,label:'Regel',group:rule.goal?'cases':/possess|combinedNoun|plural/.test(rule.id)?'possession':/nominalQuestion|verbQuestion|pastQuestions/.test(rule.id)?'questions':rule.min<6?'basics':'rules',type:'neutral',min:rule.min,rule:rule.id,examples:[]};
    byId[e.id]=e;entries.push(e);
  }
  // The word bank already contains infinitives. Practise recognizing their
  // ending without adding a redundant -mak/-mek to an existing infinitive.
  for(const ending of ['-mak','-mek']){
    const e={id:'infinitive:'+ending,text:ending,label:'Infinitiv',group:'infinitive',type:'verb',min:1,infinitive:ending,examples:[]};byId[e.id]=e;entries.push(e);
  }
  const requirementCache=new Map();
  const required=task=>{
    const cacheKey=task.id+'|'+task.verbRegister;
    if(requirementCache.has(cacheKey))return requirementCache.get(cacheKey);
    const ids=[...new Set([...task.skills.map(id=>'rule:'+id),...task.groups.flatMap(g=>g.slots).flatMap(B.plan).map(key)])];
    if(C.tasks.some(t=>t.id===task.id))requirementCache.set(cacheKey,ids);return ids;
  };
  const canTask=(task,unlocked)=>required(task).every(id=>unlocked.has(id));
  const requiredAt=(task,level)=>requirementCache.get(task.id+'|'+(level<81?'colloquial':'standard'))||required(C.forLevel(task,level));
  const groupNames={cases:'Nomen · Fälle',possession:'Nomen · Mehrzahl und Besitz',copula:'Adjektiv · „sein“',questions:'Fragen',infinitive:'Verb · Infinitiv / Tätigkeit',verbs:'Verben · Endungen und Formen',basics:'Grundregeln',rules:'Satzbau · Weitere Regeln'};
  function clean(saved){
    const unlocked=Object.create(null);
    if(saved?.version===1&&saved.unlocked&&typeof saved.unlocked==='object')for(const [id,value] of Object.entries(saved.unlocked))if(byId[id]&&value===true)unlocked[id]=true;
    const cur=saved?.current;
    return {version:1,unlocked,current:saved?.version===1&&byId[cur?.entryId]?{entryId:cur.entryId,exerciseKey:typeof cur.exerciseKey==='string'?cur.exerciseKey.slice(0,1000):'',levelAtStart:Math.max(1,Math.min(C.maxLevel,Number.isInteger(cur.levelAtStart)?cur.levelAtStart:1)),finished:cur.finished===true,tokens:Array.isArray(cur.tokens)?cur.tokens.slice(0,60):[]}:null};
  }
  class Manager{
    constructor(storage){this.storage=storage||root.localStorage;this.error='';this.state=this.load();}
    load(){try{return clean(JSON.parse(this.storage.getItem(KEY)||'null'));}catch{return clean(null);}}
    unlocked(){return new Set(Object.keys(this.state.unlocked));}
    save(){try{this.storage.setItem(KEY,JSON.stringify(this.state));this.error='';return true;}catch{this.error='Der Browser konnte den Grammatikstand nicht speichern.';return false;}}
    learn(id){if(!byId[id])return false;const old=this.state.unlocked[id];this.state.unlocked[id]=true;if(this.save())return true;if(!old)delete this.state.unlocked[id];return false;}
    exercise(entryId,words,level=1,exampleKey=null){
      const e=byId[entryId],known=this.unlocked();if(!e||known.has(entryId))return null;
      if(e.infinitive){
        const eligible=W.words.filter(w=>w.type==='verb'&&w.tr.endsWith(e.infinitive.slice(1))&&words.has(w.id)),word=eligible.find(w=>w.id===exampleKey)||eligible[0];if(!word)return null;
        const slot={lemma:word.id,features:{tense:'infinitive'}};
        return {entryId,key:word.id,task:{id:entryId,min:1,cefr:'A1',skills:[],requires:[word.id],register:'standard',groups:[{id:'main',label:'Deine Form',slots:[slot]}],de:'Infinitiv · '+word.de,answer:word.tr}};
      }
      if(e.rule){
        const candidates=C.tasks.filter(t=>t.skills.includes(e.rule)&&t.requires.every(id=>words.has(id))).map(t=>C.forLevel(t,level));
        const eligible=candidates.filter(t=>required(t).filter(id=>id!==entryId).every(id=>known.has(id))).sort((a,b)=>a.min-b.min);
        const t=eligible.find(t=>t.id===exampleKey)||eligible[0];
        return t?{entryId,key:t.id,task:t}:null;
      }
      const eligible=e.examples.filter(x=>x.requires.every(id=>words.has(id))&&x.steps.every(s=>key(s)===entryId||known.has(key(s)))&&(!x.slot.features.register||x.slot.features.tense!=='present'||x.slot.features.register===(level<81?'colloquial':'standard')));
      const example=eligible.find(x=>x.key===exampleKey)||eligible[0];
      if(!example)return null;
      const slot=example.slot;
      return {entryId,key:example.key,task:{id:entryId,min:example.min,cefr:C.bandAt(example.min).cefr,register:slot.features.register||'standard',verbRegister:level<81?'colloquial':'standard',skills:[],requires:example.requires,groups:[{id:'main',label:'Deine Form',slots:[slot]}],de:e.label+' · '+W.byId[slot.lemma].tr+' → ?',answer:T.surface(slot)}};
    }
    next(words,level){
      // Foundational forms first; grammar training never changes the game level.
      const order=[...entries].sort((a,b)=>a.min-b.min||(a.rule?1:0)-(b.rule?1:0));
      for(const e of order){const exercise=this.exercise(e.id,words,level);if(exercise)return exercise;}
      return null;
    }
  }
  const api={KEY,key,entries,byId,required,requiredAt,canTask,caseNames,groupNames,clean,Manager};
  if(node)module.exports=api;else root.AndreGrammar=api;
})(typeof globalThis==='object'?globalThis:this);
