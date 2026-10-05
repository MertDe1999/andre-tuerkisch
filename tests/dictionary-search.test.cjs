const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const keys=a=>a.el('searchKeyboard').children.flatMap(row=>row.children);
const key=(a,action)=>keys(a).find(k=>k.dataset.action===action);
const letter=(a,text)=>keys(a).find(k=>k.dataset.action==='letter'&&k.textContent===text);
const visible=a=>a.rows.filter(row=>row.style.display!=='none').map(row=>row.querySelector('.word-tr').textContent);
const enter=(a,text)=>{for(const char of text){if(char==='ß'){const s=letter(a,'s');s.dispatchEvent({type:'pointerdown',pointerId:1});a.advance(400);s.dispatchEvent({type:'pointerup',pointerId:1});s.dispatchEvent({type:'click',detail:1});}else letter(a,char).click();}};
function hardware(a,name,target=a.el('search'),extra={}){
 const event={type:'keydown',key:name,target,prevented:false,preventDefault(){this.prevented=true;},...extra};
 a.document.dispatchEvent(event);return event;
}

test('search opens the shared keyboard, searches instantly and keeps the word-type filter',()=>{
 const a=app();a.unlock(['ev','gitmek'],{grammar:false});const saved=[...a.storage];
 a.el('wordTypeFilters').children.find(b=>b.dataset.wordType==='noun').click();
 assert.equal(a.el('searchKeyboard').hidden,true);a.el('search').click();
 assert.equal(a.el('searchKeyboard').hidden,false);assert.equal(a.el('searchKeyboard').inert,false);
 assert.equal(a.document.body.classList.contains('word-search-open'),true);
 assert.equal(a.document.querySelector('.bottom-nav-wrap').inert,true);
 enter(a,'haus');assert.equal(a.el('search').value,'haus');assert.deepEqual(visible(a),['ev']);
 assert.equal(a.el('clearWordSearch').hidden,false);key(a,'check').click();
 assert.equal(a.el('searchKeyboard').hidden,true);assert.equal(a.el('searchKeyboard').inert,true);
 assert.equal(a.document.body.classList.contains('word-search-open'),false);
 assert.equal(a.document.querySelector('.bottom-nav-wrap').inert,undefined);
 assert.equal(a.document.activeElement,a.el('search'));assert.deepEqual(visible(a),['ev']);
 a.el('search').click();key(a,'delete').click();assert.equal(a.el('search').value,'hau');
 a.el('clearWordSearch').click();assert.equal(a.el('search').value,'');assert.equal(a.el('clearWordSearch').hidden,true);
 assert.ok(visible(a).every(tr=>a.rows.find(row=>row.querySelector('.word-tr').textContent===tr).classList.contains('noun')));
 assert.deepEqual([...a.storage],saved);
});

test('DE/TR layouts preserve search text, language-specific letters and Delete placement',()=>{
 const a=app();a.el('search').click();const rows=a.el('searchKeyboard').children;
 assert.equal(rows.length,5);assert.equal(rows[3].children.filter(e=>e.tagName==='BUTTON').at(-2).textContent,'m');
 assert.equal(rows[3].children.at(-1).dataset.action,'delete');
 enter(a,'äöüß');key(a,'language').click();assert.equal(a.el('search').value,'äöüß');
 assert.equal(a.el('searchKeyboard').getAttribute('lang'),'tr');
 assert.equal(a.el('searchKeyboard').children[3].children.at(-2).textContent,'ç');
 assert.equal(a.el('searchKeyboard').children[3].children.at(-1).dataset.action,'delete');
 enter(a,'çğıöşü');key(a,'space').click();assert.equal(a.el('search').value,'äöüßçğıöşü ');
 key(a,'language').click();assert.equal(a.el('searchKeyboard').getAttribute('lang'),'de');
 assert.equal(a.el('search').value,'äöüßçğıöşü ');
});

test('hardware input edits the selection, protects shortcuts/composition, and ignores other fields and button activation',()=>{
 const a=app(),search=a.el('search');a.el('search').click();
 for(const char of 'ev')assert.equal(hardware(a,char).prevented,true);
 search.setSelectionRange(1,1);hardware(a,'l');assert.equal(search.value,'elv');
 search.setSelectionRange(1,2);hardware(a,'Backspace');assert.equal(search.value,'ev');
 hardware(a,'Delete');assert.equal(search.value,'e');hardware(a,'ş');assert.equal(search.value,'eş');
 assert.equal(hardware(a,'x',search,{ctrlKey:true}).prevented,false);
 assert.equal(hardware(a,'x',search,{isComposing:true}).prevented,false);assert.equal(search.value,'eş');
 const other=a.document.createElement('input');assert.equal(hardware(a,'x',other).prevented,false);
 assert.equal(hardware(a,' ',key(a,'space')).prevented,false);assert.equal(search.value,'eş');
 assert.equal(hardware(a,'Enter',key(a,'check')).prevented,false);assert.equal(a.el('searchKeyboard').hidden,false);
 hardware(a,'Escape');assert.equal(a.el('searchKeyboard').hidden,true);
 hardware(a,'Enter');assert.equal(a.el('searchKeyboard').hidden,false);hardware(a,'Enter');
 assert.equal(a.el('searchKeyboard').hidden,true);hardware(a,'x');assert.equal(search.value,'eşx');
 assert.equal(a.el('searchKeyboard').hidden,false);
 search.value='a😀';search.setSelectionRange(3,3);key(a,'delete').click();assert.equal(search.value,'a');
 search.value='a'.repeat(120);search.setSelectionRange(120,120);hardware(a,'x');assert.equal(search.value.length,120);
});

