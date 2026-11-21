const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs'),{learnTo}=require('./helpers/progress.cjs');
const L=require('../lib/guided-learning'),P=require('../lib/learning-path'),C=require('../lib/course'),A=require('../lib/lesson-delivery');
function model(){const data=new Map(),storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)},e=new L.Engine({storage,random:()=>.37});data.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}]))));e.round().intro=2;A.mixed(e);e.available();e.refreshPool=()=>{};return {e,storage};}
function solve(e){const c=e.state.current,d=A.prepare(e);d.text=true;c.tokens=c.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:g.id+i,group:g.id})));return A.check(e,{answer:c.direction==='de'?c.task.de:c.task.answer});}
function open(a){learnTo(a,1);a.run('SentenceGame.engine.round().intro=2;openSentenceTest(null)');}
function answer(a){a.run(`{const c=SentenceGame.current;c.delivery.text=true;c.tokens=c.task.groups.flatMap(g=>g.slots.map((s,i)=>({...AndreCourse.copy(s),id:g.id+i,group:g.id})));c.draft=c.direction==='de'?c.task.de:c.task.answer;SentenceGame.check();}`);}

test('the single entry opens required vocabulary, then visibly offers to resume a saved round',()=>{
 const a=app(),b=a.el('sentenceTestButton');assert.equal(b.querySelector('.journey-start-label').textContent,'Wörter lernen');b.click();assert.equal(a.run('WordTrainer.active'),true);a.run('showView("flashcards",null)');open(a);a.run('closeSentenceTest()');assert.equal(b.querySelector('.journey-start-label').textContent,'Weiterlernen');const id=a.run('SentenceGame.current.id');b.click();assert.equal(a.run('SentenceGame.current.id'),id);
});
test('wrong choices survive reload, cannot be rated twice, and a correction remains non-direct',()=>{
 const {e,storage}=model();e.next();solve(e);e.next();const d=A.prepare(e);d.text=true;const wrong=d.options.find(x=>x!==e.state.current.task.de);assert.equal(A.check(e,{answer:wrong}).correct,false);const attempts=e.state.current.attempts;
 const loaded=new L.Engine({storage});assert.ok(A.prepare(loaded).rejected.includes(wrong));assert.equal(A.check(loaded,{answer:wrong}).ignored,true);assert.equal(loaded.state.current.attempts,attempts);assert.ok(A.check(loaded,{answer:loaded.state.current.task.de}).correct);assert.equal(loaded.round().items.at(-1).direct,false);
});
test('long alternatives retain the target and known permissions with at least two real answers',()=>{
 const {e}=model();e.next();solve(e);e.next();const c=e.state.current;c.task.de+=' '+('lange Vorlage '.repeat(15));const d=A.prepare(e);assert.equal(d.options.length,2);assert.ok(d.options.includes(c.task.de));assert.ok(d.access.words.every(id=>e.unlocked().has(id)));assert.ok(d.access.grammar.every(id=>e.practiceGrammar().has(id)));
});
test('successive stages vary their production order while covering every format evenly',()=>{
 const {e}=model(),modes=[];for(let i=0;i<18;i++){if(e.stageSummary().complete)e.continueStage();e.next();const d=A.prepare(e);if(d.mode!=='listen')modes.push(d.mode);solve(e);}for(let i=0;i<9;i+=3)assert.deepEqual(modes.slice(i,i+3).sort(),['build','dialog','write']);assert.notDeepEqual(modes.slice(0,3),modes.slice(3,6));assert.equal(e.flow.level,1);
});
test('sentence replay is explicit, can be stopped, and stale completion changes no progress',()=>{
 const a=app();open(a);assert.equal(a.el('sentenceReplay').hidden,true);answer(a);assert.equal(a.el('sentenceReplay').hidden,false);assert.equal(a.el('duelRemaining').textContent,'Noch 5 Treffer');
 a.run(`window.spoken=[];window.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};window.speechSynthesis={cancel(){},getVoices(){return[{lang:'tr-TR'}]},speak(u){spoken.push(u);u.onstart?.()}}`);const before=a.run('JSON.stringify(SentenceGame.engine.flow)');a.el('sentenceReplay').click();assert.equal(a.run('spoken[0].text'),a.run('SentenceGame.task.answer'));a.el('sentenceReplay').click();assert.equal(a.el('sentenceReplay').getAttribute('aria-pressed'),'false');a.run('showView("dictionary",null);spoken[0].onend()');assert.equal(a.run('JSON.stringify(SentenceGame.engine.flow)'),before);
});
test('rejected UI choices stay disabled and visibly marked without advancing the sentence',()=>{
 const a=app();open(a);answer(a);a.el('sentenceNextButton').click();const id=a.run('SentenceGame.current.id'),correct=a.run('SentenceGame.task.de');const wrong=a.el('sentenceReading').querySelectorAll('.study-option').find(b=>b.textContent!==correct);wrong.click();const marked=a.el('sentenceReading').querySelectorAll('.study-option').find(b=>b.textContent===wrong.textContent);assert.ok(marked.disabled);assert.ok(marked.classList.contains('is-incorrect'));const attempts=a.run('SentenceGame.current.attempts');marked.click();assert.equal(a.run('SentenceGame.current.attempts'),attempts);assert.equal(a.run('SentenceGame.current.id'),id);
});

test('later vocabulary gates and a failed complete round explain the actual next step',()=>{
 const a=app(),known=new Set(P.wordIds(1)),nextLevel=P.lessons.find(l=>P.wordIds(l.level).some(id=>!known.has(id))).level;learnTo(a,1);a.run('SentenceGame.engine.flow.level='+nextLevel+';SentenceGame.engine.flow.frontier='+nextLevel+';SentenceGame.engine.save();openSentenceTest(null)');
 assert.ok(a.run('SentenceGame.engine.missingWords().length'));assert.equal(a.document.querySelector('#sentenceComplete h2').textContent,'Neue Wörter für Level '+nextLevel);
 learnTo(a,2);a.run('SentenceGame.engine.round().intro=2;openSentenceTest(null);{const e=SentenceGame.engine,c=e.state.current;e.round().items=AndreInterestGenerator.themes.flatMap(t=>["tr","de"].map(direction=>({theme:t.id,direction,direct:false}))).filter(x=>x.theme!==c.roundTheme||x.direction!==c.direction);e.round().stage={start:42,number:8};SentenceGame.check(true);}');assert.equal(a.run('SentenceGame.engine.flow.level'),1);assert.match(a.el('sentenceFeedback').textContent,/Runde beendet · Level 1 üben/);assert.match(a.el('sentenceFeedback').textContent,/direkt richtige/);
});
