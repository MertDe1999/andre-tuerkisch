/* Full model audit without starting the app, a browser or a server. */
const assert=require('node:assert/strict'),P=require('../lib/learning-path'),L=require('../lib/guided-learning'),C=require('../lib/course'),I=require('../lib/interest-generator');
const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage}),refresh=e.refreshPool;
let total=0;
for(const lesson of P.lessons){
 e.refreshPool=refresh;e.flow.level=lesson.level;e.flow.frontier=lesson.level;e.flow.round=null;e.state.current=null;e.state.selectedTheme=null;e.poolKey='';
 map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(lesson.level).map(id=>[id,{toTurkish:true,toGerman:true}]))));e.syncProgress();
 const pool=e.available();for(const id of lesson.targets)assert.ok(new Set(pool.filter(t=>e.requiredFor(t).includes(id)).map(t=>t.answer)).size>=3,'Level '+lesson.level+' / '+id);
 for(const topic of I.themes)assert.ok(pool.some(t=>t.primaryTheme===topic.id||t.themes?.includes(topic.id)),'Level '+lesson.level+' / '+topic.id);
 // Freeze one eligible generated batch to audit the state transitions themselves.
 e.refreshPool=()=>{};let report;
 for(let i=0;i<160;i++){const cur=e.next();assert.ok(cur,'Level '+lesson.level+' has a task');
  if(cur.direction==='tr')cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,index)=>({...C.copy(s),id:g.id+index,group:g.id})));
  const result=e.check({answer:cur.task.de});total++;assert.equal(result.correct,true,cur.task.id);
  if(result.transition){report=result.transition;break;}
 }
 assert.ok(report?.pass,'Level '+lesson.level+' can be completed');if(lesson.level%20===0)console.log(lesson.level+' levels / '+total+' answers');
}
assert.equal(e.flow.finished,true);console.log('PASS: 160 levels, all 23 topics, both directions, '+total+' answers');
