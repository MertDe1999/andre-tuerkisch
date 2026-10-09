const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs'),{learnTo}=require('./helpers/progress.cjs');
const L=require('../lib/course-learning'),Legacy=require('../lib/learning');
test('learned vocabulary and grammar fill each CEFR bar, with all labels inside',()=>{
 const a=app();let previous=0;
 for(let level=1;level<=160;level++){
  learnTo(a,level);const stage=Math.floor((level-1)/40),start=stage*40+1,end=start+39,cefr=['A1','A2','B1','B2'][stage],percent=parseFloat(a.el('profileLevelFill').style.width),bar=a.el('profileLevelBar');
  assert.equal(a.el('profileLevelValue').textContent,String(level));assert.equal(a.el('profileLevelStage').textContent,cefr);assert.equal(a.el('profileLevelNext').textContent,stage<3?['A2','B1','B2'][stage]:level===160?'B2 ✓':'B2');
  assert.equal(Number(bar.getAttribute('aria-valuemin')),start);assert.equal(Number(bar.getAttribute('aria-valuemax')),end);assert.equal(Number(bar.getAttribute('aria-valuenow')),level);
  if(level===start)assert.equal(percent,0);else assert.ok(percent>previous&&percent<=100);if(level===end)assert.equal(percent,100);previous=percent;
 }
 const html=require('node:fs').readFileSync(require.resolve('../index.html'),'utf8');
 const labels=html.slice(html.indexOf('id="profileLevelBar"'),html.indexOf('id="profileLevelBar"')+950);for(const id of ['profileLevelStage','profileLevelNext','profileLevelValue'])assert.ok(labels.includes('id="'+id+'"'));
});
test('legacy sentence levels are archived, never mistaken for vocabulary and grammar knowledge',()=>{
 for(const [key,version] of [[L.KEY,3],[Legacy.KEY,2]]){
  const a=app({storage:new Map([[key,JSON.stringify({version,level:120,highestLevel:160})]])});assert.equal(a.el('profileLevelValue').textContent,'1');assert.equal(a.el('profileLevelStage').textContent,'A1');assert.equal(a.run('SentenceGame.engine.state.previousSentenceLevel.level'),120);
  learnTo(a,81);const loaded=app({storage:new Map(a.storage)});assert.equal(loaded.el('profileLevelStage').textContent,'B1');assert.equal(loaded.el('profileLevelValue').textContent,'81');
 }
});
test('individual answers and corrections remain neutral until the whole round is decided',()=>{const a=app();learnTo(a,81);a.run('startSentenceGame();SentenceGame.check(true)');assert.equal(a.el('profileLevelValue').textContent,'81');assert.equal(app({storage:a.storage}).el('profileLevelValue').textContent,'81');});
