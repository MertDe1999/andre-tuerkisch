const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs');
const chips=a=>a.el('wordTypeFilters').children;
const chip=(a,type)=>chips(a).find(button=>button.dataset.wordType===type);
const visible=a=>a.rows.filter(row=>row.style.display!=='none');
const types=a=>chips(a).map(button=>button.dataset.wordType);
const lemma=(a,text)=>a.rows.find(row=>row.querySelector('.word-tr').textContent===text);

test('categories appear only after both word directions, and every represented type becomes available',()=>{
 const a=app();assert.deepEqual(types(a),[]);assert.equal(a.el('wordTypeFilters').hidden,true);
 a.run('markUnlockDirection("ev","toTurkish")');assert.deepEqual(types(a),[]);
 a.run('markUnlockDirection("ev","toGerman")');assert.deepEqual(types(a),['noun']);assert.equal(a.el('wordTypeFilters').hidden,false);
 a.unlock(undefined,{grammar:false});
 const expected=a.json('Object.keys(typeNames).filter(type=>AndreWords.words.some(w=>w.type===type||(w.otherTypes||[]).includes(type)))');
 assert.deepEqual(types(a),expected);assert.ok(expected.length>3);
 for(const button of chips(a)){assert.ok(button.classList.contains(button.dataset.wordType));assert.equal(button.tagName,'BUTTON');assert.equal(button.getAttribute('aria-pressed'),'false');}
});

test('a category tap filters immediately, switching replaces it and a second tap restores the list',()=>{
 const a=app();a.unlock(['ev','gitmek'],{grammar:false});const saved=[...a.storage];
 chip(a,'noun').click();assert.ok(visible(a).length>1);assert.ok(visible(a).every(row=>row.classList.contains('noun')));
 assert.ok(visible(a).includes(lemma(a,'ev')));assert.ok(visible(a).some(row=>row.classList.contains('locked')));
 assert.equal(chip(a,'noun').getAttribute('aria-pressed'),'true');
 chip(a,'verb').click();assert.ok(visible(a).every(row=>row.classList.contains('verb')));
 assert.equal(chip(a,'noun').getAttribute('aria-pressed'),'false');assert.equal(chip(a,'verb').getAttribute('aria-pressed'),'true');
 chip(a,'verb').click();assert.equal(visible(a).length,a.rows.length);assert.ok(chips(a).every(button=>button.getAttribute('aria-pressed')==='false'));
 assert.deepEqual([...a.storage],saved);
});

test('search and category intersect without revealing locked search matches or clearing the selection',()=>{
 const a=app();a.unlock(['ev','gitmek'],{grammar:false});chip(a,'noun').click();
 a.el('search').value='  HAUS  ';a.run('filterWords()');assert.deepEqual(visible(a),[lemma(a,'ev')]);
 chip(a,'verb').click();assert.equal(visible(a).length,0);
 a.el('search').value='gehen';a.run('filterWords()');assert.deepEqual(visible(a),[lemma(a,'gitmek')]);
 a.el('search').value='';a.run('filterWords()');assert.ok(visible(a).every(row=>row.classList.contains('verb')));assert.ok(visible(a).some(row=>row.classList.contains('locked')));
 chip(a,'verb').click();a.el('search').value='kedi';a.run('filterWords()');assert.equal(visible(a).length,0);
});

test('a word with multiple categories enables and appears in both corresponding filters',()=>{
 const a=app();a.unlock(['sonra'],{grammar:false});assert.deepEqual(types(a),['adverb','postposition']);
 for(const type of types(a)){
  chip(a,type).click();assert.ok(visible(a).includes(lemma(a,'sonra')));assert.ok(visible(a).includes(lemma(a,'önce')));
  const ids=visible(a).map(row=>row.dataset.wordId);const matching=a.json('AndreWords.words.filter(w=>[w.type,...(w.otherTypes||[])].includes('+JSON.stringify(type)+')).map(w=>w.id)');
  assert.deepEqual([...ids].sort(),matching.sort());
 }
});

test('unlock refresh preserves selection and unchanged button focus, then clears an unavailable filter',()=>{
 const a=app();a.unlock(['gitmek'],{grammar:false});const verb=chip(a,'verb');verb.click();verb.focus();
 a.run('markUnlockDirection("ev","toTurkish");markUnlockDirection("ev","toGerman")');
 assert.deepEqual(types(a),['noun','verb']);assert.equal(chip(a,'verb'),verb);assert.equal(a.document.activeElement,verb);assert.equal(verb.getAttribute('aria-pressed'),'true');
 assert.ok(visible(a).every(row=>row.classList.contains('verb')));
 a.run('resetUnlockDirections("gitmek")');assert.deepEqual(types(a),['noun']);assert.equal(visible(a).length,a.rows.length);
 a.run('resetUnlockDirections("ev")');assert.deepEqual(types(a),[]);assert.equal(a.el('wordTypeFilters').hidden,true);
});

test('saved unlocks recreate available categories while the presentation selection stays temporary',()=>{
 const a=app();a.unlock(['ev','ben','var','sonra'],{grammar:false});chip(a,'pronoun').click();
 const b=app({storage:a.storage});assert.deepEqual(types(b),types(a));assert.equal(visible(b).length,b.rows.length);assert.ok(chips(b).every(button=>button.getAttribute('aria-pressed')==='false'));
});

test('later vocabulary additions join the same filters without adding a separate category list',()=>{
 const a=app();a.unlock(['ev'],{grammar:false});chip(a,'noun').click();
 a.run('AndreWords.register({id:"future-noun",tr:"kitaplık",de:"Bücherregal",type:"noun"});AndreWords.register({id:"future-adverb",tr:"sessizce",de:"leise",type:"adverb"});AndreDictionary.render()');
 assert.deepEqual(types(a),['noun']);assert.ok(visible(a).includes(lemma(a,'kitaplık')));assert.equal(lemma(a,'kitaplık').classList.contains('locked'),true);
 assert.ok(!visible(a).includes(lemma(a,'sessizce')));
 a.run('markUnlockDirection("sessizce","toTurkish")');assert.deepEqual(types(a),['noun']);
 a.run('markUnlockDirection("sessizce","toGerman")');assert.deepEqual(types(a),['noun','adverb']);
 chip(a,'adverb').click();a.el('search').value='leise';a.run('filterWords()');assert.deepEqual(visible(a),[lemma(a,'sessizce')]);
});

test('fast animation replacement, cancellation, reduced motion and missing animation support keep the real filter',()=>{
 const a=app({reducedMotion:false});a.unlock(['ev','gitmek'],{grammar:false});const saved=[...a.storage];
 chip(a,'noun').click();const first=a.animations.at(-1);assert.ok(visible(a).every(row=>row.classList.contains('noun')));
 chip(a,'verb').click();assert.equal(first.cancelled,true);assert.ok(visible(a).every(row=>row.classList.contains('verb')));
 a.run('AndreMotion.cancel()');assert.ok(a.animations.every(animation=>animation.cancelled));assert.equal(chip(a,'verb').getAttribute('aria-pressed'),'true');assert.equal(a.timers.size,0);assert.deepEqual([...a.storage],saved);
 a.el('wordList').animate=undefined;chip(a,'noun').click();assert.ok(visible(a).every(row=>row.classList.contains('noun')));
 const b=app();b.unlock(['ev'],{grammar:false});chip(b,'noun').click();assert.equal(b.animations.length,0);assert.ok(visible(b).every(row=>row.classList.contains('noun')));
});
