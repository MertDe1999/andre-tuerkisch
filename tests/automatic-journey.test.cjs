const {test}=require('node:test'),assert=require('node:assert/strict'),L=require('../lib/guided-learning'),P=require('../lib/learning-path'),C=require('../lib/course'),A=require('../lib/lesson-delivery'),W=require('../data/words');
const {app}=require('./helpers/app.cjs'),{learnTo}=require('./helpers/progress.cjs');
function learner(){const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage,random:()=>.37});map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}]))));e.round().intro=2;A.mixed(e);e.available();e.refreshPool=()=>{};return {e,map,storage};}
function solve(e){const c=e.state.current,f=A.prepare(e);f.heard=true;c.tokens=c.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:g.id+i,group:g.id})));return A.check(e,{answer:c.direction==='de'?c.task.de:c.task.answer});}
function open(a){learnTo(a,1);a.run('SentenceGame.engine.round().intro=2;openSentenceTest(null)');}
function answer(a){a.run(`{const c=SentenceGame.current;c.delivery.text=true;c.tokens=c.task.groups.flatMap(g=>g.slots.map((s,i)=>({...AndreCourse.copy(s),id:g.id+i,group:g.id})));c.draft=c.direction==='de'?c.task.de:c.task.answer;SentenceGame.check();}`);}

