const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const key=(keyboard,action)=>keyboard.querySelectorAll('.key').find(k=>k.dataset.action===action);
const letter=(keyboard,char)=>keyboard.querySelectorAll('.key').find(k=>k.dataset.letter===char);
const variants=keyboard=>keyboard.querySelectorAll('.keyboard-variant');
const pointer=(button,type,extra={})=>button.dispatchEvent({type,pointerId:1,clientX:0,clientY:0,button:0,...extra});
const hardware=(button,name)=>{const event={type:'keydown',key:name,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};button.dispatchEvent(event);return event;};
function fixture(language='de',a=app()){
 const keyboard=a.el('variantKeyboard'),typed=[],options={keyboard,onType:x=>typed.push(x),onCheck(){},onSkip(){}};
 keyboard.inert=false;keyboard.hidden=false;a.document.hidden=false;
 a.run('renderAppKeyboard')(language,{...options,reset:true});return {a,keyboard,typed,options};
}
function open(a,keyboard,base){const button=letter(keyboard,base);pointer(button,'pointerdown');a.advance(400);return button;}
function select(a,keyboard,base,char){
 const button=open(a,keyboard,base);pointer(button,'pointerup');button.dispatchEvent({type:'click',detail:1});
 const choice=variants(keyboard).find(k=>k.textContent===char);assert.ok(choice,base+' → '+char);choice.click();return choice;
}

test('both layouts offer accents and Turkish letters after a hold, and a tap selects exactly one character',()=>{
 for(const language of ['de','tr']){
  const {a,keyboard,typed}=fixture(language);
  for(const [base,char] of [['e','é'],['a','á'],['c','ç'],['g','ğ'],['i','ı'],['s','ş'],['s','ß'],['o','ö'],['u','ü'],['n','ñ']]){
   const before=typed.length,button=open(a,keyboard,base);
   assert.equal(button.getAttribute('aria-expanded'),'true');assert.ok(button.getAttribute('aria-controls'));
   assert.equal(typed.length,before);pointer(button,'pointerup');button.dispatchEvent({type:'click',detail:1});
   pointer(button,'lostpointercapture');assert.equal(typed.length,before,'release does not type the base letter');
   const choice=variants(keyboard).find(k=>k.textContent===char);assert.ok(choice,char);choice.click();
   assert.equal(typed.length,before+1);assert.equal(typed.at(-1),char);assert.equal(variants(keyboard).length,0);
   assert.equal(button.getAttribute('aria-expanded'),'false');assert.equal(a.timers.size,0);
   choice.click();assert.equal(typed.length,before+1,'detached choices cannot type again');
  }
 }
});

test('Shift offers accented capitals and distinct Turkish İ/I in both layouts, then resets',()=>{
 for(const language of ['de','tr']){
  const {a,keyboard,typed}=fixture(language),shift=key(keyboard,'shift');
  for(const [base,char] of [['e','É'],['a','Á'],['c','Ç'],['g','Ğ'],['s','Ş'],['s','ẞ']]){
   shift.click();select(a,keyboard,base,char);assert.equal(typed.at(-1),char);assert.equal(shift.getAttribute('aria-pressed'),'false');
  }
  shift.click();select(a,keyboard,language==='de'?'i':'ı','İ');assert.equal(typed.at(-1),'İ');
  if(language==='tr'){shift.click();select(a,keyboard,'i','I');assert.equal(typed.at(-1),'I');}
  letter(keyboard,'e').click();assert.equal(typed.at(-1),'e');
 }
});

test('sliding to a highlighted variant and releasing commits once while releasing outside cancels',()=>{
 const {a,keyboard,typed}=fixture(),e=open(a,keyboard,'e'),choice=variants(keyboard).find(k=>k.textContent==='é');
 a.document.pointerTarget=choice;pointer(e,'pointermove',{clientX:50,clientY:-20});
 assert.equal(choice.classList.contains('is-selected'),true);assert.deepEqual(typed,[]);
 pointer(e,'pointerup',{clientX:50,clientY:-20});e.dispatchEvent({type:'click',detail:1});
 assert.deepEqual(typed,['é']);assert.equal(variants(keyboard).length,0);
 a.document.pointerTarget=null;open(a,keyboard,'a');pointer(letter(keyboard,'a'),'pointermove',{clientX:200,clientY:200});
 pointer(letter(keyboard,'a'),'pointerup',{clientX:200,clientY:200});letter(keyboard,'a').dispatchEvent({type:'click',detail:1});
 assert.deepEqual(typed,['é']);assert.equal(variants(keyboard).length,0);
});