test('outside taps dismiss safely, filter taps keep search open, and closed keys cannot change the query',()=>{
 const a=app();a.unlock(['ev'],{grammar:false});a.el('search').click();enter(a,'ev');
 a.el('searchKeyboard').className='custom-keyboard search-keyboard';
 const filter=a.el('wordTypeFilters');filter.className='word-type-filters';
 a.document.dispatchEvent({type:'pointerdown',target:filter.children[0]});assert.equal(a.el('searchKeyboard').hidden,false);
 a.document.dispatchEvent({type:'pointerdown',target:letter(a,'e')});assert.equal(a.el('searchKeyboard').hidden,false);
 a.document.dispatchEvent({type:'pointerdown',target:a.rows[0]});assert.equal(a.el('searchKeyboard').hidden,true);
 letter(a,'x').click();assert.equal(a.el('search').value,'ev');
 a.el('search').focus();a.el('search').dispatchEvent({type:'focus'});assert.equal(a.el('searchKeyboard').hidden,false);
});

test('navigation and trainer/card entry clear only keyboard presentation and retain search/progress',()=>{
 for(const leave of ['showView("grammar",null)','openLearnMode("typing")','openFlashcards()']){
  const a=app({reducedMotion:false});a.unlock(['ev'],{grammar:false});a.el('search').click();enter(a,'ev');
  const saved=[...a.storage];a.run(leave);
  assert.equal(a.el('searchKeyboard').hidden,true,leave);assert.equal(a.el('searchKeyboard').inert,true);
  assert.equal(a.document.body.classList.contains('word-search-open'),false);assert.equal(a.el('search').value,'ev');
  assert.deepEqual([...a.storage],saved);a.el('search').click();assert.equal(a.el('searchKeyboard').hidden,true);
  a.run('showView("dictionary",null)');a.el('search').click();assert.equal(a.el('searchKeyboard').hidden,false);
 }
});

test('opening leaves the search field above the keyboard when the viewport is cramped',()=>{
 const a=app();a.run('window.searchScrolls=[];window.scrollBy=options=>window.searchScrolls.push(options)');
 a.el('search').getBoundingClientRect=()=>({top:315,bottom:360,height:45});
 a.el('searchKeyboard').getBoundingClientRect=()=>({top:300,height:210});
 a.el('search').click();assert.deepEqual(a.json('window.searchScrolls'),[{top:72,behavior:'auto'}]);
 a.el('search').click();assert.equal(a.run('window.searchScrolls.length'),1);
});

test('quick open/close/reopen and cancelled animations cannot hide a reopened keyboard',()=>{
 const a=app({reducedMotion:false});a.el('search').click();const opening=a.animations.at(-1);
 assert.equal(opening.options.duration,160);assert.equal(opening.target,a.el('searchKeyboard'));
 const view=a.el('dictionary');assert.ok(a.animations.every(animation=>animation.target!==view));
 key(a,'check').click();const closing=a.animations.at(-1);assert.equal(opening.cancelled,true);
 assert.equal(closing.options.duration,120);assert.equal(a.el('searchKeyboard').inert,true);
 a.el('search').click();assert.equal(closing.cancelled,true);closing.onfinish();
 assert.equal(a.el('searchKeyboard').hidden,false);assert.equal(a.el('searchKeyboard').inert,false);
 enter(a,'ev');a.run('AndreMotion.cancel()');assert.equal(a.el('searchKeyboard').hidden,false);
 assert.equal(a.el('search').value,'ev');key(a,'check').click();a.animations.at(-1).onfinish();
 assert.equal(a.el('searchKeyboard').hidden,true);assert.equal(a.timers.size,0);
});

test('reduced motion and unsupported animation close immediately without learning-state writes',()=>{
 for(const reducedMotion of [true,false]){
  const a=app({reducedMotion});a.el('searchKeyboard').animate=undefined;
  const saved=[...a.storage];a.el('search').click();enter(a,'ev');key(a,'check').click();
  assert.equal(a.el('searchKeyboard').hidden,true);assert.equal(a.el('search').value,'ev');assert.deepEqual([...a.storage],saved);
  assert.equal(a.animations.length,0);assert.equal(a.timers.size,0);
 }
});
