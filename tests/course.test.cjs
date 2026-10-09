const {test}=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words'),T=require('../lib/turkish'),B=require('../lib/building-blocks'),C=require('../lib/course'),G=require('../lib/course-grammar'),L=require('../lib/course-learning');
const {app}=require('./helpers/app.cjs');
function engine(){const data=new Map();const storage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};let seed=33;return {data,storage,e:new L.Engine({storage,random:()=>((seed=seed*16807%2147483647)/2147483647)})};}
function unlock(data,words){data.set(L.UNLOCK,JSON.stringify(Object.fromEntries([...words].map(id=>[id,{toTurkish:true,toGerman:true}]))));}
function solve(e){const t=e.task();e.state.current.tokens=t.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:'s'+i,group:g.id})));return e.check();}
test('all authored references preserve their intended grammatical interpretation and concrete cards',()=>{
 assert.equal(C.tasks.length,188);assert.equal(C.bands.length,32);
 for(const task of C.tasks){const band=C.bandAt(task.min),source=band.examples.find(e=>e.id===task.id);assert.equal(T.norm(task.answer),T.norm(source.tr));
  for(const s of task.groups.flatMap(g=>g.slots)){
   const token={lemma:s.lemma,features:B.baseFeatures(s.lemma),nominal:s.nominal};
   for(const op of B.plan(s)){const card={text:op.text,operations:[op]};assert.ok(B.apply(token,card),task.id+' '+op.text);}
   assert.equal(T.norm(B.surface(token)),T.norm(T.surface(s)),task.id);
  }
 }
 assert.equal(C.tasks.find(t=>t.id==='S09d').groups[0].slots.at(-1).features.tense,'past');
 assert.equal(C.tasks.find(t=>t.id==='S10c').groups[0].slots.at(-1).features.tense,'future');
 assert.equal(C.tasks.find(t=>t.id==='S05b').groups[0].slots[1].features.case,'accusative');
});
test('word and grammar unlocks alone complete all 32 packages and reach 160',()=>{
 const P=require('../lib/course-progress'),{e,data}=engine(),words=new Set();let lessons=0;
 for(const p of P.packages){p.words.forEach(id=>words.add(id));unlock(data,words);e.refreshPool();
  while(!p.grammar.every(id=>e.grammar.unlocked().has(id))){
   const ex=e.grammar.next(words,p.index+1);assert.ok(ex,'Missing lesson in section '+(p.index+1));assert.ok(++lessons<3000);assert.ok(e.grammar.check(ex.answer).correct);
  }
  e.syncProgress();assert.equal(e.state.opened,Math.min(32,p.index+2));
 }
 assert.equal(e.state.level,160);assert.equal(e.state.completed,0);assert.equal(e.state.opened,32);assert.equal(e.state.standard,true);
});
test('lessons count three answers in each direction, retain partial progress and never count help twice',()=>{
 const {e,data,storage}=engine(),words=new Set([W.byLemma.ev.id]);unlock(data,words);e.state.opened=4;
 const id=G.entries.find(x=>x.label==='Dativ'&&x.text==='-e').id;let ex=e.grammar.next(words,4,id);
 assert.equal(e.grammar.check('falsch').correct,false);assert.equal(e.grammar.state.current.answered,false,'wrong answers remain editable');
 assert.equal(e.grammar.next(words,1,id),null);e.grammar.reveal();assert.equal(e.grammar.check(ex.answer).unlocked,false);assert.equal(e.grammar.count(id).tr,0);
 for(let i=0;i<5;i++){ex=e.grammar.next(words,4,id);assert.equal(e.grammar.check(ex.answer).correct,true);assert.equal(e.grammar.check(ex.answer).ignored,true);}
 let restored=new G.Manager(storage);assert.equal(restored.unlocked().has(id),false);ex=restored.next(words,4,id);assert.equal(restored.check(ex.answer).unlocked,true);
 assert.equal(restored.unlocked().size,1);assert.ok(!restored.unlocked().has(G.entries.find(x=>x.label==='Dativ'&&x.text==='-ya')?.id));
});
test('new feminine nouns and regular verbs enter structures without editing sentence lists or old core packages',()=>{
 const before=JSON.stringify(G.core);
 W.register({id:'test-kedi',tr:'kedi',de:'Katze',type:'noun',semantic:'animal',deGrammar:{gender:'f',singular:'Katze',plural:'Katzen',to:'zur Katze',at:'bei der Katze',from:'von der Katze'}});
 W.register({id:'test-ucmak',tr:'uçmak',de:'schauen',type:'verb',stem:'uç',progressiveStem:'uç',aorist:'uçar',deGrammar:{infinitive:'schauen',present:['schaue','schaust','schaut','schauen','schaut','schauen'],participle:'geschaut',auxiliary:'haben',frame:'simple'}});
 const words=new Set(W.words.map(w=>w.id)),generated=C.generate({words,section:9,seed:7,limit:200});
 assert.ok(generated.some(t=>t.de==='Meine Katze ist schön.'));assert.ok(generated.some(t=>t.requires.includes('test-ucmak')));
 generated.forEach(t=>G.register(t));assert.equal(JSON.stringify(G.core),before);
 for(const t of generated)assert.ok(t.requires.every(id=>words.has(id)));
 const e=engine();unlock(e.data,words);assert.equal(e.e.available().length,0,'new vocabulary never grants grammar');
 W.register({id:'test-incelemek',tr:'incelemek',de:'suchen',type:'verb',stem:'incele',progressiveStem:'incel',aorist:'inceler',deGrammar:{infinitive:'suchen',present:['suche','suchst','sucht','suchen','sucht','suchen'],participle:'gesucht',auxiliary:'haben',frame:'object'}});
 words.add('test-incelemek');const complex=C.variants(C.tasks.find(t=>t.id==='S20b'),words).find(t=>t.requires.includes('test-incelemek'));
 assert.ok(complex);assert.equal(complex.answer,'senin evi incelediğini biliyorum');assert.equal(complex.de,'Ich weiß, dass du das Haus gesucht hast.');
});
test('learned B1 register and saved generated tasks survive mistakes and reload',()=>{
 const {e,data,storage}=engine(),words=new Set(W.words.map(w=>w.id));unlock(data,words);e.grammar.state.unlocked=Object.fromEntries(G.entries.map(x=>[x.id,true]));e.grammar.save();e.refreshPool();
 const t=e.available().find(t=>t.ast&&t.groups[0].slots.at(-1).features.tense==='present');assert.ok(t);e.begin(t,'current');assert.equal(e.check({unknown:true}).delta,0);assert.equal(e.state.level,160);
 const loaded=new L.Engine({storage});assert.deepEqual(loaded.task(),e.task());assert.equal(loaded.state.current.rated,true);assert.equal(solve(loaded).delta,0);assert.equal(loaded.state.level,160);
 loaded.next();assert.ok(!loaded.task().groups.flatMap(g=>g.slots).some(s=>s.features.register==='colloquial'));
});
test('grammar levels explain prepared steps, while navigation preserves the learned rules',()=>{const a=app();require('./helpers/progress.cjs').learnTo(a,1);a.run('openGrammarTraining()');assert.equal(a.run('GrammarTrainer.active'),true);assert.equal(a.el('grammarPanel').hidden,true);assert.equal(a.run('SentenceGame.current'),null);const before=a.json('SentenceGame.engine.grammar.state');a.run('showView("dictionary",null)');assert.equal(a.run('GrammarTrainer.active'),false);a.run('openGrammarTraining()');assert.match(a.el('grammarTrainer').textContent,/Level 1/);assert.deepEqual(a.json('SentenceGame.engine.grammar.state'),before);a.run('GrammarTrainer.close()');assert.equal(a.el('grammarUnlockFloatingButton').hidden,true);assert.equal(a.el('grammarList').querySelectorAll('.grammar-level').length,160);});