test('pending holds and open pickers cancel safely across gestures, navigation, and keyboard lifecycle',()=>{
 for(const ready of [false,true]){
  const shared=app();
  for(const end of ['pointercancel','lostpointercapture','move','blur','pagehide','hidden','disable','lock','reset','context','language','symbols','close','navigation','outside','focus','resize','inert']){
  const {a,keyboard,typed,options}=fixture('de',shared),e=letter(keyboard,'e');pointer(e,'pointerdown');if(ready)a.advance(400);
  const stale=variants(keyboard)[0];
  if(end==='move'){pointer(e,'pointermove',{clientX:200});pointer(e,'pointerup',{clientX:200});}
  else if(['blur','pagehide','resize'].includes(end))a.run('window.dispatchEvent')({type:end});
  else if(end==='hidden'){a.document.hidden=true;a.document.dispatchEvent({type:'visibilitychange'});}
  else if(end==='disable'||end==='lock')a.run('renderAppKeyboard')('de',{...options,disabled:end==='disable',inputLocked:end==='lock'});
  else if(end==='reset'||end==='context')a.run('renderAppKeyboard')('de',{...options,reset:end==='reset',contextKey:end==='context'?'next':undefined});
  else if(end==='language')a.run('renderAppKeyboard')('tr',options);
  else if(end==='symbols')key(keyboard,'symbols').click();
  else if(end==='close')a.run('AndreKeyboard.cancel')(keyboard);
  else if(end==='navigation')a.run('showView("grammar",null)');
  else if(end==='outside'||end==='focus'){
   if(!ready){pointer(e,'pointermove',{clientX:200});}
   a.document.dispatchEvent({type:end==='outside'?'pointerdown':'focusin',target:a.document.body});
  }
  else if(end==='inert')keyboard.inert=true;
  else pointer(e,end);
  a.advance(1000);pointer(e,'pointerup');e.dispatchEvent({type:'click',detail:1});stale?.click();
  assert.deepEqual(typed,[],end+' ready='+ready);assert.equal(a.timers.size,0,end);assert.equal(variants(keyboard).length,0,end);
  }
 }
});

test('a short tap stays unchanged and secondary pointers cannot open or finish another hold',()=>{
 const {a,keyboard,typed}=fixture(),e=letter(keyboard,'e');
 pointer(e,'pointerdown',{button:2});pointer(e,'pointerdown',{isPrimary:false});assert.equal(a.timers.size,0);
 pointer(e,'pointerdown');a.advance(399);pointer(e,'pointerup');e.dispatchEvent({type:'click',detail:1});a.advance(1);
 assert.deepEqual(typed,['e']);assert.equal(variants(keyboard).length,0);
 open(a,keyboard,'e');pointer(e,'pointerup',{pointerId:2});pointer(letter(keyboard,'s'),'pointerup');
 assert.equal(variants(keyboard).length,4);pointer(e,'pointercancel');assert.deepEqual(typed,['e']);
 const event={type:'contextmenu',preventDefault(){this.prevented=true;}};e.dispatchEvent(event);assert.equal(event.prevented,true);
});

test('keyboard access opens the picker, moves focus and cancels without typing',()=>{
 const {a,keyboard,typed}=fixture(),e=letter(keyboard,'e');
 const down=hardware(e,'ArrowDown');assert.equal(down.prevented,true);assert.equal(down.stopped,true);
 const choices=variants(keyboard);assert.equal(a.document.activeElement,choices[0]);
 hardware(choices[0],'ArrowLeft');assert.equal(a.document.activeElement,choices.at(-1));
 hardware(choices.at(-1),'Home');assert.equal(a.document.activeElement,choices[0]);
 hardware(choices[0],'End');assert.equal(a.document.activeElement,choices.at(-1));
 hardware(choices.at(-1),'ArrowRight');assert.equal(a.document.activeElement,choices[0]);
 hardware(choices[0],'Escape');assert.equal(a.document.activeElement,e);assert.equal(variants(keyboard).length,0);assert.deepEqual(typed,[]);
 hardware(e,'ArrowDown');variants(keyboard)[0].click();assert.deepEqual(typed,['é']);assert.equal(a.document.activeElement,e);assert.equal(a.timers.size,0);
});

