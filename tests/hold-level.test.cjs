const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const L=require('../lib/course-learning'),Legacy=require('../lib/learning');
const key=(keyboard,action)=>keyboard.querySelectorAll('.key').find(k=>k.dataset.action===action);
const pointer=(button,type,extra={})=>button.dispatchEvent({type,pointerId:1,clientX:0,clientY:0,button:0,...extra});
function fixture(language='de'){
 const a=app(),keyboard=a.el('heldKeyboard'),typed=[],options={keyboard,onType:x=>typed.push(x),onCheck(){},onSkip(){}};
 a.run('renderAppKeyboard')(language,options);return {a,keyboard,typed,options,remove:key(keyboard,'delete')};
}

test('Delete taps once and holding repeats quickly in both layouts without an extra release click',()=>{
 for(const language of ['de','tr']){
  const {a,typed,remove}=fixture(language);pointer(remove,'pointerdown');assert.deepEqual(typed,['BACKSPACE']);
  a.advance(349);assert.equal(typed.length,1);a.advance(1);assert.equal(typed.length,2);
  a.advance(350);assert.equal(typed.length,7);
  pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});a.advance(1000);
  assert.equal(typed.length,7);assert.equal(a.timers.size,0);
  pointer(remove,'pointerdown');pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});assert.equal(typed.length,8);
  remove.click();assert.equal(typed.length,9,'keyboard and assistive clicks still delete once');
 }
});

test('all gesture and lifecycle cancellations stop Delete and suppress its later pointer click',()=>{
 for(const end of ['pointercancel','lostpointercapture','move','blur','pagehide','hidden','disable','reset','context','replace','inert']){
  const {a,keyboard,typed,options,remove}=fixture();pointer(remove,'pointerdown');a.advance(350);
  if(end==='move')pointer(remove,'pointermove',{clientX:15});
  else if(end==='blur'||end==='pagehide')a.run('window.dispatchEvent')({type:end});
  else if(end==='hidden'){a.document.hidden=true;a.document.dispatchEvent({type:'visibilitychange'});}
  else if(end==='disable')a.run('renderAppKeyboard')('de',{...options,disabled:true});
  else if(end==='reset')a.run('renderAppKeyboard')('de',{...options,reset:true});
  else if(end==='context')a.run('renderAppKeyboard')('de',{...options,contextKey:'next'});
  else if(end==='replace')a.run('renderAppKeyboard')('tr',options);
  else if(end==='inert')keyboard.inert=true;
  else pointer(remove,end);
  a.advance(1000);pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});
  assert.equal(typed.length,2,end);assert.equal(a.timers.size,0,end);
 }
});

test('Delete ignores secondary presses and unrelated pointer releases while the owning pointer is held',()=>{
 const {a,keyboard,typed,remove}=fixture();
 pointer(remove,'pointerdown',{button:2});pointer(remove,'pointerdown',{isPrimary:false});assert.equal(typed.length,0);
 pointer(remove,'pointerdown');pointer(remove,'pointerup',{pointerId:2});
 const s=keyboard.querySelectorAll('.key').find(k=>k.dataset.letter==='s');
 pointer(s,'pointerup');pointer(s,'lostpointercapture');a.advance(350);assert.equal(typed.length,2);
 pointer(remove,'pointerup');a.advance(500);assert.equal(typed.length,2);assert.equal(a.timers.size,0);
});

test('synchronously closing during deletion never rearms a timer or emits into another input',()=>{
 const {a,keyboard,typed,options,remove}=fixture();let remaining=2;
 a.run('renderAppKeyboard')('de',{...options,onType:x=>{typed.push(x);if(--remaining===0)a.run('AndreKeyboard.cancel')(keyboard);}});
 pointer(remove,'pointerdown');a.advance(350);assert.equal(typed.length,2);assert.equal(a.timers.size,0);
 a.run('renderAppKeyboard')('de',{...options,reset:true});a.advance(1000);pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});
 assert.equal(typed.length,2);
});

test('word trainer erases Unicode text, stops at empty, and restart/navigation cancel held Delete without learning changes',()=>{
 const a=app();a.run('openLearnMode("typing");typedAnswer="abc😀";typeCustomKey("ş")');const saved=[...a.storage];
 let remove=key(a.el('customKeyboard'),'delete');pointer(remove,'pointerdown');assert.equal(a.run('typedAnswer'),'abc😀');
 a.advance(350);assert.equal(a.run('typedAnswer'),'abc');a.advance(400);assert.equal(a.run('typedAnswer'),'');
 pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});assert.deepEqual([...a.storage],saved);
 a.run('typeCustomKey("ev")');pointer(remove,'pointerdown');a.run('startTypingGame();typeCustomKey("neu")');
 a.advance(1000);pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});assert.equal(a.run('typedAnswer'),'neu');
 remove=key(a.el('customKeyboard'),'delete');pointer(remove,'pointerdown');a.run('showView("grammar",null)');
 const draft=a.run('typedAnswer');a.advance(1000);assert.equal(a.run('typedAnswer'),draft);assert.equal(a.timers.size,0);
});

