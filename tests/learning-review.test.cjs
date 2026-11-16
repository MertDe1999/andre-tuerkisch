const {test}=require('node:test'),assert=require('node:assert/strict');
const Guided=require('../lib/guided-learning'),Course=require('../lib/course-learning'),C=require('../lib/course'),G=require('../lib/course-grammar'),B=require('../lib/building-blocks'),W=require('../data/words'),A=require('../lib/lesson-delivery');

function learner(Engine=Guided.Engine){
 const map=new Map(),storage={getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value)};
 const now=new Date(2026,10,16,12).getTime();
 map.set(Guided.UNLOCK,JSON.stringify(Object.fromEntries(W.words.map(w=>[w.id,{toTurkish:true,toGerman:true}]))));
 const e=new Engine({storage,clock:()=>now});
 e.grammar.state.unlocked=Object.fromEntries(G.entries.map(g=>[g.id,true]));e.grammar.save();
 if(e.flow){e.flow.level=e.flow.frontier=21;e.flow.finished=false;e.flow.round=null;}
 e.syncProgress();
 return {e,storage,now};
}

test('reloaded current and cached tasks use corrected morphology without discarding a draft or rating',()=>{
 const {e,storage}=learner(),cur=sentence(e),slots=cur.task.groups[0].slots;
 slots.splice(0,slots.length,{lemma:W.byLemma.ev.id,features:{case:'locative',predicatePerson:'ben',past:true,question:true}});
 cur.task.requires=[W.byLemma.ev.id];cur.task.answer='evdeydim mi';cur.task.de='War ich im Haus?';cur.task.uses=[];
 G.register(cur.task);for(const id of G.required(cur.task))e.grammar.state.unlocked[id]=true;e.grammar.save();
 cur.delivery={version:1,mode:'write',heard:false,text:false,options:[],recorded:false};
 cur.draft='evde miy';cur.caret=4;cur.attempts=1;cur.rated=true;cur.firstOutcome='wrong';
 e.state.themeTasks={T01:C.copy(cur)};e.save();
 const restored=new Guided.Engine({storage}),current=restored.state.current;
 assert.equal(current.task.answer,'evde miydim');assert.equal(restored.state.themeTasks.T01.task.answer,'evde miydim');
 assert.equal(current.draft,'evde miy');assert.equal(current.caret,4);assert.equal(current.attempts,1);assert.equal(current.firstOutcome,'wrong');
 assert.equal(A.check(restored,{answer:'evde miydim'}).correct,true);assert.equal(restored.round().items.at(-1).direct,false);
});
function sentence(e){
 const task=C.tasks.find(t=>t.id==='S05b'),cur=e.begin(task,'current');
 cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:g.id+i,group:g.id})));
 return cur;
}

for(const [name,Engine] of [['guided',Guided.Engine],['course',Course.Engine]]){
 test(name+' review tracks wrong vocabulary separately from grammar',()=>{
  const {e}=learner(Engine),cur=sentence(e),token=cur.tokens.find(t=>t.lemma===W.byLemma.ev.id);token.lemma=W.byLemma.araba.id;
  const result=e.check();assert.equal(result.correct,false);assert.equal(result.issue.area,'word');
  assert.equal(e.state.words[W.byLemma.ev.id].errors,1);assert.equal(e.state.skills['use:statement'],undefined);
 });
 test(name+' review schedules the mistaken suffix, not its surface string or a generic rule',()=>{
  const {e,storage,now}=learner(Engine),cur=sentence(e),token=cur.tokens.find(t=>t.lemma===W.byLemma.ev.id),slot=cur.task.groups[0].slots.find(s=>s.lemma===token.lemma);
  const rule=G.key(B.plan(slot)[0]),stat=e.stat('skills',rule);stat.stage=5;stat.dueAt=now+60*86400000;stat.dueSequence=900;
  token.features.case='dative';const result=e.check();assert.equal(result.issue.area,'grammar');assert.equal(result.issue.field,'case');
  assert.equal(stat.errors,1);assert.equal(stat.stage,0);assert.equal(stat.errorSequence,e.state.completed+4);assert.equal(stat.dueSequence,0);
  const tomorrow=new Date(now);tomorrow.setHours(0,0,0,0);tomorrow.setDate(tomorrow.getDate()+1);assert.equal(stat.dueAt,tomorrow.getTime());
  assert.equal(e.state.words.evi,undefined);assert.equal(e.state.skills['use:statement'],undefined);
  token.features.case='accusative';assert.equal(e.check().correct,true);assert.equal(stat.errorSequence,4,'immediate correction keeps the later review');
  const restored=new Engine({storage,clock:()=>tomorrow.getTime()});assert.equal(restored.due(restored.state.skills[rule]),true);assert.equal(restored.state.skills[rule].errors,1);
 });
}
