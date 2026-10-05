const {test}=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words'),T=require('../lib/turkish'),B=require('../lib/building-blocks'),C=require('../lib/curriculum'),L=require('../lib/learning');
const {app}=require('./helpers/app.cjs');
const G=require('../lib/grammar');
const task=id=>C.tasks.find(t=>t.id===id);
const rules=C.skills.map(s=>s.id);
function build(slot){
 const token={...slot,features:B.baseFeatures(slot.lemma)};
 for(const step of B.plan(slot))assert.equal(B.apply(token,{text:step.text,operations:[step]}),true);
 return token;
}
test('all verbs start and return as infinitives, including imperative and nonfinite answers',()=>{
 for(const word of W.words.filter(w=>w.type==='verb')){
  assert.equal(B.surface({lemma:word.id,features:B.baseFeatures(word.id)}),word.tr);
 }
 for(const authored of C.tasks)for(const slot of authored.groups.flatMap(g=>g.slots).filter(s=>W.byId[s.lemma].type==='verb')){
  const token=build(slot);assert.equal(B.surface(token),T.surface(slot),authored.id);
  while(B.undo(token)){}
  assert.equal(B.surface(token),W.byId[slot.lemma].tr,authored.id+' undo');
 }
 const infinitive={lemma:W.byLemma.görmek.id,features:{tense:'infinitive'}};
 assert.deepEqual(B.plan(infinitive),[],'an existing infinitive needs no redundant -mek card');
});
test('infinitive plus real affix gives independent standard and simplified examples',()=>{
 const samples=[['sevmek','o','standard','-iyor','seviyor'],['sevmek','o','colloquial','-iyo','seviyo'],['gelmek','ben','colloquial','-iyom','geliyom'],['gelmek','sen','colloquial','-iyon','geliyon'],['gelmek','o','colloquial','-iyo','geliyo'],['gelmek','biz','colloquial','-iyoz','geliyoz'],['gitmek','ben','colloquial','-iyom','gidiyom'],['görmek','sen','colloquial','-üyon','görüyon'],['yıkamak','o','standard','-ıyor','yıkıyor']];
 for(const [lemma,person,register,ending,expected] of samples){
  const slot={lemma:W.byLemma[lemma].id,features:{tense:'present',person,register}};
  assert.equal(B.plan(slot)[0].text,ending);assert.equal(B.surface(build(slot)),expected);
 }
 assert.equal(T.verb('gelmek',{tense:'present',negative:true,person:'ben',register:'colloquial'}),'gelmiyom');
 assert.equal(T.verb('gelmek',{tense:'present',question:true,person:'sen',register:'colloquial'}),'geliyon mu');
 const slot={lemma:W.byLemma.sevmek.id,features:{tense:'present',person:'o',register:'colloquial'}},step=B.plan(slot)[0];
 const wrong={lemma:slot.lemma,features:B.baseFeatures(slot.lemma)};B.apply(wrong,{text:'-üyo',operations:[{...step,text:'-üyo'}]});
 assert.equal(B.surface(wrong),'sevüyo');assert.notEqual(B.surface(wrong),T.surface(slot));
});
test('simplified questions put the person on the verb, including negation and harmonic stems',()=>{
 const people=['ben','sen','o','biz'];
 const samples=[['gelmek',['geliyom mu','geliyon mu','geliyo mu','geliyoz mu']],['görmek',['görüyom mu','görüyon mu','görüyo mu','görüyoz mu']],['gitmek',['gidiyom mu','gidiyon mu','gidiyo mu','gidiyoz mu']],['sevmek',['seviyom mu','seviyon mu','seviyo mu','seviyoz mu']]];
 for(const [lemma,forms] of samples)for(const [i,person] of people.entries()){
  const slot={lemma:W.byLemma[lemma].id,features:{tense:'present',person,register:'colloquial',question:true}};
  assert.equal(T.surface(slot),forms[i]);assert.equal(B.surface(build(slot)),forms[i]);
 }
 for(const [i,person] of people.entries())assert.equal(T.verb('gelmek',{tense:'present',person,register:'colloquial',question:true,negative:true}),['gelmiyom mu','gelmiyon mu','gelmiyo mu','gelmiyoz mu'][i]);
 assert.equal(T.verb('gelmek',{tense:'present',person:'sen',question:true,register:'standard'}),'geliyor musun');
 assert.equal(T.verb('gelmek',{tense:'present',person:'biz',question:true,register:'standard'}),'geliyor muyuz');
 assert.equal(T.verb('gelmek',{tense:'past',person:'sen',question:true,register:'colloquial'}),'geldin mi');
});