test('all 188 new reference tasks can be solved using the visible paged word and suffix controls',()=>{
 const a=app();a.unlock();a.run('startSentenceGame()');
 function item(predicate){let found;for(let attempt=0;attempt<100;attempt++){
  found=a.el('wordBank').children.find(predicate);if(found)return found;
  const pager=a.el('sentenceBankPages'),next=pager.children[2],prev=pager.children[0];
  if(!next||next.disabled){if(prev&&!prev.disabled){while(!a.el('sentenceBankPages').children[0].disabled)a.el('sentenceBankPages').children[0].click();}else return null;}
  else next.click();
 }return null;}
 for(const task of C.tasks){
  a.run('SentenceGame.engine.begin(AndreCourse.tasks.find(t=>t.id==='+JSON.stringify(task.id)+'),"older");SentenceGame.render();');
  const cur=a.json('SentenceGame.current');
  for(const slot of task.groups[0].slots){const token=cur.tokens.find(t=>t.lemma===slot.lemma&&!t.used);token.used=true;
   const word=item(b=>b.dataset.modernToken===token.id);assert.ok(word,task.id+' word');word.click();
   for(const step of B.plan(slot)){const card=item(b=>b.dataset.turkishBlock===step.text);assert.ok(card,task.id+' '+step.text);card.click();}
  }
  a.run('checkSentence()');assert.equal(a.run('SentenceGame.current.finished'),true,task.id);a.run('stopSentenceGame();startSentenceGame()');
 }
});
test('old saves keep words, level, rated corrections and learned allomorphs through migration',()=>{
 const Legacy=require('../lib/learning'),LegacyC=require('../lib/curriculum'),LegacyG=require('../lib/grammar');
 const {data,storage}=engine();data.delete(L.KEY);const old=new Legacy.Engine({storage});
 const task=LegacyC.tasks.find(t=>t.id==='object-görmek-sen-w004');
 data.set(Legacy.UNLOCK,JSON.stringify(Object.fromEntries(W.words.map(w=>[w.tr,{toTurkish:true,toGerman:true}]))));old.grammar.state.unlocked=Object.fromEntries(LegacyG.entries.map(e=>[e.id,true]));old.grammar.save();old.state.level=26;old.state.highestLevel=30;old.begin(task,'current');old.check();old.save();
 const raw=data.get(Legacy.KEY),migrated=new L.Engine({storage});assert.ok(migrated.state.level<25);assert.equal(migrated.state.previousSentenceLevel.level,25);assert.equal(migrated.state.previousSentenceLevel.highestLevel,30);assert.equal(migrated.state.current.rated,true);assert.equal(migrated.state.current.taskId,task.id);assert.equal(data.get(Legacy.KEY),raw);
 const before=migrated.state.current;migrated.next();assert.equal(migrated.state.current,before,'unlearned new construction waits without losing the correction');
 for(const id of G.required(migrated.task()))migrated.grammar.state.unlocked[id]=true;
 const level=migrated.state.level;assert.equal(solve(migrated).delta,0);assert.equal(migrated.state.level,level);
});
test('grammar answer normalization accepts genuine variants but retains Turkish vowel distinctions',()=>{
 assert.ok(G.alternatives('Mama kommt.','de').includes(G.norm('Die Mutter kommt','de')));
 assert.ok(G.alternatives('Er kommt.','de').includes(G.norm('Sie kommt','de')));
 assert.ok(!G.alternatives('geldin','tr').includes(G.norm('geldım','tr')));
 assert.ok(!G.alternatives('Du kommst.','de').includes(G.norm('Du kommst nicht.','de')));
 const {e,data}=engine();unlock(data,new Set([W.byLemma.ev.id,W.byLemma.güzel.id]));e.state.level=5;e.grammar.state.unlocked['use:statement']=true;
 assert.ok(e.next(),'practice with learned material remains available while the next package is incomplete');assert.equal(e.state.level,1);
});
