const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');

test('a new learner sees no automatically familiar names or loanwords in flashcards',()=>{
 const a=app();assert.equal(a.run('isWordUnlocked("Aang")'),true);assert.equal(a.run('isWordUnlocked("Black Mirror")'),true);assert.deepEqual(a.json('getAvailableFlashcards()'),[]);
 a.run('openFlashcards()');assert.equal(a.run('remaining.length'),0);assert.equal(a.el('completion').classList.contains('show'),true);assert.equal(a.el('progressText').textContent,'0 / 0');
});

test('both learned directions are required and familiar entries stay absent with old saved unlock flags',()=>{
 const a=app();a.run('markUnlockDirection("ev","toTurkish")');assert.ok(!a.json('getAvailableFlashcards().map(c=>c.tr)').includes('ev'));
 a.unlock(['Aang','Black Mirror','park','protein','ev'],{grammar:false});assert.ok(a.json('getAvailableFlashcards().map(c=>c.tr)').includes('ev'));
 for(const mode of ['toTurkish','toGerman','roulette']){
  a.run('startQuiz('+JSON.stringify(mode)+')');assert.ok(a.run('remaining.length')>0);assert.ok(a.run('remaining.every(c=>getFlashcardRequirements(c).every(w=>!AndreLearningPath.auto.has(unlockWordKey(w))))'));
  assert.ok(!a.json('remaining.map(c=>c.tr)').some(tr=>['Aang','Black Mirror','park','protein'].includes(tr)));
 }
 const loaded=app({storage:a.storage});assert.ok(loaded.run('getAvailableFlashcards().every(c=>getFlashcardRequirements(c).every(w=>!AndreLearningPath.auto.has(unlockWordKey(w))))'));
});

test('all visible learned words and derived cards remain available while hidden entries remain excluded',()=>{
 const a=app();a.unlock(undefined,{grammar:false});const cards=a.json('getAvailableFlashcards()'),ids=new Set(cards.map(c=>c.id));
 const visible=a.json('AndreWords.words.filter(w=>!AndreLearningPath.auto.has(w.id)).map(w=>w.id)'),hidden=a.json('[...AndreLearningPath.auto]');
 assert.ok(visible.every(id=>ids.has(id)));assert.ok(hidden.every(id=>!ids.has(id)));assert.ok(cards.some(c=>c.de==='Gehen ist schön.'));
 a.run('openFlashcards();cycleQuizMode();restartQuiz()');assert.ok(a.run('remaining.every(c=>getFlashcardRequirements(c).every(w=>!AndreLearningPath.auto.has(unlockWordKey(w))))'));
});