test('saved simplified questions migrate their forms and consumed cards without rerating',()=>{
 for(const person of ['ben','sen','o','biz']){
  const authored=task('question-present-gelmek-'+person),effective=C.forLevel(authored,40),state=L.empty();
  state.level=40;const slot=effective.groups[0].slots.find(s=>W.byId[s.lemma].type==='verb'),token=build(slot);
  const legacy=T.verb(slot.lemma,{...slot.features,register:'standard'}).replace(/r /,' ');
  token.form=legacy;token.id='verb';token.group='main';token.attachments[0].block=B.plan({...slot,features:{...slot.features,register:'standard'}})[0].text.replace(/r /,' ');
  state.current={taskId:authored.id,id:3,kind:'current',levelAtStart:40,blocksVersion:2,rated:true,firstOutcome:'wrong',attempts:1,tokens:[token]};
  const clean=L.cleanState(state),restored=clean.current.tokens[0],ending=B.plan(slot)[0].text;
  assert.equal(B.surface(restored),T.surface(slot));assert.equal(restored.attachments[0].block,ending);
  assert.equal(B.availableCards(effective,clean.current,rules).some(c=>c.text===ending),false);
  assert.equal(clean.current.rated,true);assert.equal(clean.current.firstOutcome,'wrong');assert.equal(clean.current.attempts,1);
  assert.deepEqual(L.cleanState(clean),clean);assert.equal(B.undo(restored),true);assert.equal(B.surface(restored),'gelmek');
  assert.ok(B.availableCards(effective,clean.current,rules).some(c=>c.text===ending));
  token.form='gelüyo musun';assert.equal(L.cleanState(state).current.tokens[0].form,'gelüyo musun','incorrect spellings remain incorrect');
 }
});

