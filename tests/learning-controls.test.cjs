const {test} = require('node:test');
const assert = require('node:assert/strict');
const {app} = require('./helpers/app.cjs');

function trainer(){
  const a = app();
  a.run('let renderedWords = 0; const originalRender = renderTypingWord; renderTypingWord = function(){renderedWords++;originalRender();}; startTypingGame();');
  return a;
}

function answerCorrectly(a){
  a.run('typedAnswer = typingDirection === "toTurkish" ? typingRemaining[typingCurrentIndex].tr : typingRemaining[typingCurrentIndex].deAnswers[0]; checkTypedAnswer();');
}

function key(a, value, extras = {}){
  const event = {type:'keydown', key:value, target:a.el('typingAnswer'), prevented:false,
    preventDefault(){this.prevented = true;}, ...extras};
  a.document.dispatchEvent(event);
  return event;
}

test('a correct answer locks all input and double checking advances only once', () => {
  const a = trainer();answerCorrectly(a);
  const shown = a.el('typingAnswer').textContent;
  const progress = [...a.storage];
  a.run('checkTypedAnswer();handleDontKnow();typeCustomKey("x");');
  key(a,'x');key(a,'Enter');
  assert.equal(a.el('typingAnswer').textContent,shown);
  assert.deepEqual([...a.storage],progress);
  assert.ok(a.el('customKeyboard').children.flatMap(row=>row.children).every(button=>button.disabled));
  assert.equal(a.timers.size,1);
  a.advance(749);assert.equal(a.run('renderedWords'),1);
  a.advance(1);assert.equal(a.run('renderedWords'),2);
  assert.ok(a.el('customKeyboard').children.flatMap(row=>row.children).every(button=>!button.disabled));
});

test('double tapping unknown schedules one task; both unknown directions show a readable translation', () => {
  const a = trainer();
  a.run('handleDontKnow();handleDontKnow();');
  assert.equal(a.timers.size,1);
  a.advance(650);assert.equal(a.run('renderedWords'),2);
  a.run('typingWords.splice(0,typingWords.length,{de:"Haus",tr:"ev",deAnswers:["haus"]});startTypingGame();handleDontKnow();');
  a.advance(650);
  a.run('handleDontKnow();handleDontKnow();');
  assert.equal(a.el('typingAnswer').textContent,'Haus ↔ ev');
  assert.equal(a.timers.size,1);
  const renders = a.run('renderedWords');
  a.advance(1699);assert.equal(a.run('renderedWords'),renders);
  a.advance(1);assert.equal(a.run('renderedWords'),renders+1);
});

test('back, main navigation, another game, and restarting all cancel old trainer transitions', () => {
  for(const exit of ['backToLearnHome()', 'showView("grammar",null)', 'openLearnMode("cards")', 'startTypingGame()']){
    const a = trainer();answerCorrectly(a);a.advance(100);
    a.run(exit);
    const renders = a.run('renderedWords');
    a.advance(2000);
    assert.equal(a.run('renderedWords'),renders,exit);
    assert.equal(a.timers.size,0,exit);
    assert.equal(a.run('typingGameRunning'),exit === 'startTypingGame()',exit);
  }
});

test('leaving during translation reveal cancels it and completed trainers ignore keys', () => {
  const a = trainer();
  a.run('typingUnknownState[unlockWordKey(typingRemaining[typingCurrentIndex].tr)] = {toTurkish:true,toGerman:true};handleDontKnow();backToLearnHome();startTypingGame();');
  const renders = a.run('renderedWords');
  a.advance(2000);assert.equal(a.run('renderedWords'),renders);
  a.unlock();a.run('startTypingGame()');
  assert.equal(a.el('typingComplete').classList.contains('show'),true);
  assert.equal(key(a,'x').prevented,false);
});

test('unlock recovery repairs malformed word entries without losing valid or partial progress', () => {
  for(const broken of [true,42,'wrong',null,[],{toTurkish:'true',toGerman:1}]){
    const a = app({storage:new Map([['andreTurkishUnlockProgressV1',JSON.stringify({
      ev:broken,araba:{toTurkish:true,toGerman:true},yol:{toTurkish:true,toGerman:false}
    })]])});
    assert.equal(a.run('isWordUnlocked("ev")'),false);
    a.run('markUnlockDirection("ev","toTurkish");markUnlockDirection("ev","toGerman");');
    assert.equal(a.run('isWordUnlocked("ev")'),true);
    assert.equal(a.run('isWordUnlocked("araba")'),true);
    assert.deepEqual(a.json('getMissingUnlockDirections("yol")'),['toGerman']);
  }
  const a = app({storage:new Map([['andreTurkishUnlockProgressV1','{"__proto__":{"toTurkish":true,"toGerman":true},"constructor":true}']])});
  assert.deepEqual(a.json('getUnlockProgress()'),{});
});

