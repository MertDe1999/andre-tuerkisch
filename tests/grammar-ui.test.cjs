const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const keys=a=>a.el('grammarKeyboard').querySelectorAll('.key');
function keyboard(a,key,extras={}){
 const event={type:'keydown',key,target:a.el('grammarAnswer'),prevented:false,preventDefault(){this.prevented=true;},...extras};a.document.dispatchEvent(event);return event;
}
function lesson(){const a=app();a.unlock(['ev','güzel','araba','bu'],{grammar:false});a.run('showView("grammar",null)');a.el('grammarUnlockFloatingButton').click();return a;}
function correct(a){a.run('SentenceGame.engine.grammar.state.current.draft=SentenceGame.engine.grammar.state.current.answer;GrammarTrainer.check()');}

test('fresh grammar keeps the bottom entry visible but locked, without an alternative top entry',()=>{
 const a=app();a.run('showView("grammar",null)');const entry=a.el('grammarUnlockFloatingButton'),saved=[...a.storage];
 assert.equal(entry.hidden,false);assert.equal(entry.disabled,true);assert.equal(a.el('unlockFloatingButton').hidden,true);
 assert.equal(a.document.body.classList.contains('without-unlock-button'),false);
 assert.ok(a.el('grammarList').children.every(node=>node.dataset.grammarGroup));
 assert.equal(a.el('grammarList').querySelectorAll('.grammar-next-words').length,0);
 entry.click();assert.equal(a.run('GrammarTrainer.active'),false);assert.equal(a.run('SentenceGame.engine.grammar.state.current'),null);assert.deepEqual([...a.storage],saved);
 a.unlock(['ev','güzel'],{grammar:false});assert.equal(entry.hidden,false);assert.equal(entry.disabled,false);
 entry.click();assert.equal(a.run('GrammarTrainer.active'),true);assert.equal(entry.hidden,true);
 a.run('GrammarTrainer.close()');assert.equal(entry.hidden,false);assert.equal(entry.disabled,false);
 a.run('showView("dictionary",null)');assert.equal(entry.hidden,true);assert.equal(a.el('unlockFloatingButton').hidden,false);
});

test('previous word unlocks use the same grammar entry and losing prerequisites locks it without moving it',()=>{
 const storage=new Map([['andreTurkishUnlockProgressV1',JSON.stringify({ev:{toTurkish:true,toGerman:true},güzel:{toTurkish:true,toGerman:true}})]]);
 const a=app({storage});a.run('showView("grammar",null)');const entry=a.el('grammarUnlockFloatingButton');
 assert.equal(entry.hidden,false);assert.equal(entry.disabled,false);
 a.run('resetUnlockDirections("ev")');assert.equal(entry.hidden,false);assert.equal(entry.disabled,true);
 a.run('markUnlockDirection("ev","toTurkish");markUnlockDirection("ev","toGerman")');assert.equal(entry.disabled,false);
 const loaded=app({storage});loaded.run('showView("grammar",null)');assert.equal(loaded.el('grammarUnlockFloatingButton').hidden,false);assert.equal(loaded.el('grammarUnlockFloatingButton').disabled,false);
 assert.ok(loaded.el('grammarList').children.every(node=>node.dataset.grammarGroup));
});

test('unlearned and future rules stay locked while only learned forms are visible and reviewable',()=>{
 const a=app();a.unlock(undefined,{grammar:false});a.run('showView("grammar",null)');
 const topics=a.el('grammarList').children.filter(e=>e.dataset.grammarGroup);
 assert.ok(topics.some(e=>e.dataset.grammarGroup==='report'),'later topics remain discoverable');
 const rows=topics.flatMap(e=>e.children[1].children);assert.ok(rows.length>20);assert.ok(rows.every(e=>e.disabled&&e.classList.contains('locked')));
 rows[0].click();assert.equal(a.run('GrammarTrainer.active'),false);
 assert.equal(a.el('grammarUnlockFloatingButton').hidden,false);
 a.run('SentenceGame.engine.state.opened=4;SentenceGame.engine.grammar.state.unlocked[AndreCourseGrammar.entries.find(e=>e.label==="Dativ"&&e.text==="-e").id]=true;refreshGrammarUI()');
 const dativ=a.el('grammarList').children.flatMap(e=>e.dataset.grammarGroup?e.children[1].children:[]).find(e=>e.dataset.grammarRule==='Dativ');
 assert.equal(dativ.disabled,false);assert.equal(dativ.classList.contains('locked'),false);assert.match(dativ.textContent,/-e/);assert.ok(!dativ.textContent.includes('-ya'),'unknown variants stay hidden');
 dativ.click();assert.equal(a.run('GrammarTrainer.active'),true);assert.equal(a.run('SentenceGame.engine.grammar.state.current.answer'),'eve');
});

