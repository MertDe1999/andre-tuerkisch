const {test}=require('node:test'),assert=require('node:assert/strict');
const Prep=require('../lib/word-preparation'),P=require('../lib/learning-path'),W=require('../data/words'),L=require('../lib/guided-learning'),C=require('../lib/course');
const {app}=require('./helpers/app.cjs');
const store=()=>{const map=new Map();return {map,getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};};
function ready(storage,level=1){storage.setItem(L.UNLOCK,JSON.stringify(Object.fromEntries(P.wordIds(level).map(id=>[id,{toTurkish:true,toGerman:true}]))));const e=new L.Engine({storage});e.flow.level=level;e.flow.frontier=level;e.flow.round=null;e.state.current=null;e.syncProgress();e.save();return e;}
function solve(e,cur){cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:g.id+i,group:g.id})));return e.check({answer:cur.task.de});}

test('all 160 vocabulary packages finish in portions of at most four without introducing future distractors',()=>{
 const storage=store(),known=new Set(P.auto);let portions=0,words=0;
 for(const lesson of P.lessons){let p=new Prep.Preparation(storage);const ids=P.wordIds(lesson.level).filter(id=>!known.has(id));if(!ids.length)continue;
  p.portion(ids,known,lesson.level);let count=0;
  do{const portion=p.state.portion;assert.ok(portion.ids.length>=1&&portion.ids.length<=4);count++;portions++;
   let iterations=0,cur;while((cur=p.next(portion.ids,known))){assert.ok(++iterations<30);assert.ok(ids.includes(cur.id));if(cur.phase==='choice'){assert.ok(p.choices(portion.ids).every(w=>portion.ids.includes(w.id)&&!known.has(w.id)));p.choose(cur.id);}else{assert.ok(portion.ids.every(id=>known.has(id)||p.progress(id).choice));p.type(cur.direction==='tr'?W.byId[cur.id].tr:W.byId[cur.id].deAnswers[0]);if(p.progress(cur.id).tr&&p.progress(cur.id).de){known.add(cur.id);words++;}}}
   assert.ok(p.portionSummary(known).complete);p=new Prep.Preparation(storage);assert.equal(p.state.current,null);
  }while(p.continuePortion(ids,known,lesson.level));
  if(lesson.level===1)assert.equal(count,6);assert.ok(P.wordIds(lesson.level).every(id=>known.has(id)));
 }
 assert.equal(words,P.wordIds(160).length);assert.ok(portions>160);
});

test('legacy choices, partial writing, caret and failures are adopted without restarting a question',()=>{
 const ids=P.wordIds(1),storage=store(),p=new Prep.Preparation(storage),id=ids[12],options=[ids[15],id,ids[8],ids[2]];
 p.state.current={id,phase:'choice',optionIds:options,done:false};p.progress(id).tr=true;p.save();
 const restored=new Prep.Preparation(storage),portion=restored.portion(ids,new Set(),1);
 assert.deepEqual(new Set(portion.ids),new Set(options));assert.equal(restored.next(portion.ids,new Set()).id,id);assert.deepEqual(restored.choices(portion.ids).map(w=>w.id),options);assert.equal(restored.progress(id).tr,true);
 const draft={id:ids[20],phase:'typing',direction:'de',draft:'Schok',caret:2,attempts:1,assisted:true,reveal:false,done:false};delete restored.state.portion;restored.state.current=draft;ids.forEach(id=>restored.progress(id).choice=true);restored.save();
 const writing=new Prep.Preparation(storage),batch=writing.portion(ids,new Set(),1);assert.ok(batch.ids.includes(draft.id));assert.deepEqual(writing.next(batch.ids,new Set()),draft);
});

test('word trainer pauses after four fully learned words, survives leaving and reload, and advances only by choice',()=>{
 let a=app();a.run('openLearnMode("typing")');const first=a.json('WordTrainer.model.state.portion.ids');
 for(let i=0;i<12;i++){a.run(`{const cur=WordTrainer.model.state.current,w=AndreWords.byId[cur.id];if(cur.phase==='choice'){WordTrainer.model.choose(cur.id);WordTrainer.next();}else{cur.draft=cur.direction==='tr'?w.tr:w.deAnswers[0];WordTrainer.check();}}`);a.advance(2000);}
 assert.equal(a.run('WordTrainer.model.state.current'),null);assert.match(a.el('wordStudy').textContent,/Portion geschafft/);assert.equal(a.run('SentenceGame.engine.missingWords().length'),20);assert.equal(a.run('SentenceGame.engine.wordsReady()'),false);assert.equal(a.el('customKeyboard').style.display,'none');
 a.advance(60000);assert.equal(a.run('WordTrainer.model.state.current'),null);a.el('wordStudy').querySelectorAll('button').find(b=>b.textContent==='Für heute fertig').click();assert.equal(a.run('WordTrainer.active'),false);
 a=app({storage:a.storage});a.run('openLearnMode("typing")');assert.equal(a.run('WordTrainer.model.state.current'),null);assert.deepEqual(a.json('WordTrainer.model.state.portion.ids'),first);
 a.el('wordStudy').querySelectorAll('button').find(b=>b.textContent==='Nächste Portion').click();assert.equal(a.run('WordTrainer.model.state.portion.index'),2);assert.ok(a.json('WordTrainer.model.state.portion.ids').every(id=>!first.includes(id)));a.run('WordTrainer.continuePortion()');assert.equal(a.run('WordTrainer.model.state.portion.index'),2);
});

