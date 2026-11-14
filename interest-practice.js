/* Minimal view adapter for the optional interest-based practice. */
(function(root){
 'use strict';const $=id=>document.getElementById(id),model=new AndreInterestPractice.Practice({engine:SentenceGame.engine}),names={build:'Satzbau',listen:'Hören',dialog:'Dialog',write:'Schreiben'};
 const answerNode=$('practiceAnswer');let active=false,audio='',lastTheme=null;
 const el=(tag,cls,text)=>{const node=document.createElement(tag);node.className=cls||'';if(text!==undefined)node.textContent=text;return node;};
 function button(text,action,cls='practice-button'){const b=el('button',cls,text);b.type='button';b.addEventListener('click',()=>{if(!b.disabled)action();});return b;}
 function refreshTopics(){if(model.mode()==='build')return;for(const b of $('sentenceTopicList').children){const status=b.querySelector('.sentence-topic-arrow'),key=model.mode()+'|'+(b.dataset.sentenceTopic||'mixed'),count=model.state.stats[key]?.direct||0;if(status)status.textContent=count?'✓ '+count:'›';}}
 function modes(){const bar=$('practiceModes');bar.replaceChildren();bar.hidden=true;}
 function close(){active=false;root.AndreSpeech?.cancel();root.AndreKeyboard?.cancel($('practiceKeyboard'));$('practiceKeyboard').hidden=true;$('interestPractice').classList.remove('active','practice-writing');refreshTopics();}
 function open(theme=null,fresh=false){lastTheme=theme||null;root.showView('flashcards',null);active=true;audio='';model.open(model.mode(),lastTheme,{fresh});
  $('sentenceTopics').hidden=true;document.body.classList.add('learning-games-view','game-mode-active');$('interestPractice').classList.add('active');render();root.AndreMotion?.enter($('interestPractice'));$('practiceBack').focus({preventScroll:true});
 }
 function speak(text){root.AndreSpeech.play(text,{onState:state=>{if(!active)return;audio=state;if(state==='ended'&&model.current?.mode==='listen')model.heard();render();}});}
 function next(){root.AndreSpeech.cancel();audio='';model.next();render();$('practicePrompt').focus({preventScroll:true});}
 function check(answer){const result=model.check(answer);if(result.ignored||result.empty)return;root.AndreSpeech.cancel();if(result.correct)root.AndreSound?.effect('correct');else if(!result.unknown&&!result.duplicate)root.AndreSound?.effect('retry');render();}
 function edit(key){const t=model.task();if(!active||!t||t.done)return;t.unknown=false;t.duplicate=false;AndreAnswerEditor.edit(t,key,240);model.save();
  // Keep held backspace and caret gestures attached to the same keyboard.
  drawAnswer(t,true);$('practiceFeedback').textContent='';$('practiceKeep').hidden=true;showStorage();
 }
 function drawAnswer(t,animate=false){AndreAnswerEditor.draw(answerNode,t,{animate,editable:!t.done});answerNode._saveCaret=()=>model.save();}
 function showStorage(){$('practiceStorage').textContent=model.storageError||'';$('practiceStorage').hidden=!model.storageError;}
 function render(){if(!active)return;const s=model.current,t=model.task(),body=$('practiceBody'),actions=$('practiceActions'),feedback=$('practiceFeedback'),keyboard=$('practiceKeyboard');
  body.replaceChildren();actions.replaceChildren();feedback.textContent='';$('practiceKeep').hidden=true;keyboard.hidden=true;$('interestPractice').classList.remove('practice-writing');showStorage();
  const title=AndreInterestGenerator.themes.find(x=>x.id===s?.theme)?.title||'Alles gemischt';
  $('practiceCaption').textContent=s?`${names[s.mode]} · ${s.finished?'Fertig':`${s.index+1}/${s.tasks.length}`} · Level ${s.level}`:names[model.mode()];
  const prompt=$('practicePrompt');prompt.textContent=s?title:'Noch keine Wörter freigeschaltet';
  if(!s){body.append(el('p','practice-muted','Schalte zuerst Wörter frei, damit sie hier erscheinen'));actions.append(button('Benötigte Wörter freischalten',()=>root.openLearnMode('typing')));return;}
  if(s.finished){prompt.textContent=s.mode==='write'?'Nachricht gespeichert':'Kleine Runde geschafft';
   const direct=s.tasks.filter(x=>x.correct&&!x.assisted).length;
   body.append(el('p','practice-muted',s.mode==='write'?`${s.tasks.length} ${s.tasks.length===1?'Satz':'Sätze'} · nur für dich gespeichert`:`${direct}/${s.tasks.length} ohne Hilfe · freiwillige Übung`));
   if(s.mode==='write'){
    // A single sentence per page keeps the fixed surface readable, including B2.
    s.review=Math.min(s.review||0,s.tasks.length-1);const line=s.tasks[s.review];body.append(el('p','practice-message',line.answer||line.draft));
    if(line.unverified)body.append(el('p','practice-muted','Noch nicht sicher geprüft'));
    if(s.tasks.length>1)body.append(button(`Satz ${s.review+1}/${s.tasks.length} · weiter`,()=>{s.review=(s.review+1)%s.tasks.length;model.save();render();},'practice-link'));
   }
   actions.append(button('Zur Themenauswahl',()=>root.closeSentenceTest()),button('Noch eine Runde',()=>open(lastTheme,true),'practice-link'));return;
  }
  $('practiceCaption').textContent+=` · ${t.target.cefr}`;
  const scene=AndreInterestPractice.scenes[s.theme||t.target.theme]||'Eine Nachricht an Mert';
  const typed=s.mode==='write'||t.options.length<2;
  if(s.mode==='listen'){
   body.append(el('p','practice-context',scene));const play=button(audio==='playing'?'Wird vorgelesen …':audio==='loading'?'Stimme wird geladen …':t.heard?'Noch einmal hören':'Anhören',()=>speak(t.target.tr),'practice-play');play.disabled=['playing','loading'].includes(audio);body.append(play);
   if(t.text||t.done){const tr=el('p','practice-message',t.target.tr);tr.setAttribute('lang','tr');body.append(tr);}
   if(audio==='unavailable')body.append(el('p','practice-muted','Türkische Stimme nicht verfügbar'));
   if(!t.text&&!t.done)body.append(button('Als Text üben',()=>{root.AndreSpeech.cancel();model.reveal();render();},'practice-link'));
  }else if(s.mode==='dialog'){
   body.append(el('p','practice-context',scene));
   if(t.partner){const partner=el('p','practice-message','Mert: '+t.partner.tr);partner.setAttribute('lang','tr');body.append(partner);}
   else body.append(el('p','practice-muted','Mert wartet auf deine Nachricht.'));
   body.append(el('p','practice-intent','Du möchtest sagen: '+t.target.de));
  }else{
   prompt.textContent='An Mert · '+title;body.append(el('p','practice-context',scene));
   body.append(el('p','practice-muted',s.tasks.length===1?'Ein kurzer Satz auf Türkisch.':`Satz ${s.index+1}/${s.tasks.length} · erzähl weiter.`));
   if(t.example){body.append(el('p','practice-intent',t.target.de));const example=el('p','practice-example',t.target.tr);example.setAttribute('lang','tr');body.append(example);}
   else if(!t.done)body.append(button('Eine Idee',()=>{model.reveal();render();},'practice-link'));
  }
  if(!typed){const options=el('div','practice-options');t.options.forEach(option=>{const text=option[s.mode==='listen'?'de':'tr'],b=button(text,()=>check(text),'practice-option');b.setAttribute('lang',s.mode==='listen'?'de':'tr');b.disabled=t.done||(s.mode==='listen'&&!t.heard&&!t.text);if(t.done&&option.tr===t.target.tr){b.classList.add('correct');b.textContent='✓ '+text;b.setAttribute('aria-label','Richtige Antwort: '+text);}options.append(b);});body.append(options);}
  else{
   answerNode.hidden=false;body.append(answerNode);drawAnswer(t);answerNode.setAttribute('lang',s.mode==='listen'?'de':'tr');
   if(!t.done&&(s.mode!=='listen'||t.heard||t.text)){
    keyboard.hidden=false;$('interestPractice').classList.add('practice-writing');root.renderAppKeyboard(s.mode==='listen'?'de':'tr',{keyboard,onType:edit,onCheck:()=>check(t.draft),checkLabel:s.mode==='write'?'Satz prüfen':'Antwort prüfen',contextKey:'practice:'+s.created+':'+s.index});
   }
  }
  if(t.done){feedback.textContent=t.unverified?'Ungeprüft gespeichert':t.correct?(t.assisted?'Mit Hilfe gelöst':'Passt!'):'Die passende Antwort ist markiert.';
   if(typed&&!t.correct&&!t.unverified)feedback.textContent='Passend: '+t.target.de;
   actions.append(button(s.index+1===s.tasks.length?'Runde abschließen':'Weiter',next));
  }else if(t.unknown){feedback.textContent='Diesen Satz kann ich noch nicht sicher prüfen.';$('practiceKeep').hidden=false;}
  else if(t.duplicate)feedback.textContent='Dieser Satz steht schon in deiner Nachricht.';
  if(t.text)feedback.textContent=feedback.textContent?feedback.textContent+' · Textübung':'Textübung · kein Hörnachweis';
 }
 $('practiceBack').addEventListener('click',()=>root.closeSentenceTest());$('practiceKeep').addEventListener('click',()=>{if(model.keep())render();});
 document.addEventListener('keydown',event=>{const t=model.task(),s=model.current;if(!active||!s||s.finished||!t||t.done||!(s.mode==='write'||t.options.length<2)||(s.mode==='listen'&&!t.heard&&!t.text)||event.ctrlKey||event.metaKey||event.altKey)return;
  if(event.key==='Enter'){event.preventDefault();check(t.draft);}else if(event.key==='Backspace'){event.preventDefault();edit('BACKSPACE');}else if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||Array.from(event.key||'').length===1){event.preventDefault();edit(event.key);}
 });
 root.SkillPractice={model,open,close,render,check,next,refreshTopics,get active(){return active;},get mode(){return model.mode();}};modes();
})(window);
