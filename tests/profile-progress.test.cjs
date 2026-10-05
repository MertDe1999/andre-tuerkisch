const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const L=require('../lib/course-learning'),Legacy=require('../lib/learning');

test('every course level fills its own CEFR stage, with the current level inside and the next target beside it',()=>{
 const a=app();let previous=0;
 for(let level=1;level<=160;level++){
  a.run('SentenceGame.engine.state.level='+level+';SentenceGame.engine.state.highestLevel=160;SentenceGame.engine.state.standard=true;updateProfileLevel()');
  const stage=Math.floor((level-1)/40),start=stage*40+1,end=start+39,cefr=['A1','A2','B1','B2'][stage];
  const percent=parseFloat(a.el('profileLevelFill').style.width),bar=a.el('profileLevelBar');
  assert.equal(a.el('profileLevelValue').textContent,String(level));
  assert.equal(a.el('profileLevelStage').textContent,cefr);
  assert.equal(a.run('AndreCourse.bandAt('+level+').cefr'),cefr,'display follows the actual curriculum');
  assert.equal(a.el('profileLevelNext').textContent,stage<3?'→ '+['A2','B1','B2'][stage]:level===160?'B2 ✓':'B2-Ziel');
  assert.equal(Number(bar.getAttribute('aria-valuemin')),start);
  assert.equal(Number(bar.getAttribute('aria-valuemax')),end);
  assert.equal(Number(bar.getAttribute('aria-valuenow')),level);
  assert.ok(bar.getAttribute('aria-valuetext').includes(cefr));
  if(level===start)assert.equal(percent,0);
  else assert.ok(percent>previous&&percent<=100);
  if(level===end)assert.equal(percent,100);
  assert.equal(a.el('profileLevelChip').dataset.complete,String(level===160));
  previous=percent;
 }
});

test('reload and legacy migration show current-stage progress even when a higher stage was reached before',()=>{
 for(const [key,state,stage,percent] of [
  [L.KEY,{version:3,level:80,highestLevel:160,standard:true},'A2',100],
  [L.KEY,{version:3,level:81},'B1',0],
  [L.KEY,{version:3,level:999},'B2',100],
  [L.KEY,{version:3,level:0},'A1',0],
  [Legacy.KEY,{version:2,level:120,highestLevel:160},'B1',100]
 ]){
  const a=app({storage:new Map([[key,JSON.stringify(state)]])});
  assert.equal(a.el('profileLevelStage').textContent,stage);
  assert.equal(parseFloat(a.el('profileLevelFill').style.width),percent);
  const saved=[...a.storage];a.run('showView("grammar",null);showView("dictionary",null)');
  assert.equal(a.el('profileLevelStage').textContent,stage);assert.deepEqual([...a.storage],saved);
 }
});

function begin(a,level){
 a.run('{const engine=SentenceGame.engine;engine.state.level='+level+';engine.state.opened=32;'+
  'const band=AndreCourse.bandAt('+level+');for(const id of AndreCourseGrammar.core[band.index])engine.state.mastery[band.id+":"+AndreCourseGrammar.goal(id)]=["erste Anwendung","zweite Anwendung"];'+
  'openLearnMode("sentences");engine.begin(AndreCourse.tasks[0],"current");SentenceGame.render()}');
}
function solve(a){a.run('SentenceGame.current.tokens=SentenceGame.task.groups.flatMap(g=>g.slots.map((s,i)=>({...AndreCourse.copy(s),id:g.id+i,group:g.id})));checkSentence()');}

test('real first-attempt scoring crosses stage boundaries in both directions, while correcting the same sentence stays neutral',()=>{
 const a=app();a.unlock();
 for(const [end,current,next] of [[40,'A1','A2'],[80,'A2','B1'],[120,'B1','B2']]){
  begin(a,end);assert.equal(a.el('profileLevelStage').textContent,current);assert.equal(a.el('profileLevelFill').style.width,'100%');
  solve(a);assert.equal(a.el('profileLevelValue').textContent,String(end+1));assert.equal(a.el('profileLevelStage').textContent,next);
  assert.equal(a.el('profileLevelFill').style.width,'0%');
  begin(a,end+1);a.run('SentenceGame.check(true)');assert.equal(a.el('profileLevelValue').textContent,String(end));
  assert.equal(a.el('profileLevelStage').textContent,current);assert.equal(a.el('profileLevelFill').style.width,'100%');
  solve(a);assert.equal(a.el('profileLevelValue').textContent,String(end));assert.equal(a.el('profileLevelStage').textContent,current);
 }
 begin(a,159);solve(a);assert.equal(a.el('profileLevelChip').dataset.complete,'true');
 assert.equal(a.el('profileLevelNext').textContent,'B2 ✓');
 begin(a,160);a.run('SentenceGame.check(true)');assert.equal(a.el('profileLevelChip').dataset.complete,'false');
 assert.equal(a.el('profileLevelNext').textContent,'B2-Ziel');assert.ok(parseFloat(a.el('profileLevelFill').style.width)<100);
});
