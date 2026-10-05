const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');

test('both shared layouts put Delete after m or ç without losing language letters',()=>{
 const a=app();
 for(const [language,last,letters] of [['de','m','abcdefghijklmnopqrstuvwxyzäöü'],['tr','ç','qwertyuıopğüasdfghjklşizxcvbnmöç']]){
  const keyboard=a.el('testKeyboard');const typed=[];
  a.run('renderAppKeyboard') (language,{keyboard,onType:x=>typed.push(x),onCheck(){}});
  const rows=keyboard.children,wordRow=rows.at(-2).children.filter(e=>e.tagName==='BUTTON');
  assert.equal(wordRow.at(-2).textContent,last);assert.equal(wordRow.at(-1).getAttribute('aria-label'),'Zeichen löschen');
  const keys=rows.flatMap(row=>row.children);assert.equal(keys.filter(k=>k.dataset.action==='delete').length,1);
  for(const letter of letters)assert.ok(keys.some(k=>k.textContent===letter),language+' missing '+letter);
  wordRow.at(-1).click();assert.deepEqual(typed,['BACKSPACE']);
 }
});

test('a stable keyboard uses new actions and disabled keys cannot submit or type',()=>{
 const a=app(),keyboard=a.el('testKeyboard'),calls=[];
 a.run('renderAppKeyboard')('tr',{keyboard,onType:x=>calls.push('old:'+x),onCheck(){calls.push('old check');}});
 const first=keyboard.children[1].children[0],check=keyboard.children.at(-1).children.at(-1);
 a.run('renderAppKeyboard')('tr',{keyboard,onType:x=>calls.push('new:'+x),onCheck(){calls.push('new check');},checkLabel:'Weiter'});
 assert.equal(keyboard.children[1].children[0],first);assert.equal(check.getAttribute('aria-label'),'Weiter');first.click();check.click();
 assert.deepEqual(calls,['new:q','new check']);
 a.run('renderAppKeyboard')('tr',{keyboard,onType(){calls.push('disabled');},onCheck(){calls.push('disabled');},disabled:true});first.click();check.click();assert.equal(calls.length,2);
});

test('animated letters are immediately complete, editable and readable before the animation finishes',()=>{
 const a=app({reducedMotion:false}),field=a.el('answer');
 a.run('AndreMotion.write')(field,'ş');assert.equal(field.textContent,'ş');
 const firstLetter=field.children[0];
 a.run('AndreMotion.write')(field,'şü');assert.equal(field.textContent,'şü');
 assert.equal(field.children[0],firstLetter,'rapid typing preserves the previous letter animation');
 assert.ok(a.animations.length>=2);a.run('AndreMotion.write')(field,'ş');assert.equal(field.textContent,'ş');
 a.run('AndreMotion.write')(field,'');assert.equal(field.textContent,'Antwort tippen …');
 a.run('AndreMotion.write')(field,'ä');assert.equal(field.textContent,'ä');
 a.run('AndreMotion.cancel()');assert.ok(a.animations.every(animation=>animation.cancelled));assert.equal(field.textContent,'ä');
});

test('reduced motion and animation cancellation retain input without timers or scoring side effects',()=>{
 const a=app(),field=a.el('answer'),saved=[...a.storage];
 a.run('AndreMotion.write')(field,'ışık');a.run('AndreMotion.feedback')(field,true);a.run('AndreMotion.enter')(field);
 assert.equal(field.textContent,'ışık');assert.equal(a.animations.length,0);assert.equal(a.timers.size,0);assert.deepEqual([...a.storage],saved);
});

test('word layout movement starts at the prior position and cancelled presentation never moves model tokens',()=>{
 const a=app({reducedMotion:false}),old=a.el('old'),next=a.el('next');old.dataset.modernToken='word';next.dataset.modernToken='word';
 old.getBoundingClientRect=()=>({left:10,top:40,width:80,height:44});next.getBoundingClientRect=()=>({left:80,top:100,width:80,height:44});
 const before=a.run('AndreMotion.captureCards')([old]);const saved=[...a.storage];a.run('AndreMotion.cards')(before,[next]);
 assert.equal(a.animations.at(-1).keyframes[0].transform,'translate(-70px,-60px)');
 a.run('AndreMotion.cancel()');assert.deepEqual([...a.storage],saved);assert.equal(a.timers.size,0);
});

