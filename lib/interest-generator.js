/* Typed, bilingual sentence trees. Seeded batches; no prewritten task limit. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports;
 const W=node?require('../data/words'):root.AndreWords,T=node?require('./turkish'):root.Turkish,C=node?require('./course'):root.AndreCourse;
 const references=node?require('../data/interest-references'):root.AndreInterestReferences;
 const themes=W.interestData.themes,personDE=['ich','du','er','wir','ihr','sie'];
 const cap=s=>s[0].toLocaleUpperCase('de-DE')+s.slice(1),norm=s=>String(s).toLocaleLowerCase('tr-TR');
 const lex=(tr,type)=>W.words.find(w=>w.tr===tr&&(!type||w.type===type));
 const sl=(w,features={},extra={})=>({lemma:w.id,features,...extra});
 const eligible=w=>w.type==='noun'&&w.deGrammar&&(!w.compoundParts||w.compoundParts.every(tr=>lex(tr,'noun')));
 function phrase(w,features={}){
  if(w.derivationWord){const base=lex(w.derivationWord.base),derivation=w.derivationWord.kind==='li'?'with':'without';return {slots:[sl(base,{derivation,...features})],de:w.deGrammar.positive,extra:[w.id],uses:[]};}
  if(w.derivedPhrase){const parts=w.derivedPhrase.map(x=>lex(x.tr));return {slots:parts.map((p,i)=>sl(p,{...(w.derivedPhrase[i].derivation?{derivation:w.derivedPhrase[i].derivation}:{}),...(i===parts.length-1?features:{})})),de:C.nounDE(w.id,features),extra:[w.id],uses:[]};}
  if(w.type==='pronoun'){const p=T.people.indexOf(w.tr),c=features.case;
   const de=({accusative:['mich','dich','ihn','uns','euch','sie'],dative:['mir','dir','ihm','uns','euch','ihnen'],genitive:['mein','dein','sein','unser','euer','ihr']})[c]?.[p]||personDE[p];return {slots:[sl(w,features)],de,extra:[],uses:[]};
  }
  if(w.compoundParts){const parts=w.compoundParts.map(tr=>lex(tr,'noun'));
   return {slots:parts.map((part,i)=>sl(part,i===parts.length-1?{...features,poss:features.poss||'o'}:{})),de:C.nounDE(w.id,features),extra:[w.id],uses:['use:noun-compound']};
  }
  return {slots:[sl(w,features)],de:C.nounDE(w.id,features),extra:[],uses:[]};
 }
 function finite(verb,person,features={},subordinate=false){
  const d=verb.deGrammar,p=T.people.indexOf(person),f=features;let first=d.present[p],tail='';
  if(f.tense==='past'||f.tense==='reported'){first=(d.auxiliary==='sein'?['bin','bist','ist','sind','seid','sind']:['habe','hast','hat','haben','habt','haben'])[p];tail=d.participle;}
  if(f.tense==='future'){first=['werde','wirst','wird','werden','werdet','werden'][p];tail=d.infinitive;}
  if(f.tense==='necessity'||f.ability){first=(f.ability?['kann','kannst','kann','können','könnt','können']:['muss','musst','muss','müssen','müsst','müssen'])[p];tail=d.infinitive;}
  if(f.voice==='passive'){first=['werde','wirst','wird','werden','werdet','werden'][p];tail=d.participle;}
  if(f.voice==='reflexive'&&!d.reflexive)first+=' '+['mich','dich','sich','uns','euch','sich'][p];
  if(f.voice==='causative'){first=['lasse','lässt','lässt','lassen','lasst','lassen'][p];tail=d.infinitive;}
  if(f.compound==='past'){first=(d.auxiliary==='sein'?['war','warst','war','waren','wart','waren']:['hatte','hattest','hatte','hatten','hattet','hatten'])[p];tail=d.participle;}
  const [head,...rest]=first.split(' ');let extras=rest.join(' ');
  if(d.reflexive&&!extras.includes(['mich','dich','sich','uns','euch','sich'][p]))extras=[['mich','dich','sich','uns','euch','sich'][p],extras].filter(Boolean).join(' ');
  if(subordinate&&d.separable&&!tail){extras=extras.replace(new RegExp('(?:^| )'+d.separable+'$'),'').trim();return {head:'',tail:[extras,d.separable+head].filter(Boolean).join(' ')};}
  return subordinate?{head:'',tail:[extras,tail,head].filter(Boolean).join(' ')}:{head,tail:[extras,tail].filter(Boolean).join(' ')};
 }
 function deClause(tree,{subordinate=false}={}){
  const actor=tree.actor,person=actor.type==='pronoun'?actor.tr:'o',f=tree.features,v=tree.verb;
  const subject=actor.type==='pronoun'?personDE[T.people.indexOf(person)]:C.nounDE(actor.id);
  const complements=[];
  if(tree.object)complements.push(phrase(tree.object,{case:tree.objectDECase||tree.objectCase||'accusative'}).de);
  if(tree.recipient)complements.push(phrase(tree.recipient,{case:'dative'}).de);
  if(tree.place){const p=tree.place.deGrammar;complements.push((tree.placeCase==='dative'?p.to:tree.placeCase==='ablative'?p.from:p.at)||((tree.placeCase==='dative'?'zu ':tree.placeCase==='ablative'?'aus ':'in ')+C.nounDE(tree.place.id,{case:'dative'})));}
  if(f.negative)complements.push('nicht');
  const parts=finite(v,person,f,subordinate);
  return (subordinate?[subject,...complements,parts.tail]:f.question?[parts.head,subject,...complements,parts.tail]:[subject,parts.head,...complements,parts.tail]).filter(Boolean).join(' ');
 }
 function deInfinitive(tree){const complements=[];
  if(tree.object)complements.push(phrase(tree.object,{case:tree.objectDECase||tree.objectCase||'accusative'}).de);
  if(tree.recipient)complements.push(phrase(tree.recipient,{case:'dative'}).de);
  if(tree.place){const d=tree.place.deGrammar;complements.push(tree.placeCase==='dative'?d.to:tree.placeCase==='ablative'?d.from:d.at);}
  const d=tree.verb.deGrammar,person=tree.actor.type==='pronoun'?tree.actor.tr:'o';
  if(d.reflexive)complements.unshift(['mich','dich','sich','uns','euch','sich'][T.people.indexOf(person)]);
  const infinitive=d.separable?d.separable+'zu'+d.infinitive.slice(d.separable.length):'zu '+d.infinitive;
  return [...complements,infinitive].filter(Boolean).join(' ');
 }
 function trClause(tree,features=tree.features,{omitActor=false,actorCase}={}){
  const person=tree.actor.type==='pronoun'?tree.actor.tr:'o',slots=[],extras=[],uses=[];
  if(!omitActor){const a=phrase(tree.actor,actorCase?{case:actorCase}:{});slots.push(...a.slots);extras.push(...a.extra);uses.push(...a.uses);}
  if(tree.place){const p=phrase(tree.place,{case:tree.placeCase||'locative'});slots.push(...p.slots);extras.push(...p.extra);uses.push(...p.uses);}
  if(tree.recipient){const r=phrase(tree.recipient,{case:'dative'});slots.push(...r.slots);extras.push(...r.extra);uses.push(...r.uses);}
  if(tree.object){const o=phrase(tree.object,{case:tree.objectCase||'accusative'});slots.push(...o.slots);extras.push(...o.extra);uses.push(...o.uses);}
  const nonfinite=['infinitive','an','ip','ince','arak','madan','ken','ma','dik','acak'].includes(features.tense),f={...features,...(nonfinite?{}:{person})};
  if(nonfinite){delete f.person;delete f.register;}
  const ordered={};for(const key of ['voice','tense','person','negative','question','ability','register','compound','poss','case'])if(f[key]!==undefined)ordered[key]=f[key];
  slots.push(sl(tree.verb,ordered));return {slots,extras,uses};
 }
 function build({family='event',first,second,third,noun,adjective,connector,theme,section=1,standard=section>=17}){
  let slots=[],de='',uses=[],extras=[],ast={family,theme,section},ordered=true;
  const merge=part=>{slots.push(...part.slots);extras.push(...part.extras||part.extra||[]);uses.push(...part.uses||[]);};
  const word=tr=>lex(tr),append=tr=>slots.push(sl(word(tr)));
  const f=first?.features||{tense:'present',...(standard?{}:{register:'colloquial'})};
  if(family==='nominal'){
   merge(phrase(noun));if(adjective.derivationWord)merge(phrase(adjective));else slots.push(sl(adjective));const positive=adjective.tr==='acı'&&['sos','biber','acı biber','Jalapeño','Sriracha'].includes(noun.tr)?'scharf':adjective.deGrammar.positive;
   de=phrase(noun).de+' ist '+positive;ast={...ast,noun:noun.id,adjective:adjective.id};
  }else if(family==='event'){merge(trClause(first));de=deClause(first);ordered=false;}
  else if(family==='and'||family==='because'){
   merge(trClause(first));append(family==='and'?'ve':'çünkü');merge(trClause(second));
   de=deClause(first)+(family==='and'?' und ':' , denn ')+deClause(second);
  }else if(family==='purpose'){
   first={...first,actor:second.actor};
   merge(trClause(first,{tense:'infinitive'},{omitActor:true}));append('için');merge(trClause(second));
   de=deClause(second)+', um '+deInfinitive(first);
  }else if(family==='while'||family==='before'||family==='condition'){
   first={...first,features:{tense:'present',...(!standard?{register:'colloquial'}:{})}};
   const tense=family==='while'?'ken':family==='before'?'madan':'conditional';
   merge(trClause(first,{tense,person:first.actor.type==='pronoun'?first.actor.tr:'o'}));if(family==='before')append('önce');merge(trClause(second));
   de=(family==='while'?'Während ':family==='before'?'Bevor ':'Wenn ')+deClause(first,{subordinate:true})+', '+finite(second.verb,second.actor.type==='pronoun'?second.actor.tr:'o',second.features).head+' '+
    deClause(second).split(' ').filter((_,i)=>i!==1).join(' ');
   // Main-clause inversion must move the actual subject phrase as one unit.
   const actor=second.actor.type==='pronoun'?personDE[T.people.indexOf(second.actor.tr)]:C.nounDE(second.actor.id),p=finite(second.verb,second.actor.type==='pronoun'?second.actor.tr:'o',second.features);
   const normal=deClause(second),remainder=normal.slice((actor+' '+p.head).length).trim();
   de=(family==='while'?'Während ':family==='before'?'Bevor ':'Wenn ')+deClause(first,{subordinate:true})+', '+[p.head,actor,remainder].filter(Boolean).join(' ');
  }else if(family==='relative-subject'){
   first={...first,features:{tense:'present',...(!standard?{register:'colloquial'}:{})}};
   merge(trClause(first,{tense:'an'},{omitActor:true}));merge(phrase(first.actor));slots.push(sl(adjective));
   const d=first.actor.deGrammar,relative=d.gender==='f'?'die':d.gender==='n'?'das':'der',sub=deClause(first,{subordinate:true}),subject=C.nounDE(first.actor.id);
   de=subject+', '+relative+' '+sub.slice(subject.length+1)+', ist '+adjective.deGrammar.positive;
   if(first.actor.properName)de=subject+', der '+sub.slice(subject.length+1)+', ist '+adjective.deGrammar.positive;
  }else if(family==='relative-object'||family==='relative-location'){
   const object=first.object;merge(trClause({...first,object:null},{tense:'dik',poss:first.actor.type==='pronoun'?first.actor.tr:'o'},{actorCase:'genitive'}));
   merge(phrase(object,family==='relative-location'?{case:'locative'}:{}));
   if(family==='relative-location'){
    merge(trClause({...second,place:null},{...second.features}));de=deClause({...second,place:null})+' in '+C.nounDE(object.id,{case:'dative'});
   }else{slots.push(sl(adjective));de=C.nounDE(object.id)+' ist '+adjective.deGrammar.positive;}
   const gender=object.deGrammar.gender,relative=gender==='m'?'den':gender==='f'?'die':'das';
   const embedded={...first,features:{tense:'past'}},d=deClause(embedded,{subordinate:true}),obj=phrase(object,{case:'accusative'}).de;
   const relativeClause=relative+' '+d.replace(' '+obj,'');
   if(family==='relative-location')de=de+', '+relativeClause;
   else de=C.nounDE(object.id)+', '+relativeClause+', ist '+adjective.deGrammar.positive;
  }else if(family==='instead'){
   first={...first,actor:second.actor};merge(trClause(first,{tense:'infinitive'},{omitActor:true}));append('yerine');merge(trClause(second));
   de=deClause(second)+', statt '+deInfinitive(first);
  }else if(family==='condition-relative'){
   const condition=build({family:'condition',first,second,adjective,theme,section,standard}),object=second.object;
   slots=condition.groups[0].slots;const index=slots.findIndex((s,i)=>i>=trClause(first,{tense:'conditional'}).slots.length&&s.lemma===object.id);
   const relative=trClause({...third,object:null},{tense:'dik',poss:third.actor.type==='pronoun'?third.actor.tr:'o'},{actorCase:'genitive'});slots.splice(index,0,...relative.slots);uses.push(...condition.uses,...relative.uses);extras.push(...condition.requires,...relative.extras);
   const gender=object.deGrammar.gender,pron=gender==='f'?'die':gender==='n'?'das':'den',embedded=deClause({...third,object,features:{tense:'past'}},{subordinate:true}),obj=phrase(object,{case:'accusative'}).de;
   const mainObj=phrase(object,{case:second.objectDECase||second.objectCase}).de;
   const boundary=condition.de.indexOf(', ')+2;de=condition.de.slice(0,boundary)+condition.de.slice(boundary,-1).replace(mainObj,mainObj+', '+pron+' '+embedded.replace(' '+obj,'')+',');
  }else if(['content','report','since','concession','reason','aslong'].includes(family)){
   first={...first,features:{tense:family==='concession'?'present':'past'}};
   const poss=first.actor.type==='pronoun'?first.actor.tr:'o',caseName=family==='concession'?'dative':family==='since'?'ablative':['reason','aslong'].includes(family)?'bare':'accusative';
   merge(trClause(first,{tense:family==='concession'?'ma':'dik',poss,case:caseName},{actorCase:'genitive'}));
   if(['since','reason','aslong'].includes(family)){append(family==='since'?'beri':family==='reason'?'için':'sürece');merge(trClause(second));de=(family==='since'?'Seit ':family==='reason'?'Weil ':'Solange ')+deClause({...first,features:{tense:family==='aslong'?'present':'past'}},{subordinate:true})+', '+deClause(second);}
   else if(family==='concession'){append('rağmen');merge(trClause(second));de='Obwohl '+deClause(first,{subordinate:true})+', '+deClause(second);}
   else{const v=word(family==='report'?'söylemek':'bilmek'),actor=second.actor,p=actor.type==='pronoun'?actor.tr:'o';slots.push(sl(v,{tense:family==='report'?'past':'present',person:p,...(!standard&&family!=='report'?{register:'colloquial'}:{})}));
    slots.unshift(...phrase(actor).slots);de=(actor.type==='pronoun'?personDE[T.people.indexOf(p)]:C.nounDE(actor.id))+' '+finite(v,p,{tense:family==='report'?'past':'present'}).head+' '+finite(v,p,{tense:family==='report'?'past':'present'}).tail+', dass '+deClause(first,{subordinate:true});
   }
  }else throw new Error('Unknown family '+family);
  // Proper punctuation and German subordinate inversion for temporal/concessive trees.
  if(['since','concession','reason','aslong'].includes(family)){
   const a=second.actor.type==='pronoun'?personDE[T.people.indexOf(second.actor.tr)]:C.nounDE(second.actor.id),p=finite(second.verb,second.actor.type==='pronoun'?second.actor.tr:'o',second.features),normal=deClause(second),rest=normal.slice((a+' '+p.head).length).trim();
   de=de.slice(0,de.lastIndexOf(', ')+2)+[p.head,a,rest].filter(Boolean).join(' ');
  }
  if(first)ast.first={actor:first.actor.id,verb:first.verb.id,object:first.object?.id,recipient:first.recipient?.id,place:first.place?.id,objectCase:first.objectCase,placeCase:first.placeCase,features:first.features};
  if(second)ast.second={actor:second.actor.id,verb:second.verb.id,object:second.object?.id,features:second.features};
  const answer=slots.map(T.surface).join(' '),id='interest:'+theme+':'+section+':'+answer,band=C.bands[section-1];
  const namedThemes=[...new Set([theme,...slots.flatMap(s=>W.byId[s.lemma].themes||[])])];
  return {id,source:id,min:family==='nominal'?1:band.start,band:family==='nominal'?C.bands[0].id:band.id,cefr:family==='nominal'?'A1':band.cefr,register:standard?'standard':'colloquial',verbRegister:standard?'standard':'colloquial',groups:[{id:'main',label:'Dein Satz',ordered,slots}],
   de:cap(de.trim().replace(/\s+,/g,',').replace(/\s+/g,' ').replace(/\bin dem\b/g,'im').replace(/\bzu dem\b/g,'zum').replace(/\bzu der\b/g,'zur').replace(/\bbei dem\b/g,'beim'))+(f.question&&family==='event'?'?':'.'),answer,requires:[...new Set([...slots.map(s=>s.lemma),...extras])],uses:[...new Set([...C.uses(slots,family==='nominal'?1:section),...uses])],skills:[band.id],family,ast,primaryTheme:theme,themes:namedThemes,
   cases:[...new Set(slots.filter(s=>W.byId[s.lemma].type==='noun').map(s=>s.features.case||'bare'))],person:first?.actor.type==='pronoun'?first.actor.tr:'o'};
 }
 const stageFamily=section=>section>=29?'since':section>=28?'report':section>=27?'relative-location':section>=24?'concession':section>=23?'report':section>=21?'relative-object':section>=20?'content':section>=18?'condition':section>=16?'relative-subject':section>=15?'while':section>=14?'because':'event';
 function generate({words=new Set(W.words.map(w=>w.id)),section=1,standard=section>=17,seed=1,perTheme=8,theme=null,allow=()=>true}={}){
  section=Math.max(1,Math.min(32,section));let state=(seed>>>0)||1;
  const random=()=>((state=Math.imul(state,1664525)+1013904223>>>0)/4294967296),pick=a=>a[Math.floor(random()*a.length)],out=[],seen=new Set();
  const known=w=>!!w&&words.has(w.id)&&(!w.compoundParts||w.compoundParts.every(tr=>words.has(lex(tr,'noun')?.id)))&&(!w.derivedPhrase||w.derivedPhrase.every(x=>words.has(lex(x.tr)?.id)))&&(!w.derivationWord||words.has(lex(w.derivationWord.base)?.id));
  const nouns=W.words.filter(w=>eligible(w)&&known(w)),actors=[...nouns.filter(w=>['human','animal','fiction'].includes(w.semantic)),...W.words.filter(w=>known(w)&&w.type==='pronoun'&&T.people.slice(0,standard?6:4).includes(w.tr))],adjectives=W.words.filter(w=>known(w)&&w.type==='adj'&&w.deGrammar?.positive);
  const verbs=W.words.filter(w=>known(w)&&w.type==='verb'&&w.deGrammar?.present&&w.stem&&!['complement'].includes(w.deGrammar.frame)),places=nouns.filter(w=>w.semantic==='place');
  const actorPool=(verb,local)=>{
   const frame=verb.interestFrame||verb.deGrammar.frame;
   let pool=frame==='fit-dative'?nouns.filter(w=>w.semantic==='clothing'||w.tr==='saç'):actors.filter(w=>frame==='animal-simple'?w.semantic==='animal':w.semantic!=='animal'||['uyumak','gezmek','yürümek','koşmak','yemek','içmek'].includes(verb.tr));
   const own=pool.filter(w=>w.themes?.includes(local));if(own.length&&random()<.7)pool=own;
   return pool;
  };
  function event(local,forced,features){
   let vs=verbs,localVerbs=vs.filter(w=>w.themes?.includes(local));if(localVerbs.length&&random()<.5)vs=localVerbs;
   const verb=forced||pick(vs);if(!verb)return null;const frame=verb.interestFrame||verb.deGrammar.frame,actor=pick(actorPool(verb,local));if(!actor)return null;
   const tree={actor,verb,features:features||{tense:section>=11&&random()<.15?'aorist':section>=10&&random()<.3?'future':section>=9&&random()<.35?'past':'present',...(section>=8&&random()<.18?{negative:true}:{}),...(section>=8&&random()<.12?{question:true}:{}),...(section>=12&&random()<.08?{ability:true}:{}),...(!standard?{register:'colloquial'}:{})}};
   const targets={food:'food',drink:'drink',media:'media',game:'game',person:'human',animal:'animal',device:'device',problem:'problem',clothing:'clothing',fit:'human'};
   const role=targets[frame.split('-')[0]],needs=frame.endsWith('object')||['object','give','person-dative','help-dative','look-dative','fit-dative'].includes(frame);
   if(needs){if(section<5&&!frame.endsWith('dative'))return null;if(section<4&&frame.endsWith('dative'))return null;
    let pool=nouns.filter(w=>role?(role==='human'?['human','fiction'].includes(w.semantic):w.semantic===role):!['place','animal','child'].includes(w.semantic));
    if(frame==='help-dative'||frame==='person-dative')pool=actors.filter(w=>w.semantic!=='animal');
    const own=pool.filter(w=>w.themes?.includes(local));if(own.length&&random()<.8)pool=own;
    tree.object=pick(pool);if(!tree.object)return null;tree.objectCase=frame.endsWith('dative')?'dative':'accusative';
    // German sarılmak/anschauen select accusative, Turkish selects dative.
    if(frame==='person-dative'||frame==='look-dative')tree.objectDECase='accusative';
    if(frame==='give'){tree.recipient=pick(actors.filter(w=>w.semantic==='human'));if(!tree.recipient)return null;}
   }
   if(section>=4&&places.length&&random()<.6){const own=places.filter(w=>w.themes?.includes(local));tree.place=pick(own.length?own:places);tree.placeCase=frame==='motion'?'dative':'locative';}
   return tree;
  }
  for(const target of themes.filter(t=>!theme||t.id===theme)){
   const localNouns=nouns.filter(w=>w.themes?.includes(target.id)),localAdjs=adjectives.filter(w=>w.themes?.includes(target.id));let count=0;
   for(let attempt=0;attempt<perTheme*24&&count<perTheme;attempt++){
    let task;
    try{
     const useNominal=section<3||random()<(section<9?.18:.05);
     if(useNominal){const noun=pick(localNouns);let adj=pick(localAdjs.length?localAdjs:adjectives);if(!noun||!adj)continue;
      // Vocabulary senses constrain ordinary combinations, with deliberate personification.
      if(adj.tr==='kıvırcık'&&!['saç','köpek','kaplumbağa'].includes(noun.tr))adj=lex('komik','adj');
      task=build({family:'nominal',noun,adjective:adj,theme:target.id,section,standard});
     }else{
      let first=event(target.id);if(!first)continue;let family=stageFamily(section),second=event(target.id),adjective=pick(adjectives);
      if(section>=14){const families=['event','and','because',...(section>=15?['purpose','while','before']:[]),...(section>=18?['condition','relative-subject']:[]),...(section>=20?['content']:[]),...(section>=21?['relative-object']:[]),...(section>=24?['concession']:[]),...(section>=27?['relative-location']:[]),...(section>=28?['report','since','reason','aslong','instead']:[]),...(section>=31?['condition-relative']:[])];if(random()<.7)family=pick(families);}
      if(section>=29&&random()<.3)first.features={tense:'reported',compound:'past'};
      if(section>=31&&second&&random()<.3)second.features=random()<.5?{tense:'present',ability:true}:{tense:'necessity'};
      if(section>=22&&first.object&&first.verb.voice?.passive&&random()<.2){first={...first,actor:first.object,object:null,recipient:null,features:{tense:'present',voice:'passive'}};family='event';}
      else if(section>=26&&first.object&&first.verb.voice?.causative&&random()<.2){first.features={tense:'present',voice:'causative'};family='event';}
      if(section<14)family='event';else if(random()<.22)family='event';
      if(!second||!adjective)family='event';
      if(['relative-object','relative-location'].includes(family)&&(!first.object||first.objectCase==='dative'||first.object.compoundParts||first.object.properName))family='while';
      if(family==='relative-location'&&!['place','device'].includes(first.object.semantic))family='relative-object';
      if(family==='relative-subject'&&(first.actor.compoundParts||first.actor.type==='pronoun'))family='while';
      if(['content','report'].includes(family)&&!known(lex(family==='report'?'söylemek':'bilmek')))family='event';
      const requiredConnectors={because:'çünkü',and:'ve',purpose:'için',before:'önce',since:'beri',concession:'rağmen',reason:'için',aslong:'sürece',instead:'yerine'};
      if(requiredConnectors[family]&&!words.has(lex(requiredConnectors[family])?.id))family='event';
      // Ensure selected topic occurs in at least one lexical node.
      if(![first.actor,first.verb,first.object,first.place,second?.actor,second?.verb,second?.object].some(w=>w?.themes?.includes(target.id))){
       const noun=pick(localNouns);if(noun&&section>=4){if(noun.semantic==='place'){first.place=noun;first.placeCase='locative';}else if(['human','fiction'].includes(noun.semantic)){first.actor=noun;}else continue;}else continue;
      }
      let third;if(family==='condition-relative'){if(!second.object||second.object.compoundParts||second.object.properName||!known(lex('görmek','verb'))){family='condition';}else{third={actor:pick(actors.filter(w=>w.type==='pronoun'||w.semantic==='human')),verb:lex('görmek','verb'),object:second.object,objectCase:'accusative',features:{tense:'past'}};}}
      task=build({family,first,second,third,adjective,theme:target.id,section,standard});
     }
     if(task.requires.every(id=>words.has(id))&&allow(task)&&!seen.has(task.answer)){seen.add(task.answer);out.push(task);count++;}
    }catch{/* A missing lexeme or unsupported frame is ineligible, never a retry loop. */}
   }
   // If current constructions are still being learned, known nominal anchors
   // keep each eligible theme available. They retain their actual A1 label.
   let fallbackAttempts=0;
   fallback: if(count<perTheme)for(const noun of BoundedShuffle(localNouns,random))for(const adjective of BoundedShuffle(adjectives,random)){
    if(count>=perTheme||fallbackAttempts++>=perTheme*32)break fallback;const task=build({family:'nominal',noun,adjective,theme:target.id,section,standard});
    if(task.requires.every(id=>words.has(id))&&allow(task)&&!seen.has(task.answer)){seen.add(task.answer);out.push(task);count++;}
   }
  }
  return out;
 }
 const BoundedShuffle=(items,random)=>{const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
 function labelTasks(tasks){for(const t of tasks)if(!t.themes){t.themes=[...new Set(t.requires.flatMap(id=>W.byId[id]?.themes||[]))];}return tasks;}
 const api={themes,references,lex,phrase,finite,deClause,trClause,build,generate,labelTasks,stageFamily};if(node)module.exports=api;else root.AndreInterestGenerator=api;
})(typeof globalThis==='object'?globalThis:this);
