const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs'),Prep=require('../lib/word-preparation'),W=require('../data/words');
const Path=require('../lib/learning-path');

test('new words show German text with Turkish choices and the whole choice group precedes typing',()=>{
 const a=app();a.run('openLearnMode("typing")');const group=a.json('SentenceGame.engine.missingWords().map(w=>w.id)');
 assert.doesNotMatch(a.el('wordStudy').textContent,/Aussprache|Sprechen|Selbst prüfen/);
 for(let i=0;i<group.length;i++){
  assert.equal(a.run('WordTrainer.model.state.current.phase'),'choice');assert.equal(a.el('wordStudy').querySelector('.study-prompt').textContent,a.run('AndreWords.byId[WordTrainer.model.state.current.id].de'));assert.equal(a.el('wordStudy').querySelector('.word-picture'),null);assert.doesNotMatch(a.el('wordStudy').textContent,/\p{Extended_Pictographic}/u);assert.equal(a.el('wordStudy').querySelector('.typing-answer'),null);assert.equal(a.el('wordStudy').querySelector('.study-audio'),null);
  const options=a.el('wordStudy').querySelectorAll('.study-option'),target=a.run('AndreWords.byId[WordTrainer.model.state.current.id].tr');assert.equal(options.length,4);
  assert.ok(options.every(b=>group.some(id=>W.byId[id].tr===b.textContent)));options.find(b=>b.textContent===target).click();a.run('WordTrainer.next()');
 }
 assert.equal(a.run('WordTrainer.model.state.current.phase'),'typing');assert.equal(a.el('wordStudy').querySelector('.word-picture'),null);assert.ok(a.el('wordStudy').querySelector('.typing-answer'));
});

test('answer choices never borrow familiar or older words, and their order survives redraw/reload',()=>{
 const storage=new Map(),p=new Prep.Preparation({getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)}),ids=['ev','araba','masa','köpek'].map(w=>W.byLemma[w].id);
 p.next(ids,new Set());const options=p.choices(ids).map(w=>w.id);assert.equal(options.length,4);assert.ok(options.every(id=>ids.includes(id)));assert.deepEqual(p.choices(ids).map(w=>w.id),options);
 assert.deepEqual(new Prep.Preparation(p.storage).choices(ids).map(w=>w.id),options);
 const short=p.choices([p.state.current.id,ids.find(id=>id!==p.state.current.id)]);assert.equal(short.length,2);assert.ok(short.every(w=>ids.includes(w.id)));
});

test('an old picture task resumes as text and keeps the same answer order and partial progress',()=>{
 const a=app();a.run('openLearnMode("typing");WordTrainer.model.progress(WordTrainer.model.state.current.id).tr=true;WordTrainer.model.save();showView("grammar",null)');
 const saved=a.json('WordTrainer.model.state.current'),options=saved.optionIds;
 const loaded=app({storage:a.storage});loaded.run('openLearnMode("typing")');
 assert.equal(loaded.run('WordTrainer.model.state.current.id'),saved.id);assert.deepEqual(loaded.json('WordTrainer.model.state.current.optionIds'),options);assert.equal(loaded.el('wordStudy').querySelector('.study-word').textContent,W.byId[saved.id].de);assert.equal(loaded.el('wordStudy').querySelector('.word-picture'),null);assert.equal(loaded.run('WordTrainer.model.progress('+JSON.stringify(saved.id)+').tr'),true);
});

test('same German meaning is not offered as an incorrect translation, including saved old options',()=>{
 const p=new Prep.Preparation({getItem(){return null;},setItem(){}}),ids=['iw026','iw329',W.byLemma.ev.id];
 assert.equal(W.byId.iw026.de,'Farbe');assert.equal(W.byId.iw329.de,'Farbe');
 p.state.current={id:'iw026',phase:'choice',optionIds:[...ids]};
 const options=p.choices(ids).map(w=>w.id);assert.ok(options.includes('iw026'));assert.ok(options.includes(W.byLemma.ev.id));assert.ok(!options.includes('iw329'));assert.deepEqual(p.choices(ids).map(w=>w.id),options);
});

test('small groups retain only current new words and show fewer choices across reload',()=>{
 const a=app();a.run('SentenceGame.engine.flow.level=2;SentenceGame.engine.flow.frontier=2;SentenceGame.engine.syncProgress();SentenceGame.engine.save();saveUnlockProgress(Object.fromEntries(AndreLearningPath.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}])));openLearnMode("typing")');
 const group=a.json('SentenceGame.engine.missingWords().map(w=>w.id)');assert.equal(group.length,1);
 assert.equal(a.run('WordTrainer.model.state.current.phase'),'choice');assert.equal(a.el('wordStudy').querySelectorAll('.study-option').length,1);
 assert.ok(!a.json('SentenceGame.engine.missingWords().map(w=>w.id)').some(id=>!group.includes(id)));const text=a.el('wordStudy').querySelector('.study-option').textContent;
 a.run('showView("grammar",null)');const restored=app({storage:a.storage});restored.run('openLearnMode("typing")');assert.deepEqual(restored.json('SentenceGame.engine.missingWords().map(w=>w.id)'),group);assert.equal(restored.el('wordStudy').querySelectorAll('.study-option').length,1);assert.equal(restored.el('wordStudy').querySelector('.study-option').textContent,text);
});

test('every step through 160 draws its choices exclusively from its currently new words',()=>{
 const known=new Set(Path.auto);let checked=0;
 for(const lesson of Path.lessons){
  const ids=Path.wordIds(lesson.level).filter(id=>!known.has(id)),p=new Prep.Preparation({getItem(){return null;},setItem(){}});
  for(const id of ids){p.state.current={id,phase:'choice'};const choices=p.choices(ids);assert.ok(choices.length>=1&&choices.length<=4);assert.equal(choices.filter(w=>w.id===id).length,1);assert.equal(new Set(choices.map(w=>Prep.norm(w.tr))).size,choices.length);assert.ok(choices.every(w=>ids.includes(w.id)&&!known.has(w.id)));checked++;}
  ids.forEach(id=>known.add(id));
 }
 assert.equal(checked,Path.wordIds(160).length);
});