test('swipe follows the finger and cancellation restores preview and navigation state',()=>{
 const a=app({reducedMotion:false}),parent=a.el('parent'),current=a.el('current'),target=a.el('target'),nav=a.el('nav');parent.append(current,target);
 a.run('AndreMotion.follow')(current,target,-30,0,nav);
 assert.equal(current.style.transform,'translateX(-30px)');assert.equal(target.inert,true);assert.equal(target.classList.contains('motion-swipe-preview'),true);
 a.run('AndreMotion.finishSwipe(false)');assert.equal(current.style.transform,'');assert.equal(target.style.transform,'');assert.equal(target.inert,false);assert.equal(nav.classList.contains('motion-following'),false);
 a.run('AndreMotion.follow')(current,target,-60,0,nav);const handoff=a.run('AndreMotion.finishSwipe(true)');assert.equal(handoff.dx,-60);assert.equal(handoff.width,90);
 assert.equal(target.classList.contains('motion-swipe-preview'),false);a.run('AndreMotion.cancel()');
});

test('grammar typing animates the real draft while preserving keyboard and input guards',()=>{
 const a=app({reducedMotion:false});a.unlock(undefined,{grammar:false});a.run('openGrammarTraining()');
 const keyboard=a.el('grammarKeyboard'),key=keyboard.children[1].children[0];a.run('GrammarTrainer.type("ş");GrammarTrainer.type("ü")');
 assert.equal(a.el('grammarAnswer').textContent,'şü');assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),'şü');
 a.run('GrammarTrainer.type("BACKSPACE")');assert.equal(a.el('grammarAnswer').textContent,'ş');assert.equal(a.el('grammarKeyboard'),keyboard);assert.equal(keyboard.children[1].children[0],key);
 a.run('showView("dictionary",null)');const draft=a.run('SentenceGame.engine.grammar.state.current.draft');a.run('GrammarTrainer.type("x")');assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),draft);
});

test('outgoing copies are inert, have no duplicate IDs and are removed on interruption',()=>{
 const a=app({reducedMotion:false}),card=a.el('outgoing'),child=a.el('outgoingChild');card.append(child);child.textContent='ışık';
 child.setAttribute('onclick','doNotCopy()');
 a.run('AndreMotion.depart')(card);const copy=a.document.body.querySelector('.motion-snapshot');
 assert.ok(copy);assert.equal(copy.inert,true);assert.equal(copy.getAttribute('aria-hidden'),'true');assert.equal(copy.id,undefined);
 assert.equal(copy.children[0].id,undefined);assert.equal(copy.children[0].getAttribute('onclick'),null);assert.equal(copy.textContent,'ışık');
 a.run('AndreMotion.cancel()');assert.equal(copy.parentElement,null);assert.equal(card.children[0],child);assert.equal(child.textContent,'ışık');
});

test('navigation interruptions restore the outgoing view and allow it to be opened again',()=>{
 const a=app({reducedMotion:false}),parent=a.el('parent'),previous=a.el('previous'),next=a.el('next');parent.append(previous,next);
 a.run('AndreMotion.navigation')(previous,next,{direction:1});assert.equal(previous.inert,true);assert.equal(previous.classList.contains('motion-leaving'),true);
 a.run('AndreMotion.cancel()');assert.equal(previous.inert,false);assert.equal(previous.classList.contains('motion-leaving'),false);assert.equal(previous.style.width,'');
 a.run('AndreMotion.navigation')(next,previous,{direction:-1});a.animations.at(-2).onfinish();assert.equal(next.inert,false);assert.equal(next.classList.contains('motion-leaving'),false);
});

test('landing a dragged tile shows one destination and restores it after cancellation',()=>{
 const a=app({reducedMotion:false}),ghost=a.el('ghost'),destination=a.el('destination');a.document.body.append(ghost);
 a.run('AndreMotion.land')(ghost,destination,null,{hideTarget:true});assert.equal(destination.style.visibility,'hidden');
 a.run('AndreMotion.cancel()');assert.equal(destination.style.visibility,'');assert.equal(ghost.parentElement,null);
 const fallback=a.el('fallback');a.document.body.append(fallback);fallback.animate=undefined;
 a.run('AndreMotion.land')(fallback,destination,null,{hideTarget:true});assert.equal(destination.style.visibility,'');assert.equal(fallback.parentElement,null);
});

