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

test('both reference layouts have a number row, their exact letter rows and the three bottom actions',()=>{
 for(const [language,rows,name] of [['de',['qwertzuiopü','asdfghjklöä','yxcvbnm'],'Deutsch'],['tr',['qwertyuıopğü','asdfghjklşi','zxcvbnmöç'],'Türkisch']]){
  const {keyboard,typed}=fixture(language);assert.equal(keyboard.children.length,5);
  assert.equal(keyboard.children[0].children.map(k=>k.textContent).join(''),'1234567890');
  rows.forEach((letters,index)=>assert.equal(keyboard.children[index+1].children.filter(k=>k.dataset.action==='letter').map(k=>k.textContent).join(''),letters));
  const bottom=keyboard.children[3].children.filter(k=>k.tagName==='BUTTON');
  assert.equal(bottom[0].dataset.action,'shift');assert.equal(bottom.at(-1).dataset.action,'delete');
  assert.equal(bottom.at(-2).textContent,language==='de'?'m':'ç');
  assert.deepEqual(keyboard.children[4].children.map(k=>k.dataset.action),['skip','space','check']);
  assert.equal(action(keyboard,'skip').textContent,'Keine Ahnung');assert.equal(action(keyboard,'space').textContent,name);
  assert.match(action(keyboard,'space').getAttribute('aria-label'),/^Leertaste/);
  for(const kind of ['shift','delete','check']){
   const svg=action(keyboard,kind).children[0];assert.equal(svg.tagName,'SVG');assert.equal(svg.getAttribute('aria-hidden'),'true');
   assert.ok(action(keyboard,kind).getAttribute('aria-label'));
  }
  keyboard.children[0].children.forEach(k=>k.click());action(keyboard,'space').click();action(keyboard,'delete').click();
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

test('the reference keyboard completes both word directions and numbers use the same editable draft',()=>{
 const a=app();a.run('openLearnMode("typing");typingRemaining=[typingRemaining.find(w=>w.tr==="ev")];typingCurrentIndex=0;typingDirection="toTurkish";renderTypingWord()');const keyboard=a.el('customKeyboard');
 assert.equal(a.run('typingRemaining[typingCurrentIndex].tr'),'ev');
 assert.equal(keyboard.style.display,'grid','trainer activation must preserve the five-row grid proportions');
 action(keyboard,'number').click();assert.equal(a.run('typedAnswer'),'1');action(keyboard,'delete').click();
 action(keyboard,'shift').click();letter(keyboard,'e').click();letter(keyboard,'v').click();assert.equal(a.run('typedAnswer'),'Ev');
 action(keyboard,'check').click();a.advance(750);assert.equal(keyboard.getAttribute('lang'),'de');
 action(keyboard,'shift').click();for(const char of 'haus')letter(keyboard,char).click();
 assert.equal(a.run('typedAnswer'),'Haus');action(keyboard,'check').click();a.advance(750);
 assert.equal(a.run('isWordUnlocked("ev")'),true);
});

test('grammar uses the reference actions, accepts numbers without granting progress, and checks a real sentence',()=>{
 const a=app();a.unlock(undefined,{grammar:false});a.run('openGrammarTraining()');const keyboard=a.el('grammarKeyboard');
 assert.equal(action(keyboard,'skip').textContent,'Keine Ahnung');const counts=a.json('SentenceGame.engine.grammar.state.counts');
 action(keyboard,'number').click();assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),'1');
 assert.deepEqual(a.json('SentenceGame.engine.grammar.state.counts'),counts);action(keyboard,'delete').click();
 const answer=a.run('SentenceGame.engine.grammar.state.current.answer');
 action(keyboard,'shift').click();for(const char of answer){if(char===' ')action(keyboard,'space').click();else letter(keyboard,char).click();}
 action(keyboard,'check').click();assert.equal(a.el('grammarFeedback').textContent,'Richtig.');
 assert.ok(keys(keyboard).every(k=>k.disabled));a.advance(750);assert.ok(keys(keyboard).some(k=>!k.disabled));
});

test('trainer navigation and search close cancel pending variants; physical digits also reach both trainers',()=>{
 const a=app();a.el('search').click();let keyboard=a.el('searchKeyboard'),s=letter(keyboard,'s');
 pointer(s,'pointerdown');a.advance(400);action(keyboard,'check').click();pointer(s,'pointerup');assert.equal(a.el('search').value||'','');assert.equal(a.timers.size,0);
 a.run('openLearnMode("typing")');keyboard=a.el('customKeyboard');
 const input={type:'keydown',key:'7',target:a.el('typingAnswer'),preventDefault(){this.prevented=true;}};a.document.dispatchEvent(input);
 assert.equal(input.prevented,true);assert.equal(a.run('typedAnswer'),'7');
 a.run('showView("grammar",null)');a.unlock(undefined,{grammar:false});a.run('openGrammarTraining()');
 input.target=a.el('grammarAnswer');input.prevented=false;a.document.dispatchEvent(input);
 assert.equal(input.prevented,true);assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),'7');
});
