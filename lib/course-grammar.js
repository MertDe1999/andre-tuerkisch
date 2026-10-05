/* Versioned, separate word / concrete form / construction progress. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports;
 const W=node?require('../data/words'):root.AndreWords,T=node?require('./turkish'):root.Turkish,B=node?require('./building-blocks'):root.TurkishBlocks;
 const C=node?require('./course'):root.AndreCourse,Old=node?require('./grammar'):root.AndreGrammar;
 const KEY='andreTurkishGrammarCourseV2',THRESHOLD=3,entries=[],byId=Object.create(null),core=C.bands.map(()=>[]),peerMin=new Map();
 const featuresKey=f=>JSON.stringify(Object.fromEntries(Object.entries(f).sort(([a],[b])=>a.localeCompare(b))));
 const key=Old.key,groupNames={basics:'Grundlagen',existence:'Existenzwörter',cases:'Nomen · Fälle',possession:'Mehrzahl und Besitz',copula:'Eigenschaften und sein',questions:'Fragen',infinitive:'Tätigkeiten',verbs:'Verben · Zeit und Person',modal:'Wünsche und Möglichkeiten',comparison:'Vergleiche',connections:'Sätze verbinden',time:'Zeitliche Verbindungen',nominal:'Handlungen und Inhalte',relative:'Bezüge und Relativsätze',voice:'Verbrollen',report:'Berichten',transfer:'Zusammen anwenden'};
 const useNames={statement:'Aussagen','demonstrative':'Dieses / das','question-ne':'Was?','negative-nominal':'Verneinen mit değil','infinitive-use':'Tätigkeit als Satzteil','indefinite-object':'Unbestimmte Objekte','habit-every':'Gewohnheiten','nominal-action':'Handlungen als Nomen','relative-subject':'Wer etwas tut','relative-object':'Bezüge mit -DIK / -AcAK','content':'Abhängige Aussagen','indirect-question':'Indirekte Fragen','reported-reference':'Personen und Zeit im Bericht','icin:purpose':'Zweck mit için','icin:beneficiary':'Für jemanden','icin:reason':'Begründung mit için'};
 const names={present:'Präsens',past:'Vergangenheit',future:'Zukunft',reported:'Gehörtes berichten',aorist:'Gewohnheiten',necessity:'Müssen',conditional:'Bedingungen',imperative:'Aufforderungen',optative:'Wünsche',an:'Relativform',ma:'Handlungen als Nomen',dik:'Abhängige Inhalte',acak:'Zukünftige Inhalte',ip:'Handlungen verbinden',ince:'Sobald / als',arak:'Begleitende Handlungen',madan:'Bevor / ohne',ken:'Während',infinitive:'Infinitiv'};
 const cases=Old.caseNames;
 function describe(op){const f=op.after;
  if(op.stage==='derivation')return [f.derivation==='while'?'time':'basics',({with:'Eigenschaften mit -lI',without:'Ohne mit -sIz',while:'Während als Nomen'})[f.derivation]];
  if(op.stage==='case')return ['cases',cases[f.case]];
  if(op.stage==='poss'||op.stage==='plural')return ['possession',op.stage==='plural'?'Mehrzahl':'Besitz'];
  if(f.question)return ['questions',f.tense==='present'?'Verbfragen':f.tense==='past'?'Fragen in der Vergangenheit':'Fragen'];
  if(op.stage==='predicate')return ['copula',f.past?'Vergangenes sein':'Sein und Eigenschaften'];
  if(f.voice)return ['voice',({passive:'Passiv',reflexive:'Sich selbst',causative:'Etwas veranlassen',reciprocal:'Miteinander'})[f.voice]];
  if(f.compound)return ['report',f.compound==='past'?'Zusammengesetzte Vergangenheit':'Gehörtes über Gegenwart / Zukunft'];
  if(f.ability||['necessity','optative','imperative','conditional'].includes(f.tense))return ['modal',f.ability?'Können':names[f.tense]];
  if(['ma','dik','acak'].includes(f.tense))return ['nominal',names[f.tense]];
  if(f.tense==='an')return ['relative','Wer etwas tut'];
  if(['ip','ince','arak','madan','ken'].includes(f.tense))return ['time',names[f.tense]];
  return ['verbs',names[f.tense]||'Verbformen'];
 }
 function useDescription(id){const n=id.slice(4);let group='basics';
  if(/^(var|yok):/.test(n))group='existence';else if(n.includes('question'))group='questions';else if(n.includes('infinitive'))group='infinitive';else if(n.includes('relative'))group='relative';else if(n.includes('nominal')||n==='content')group='nominal';else if(n.includes('reported'))group='report';else if(n.includes('transfer'))group='transfer';else if(/word:|icin:/.test(n))group=/daha|en$/.test(n)?'comparison':/önce|sonra|beri|sürece/.test(n)?'time':'connections';
  if(n==='reciprocal-use')return ['voice','Miteinander handeln'];
  if(n==='subject-person')return ['basics','Person und Subjekt'];
  if(n==='motion-target')return ['cases','Ziel einer Bewegung'];
  if(n==='noun-compound')return ['possession','Verbundene Nomen'];
  if(n==='proper-name')return ['basics','Endungen an Namen'];
  if(n.startsWith('morph:'))return ['basics','Stammwechsel · '+W.byId[n.split(':')[1]].tr];
  return [group,useNames[n]||n.replace(/^(var|yok):(.+)$/,(_,a,b)=>a+' · '+({possession:'Besitz',location:'Ort',existence:'Vorhandensein'})[b]).replace('word:','').replace(/transfer:\d+:(.*)/,(_,b)=>({voice:'Verbrollen verbinden',time:'Zeit und Berichte verbinden',condition:'Bedingungen verbinden',relations:'Mehrere Bezüge'})[b])];
 }
 function add(id,description,min,example,op){
  if(!byId[id]){const [group,label]=description;const e={id,group,label,text:op?.text||label,min,type:op?.stage==='verb'?'verb':'neutral',op,examples:[]};byId[id]=e;entries.push(e);}
  const e=byId[id];if(!e.fixed)e.min=Math.min(e.min,min);if(example&&!e.examples.some(x=>x.id===example.id)){
   e.examples.push(example);
   // Retain authored evidence, with a bounded sample of generated examples.
   const generated=e.examples.filter(x=>x.task.ast);if(generated.length>40)e.examples.splice(e.examples.indexOf(generated[0]),1);
  }return e;
 }
 function register(task,{fixed=false}={}){
  for(const s of task.groups.flatMap(g=>g.slots))for(const op of B.plan(s)){
   const id=key(op),concept=describe(op),peer=peerMin.get(featuresKey(op.after));
   const minimum=op.after.derivation?(op.after.derivation==='while'?121:76):op.after.tense==='present'&&op.after.register!=='colloquial'?81:1;
   const entry=add(id,concept,Math.max(minimum,!fixed&&peer?Math.min(peer,task.min):task.min),{id:task.id+':'+s.lemma+':'+op.stage,slot:{...s,features:op.after},fullSlot:s,task},op);
   const featureKey=featuresKey(op.after);peerMin.set(featureKey,Math.min(peerMin.get(featureKey)||Infinity,entry.min));
  }
  for(const id of task.uses||[])add(id,useDescription(id),task.min,{id:task.id,task});
  if(fixed){const index=C.bandAt(task.min).index;for(const id of required(task))if(!core[index].includes(id))core[index].push(id);}
 }
 const required=task=>[...new Set([...(task.uses||[]),...task.groups.flatMap(g=>g.slots).flatMap(B.plan).map(key)])];
 for(const task of C.tasks)register(task,{fixed:true});
 // Core packages are immutable snapshots. Extra vocabulary only adds optional
 // variants; it never moves a previously finished section's goalposts.
 core.forEach((ids,index)=>{core[index]=ids.filter(id=>byId[id].min>=C.bands[index].start);});
 entries.forEach(e=>{e.fixed=true;});
 const norm=(s,language)=>{let text=String(s||'').normalize('NFC').toLocaleLowerCase(language==='tr'?'tr-TR':'de-DE').replace(/[.!?,;:„“"']/g,'').replace(/\s+/g,' ').trim();if(language==='de')text=text.replace(/\bmama\b/g,'die mutter').replace(/\bpapa\b/g,'der vater').replace(/ß/g,'ss');return text;};
 function alternatives(answer,language){let out=[answer];
  if(language==='de')for(const [a,b] of [['Mama','die Mutter'],['Papa','der Vater'],['im ','in dem '],['zum ','zu dem '],['zur ','zu der '],['beim ','bei dem '],['vom ','von dem ']])out.push(...out.filter(x=>x.includes(a)).map(x=>x.replaceAll(a,b)));
  if(language==='tr')for(const p of ['ben','sen','o','biz','siz','onlar'])if(norm(answer,'tr').startsWith(p+' '))out.push(answer.slice(p.length+1));
  if(language==='de'){
   out.push(...out.map(x=>x.replace(/\b[Ee]r\b/g,'sie')), ...out.map(x=>x.replace(/\b[Ee]r\b/g,'es')));
   out.push(...out.map(x=>x.replace(/\bzu Hause\b/g,'im Haus')), ...out.map(x=>x.replace(/\bim Haus\b/g,'zu Hause')));
  }
  return [...new Set(out.map(x=>norm(x,language)))];
 }
 function formDE(slot){const w=W.byId[slot.lemma],f=slot.features,p=f.person||f.predicatePerson||'o',pron=['ich','du','er','wir','ihr','sie'][T.people.indexOf(p)];
  if(w.type==='noun'){
   if(f.derivation){const derived=W.words.find(x=>x.derivationWord?.base===w.tr&&x.derivationWord.kind===(f.derivation==='with'?'li':'siz'));return derived?.deGrammar.positive||(w.tr==='Asya'&&f.derivation==='with'?'asiatisch':w.tr==='muz'?'mit Banane':f.derivation==='while'?'als '+w.de+' / während man '+w.de+' war':(f.derivation==='with'?'mit ':'ohne ')+w.de);}
   const n=C.nounDE(w.id,{poss:f.poss,plural:f.plural});
   const c=f.case;
   let text=c==='dative'?(!f.poss&&!f.plural&&w.deGrammar.to)||'zu '+C.nounDE(w.id,{...f,case:'dative'}):c==='locative'?(!f.poss&&!f.plural&&w.deGrammar.at)||'in '+C.nounDE(w.id,{...f,case:'dative'}):c==='ablative'?(!f.poss&&!f.plural&&w.deGrammar.from)||'von '+C.nounDE(w.id,{...f,case:'dative'}):c==='genitive'?C.nounDE(w.id,{...f,case:'genitive'}):c==='instrumental'?'mit '+C.nounDE(w.id,{...f,case:'dative'}):c==='accusative'?C.nounDE(w.id,{...f,case:'accusative'}):n;
   if(f.predicatePerson)text=pron+' '+['bin','bist','ist','sind','seid','sind'][T.people.indexOf(p)]+' '+text;
   return text;
  }
  if(w.type==='pronoun')return ({ben:{genitive:'mein',dative:'mir',accusative:'mich'},sen:{genitive:'dein',dative:'dir',accusative:'dich'}}[w.tr]?.[f.case])||w.de;
  if(w.type!=='verb'){const value=w.tr==='güzel'?'schön':w.tr==='var'?'da':w.tr==='yok'?'nicht da':w.tr==='değil'?'nicht':w.de;const finite=(f.past?['war','warst','war','waren','wart','waren']:['bin','bist','ist','sind','seid','sind'])[T.people.indexOf(p)];return (f.question?finite+' '+pron:pron+' '+finite)+' '+value;}
  const d=w.deGrammar,i=T.people.indexOf(p),finite=d.present[i],inf=d.infinitive;
  if(['present','past','future','aorist','reported','necessity'].includes(f.tense)&&!f.voice&&!f.compound){return C.clause({subject:{person:p},verb:w.id,features:f},C.bandAt(1)).de.replace(/[.!?]$/,'');}
  if(f.tense==='imperative')return (w.tr==='gitmek'?'Geh':w.tr==='gelmek'?'Komm':inf)+'!';
  if(f.tense==='optative')return 'Lass uns '+inf;
  if(f.tense==='ma')return ({ben:'mein',sen:'dein',o:'sein',biz:'unser',siz:'euer',onlar:'ihr'}[f.poss]||'das')+' '+inf[0].toLocaleUpperCase('de-DE')+inf.slice(1);
  const possessPerson=f.poss||'o',pi=T.people.indexOf(possessPerson),subject=['ich','du','er','wir','ihr','sie'][pi];
  const aux=(d.auxiliary==='sein'?['bin','bist','ist','sind','seid','sind']:['habe','hast','hat','haben','habt','haben'])[pi];
  const role='';
  if(f.tense==='dik')return 'dass '+subject+' '+(f.negative?'nicht ':'')+d.participle+' '+aux+role;
  if(f.tense==='acak')return 'dass '+subject+' '+inf+' '+['werde','wirst','wird','werden','werdet','werden'][pi]+role;
  if(f.tense==='an')return 'der / die '+d.present[2];
  if(f.tense==='ip')return inf+' und dann …';
  if(f.tense==='ince')return 'sobald man '+d.present[2];
  if(f.tense==='arak')return 'indem man '+d.present[2];
  if(f.tense==='madan')return 'ohne zu '+inf;
  if(f.tense==='ken')return 'während man '+d.present[2];
  if(f.tense==='infinitive')return inf+(f.voice==='causative'?' lassen':'');
  if(f.tense==='conditional')return 'wenn '+pron+' '+finite;
  if(f.voice==='passive')return pron+' '+['werde','wirst','wird','werden','werdet','werden'][i]+' '+d.participle;
  if(f.voice==='reflexive')return pron+' '+finite+' '+['mich','dich','sich','uns','euch','sich'][i];
  if(f.voice==='causative')return w.tr==='gülmek'?pron+' '+['bringe','bringst','bringt','bringen','bringt','bringen'][i]+' jemanden zum Lachen':pron+' '+['lasse','lässt','lässt','lassen','lasst','lassen'][i]+' '+inf;
  if(f.compound==='reported')return pron+' '+(f.tense==='future'?['werde','wirst','wird','werden','werdet','werden'][i]+' '+inf:finite)+', wie ich gehört habe';
  if(f.compound==='past'){
   if(f.tense==='reported')return pron+' '+(d.auxiliary==='sein'?['war','warst','war','waren','wart','waren']:['hatte','hattest','hatte','hatten','hattet','hatten'])[i]+' '+d.participle;
   if(f.tense==='future')return pron+' '+['würde','würdest','würde','würden','würdet','würden'][i]+' '+inf+' (aus damaliger Sicht)';
   const past=d.past||({gelmek:['kam','kamst','kam','kamen','kamt','kamen'],gitmek:['ging','gingst','ging','gingen','gingt','gingen']}[w.tr]);
   return pron+' '+(past?.[i]||'hatte '+d.participle)+(f.tense==='aorist'?' gewöhnlich':' gerade');
  }
  throw new Error('Keine geprüfte Übersetzung für '+w.tr+' '+JSON.stringify(f));
 }
 function clean(saved){const s={version:2,unlocked:{},counts:{},current:null};
  if(saved?.version===2){for(const [id,v] of Object.entries(saved.unlocked||{}))if(v===true)s.unlocked[id]=true;for(const [id,c] of Object.entries(saved.counts||{}))s.counts[id]={tr:Math.min(3,Math.max(0,Number(c.tr)||0)),de:Math.min(3,Math.max(0,Number(c.de)||0)),seen:Array.isArray(c.seen)?c.seen.slice(-10):[]};s.current=saved.current&&typeof saved.current==='object'?saved.current:null;}return s;
 }
 class Manager{
  constructor(storage){this.storage=storage||root.localStorage;this.error='';let saved;try{saved=JSON.parse(this.storage.getItem(KEY));}catch{}this.state=clean(saved);
   if(!saved){try{const old=JSON.parse(this.storage.getItem(Old.KEY));for(const [id,v] of Object.entries(old?.unlocked||{}))if(v===true&&byId[id]?.op)this.state.unlocked[id]=true;}catch{}}
  }
  unlocked(){return new Set(Object.keys(this.state.unlocked).filter(id=>this.state.unlocked[id]));}
  save(){try{this.storage.setItem(KEY,JSON.stringify(this.state));this.error='';return true;}catch{this.error='Der Browser konnte den Grammatikstand nicht speichern.';return false;}}
  count(id){return this.state.counts[id]||{tr:0,de:0,seen:[]};}
  eligible(e,words,opened){const end=C.bands[Math.max(opened, this.state.unlocked[e.id]?Math.ceil(e.min/5):opened)-1].end;return e.min<=end&&e.examples.some(x=>x.task.min<=end&&(e.op?words.has(x.slot.lemma):x.task.requires.every(id=>words.has(id))));}
  ready(words,opened){return entries.filter(e=>!this.state.unlocked[e.id]&&this.eligible(e,words,opened)).sort((a,b)=>a.min-b.min||Number(!a.op)-Number(!b.op));}
  requiredReady(words,opened){const ids=new Set(core.slice(0,opened).flat());return this.ready(words,opened).filter(e=>ids.has(e.id));}
  exercise(entryId,words,opened){const e=byId[entryId];if(!e||!this.eligible(e,words,opened))return null;
   const known=this.unlocked(),end=C.bands[Math.max(opened,known.has(entryId)?Math.ceil(e.min/5):opened)-1].end,examples=e.examples.filter(x=>x.task.min<=end&&(e.op?words.has(x.slot.lemma):x.task.requires.every(id=>words.has(id)))),count=this.count(entryId),direction=count.tr<=count.de?'tr':'de';
   const full=[];
   fullExamples: for(const x of examples.filter(x=>x.task.requires.every(id=>words.has(id))))for(const task of C.variants(x.task,words)){
    const other=required(task).filter(id=>id!==entryId);
    if(other.every(id=>known.has(id)))full.push({id:task.id,tr:task.answer,de:task.de,task});
    if(full.length>=12)break fullExamples;
   }
   let choices=full;
   if(!choices.length&&e.op){choices=examples.slice(0,24).flatMap(x=>{
    // A nominalized verb stem is not an independent utterance. Teach its
    // complete inflected chain, recording each actual allomorph separately.
    const chain=['ma','dik','acak'].includes(x.slot.features.tense),s=chain?x.fullSlot:x.slot;
    const ids=B.plan(s).map(key),targets=chain?ids.filter(id=>!known.has(id)):[entryId];
    if(!ids.every(id=>targets.includes(id)||known.has(id))||targets.some(id=>!byId[id]||byId[id].min>end)||(known.has(entryId)&&targets.some(id=>!known.has(id))))return [];
    return [{id:x.id,tr:T.surface(s),de:formDE(s),slot:s,targets}];
   });}
   if(!choices.length)return null;
   const c=choices[(count.tr+count.de)%choices.length];
   const context=c.slot&&['ma','dik','acak'].includes(c.slot.features.tense)&&c.slot.features.case?('Als Satzteil im '+(cases[c.slot.features.case]||c.slot.features.case)):'';
   const answers=direction==='tr'?[c.tr]:[c.de,...(c.task?.deAlternatives||[])];
   const finite=c.slot?.features,person=finite?.person;
   if(direction==='tr'&&person&&words.has(W.byLemma[person]?.id)&&!['ma','dik','acak','an','ip','ken','ince','arak','madan','infinitive'].includes(finite.tense))answers.push(person+' '+c.tr);
   return {entryId,targets:c.targets||[entryId],direction,prompt:direction==='tr'?c.de:c.tr,answer:direction==='tr'?c.tr:c.de,answers,context,example:c.id,task:c.task,slot:c.slot,assisted:false,answered:false,correct:false};
  }
  next(words,opened,entryId){
   const saved=this.state.current;
   if(!entryId&&saved&&!saved.answered&&this.exercise(saved.entryId,words,opened)){
    const needed=saved.task?.requires||[saved.slot?.lemma],known=this.unlocked(),ids=saved.task?required(saved.task):saved.slot?B.plan(saved.slot).map(key):[];
    if(needed.every(id=>words.has(id))&&ids.every(id=>known.has(id)||(saved.targets||[saved.entryId]).includes(id)))return saved;
   }
   const list=entryId?[byId[entryId]]:this.requiredReady(words,opened);for(const e of list){if(!e)continue;const exercise=this.exercise(e.id,words,opened);if(exercise){this.state.current=exercise;this.save();return exercise;}}return null;
  }
  check(answer){const cur=this.state.current;if(!cur||cur.answered)return {ignored:true};const correct=(cur.answers||[cur.answer]).some(value=>alternatives(value,cur.direction).includes(norm(answer,cur.direction)));
   cur.attempts=(cur.attempts||0)+1;cur.answered=correct;cur.correct=correct;if(!correct)cur.assisted=true;let unlocked=false;
   if(correct&&!cur.assisted)for(const id of cur.targets||[cur.entryId]){const c=this.state.counts[id]||={tr:0,de:0,seen:[]};c[cur.direction]=Math.min(THRESHOLD,c[cur.direction]+1);c.seen.push(cur.example);c.seen=c.seen.slice(-10);if(c.tr>=THRESHOLD&&c.de>=THRESHOLD){this.state.unlocked[id]=true;if(id===cur.entryId)unlocked=true;}}
   this.save();return {correct,unlocked,answer:cur.answer};
  }
  reveal(){if(!this.state.current)return '';this.state.current.assisted=true;this.save();return this.state.current.answer;}
 }
 const goal=id=>{const e=byId[id];return e.group+':'+(e.op?e.label:e.group==='existence'?'Existenz':e.group==='questions'?'Fragen':e.label);};
 const api={KEY,THRESHOLD,Manager,key,entries,byId,core,goal,groupNames,required,requiredAt:task=>required(task),canTask:(task,known)=>required(task).every(id=>known.has(id)),register,clean,norm,alternatives,formDE};
 if(node)module.exports=api;else root.AndreCourseGrammar=api;
})(typeof globalThis==='object'?globalThis:this);