test('grammar saves the shortened draft without granting progress and cancels held Delete before a new exercise',()=>{
 const a=app();a.unlock(undefined,{grammar:false});a.run('openGrammarTraining();SentenceGame.engine.grammar.state.current.draft="ev güzel"');
 const keyboard=a.el('grammarKeyboard'),remove=key(keyboard,'delete'),counts=a.json('SentenceGame.engine.grammar.state.counts');
 pointer(remove,'pointerdown');a.advance(350);assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),'ev güz');
 assert.deepEqual(a.json('SentenceGame.engine.grammar.state.counts'),counts);
 const resumed=app({storage:new Map(a.storage)});resumed.run('openGrammarTraining()');
 assert.equal(resumed.run('SentenceGame.engine.grammar.state.current.draft'),'ev güz');
 key(keyboard,'skip').click();const next=a.run('SentenceGame.engine.grammar.state.current.entryId');
 a.advance(1000);pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});
 assert.equal(a.run('SentenceGame.engine.grammar.state.current.entryId'),next);assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft||""'),'');
 assert.equal(a.timers.size,0);
 a.run('GrammarTrainer.close()');const restored=app({storage:a.storage});restored.run('openGrammarTraining()');
 assert.equal(restored.run('SentenceGame.engine.grammar.state.current.draft||""'),'');
});

test('search held Delete edits a selection and Unicode, filters immediately, and closes without affecting progress',()=>{
 const a=app();a.el('search').click();const search=a.el('search');search.value='abc😀de';search.setSelectionRange(5,7);
 const saved=[...a.storage],remove=key(a.el('searchKeyboard'),'delete');pointer(remove,'pointerdown');assert.equal(search.value,'abc😀');
 a.advance(350);assert.equal(search.value,'abc');assert.equal(search.selectionStart,3);a.advance(140);assert.equal(search.value,'a');
 key(a.el('searchKeyboard'),'check').click();a.advance(1000);pointer(remove,'pointerup');remove.dispatchEvent({type:'click',detail:1});
 assert.equal(search.value,'a');assert.equal(a.timers.size,0);assert.deepEqual([...a.storage],saved);
 a.el('search').click();pointer(key(a.el('searchKeyboard'),'delete'),'pointerdown');a.run('showView("grammar",null)');
 a.advance(1000);assert.equal(search.value,'');assert.equal(a.timers.size,0);
});

test('the profile loads the actual current level, validates old saves and preserves the learned count',()=>{
 for(const [saved,expected] of [[null,1],[{version:3,level:24,highestLevel:160},24],[{version:3,level:160},160],[{version:3,level:999},160],[{version:3,level:0},1]]){
  const storage=new Map(saved?[[L.KEY,JSON.stringify(saved)]]:[]),a=app({storage});
  assert.equal(a.el('profileLevelValue').textContent,String(expected));assert.equal(a.el('profileLevelChip').getAttribute('aria-label'),'Level '+expected);
  const learned=a.el('learnedWordsValue').textContent;a.run('showView("grammar",null);showView("games",null);showView("dictionary",null)');
  assert.equal(a.el('profileLevelValue').textContent,String(expected));assert.equal(a.el('learnedWordsValue').textContent,learned);
 }
 const storage=new Map([[Legacy.KEY,JSON.stringify({version:2,level:79,highestLevel:81})]]),a=app({storage});
 assert.equal(a.el('profileLevelValue').textContent,'79');assert.equal(JSON.parse(storage.get(L.KEY)).level,79);
});

function begin(a,level=24,kind='current'){
 a.unlock();a.run('SentenceGame.engine.state.level='+level+';SentenceGame.engine.state.highestLevel=Math.max('+level+',SentenceGame.engine.state.highestLevel);SentenceGame.engine.state.opened=Math.ceil('+level+'/5);openLearnMode("sentences");SentenceGame.engine.begin(AndreCourse.tasks[0],'+JSON.stringify(kind)+');SentenceGame.render()');
}
function solve(a){
 a.run('SentenceGame.current.tokens=SentenceGame.task.groups.flatMap(g=>g.slots.map((s,i)=>({...AndreCourse.copy(s),id:"s"+i,group:g.id})));checkSentence()');
}
test('profile follows real first-attempt level changes, while corrections and older repetitions stay neutral',()=>{
 const a=app();begin(a);assert.equal(a.el('profileLevelValue').textContent,'24');solve(a);
 assert.equal(a.el('profileLevelValue').textContent,'25');assert.equal(a.el('sentenceLevelText').textContent,'25');
 assert.equal(JSON.parse(a.storage.get(L.KEY)).level,25);assert.equal(app({storage:a.storage}).el('profileLevelValue').textContent,'25');
 begin(a,24);a.run('SentenceGame.check(true)');assert.equal(a.el('profileLevelValue').textContent,'23');solve(a);
 assert.equal(a.el('profileLevelValue').textContent,'23');a.run('showView("dictionary",null)');assert.equal(a.el('profileLevelValue').textContent,'23');
 begin(a,24,'older');solve(a);assert.equal(a.el('profileLevelValue').textContent,'24');
 begin(a,24);a.run('SentenceGame.engine.hint()');solve(a);assert.equal(a.el('profileLevelValue').textContent,'24');
});

test('profile respects levels 1 and 160, displays 100, and updates even with no sentence available',()=>{
 const a=app();begin(a,1);a.run('SentenceGame.check(true)');assert.equal(a.el('profileLevelValue').textContent,'1');
 begin(a,160);solve(a);assert.equal(a.el('profileLevelValue').textContent,'160');
 begin(a,100);a.run('showView("dictionary",null)');assert.equal(a.el('profileLevelValue').textContent,'100');
 const fresh=app();fresh.run('SentenceGame.engine.state.level=88;SentenceGame.render()');assert.equal(fresh.el('profileLevelValue').textContent,'88');
});
