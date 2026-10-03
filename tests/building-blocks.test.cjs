const {test}=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words'),T=require('../lib/turkish'),B=require('../lib/building-blocks'),C=require('../lib/curriculum'),L=require('../lib/learning');
const {app}=require('./helpers/app.cjs');
const G=require('../lib/grammar');
function fixture(task,seed=13){return {id:seed,bankSeed:seed,tokens:task.groups.flatMap(g=>g.slots).map((s,i)=>({...s,id:'t'+i,features:B.baseFeatures(s.lemma),group:null}))};}
const rules=C.skills.map(s=>s.id);
function bankItem(a,predicate){
 const find=()=>a.el('wordBank').children.find(predicate);let item=find();
 while(!item&&!a.el('sentenceBankPages').hidden&&!a.el('sentenceBankPages').children[0].disabled){a.el('sentenceBankPages').children[0].click();item=find();}
 while(!item&&!a.el('sentenceBankPages').hidden&&!a.el('sentenceBankPages').children[2].disabled){a.el('sentenceBankPages').children[2].click();item=find();}
 return item;
}
test('all 733 authored solutions can be assembled from concrete Turkish pieces',()=>{
 for(const task of C.tasks){
  const cur=fixture(task),cards=B.cards(task,cur,rules);
  assert.equal(new Set(cards.map(c=>c.text)).size,cards.length,'visually identical cards must be interchangeable');
  for(const [i,slot] of task.groups.flatMap(g=>g.slots).entries()){
   const token=cur.tokens[i];
   for(const step of B.plan(slot)){
    const card=cards.find(c=>c.text===step.text);assert.ok(card,task.id+' '+step.text);
    assert.equal(B.apply(token,card),true,task.id+' '+step.text);
   }
   assert.equal(B.surface(token),T.surface(slot),task.id+' '+W.byId[slot.lemma].tr);
   while(B.undo(token)){}
   assert.equal(B.surface(token),T.surface({...slot,features:B.baseFeatures(slot.lemma)}),task.id+' undo');
  }
 }
});
test('wrong harmony is visible and rejected rather than corrected automatically',()=>{
 const task=C.tasks.find(t=>t.id==='object-görmek-sen-w004'),cur=fixture(task);
 const token=cur.tokens.find(t=>W.byId[t.lemma].tr==='araba'),step=B.plan(task.groups[0].slots.find(s=>s.lemma===token.lemma))[0];
 B.apply(token,{text:'-yi',operations:[{...step,text:'-yi'}]});
 assert.equal(B.surface(token),'arabayi');
 assert.equal(L.evaluate({...task,groups:[{id:'main',slots:[{lemma:token.lemma,features:{case:'accusative'}}]}]},[{...token,group:'main'}]).correct,false);
 assert.equal(B.undo(token),true);assert.equal(B.surface(token),'araba');
});
test('person, negative, voice and register are Turkish affixes, never translated selectors',()=>{
 for(const task of C.tasks){
  const cur=fixture(task),cards=B.cards(task,cur,rules);
  for(const card of cards){
   assert.match(card.text,/^-?[a-zçğıöşüı ]+$/i,task.id+' '+card.text);
   assert.doesNotMatch(card.text,/^(ich|du|er|sie|mein|dein|unser|Standard|Alltag|Aktiv|Passiv|Imperativ|Wunsch|Grundform|∅)$/i);
   assert.ok(card.operations.every(op=>op.type&&op.stage));
  }
 }
});
test('suffix alternatives are seeded, limited and of the same type and stage',()=>{
 let varied=false;
 for(const task of C.tasks.filter(t=>t.min>=6).slice(0,60)){
  const cur=fixture(task,13),required=task.groups.flatMap(g=>g.slots).flatMap(B.plan),texts=new Set(required.map(s=>s.text));
  const cards=B.cards(task,cur,rules),extras=cards.filter(c=>!texts.has(c.text));
  assert.ok(extras.length<=3);for(const card of extras)assert.ok(card.operations.every(op=>required.some(r=>r.type===op.type&&r.stage===op.stage)));
  assert.deepEqual(cards,B.cards(task,cur,rules));
  assert.deepEqual(cards,B.cards(task,{...cur,tokens:[...cur.tokens].reverse()},rules),'moving words must not reroll endings');
  if(JSON.stringify(cards)!==JSON.stringify(B.cards(task,fixture(task,79),rules)))varied=true;
 }
 assert.equal(varied,true);
});
test('multi-vowel harmony alternatives are complete Turkish allomorphs',()=>{
 const task={groups:[{slots:[{lemma:'w003',features:{predicatePerson:'siz'}}]}]};
 const cur=fixture(task),allowed=new Set(['-sınız','-siniz','-sunuz','-sünüz']);
 for(let seed=1;seed<=40;seed++)for(const card of B.cards(task,{...cur,bankSeed:seed},rules)){
  if(card.operations.some(op=>op.after.predicatePerson==='siz'))assert.ok(allowed.has(card.text),card.text);
  assert.doesNotMatch(card.text,/sıniz|süniz|suniz|sinız/);
 }
});
test('literal spelling and undo history survive export/import and retain first rating',()=>{
 const storage=new Map(),io={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
 const e=new L.Engine({storage:io});storage.set(L.UNLOCK,JSON.stringify(Object.fromEntries(W.words.map(w=>[w.tr,{toGerman:true,toTurkish:true}]))));
 e.grammar.state.unlocked=Object.fromEntries(G.entries.map(e=>[e.id,true]));e.grammar.save();
 const task=C.tasks.find(t=>t.id==='poss-case-ben-ev');e.begin(task,'current');
 const noun=e.state.current.tokens.find(t=>W.byId[t.lemma].tr==='ev');
 for(const step of B.plan(task.groups[0].slots.find(s=>s.lemma===noun.lemma)))B.apply(noun,{text:step.text,operations:[step]});
 noun.group='main';e.check();e.save();const loaded=new L.Engine({storage:io});
 const restored=loaded.state.current.tokens.find(t=>t.id===noun.id);assert.equal(B.surface(restored),'evimdeyim');
 assert.equal(loaded.state.current.rated,true);assert.equal(loaded.state.current.bankSeed,e.state.current.bankSeed);
 B.undo(restored);assert.equal(B.surface(restored),'evimde');B.undo(restored);assert.equal(B.surface(restored),'evim');
});
test('all 160 levels render only Turkish word/affix cards and solve through actual paged controls',()=>{
 const a=app();a.unlock();a.run('startSentenceGame()');
 for(const task of C.tasks){
  a.run('SentenceGame.engine.state.level='+task.min+';SentenceGame.engine.state.introduced=AndreCurriculum.skills.map(s=>s.id);SentenceGame.engine.begin(AndreCurriculum.tasks.find(t=>t.id==='+JSON.stringify(task.id)+'),"older");SentenceGame.render();');
  const cur=a.json('SentenceGame.engine.state.current');
  for(const group of task.groups)for(const slot of group.slots){
   const token=cur.tokens.find(t=>t.lemma===slot.lemma&&!t.used);token.used=true;
   if(task.groups.length>1)a.el('answerZone').children[0].children.find(b=>b.dataset.sentenceGroup===group.id).click();
   const word=bankItem(a,b=>b.dataset.modernToken===token.id);assert.ok(word,task.id+' root');word.click();
   for(const step of B.plan(slot)){
    const card=bankItem(a,b=>b.dataset.turkishBlock===step.text);assert.ok(card,task.id+' '+step.text);
    assert.equal(card.textContent,step.text);assert.equal(card.getAttribute('aria-label'),step.text);card.click();
   }
  }
  a.run('checkSentence()');assert.equal(a.run('SentenceGame.engine.state.current.finished'),true,task.id);a.advance(1500);
 }
});
test('introductions and all authored tasks receive unlocked same-part-of-speech word alternatives',()=>{
 const storage=new Map([[L.UNLOCK,JSON.stringify(Object.fromEntries(W.words.map(w=>[w.tr,{toGerman:true,toTurkish:true}])) )]]);
 const io={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
 const e=new L.Engine({storage:io,random:()=>.43});
 for(const task of C.tasks){
  e.begin(task,'intro');
  const required=new Set(task.groups.flatMap(g=>g.slots).map(s=>s.lemma)),types=new Set([...required].map(id=>W.byId[id].type));
  const eligible=W.words.filter(w=>!required.has(w.id)&&types.has(w.type));
  const extras=e.state.current.tokens.filter(t=>t.id.startsWith('extra-'));
  assert.equal(extras.length,Math.min(2,eligible.length),task.id);
  for(const extra of extras){assert.ok(types.has(W.byId[extra.lemma].type));assert.ok(!required.has(extra.lemma));}
 }
});
test('long suffixes remain reachable with an anchored word in a one-row bank',()=>{
 const a=app({bankHeight:80});a.unlock();a.run('startSentenceGame()');
 a.run('SentenceGame.engine.begin(AndreCurriculum.tasks.find(t=>t.id==="ability-gelmek-siz"),"older");SentenceGame.render();');
 const token=a.json('SentenceGame.engine.state.current.tokens').find(t=>t.lemma==='w013');
 const card=bankItem(a,b=>b.dataset.turkishBlock==='-ebilirsiniz');assert.ok(card);assert.ok(card.classList.contains('sentence-wide-card'));card.click();
 bankItem(a,b=>b.dataset.modernToken===token.id).click();
 assert.equal(a.run('TurkishBlocks.surface(SentenceGame.engine.state.current.tokens.find(t=>t.id==='+JSON.stringify(token.id)+'))'),'gelebilirsiniz');
});