test('pickers stay within their row at both edges and stable renders update callbacks without losing the selection',()=>{
 const {a,keyboard,typed,options}=fixture(),calls=[];
 for(const [left,expected] of [[0,'0px'],[280,'220px']]){
  const e=letter(keyboard,'e');e.getBoundingClientRect=()=>({left,top:200,width:40,height:40});
  e.parentElement.getBoundingClientRect=()=>({left:0,top:200,width:310,height:40});open(a,keyboard,'e');
  assert.equal(keyboard.querySelector('.keyboard-variants').style.left,expected);
  a.run('renderAppKeyboard')('de',{...options,onType:x=>calls.push(x)});
  variants(keyboard)[0].click();assert.equal(variants(keyboard).length,0);
 }
 assert.deepEqual(typed,[]);assert.deepEqual(calls,['é','é']);
});

test('an open picker replaces the optional preview and both cancel without typing',()=>{
 const {a,keyboard,typed}=fixture();a.run('AndreKeyboard.configure({preview:true})');const e=letter(keyboard,'e');
 pointer(e,'pointerdown');assert.equal(e.dataset.preview,'e');a.advance(400);
 assert.equal(e.dataset.preview,undefined);assert.equal(variants(keyboard).length,4);
 a.run('AndreKeyboard.cancelAll()');assert.equal(variants(keyboard).length,0);assert.deepEqual(typed,[]);
});

test('sentence translation accepts accented names and Turkish letters and saves them as a draft',()=>{
 const a=app();require('./helpers/progress.cjs').learnTo(a,1);
 a.run('startSentenceGame();SentenceGame.current.direction="de";SentenceGame.render()');
 const keyboard=a.el('sentenceReadingKeyboard'),before=a.json('SentenceGame.engine.grammar.state.unlocked');
 key(keyboard,'shift').click();letter(keyboard,'a').click();letter(keyboard,'n').click();letter(keyboard,'d').click();letter(keyboard,'r').click();
 select(a,keyboard,'e','é');key(keyboard,'space').click();
 for(const [base,char] of [['a','á'],['c','ç'],['g','ğ'],['i','ı'],['s','ş']])select(a,keyboard,base,char);
 assert.equal(a.run('SentenceGame.current.draft'),'André áçğış');assert.deepEqual(a.json('SentenceGame.engine.grammar.state.unlocked'),before);
 const resumed=app({storage:new Map(a.storage)});resumed.run('startSentenceGame()');assert.equal(resumed.run('SentenceGame.current.draft'),'André áçğış');
 open(a,keyboard,'e');a.run('showView("dictionary",null)');assert.equal(variants(keyboard).length,0);assert.equal(a.timers.size,0);
});

test('word training and dictionary search accept the same variants without changing progress',()=>{
 const a=require('./helpers/word-study.cjs').study(),keyboard=a.el('customKeyboard'),before=a.json('getUnlockProgress()');
 for(const [base,char] of [['e','é'],['a','á'],['s','ş']])select(a,keyboard,base,char);
 assert.equal(a.run('WordTrainer.model.state.current.draft'),'éáş');assert.deepEqual(a.json('getUnlockProgress()'),before);
 a.run('showView("dictionary",null)');a.el('search').click();const search=a.el('searchKeyboard'),saved=[...a.storage];
 for(const [base,char] of [['e','é'],['c','ç'],['g','ğ'],['i','ı'],['s','ş']])select(a,search,base,char);
 assert.equal(a.el('search').value,'éçğış');assert.deepEqual([...a.storage],saved);
 open(a,search,'a');key(search,'check').click();assert.equal(variants(search).length,0);assert.equal(a.timers.size,0);
});
