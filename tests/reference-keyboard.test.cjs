const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const keys=keyboard=>keyboard.children.flatMap(row=>row.children).filter(e=>e.tagName==='BUTTON');
const action=(keyboard,name)=>keys(keyboard).find(e=>e.dataset.action===name);
const letter=(keyboard,char)=>keys(keyboard).find(e=>e.dataset.letter===char);
const pointer=(button,type,extra={})=>button.dispatchEvent({type,pointerId:1,clientX:0,clientY:0,button:0,...extra});
function fixture(language='de'){
 const a=app(),keyboard=a.el('referenceKeyboard'),typed=[];
 const options={keyboard,onType:char=>typed.push(char),onCheck(){},onSkip(){}};
 a.run('renderAppKeyboard')(language,options);return {a,keyboard,typed,options};
}

test('both layouts retain exact letters and numbers, with floating actions above and only Space below',()=>{
 for(const [language,rows,name] of [['de',['qwertzuiopü','asdfghjklöä','yxcvbnm'],'Deutsch'],['tr',['qwertyuıopğü','asdfghjklşi','zxcvbnmöç'],'Türkisch']]){
  const {keyboard,typed}=fixture(language);assert.equal(keyboard.children.length,6);
  assert.deepEqual(keyboard.children[0].children.map(k=>k.dataset.action),['skip','check']);
  assert.equal(keyboard.children[1].children.map(k=>k.textContent).join(''),'1234567890');
  rows.forEach((letters,index)=>assert.equal(keyboard.children[index+2].children.filter(k=>k.dataset.action==='letter').map(k=>k.textContent).join(''),letters));
  const bottom=keyboard.children[4].children.filter(k=>k.tagName==='BUTTON');
  assert.equal(bottom[0].dataset.action,'shift');assert.equal(bottom.at(-1).dataset.action,'delete');
  assert.equal(bottom.at(-2).textContent,language==='de'?'m':'ç');
  assert.deepEqual(keyboard.children[5].children.map(k=>k.dataset.action),['symbols','space']);
  assert.equal(action(keyboard,'skip').textContent,'Keine Ahnung');assert.equal(action(keyboard,'space').textContent,name);
  assert.match(action(keyboard,'space').getAttribute('aria-label'),/^Leertaste/);
  for(const kind of ['shift','delete','check']){
   const svg=action(keyboard,kind).children[0];assert.equal(svg.tagName,'SVG');assert.equal(svg.getAttribute('aria-hidden'),'true');
   assert.ok(action(keyboard,kind).getAttribute('aria-label'));
  }
  keyboard.children[1].children.forEach(k=>k.click());action(keyboard,'space').click();action(keyboard,'delete').click();
  assert.deepEqual(typed,[...'1234567890',' ','BACKSPACE']);
 }
});

test('Shift uses Turkish dotted/dotless casing and German umlauts, then returns to lowercase',()=>{
 for(const [language,cases] of [['tr',[['ı','I'],['i','İ'],['ş','Ş'],['ğ','Ğ']]],['de',[['ä','Ä'],['ö','Ö'],['ü','Ü']]]]){
  const {keyboard,typed}=fixture(language),shift=action(keyboard,'shift');
  for(const [base,capital] of cases){
   shift.click();assert.equal(shift.getAttribute('aria-pressed'),'true');assert.equal(letter(keyboard,base).textContent,capital);
   letter(keyboard,base).click();assert.equal(typed.at(-1),capital);assert.equal(shift.getAttribute('aria-pressed'),'false');
   letter(keyboard,base).click();assert.equal(typed.at(-1),base);
  }
  shift.click();shift.click();letter(keyboard,'a').click();assert.equal(typed.at(-1),'a');
 }
});

test('a stable keyboard keeps focus and Shift while updating actions, and reset/disable stop pending input',()=>{
 const {a,keyboard,typed,options}=fixture('de'),s=letter(keyboard,'s'),shift=action(keyboard,'shift'),calls=[];
 s.focus();shift.click();a.run('renderAppKeyboard')('de',{...options,onType:x=>calls.push(x)});
 assert.equal(letter(keyboard,'s'),s);assert.equal(a.document.activeElement,s);assert.equal(s.textContent,'S');s.click();
 assert.deepEqual(calls,['S']);assert.deepEqual(typed,[]);
 pointer(s,'pointerdown');assert.equal(a.timers.size,1);
 a.run('renderAppKeyboard')('de',{...options,disabled:true});assert.equal(a.timers.size,0);
 a.advance(500);pointer(s,'pointerup');s.click();shift.click();assert.deepEqual(typed,[]);
 a.run('renderAppKeyboard')('de',options);shift.click();a.run('renderAppKeyboard')('de',{...options,reset:true});
 assert.equal(s.textContent,'s');assert.equal(shift.getAttribute('aria-pressed'),'false');
});

