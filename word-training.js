(function(root){
 'use strict';const W=AndreWords,P=AndreWordPreparation,engine=SentenceGame.engine,model=new P.Preparation(root.localStorage);
 const el=id=>document.getElementById(id),make=(tag,cls,text='')=>{const e=document.createElement(tag);e.className=cls;e.textContent=text;return e;};
 const ADVANCE_DELAY=2000;
 let active=false,session=0,lastKey='',advanceTimer=null,advanceTask=null,advanceToken=0;
 const panel=make('section','word-study');panel.id='wordStudy';panel.hidden=true;el('typingTrainer').append(panel);
 function button(label,action,cls='study-button'){const b=make('button',cls,label);b.type='button';b.addEventListener('click',()=>{if(!b.disabled)action();});return b;}
 const target=()=>engine.flow.finished?W.words.filter(w=>!engine.unlocked().has(w.id)).map(w=>w.id):engine.missingWords().map(w=>w.id),current=()=>model.state.current;
 function feedback(text){let f=el('wordStudyFeedback');if(!f){f=make('div','typing-feedback');f.id='wordStudyFeedback';panel.append(f);}f.textContent=[text,model.storageError,root.unlockStorageError].filter(Boolean).join(' ');}
 function cancelSpeech(){session++;root.speechSynthesis?.cancel();}
 function cancelAdvance(){advanceToken++;if(advanceTimer!==null)root.clearTimeout(advanceTimer);advanceTimer=null;advanceTask=null;}
 function scheduleAdvance(){const cur=current();if(!active||document.hidden||!cur||(!cur.done&&!cur.reveal))return;
  if(advanceTimer!==null&&advanceTask===cur)return;cancelAdvance();advanceTask=cur;const token=advanceToken;
  advanceTimer=root.setTimeout(()=>{if(token!==advanceToken)return;advanceTimer=null;advanceTask=null;if(!active||document.hidden||current()!==cur||(!cur.done&&!cur.reveal))return;if(cur.reveal){cur.done=true;model.save();}next();},ADVANCE_DELAY);
 }
 function say(){const cur=current();if(!cur)return;cancelSpeech();const synth=root.speechSynthesis;
  if(!synth||!root.SpeechSynthesisUtterance){feedback('Audio nicht verfügbar.');return;}
  const word=W.byId[cur.id],token=session;let index=0;
  const queue=[{text:word.tr,lang:'tr-TR'},{text:word.de,lang:'de-DE'}];
  const next=()=>{if(!active||token!==session||current()!==cur||index===queue.length)return;
   const part=queue[index++],u=new root.SpeechSynthesisUtterance(part.text);u.lang=part.lang;u.rate=.82;const voice=synth.getVoices().find(v=>v.lang.toLowerCase().startsWith(part.lang.slice(0,2)));if(voice)u.voice=voice;
   u.onend=()=>root.setTimeout(next,300);u.onerror=()=>{if(!active||token!==session)return;feedback('Audio nicht verfügbar.');};synth.speak(u);
  };next();
 }
 function next(){cancelAdvance();cancelSpeech();const raw=root.getUnlockProgress();let pending=false;for(const id of target()){const p=model.progress(id);if(p.tr&&p.de){raw[id]={toTurkish:true,toGerman:true};pending=true;}}if(pending&&!root.saveUnlockProgress(raw)){feedback(root.unlockStorageError);return;}model.next(target(),engine.unlocked());draw();root.refreshUnlockUI();}
 function unknown(){const cur=current();if(!active||!cur||cur.done||cur.reveal)return;model.skip();draw();if(cur.phase!=='typing'){feedback('');say();}}
 function type(key){const cur=current();if(!active||cur?.phase!=='typing'||cur.done||cur.reveal)return;AndreAnswerEditor.edit(cur,key,200);model.save();AndreAnswerEditor.draw(el('wordStudyAnswer'),cur,{animate:true});el('wordStudyAnswer').classList.toggle('empty',!cur.draft);feedback('');}
 function check(){const cur=current();if(!active||!cur||cur.done||cur.reveal||cur.phase!=='typing'||!cur.draft.trim())return;
  const result=model.type(cur.draft);if(result.ignored)return;if(result.correct&&!cur.assisted)root.markUnlockDirection(cur.id,cur.direction==='tr'?'toTurkish':'toGerman');else if(!result.correct&&!cur.reveal)model.skip();draw();AndreMotion.feedback(el('wordStudyAnswer'),result.correct);
 }
 function answerResult(cur,word){
  const correct=!cur.assisted,result=make('section','study-result '+(correct?'correct':'incorrect'));
  result.id='wordStudyResult';result.setAttribute('role','status');result.setAttribute('aria-live','polite');result.setAttribute('aria-atomic','true');panel.append(result);
  const heading=make('div','study-result-heading');heading.append(make('strong','',correct?'Richtig':'Falsch'));
  if(!correct){const audio=button('Anhören',say,'study-button study-audio');audio.setAttribute('aria-label','Richtige Antwort anhören');heading.append(audio);}
  result.append(heading,make('p','study-result-answer',(correct?'':'Richtig ist: ')+word.tr+' = '+word.de));
  if(!correct)result.append(make('p','study-result-hint','Dieses Wort kommt noch einmal.'));
 }
 function draw(){const context=[current()?.id,current()?.phase,current()?.direction,current()?.done,current()?.reveal].join('|'),changed=context!==lastKey;lastKey=context;panel.replaceChildren();el('customKeyboard').style.display='none';const cur=current(),words=target();
  panel.classList.toggle('has-result',Boolean(cur&&(cur.done||cur.reveal)));
  if(cur&&(cur.done||cur.reveal))AndreKeyboard.cancel(el('customKeyboard'));
  if(!cur){panel.append(make('h2','','Wörter bereit'),button('Zur Grammatik',()=>{close();root.showView('grammar',null);}));return;}
  const word=W.byId[cur.id],title={choice:'Wortauswahl',typing:cur.direction==='tr'?'Deutsch → Türkisch':'Türkisch → Deutsch'}[cur.phase];
  panel.append(make('div','study-progress','Level '+engine.preparationLevel()+' · '+title));
  if(cur.phase==='choice'){const prompt=make('div','study-prompt study-word',word.de);prompt.setAttribute('lang','de');panel.append(prompt);}
  if(cur.phase==='typing'){panel.append(make('div','study-prompt',cur.direction==='tr'?word.de:word.tr));const answer=make('div','typing-answer'+(!cur.draft?' empty':''),cur.draft||'Antwort tippen …');answer.id='wordStudyAnswer';answer.tabIndex=0;answer.setAttribute('role','textbox');answer.setAttribute('aria-readonly','true');panel.append(answer);answer._saveCaret=()=>model.save();AndreAnswerEditor.draw(answer,cur,{editable:!cur.done&&!cur.reveal});
   if(cur.reveal){const solution=make('div','study-solution incorrect');solution.setAttribute('role','status');solution.append(make('strong','study-result-title','Falsch'),make('span','study-language','Türkisch'),make('strong','',word.tr),make('span','study-language','Deutsch'),make('strong','',word.de));panel.append(solution,button('Anhören',say));}
   else if(cur.done)answerResult(cur,word);
   else{el('customKeyboard').style.display='grid';root.renderAppKeyboard(cur.direction==='tr'?'tr':'de',{keyboard:el('customKeyboard'),onType:type,onCheck:check,onSkip:unknown,checkLabel:'Antwort prüfen',reset:changed,contextKey:context});}
  }else if(cur.phase==='choice'){
   const options=make('div','study-options'),choices=model.choices(words),selected=cur.selectedId||(cur.done&&!cur.assisted?cur.id:null);options.setAttribute('lang','tr');
   for(const choice of choices){
    const b=button(choice.tr,()=>{const result=model.choose(choice.id);if(result.ignored)return;draw();if(!result.correct)say();},'study-option word-type-'+choice.type);
    b.dataset.wordId=choice.id;b.setAttribute('aria-pressed',String(selected===choice.id));b.disabled=cur.done;
    if(cur.done){let label='';if(choice.id===cur.id){b.classList.add('is-correct');label=cur.assisted?'Richtige Antwort':'Richtig';}else if(choice.id===selected){b.classList.add('is-incorrect');label='Deine Auswahl: falsch';}
     if(label){const status=make('span','study-option-status',label);status.setAttribute('lang','de');b.append(status);}
    }options.append(b);
   }panel.append(options);if(cur.done)answerResult(cur,word);
  }
  const f=make('div','typing-feedback',model.storageError||root.unlockStorageError||'');f.id='wordStudyFeedback';f.setAttribute('role','status');f.setAttribute('aria-live','polite');panel.append(f);
  if(cur.phase==='typing'&&!cur.reveal&&!cur.done){const settings=make('details','study-settings'),heading=make('summary','study-alternative','Tastatur');settings.append(heading);for(const [key,label] of [['preview','Buchstabenvorschau'],['haptics','Kurze Vibration']]){const row=make('label','study-setting'),box=make('input','');box.type='checkbox';box.checked=AndreKeyboard.preferences[key];box.addEventListener('change',()=>AndreKeyboard.configure({[key]:box.checked}));row.append(box,make('span','',label));settings.append(row);}panel.append(settings);}if(cur.phase==='typing'&&!cur.reveal&&!cur.done)el('wordStudyAnswer').focus({preventScroll:true});AndreMotion.enter(panel);scheduleAdvance();
 }
 function open(){cancelSpeech();active=true;panel.hidden=false;const legacy=document.querySelector('#typingTrainer .typing-game-card');if(legacy)legacy.hidden=true;el('typingGameActive').style.display='none';el('typingComplete').classList.remove('show');
  const raw=root.getUnlockProgress();for(const id of target()){const p=model.progress(id),old=raw[id];if(old){p.tr||=old.toTurkish===true;p.de||=old.toGerman===true;}}next();}
 function close(){if(!active)return;cancelAdvance();cancelSpeech();active=false;panel.hidden=true;AndreKeyboard.cancel(el('customKeyboard'));el('customKeyboard').style.display='none';model.save();}
 root.startTypingGame=open;root.stopTypingGame=close;root.WordTrainer={open,close,next,type,check,unknown,say,model,get active(){return active;}};
 document.addEventListener('keydown',event=>{if(!active||current()?.phase!=='typing'||event.isComposing||event.ctrlKey||event.metaKey||event.altKey||event.target.closest?.('input,textarea,select,[contenteditable=true]'))return;if(['Enter',' '].includes(event.key)&&event.target.closest?.('button'))return;
  if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();type(event.key);}else if(event.key==='Enter'){event.preventDefault();if(!event.repeat)check();}else if(event.key==='Backspace'){event.preventDefault();type('BACKSPACE');}else if(/^[\p{L}\p{N} '’-]$/u.test(event.key)){event.preventDefault();type(event.key);}});
 root.addEventListener('pagehide',close);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAdvance();else scheduleAdvance();});
 const oldUpdate=root.updateUnlockButtons;root.updateUnlockButtons=function(){oldUpdate();const b=el('unlockFloatingButton');const required=target();b.hidden=currentMainView!=='dictionary'||el('cardsLearning').classList.contains('active')||el('typingTrainer').classList.contains('active');b.disabled=!required.length;b.textContent=engine.flow.finished&&required.length?'Weitere Wörter freischalten':'Wörter für Level '+engine.preparationLevel()+(required.length?' freischalten':' freigeschaltet');el('grammarUnlockFloatingButton').hidden=true;document.body.classList.toggle('without-unlock-button',b.hidden);};
 root.refreshUnlockUI();
})(window);
