const {test}=require('node:test'),assert=require('node:assert/strict'),T=require('../lib/turkish'),C=require('../lib/course'),G=require('../lib/course-grammar'),L=require('../lib/guided-learning'),P=require('../lib/learning-path'),{app}=require('./helpers/app.cjs');
test('independent noun/reference cases: water genitive and plural nominal questions',()=>{
 assert.equal(T.noun('su',{case:'genitive'}),'suyun');
 assert.equal(T.noun('su',{poss:'ben',case:'genitive'}),'suyumun');
 assert.equal(T.nominal('güzel',{person:'onlar',question:true}),'güzeller mi');
 assert.equal(T.surface({lemma:'ev',features:{case:'locative',predicatePerson:'ben',past:true}}),'evdeydim');
 assert.equal(T.surface({lemma:'ev',features:{case:'locative',predicatePerson:'sen',question:true}}),'evde misin');
});
function learner(){const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage,random:()=>.37});map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}]))));return {e,map,storage};}
test('reference names teach accusative objects and genitive possessors, not homographic possessives',()=>{
 const refs=require('../data/interest-references'),W=require('../data/words');
 const name=(level,tr)=>refs[level-1].groups.flatMap(g=>g.slots).find(s=>W.byId[s.lemma].tr===tr);
 assert.deepEqual(name(22,'Ben').features,{case:'accusative'});
 assert.deepEqual(name(34,'Mert').features,{case:'genitive'});
 assert.deepEqual(name(137,'Mert').features,{case:'genitive'});
 for(const ref of refs)for(const s of ref.groups.flatMap(g=>g.slots))if(W.byId[s.lemma].properName)assert.ok(!s.features.poss,ref.id);
});
test('reading choices use eligible sentences, persist, and wrong guesses do not earn direct credit',()=>{
 const {e,storage}=learner();e.round().intro=2;const first=e.next();first.tokens=first.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:g.id+i,group:g.id})));assert.ok(e.check().correct);
 const cur=e.next();assert.equal(cur.direction,'de');const options=e.readingChoices();assert.ok(options.length>=2&&options.length<=4);assert.ok(options.includes(cur.task.de));assert.equal(new Set(options.map(x=>G.norm(x,'de'))).size,options.length);
 const eligible=new Set(e.available().map(t=>t.de));assert.ok(options.every(x=>eligible.has(x)));
 const restored=new L.Engine({storage,random:()=>.99});assert.deepEqual(restored.readingChoices(),options);
 assert.equal(e.check({answer:options.find(x=>x!==cur.task.de)}).correct,false);assert.equal(e.check({answer:cur.task.de}).direct,false);assert.equal(e.flow.level,1);
});
test('legacy reading drafts keep writing and a one-sentence pool has no bogus choices',()=>{
 const {e}=learner(),cur=e.next();cur.direction='de';cur.draft='Mein';assert.deepEqual(e.readingChoices(),[]);cur.draft='';cur.readingMode='mixed';e.available=()=>[cur.task];assert.deepEqual(e.readingChoices(),[]);assert.equal(cur.readingMode,'writing');
});
test('reading buttons replace the keyboard, allow correction, and then wait for Weiter',()=>{
 const a=app();require('./helpers/progress.cjs').learnTo(a,1);
 a.run('startSentenceGame();SentenceGame.current.direction="de";SentenceGame.current.readingMode="mixed";SentenceGame.render()');
 const options=a.el('sentenceReading').querySelector('.sentence-reading-options'),correct=a.run('SentenceGame.task.de');
 assert.ok(options.children.length>=2);assert.equal(a.el('sentenceReadingKeyboard').hidden,true);
 options.children.find(b=>b.textContent!==correct).click();assert.equal(a.run('SentenceGame.current.finished'),false);
 options.children.find(b=>b.textContent===correct).click();assert.equal(a.run('SentenceGame.current.finished'),true);assert.equal(a.run('SentenceGame.current.firstOutcome'),'wrong');
 assert.ok(options.children.every(b=>b.disabled));assert.equal(a.el('sentenceNextButton').hidden,false);const id=a.run('SentenceGame.current.id');a.advance(60000);assert.equal(a.run('SentenceGame.current.id'),id);
});
test('a thrown speech-output error does not block the text word trainer or grant progress',()=>{
 const a=app();a.run('window.speechSynthesis={cancel(){},getVoices(){return [];},speak(){throw Error("Audio unavailable");}};window.SpeechSynthesisUtterance=class{};openLearnMode("typing");WordTrainer.unknown()');a.advance(180);
 assert.equal(a.run('WordTrainer.model.state.current.phase'),'choice');assert.equal(a.run('WordTrainer.model.progress(WordTrainer.model.state.current.id).choice'),false);assert.match(a.el('wordStudyFeedback').textContent,/Audio nicht verfügbar/);a.advance(2000);assert.equal(a.run('WordTrainer.model.state.current.done'),false);
});
test('a correct built sentence remains until Weiter, even after a minute',()=>{
 const a=app();a.unlock();a.run('openSentenceTest();SentenceGame.current.tokens=SentenceGame.task.groups.flatMap(g=>g.slots.map((s,i)=>({...JSON.parse(JSON.stringify(s)),id:g.id+i,group:g.id})));SentenceGame.check();');
 const id=a.run('SentenceGame.current.id');assert.equal(a.run('SentenceGame.current.finished'),true);assert.equal(a.el('sentenceNextButton').hidden,false);a.advance(60000);assert.equal(a.run('SentenceGame.current.id'),id);
 a.run('SentenceGame.next()');assert.notEqual(a.run('SentenceGame.current.id'),id);
});
test('sound starts enabled, music remains optional, and preference persists',()=>{
 const a=app();assert.equal(a.run('AndreSound.mode'),1);a.el('soundToggle').click();assert.equal(a.run('AndreSound.mode'),2);
 const restored=app({storage:a.storage});assert.equal(restored.run('AndreSound.mode'),2);restored.run('AndreSound.session(true)');assert.equal(restored.run('typeof window.AudioContext'),'undefined');a.el('soundToggle').click();assert.equal(a.run('AndreSound.mode'),0);
});
test('music stops when hidden and on leaving, and does not start on load',()=>{
 const a=app({storage:new Map([['andreSoundModeV1','2']])});a.run(`window.notes=0;window.stops=0;window.AudioContext=class{currentTime=0;destination={};resume(){return Promise.resolve();}createGain(){return {gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}createOscillator(){return {frequency:{},connect(){},disconnect(){},start(){notes++;},stop(){stops++;}};}};AndreSound.session(true);`);
 assert.equal(a.run('notes'),0);assert.equal(a.el('soundToggle').parentElement,a.el('sentenceSoundSlot'));a.run('AndreSound.effect("correct")');assert.ok(a.run('notes')>0);a.document.hidden=true;a.document.dispatchEvent({type:'visibilitychange'});const count=a.run('notes');a.advance(60000);assert.equal(a.run('notes'),count);
 a.document.hidden=false;a.document.dispatchEvent({type:'visibilitychange'});assert.ok(a.run('notes')>count);a.run('AndreSound.session(false)');assert.equal(a.el('soundToggle').parentElement,a.el('profileSoundSlot'));const final=a.run('notes');a.advance(60000);assert.equal(a.run('notes'),final);
});
