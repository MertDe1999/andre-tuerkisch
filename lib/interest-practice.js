/* Short optional practice; separate evidence, never a shortcut through the course. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports;
 const I=node?require('./interest-generator'):root.AndreInterestGenerator,G=node?require('./course-grammar'):root.AndreCourseGrammar,W=node?require('../data/words'):root.AndreWords;
 const KEY='andreInterestPracticeV1',MODES=['build','listen','dialog','write'];
 const scenes={
  T01:'Beim Trash-TV-Abend',T02:'Nach einer Runde Nintendo',T03:'Nach dem Training',T04:'Nach deinem Schultag',
  T05:'Euer Abend zu zweit',T06:'Ein Outfit fällt euch auf',T07:'Unterwegs mit Ben',T08:'Auf dem Sofa mit TikTok',
  T09:'Euer Serienabend',T10:'Eine Gaming-Pause',T11:'Nach einer Koop-Runde',T12:'Beim gemeinsamen Einkauf',
  T13:'Beim Essen',T14:'Matcha für Mert?',T15:'Grüße aus dem Urlaub',T16:'Mert mag es scharf',
  T17:'Technik im Alltag',T18:'Augen, Locken und Komplimente',T19:'Zu Besuch bei Mama',T20:'Eure Wochenendküche',
  T21:'Ein kleines Geschenk',T22:'Ein Abend mit Kochsendungen',T23:'Eine freche Nachricht an Mert'
 };
 const norm=(text,lang)=>G.norm(String(text||'').replace(/[’‘]/g,"'"),lang);
 const aliases=(text,lang)=>G.alternatives(String(text).replace(/[’‘]/g,"'"),lang);
 const same=(a,b,lang)=>aliases(a,lang).some(x=>aliases(b,lang).includes(x));
 const shuffle=(items,random)=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
 const compact=t=>({tr:t.answer,de:t.de,cefr:t.cefr,requires:[...t.requires],grammar:G.required(t),theme:t.primaryTheme||t.themes?.[0],
  // A matching frame makes a partner's contrasting statement a plausible turn.
  frame:JSON.stringify(t.groups.map(g=>g.slots.map(s=>[W.byId[s.lemma]?.type,s.features||{}]))),lemmas:t.groups.flatMap(g=>g.slots.map(s=>s.lemma))});
 class Practice{
  constructor({engine,storage=engine.storage,random=Math.random}={}){this.engine=engine;this.storage=storage;this.random=random;let saved;try{saved=JSON.parse(storage.getItem(KEY));}catch{}
   this.state=saved?.version===1&&saved.sessions&&saved.stats?saved:{version:1,mode:'build',serial:0,sessions:{},stats:{},recent:[]};
   if(!MODES.includes(this.state.mode))this.state.mode='build';this.state.recent||=[];this.current=null;
  }
  save(){try{this.storage.setItem(KEY,JSON.stringify(this.state));this.storageError='';return true;}catch{this.storageError='Der Browser konnte diese Übung nicht speichern.';return false;}}
  mode(value){if(MODES.includes(value)){this.state.mode=value;this.save();}return this.state.mode;}
  access(){return {words:this.engine.unlocked(),grammar:this.engine.practiceGrammar()};}
  eligible(item,{words,grammar}=this.access()){return item?.requires?.every(id=>words.has(id))&&item.grammar?.every(id=>grammar.has(id));}
  pool(theme){if(!this.engine.wordsReady())return [];const grammar=this.engine.practiceGrammar(),words=this.engine.unlocked();
   const fresh=I.generate({words,section:this.engine.state.opened,standard:this.engine.state.standard,seed:Math.max(1,(this.state.serial+1)*7919+this.engine.flow.level*997),perTheme:8,theme,allow:t=>this.engine.canTask(t,grammar)});
   const all=[...fresh,...this.engine.available()],seen=[],seenTR=new Set(),seenDE=new Set();
   for(const t of all){if(!t.answer||!t.de||t.answer.length>240||t.de.length>240||!t.requires.every(id=>words.has(id))||!this.engine.canTask(t,grammar))continue;
    if(theme&&!t.requires.some(id=>W.byId[id]?.themes?.includes(theme)))continue;
    const tr=aliases(t.answer,'tr'),de=aliases(t.de,'de');if(tr.some(x=>seenTR.has(x))||de.some(x=>seenDE.has(x)))continue;
    tr.forEach(x=>seenTR.add(x));de.forEach(x=>seenDE.add(x));seen.push(compact(t));
   }
   const goals=new Set(this.engine.requirements()),current=this.engine.lesson().cefr;
   const score=t=>Number(t.cefr===current)*4+Number(t.grammar.some(id=>goals.has(id)))*6-Number(this.state.recent.includes(t.tr))*12;
   return shuffle(seen,this.random).sort((a,b)=>score(b)-score(a));
  }
  open(mode,theme=null,{fresh=false}={}){if(!MODES.includes(mode)||mode==='build')return null;if(theme&&!scenes[theme])return null;
   this.mode(mode);const key=mode+'|'+(theme||'mixed'),level=this.engine.flow.level,old=this.state.sessions[key],access=this.access();
   if(!fresh&&old&&old.level===level&&this.engine.wordsReady()&&old.tasks?.every(t=>[t.target,...t.options,...(t.partner?[t.partner]:[])].every(x=>this.eligible(x,access)))&&old.catalog?.every(x=>this.eligible(x,access))){this.current=old;return old;}
   this.state.serial++;const pool=this.pool(theme);if(!pool.length){this.current=null;return null;}
   const total=mode==='write'?Math.min(pool.length,level<=40?1:level<=80?2:3):Math.min(3,pool.length),tasks=[];
   for(const target of pool.slice(0,total)){
    const others=pool.filter(t=>t!==target&&!same(t.tr,target.tr,'tr')&&!same(t.de,target.de,'de'));
    const close=others.filter(t=>t.frame===target.frame&&t.lemmas.length===target.lemmas.length&&t.lemmas.filter((id,i)=>id!==target.lemmas[i]).length===1);
    const partner=mode==='dialog'?(close[0]||null):null;
    tasks.push({target,partner,options:mode==='write'?[]:shuffle([target,...others.slice(0,2)],this.random),draft:'',caret:0,heard:false,text:false,assisted:false,attempts:0,done:false});
   }
   // One choice is no exercise: use a typed response instead of a bogus distractor.
   this.current={key,mode,theme,level,tasks,catalog:mode==='write'?pool.slice(0,64):[],index:0,finished:false,created:++this.state.serial};
   this.state.sessions[key]=this.current;this.save();return this.current;
  }
  task(){return this.current?.tasks[this.current.index];}
  heard(){const t=this.task();if(!t||t.done)return;t.heard=true;this.save();}
  reveal(){const t=this.task();if(!t||t.done)return;t.assisted=true;if(this.current.mode==='listen')t.text=true;else t.example=true;this.save();}
  check(answer){const s=this.current,t=this.task();if(!s||!t||t.done||s.finished)return {ignored:true};
   if(s.mode==='listen'&&!t.heard&&!t.text)return {ignored:true};
   if(!String(answer||'').trim())return {empty:true};
   const lang=s.mode==='listen'?'de':'tr';
   if(s.mode==='write'){
    const found=s.catalog.find(x=>aliases(x.tr,'tr').includes(norm(answer,'tr')));
    if(!found){t.unknown=true;this.save();return {unknown:true};}
    if(s.tasks.some(x=>x.done&&x.accepted&&same(x.accepted.tr,found.tr,'tr'))){t.duplicate=true;this.save();return {duplicate:true};}
    t.accepted=found;t.unknown=false;t.duplicate=false;t.done=true;t.correct=true;t.answer=answer;
   }else{
    t.attempts++;t.correct=aliases(t.target[lang],lang).includes(norm(answer,lang));t.answer=answer;t.done=true;
   }
   this.record();this.save();return {correct:t.correct,answer:t.target[lang]};
  }
  keep(){const t=this.task();if(this.current?.mode!=='write'||!t?.unknown||t.done||!t.draft.trim())return false;t.done=true;t.correct=false;t.unverified=true;t.answer=t.draft;this.record();this.save();return true;}
  record(){const s=this.current,t=this.task();if(t.recorded)return;t.recorded=true;
   const key=s.mode+'|'+(s.theme||'mixed'),stat=this.state.stats[key]||={attempts:0,direct:0,assisted:0,text:0,unverified:0,seen:[],lastLevel:s.level};
   stat.byLevel||={};const levelStat=stat.byLevel[s.level]||={attempts:0,direct:0,assisted:0,text:0,unverified:0};levelStat.attempts++;
   stat.attempts++;stat.lastLevel=s.level;
   let outcome;if(t.unverified)outcome='unverified';else if(s.mode==='listen'&&t.text)outcome='text';else if(t.correct)outcome=t.assisted?'assisted':'direct';if(outcome){stat[outcome]++;levelStat[outcome]++;}
   const signature=(t.accepted||t.target).tr;if(t.correct&&!t.assisted&&!stat.seen.includes(signature))stat.seen=[...stat.seen,signature].slice(-100);
   this.state.recent=[...this.state.recent,signature].slice(-100);
  }
  next(){const s=this.current;if(!s||s.finished||!this.task()?.done)return false;if(s.index+1<s.tasks.length)s.index++;else s.finished=true;this.save();return true;}
 }
 const api={Practice,KEY,MODES,scenes,norm,same};if(node)module.exports=api;else root.AndreInterestPractice=api;
})(typeof globalThis==='object'?globalThis:this);
