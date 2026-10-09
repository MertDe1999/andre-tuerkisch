const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs'),Prep=require('../lib/word-preparation'),W=require('../data/words'),V=require('../lib/word-pictures');
const Path=require('../lib/learning-path');

function audioApp(){const a=app();a.run(`window.utterances=[];window.speechSynthesis={getVoices:()=>[],speak:u=>utterances.push(u),cancel(){}};window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};window.SpeechRecognition=class{constructor(){window.recognizer=this;}start(){}abort(){}};`);return a;}

test('all new pronunciations precede any picture, and all choices precede typing',()=>{
 const a=audioApp();a.run('openLearnMode("typing")');const group=a.json('SentenceGame.engine.missingWords().map(w=>w.id)');
 assert.equal(a.run('utterances.length'),1);assert.equal(a.run('utterances[0].lang'),'tr-TR');assert.equal(a.el('wordStudy').querySelector('.word-picture'),null);assert.equal(a.el('wordStudy').querySelector('.typing-answer'),null);
 a.run('WordTrainer.listen()');assert.equal(a.run('typeof recognizer'),'undefined');assert.equal(a.run('WordTrainer.model.progress(WordTrainer.model.state.current.id).spoken'),false);
 for(let i=0;i<group.length;i++){
  assert.equal(a.run('WordTrainer.model.state.current.phase'),'spoken');assert.equal(a.el('wordStudy').querySelector('.word-picture'),null);
  a.run('utterances.at(-1).onend();WordTrainer.listen();recognizer.onresult({results:[[{transcript:AndreWords.byId[WordTrainer.model.state.current.id].tr}]]});WordTrainer.next()');
 }
 assert.ok(group.every(id=>a.run('WordTrainer.model.progress('+JSON.stringify(id)+').spoken')));
 for(let i=0;i<group.length;i++){
  assert.equal(a.run('WordTrainer.model.state.current.phase'),'choice');assert.ok(a.el('wordStudy').querySelector('.word-picture'));assert.equal(a.el('wordStudy').querySelector('.typing-answer'),null);
  const options=a.el('wordStudy').querySelectorAll('.study-option'),target=a.run('AndreWords.byId[WordTrainer.model.state.current.id].tr');assert.equal(options.length,4);
  assert.ok(options.every(b=>group.some(id=>W.byId[id].tr===b.textContent)));options.find(b=>b.textContent===target).click();a.run('WordTrainer.next()');
 }
 assert.equal(a.run('WordTrainer.model.state.current.phase'),'typing');assert.equal(a.el('wordStudy').querySelector('.word-picture'),null);assert.ok(a.el('wordStudy').querySelector('.typing-answer'));
});

test('answer choices never borrow familiar or older words, and their order survives redraw/reload',()=>{
 const storage=new Map(),p=new Prep.Preparation({getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)}),ids=['ev','araba','masa','köpek'].map(w=>W.byLemma[w].id);
 ids.forEach(id=>p.progress(id).spoken=true);p.next(ids,new Set());const options=p.choices(ids,V.key).map(w=>w.id);assert.equal(options.length,4);assert.ok(options.every(id=>ids.includes(id)));assert.deepEqual(p.choices(ids,V.key).map(w=>w.id),options);
 assert.deepEqual(new Prep.Preparation(p.storage).choices(ids,V.key).map(w=>w.id),options);
 const short=p.choices([p.state.current.id,ids.find(id=>id!==p.state.current.id)],V.key);assert.equal(short.length,2);assert.ok(short.every(w=>ids.includes(w.id)));
});

test('small groups retain only current new words and show fewer choices across reload',()=>{
 const a=app();a.run('SentenceGame.engine.flow.level=2;SentenceGame.engine.flow.frontier=2;SentenceGame.engine.syncProgress();SentenceGame.engine.save();saveUnlockProgress(Object.fromEntries(AndreLearningPath.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}])));openLearnMode("typing")');
 const group=a.json('SentenceGame.engine.missingWords().map(w=>w.id)');assert.equal(group.length,1);
 a.run('WordTrainer.model.spoken(AndreWords.byId[WordTrainer.model.state.current.id].tr);WordTrainer.next()');assert.equal(a.run('WordTrainer.model.state.current.phase'),'choice');assert.equal(a.el('wordStudy').querySelectorAll('.study-option').length,1);
 assert.ok(!a.json('SentenceGame.engine.missingWords().map(w=>w.id)').some(id=>!group.includes(id)));const text=a.el('wordStudy').querySelector('.study-option').textContent;
 a.run('showView("grammar",null)');const restored=app({storage:a.storage});restored.run('openLearnMode("typing")');assert.deepEqual(restored.json('SentenceGame.engine.missingWords().map(w=>w.id)'),group);assert.equal(restored.el('wordStudy').querySelectorAll('.study-option').length,1);assert.equal(restored.el('wordStudy').querySelector('.study-option').textContent,text);
});

test('every step through 160 draws its choices exclusively from its currently new words',()=>{
 const known=new Set(Path.auto);let checked=0;
 for(const lesson of Path.lessons){
  const ids=Path.wordIds(lesson.level).filter(id=>!known.has(id)),p=new Prep.Preparation({getItem(){return null;},setItem(){}});
  for(const id of ids){p.state.current={id,phase:'choice'};const choices=p.choices(ids,V.key);assert.ok(choices.length>=1&&choices.length<=4);assert.equal(choices.filter(w=>w.id===id).length,1);assert.equal(new Set(choices.map(w=>Prep.norm(w.tr))).size,choices.length);assert.ok(choices.every(w=>ids.includes(w.id)&&!known.has(w.id)));checked++;}
  ids.forEach(id=>known.add(id));
 }
 assert.equal(checked,Path.wordIds(160).length);
});
