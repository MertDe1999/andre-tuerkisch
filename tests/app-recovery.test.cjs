const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs'),{study,type}=require('./helpers/word-study.cjs');

const pageEvent=(a,type,persisted=true)=>a.run('window.dispatchEvent')({type,persisted});
function openSentences(a){
 a.run('saveUnlockProgress(Object.fromEntries(AndreLearningPath.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}])));SentenceGame.engine.round().intro=2;openSentenceTest(null)');
}

test('browser Back restores a word draft and hardware Delete edits at its caret',()=>{
 const a=study();type(a,'exv');a.run('WordTrainer.type("Home");WordTrainer.type("ArrowRight")');
 const before=a.json('WordTrainer.model.state.current');
 pageEvent(a,'pagehide');assert.equal(a.run('WordTrainer.active'),false);assert.equal(a.el('wordStudy').hidden,true);
 pageEvent(a,'pageshow');assert.equal(a.run('WordTrainer.active'),true);assert.equal(a.el('wordStudy').hidden,false);
 assert.deepEqual(a.json('WordTrainer.model.state.current'),before);
 let prevented=false;a.document.dispatchEvent({type:'keydown',key:'Delete',target:a.el('wordStudyAnswer'),preventDefault(){prevented=true;}});
 assert.equal(prevented,true);assert.equal(a.run('WordTrainer.model.state.current.draft'),'ev');assert.equal(a.run('WordTrainer.model.state.current.caret'),1);
 a.run('WordTrainer.check()');assert.equal(a.run('WordTrainer.model.state.current.done'),true);
});

test('browser Back keeps the visible word result until its resumed reading pause completes',()=>{
 const a=app({storage:new Map([['andreSoundModeV1','0']])});a.run('openLearnMode("typing")');
 const id=a.run('WordTrainer.model.state.current.id');a.el('wordStudy').querySelectorAll('.study-option').find(b=>b.dataset.wordId===id).click();
 const result=a.json('WordTrainer.model.state.current');pageEvent(a,'pagehide');a.advance(5000);pageEvent(a,'pageshow');
 assert.deepEqual(a.json('WordTrainer.model.state.current'),result);assert.match(a.el('wordStudy').textContent,/Richtig/);
 a.advance(1999);assert.equal(a.run('WordTrainer.model.state.current.id'),id);a.advance(1);assert.notEqual(a.run('WordTrainer.model.state.current.id'),id);
 a.run('backToLearnHome()');pageEvent(a,'pagehide');pageEvent(a,'pageshow');assert.equal(a.run('WordTrainer.active'),false);
});

test('browser Back preserves a sentence attempt and its finished feedback without advancing or awarding twice',()=>{
 const a=app();openSentences(a);const id=a.run('SentenceGame.current.id');a.run('SentenceGame.check()');
 const wrong=a.json('SentenceGame.current');pageEvent(a,'pagehide');assert.equal(a.run('sentenceGameRunning'),false);
 pageEvent(a,'pageshow');assert.equal(a.run('sentenceGameRunning'),true);assert.equal(a.el('sentenceDuel').hidden,false);assert.deepEqual(a.json('SentenceGame.current'),wrong);
 a.run('SentenceGame.check(true)');assert.equal(a.run('SentenceGame.current.finished'),true);const done=a.run('SentenceGame.engine.state.completed');
 pageEvent(a,'pagehide');pageEvent(a,'pageshow');assert.equal(a.run('SentenceGame.current.id'),id);assert.equal(a.el('sentenceNextButton').hidden,false);
 a.run('SentenceGame.check()');assert.equal(a.run('SentenceGame.engine.state.completed'),done);
 a.el('sentenceNextButton').click();assert.notEqual(a.run('SentenceGame.current.id'),id);
 a.run('closeSentenceTest()');assert.equal(a.el('sentenceTestButton').querySelector('.journey-start-label').textContent,'Weiterlernen');
 pageEvent(a,'pagehide');pageEvent(a,'pageshow');assert.equal(a.run('sentenceGameRunning'),false);
});

test('empty flashcards lead to words and cached navigation preserves an open grammar explanation',()=>{
 const a=app();a.run('openFlashcards()');assert.equal(a.el('quizCompletionAction').textContent,'Wörter freischalten');assert.equal(a.el('quizCompletionIcon').hidden,true);
 a.run('completeQuizAction()');assert.equal(a.run('WordTrainer.active'),true);
 a.unlock(['ev'],{grammar:false});a.run('openFlashcards()');assert.equal(a.el('quizCompletionAction').textContent,'Nochmal starten');assert.equal(a.el('quizCompletionIcon').hidden,false);
 openSentences(a);a.run('showView("grammar",null);GrammarTrainer.open(1)');assert.equal(a.run('GrammarTrainer.active'),true);
 pageEvent(a,'pagehide');pageEvent(a,'pageshow');assert.equal(a.run('GrammarTrainer.active'),true);
});
