/* Bilingual structures shared by grammar lessons and the sentence game. */
(function(root){
 'use strict';
 const node=typeof module==='object'&&module.exports;
 const W=node?require('../data/words'):root.AndreWords,T=node?require('./turkish'):root.Turkish;
 const data=node?require('../data/course-data'):root.AndreCourseData;
 const copy=x=>JSON.parse(JSON.stringify(x));
 const bands=data.map((s,i)=>({...s,index:i,cefr:['A1','A2','B1','B2'][Math.floor(i/8)]}));
 const bandAt=level=>bands[Math.min(31,Math.max(0,Math.floor((level-1)/5)))];
 const slot=(tr,features={})=>({lemma:W.byLemma[tr]?.id||tr,features});
 const name=s=>W.byId[s.lemma]?.tr;
 const peopleDE=['ich','du','er','wir','ihr','sie'];
 const articles={bare:{m:'der',f:'die',n:'das',p:'die'},accusative:{m:'den',f:'die',n:'das',p:'die'},dative:{m:'dem',f:'der',n:'dem',p:'den'},genitive:{m:'des',f:'der',n:'des',p:'der'}};
 function nounDE(id,{case:c='bare',plural=false,poss,article=true}={}){
  const w=W.byId[id],d=w?.deGrammar;if(!d?.gender)throw new Error('Nomen braucht deutsche Formen: '+id);
  const gender=plural?'p':d.gender,k=articles[c]?c:'bare';let n=plural?d.plural:d.singular;
  if(k==='dative'&&plural&&!/[ns]$/.test(n))n+='n';
  if(k==='genitive'&&!plural&&gender!=='f')n=d.genitive||n+(/[sßxz]$/.test(n)?'es':'s');
  let a=articles[k][gender];
  if(poss){const bases={ben:'mein',sen:'dein',o:'sein',biz:'unser',siz:'euer',onlar:'ihr'};const end={bare:{m:'',f:'e',n:'',p:'e'},accusative:{m:'en',f:'e',n:'',p:'e'},dative:{m:'em',f:'er',n:'em',p:'en'},genitive:{m:'es',f:'er',n:'es',p:'er'}}[k][gender];a=(poss==='siz'&&end?'eur':bases[poss])+end;}
  return (article?a+' ':'')+n;
 }
 const cap=s=>s[0].toLocaleUpperCase('de-DE')+s.slice(1);
 function uses(slots,section){
  const words=slots.map(name),fs=slots.map(s=>s.features),u=[];
  const has=tense=>fs.some(f=>f.tense===tense);
  if(slots.some(s=>W.byId[s.lemma].type==='noun'))u.push('statement');
  if(words.includes('bu'))u.push('demonstrative');
  if(words.includes('ne'))u.push('question-ne');
  if(slots.some(s=>W.byId[s.lemma].type==='pronoun'&&!s.features.case))u.push('subject-person');
  if(slots.some(s=>W.byId[s.lemma].deGrammar?.frame==='motion')&&fs.some(f=>f.case==='dative'))u.push('motion-target');
  if(words.includes('değil'))u.push('negative-nominal');
  for(const w of ['var','yok'])if(words.includes(w))u.push(w+':'+(fs.some(f=>f.poss)?'possession':fs.some(f=>f.case==='locative')?'location':'existence'));
  if(fs.some(f=>f.tense==='infinitive')&&slots.length>1)u.push('infinitive-use');
  if(words.includes('bir'))u.push('indefinite-object');
  if(words.includes('her'))u.push('habit-every');
  for(const w of ['ve','ama','çünkü','daha','en','önce','sonra','rağmen','beri','sürece','oysa','dolayı','yerine','bile'])if(words.includes(w))u.push('word:'+w);
  if(words.includes('için'))u.push('icin:'+(has('dik')?'reason':has('infinitive')?'purpose':'beneficiary'));
  if(has('ma')&&fs.some(f=>f.poss))u.push('nominal-action');
  if(has('an'))u.push('relative-subject');
  if(fs.some(f=>['dik','acak'].includes(f.tense)&&f.poss)&&!words.some(w=>['beri','sürece','dolayı','için'].includes(w)))u.push(words.some(w=>['bilmek','söylemek','sormak'].includes(w))?'content':'relative-object');
  if(words.includes('görüşmek'))u.push('reciprocal-use');
  if(words.includes('sormak'))u.push('indirect-question');
  if(section>=28&&words.includes('söylemek'))u.push('reported-reference');
  if(section>=31)u.push('transfer:'+section+':'+(fs.some(f=>f.voice)?'voice':words.includes('söylemek')||fs.some(f=>f.compound)?'time':has('conditional')?'condition':'relations'));
  for(const s of slots){const w=W.byId[s.lemma],surface=T.surface(s),f=s.features;
   if(w.soften&&surface.startsWith(w.soften)&&!surface.startsWith(w.tr))u.push('morph:'+w.id+':softening');
   if(w.vowelStem&&surface.startsWith(w.vowelStem)&&!surface.startsWith(w.stem))u.push('morph:'+w.id+':voicing');
   if(w.type==='verb'&&f.tense==='present'&&!f.negative&&!f.voice&&w.progressiveStem&&w.progressiveStem!==w.stem&&w.progressiveStem!==w.vowelStem)u.push('morph:'+w.id+':narrowing');
  }
  return [...new Set(u.map(x=>'use:'+x))];
 }
 function taskFrom(s,ex){
  const slots=copy(ex.slots),answer=slots.map(T.surface).join(' ');
  return {id:ex.id,source:ex.id,min:s.start,band:s.id,cefr:s.cefr,register:s.index<16?'colloquial':'standard',verbRegister:s.index<16?'colloquial':'standard',
   groups:[{id:'main',label:'Dein Satz',ordered:true,slots}],requires:[...new Set(slots.map(x=>x.lemma))],skills:[s.id],uses:uses(slots,s.index+1),
   de:ex.de,answer,family:ex.id,person:slots.find(x=>x.features.person)?.features.person,cases:[...new Set(slots.filter(x=>W.byId[x.lemma].type==='noun').map(x=>x.features.case||'bare'))]};
 }
 const tasks=bands.flatMap(s=>s.examples.map(ex=>taskFrom(s,ex)));
 const skills=bands.map(s=>({id:s.id,min:s.start,band:s.id,title:s.title,help:s.help}));
 const bySkill=Object.fromEntries(skills.map(s=>[s.id,s]));
 function forLevel(task,level,{standard=level>=81}={}){
  const t=copy(task);t.verbRegister=standard?'standard':task.verbRegister;t.register=t.verbRegister;
  if(standard)for(const s of t.groups.flatMap(g=>g.slots))if(s.features.register==='colloquial')delete s.features.register;
  t.answer=t.groups.flatMap(g=>g.slots).map(T.surface).join(' ');return t;
 }
 /* A clause tree carries roles and tense once. Both languages realize it.
    German inflection belongs to the lexeme, never to a hard-coded noun list. */
 function clause(ast,band){
  const subject=ast.subject,verb=W.byId[ast.verb],f=ast.features,person=subject.person||'o',p=T.people.indexOf(person),d=verb.deGrammar;
  const subjectSlot=subject.lemma?{lemma:subject.lemma,features:{}}:slot(person);
  const subjectDE=subject.lemma?nounDE(subject.lemma):peopleDE[p];
  const slots=[subjectSlot],complements=[];
  if(ast.object){slots.push({lemma:ast.object,features:{case:'accusative'}});complements.push(nounDE(ast.object,{case:'accusative'}));}
  if(ast.location){slots.push({lemma:ast.location,features:{case:'dative'}});complements.push(W.byId[ast.location].deGrammar.to||'zu '+nounDE(ast.location,{case:'dative'}));}
  slots.push({lemma:ast.verb,features:{...f,person}});
  let finite=d.present[p],tail='',prefix='';
  if(f.tense==='past'){finite=(d.auxiliary==='sein'?['bin','bist','ist','sind','seid','sind']:['habe','hast','hat','haben','habt','haben'])[p];tail=d.participle;}
  if(f.tense==='reported'){prefix='Offenbar ';finite=(d.auxiliary==='sein'?['bin','bist','ist','sind','seid','sind']:['habe','hast','hat','haben','habt','haben'])[p];tail=d.participle;}
  if(f.tense==='future'){finite=['werde','wirst','wird','werden','werdet','werden'][p];tail=d.infinitive;}
  if(f.tense==='necessity'||f.ability){finite=(f.ability?['kann','kannst','kann','können','könnt','können']:['muss','musst','muss','müssen','müsst','müssen'])[p];tail=d.infinitive;}
  if(f.tense==='aorist'&&!f.ability)prefix='Gewöhnlich ';
  if(f.negative)complements.push('nicht');
  const middle=complements.join(' ');
  const text=f.question?[finite,subjectDE,middle,tail].filter(Boolean).join(' ')+'?':prefix?[prefix.trim(),finite,subjectDE,middle,tail].filter(Boolean).join(' ')+'.':[subjectDE,finite,middle,tail].filter(Boolean).join(' ')+'.';
  const stage=Math.max(ast.object?5:ast.location?4:3,f.ability?12:({past:9,future:10,reported:11,aorist:11,necessity:13}[f.tense]||(f.question?8:3)));
  const ex={id:'gen:'+band.id+':'+JSON.stringify(ast),de:cap(text),slots};const t=taskFrom(bands[stage-1],ex);t.register=t.verbRegister=f.register||'standard';t.ast=ast;t.family=ex.id;return t;
 }
 function generate({words,section=1,standard=false,seed=1,limit=72}={}){
  const known=words||new Set(W.words.map(w=>w.id)),band=bands[section-1],out=[],seen=new Set();let state=Math.max(1,seed|0);
  const random=()=>((state=Math.imul(state,1664525)+1013904223>>>0)/4294967296);
  const nouns=W.words.filter(w=>known.has(w.id)&&w.type==='noun'&&w.deGrammar?.gender);
  const verbs=W.words.filter(w=>known.has(w.id)&&w.type==='verb'&&w.deGrammar?.present&&['motion','object','simple'].includes(w.deGrammar.frame)&&w.tr!=='olmak');
  const features=tasks.filter(t=>t.min<=band.end).flatMap(t=>t.groups[0].slots).filter(s=>W.byId[s.lemma].type==='verb'&&['present','past','future','aorist','reported','necessity'].includes(s.features.tense)&&!s.features.voice&&!s.features.compound).map(s=>({...s.features}));
  const add=t=>{if(!seen.has(t.answer)){seen.add(t.answer);out.push(t);}};
  // Bounded generation: unsuitable metadata cannot create an endless retry loop.
  for(let i=0;i<limit*8&&out.length<limit&&verbs.length&&features.length;i++){
   const verb=verbs[Math.floor(random()*verbs.length)],f=copy(features[Math.floor(random()*features.length)]);
   if(standard&&f.register==='colloquial')delete f.register;
   const pronouns=T.people.filter((p,i)=>(section>=17||i<4)&&known.has(W.byLemma[p]?.id));
   const people=nouns.filter(w=>w.semantic==='human');
   let subject=pronouns.length?{person:pronouns[Math.floor(random()*pronouns.length)]}:people.length?{lemma:people[Math.floor(random()*people.length)].id}:null;
   if(!subject)continue;
   let object,location;
   if(verb.deGrammar.frame==='object'){if(section<5||!nouns.length)continue;object=nouns[Math.floor(random()*nouns.length)].id;}
   if(verb.deGrammar.frame==='motion'&&section>=4&&nouns.length){const places=nouns.filter(w=>w.deGrammar.to);if(places.length)location=places[Math.floor(random()*places.length)].id;}
   try{const t=clause({subject,verb:verb.id,features:f,...(object?{object}:{}),...(location?{location}:{})},band);add(t);}catch{/* Unsupported lexemes remain available in the dictionary. */}
  }
  // Nominal structures also admit new nouns of any German gender.
  for(const adjective of W.words.filter(w=>known.has(w.id)&&w.type==='adj'&&w.deGrammar?.positive))for(const w of nouns){
   for(const poss of [null,...(section>=7?['ben','sen']:[])]){
    const slots=[{lemma:w.id,features:poss?{poss}:{}},slot(adjective.id)];
    add(taskFrom(bands[poss?6:0],{id:'gen:nominal:'+w.id+':'+adjective.id+':'+poss,de:cap(nounDE(w.id,{poss}))+' ist '+adjective.deGrammar.positive+'.',slots}));
   }
  }
  return out;
 }
 /* Typed lexical nodes in authored complex structures. Gender/number and
    argument frame stay fixed; embedded agreement therefore stays valid. */
 function variants(task,words){
  if(task.source&&task.id!==task.source)return [task];
  const out=[task],slots=task.groups.flatMap(g=>g.slots);
  // Advanced structures retain their bound roles and references. A new verb
  // can inhabit an existing node when its frame and German auxiliaries agree.
  // Both renderings are changed from lexical features; derivations with a
  // lexicalized meaning (e.g. göstermek) are deliberately excluded.
  for(const id of new Set(slots.filter(s=>W.byId[s.lemma].type==='verb').map(s=>s.lemma))){
   const original=W.byId[id],d=original.deGrammar,selected=slots.filter(s=>s.lemma===id);
   if(!d||!['motion','object','simple'].includes(d.frame)||selected.some(s=>s.features.voice))continue;
   const otherVerbs=slots.filter(s=>W.byId[s.lemma].type==='verb'&&s.lemma!==id).map(s=>W.byId[s.lemma].deGrammar);
   for(const w of W.words.filter(w=>w.id!==id&&words.has(w.id)&&w.type==='verb'&&w.deGrammar?.frame===d.frame&&w.deGrammar.present?.length===6&&w.deGrammar.auxiliary===d.auxiliary&&!w.deGrammar.adverbial)){
    const target=w.deGrammar,pairs=[[d.infinitive,target.infinitive],[d.participle,target.participle],...d.present.map((s,i)=>[s,target.present[i]]),...(d.past||[]).map((s,i)=>[s,target.past?.[i]])];
    // Reject homographs whose person cannot be inferred from the surface,
    // shared verb spellings and German multiword/separable lexemes.
    if(pairs.some(([a,b])=>a?.includes(' ')||b?.includes(' ')))continue;
    const map=new Map(),ambiguous=new Set();for(const [a,b] of pairs){if(!a||!b)continue;if(map.has(a)&&map.get(a)!==b)ambiguous.add(a);else map.set(a,b);}
    const tokens=task.de.split(/(\p{L}+)/u),matches=tokens.filter(x=>map.has(x.toLocaleLowerCase('de-DE')));if(!matches.length||tokens.some(x=>pairs.some(([a,b])=>a===x.toLocaleLowerCase('de-DE')&&!b)))continue;
    if(matches.some(x=>ambiguous.has(x.toLocaleLowerCase('de-DE'))||otherVerbs.some(v=>[v?.infinitive,v?.participle,...(v?.present||[]),...(v?.past||[])].includes(x.toLocaleLowerCase('de-DE')))))continue;
    const t=copy(task);t.de=tokens.map(x=>{const replacement=map.get(x.toLocaleLowerCase('de-DE'));return replacement?(x[0]===x[0].toLocaleUpperCase('de-DE')?cap(replacement):replacement):x;}).join('');
    for(const s of t.groups.flatMap(g=>g.slots))if(s.lemma===id)s.lemma=w.id;
    try{t.answer=t.groups.flatMap(g=>g.slots).map(T.surface).join(' ');}catch{continue;}
    t.requires=[...new Set(t.groups.flatMap(g=>g.slots).map(s=>s.lemma))];t.uses=uses(t.groups.flatMap(g=>g.slots),bandAt(t.min).index+1);t.id=task.id+':verb:'+w.id;t.family=t.id;out.push(t);
   }
  }
  for(const id of new Set(slots.map(s=>s.lemma))){
   const original=W.byId[id],d=original.deGrammar;if(!d?.gender)continue;
   const forms=[d.singular,d.plural,...(original.tr==='ev'?['Hause','Hauses']:[]),...(original.tr==='anne'?['Mama']:original.tr==='baba'?['Papa']:[])];
   const pieces=task.de.split(/(\p{L}+)/u),positions=pieces.map((s,i)=>forms.includes(s)?i:-1).filter(i=>i>=0);if(!positions.length)continue;
   const sourceSlots=slots.filter(s=>s.lemma===id),bareNames=positions.every(i=>['Mama','Papa'].includes(pieces[i]));
   // Name substitutions carry their own article/case. Different cases of the
   // same referent require a fully structured clause, not token replacement.
   if(bareNames&&new Set(sourceSlots.map(s=>s.features.case||'bare')).size>1)continue;
   const bareHuman=bareNames&&!/\b(sie|ihr|ihre|ihrer|ihren|sein|seine|seiner|seinen|der|die|das|den|dem|des)\b/i.test(task.de);
   for(const candidate of W.words.filter(w=>w.id!==id&&words.has(w.id)&&w.type==='noun'&&w.deGrammar?.gender&&(w.deGrammar.gender===d.gender||bareHuman)&&(original.semantic==='human'?w.semantic==='human':w.semantic!=='human'))){
    const t=copy(task),text=[...pieces];
    for(const index of positions){const form=pieces[index],nd=candidate.deGrammar;
     const c=sourceSlots[0].features.case||'bare',germanCase=['instrumental','dative','locative','ablative'].includes(c)?'dative':c;
     text[index]=form===d.plural?nd.plural:form==='Hauses'?nd.genitive||nd.singular+'s':form==='Mama'||form==='Papa'?nounDE(candidate.id,{case:germanCase}):nd.singular;
    }
    // Local place idioms have lexical prepositions, which must change together.
    t.de=text.join('');
    if(task.de.includes('nach Hause'))t.de=t.de.replace('nach '+candidate.deGrammar.singular,candidate.deGrammar.to||'zu '+nounDE(candidate.id,{case:'dative'}));
    for(const s of t.groups.flatMap(g=>g.slots))if(s.lemma===id)s.lemma=candidate.id;
    try{t.answer=t.groups.flatMap(g=>g.slots).map(T.surface).join(' ');}catch{continue;}
    t.requires=[...new Set(t.groups.flatMap(g=>g.slots).map(s=>s.lemma))];t.uses=uses(t.groups.flatMap(g=>g.slots),bandAt(t.min).index+1);t.id=task.id+':'+id+'='+candidate.id;t.family=t.id;t.de=cap(t.de);out.push(t);
   }
  }
  // Explicit subject omission is a second valid structure, including forms
  // for which the small initial lexicon offers no other compatible verb.
  const omitted=copy(task);let changed=false;
  for(const g of omitted.groups){const last=g.slots.at(-1);if(last?.features.person){const i=g.slots.findIndex(s=>name(s)===last.features.person&&Object.keys(s.features).length===0);if(i>=0){g.slots.splice(i,1);changed=true;}}}
  if(changed){omitted.id+=':implicit';omitted.family=omitted.id;omitted.answer=omitted.groups.flatMap(g=>g.slots).map(T.surface).join(' ');omitted.requires=[...new Set(omitted.groups.flatMap(g=>g.slots).map(s=>s.lemma))];out.push(omitted);}
  const last=slots.at(-1),person=last?.features.person||last?.features.predicatePerson;
  if(['ben','sen','biz','siz'].includes(person)&&words.has(W.byLemma[person]?.id)&&!slots.some(s=>name(s)===person&&!s.features.case)){
   const explicit=copy(task);explicit.groups[0].slots.unshift(slot(person));explicit.id+=':explicit';explicit.family=explicit.id;explicit.answer=explicit.groups.flatMap(g=>g.slots).map(T.surface).join(' ');explicit.requires=[...new Set([...explicit.requires,W.byLemma[person].id])];out.push(explicit);
  }
  return out;
 }
 const api={bands,skills,bySkill,tasks,bandAt,forLevel,maxLevel:160,prerequisites:()=>[],generate,variants,clause,nounDE,uses,copy};
 if(node)module.exports=api;else root.AndreCourse=api;
})(typeof globalThis==='object'?globalThis:this);
