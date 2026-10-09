(function(root){
 'use strict';const W=AndreWords,P=AndreWordPreparation,V=AndreWordPictures,engine=SentenceGame.engine,model=new P.Preparation(root.localStorage);
 const el=id=>document.getElementById(id),make=(tag,cls,text='')=>{const e=document.createElement(tag);e.className=cls;e.textContent=text;return e;};
 let active=false,recognition=null,session=0,listening=false,selfCheck=false,audioPending=false,lastKey='';
 const panel=make('section','word-study');panel.id='wordStudy';panel.hidden=true;el('typingTrainer').append(panel);
 function button(label,action,cls='study-button'){const b=make('button',cls,label);b.type='button';b.addEventListener('click',()=>{if(!b.disabled)action();});return b;}
 const target=()=>engine.flow.finished?W.words.filter(w=>!engine.unlocked().has(w.id)).map(w=>w.id):engine.missingWords().map(w=>w.id),current=()=>model.state.current;
 function feedback(text){let f=el('wordStudyFeedback');if(!f){f=make('div','typing-feedback');f.id='wordStudyFeedback';panel.append(f);}f.textContent=[text,model.storageError,root.unlockStorageError].filter(Boolean).join(' ');}
 function cancelSpeech(){session++;try{recognition?.abort();}catch{}recognition=null;listening=false;root.speechSynthesis?.cancel();audioPending=false;}
 function say({pronunciation=false}={}){const cur=current();if(!cur)return;cancelSpeech();const synth=root.speechSynthesis;
  if(!synth||!root.SpeechSynthesisUtterance){feedback('Audio ist hier nicht verfügbar. Du kannst schriftlich weiterlernen.');return;}
  const word=W.byId[cur.id],token=session;audioPending=true;let index=0;
  const queue=pronunciation?[{text:word.tr,lang:'tr-TR'}]:[{text:word.tr,lang:'tr-TR'},{text:word.de,lang:'de-DE'}];
  const next=()=>{if(!active||token!==session||current()!==cur)return;if(index===queue.length){audioPending=false;if(pronunciation){cur.heard=true;model.save();draw();feedback('Jetzt nachsprechen.');}return;}
   const part=queue[index++],u=new root.SpeechSynthesisUtterance(part.text);u.lang=part.lang;u.rate=.82;const voice=synth.getVoices().find(v=>v.lang.toLowerCase().startsWith(part.lang.slice(0,2)));if(voice)u.voice=voice;
   u.onend=()=>pronunciation?next():root.setTimeout(next,300);u.onerror=()=>{if(!active||token!==session)return;audioPending=false;feedback('Audio konnte nicht abgespielt werden. Tippe zum erneuten Anhören.');};synth.speak(u);
  };next();
 }
 function next(){cancelSpeech();selfCheck=false;const raw=root.getUnlockProgress();let pending=false;for(const id of target()){const p=model.progress(id);if(p.tr&&p.de){raw[id]={toTurkish:true,toGerman:true};pending=true;}}if(pending&&!root.saveUnlockProgress(raw)){feedback(root.unlockStorageError);return;}model.next(target(),engine.unlocked());draw();root.refreshUnlockUI();if(current()?.phase==='spoken'&&!current().done)say({pronunciation:true});}
 function unknown(){const cur=current();if(!active||!cur||cur.done||cur.reveal)return;model.skip();draw();if(cur.phase!=='typing'){say();feedback(cur.phase==='spoken'?'Hör zu. Du übst dieses Wort später noch einmal.':'Hör zu. Das Bild kommt später wieder.');}}
 function listen(){const cur=current();if(!active||!cur||cur.phase!=='spoken'||cur.done||listening)return;
  const SR=root.SpeechRecognition||root.webkitSpeechRecognition;
  if(!cur.heard){feedback('Höre zuerst die türkische Aussprache an.');return;}
  if(!SR){selfCheck=true;draw();feedback('Sprachprüfung ist hier nicht verfügbar. Sprich selbst und vergleiche mit dem Audio.');return;}
  cancelSpeech();const token=session,id=cur.id;recognition=new SR();recognition.lang='tr-TR';recognition.interimResults=false;recognition.maxAlternatives=3;listening=true;feedback('Ich höre zu …');
  recognition.onresult=event=>{if(!active||token!==session||current()?.id!==id)return;listening=false;const alternatives=Array.from(event.results[0]||[]);let result;
   const exact=alternatives.find(x=>P.norm(x.transcript)===P.norm(W.byId[id].tr));const best=exact||alternatives[0];if(!best?.transcript){feedback('Nicht verstanden. Bitte noch einmal sprechen.');return;}
   result=model.spoken(best.transcript);draw();if(result.correct)feedback('Richtig gesagt.');else{say();feedback('Hör dir das Wort an und versuche es später erneut.');model.state.current.done=true;model.save();draw();feedback('Hör dir das Wort an und versuche es später erneut.');}
  };
  recognition.onerror=event=>{if(token!==session||!active)return;listening=false;
   if(['not-allowed','service-not-allowed','language-not-supported'].includes(event.error)){selfCheck=true;draw();feedback('Du kannst selbst sprechen und mit dem Audio vergleichen oder schriftlich üben.');}
   else feedback('Nicht verstanden. Bitte noch einmal sprechen.');
  };recognition.onend=()=>{if(token===session)listening=false;};try{recognition.start();}catch{listening=false;selfCheck=true;draw();feedback('Nutze das Audio zum Selbstprüfen.');}
 }
 function type(key){const cur=current();if(!active||cur?.phase!=='typing'||cur.done||cur.reveal)return;AndreAnswerEditor.edit(cur,key,200);model.save();AndreAnswerEditor.draw(el('wordStudyAnswer'),cur,{animate:true});el('wordStudyAnswer').classList.toggle('empty',!cur.draft);feedback('');}
 function check(){const cur=current();if(!active||!cur)return;if(cur.done||cur.reveal){if(cur.reveal){cur.done=true;model.save();}next();return;}if(cur.phase!=='typing'||!cur.draft.trim())return;
  const result=model.type(cur.draft);if(result.correct&&!cur.assisted)root.markUnlockDirection(cur.id,cur.direction==='tr'?'toTurkish':'toGerman');draw();feedback(result.correct?'Richtig.':result.reveal?'Nimm dir Zeit zum Lesen.':'Noch nicht richtig.');AndreMotion.feedback(el('wordStudyAnswer'),result.correct);
 }
 function textFallback(){const ids=target();for(const id of ids){const p=model.progress(id);p.spoken=true;if(!V.mapped(W.byId[id]))p.choice=true;p.speechMode='written-alternative';}model.state.current=null;model.save();next();}
 function draw(){const context=[current()?.id,current()?.phase,current()?.direction,current()?.done,current()?.reveal].join('|'),changed=context!==lastKey;lastKey=context;panel.replaceChildren();el('customKeyboard').style.display='none';const cur=current(),words=target();
  if(!cur){panel.append(make('h2','','Wörter bereit'),make('p','','Öffne deinen Grammatikpunkt und übe anschließend im Satzbau.'),button('Zur Grammatik',()=>{close();root.showView('grammar',null);}));return;}
  const word=W.byId[cur.id],missingPicture=!V.mapped(word),title={spoken:'Aussprache · Nachsprechen',choice:'Bild · Auswählen',typing:cur.direction==='tr'?'Deutsch → Türkisch':'Türkisch → Deutsch'}[cur.phase];
  panel.append(make('div','study-progress','Level '+engine.preparationLevel()+' · '+title));
  if(cur.phase==='choice'){const picture=make('div','word-picture',missingPicture?'':V.scene(word));picture.setAttribute('role','img');picture.setAttribute('aria-label','Bildaufgabe.');panel.append(picture);}
  if(missingPicture&&cur.phase==='choice'){panel.append(make('p','','Für dieses Wort fehlt noch ein eindeutiges Bild.'),button('Schriftlich lernen',textFallback,'study-button primary'));const f=make('div','typing-feedback');f.id='wordStudyFeedback';panel.append(f);return;}
  if(cur.phase==='typing'){panel.append(make('div','study-prompt',cur.direction==='tr'?word.de:word.tr));const answer=make('div','typing-answer'+(!cur.draft?' empty':''),cur.draft||'Antwort tippen …');answer.id='wordStudyAnswer';answer.tabIndex=0;answer.setAttribute('role','textbox');answer.setAttribute('aria-readonly','true');panel.append(answer);answer._saveCaret=()=>model.save();AndreAnswerEditor.draw(answer,cur,{editable:!cur.done&&!cur.reveal});
   if(cur.reveal){const solution=make('div','study-solution');solution.append(make('span','study-language','Türkisch'),make('strong','',word.tr),make('span','study-language','Deutsch'),make('strong','',word.de));panel.append(solution,button('Anhören',say),button('Weiter',check,'study-button primary'));}
   else{el('customKeyboard').style.display='grid';root.renderAppKeyboard(cur.direction==='tr'?'tr':'de',{keyboard:el('customKeyboard'),onType:type,onCheck:check,onSkip:unknown,checkLabel:cur.done?'Weiter':'Antwort prüfen',inputLocked:cur.done,reset:changed,contextKey:context});}
  }else if(cur.phase==='choice'){
   const options=make('div','study-options'),choices=model.choices(words,V.key);for(const choice of choices){const b=button(choice.tr,()=>{const result=model.choose(choice.id);draw();feedback(result.correct?'Richtig gewählt.':'Hör zu. Das Bild kommt später wieder.');if(!result.correct)say();},'study-option word-type-'+choice.type);b.disabled=cur.done;options.append(b);}panel.append(options);if(choices.length<4)panel.append(make('p','study-instruction',choices.length===1?'In dieser Gruppe lernst du ein neues Wort.':'Diese neue Wortgruppe hat '+choices.length+' verschiedene Antworten.'));if(cur.done)panel.append(button('Weiter',next,'study-button primary'));
  }else{
   panel.append(make('p','study-instruction','Höre die türkische Aussprache und sprich das Wort nach.'),button('🔊 Aussprache anhören',()=>say({pronunciation:true})));
   if(cur.done)panel.append(button('Weiter',next,'study-button primary'));
   else if(selfCheck){panel.append(button('Ich habe es richtig gesagt',()=>{model.spoken('',{manual:true});draw();},'study-button primary'),button('Noch üben',unknown));}
   else panel.append(button('🎙 Nachsprechen',listen,'study-button primary'),button('Keine Ahnung',unknown));
   panel.append(button('Schriftlich lernen',textFallback,'study-alternative'));
  }
  const f=make('div','typing-feedback',model.storageError||root.unlockStorageError||'');f.id='wordStudyFeedback';f.setAttribute('role','status');f.setAttribute('aria-live','polite');panel.append(f);
  if(cur.phase!=='typing'&&cur.assisted)panel.append(button('🔊 Noch einmal hören',say,'study-alternative'));
  if(cur.phase==='typing'&&!cur.reveal){const settings=make('details','study-settings'),heading=make('summary','study-alternative','Tastatur');settings.append(heading);for(const [key,label] of [['preview','Buchstabenvorschau'],['haptics','Kurze Vibration']]){const row=make('label','study-setting'),box=make('input','');box.type='checkbox';box.checked=AndreKeyboard.preferences[key];box.addEventListener('change',()=>AndreKeyboard.configure({[key]:box.checked}));row.append(box,make('span','',label));settings.append(row);}panel.append(settings);}if(cur.phase==='typing'&&!cur.reveal)el('wordStudyAnswer').focus({preventScroll:true});AndreMotion.enter(panel);
 }
 function open(){cancelSpeech();active=true;panel.hidden=false;const legacy=document.querySelector('#typingTrainer .typing-game-card');if(legacy)legacy.hidden=true;el('typingGameActive').style.display='none';el('typingComplete').classList.remove('show');
  const raw=root.getUnlockProgress();for(const id of target()){const p=model.progress(id),old=raw[id];if(old){p.tr||=old.toTurkish===true;p.de||=old.toGerman===true;}}next();}
 function close(){if(!active)return;cancelSpeech();active=false;panel.hidden=true;AndreKeyboard.cancel(el('customKeyboard'));el('customKeyboard').style.display='none';model.save();}
 root.startTypingGame=open;root.stopTypingGame=close;root.WordTrainer={open,close,next,type,check,unknown,listen,say,model,get active(){return active;}};
 document.addEventListener('keydown',event=>{if(!active||current()?.phase!=='typing'||event.isComposing||event.ctrlKey||event.metaKey||event.altKey||event.target.closest?.('input,textarea,select,[contenteditable=true]'))return;if(['Enter',' '].includes(event.key)&&event.target.closest?.('button'))return;
  if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();type(event.key);}else if(event.key==='Enter'){event.preventDefault();if(!event.repeat)check();}else if(event.key==='Backspace'){event.preventDefault();type('BACKSPACE');}else if(/^[\p{L}\p{N} '’-]$/u.test(event.key)){event.preventDefault();type(event.key);}});
 root.addEventListener('pagehide',close);
 const oldUpdate=root.updateUnlockButtons;root.updateUnlockButtons=function(){oldUpdate();const b=el('unlockFloatingButton');const required=target();b.hidden=currentMainView!=='dictionary'||el('cardsLearning').classList.contains('active')||el('typingTrainer').classList.contains('active');b.disabled=!required.length;b.textContent=engine.flow.finished&&required.length?'Weitere Wörter freischalten':'Wörter für Level '+engine.preparationLevel()+(required.length?' freischalten':' freigeschaltet');el('grammarUnlockFloatingButton').hidden=true;document.body.classList.toggle('without-unlock-button',b.hidden);};
 root.refreshUnlockUI();
})(window);
