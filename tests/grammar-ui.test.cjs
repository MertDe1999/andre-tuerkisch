const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const keys=a=>a.el('grammarKeyboard').children.flatMap(row=>row.children);
function keyboard(a,key,extras={}){
 const event={type:'keydown',key,target:a.el('grammarAnswer'),prevented:false,preventDefault(){this.prevented=true;},...extras};a.document.dispatchEvent(event);return event;
}
function lesson(){const a=app();a.unlock(['ev','güzel','araba','bu'],{grammar:false});a.run('showView("grammar",null)');a.el('grammarUnlockFloatingButton').click();return a;}
function correct(a){a.run('SentenceGame.engine.grammar.state.current.draft=SentenceGame.engine.grammar.state.current.answer;GrammarTrainer.check()');}

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
 assert.ok(keys(a).some(e=>e.textContent==='ğ'));assert.ok(keys(a).some(e=>e.textContent==='Leertaste'));assert.ok(keys(a).some(e=>e.textContent==='⌫'));
 assert.equal(a.el('grammarTrainer').querySelectorAll('.grammar-keys').length,0);assert.ok(!a.el('grammarTrainer').textContent.includes('Lösung zeigen'));
 keys(a).find(e=>e.textContent==='ç').click();keys(a).find(e=>e.textContent==='Leertaste').click();keyboard(a,'ğ');
 assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),'ç ğ');keyboard(a,'Backspace');assert.equal(a.el('grammarAnswer').textContent,'ç ');
 a.run('showView("dictionary",null)');assert.equal(a.run('GrammarTrainer.active'),false);assert.equal(a.document.body.classList.contains('grammar-training-view'),false);
 a.run('openGrammarTraining()');assert.equal(a.el('grammarAnswer').textContent,'ç ');
 correct(a);const snapshot=[...a.storage];a.run('GrammarTrainer.check();GrammarTrainer.type("x")');assert.deepEqual([...a.storage],snapshot);assert.ok(keys(a).every(e=>e.disabled));
 a.advance(750);assert.ok(keys(a).some(e=>e.textContent==='ß'));assert.ok(keys(a).some(e=>e.textContent==='ä'));assert.ok(!keys(a).some(e=>e.textContent==='ğ'));
});

test('wrong answers and skipping do not reveal solutions or grant progress; timers stop on leaving',()=>{
 const a=lesson();keyboard(a,'x');keyboard(a,'Enter');assert.equal(a.el('grammarAnswer').textContent,'x');assert.equal(a.el('grammarFeedback').textContent,'Noch nicht richtig.');
 assert.equal(a.run('SentenceGame.engine.grammar.unlocked().size'),0);keyboard(a,'Backspace');assert.equal(a.el('grammarAnswer').textContent,'Antwort tippen …');
 const before=a.json('SentenceGame.engine.grammar.state.counts');keys(a).find(e=>e.textContent==='Überspringen').click();assert.deepEqual(a.json('SentenceGame.engine.grammar.state.counts'),before);
 assert.equal(a.el('grammarAnswer').textContent,'Antwort tippen …');assert.equal(a.run('SentenceGame.engine.grammar.unlocked().size'),0);
 correct(a);assert.equal(a.timers.size,1);a.run('showView("dictionary",null)');assert.equal(a.timers.size,0);a.advance(2000);assert.equal(a.run('GrammarTrainer.active'),false);
 assert.equal(keyboard(a,'x').prevented,false);
});

test('hardware shortcuts and focused buttons retain native behavior in grammar',()=>{
 const a=lesson(),key=keys(a)[0];assert.equal(keyboard(a,'Enter',{target:key}).prevented,false);assert.equal(keyboard(a,' ',{target:key}).prevented,false);
 assert.equal(keyboard(a,'a',{ctrlKey:true}).prevented,false);assert.equal(keyboard(a,'a',{isComposing:true}).prevented,false);
 assert.equal(keyboard(a,'a',{target:{closest:()=>({})}}).prevented,false);assert.equal(a.run('SentenceGame.engine.grammar.state.current.draft'),undefined);
});
