const {test}=require('node:test'),assert=require('node:assert/strict'),L=require('../lib/guided-learning'),P=require('../lib/learning-path'),M=require('../lib/interest-practice'),G=require('../lib/course-grammar'),{app}=require('./helpers/app.cjs'),{learnTo}=require('./helpers/progress.cjs');
function learner(level=1){const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage,random:()=>.37});map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(level).map(id=>[id,{toTurkish:true,toGerman:true}]))));e.flow.level=e.flow.frontier=level;e.grammar.state.unlocked=Object.fromEntries(P.lessons.slice(0,level-1).flatMap(l=>l.targets).map(id=>[id,true]));e.syncProgress();e.save();return {e,map,storage,m:new M.Practice({engine:e,random:()=>.37})};}
test('optional listening requires an ended audio or an explicitly distinct text path',()=>{
 const {m,e}=learner(),before=JSON.stringify(e.flow),s=m.open('listen','T02'),t=m.task();assert.equal(s.tasks.length,3);assert.ok(t.options.length>=2);assert.ok(m.check(t.target.de).ignored);assert.equal(m.state.stats[s.key],undefined);
 m.heard();assert.equal(m.state.stats[s.key],undefined);assert.ok(m.check(t.target.de).correct);assert.equal(m.state.stats[s.key].direct,1);assert.ok(m.check(t.target.de).ignored);assert.equal(m.state.stats[s.key].direct,1);
 m.next();m.reveal();assert.ok(m.check(m.task().target.de).correct);assert.equal(m.state.stats[s.key].direct,1);assert.equal(m.state.stats[s.key].text,1);assert.equal(m.state.stats[s.key].byLevel[1].direct,1);assert.equal(m.state.stats[s.key].byLevel[1].text,1);assert.equal(JSON.stringify(e.flow),before);
});
test('wrong listening is scored once; solution waits indefinitely for explicit next',()=>{const {m}=learner();m.open('listen','T07');m.heard();const t=m.task();assert.equal(m.check(t.options.find(x=>x.tr!==t.target.tr).de).correct,false);assert.equal(m.state.stats[m.current.key].direct,0);assert.ok(m.check(t.target.de).ignored);assert.equal(m.task(),t);assert.ok(m.next());assert.notEqual(m.task(),t);});
test('dialog has eligible personal contexts and one unambiguous target among Turkish options',()=>{const {m,e}=learner(81);m.open('dialog','T11');for(const t of m.current.tasks){assert.ok(t.options.length>=2);assert.equal(t.options.filter(x=>M.same(x.tr,t.target.tr,'tr')).length,1);for(const x of [t.target,...t.options,...(t.partner?[t.partner]:[])])assert.ok(m.eligible(x));}const flow=JSON.stringify(e.flow);assert.ok(m.check(m.task().target.tr).correct);assert.equal(JSON.stringify(e.flow),flow);});
test('writing accepts known alternatives, distinguishes uncertain text, and keeps independent drafts',()=>{
 const {m,e,storage}=learner(81);const s=m.open('write','T05');assert.equal(s.tasks.length,3);const t=m.task();t.draft='Mert, seni çok özledim!';t.caret=5;m.save();const restored=new M.Practice({engine:e,storage});assert.equal(restored.open('write','T05').tasks[0].draft,t.draft);assert.equal(restored.task().caret,5);
 assert.ok(m.check('Henüz doğrulanmamış bir cümle.').unknown);assert.equal(t.done,false);assert.equal(m.state.stats[s.key],undefined);assert.ok(m.keep());assert.equal(m.state.stats[s.key].unverified,1);assert.equal(m.state.stats[s.key].direct,0);m.next();assert.ok(m.check(m.task().target.tr+'.').correct);m.next();assert.ok(m.check(s.tasks[1].target.tr).duplicate);assert.equal(m.task().done,false);
 const candidate=s.catalog.find(x=>!M.same(x.tr,s.tasks[1].target.tr,'tr'));assert.ok(m.check(candidate.tr).correct);m.next();assert.ok(s.finished);assert.equal(m.state.stats[s.key].direct,2);
});
test('examples are assisted and stale permissions do not restore a forbidden exercise',()=>{
 const {m,e,map}=learner();m.open('write','T02');m.reveal();m.check(m.task().target.tr);assert.equal(m.state.stats[m.current.key].assisted,1);assert.equal(m.state.stats[m.current.key].direct,0);
 m.open('dialog','T02');map.set(L.UNLOCK,'{}');assert.equal(m.open('dialog','T02'),null);assert.equal(e.flow.level,1);
});
test('pending options and completed feedback survive reload; changing mode never drops another draft',()=>{
 const {m,e,storage}=learner();const s=m.open('listen','T02');m.reveal();m.check(m.task().target.de);const saved=JSON.stringify(s);m.open('write','T07');m.task().draft='Ben güzel';m.save();const r=new M.Practice({engine:e,storage});assert.equal(JSON.stringify(r.open('listen','T02')),saved);assert.equal(r.open('write','T07').tasks[0].draft,'Ben güzel');
});
test('storage exceptions are visible and never unlock core words or forms',()=>{const {m,e}=learner(),before=JSON.stringify(e.grammar.state);m.storage={getItem(){return null;},setItem(){throw Error('quota');}};m.open('dialog','T02');m.check(m.task().target.tr);assert.match(m.storageError,/nicht speichern/);assert.equal(JSON.stringify(e.grammar.state),before);});
function audioMock(a,voices=true){a.run(`window.spoken=[];window.cancelled=0;window.voiceListener=null;window.voiceReady=${voices};window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};window.speechSynthesis={cancel(){cancelled++;},getVoices(){return voiceReady?[{lang:'tr-TR',name:'Test'}]:[];},addEventListener(type,fn){voiceListener=fn;},removeEventListener(type,fn){if(voiceListener===fn)voiceListener=null;},speak(u){spoken.push(u);u.onstart?.();}};`);}
test('speech waits for Turkish voices, ignores stale completion, and reports errors without credit',()=>{
 const a=app();audioMock(a,false);a.run('window.states=[];AndreSpeech.play("Merhaba",{onState:s=>states.push(s)})');assert.equal(a.run('spoken.length'),0);a.run('voiceReady=true;window.queuedVoiceEvent=voiceListener;queuedVoiceEvent();queuedVoiceEvent()');assert.equal(a.run('spoken.length'),1);a.run('window.old=spoken[0];AndreSpeech.cancel();old.onend()');assert.deepEqual(a.json('states'),['loading','playing','cancelled']);
 a.run('states=[];AndreSpeech.play("Mert",{onState:s=>states.push(s)});spoken[1].onerror()');assert.equal(a.run('states.at(-1)'),'unavailable');a.advance(60000);assert.equal(a.run('states.at(-1)'),'unavailable');
});
test('no voice and a silent speech engine have bounded fallback; hiding cancels output',()=>{
 const a=app();audioMock(a,false);a.run('window.states=[];AndreSpeech.play("Ben",{onState:s=>states.push(s)})');a.advance(1800);assert.equal(a.run('states.at(-1)'),'unavailable');assert.equal(a.run('voiceListener'),null);
 a.run('voiceReady=true;AndreSpeech.play("Ben",{onState:s=>states.push(s)})');a.advance(15000);assert.equal(a.run('states.at(-1)'),'unavailable');a.run('AndreSpeech.play("Ben",{onState:s=>states.push(s)})');a.document.hidden=true;a.document.dispatchEvent({type:'visibilitychange'});assert.equal(a.run('states.at(-1)'),'cancelled');
});
test('navigation keeps the existing sentence and writing draft; common keyboard supports held deletion',()=>{
 const a=app();learnTo(a,1);a.run('openSentenceTest();window.previous=JSON.stringify(SentenceGame.current);closeSentenceTest();SkillPractice.model.mode("write");SkillPractice.open("T02")');assert.equal(a.run('SkillPractice.active'),true);assert.equal(a.el('practiceKeyboard').hidden,false);
 a.run('practiceKeyboard=document.getElementById("practiceKeyboard");practiceKeyboard._actions.onType("Kirby güzel");');assert.equal(a.run('SkillPractice.model.task().draft'),'Kirby güzel');
 const del=a.el('practiceKeyboard').querySelectorAll('.key').find(b=>b.dataset.action==='delete');del.dispatchEvent({type:'pointerdown',pointerId:4,clientX:0,clientY:0});a.advance(650);assert.ok(a.run('SkillPractice.model.task().draft.length')<7);a.run('showView("dictionary",null)');const draft=a.run('SkillPractice.model.task().draft');a.advance(1000);assert.equal(a.run('SkillPractice.model.task().draft'),draft);assert.equal(a.el('practiceKeyboard').hidden,true);
 a.run('SkillPractice.model.mode("build");openSentenceTest()');assert.equal(a.run('JSON.stringify(SentenceGame.current)'),a.run('previous'));a.run('SkillPractice.model.mode("write");SkillPractice.open("T02")');assert.equal(a.run('SkillPractice.model.task().draft'),draft);
});
test('listening UI does not expose Turkish text before completion and never credits cancelled audio',()=>{
 const a=app();learnTo(a,1);audioMock(a);a.run('SkillPractice.model.mode("listen");SkillPractice.open("T02")');const tr=a.run('SkillPractice.model.task().target.tr');assert.ok(!a.el('practiceBody').textContent.includes(tr));const first=a.el('practiceBody').querySelector('.practice-play');first.click();a.run('spoken[0].onend()');assert.equal(a.run('SkillPractice.model.task().heard'),true);assert.ok(!a.el('practiceBody').textContent.includes(tr));a.run('SkillPractice.check(SkillPractice.model.task().target.de)');assert.ok(a.el('practiceBody').textContent.includes(tr));a.advance(60000);assert.equal(a.run('SkillPractice.model.current.index'),0);
 a.run('SkillPractice.next()');a.el('practiceBody').querySelector('.practice-play').click();a.run('window.stale=spoken[1];showView("dictionary",null);stale.onend()');assert.equal(a.run('SkillPractice.model.task().heard'),false);
});
test('unknown writing is neutral in the UI and remains available without an invented error',()=>{
 const a=app();learnTo(a,1);a.run('SkillPractice.model.mode("write");SkillPractice.open("T05");document.getElementById("practiceKeyboard")._actions.onType("Seni özledim");SkillPractice.check(SkillPractice.model.task().draft)');assert.match(a.el('practiceFeedback').textContent,/nicht sicher prüfen/);assert.equal(a.el('practiceKeep').hidden,false);a.el('practiceKeep').click();assert.equal(a.run('SkillPractice.model.task().unverified'),true);assert.equal(a.el('practiceKeyboard').hidden,true);
});
test('new vocabulary enters the shared generator only after unlocking, without a separate practice sentence list',()=>{
 const W=require('../data/words'),{m,e,map}=learner();const known=new Set(e.unlocked());
 const entry=W.register({id:'practice-test-robot',tr:'robotçuk',de:'der kleine Roboter',type:'noun',semantic:'device',themes:['T02'],deGrammar:{gender:'m',singular:'kleiner Roboter',plural:'kleine Roboter'}});
 assert.ok(!m.pool('T02').some(t=>t.requires.includes(entry.id)));
 known.add(entry.id);map.set(L.UNLOCK,JSON.stringify(Object.fromEntries([...known].map(id=>[id,{toTurkish:true,toGerman:true}]))));
 const pool=m.pool('T02');assert.ok(pool.some(t=>t.requires.includes(entry.id)));assert.ok(pool.every(t=>m.eligible(t)));
});
test('a one-meaning pool never invents unknown choices or falsely counts reading as listening',()=>{
 const {m}=learner(),only=m.pool('T02')[0];m.pool=()=>[only];const s=m.open('listen','T02');assert.equal(s.tasks.length,1);assert.equal(m.task().options.length,1);assert.ok(m.check(only.de).ignored);m.reveal();assert.ok(m.check(only.de).correct);assert.equal(m.state.stats[s.key].direct,0);assert.equal(m.state.stats[s.key].text,1);
});
test('finished messages remain readable on return until another round is explicitly requested',()=>{
 const {m,e,storage}=learner();m.open('write','T05');m.task().draft=m.task().target.tr;m.check(m.task().draft);m.next();const original=JSON.stringify(m.current),r=new M.Practice({engine:e,storage});assert.equal(JSON.stringify(r.open('write','T05')),original);const oldId=r.current.created;assert.equal(r.open('write','T05',{fresh:true}).finished,false);assert.notEqual(r.current.created,oldId);
});