test('one course alternates all four formats and preserves its existing six-task checkpoint',()=>{
 const {e}=learner(),seen=[];for(let i=0;i<6;i++){e.next();seen.push(A.prepare(e).mode);assert.ok(solve(e).correct);}assert.deepEqual(seen,['build','listen','dialog','listen','write','listen']);assert.equal(e.stageSummary().done,6);assert.equal(e.flow.level,1);assert.equal(e.next(),null);assert.ok(e.continueStage());
});
test('mixed theme order, current format, answer order and Turkish draft survive reload',()=>{
 const {e,storage}=learner();for(let i=0;i<4;i++){e.next();solve(e);}e.next();const f=A.prepare(e);assert.equal(f.mode,'write');e.state.current.draft='Mert güzel';e.save();const restored=new L.Engine({storage,random:()=>.9});assert.equal(A.prepare(restored).mode,'write');assert.equal(restored.state.current.draft,'Mert güzel');assert.deepEqual(restored.flow.round.themeOrder,e.flow.round.themeOrder);
});
test('close alternatives use known words and forms and exclude equivalent answers',()=>{
 const {e}=learner();e.next();solve(e);const c=e.next(),f=A.prepare(e);assert.ok(f.options.length>=2);assert.ok(f.options.includes(c.task.de));assert.equal(new Set(f.options).size,f.options.length);assert.ok(f.access.words.every(id=>e.unlocked().has(id)));assert.ok(f.access.grammar.every(id=>e.practiceGrammar().has(id)));const old=[...f.options];assert.deepEqual(A.prepare(e).options,old);
});
test('audio cannot grant course credit, text fallback is recorded distinctly and correction stays assisted',()=>{
 const {e}=learner();e.next();solve(e);const c=e.next(),f=A.prepare(e),before=JSON.stringify(e.flow);assert.ok(A.check(e,{answer:c.task.de}).ignored);assert.equal(JSON.stringify(e.flow),before);f.text=true;assert.equal(A.check(e,{answer:'falsch'}).correct,false);assert.equal(A.check(e,{answer:c.task.de}).correct,true);assert.equal(e.round().items.at(-1).direct,false);assert.equal(e.state.deliveryStats.read.done,1);assert.equal(e.state.deliveryStats.listen,undefined);
});
test('old German drafts become recognition without losing their saved text or previous first error',()=>{
 const {e}=learner();e.next();solve(e);const c=e.next();c.draft='Mein alter Entwurf';c.attempts=1;c.rated=true;c.firstOutcome='wrong';const f=A.prepare(e);assert.equal(c.previousGermanDraft,'Mein alter Entwurf');assert.equal(c.draft,'');assert.equal(f.mode,'listen');f.text=true;A.check(e,{answer:c.task.de});assert.equal(e.round().items.at(-1).direct,false);
});
test('a one-answer edge case never creates German typing or false unassisted evidence',()=>{
 const {e}=learner();e.next();solve(e);const c=e.next();e.available=()=>[c.task];const f=A.prepare(e);assert.equal(f.mode,'listen');assert.equal(f.options.length,1);assert.equal(c.assisted,true);f.text=true;assert.ok(A.check(e,{answer:c.task.de}).correct);assert.equal(e.round().items.at(-1).direct,false);
});
test('fractional progress reflects learning and cannot unlock a level, even at 99 percent',()=>{
 const {e}=learner(),before=JSON.stringify(e.flow),p=A.progress(e);assert.equal(JSON.stringify(e.flow),before);e.next();solve(e);assert.ok(A.progress(e).percent>p.percent);assert.equal(e.flow.level,1);e.flow.level=e.flow.frontier=40;e.flow.round=null;assert.equal(A.progress(e).percent,97.5);e.flow.level=e.flow.frontier=160;e.flow.finished=true;assert.equal(A.progress(e).percent,100);
});
test('damaged saved format and option permissions are rebuilt without dropping the task',()=>{
 const {e}=learner();e.next();solve(e);const c=e.next(),id=c.id;c.delivery={version:1,mode:'listen',options:null};const f=A.prepare(e);assert.ok(f.options.length>=2);f.options=[];assert.ok(A.prepare(e).options.length>=2);const repaired=c.delivery;repaired.access.grammar=null;assert.doesNotThrow(()=>A.prepare(e));assert.equal(c.id,id);assert.ok(Array.isArray(repaired.access.grammar));
});
test('one visible entry retires mode/theme controls; every automatic format retains André and Ben',()=>{
 const a=app();assert.equal(a.el('sentenceTopicList').children.length,1);assert.equal(a.el('practiceModes').hidden,true);open(a);const formats=new Set();for(let i=0;i<6;i++){formats.add(a.run('SentenceGame.current.delivery.mode'));assert.equal(a.el('sentenceDuel').hidden,false);assert.ok(a.document.body.classList.contains('sentence-journey-active'));if(a.run('SentenceGame.current.direction')==='de')assert.equal(a.el('sentenceReadingKeyboard').hidden,true);answer(a);if(i<5)a.el('sentenceNextButton').click();}assert.equal(formats.size,4);a.run('showView("dictionary",null)');assert.equal(a.document.body.classList.contains('sentence-journey-active'),false);
});
test('Turkish writing uses the shared keyboard and keeps drafts through navigation',()=>{
 const a=app();open(a);for(let i=0;i<4;i++){answer(a);a.el('sentenceNextButton').click();}assert.equal(a.run('SentenceGame.current.delivery.mode'),'write');assert.equal(a.el('sentenceReadingKeyboard').hidden,false);assert.equal(a.el('sentenceReadingKeyboard').getAttribute('lang'),'tr');a.run('SentenceGame.typeReading("Mert güzel")');a.run('closeSentenceTest();openSentenceTest(null)');assert.equal(a.run('SentenceGame.current.draft'),'Mert güzel');assert.equal(a.run('SentenceGame.current.delivery.mode'),'write');
});
test('listening hides the source until completion, cancellation cannot unlock its options',()=>{
 const a=app();open(a);a.run(`window.spoken=[];window.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};window.speechSynthesis={cancel(){},getVoices(){return[{lang:'tr-TR'}]},speak(u){spoken.push(u);u.onstart?.()}}`);answer(a);a.el('sentenceNextButton').click();assert.equal(a.run('SentenceGame.current.delivery.mode'),'listen');assert.equal(a.el('sentencePrompt').textContent,'Hör genau hin');assert.ok(a.el('sentenceReading').querySelectorAll('.study-option').every(b=>b.disabled));a.run('spoken[0].onend()');assert.equal(a.run('SentenceGame.current.delivery.heard'),true);assert.equal(a.el('sentencePrompt').textContent,'Hör genau hin');a.run('SentenceGame.listen();window.stale=spoken.at(-1);showView("dictionary",null);stale.onend()');assert.equal(a.el('sentenceDuel').hidden,true);assert.equal(a.timers.size,0);
});
test('victory particles and bar impulses change no learning state and disappear on navigation',()=>{
 const a=app({reducedMotion:false});open(a);for(let i=0;i<6;i++){answer(a);if(i<5)a.el('sentenceNextButton').click();}const state=a.run('JSON.stringify(SentenceGame.engine.flow)'),points=a.animations.filter(x=>x.target.classList.contains('journey-point'));assert.equal(points.length,6);points[0].onfinish();assert.ok(a.animations.some(x=>x.target===a.el('profileLevelBar')));const count=a.animations.length;points[0].onfinish();assert.equal(a.animations.length,count);assert.equal(a.run('JSON.stringify(SentenceGame.engine.flow)'),state);a.run('showView("dictionary",null)');points.at(-1).onfinish();assert.equal(a.run('JSON.stringify(SentenceGame.engine.flow)'),state);assert.equal(a.document.body.querySelectorAll('.journey-point').length,0);
});
test('unavailable animation support cannot freeze the displayed progress',()=>{
 const a=app({reducedMotion:false});open(a);for(let i=0;i<5;i++){answer(a);a.el('sentenceNextButton').click();}const create=a.document.createElement;a.document.createElement=tag=>{const n=create(tag);if(tag==='span')n.animate=undefined;return n;};answer(a);assert.equal(parseFloat(a.el('profileLevelFill').style.width),a.run('AndreLessonDelivery.progress(SentenceGame.engine).percent'));assert.equal(a.document.body.querySelectorAll('.journey-point').length,0);
});
test('German vocabulary answers are choices from the current portion and never open a keyboard',()=>{
 const a=app();a.run('openLearnMode("typing");WordTrainer.model.state.current.phase="typing";WordTrainer.model.state.current.direction="de";WordTrainer.model.save();WordTrainer.close();WordTrainer.open()');
 // Complete the preceding recognition phase, then inspect a real DE phase.
 a.run('for(const id of WordTrainer.model.state.portion.ids)WordTrainer.model.progress(id).choice=true;WordTrainer.model.state.current=null;WordTrainer.next();WordTrainer.model.progress(WordTrainer.model.state.current.id).tr=true;WordTrainer.model.state.current=null;WordTrainer.next()');
 a.run('AndreWords.byId[WordTrainer.model.state.current.id].de="Haus / Zuhause";WordTrainer.close();WordTrainer.open()');assert.equal(a.run('WordTrainer.model.state.current.direction'),'de');assert.equal(a.el('customKeyboard').style.display,'none');const options=a.el('wordStudy').querySelectorAll('.study-option'),ids=a.json('WordTrainer.model.state.portion.ids');assert.ok(options.length);assert.ok(options.every(b=>ids.includes(b.dataset.wordId)));const id=a.run('WordTrainer.model.state.current.id');options.find(b=>b.dataset.wordId===id).click();assert.equal(a.run('WordTrainer.model.progress('+JSON.stringify(id)+').de'),true);
});

test('reopening the mixed entry preserves its valid generated pool and grammar examples',()=>{
 const {e}=learner();e.refreshPool=L.Engine.prototype.refreshPool;e.available();const pool=e.pool,ids=pool.map(t=>t.id);A.mixed(e);e.available();assert.equal(e.pool,pool);assert.deepEqual(e.pool.map(t=>t.id),ids);
});
