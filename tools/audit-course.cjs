const W=require('../data/words'),C=require('../lib/course'),G=require('../lib/course-grammar'),L=require('../lib/course-learning');
const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
const e=new L.Engine({storage,random:()=>.37}),words=new Set();const report=[];
for(const band of C.bands){
 for(const tr of band.words)words.add(W.byLemma[tr].id);
 map.set(L.UNLOCK,JSON.stringify(Object.fromEntries([...words].map(id=>[id,{toTurkish:true,toGerman:true}]))));
 e.state.opened=band.index+1;e.state.level=band.start;e.state.standard=band.index>=16;e.refreshPool();
 let count=0;const errors=[];
 for(let attempts=0;attempts<4000;attempts++){
  let ex;try{ex=e.grammar.next(words,e.state.opened);}catch(error){errors.push(error.message);break;}
  if(!ex)break;e.grammar.check(ex.answer);count++;
 }
 const missing=G.core[band.index].filter(id=>!e.grammar.unlocked().has(id));
 const pool=e.available(),uncovered=[...new Set(G.core[band.index].map(G.goal))].filter(goal=>new Set(pool.filter(t=>G.required(t).some(id=>G.goal(id)===goal)).map(t=>t.answer)).size<2);
 const blocked=missing.map(id=>({id,needs:G.byId[id].examples.map(x=>(x.slot?require('../lib/building-blocks').plan(x.slot).map(G.key):G.required(x.task)).filter(k=>k!==id&&!e.grammar.unlocked().has(k))).slice(0,2)}));
 const row={section:band.id,lessons:count,missing,uncovered,errors,available:pool.length,blocked};report.push(row);console.log(JSON.stringify(row));
}
require('node:fs').mkdirSync('.qa',{recursive:true});
require('node:fs').writeFileSync('.qa/course-audit.json',JSON.stringify(report,null,2));
if(report.some(r=>r.missing.length||r.uncovered.length||r.errors.length))process.exitCode=1;
