const {test}=require('node:test'),assert=require('node:assert/strict');
const D=require('../lib/duel'),L=require('../lib/guided-learning'),P=require('../lib/learning-path'),C=require('../lib/course');
const {app}=require('./helpers/app.cjs');
const store=()=>{const map=new Map();return {map,getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};};
const ctx=(task,overrides={})=>({task,key:'course:1:0:0',mode:'course',level:1,number:1,total:6,done:0,first:true,finished:false,...overrides});
function ready(){const storage=store();storage.setItem(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}]))));const e=new L.Engine({storage,random:()=>.37});e.round().intro=2;return {storage,e};}
function solve(e){const cur=e.state.current;cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:g.id+i,group:g.id})));return e.check({answer:cur.task.de});}
function open(options={}){const a=app(options);a.run('saveUnlockProgress(Object.fromEntries(AndreLearningPath.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}])));SentenceGame.engine.round().intro=2;openSentenceTest(null)');return a;}
function answer(a){a.run('SentenceGame.current.tokens=SentenceGame.task.groups.flatMap(g=>g.slots.map((s,i)=>({...AndreCourse.copy(s),id:g.id+i,group:g.id})));SentenceGame.current.draft=SentenceGame.task.de;SentenceGame.check()');}

test('only one hit and one first-error counterattack per sentence, including repeated callbacks',()=>{
 const storage=store(),d=new D.Duel(storage),c=ctx(1),bad={correct:false};assert.equal(d.record(c,bad).action,'hurt');assert.equal(d.record(c,bad),null);assert.equal(d.record({...c,first:false},bad),null);assert.equal(d.view(c).hearts,2);assert.equal(d.view(c).hp,6);
 const good={correct:true,direct:false};assert.equal(d.record({...c,first:false},good).action,'assist');assert.equal(d.record(c,good),null);assert.equal(d.view(c).hp,5);assert.equal(d.view(c).done,1);
 const reloaded=new D.Duel(storage);assert.equal(reloaded.view(c).hp,5);assert.equal(reloaded.record(c,good),null);assert.equal(reloaded.view(c).hearts,2);
});
test('Ben replenishes the three encounter hearts without blocking, ending or rating an exercise',()=>{
 const d=new D.Duel(store());for(let i=1;i<=3;i++){const cue=d.record(ctx(i),{correct:false});assert.equal(cue.action,i===3?'help':'hurt');}
 const s=d.view(ctx(3));assert.equal(s.hearts,3);assert.equal(s.rescues,1);assert.equal(s.hp,6);assert.equal(s.done,0);assert.equal(s.outcome,'active');assert.equal(d.record(ctx(3,{first:false}),{correct:true,direct:false}).summary.done,1);
});
test('skips advance only the encounter counter, never deal damage; a surviving enemy retreats',()=>{
 const d=new D.Duel(store());d.record(ctx(1),{correct:false},{unknown:true});for(let i=2;i<=6;i++)d.record(ctx(i),{correct:true,direct:true});const s=d.view(ctx(6));assert.equal(s.done,6);assert.equal(s.hp,1);assert.equal(s.outcome,'escaped');assert.equal(s.hearts,2);
});
test('completed corrected sentences defeat an enemy without claiming direct learning credit',()=>{
 const d=new D.Duel(store());for(let i=1;i<=6;i++){const c=ctx(i);d.record(c,{correct:false});const cue=d.record({...c,first:false},{correct:true,direct:false});assert.equal(cue.action,i===6?'win':'assist');}assert.equal(d.view(ctx(6)).outcome,'won');assert.equal(d.view(ctx(6)).rescues,2);
});
test('mid-stage upgrade starts with only the remaining tasks; full and final short stages keep separate opponents',()=>{
 const d=new D.Duel(store()),c=ctx(30,{done:3});assert.equal(d.view(c).maxHp,3);assert.equal(d.view(c).done,3);for(let i=30;i<33;i++)d.record({...c,task:i},{correct:true,direct:true});assert.equal(d.view({...c,task:32}).outcome,'won');assert.equal(d.view(ctx(34,{key:'course:1:0:6',number:2})).hp,6);
 assert.equal(d.view(ctx(50,{key:'course:1:0:42',number:8,total:4})).hp,4);
});
test('free practice cycles its own encounters after six answers and keeps each theme on return',()=>{
 const d=new D.Duel(store()),c=ctx(1,{key:'practice:160:T02',mode:'practice'});const first=d.view(c).key;for(let i=1;i<=6;i++)d.record({...c,task:i},{correct:true,direct:true});assert.equal(d.view({...c,task:6,finished:true}).key,first);const second=d.view({...c,task:7});assert.notEqual(second.key,first);assert.equal(second.hp,6);const another=d.view({...c,key:'practice:160:T03',task:8});assert.notEqual(another.key,second.key);assert.equal(d.view({...c,task:7}).key,second.key);
});
test('post-B2 free practice follows the selected mode, not the changing task theme in mixed practice',()=>{
 const e={state:{started:200,current:{id:200,free:true,roundLevel:160},selectedTheme:'T02'},flow:{level:160,finished:true,round:null}};
 assert.equal(D.capture(e).key,'practice:160:T02');e.state.selectedTheme='T03';assert.equal(D.capture(e).key,'practice:160:T03');e.state.selectedTheme=null;assert.equal(D.capture(e).key,'practice:160:mixed');e.state.current.roundTheme='T07';assert.equal(D.capture(e).key,'practice:160:mixed');e.state.current.roundTheme='T12';assert.equal(D.capture(e).key,'practice:160:mixed');
});
test('corrupt or unavailable cosmetic storage cannot write learning keys or prevent play',()=>{
 const storage=store();storage.setItem(D.KEY,'{bad');let d=new D.Duel(storage);d.record(ctx(1),{correct:true,direct:true});assert.deepEqual([...storage.map.keys()],[D.KEY]);
 const broken={getItem(){throw Error('blocked')},setItem(){throw Error('quota')}};d=new D.Duel(broken);assert.equal(d.record(ctx(1),{correct:true}).summary.hp,5);assert.match(d.storageError,/nicht gespeichert/);
});
test('duel capture and results leave every learning object unchanged, including a failed round and level fall',()=>{
 const {e,storage}=ready(),d=new D.Duel(storage);const pool=e.available();e.refreshPool=()=>{};let report;
 for(let i=0;i<80;i++){if(e.stageSummary().complete)e.continueStage();e.next();const before=JSON.stringify([e.state,e.flow,e.grammar.state]),c=D.capture(e);d.prepare(c);assert.equal(JSON.stringify([e.state,e.flow,e.grammar.state]),before);const result=e.check({unknown:true}),after=JSON.stringify([e.state,e.flow,e.grammar.state]);d.record(c,result,{unknown:true});assert.equal(JSON.stringify([e.state,e.flow,e.grammar.state]),after);if(result.transition){report=result.transition;break;}}
 assert.equal(report.pass,false);assert.equal(e.flow.level,1);assert.equal(report.total,46);assert.equal(e.flow.frontier,1);
});
test('UI shows André and Ben, shares the current result and keeps all controls still during an arena hit',()=>{
 const a=open({reducedMotion:false});assert.equal(a.el('sentenceDuel').hidden,false);assert.ok(a.el('duelAndre'));assert.ok(a.el('duelBen'));const before=a.animations.length;answer(a);const motions=a.animations.slice(before);assert.ok(motions.some(x=>x.target===a.el('sentenceDuelScene')));assert.ok(!motions.some(x=>x.target===a.el('answerZone')));assert.equal(a.run('SentenceGame.duel.summary.hp'),5);assert.equal(a.run('SentenceGame.current.finished'),true);a.advance(60000);assert.equal(a.run('SentenceGame.duel.summary.hp'),5);assert.equal(a.el('sentenceNextButton').hidden,false);
 const hp=a.run('SentenceGame.duel.summary.hp');a.run('SentenceGame.check()');assert.equal(a.run('SentenceGame.duel.summary.hp'),hp);a.run('showView("dictionary",null)');assert.equal(a.el('sentenceDuel').hidden,true);assert.ok(motions.filter(x=>x.target.closest('.sentence-duel')).every(x=>x.cancelled));
});
test('unfinished errors and hearts survive navigation and reload; corrections never create another counterattack',()=>{
 let a=open();a.run('SentenceGame.check()');assert.equal(a.run('SentenceGame.duel.summary.hearts'),2);const id=a.run('SentenceGame.current.id');a.run('showView("grammar",null)');a=app({storage:a.storage});a.run('openSentenceTest(null)');assert.equal(a.run('SentenceGame.current.id'),id);assert.equal(a.run('SentenceGame.duel.summary.hearts'),2);a.run('SentenceGame.check()');assert.equal(a.run('SentenceGame.duel.summary.hearts'),2);answer(a);assert.equal(a.run('SentenceGame.duel.summary.hp'),5);assert.equal(a.run('SentenceGame.engine.round().items[0].direct'),false);
});
test('background and reduced motion cancel only presentation and do not cause delayed hits or sounds',()=>{
 const a=open({reducedMotion:false});answer(a);const hp=a.run('SentenceGame.duel.summary.hp');a.document.hidden=true;a.document.dispatchEvent({type:'visibilitychange'});assert.ok(a.el('sentenceDuel').classList.contains('is-paused'));const animations=a.animations.filter(x=>x.target.closest('.sentence-duel'));assert.ok(animations.every(x=>x.cancelled));a.advance(60000);assert.equal(a.run('SentenceGame.duel.summary.hp'),hp);a.document.hidden=false;a.document.dispatchEvent({type:'visibilitychange'});assert.equal(a.el('sentenceDuel').classList.contains('is-paused'),false);
 const b=open();answer(b);assert.equal(b.animations.length,0);assert.equal(b.run('SentenceGame.duel.summary.hp'),5);assert.equal(b.timers.size,0);
});
test('checkpoint retains the defeated enemy and starts a new one only on explicit continue',()=>{
 const a=open();for(let i=0;i<6;i++){answer(a);a.el('sentenceNextButton').click();}assert.equal(a.el('sentenceStageBreak').hidden,false);assert.equal(a.el('sentenceDuel').parentElement,a.el('sentenceStageBreak'));assert.equal(a.run('SentenceGame.duel.summary.outcome'),'won');assert.equal(a.run('SentenceGame.engine.flow.level'),1);a.advance(60000);assert.equal(a.run('SentenceGame.engine.stageSummary().number'),1);
 a.el('sentenceStageBreak').querySelectorAll('button').find(b=>b.textContent==='Nächste Etappe').click();assert.equal(a.run('SentenceGame.duel.summary.hp'),6);assert.equal(a.el('sentenceDuel').parentElement,a.el('sentenceGameActive'));assert.equal(a.run('SentenceGame.engine.stageSummary().number'),2);
});
test('combat sounds respect the shared mute setting and speech hold',()=>{
 const a=app();a.run(`window.notes=0;window.AudioContext=class{currentTime=0;destination={};resume(){return Promise.resolve()}createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}}}createOscillator(){return{frequency:{},connect(){},disconnect(){},start(){notes++},stop(){}}}};AndreSound.effect('duelHit');AndreSound.effect('duelHelp');`);assert.equal(a.run('notes'),5);a.el('soundToggle').click();a.el('soundToggle').click();const n=a.run('notes');a.run("AndreSound.effect('duelWin')");assert.equal(a.run('notes'),n);a.el('soundToggle').click();a.run("AndreSound.hold(true);window.before=notes;AndreSound.effect('duelHurt')");assert.equal(a.run('notes'),a.run('before'));
});
