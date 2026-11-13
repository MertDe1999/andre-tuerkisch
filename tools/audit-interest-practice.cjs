/* Offline coverage of the actual 160-level permissions, not a language certificate. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),L=require('../lib/guided-learning'),P=require('../lib/learning-path'),I=require('../lib/interest-generator'),M=require('../lib/interest-practice'),W=require('../data/words');
const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage,random:()=>.37}),m=new M.Practice({engine:e,random:()=>.37}),poolMethod=m.pool;
const report={method:'Offline models only; no browser, server, live speech or microphone.',levels:[],sessions:0,tasks:0,dialogPartners:0};
// Persistence is covered by the focused tests. Avoid repeatedly serializing the
// entire simulated learner history when measuring permission/state coverage.
m.save=()=>true;
for(const lesson of P.lessons){
 e.flow.level=e.flow.frontier=lesson.level;e.flow.round=null;e.state.current=null;e.poolKey='';e.syncProgress();
 map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(lesson.level).map(id=>[id,{toTurkish:true,toGerman:true}]))));
 // Generate all topics once with real permissions; reuse that exact eligible batch
 // to exercise all three session state machines without testing random resampling.
 m.pool=poolMethod;const pool=m.pool(null),startFlow=JSON.stringify(e.flow),levels=new Set(),access=m.access();assert.ok(pool.length);
 m.pool=theme=>pool.filter(t=>!theme||t.requires.some(id=>W.byId[id]?.themes?.includes(theme)));
 for(const theme of I.themes)for(const mode of ['listen','dialog','write']){
  const s=m.open(mode,theme.id);assert.ok(s,`${lesson.level}/${theme.id}/${mode}`);assert.equal(s.level,lesson.level);assert.ok(s.tasks.length>=1&&s.tasks.length<=3);
  for(const task of s.tasks){assert.ok(m.eligible(task.target,access));assert.ok(task.target.requires.some(id=>W.byId[id]?.themes?.includes(theme.id)));levels.add(task.target.cefr);for(const option of task.options)assert.ok(m.eligible(option,access));if(task.partner){assert.ok(m.eligible(task.partner,access));report.dialogPartners++;}
   if(mode==='listen')m.heard();assert.equal(m.check(mode==='listen'?task.target.de:task.target.tr).correct,true);assert.ok(m.next());report.tasks++;
  }
  assert.ok(s.finished);report.sessions++;
 }
 assert.equal(JSON.stringify(e.flow),startFlow,'Supplemental sessions cannot alter the course');
 for(const id of lesson.targets)e.grammar.state.unlocked[id]=true;e.grammar.save();
 report.levels.push({level:lesson.level,cefr:lesson.cefr,pool:pool.length,taskLabels:[...levels],themes:I.themes.length});
 if(lesson.level%20===0)console.log(`${lesson.level} levels / ${report.sessions} sessions / ${report.tasks} tasks`);
}
const output=path.join(__dirname,'../docs/interest-practice-audit-2026-11-13.json');fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(`PASS: ${report.levels.length} levels, 23 themes, ${report.sessions} sessions, ${report.tasks} tasks, ${report.dialogPartners} Turkish partner turns.`);
