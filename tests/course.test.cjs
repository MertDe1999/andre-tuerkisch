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
test('a real learner can progress from 1 to 160 using each small word package, lessons and direct applications',()=>{
 const {e,data}=engine(),words=new Set();let rounds=0,lessons=0,last=0;
 while((e.state.level<160||!e.bandReady(C.bands[31]))&&rounds++<3500){
  const band=C.bands[e.state.opened-1];for(const s of C.bands.slice(0,e.state.opened))for(const tr of s.words)words.add(W.byLemma[tr].id);unlock(data,words);e.refreshPool();
  if(last!==e.state.opened){last=e.state.opened;let ex;for(let n=0;n<1500&&(ex=e.grammar.next(words,last));n++){assert.ok(++lessons<2000);assert.ok(G.byId[ex.entryId].min<=band.end);assert.ok(e.grammar.check(ex.answer).correct);}}
  const current=e.next();assert.ok(current,'No task at level '+e.state.level);
  assert.ok(current.task.requires.every(id=>words.has(id)));assert.ok(G.canTask(current.task,e.grammar.unlocked()));
  const result=solve(e);assert.equal(result.correct,true);assert.ok(result.delta>=0);
 }
 assert.equal(e.state.level,160);assert.ok(e.bandReady(C.bands[31]),'Course stuck after '+rounds+' tasks at '+e.state.level+'; missing '+e.missingSkills().map(x=>x.id));
 assert.equal(e.state.opened,32);assert.equal(e.state.standard,true);
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
 W.register({id:'test-bakmak',tr:'bakmak',de:'schauen',type:'verb',stem:'bak',progressiveStem:'bak',aorist:'bakar',deGrammar:{infinitive:'schauen',present:['schaue','schaust','schaut','schauen','schaut','schauen'],participle:'geschaut',auxiliary:'haben',frame:'simple'}});
 const words=new Set(W.words.map(w=>w.id)),generated=C.generate({words,section:9,seed:7,limit:200});
 assert.ok(generated.some(t=>t.de==='Meine Katze ist schön.'));assert.ok(generated.some(t=>t.requires.includes('test-bakmak')));
 generated.forEach(t=>G.register(t));assert.equal(JSON.stringify(G.core),before);
 for(const t of generated)assert.ok(t.requires.every(id=>words.has(id)));
 const e=engine();unlock(e.data,words);assert.equal(e.e.available().length,0,'new vocabulary never grants grammar');
 W.register({id:'test-aramak',tr:'aramak',de:'suchen',type:'verb',stem:'ara',progressiveStem:'ar',aorist:'arar',deGrammar:{infinitive:'suchen',present:['suche','suchst','sucht','suchen','sucht','suchen'],participle:'gesucht',auxiliary:'haben',frame:'object'}});
 words.add('test-aramak');const complex=C.variants(C.tasks.find(t=>t.id==='S20b'),words).find(t=>t.requires.includes('test-aramak'));
 assert.ok(complex);assert.equal(complex.answer,'senin evi aradığını biliyorum');assert.equal(complex.de,'Ich weiß, dass du das Haus gesucht hast.');
});
test('B1 register persists after a level loss, and saved generated tasks resume unchanged',()=>{
 const {e,data,storage}=engine();const words=new Set(W.words.map(w=>w.id));unlock(data,words);e.state.level=81;e.state.highestLevel=81;e.state.opened=17;e.state.standard=true;e.refreshPool();e.grammar.state.unlocked=Object.fromEntries(G.entries.map(x=>[x.id,true]));e.grammar.save();
 const t=e.available().find(t=>t.ast&&t.groups[0].slots.at(-1).features.tense==='present');assert.ok(t);e.begin(t,'current');e.check({unknown:true});assert.equal(e.state.level,80);assert.equal(e.state.standard,true);assert.equal(e.state.opened,17);
 const loaded=new L.Engine({storage});assert.deepEqual(loaded.task(),e.task());assert.equal(loaded.state.current.rated,true);assert.equal(solve(loaded).delta,0);
 loaded.next();assert.ok(!loaded.task().groups.flatMap(g=>g.slots).some(s=>s.features.register==='colloquial'));
});
test('grammar has a separate minimal translation view and navigation preserves the exercise',()=>{
 const a=app();a.unlock(['ev','güzel','araba','bu'],{grammar:false});a.run('openGrammarTraining()');assert.equal(a.run('GrammarTrainer.active'),true);assert.equal(a.el('grammarPanel').hidden,true);
 assert.ok(a.el('grammarAnswer'));assert.equal(a.run('SentenceGame.current'),null);
 const id=a.run('SentenceGame.engine.grammar.state.current.entryId');a.run('showView("dictionary",null)');assert.equal(a.run('GrammarTrainer.active'),false);a.run('openGrammarTraining()');assert.equal(a.run('SentenceGame.engine.grammar.state.current.entryId'),id);
 a.run('GrammarTrainer.close()');a.unlock(undefined,{grammar:false});
 a.run('SentenceGame.engine.state.opened=4;SentenceGame.engine.state.level=20;SentenceGame.engine.refreshPool();SentenceGame.engine.grammar.state.current=null;SentenceGame.engine.grammar.state.unlocked=Object.fromEntries(AndreCourseGrammar.core.slice(0,4).flat().map(id=>[id,true]));refreshGrammarUI();updateUnlockButtons()');
 assert.ok(a.run('SentenceGame.engine.grammar.ready(SentenceGame.engine.unlocked(),4).length>0'),'optional forms remain available through their rule');
 assert.equal(a.el('grammarUnlockFloatingButton').hidden,false,'optional forms also use the shared unlock button');
 assert.ok(a.el('grammarList').children.some(c=>c.textContent==='Im Satzbau anwenden'));
});
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
 const raw=data.get(Legacy.KEY),migrated=new L.Engine({storage});assert.equal(migrated.state.level,25);assert.equal(migrated.state.highestLevel,30);assert.equal(migrated.state.current.rated,true);assert.equal(migrated.state.current.taskId,task.id);assert.equal(data.get(Legacy.KEY),raw);
 const before=migrated.state.current;migrated.next();assert.equal(migrated.state.current,before,'unlearned new construction waits without losing the correction');
 for(const id of G.required(migrated.task()))migrated.grammar.state.unlocked[id]=true;
 assert.equal(solve(migrated).delta,0);assert.equal(migrated.state.level,25);
});
test('grammar answer normalization accepts genuine variants but retains Turkish vowel distinctions',()=>{
 assert.ok(G.alternatives('Mama kommt.','de').includes(G.norm('Die Mutter kommt','de')));
 assert.ok(G.alternatives('Er kommt.','de').includes(G.norm('Sie kommt','de')));
 assert.ok(!G.alternatives('geldin','tr').includes(G.norm('geldım','tr')));
 assert.ok(!G.alternatives('Du kommst.','de').includes(G.norm('Du kommst nicht.','de')));
 const {e,data}=engine();unlock(data,new Set([W.byLemma.ev.id,W.byLemma.güzel.id]));e.state.level=5;e.grammar.state.unlocked['use:statement']=true;
 assert.equal(e.next(),null,'unfinished core package prompts the next unlock instead of looping');
});