test('sentence stages persist evidence and partial answers; six tasks never award a level on their own',()=>{
 const storage=store();let e=ready(storage);e.round().intro=2;const pool=e.available();e.refreshPool=()=>{};
 for(let i=0;i<5;i++)assert.ok(solve(e,e.next()).correct);const cur=e.next();cur.draft='angefangen';e.save();const old=JSON.parse(JSON.stringify(cur));
 e=new L.Engine({storage});assert.deepEqual(JSON.parse(JSON.stringify(e.next())),old);assert.equal(e.stageSummary().done,5);assert.ok(solve(e,e.state.current).correct);assert.equal(e.flow.level,1);assert.equal(e.flow.frontier,1);
 const evidence=JSON.parse(JSON.stringify(e.round().counts));assert.equal(e.stageSummary().complete,true);assert.equal(e.next(),null);assert.equal(e.check({unknown:true}).ignored,true);
 e=new L.Engine({storage});assert.equal(e.next(),null);assert.deepEqual(e.round().counts,evidence);assert.ok(e.continueStage());assert.equal(e.continueStage(),false);assert.equal(e.stageSummary().number,2);assert.equal(e.stageSummary().done,0);assert.equal(e.roundSummary().done,6);
 e.pool=pool;e.refreshPool=()=>{};let report,breaks=0;
 for(let i=0;i<100;i++){if(e.stageSummary().complete){assert.ok(e.continueStage());breaks++;}const result=solve(e,e.next());if(result.transition){report=result.transition;break;}}
 assert.ok(report?.pass);assert.ok(breaks>=6);assert.equal(e.flow.level,2);assert.ok(report.total>=46);assert.equal(e.stageSummary().number,1);
});

test('old rounds keep their item count and grammar evidence, including an unfinished task at an old boundary',()=>{
 const storage=store(),e=ready(storage);e.round().intro=2;for(let i=0;i<6;i++)solve(e,e.next());e.continueStage();const cur=e.next();cur.draft='Mein Entwurf';const r=e.round();delete r.stage;e.save();
 const restored=new L.Engine({storage});assert.equal(restored.next().draft,'Mein Entwurf');assert.equal(restored.stageSummary().number,2);assert.equal(restored.roundSummary().done,6);assert.deepEqual(restored.round().counts,r.counts);
});

test('a selected open topic flows into other pending topics; deliberately reopened completed topics stay free',()=>{
 const storage=store(),e=ready(storage);e.round().intro=2;const theme=require('../lib/interest-generator').themes[0].id;e.selectTheme(theme);
 for(let i=0;i<2;i++){const cur=e.next();assert.equal(cur.roundTheme,theme);solve(e,cur);}const next=e.next();assert.notEqual(next.roundTheme,theme);assert.equal(next.practice,false);
 e.selectTheme(theme);const practice=e.next();assert.equal(practice.practice,true);solve(e,practice);assert.equal(e.stageSummary().done,2);
});

test('sentence checkpoint hides keyboard, does not time out, and resumes after a pause',()=>{
 const a=app();a.run(`saveUnlockProgress(Object.fromEntries(AndreLearningPath.wordIds(1).map(id=>[id,{toTurkish:true,toGerman:true}])));SentenceGame.engine.round().intro=2;openSentenceTest(null);`);
 for(let i=0;i<6;i++){a.run(`{const cur=SentenceGame.current;cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,i)=>({...AndreCourse.copy(s),id:g.id+i,group:g.id})));cur.draft=cur.task.de;SentenceGame.check();}`);a.el('sentenceNextButton').click();}
 assert.equal(a.el('sentenceStageBreak').hidden,false);assert.equal(a.el('sentenceGameActive').style.display,'none');assert.equal(a.el('sentenceReadingKeyboard').hidden,true);a.advance(60000);assert.equal(a.run('SentenceGame.engine.roundSummary().done'),6);
 a.el('sentenceStageBreak').querySelectorAll('button').find(b=>b.textContent==='Für heute fertig').click();a.run('openSentenceTest(null)');assert.equal(a.el('sentenceStageBreak').hidden,false);
 a.el('sentenceStageBreak').querySelectorAll('button').find(b=>b.textContent==='Nächste Etappe').click();assert.equal(a.el('sentenceStageBreak').hidden,true);assert.equal(a.run('SentenceGame.engine.stageSummary().number'),2);assert.equal(a.run('SentenceGame.current.finished'),false);
});
