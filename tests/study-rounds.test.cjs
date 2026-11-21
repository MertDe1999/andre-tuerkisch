const {test}=require('node:test');
const assert=require('node:assert/strict');
const L=require('../lib/guided-learning'), A=require('../lib/lesson-delivery');
const S=require('../lib/study-rounds'), P=require('../lib/learning-path');
const W=require('../data/words'), G=require('../lib/course-grammar'), B=require('../lib/building-blocks');
const Prep=require('../lib/word-preparation');
const {app}=require('./helpers/app.cjs'), {learnTo}=require('./helpers/progress.cjs');

function learner(level=1) {
  const data=new Map(), storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
  const e=new L.Engine({storage,random:()=>0,clock:()=>1000000});
  e.flow.level=e.flow.frontier=level;
  data.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(level).map(id=>[id,{toTurkish:true,toGerman:true}]))));
  e.grammar.state.unlocked=Object.fromEntries(P.lessons.slice(0,level-1).flatMap(l=>l.targets).map(id=>[id,true]));
  e.syncProgress();A.mixed(e);e.available();return e;
}
function boundary(e,number) {
  const r=e.round();
  r.intro=2;
  r.items=Array.from({length:(number-1)*6},()=>({direct:true,practice:false}));
  r.stage={start:r.items.length,number};
  e.state.current=e.begin(e.available()[0]);e.state.current.finished=true;e.save();
}
test('a choice changes the next partner turn, including after reload, without rating extra attempts',()=>{
  for (const side of [0,1]) {
    const e=learner();boundary(e,3);
    const before=JSON.stringify([e.round().items,e.round().counts,e.state.completed]);
    const first=S.next(e),run=e.state.studyRun,branch=run.branches[side];
    assert.equal(first.extra.index,0);
    assert.equal(A.check(e,{answer:branch.pick.answer}).correct,true);
    const loaded=new L.Engine({storage:e.storage}),second=S.next(loaded);
    assert.equal(second.extra.index,1);assert.equal(second.extra.previous.toLocaleLowerCase('tr'),branch.pick.answer.toLocaleLowerCase('tr'));
    assert.equal(second.extra.cue,branch.cue);assert.equal(second.task.answer,branch.answer.answer);
    assert.equal(A.check(loaded,{answer:branch.other.answer}).correct,false);
    assert.equal(A.check(loaded,{answer:branch.answer.answer}).direct,false);
    assert.equal(S.next(loaded),null);assert.equal(S.next(loaded),null);
    assert.equal(JSON.stringify([loaded.round().items,loaded.round().counts,loaded.state.completed]),before);
    assert.ok(!loaded.next().extra);
  }
});
test('word trainer errors seed a finite recall round, wrong and correct outcomes have distinct due dates',()=>{
  const e=learner();const prep=new Prep.Preparation(e.storage),ids=[W.byLemma.araba.id,W.byLemma.ev.id];
  for(const id of ids){
    prep.state.current={id,phase:'typing',direction:'tr',attempts:0};
    prep.type('yanlış');prep.skip();assert.equal(prep.progress(id).failures,1);
  }
  boundary(e,2);
  let c=S.next(e);assert.equal(c.extra.total,2);
  const wrong=c.extra.card.id;assert.equal(A.check(e,{unknown:true}).correct,false);
  c=S.next(e);const right=c.extra.card.id;assert.notEqual(right,wrong);
  assert.equal(A.check(e,{answer:c.task.answer}).correct,true);
  assert.equal(S.next(e),null);
  assert.ok(!S.reviewCards(e).length);
  e.state.completed+=4;
  assert.deepEqual(S.reviewCards(e).map(c=>c.id),[wrong]);
  e.clock=()=>1000000+86400000;assert.ok(S.reviewCards(e).some(c=>c.id===right));
});
test('a misplaced ending schedules that exact form and review tasks require it',()=>{
  const e=learner(40),task=e.available().find(t=>t.groups.some(g=>g.slots.some(s=>s.features.case==='accusative')));
  assert.ok(task);
  const c=e.begin(task);c.delivery={mode:'build',version:1,options:[]};
  c.tokens=task.groups.flatMap(g=>g.slots.map((s,i)=>({...s,features:{...s.features},id:g.id+i,group:g.id})));
  const changed=c.tokens.find(t=>t.features.case==='accusative');
  const target=B.plan(changed).find(op=>op.stage==='case');
  delete changed.features.case;
  assert.equal(e.check().issue.area,'grammar');const id=G.key(target);
  assert.equal(e.state.skills[id].errors,1);
  e.state.completed+=4;const card=S.reviewCards(e).find(c=>c.id===id);
  assert.ok(card);assert.ok(G.required(card.task).includes(id));
});
test('a beginner and an advanced learner can play complete permitted scenes',()=>{
  for(const level of [1,80,160]){
    const e=learner(level),scenes=S.dialogues(e);
    assert.ok(scenes.length);
    if(level>1)assert.ok(scenes.some(s=>s.scene.level>=(level===80?41:121)),scenes.map(s=>s.scene.title).join(', '));
    for(const {branches} of scenes)for(const b of branches){
      assert.notEqual(b.answer.answer,b.other.answer);
      for(const t of [b.pick,...b.question,b.answer,b.other]) {
        assert.ok(t.requires.every(id=>e.unlocked().has(id)));assert.ok(e.canTask(t,e.practiceGrammar()));
      }
    }
  }
});
test('word recall opens the Turkish keyboard after a checkpoint and resumes the saved draft',()=>{
  const a=app();learnTo(a,1);
  a.run('openSentenceTest(null);{const e=SentenceGame.engine,r=e.round();WordTrainer.model.progress(AndreWords.byLemma.ev.id).failures=3;WordTrainer.model.save();r.intro=2;r.items=Array.from({length:6},()=>({direct:true}));e.state.current.finished=true;SentenceGame.next();}');
  a.el('sentenceStageBreak').querySelectorAll('button').find(b=>b.textContent==='Nächste Etappe').click();
  assert.match(a.el('sentenceModeLabel').textContent,/Wiederholung · 1 \/ 1/);
  assert.equal(a.el('sentenceReadingKeyboard').hidden,false);
  a.run('SentenceGame.typeReading("e");closeSentenceTest();openSentenceTest(null)');
  assert.equal(a.run('SentenceGame.current.draft'),'e');
  a.run('SentenceGame.typeReading("v");SentenceGame.check()');
  assert.equal(a.run('SentenceGame.current.firstOutcome'),'correct');
  a.el('sentenceNextButton').click();assert.equal(a.run('SentenceGame.engine.stageSummary().done'),0);
});
test('the normal checkpoint opens a conversation, saves the branch and returns to the same course stage',()=>{
  const a=app();learnTo(a,1);a.run('openSentenceTest(null);{const e=SentenceGame.engine,r=e.round();r.intro=2;r.items=Array.from({length:12},()=>({direct:true}));r.stage={start:6,number:2};e.state.current.finished=true;SentenceGame.next();}');
  a.el('sentenceStageBreak').querySelectorAll('button').find(b=>b.textContent==='Nächste Etappe').click();
  assert.match(a.el('sentenceModeLabel').textContent,/Gespräch · 1/);
  const buttons=()=>a.el('sentenceReading').querySelectorAll('.study-option');
  buttons()[1].click();a.el('sentenceNextButton').click();
  const prompt=a.el('sentencePrompt').textContent;
  a.run('closeSentenceTest();openSentenceTest(null)');
  assert.equal(a.el('sentencePrompt').textContent,prompt);assert.match(a.el('sentenceModeLabel').textContent,/Gespräch · 2/);
  buttons().find(b=>b.textContent===a.run('SentenceGame.task.answer')).click();a.el('sentenceNextButton').click();
  assert.equal(a.run('SentenceGame.current.extra'),undefined);assert.equal(a.run('SentenceGame.engine.stageSummary().done'),0);
});
