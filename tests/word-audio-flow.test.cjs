const {test}=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./helpers/app.cjs'),{study,type}=require('./helpers/word-study.cjs');
function installAudio(a){a.run(`window.utterances=[];window.cancels=0;window.speechSynthesis={getVoices:()=>[{lang:'tr-TR'},{lang:'de-DE'}],speak:u=>utterances.push(u),cancel(){cancels++;}};window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};`);}
function finishPair(a){a.run('utterances.at(-1).onend()');a.advance(180);assert.equal(a.run('utterances.at(-1).lang'),'de-DE');a.advance(2400);assert.equal(a.run('WordTrainer.model.state.current.done||WordTrainer.model.state.current.reveal'),true);a.run('utterances.at(-1).onend()');a.advance(679);assert.equal(a.run('WordTrainer.model.state.current.done||WordTrainer.model.state.current.reveal'),true);a.advance(1);assert.equal(a.run('WordTrainer.model.state.current.done||WordTrainer.model.state.current.reveal'),false);}

test('new settings enable effects and haptics but no music; saved mute and haptics-off survive',()=>{
 const a=app();assert.equal(a.run('AndreSound.mode'),1);assert.equal(a.run('AndreKeyboard.preferences.haptics'),true);assert.equal(a.el('soundToggle').textContent,'Ton an');
 a.el('soundToggle').click();a.el('soundToggle').click();a.run('AndreKeyboard.configure({haptics:false})');const b=app({storage:a.storage});assert.equal(b.run('AndreSound.mode'),0);assert.equal(b.run('AndreKeyboard.preferences.haptics'),false);
});

test('both correct and wrong choices wait for Turkish AND German before advancing once',()=>{
 for(const correct of [true,false]){const a=app();installAudio(a);a.run('openLearnMode("typing")');const id=a.run('WordTrainer.model.state.current.id'),w=a.json('AndreWords.byId[WordTrainer.model.state.current.id]');
  a.el('wordStudy').querySelectorAll('.study-option').find(b=>(b.dataset.wordId===id)===correct).click();assert.equal(a.run('utterances.length'),0);a.advance(180);assert.equal(a.run('utterances[0].text'),w.tr);a.advance(3000);assert.equal(a.run('utterances.length'),1);assert.equal(a.run('WordTrainer.model.state.current.id'),id);assert.equal(a.run('WordTrainer.model.state.current.done'),true);
  finishPair(a);assert.equal(a.run('utterances[1].text'),w.de);const next=a.json('WordTrainer.model.state.current');a.run('utterances[0].onend();utterances[1].onend()');a.advance(5000);assert.deepEqual(a.json('WordTrainer.model.state.current'),next);assert.equal(a.run('utterances.length'),2);
 }
});

test('written answers in either direction pronounce the solution on success and failure',()=>{
 for(const direction of ['tr','de'])for(const correct of [true,false]){const a=study({direction});installAudio(a);const cur=a.json('WordTrainer.model.state.current'),w=a.json('AndreWords.byId[WordTrainer.model.state.current.id]');type(a,correct?(direction==='tr'?w.tr:w.deAnswers[0]):'Quatsch');a.run('WordTrainer.check()');a.advance(3000);assert.equal(a.run('WordTrainer.model.state.current.id'),cur.id);assert.equal(a.run('utterances[0].lang'),'tr-TR');assert.equal(a.run('utterances[0].text'),w.tr);assert.equal(a.run('WordTrainer.model.state.current.assisted'),!correct);finishPair(a);assert.equal(a.run('utterances[1].text'),w.de);
 }
});

test('muting cancels automatic speech, keeps the result briefly, and stale events cannot skip ahead',()=>{
 const a=app();installAudio(a);a.run('openLearnMode("typing");WordTrainer.unknown()');a.advance(180);a.el('soundToggle').click();a.el('soundToggle').click();assert.equal(a.run('AndreSound.mode'),0);const cur=a.json('WordTrainer.model.state.current');a.run('utterances[0].onend()');a.advance(1999);assert.deepEqual(a.json('WordTrainer.model.state.current'),cur);a.advance(1);assert.equal(a.run('WordTrainer.model.state.current.done'),false);assert.equal(a.run('utterances.length'),1);a.run('WordTrainer.unknown()');a.advance(2000);assert.equal(a.run('utterances.length'),1);
});

test('background audio restarts safely, and a missing completion event cannot trap the learner',()=>{
 const a=app();installAudio(a);a.run('openLearnMode("typing");WordTrainer.unknown()');a.advance(180);const cur=a.json('WordTrainer.model.state.current');a.document.hidden=true;a.document.dispatchEvent({type:'visibilitychange'});a.advance(20000);assert.deepEqual(a.json('WordTrainer.model.state.current'),cur);a.document.hidden=false;a.document.dispatchEvent({type:'visibilitychange'});a.run('utterances[0].onend()');a.advance(180);assert.equal(a.run('utterances.length'),2);a.advance(15000);assert.match(a.el('wordStudyFeedback').textContent,/Audio nicht verfügbar/);a.advance(2000);assert.equal(a.run('WordTrainer.model.state.current.done'),false);assert.equal(a.run('utterances.length'),2);
});

test('dictionary speakers appear only after unlock, play once even while muted, and cancel on leaving',()=>{
 const a=app({storage:new Map([['andreSoundModeV1','0']])});installAudio(a);const row=a.rows.find(r=>r.dataset.wordId===a.run('AndreWords.byLemma.ev.id')),id=row.dataset.wordId,b=row.querySelector('.word-listen');assert.ok(b.hidden&&b.disabled);b.click();assert.equal(a.run('utterances.length'),0);a.unlock([id],{grammar:false});assert.equal(b.hidden,false);assert.equal(b.disabled,false);const progress=a.storage.get('andreTurkishUnlockProgressV1');b.click();assert.equal(a.run('utterances.length'),1);assert.equal(a.run('utterances[0].text'),'ev');assert.equal(b.getAttribute('aria-pressed'),'true');a.advance(2000);assert.equal(a.run('utterances.length'),1);a.run('utterances[0].onend()');assert.equal(b.getAttribute('aria-pressed'),'false');b.click();assert.equal(a.run('utterances.length'),2);b.click();assert.equal(b.getAttribute('aria-pressed'),'false');assert.equal(a.run('utterances.length'),2);b.click();a.run('showView("grammar",null)');assert.equal(b.getAttribute('aria-pressed'),'false');a.run('utterances[2].onend()');assert.equal(a.storage.get('andreTurkishUnlockProgressV1'),progress);
});

test('dictionary speech errors are visible, search cancels playback, and switching words has no overlap',()=>{
 const a=app();installAudio(a);const ids=a.json('[AndreWords.byLemma.ev.id,AndreWords.byLemma.araba.id]');a.unlock(ids,{grammar:false});const rows=ids.map(id=>a.rows.find(r=>r.dataset.wordId===id)),buttons=rows.map(r=>r.querySelector('.word-listen'));buttons[0].click();buttons[1].click();assert.equal(buttons[0].getAttribute('aria-pressed'),'false');assert.equal(buttons[1].getAttribute('aria-pressed'),'true');a.run('utterances[0].onend();utterances[1].onerror()');assert.match(rows[1].textContent,/Audio nicht verfügbar/);buttons[1].click();assert.equal(rows[1].querySelector('.word-audio-status'),null);a.el('search').value='Kein passendes Wort';a.run('AndreDictionary.filter()');assert.equal(buttons[1].getAttribute('aria-pressed'),'false');a.advance(20000);assert.equal(a.run('utterances.length'),3);
});
