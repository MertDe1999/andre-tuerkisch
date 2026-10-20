const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs'),Prep=require('../lib/word-preparation');
const options=a=>a.el('wordStudy').querySelectorAll('.study-option');

test('a correct choice clearly marks the chosen answer and keeps the result until Continue',()=>{
 const a=app();a.run('openLearnMode("typing")');const before=a.json('WordTrainer.model.state.current');
 const correct=options(a).find(b=>b.dataset.wordId===before.id);correct.click();
 const result=a.el('wordStudy').querySelector('.study-result');assert.ok(result.classList.contains('correct'));assert.equal(result.querySelector('strong').textContent,'Richtig');
 const selected=options(a).find(b=>b.dataset.wordId===before.id);assert.ok(selected.classList.contains('is-correct'));assert.equal(selected.getAttribute('aria-pressed'),'true');assert.equal(selected.querySelector('.study-option-status').textContent,'Richtig');assert.ok(options(a).every(b=>b.disabled));
 assert.equal(options(a).filter(b=>b.classList.contains('is-incorrect')).length,0);assert.equal(a.run('WordTrainer.model.progress('+JSON.stringify(before.id)+').choice'),true);assert.equal(a.run('isWordUnlocked('+JSON.stringify(before.id)+')'),false);
 const saved=a.json('WordTrainer.model.state.current');assert.equal(saved.selectedId,before.id);a.advance(60000);correct.click();assert.deepEqual(a.json('WordTrainer.model.state.current'),saved);assert.equal(a.el('wordStudy').querySelector('.study-result'),result);
 a.el('wordStudy').querySelectorAll('.study-button').find(b=>b.textContent==='Weiter').click();assert.equal(a.el('wordStudy').querySelector('.study-result'),null);assert.ok(!a.el('wordStudy').classList.contains('has-result'));assert.ok(options(a).every(b=>!b.disabled));
});

test('a wrong choice shows selected and correct answers even without audio and never teaches the word',()=>{
 const a=app();a.run('openLearnMode("typing")');const id=a.run('WordTrainer.model.state.current.id'),word=a.json('AndreWords.byId[WordTrainer.model.state.current.id]');
 const wrong=options(a).find(b=>b.dataset.wordId!==id),selectedId=wrong.dataset.wordId;wrong.click();
 const result=a.el('wordStudy').querySelector('.study-result');assert.ok(result.classList.contains('incorrect'));assert.equal(result.querySelector('strong').textContent,'Falsch');assert.ok(result.textContent.includes('Richtig ist: '+word.tr+' = '+word.de));assert.match(result.textContent,/kommt noch einmal/);
 const markedWrong=options(a).find(b=>b.dataset.wordId===selectedId),markedCorrect=options(a).find(b=>b.dataset.wordId===id);
 assert.ok(markedWrong.classList.contains('is-incorrect'));assert.equal(markedWrong.getAttribute('aria-pressed'),'true');assert.match(markedWrong.textContent,/Deine Auswahl: falsch/);assert.ok(markedCorrect.classList.contains('is-correct'));assert.equal(markedCorrect.getAttribute('aria-pressed'),'false');assert.match(markedCorrect.textContent,/Richtige Antwort/);
 assert.match(a.el('wordStudyFeedback').textContent,/Audio nicht verfügbar/);assert.equal(a.run('WordTrainer.model.progress('+JSON.stringify(id)+').choice'),false);assert.equal(a.run('isWordUnlocked('+JSON.stringify(id)+')'),false);assert.equal(a.el('profileLevelValue').textContent,'1');
 const saved=a.json('WordTrainer.model.state.current');a.advance(60000);wrong.click();markedCorrect.click();assert.deepEqual(a.json('WordTrainer.model.state.current'),saved);assert.doesNotMatch(a.el('wordStudy').textContent,/\p{Extended_Pictographic}/u);
 const stored=JSON.parse(a.storage.get(Prep.KEY));assert.equal(stored.current.selectedId,selectedId);assert.equal(stored.current.assisted,true);
 a.run('WordTrainer.next()');assert.equal(a.el('wordStudy').querySelector('.study-result'),null);assert.equal(a.run('WordTrainer.model.progress('+JSON.stringify(id)+').choice'),false);
});

test('an audio playback error cannot replace the visible wrong-answer result',()=>{
 const a=app();a.run(`window.utterances=[];window.speechSynthesis={getVoices:()=>[],speak:u=>utterances.push(u),cancel(){}};window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};openLearnMode('typing');`);
 const id=a.run('WordTrainer.model.state.current.id');options(a).find(b=>b.dataset.wordId!==id).click();
 a.run('utterances[0].onerror()');assert.equal(a.el('wordStudy').querySelector('.study-result').querySelector('strong').textContent,'Falsch');assert.match(a.el('wordStudyFeedback').textContent,/Audio nicht verfügbar/);assert.ok(options(a).some(b=>b.classList.contains('is-incorrect')));
});