test('leaving grammar directly animates the return and stops answer advancement',()=>{
 const a=app({reducedMotion:false});a.unlock(undefined,{grammar:false});a.run('openGrammarTraining()');
 a.run('SentenceGame.engine.grammar.state.current.draft=SentenceGame.engine.grammar.state.current.answer;GrammarTrainer.check()');assert.equal(a.timers.size,1);
 a.run('GrammarTrainer.close()');assert.equal(a.timers.size,0);assert.equal(a.run('GrammarTrainer.active'),false);assert.equal(a.el('grammarPanel').hidden,false);
 const before=a.json('SentenceGame.engine.grammar.state');a.advance(3000);assert.deepEqual(a.json('SentenceGame.engine.grammar.state'),before);
 a.run('AndreMotion.cancel()');assert.equal(a.document.body.querySelector('.motion-snapshot'),null);
});

test('real drag handlers preserve the grab offset and cancel without moving or rating a token',()=>{
 const a=app({reducedMotion:false});a.unlock();a.run('startSentenceGame()');
 const button=a.el('wordBank').children.find(e=>e.dataset.modernToken),before=a.json('SentenceGame.current');
 button.getBoundingClientRect=()=>({left:10,top:20,width:90,height:44});
 button.dispatchEvent({type:'pointerdown',button:0,clientX:30,clientY:35,pointerId:7});
 button.dispatchEvent({type:'pointermove',clientX:80,clientY:90,pointerId:7});
 const ghost=a.document.body.querySelector('.drag-ghost');assert.ok(ghost);assert.equal(ghost.style.transformOrigin,'20px 15px');
 assert.equal(ghost.style.transform,'translate3d(60px,75px,0) scale(1.02)');
 button.dispatchEvent({type:'pointercancel',clientX:80,clientY:90,pointerId:7});assert.deepEqual(a.json('SentenceGame.current'),before);
 assert.equal(ghost.parentElement,a.document.body,'the ghost returns briefly instead of disappearing');
 a.run('AndreMotion.cancel()');assert.equal(ghost.parentElement,null);assert.equal(button.classList.contains('dragging'),false);
});

test('opening a trainer never animates an ancestor of its fixed keyboard',()=>{
 for(const kind of ['words','grammar']){
  const a=app({reducedMotion:false});a.unlock(undefined,{grammar:false});
  a.run(kind==='words'?'openLearnMode("typing")':'openGrammarTraining()');
  const keyboard=a.el(kind==='words'?'customKeyboard':'grammarKeyboard'),ancestors=new Set();
  for(let element=keyboard.parentElement;element;element=element.parentElement)ancestors.add(element);
  ancestors.add(a.el(kind==='words'?'dictionary':'grammar'));
  const active=a.animations.filter(animation=>!animation.cancelled);assert.ok(active.length);
  assert.ok(active.every(animation=>!ancestors.has(animation.target)),kind+' fixed keyboard must keep the viewport as its containing block');
 }
});

test('grammar celebrates a new unlock once and a learned-rule review only gets local feedback',()=>{
 for(const alreadyLearned of [false,true]){
  const a=app();a.unlock(undefined,{grammar:false});a.run('openGrammarTraining()');
  a.run('window.celebrations=0;celebrateCorrectAnswer=()=>{window.celebrations++;return 0};'+
   'const lesson=SentenceGame.engine.grammar.state.current;SentenceGame.engine.grammar.state.counts[lesson.entryId]={tr:3,de:3,seen:[]};'+
   'SentenceGame.engine.grammar.state.unlocked[lesson.entryId]='+alreadyLearned+';lesson.draft=lesson.answer;GrammarTrainer.check();GrammarTrainer.check()');
  assert.equal(a.run('window.celebrations'),alreadyLearned?0:1);assert.equal(a.el('grammarFeedback').textContent,alreadyLearned?'Richtig.':'Freigeschaltet.');
 }
});

test('level 160 is celebrated on its first arrival and stays quiet after a level loss',()=>{
 for(const highest of [159,160]){
  const a=app();a.unlock();a.run('startSentenceGame();window.celebrations=0;celebrateCorrectAnswer=()=>{window.celebrations++;return 0};'+
   'const gameEngine=SentenceGame.engine;gameEngine.state.level=159;gameEngine.state.highestLevel='+highest+';gameEngine.state.opened=32;'+
   'gameEngine.begin(AndreCourse.tasks[0],"current");gameEngine.state.current.tokens=gameEngine.task().groups.flatMap(g=>g.slots.map((slot,i)=>({...AndreCourse.copy(slot),id:g.id+i,group:g.id})));'+
   'checkSentence();checkSentence()');
  assert.equal(a.run('SentenceGame.engine.state.level'),160);assert.equal(a.run('window.celebrations'),highest===159?1:0);
 }
});