test('hardware keys support Turkish uppercase, editing and submission; wrong answers remain editable', () => {
  const a = trainer();
  a.run('typingWords.splice(0,typingWords.length,{de:"nein",tr:"hayır",deAnswers:["nein"]});startTypingGame();typingDirection="toTurkish";renderTypingWord();');
  for(const letter of 'HAYIX') assert.equal(key(a,letter).prevented,true);
  key(a,'Backspace');key(a,'R');key(a,'Enter');
  assert.equal(a.run('getUnlockProgress()[unlockWordKey("hayır")].toTurkish'),true);
  assert.equal(a.document.activeElement,a.el('typingAnswer'));
  a.advance(750);
  key(a,'x');key(a,'Enter');
  assert.equal(a.el('typingFeedback').textContent,'Noch nicht richtig.');
  key(a,'Backspace');
  for(const letter of 'NEIN') key(a,letter);
  key(a,'Enter');a.advance(650);
  assert.equal(a.el('typingComplete').classList.contains('show'),true);
});

test('keyboard shortcuts, composing text and focused controls retain their normal behavior', () => {
  const a = trainer();
  const button = a.el('customKeyboard').children[0].children[0];
  assert.equal(key(a,'Enter',{target:button}).prevented,false);
  assert.equal(key(a,' ',{target:button}).prevented,false);
  assert.equal(key(a,'a',{ctrlKey:true}).prevented,false);
  assert.equal(key(a,'a',{isComposing:true}).prevented,false);
  assert.equal(key(a,'a',{target:{closest:()=>({})}}).prevented,false);
  assert.equal(a.run('typedAnswer'),'');
});

test('flashcards reveal and advance by Enter or Space and expose their current state', () => {
  const a = app();a.unlock();const saved=[...a.storage];a.run('openFlashcards()');
  assert.equal(a.run('currentMainView'),'dictionary');assert.equal(a.el('dictionaryPanel').hidden,true);
  assert.equal(a.el('cardsLearning').classList.contains('active'),true);
  assert.equal(a.el('unlockFloatingButton').hidden,true);assert.equal(a.document.activeElement,a.el('quizCard'));
  const press = value => a.run('handleQuizCardKeydown')({key:value,preventDefault(){}});
  press('Enter');
  assert.equal(a.el('quizCard').getAttribute('aria-expanded'),'true');
  a.run('handleQuizCardKeydown')({key:'Enter',repeat:true,preventDefault(){}});
  assert.equal(a.run('learnedCount'),0);
  press(' ');
  assert.equal(a.run('learnedCount'),1);
  assert.equal(a.el('quizCard').getAttribute('aria-expanded'),'false');
  press('Enter');a.run('cycleQuizMode()');
  assert.equal(a.el('quizCard').getAttribute('aria-expanded'),'false');
  a.run('closeFlashcards()');assert.equal(a.run('currentMainView'),'dictionary');assert.equal(a.el('dictionaryPanel').hidden,false);
  assert.equal(a.el('cardsLearning').classList.contains('active'),false);assert.equal(a.run('remaining.length'),0);
  assert.equal(a.document.body.classList.contains('game-mode-active'),false);assert.equal(a.document.body.classList.contains('learning-games-view'),false);
  assert.equal(a.document.activeElement,a.el('dictionaryCardsButton'));assert.deepEqual([...a.storage],saved);
  a.run('openLearnMode("cards");showView("grammar",null)');assert.equal(a.el('cardsLearning').classList.contains('active'),false);assert.equal(a.el('dictionaryPanel').hidden,false);
  a.run('showView("flashcards",null)');assert.equal(a.run('currentMainView'),'flashcards');assert.equal(a.el('sentenceBuilder').classList.contains('active'),true);
  assert.equal(a.run('sentenceGameRunning'),true,'the Satzbau navigation opens the game directly');
  const current=a.json('SentenceGame.engine.state.current');
  a.run('openTypingFromFloating()');assert.equal(a.run('currentMainView'),'dictionary');assert.equal(a.run('sentenceGameRunning'),false);
  assert.equal(a.el('typingTrainer').classList.contains('active'),true);assert.equal(a.el('dictionaryPanel').hidden,true);assert.equal(a.el('unlockFloatingButton').hidden,true);
  a.run('backToLearnHome()');assert.equal(a.el('dictionaryPanel').hidden,false);assert.equal(a.el('typingTrainer').classList.contains('active'),false);assert.equal(a.run('typingGameRunning'),false);
  a.run('showView("flashcards",null)');assert.deepEqual(a.json('SentenceGame.engine.state.current'),current,'returning resumes the same ungraded task');
  a.run('leaveSentenceArea()');assert.equal(a.run('currentMainView'),'dictionary');assert.equal(a.run('sentenceGameRunning'),false);assert.equal(a.document.body.classList.contains('game-mode-active'),false);
});
