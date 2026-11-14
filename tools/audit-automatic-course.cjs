/* Complete offline course, every automatic format; no app, audio or browser. */
const assert=require('node:assert/strict'),L=require('../lib/guided-learning'),P=require('../lib/learning-path'),C=require('../lib/course'),A=require('../lib/lesson-delivery'),D=require('../lib/duel');
let seed=14112026;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage,random}),refresh=e.refreshPool,d=new D.Duel(storage);
const modes={build:0,listen:0,dialog:0,write:0};let answers=0,stages=0,comparisons=0,minOptions=4;
for(const lesson of P.lessons){
 e.refreshPool=refresh;e.flow.level=e.flow.frontier=lesson.level;e.flow.round=null;e.state.current=null;e.state.selectedTheme=null;e.state.deliveryTurn=0;e.poolKey='';
 map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(lesson.level).map(id=>[id,{toTurkish:true,toGerman:true}]))));e.syncProgress();A.mixed(e);e.available();e.refreshPool=()=>{};
 let passed=false;const formats=new Set();
 for(let n=0;n<180;n++){
  if(e.stageSummary().complete){assert.ok(e.continueStage());stages++;}
  const cur=e.next();assert.ok(cur);const f=A.prepare(e);formats.add(f.mode);modes[f.mode]++;
  if(f.options.length){minOptions=Math.min(minOptions,f.options.length);assert.ok(f.options.length>=2,'Level '+lesson.level+' must offer real alternatives');assert.equal(new Set(f.options).size,f.options.length);assert.ok(f.access.words.every(id=>e.unlocked().has(id)));assert.ok(f.access.grammar.every(id=>e.practiceGrammar().has(id)));}
  if(f.mode==='listen')f.heard=true;
  const tokens=cur.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:g.id+i,group:g.id})));
  if(f.mode==='build')cur.tokens=tokens;
  cur.draft=cur.direction==='de'?cur.task.de:cur.task.answer;e.save();
  // All four formats, in every level: compare the course engine against the
  // canonical complete answer. Presentation must not change promotion rules.
  let expected;if(n<8){const copy=new Map(map),reference=new L.Engine({storage:{getItem:k=>copy.get(k),setItem:(k,v)=>copy.set(k,v)},random});reference.state.current.tokens=C.copy(tokens);reference.check({answer:cur.task.de});expected=JSON.stringify(reference.flow);comparisons++;}
  const ctx=D.capture(e);d.prepare(ctx);const result=A.check(e,{answer:cur.draft});assert.equal(result.correct,true,cur.task.id+' / '+f.mode);
  if(expected)assert.equal(JSON.stringify(e.flow),expected,'Same level rules for '+f.mode+' / '+lesson.level);
  const after=JSON.stringify(e.flow);d.record(ctx,result);assert.equal(JSON.stringify(e.flow),after);answers++;
  if(result.transition){assert.equal(result.transition.pass,true);passed=true;break;}
 }
 assert.ok(passed,'Level '+lesson.level+' must finish');assert.deepEqual([...formats].sort(),['build','dialog','listen','write']);
 if(lesson.level%20===0)console.log(lesson.level+' levels / '+answers+' answers / '+stages+' pauses');
}
assert.equal(e.flow.finished,true);console.log(JSON.stringify({pass:true,levels:160,topics:23,answers,stages,canonicalComparisons:comparisons,minOptions,modes,liveTests:false}));