test('grammar and vocabulary share full keyboards, and input survives navigation without revealing an answer',()=>{
 const a=lesson();assert.equal(a.el('grammarAnswer').tagName,'DIV');assert.equal(a.el('grammarAnswer').getAttribute('aria-readonly'),'true');
 assert.ok(keys(a).some(e=>e.textContent==='ğ'));assert.ok(keys(a).some(e=>e.dataset.action==='space'));assert.ok(keys(a).some(e=>e.dataset.action==='delete'));
 assert.equal(a.el('grammarTrainer').querySelectorAll('.grammar-keys').length,0);assert.ok(!a.el('grammarTrainer').textContent.includes('Lösung zeigen'));
 keys(a).find(e=>e.textContent==='ç').click();keys(a).find(e=>e.dataset.action==='space').click();keyboard(a,'ğ');
 assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),'ç ğ');keyboard(a,'Backspace');assert.equal(a.el('grammarAnswer').textContent,'ç ');
 a.run('showView("dictionary",null)');assert.equal(a.run('GrammarTrainer.active'),false);assert.equal(a.document.body.classList.contains('grammar-training-view'),false);
 a.run('openGrammarTraining()');assert.equal(a.el('grammarAnswer').textContent,'ç ');
 correct(a);const snapshot=[...a.storage];a.run('GrammarTrainer.check();GrammarTrainer.type("x")');assert.deepEqual([...a.storage],snapshot);assert.ok(keys(a).every(e=>e.disabled));
 a.advance(750);assert.ok(keys(a).some(e=>e.getAttribute('aria-label')?.includes('ß')));assert.ok(keys(a).some(e=>e.textContent==='ä'));assert.ok(!keys(a).some(e=>e.textContent==='ğ'));
});

test('wrong answers and skipping do not reveal solutions or grant progress; timers stop on leaving',()=>{
 const a=lesson();keyboard(a,'x');keyboard(a,'Enter');assert.equal(a.el('grammarAnswer').textContent,'x');assert.equal(a.el('grammarFeedback').textContent,'Noch nicht richtig.');
 assert.equal(a.run('SentenceGame.engine.grammar.unlocked().size'),0);keyboard(a,'Backspace');assert.equal(a.el('grammarAnswer').textContent,'Antwort tippen …');
 const before=a.json('SentenceGame.engine.grammar.state.counts');keys(a).find(e=>e.dataset.action==='skip').click();assert.deepEqual(a.json('SentenceGame.engine.grammar.state.counts'),before);
 assert.equal(a.el('grammarAnswer').textContent,'Antwort tippen …');assert.equal(a.run('SentenceGame.engine.grammar.unlocked().size'),0);
 correct(a);assert.equal(a.timers.size,1);a.run('showView("dictionary",null)');assert.equal(a.timers.size,0);a.advance(2000);assert.equal(a.run('GrammarTrainer.active'),false);
 assert.equal(keyboard(a,'x').prevented,false);
});

test('hardware shortcuts and focused buttons retain native behavior in grammar',()=>{
 const a=lesson(),key=keys(a)[0];assert.equal(keyboard(a,'Enter',{target:key}).prevented,false);assert.equal(keyboard(a,' ',{target:key}).prevented,false);
 assert.equal(keyboard(a,'a',{ctrlKey:true}).prevented,false);assert.equal(keyboard(a,'a',{isComposing:true}).prevented,false);
 assert.equal(keyboard(a,'a',{target:{closest:()=>({})}}).prevented,false);assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),undefined);
});
