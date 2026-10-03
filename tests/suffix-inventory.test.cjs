const {test}=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words'),T=require('../lib/turkish'),B=require('../lib/building-blocks'),C=require('../lib/curriculum'),L=require('../lib/learning');
const {app}=require('./helpers/app.cjs');
const rules=C.skills.map(s=>s.id);
const fixture=t=>({id:13,bankSeed:13,tokens:t.groups.flatMap(g=>g.slots).map((s,i)=>({...s,id:'t'+i,features:B.baseFeatures(s.lemma)}))});
const stock=(t,cur,text)=>B.availableCards(t,cur,rules).find(c=>c.text===text)?.count||0;
function find(a,predicate){
 const seek=()=>a.el('wordBank').children.find(predicate);let found=seek();
 while(!found&&!a.el('sentenceBankPages').hidden&&!a.el('sentenceBankPages').children[0].disabled){a.el('sentenceBankPages').children[0].click();found=seek();}
 while(!found&&!a.el('sentenceBankPages').hidden&&!a.el('sentenceBankPages').children[2].disabled){a.el('sentenceBankPages').children[2].click();found=seek();}
 return found;
}
function game(id){
 const a=app({bankHeight:700});a.unlock();
 a.run('startSentenceGame();SentenceGame.engine.state.level=6;SentenceGame.engine.state.introduced=AndreCurriculum.skills.map(s=>s.id);SentenceGame.engine.begin(AndreCurriculum.tasks.find(t=>t.id==='+JSON.stringify(id)+'),"older");SentenceGame.render();');
 return a;
}
test('finite suffix stock solves all 733 tasks and returns exactly on undo',()=>{
 for(const t of C.tasks){
  const cur=fixture(t),initial=B.availableCards(t,cur,rules);
  for(const [i,slot] of t.groups.flatMap(g=>g.slots).entries()){
   for(const step of B.plan(slot)){
    const before=stock(t,cur,step.text),card=B.availableCards(t,cur,rules).find(c=>c.text===step.text);
    assert.ok(before>0,t.id+' '+step.text);assert.equal(B.apply(cur.tokens[i],card),true);
    assert.equal(stock(t,cur,step.text),before-1,t.id+' consume');
   }
   assert.equal(B.surface(cur.tokens[i]),T.surface(slot),t.id);
  }
  for(const token of cur.tokens)while(B.undo(token)){}
  assert.deepEqual(B.availableCards(t,cur,rules),initial,t.id+' refund');
 }
});
test('placed suffix vanishes from the bank, stays spent on reload and returns on tap undo',()=>{
 const a=game('present-sevmek-o'),card=find(a,b=>b.dataset.turkishBlock==='-iyo');
 const stale=a.json('SentenceGame.allowedCards().find(c=>c.text==="-iyo")');
 card.click();find(a,b=>b.dataset.modernToken&&b.textContent==='sevmek').click();
 assert.equal(find(a,b=>b.dataset.turkishBlock==='-iyo'),undefined);
 const cur=a.json('SentenceGame.engine.state.current'),token=cur.tokens.find(t=>t.form==='seviyo'),other=cur.tokens.find(t=>t.id.startsWith('extra-')&&W.byId[t.lemma].type==='verb');
 a.run('SentenceGame.apply('+JSON.stringify(stale)+','+JSON.stringify(other.id)+');');
 assert.equal(a.run('TurkishBlocks.surface(SentenceGame.engine.state.current.tokens.find(t=>t.id==='+JSON.stringify(other.id)+'))'),W.byId[other.lemma].tr,'stale card cannot be spent twice');
 const loaded=app({storage:a.storage,bankHeight:700});loaded.run('startSentenceGame()');
 assert.equal(find(loaded,b=>b.dataset.turkishBlock==='-iyo'),undefined);
 find(loaded,b=>b.dataset.modernToken===token.id).click();loaded.el('sentenceToken-'+token.id).click();
 assert.equal(loaded.el('sentenceToken-'+token.id).textContent,'sevmek');
 assert.ok(find(loaded,b=>b.dataset.turkishBlock==='-iyo'));assert.equal(loaded.run('SentenceGame.engine.state.current.attempts'),0);
});
test('wrong suffixes are consumed and replacement, reset and saved undo release them',()=>{
 const t=C.tasks.find(t=>t.id==='poss-case-ben-ev'),cur=fixture(t),noun=cur.tokens.find(x=>W.byId[x.lemma].tr==='ev');
 const correct=B.cards(t,cur,rules).find(c=>c.text==='-im'),wrong=B.cards(t,cur,rules).find(c=>c.text!=='-im'&&c.operations.some(op=>op.stage==='poss'));
 assert.ok(wrong);B.apply(noun,wrong);assert.equal(stock(t,cur,wrong.text),0);
 B.apply(noun,correct);assert.equal(stock(t,cur,wrong.text),1);assert.equal(stock(t,cur,'-im'),0);
 const state=L.empty();state.current={...cur,taskId:t.id,kind:'older',levelAtStart:t.min,blocksVersion:2};
 const clean=L.cleanState(state).current;assert.equal(stock(t,clean,'-im'),0);B.undo(clean.tokens.find(x=>x.id===noun.id));assert.equal(stock(t,clean,'-im'),1);
 const a=game('present-sevmek-o');find(a,b=>b.dataset.turkishBlock==='-iyo').click();find(a,b=>b.dataset.modernToken&&b.textContent==='sevmek').click();
 a.run('resetSentence()');assert.ok(find(a,b=>b.dataset.turkishBlock==='-iyo'));
});
test('previous saves without a card label recover spent correct and wrong suffixes',()=>{
 const t=C.tasks.find(t=>t.id==='present-sevmek-o'),cur=fixture(t),verb=cur.tokens.find(x=>W.byId[x.lemma].type==='verb');
 const correct=B.cards(t,cur,rules).find(c=>c.text==='-iyo');B.apply(verb,correct);delete verb.attachments[0].block;
 assert.equal(stock(t,cur,'-iyo'),0);B.undo(verb);assert.equal(stock(t,cur,'-iyo'),1);
 const alternative=B.cards(t,cur,rules).find(c=>c.text!=='-iyo');assert.ok(alternative);
 B.apply(verb,alternative);delete verb.attachments[0].block;assert.equal(stock(t,cur,alternative.text),0);
 const saved=L.empty();saved.current={...cur,taskId:t.id,kind:'older',levelAtStart:6,blocksVersion:2};
 const loaded=L.cleanState(saved).current;assert.equal(stock(t,loaded,alternative.text),0);
 B.undo(loaded.tokens.find(x=>x.id===verb.id));assert.equal(stock(t,loaded,alternative.text),1);
});
test('two required copies of the same suffix disappear individually across different words',()=>{
 const a=game('dik-gelmek-sen'),t=C.tasks.find(t=>t.id==='dik-gelmek-sen');
 const copies=()=>a.el('wordBank').children.filter(b=>b.dataset.turkishBlock==='-in').length;
 assert.equal(copies(),2);
 find(a,b=>b.dataset.turkishBlock==='-in').click();find(a,b=>b.dataset.modernToken&&b.textContent==='sen').click();assert.equal(copies(),1);
 const cur=a.json('SentenceGame.engine.state.current'),verb=cur.tokens.find(x=>W.byId[x.lemma].tr==='gelmek');
 find(a,b=>b.dataset.modernToken===verb.id).click();
 for(const step of B.plan(t.groups[0].slots.find(s=>s.lemma===verb.lemma)))find(a,b=>b.dataset.turkishBlock===step.text).click();
 assert.equal(copies(),0);assert.equal(a.el('sentenceToken-'+verb.id).textContent,'geldiğini');
 a.el('sentenceToken-'+verb.id).click();a.el('sentenceToken-'+verb.id).click();assert.equal(copies(),1);
});