test('holding s commits ß once on release, offers ẞ with Shift, and a later normal tap still works',()=>{
 const {a,keyboard,typed}=fixture(),s=letter(keyboard,'s');
 pointer(s,'pointerdown');a.advance(399);assert.equal(s.textContent,'s');pointer(s,'pointerup');s.click();assert.deepEqual(typed,['s']);
 pointer(s,'pointerdown');a.advance(400);assert.equal(s.textContent,'ß');assert.deepEqual(typed,['s']);
 pointer(s,'pointerup');s.dispatchEvent({type:'click',detail:1});assert.deepEqual(typed,['s','ß']);
 assert.equal(s.textContent,'s');assert.equal(a.timers.size,0);
 action(keyboard,'shift').click();pointer(s,'pointerdown');a.advance(400);assert.equal(s.textContent,'ẞ');
 pointer(s,'pointerup');s.dispatchEvent({type:'click',detail:1});assert.deepEqual(typed,['s','ß','ẞ']);
 pointer(s,'pointerdown');pointer(s,'pointerup');s.dispatchEvent({type:'click',detail:1});assert.equal(typed.at(-1),'s');
});

test('cancelled, moved, hidden or replaced holds never emit a character or leave a timer',()=>{
 for(const end of ['pointercancel','lostpointercapture','move','pagehide','replace','close']){
  const {a,keyboard,typed,options}=fixture(),s=letter(keyboard,'s');pointer(s,'pointerdown');a.advance(400);
  if(end==='move')pointer(s,'pointermove',{clientX:15});
  else if(end==='pagehide')a.run('AndreKeyboard.cancelAll()');
  else if(end==='replace')a.run('renderAppKeyboard')('tr',options);
  else if(end==='close')a.run('AndreKeyboard.cancel')(keyboard);
  else pointer(s,end);
  pointer(s,'pointerup');s.dispatchEvent({type:'click',detail:1});assert.deepEqual(typed,[],end);assert.equal(a.timers.size,0,end);
 }
 const {a,keyboard,typed}=fixture(),s=letter(keyboard,'s');pointer(s,'pointerdown');
 a.document.hidden=true;a.document.dispatchEvent({type:'visibilitychange'});a.advance(600);pointer(s,'pointerup');s.dispatchEvent({type:'click',detail:1});assert.deepEqual(typed,[]);
});

test('the reference keyboard edits the current word and teaches its Turkish direction',()=>{const a=require('./helpers/word-study.cjs').study(),keyboard=a.el('customKeyboard');action(keyboard,'number').click();assert.equal(a.run('WordTrainer.model.state.current.draft'),'1');action(keyboard,'delete').click();action(keyboard,'shift').click();letter(keyboard,'e').click();letter(keyboard,'v').click();assert.equal(a.run('WordTrainer.model.state.current.draft'),'Ev');action(keyboard,'check').click();assert.equal(a.run('WordTrainer.model.progress(AndreWords.byLemma.ev.id).tr'),true);assert.equal(a.run('isWordUnlocked("ev")'),false);});

test('sentence reverse translation uses the shared German keyboard without German building cards',()=>{const a=app();require('./helpers/progress.cjs').learnTo(a,1);a.run('startSentenceGame();SentenceGame.current.direction="de";SentenceGame.render()');assert.equal(a.el('sentenceGameActive').classList.contains('reading-writing'),true);const keyboard=a.el('sentenceReadingKeyboard');action(keyboard,'number').click();assert.equal(a.run('SentenceGame.current.draft'),'1');action(keyboard,'delete').click();const answer=a.run('SentenceGame.task.de');a.run('SentenceGame.typeReading('+JSON.stringify(answer)+');SentenceGame.check()');assert.match(a.el('sentenceFeedback').textContent,/Richtig/);assert.equal(a.el('sentenceGameActive').classList.contains('reading-writing'),false);assert.equal(a.run('SentenceGame.engine.flow.level'),1);});

test('search and the new trainer retain hardware digits and safe navigation',()=>{const a=require('./helpers/word-study.cjs').study();const input={type:'keydown',key:'7',target:a.el('wordStudyAnswer'),preventDefault(){this.prevented=true;}};a.document.dispatchEvent(input);assert.equal(input.prevented,true);assert.equal(a.run('WordTrainer.model.state.current.draft'),'7');a.run('showView("grammar",null)');input.prevented=false;a.document.dispatchEvent(input);assert.equal(input.prevented,false);});

test('switching from unfinished German work to another topic hides the fixed keyboard and preserves the draft',()=>{const a=app();require('./helpers/progress.cjs').learnTo(a,1);const themes=a.json('AndreInterestGenerator.themes.map(t=>t.id)');a.run('openSentenceTest('+JSON.stringify(themes[0])+');SentenceGame.current.direction="de";SentenceGame.render();SentenceGame.typeReading("Entwurf")');assert.equal(a.el('sentenceReadingKeyboard').hidden,false);assert.equal(a.el('sentenceReadingKeyboard').parentElement,a.el('sentenceBuilder'));a.run('openSentenceTest('+JSON.stringify(themes[1])+')');assert.equal(a.run('SentenceGame.current.direction'),'tr');assert.equal(a.el('sentenceReadingKeyboard').hidden,true);a.run('openSentenceTest('+JSON.stringify(themes[0])+')');assert.equal(a.run('SentenceGame.current.draft'),'Entwurf');assert.equal(a.el('sentenceReadingKeyboard').hidden,false);a.run('leaveSentenceArea()');assert.equal(a.el('sentenceReadingKeyboard').hidden,true);});