test('level 80 and 81 switch cards, solutions and hints together, also for older A1 tasks',()=>{
 const map=new Map([[L.UNLOCK,JSON.stringify(Object.fromEntries(W.words.map(w=>[w.tr,{toGerman:true,toTurkish:true}])) )]]);
 map.set(G.KEY,JSON.stringify({version:1,unlocked:Object.fromEntries(G.entries.map(e=>[e.id,true]))}));
 const e=new L.Engine({storage:{getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)}});
 for(const level of [80,81,120,160])for(const id of ['present-sevmek-o','colloquial-gelmek-ben','negative-present-gitmek-sen','question-present-gelmek-biz']){
  e.state.level=level;e.begin(task(id),'older');const effective=C.forLevel(task(id),e.state.current.levelAtStart);
  assert.equal(effective.register,level<81?'colloquial':'standard');
  const slots=effective.groups.flatMap(g=>g.slots),cur=e.state.current;
  for(const [i,slot] of slots.entries()){Object.assign(cur.tokens[i],build(slot));cur.tokens[i].group='main';}
  assert.equal(e.check().correct,true,id+' level '+level);
  e.begin(task(id),'older');e.hint();e.hint();assert.match(e.hint(),new RegExp(effective.answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  const cards=B.cards(effective,e.state.current,rules);
  for(const card of cards)for(const op of card.operations)if(op.after.tense==='present')assert.equal(op.after.register,effective.register);
 }
 for(const authored of C.tasks){
  for(const slot of authored.groups.flatMap(g=>g.slots))if(W.byId[slot.lemma].type==='verb'&&slot.features.tense==='present')assert.equal(slot.features.register,authored.min<81?'colloquial':'standard',authored.id);
  const cur={id:3,bankSeed:3,tokens:authored.groups.flatMap(g=>g.slots).map((s,i)=>({...s,id:'t'+i,features:B.baseFeatures(s.lemma)}))};
  for(const card of B.cards(authored,cur,rules))for(const op of card.operations)if(op.after.tense==='present')assert.equal(op.after.register,authored.verbRegister,authored.id+' alternative');
 }
});
test('previous stem-based saved state migrates without losing rating, wrong spelling or undo',()=>{
 const nounTask=task('object-görmek-sen-w004'),state=L.empty();
 state.level=16;state.started=3;state.current={taskId:nounTask.id,id:3,kind:'current',levelAtStart:16,rated:true,attempts:1,bankSeed:91,tokens:[
  {id:'plain',lemma:W.byLemma.gelmek.id,features:{tense:'imperative',person:'sen'},group:null},
  {id:'correct',lemma:W.byLemma.görmek.id,features:{tense:'present',person:'sen'},form:'görüyorsun',group:'main',attachments:[{stage:'verb',features:{tense:'imperative',person:'sen'},form:null}]},
  {id:'wrong',lemma:W.byLemma.sevmek.id,features:{tense:'present',person:'o'},form:'sevüyor',group:null}
 ]};
 const cleaned=L.cleanState(state),tokens=cleaned.current.tokens;
 assert.equal(cleaned.current.rated,true);assert.equal(cleaned.current.attempts,1);assert.equal(cleaned.current.bankSeed,91);
 assert.equal(B.surface(tokens[0]),'gelmek');assert.equal(B.surface(tokens[1]),'görüyon');assert.equal(B.surface(tokens[2]),'sevüyor');
 B.undo(tokens[1]);assert.equal(B.surface(tokens[1]),'görmek');
 assert.deepEqual(L.cleanState(cleaned),cleaned,'migration is idempotent');
 const past=C.tasks.find(t=>t.min<81&&t.groups.some(g=>g.slots.some(s=>s.features?.tense==='past')));
 state.current.taskId=past.id;state.current.levelAtStart=50;
 assert.equal(B.surface(L.cleanState(state).current.tokens[1]),'görüyon','present alternatives in a past task follow the level policy too');
});
test('unlock buttons belong to their own views and grammar opens its own training',()=>{
 const a=app();a.run('refreshUnlockUI()');assert.equal(a.el('unlockFloatingButton').hidden,false);assert.equal(a.el('grammarUnlockFloatingButton').hidden,true);
 a.run('showView("grammar",null)');assert.equal(a.el('unlockFloatingButton').hidden,true);assert.equal(a.el('grammarUnlockFloatingButton').hidden,false,'fresh grammar keeps the same bottom entry');assert.equal(a.el('grammarUnlockFloatingButton').disabled,true,'words are needed first');
 a.unlock(undefined,{grammar:false});assert.equal(a.el('grammarUnlockFloatingButton').hidden,false,'all words learned must not hide grammar button');
 a.el('grammarUnlockFloatingButton').click();assert.equal(a.run('GrammarTrainer.active'),true);assert.equal(a.run('currentMainView'),'grammar');
 a.run('showView("flashcards",null)');assert.equal(a.el('unlockFloatingButton').hidden,true);assert.equal(a.el('grammarUnlockFloatingButton').hidden,true);
 a.run('openLearnMode("sentences")');assert.equal(a.el('unlockFloatingButton').hidden,true);assert.equal(a.el('grammarUnlockFloatingButton').hidden,true);
 a.run('showView("dictionary",null)');assert.equal(a.el('unlockFloatingButton').hidden,true,'all words learned keeps the prior completed state');
});
