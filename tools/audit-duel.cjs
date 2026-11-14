/* Offline: all learning transitions with a cosmetic observer, never a running app. */
const assert=require('node:assert/strict'),P=require('../lib/learning-path'),L=require('../lib/guided-learning'),C=require('../lib/course'),I=require('../lib/interest-generator'),D=require('../lib/duel');
let seed=14112026;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage,random}),refresh=e.refreshPool;
let d=new D.Duel(storage),answers=0,stages=0,intros=0,wins=0,transitions=0;
const snapshot=()=>JSON.stringify([e.state,e.flow,e.grammar.state,[...map].filter(([k])=>k!==D.KEY)]);
function observe(fn){const before=snapshot(),result=fn();assert.equal(snapshot(),before,'The duel must not change learning state or storage');return result;}
for(const lesson of P.lessons){
 e.refreshPool=refresh;e.flow.level=lesson.level;e.flow.frontier=lesson.level;e.flow.round=null;e.state.current=null;e.state.selectedTheme=null;e.poolKey='';
 map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(lesson.level).map(id=>[id,{toTurkish:true,toGerman:true}]))));e.syncProgress();
 const pool=e.available();for(const topic of I.themes)assert.ok(pool.some(t=>t.primaryTheme===topic.id||t.themes?.includes(topic.id)),'Theme '+topic.id+' / Level '+lesson.level);
 // Use one generated batch per level to isolate and exhaust its transitions.
 e.refreshPool=()=>{};let report,previous=null;
 for(let i=0;i<200;i++){
  if(e.stageSummary().complete){assert.equal(e.next(),null);assert.ok(e.continueStage());stages++;d=new D.Duel(storage);}
  const cur=e.next();assert.ok(cur,'Level '+lesson.level+' has an exercise');
  const ctx=observe(()=>D.capture(e)),view=observe(()=>d.view(ctx));
  assert.ok(view.total>=1&&view.total<=6);assert.equal(view.level,lesson.level);
  if(previous?.mode==='intro'&&ctx.mode==='course'){assert.notEqual(view.key,previous.key);assert.equal(view.hp,6);}
  if(cur.direction==='tr')cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,index)=>({...C.copy(s),id:g.id+index,group:g.id})));
  const result=e.check({answer:cur.task.de});assert.equal(result.correct,true,cur.task.id);answers++;if(ctx.mode==='intro')intros++;
  const cue=observe(()=>d.record(ctx,result));assert.ok(cue);assert.equal(cue.summary.hp,view.hp-1);if(cue.action==='win')wins++;
  assert.equal(observe(()=>d.record(ctx,result)),null,'Repeated result must not deal damage');
  const after=observe(()=>d.view(D.capture(e)));assert.equal(after.key,view.key,'Result remains in its original encounter, even after a level transition');assert.equal(after.hp,view.hp-1);
  previous={...ctx,key:view.key};if(result.transition){report=result.transition;transitions++;break;}
 }
 assert.ok(report?.pass,'Level '+lesson.level+' must pass unchanged');
 if(lesson.level%20===0)console.log(lesson.level+' levels / '+answers+' answers / '+stages+' stage breaks');
}
assert.equal(e.flow.finished,true);assert.equal(transitions,160);assert.equal(intros,320);
// Completing B2 starts a cosmetic practice cycle, without extra course progress.
let last;for(let i=0;i<7;i++){const cur=e.next();assert.ok(cur.free);const ctx=D.capture(e),view=observe(()=>d.view(ctx));if(i===6)assert.notEqual(view.key,last.key);cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,index)=>({...C.copy(s),id:g.id+index,group:g.id})));const result=e.check({answer:cur.task.de});observe(()=>d.record(ctx,result));last=view;}
console.log('PASS: 160 levels, all 23 topics, both directions, '+answers+' answers, '+intros+' introductions, '+stages+' stage breaks, '+wins+' victories; identical learning state/storage before and after every duel operation; free practice after B2.');
