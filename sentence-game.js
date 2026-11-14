/* Browser adapter: all scoring and persistence live in lib/learning.js. */
(function(root){
  'use strict';
  const W=AndreWords,B=TurkishBlocks,C=AndreCourse,L=AndreCourseLearning,G=AndreCourseGrammar;
  const engine=new L.Engine();
  const duel=root.AndreDuelView.create(engine),delivery=root.AndreLessonDelivery;
  let audioState="",audioGeneration=0;
  let running=false,activeGroup=null,selected=null,pendingCard=null,drag=null,advanceTimer=null,suppressUntil=0,bankPage=0,renderedTask=null,landingToken=null;
  const el=id=>document.getElementById(id);
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  const task=()=>engine.task();
  const current=()=>engine.state.current;
  const surface=token=>{try{return B.surface(token);}catch{return W.byId[token.lemma].tr+' · ?';}};
  const message=(text,kind='')=>{el('sentenceFeedback').textContent=text;el('sentenceFeedback').className='sentence-feedback '+kind;};
  const introduced=()=>new Set(['present','past','future','aorist','reported','accusative','dative','locative','ablative','genitive','instrumental',...(engine.state.standard?['otherPeople']:[])]);
  function allowedCards(){const known=engine.practiceGrammar();return B.availableCards(task(),current(),[...introduced()],op=>known.has(G.key(op)));}
  const fits=(token,card)=>B.fits(token,card);
  function selectTarget(card){
    const cur=current();
    const chosen=cur.tokens.find(t=>t.id===selected&&fits(t,card));if(chosen)return chosen;const candidates=cur.tokens.filter(t=>t.group===activeGroup&&fits(t,card));return candidates.length===1?candidates[0]:null;
  }
  function save(){return engine.save();}
  function saveAndRender(focusId){save();render();if(focusId)el('sentenceToken-'+focusId)?.focus({preventScroll:true});}
  function apply(card,tokenId,animateJoin=true){
    if(!running||current()?.finished)return;
    card=allowedCards().find(c=>c.text===card.text);
    if(!card){pendingCard=null;render();return;}
    const token=tokenId?current().tokens.find(t=>t.id===tokenId):selectTarget(card);
    if(!token){pendingCard=card;render();message('Tippe auf das passende Wort.');return;}
    if(!fits(token,card)){message('Diese Endung passt hier nicht.');return;}
    const joining=animateJoin?AndreMotion.snapshot([...el('wordBank').children].find(n=>n.dataset.turkishBlock===card.text)):null;
    if(!B.apply(token,card)){joining?.remove();message('Diese Endung passt hier nicht.');return;}
    root.AndreSound?.effect('click');pendingCard=null;selected=token.id;if(token.group)activeGroup=token.group;saveAndRender(token.id);message('');
    AndreMotion.land(joining,el('sentenceToken-'+token.id));
  }
  function moveToken(id,groupId,beforeId=null){
    if(!running||current()?.finished)return;
    const token=current().tokens.find(t=>t.id===id);if(!token)return;
    root.AndreSound?.effect('click');token.group=groupId;selected=id;if(groupId)activeGroup=groupId;
    const items=current().tokens;items.splice(items.indexOf(token),1);
    const index=beforeId?items.findIndex(t=>t.id===beforeId):-1;
    items.splice(index<0?items.length:index,0,token);bankPage=0;
    saveAndRender(id);
  }
  function activate(token){
    if(!running||current()?.finished)return;
    if(pendingCard){apply(pendingCard,token.id);return;}
    if(!token.group)moveToken(token.id,activeGroup||task().groups[0].id);
    else{
      if(B.undo(token)){selected=token.id;saveAndRender(token.id);message('');}
      else moveToken(token.id,null);
    }
  }
  function wordButton(token){
    const text=surface(token);
    const button=make('button','sentence-token word-type-'+W.byId[token.lemma].type,text);button.type='button';button.id='sentenceToken-'+token.id;
    button.dataset.modernToken=token.id;button.setAttribute('aria-pressed',String(selected===token.id));
    button.classList.toggle('is-selected',selected===token.id);button.disabled=current().finished;
    button.setAttribute('aria-label',text);
    button.addEventListener('click',event=>{if(event.detail&&Date.now()<suppressUntil)return;activate(token);});
    attachDrag(button,{token:token.id});return button;
  }
  function grammarButton(card){
    const button=make('button','sentence-grammar-card',card.text);button.type='button';button.setAttribute('aria-label',card.text);
    button.classList.toggle('sentence-wide-card',card.text.length>10);
    button.dataset.turkishBlock=card.text;
    button.setAttribute('aria-pressed',String(pendingCard?.text===card.text));
    button.addEventListener('click',event=>{if(event.detail&&Date.now()<suppressUntil)return;apply(card);});attachDrag(button,{card});return button;
  }
  function clearDropTargets(){
    for(const zone of [el('answerZone'),el('wordBank')]){
      zone.querySelectorAll('.drag-over').forEach(e=>e.classList.remove('drag-over'));
      zone.querySelectorAll('.case-drop-over').forEach(e=>e.classList.remove('case-drop-over'));zone.classList.remove('drag-over');
    }
  }
  function clearDrag(keepGhost=false){
    const old=drag;drag=null;
    if(old){old.button.classList.remove('dragging');if(!keepGhost)old.ghost?.remove();try{old.button.releasePointerCapture?.(old.pointer);}catch{}}
    clearDropTargets();
  }
  function dragDestination(event,payload){
    const under=document.elementFromPoint(event.clientX,event.clientY),word=under?.closest('[data-modern-token]'),group=under?.closest('[data-sentence-group]');
    if(payload.card){const token=current().tokens.find(t=>t.id===word?.dataset.modernToken);return token&&fits(token,payload.card)?{word,token,card:payload.card}:null;}
    const form=under?.closest('[data-turkish-block]');
    if(form){const card=allowedCards().find(c=>c.text===form.dataset.turkishBlock),token=current().tokens.find(t=>t.id===payload.token);return token&&card&&fits(token,card)?{word:form,token,card}:null;}
    if(group){
      const id=word?.dataset.modernToken,items=current().tokens.filter(t=>t.group===group.dataset.sentenceGroup&&t.id!==payload.token);
      let beforeId=id;
      if(word&&id!==payload.token){const r=word.getBoundingClientRect();if(event.clientX>=r.left+r.width/2)beforeId=items[items.findIndex(t=>t.id===id)+1]?.id||null;}
      return {group,beforeId};
    }
    if(under?.closest('#answerZone'))return {group:Array.from(el('answerZone').querySelectorAll('[data-sentence-group]')).find(g=>g.dataset.sentenceGroup===activeGroup)};
    return under?.closest('#wordBank')?{bank:true}:null;
  }
  function attachDrag(button,payload){
    button.addEventListener('pointerdown',event=>{
      if((event.button!==undefined&&event.button!==0)||!running||current()?.finished)return;
      AndreMotion.cancel();
      clearDrag();
      suppressUntil=0;
      const home=button.getBoundingClientRect();
      drag={payload,button,x:event.clientX,y:event.clientY,home,offsetX:event.clientX-home.left,offsetY:event.clientY-home.top,moved:false,pointer:event.pointerId};button.setPointerCapture?.(event.pointerId);
    });
    button.addEventListener('pointermove',event=>{
      if(!drag||drag.button!==button)return;
      if(!drag.moved&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>8){
        drag.moved=true;button.classList.add('dragging');
        const ghost=make('div',button.className.replace('dragging','')+' drag-ghost',button.textContent);
        ghost.setAttribute('aria-hidden','true');ghost.style.width=drag.home.width+'px';ghost.style.height=drag.home.height+'px';ghost.style.left='0';ghost.style.top='0';ghost.style.transformOrigin=drag.offsetX+'px '+drag.offsetY+'px';document.body.append(ghost);drag.ghost=ghost;
      }
      if(!drag.moved)return;
      event.preventDefault?.();drag.ghost.style.transform='translate3d('+(event.clientX-drag.offsetX)+'px,'+(event.clientY-drag.offsetY)+'px,0) scale(1.02)';
      clearDropTargets();
      const target=dragDestination(event,payload);
      if(target?.word)target.word.classList.add('case-drop-over');else if(target?.group)target.group.classList.add('drag-over');else if(target?.bank)el('wordBank').classList.add('drag-over');
    });
    const end=event=>{
      if(!drag||drag.button!==button)return;
      const old=drag,target=event.type==='pointercancel'?null:dragDestination(event,payload);clearDrag(true);
      if(!old.moved)return;
      suppressUntil=Date.now()+350;
      landingToken=target?.token?.id||payload.token;
      if(target?.token)apply(target.card,target.token.id,false);
      else if(target?.group)moveToken(payload.token,target.group.dataset.sentenceGroup,target.beforeId);
      else if(target?.bank)moveToken(payload.token,null);
      const destination=target?el('sentenceToken-'+(target.token?.id||payload.token)):null;
      landingToken=null;
      AndreMotion.land(old.ghost,destination,old.home,{hideTarget:!!destination});
    };
    button.addEventListener('pointerup',end);button.addEventListener('pointercancel',end);button.addEventListener('lostpointercapture',()=>{if(drag?.button===button)clearDrag();});
  }
  const reading=make('div','sentence-reading');reading.id='sentenceReading';reading.hidden=true;const readingAnswer=make('div','typing-answer empty','Antwort tippen …');readingAnswer.id='sentenceReadingAnswer';readingAnswer.tabIndex=0;readingAnswer.setAttribute('role','textbox');readingAnswer.setAttribute('aria-label','Türkische Antwort');readingAnswer.setAttribute('aria-readonly','true');const readingKeyboard=make('div','custom-keyboard');readingKeyboard.id='sentenceReadingKeyboard';readingKeyboard.hidden=true;reading.append(readingAnswer);el('sentenceBuilder').append(readingKeyboard);el('sentenceGameActive').insertBefore(reading,el('sentenceFeedback'));
  const readingOptions=make('div','sentence-reading-options','');reading.append(readingOptions);
  const listenActions=make('div','journey-listen-actions');
  const listenButton=make('button','study-button','Anhören');listenButton.id='sentenceListen';listenButton.type='button';listenButton.addEventListener('click',listen);
  const textButton=make('button','journey-text-button','Als Text');textButton.type='button';textButton.addEventListener('click',()=>{cancelAudio();const cur=current();if(cur&&!cur.finished){cur.delivery.text=true;save();render();}});
  listenActions.append(listenButton,textButton);reading.insertBefore(listenActions,readingAnswer);
  function cancelAudio(){audioGeneration++;audioState='';root.AndreSpeech?.cancel();}
  function listen(){const cur=current();if(!running||!cur||cur.finished||cur.delivery?.mode!=='listen')return;
    cancelAudio();const token=audioGeneration;root.AndreSpeech.play(cur.task.answer,{onState:state=>{
      if(!running||token!==audioGeneration||current()!==cur||document.hidden)return;
      audioState=state;if(state==='ended')cur.delivery.heard=true;
      if(state==='unavailable')cur.delivery.text=true;
      if(state==='ended'||state==='unavailable')save();render();
    }});
  }
  function soundChanged(){if(running&&root.AndreSound?.mode===0&&current()?.delivery?.mode==='listen'){cancelAudio();current().delivery.text=true;save();render();}}
  const stageBreak=el('sentenceStageBreak');stageBreak.hidden=true;
  function showStageBreak(){const stage=engine.stageSummary();clearDrag();readingKeyboard.hidden=true;AndreKeyboard.cancel(readingKeyboard);el('sentenceGameActive').style.display='none';el('sentenceComplete').classList.remove('show');stageBreak.hidden=false;stageBreak.replaceChildren();
    stageBreak.append(make('div','study-progress','Level '+engine.flow.level+' · Etappe '+stage.number),make('h2','','Etappe geschafft'),make('p','portion-detail',stage.correct+' von '+stage.done+' direkt richtig'));
    const proceed=make('button','study-button primary','Nächste Etappe');proceed.type='button';proceed.addEventListener('click',()=>{if(running&&engine.continueStage())next();});
    duel.checkpoint(stageBreak);
    const pause=make('button','study-button','Für heute fertig');pause.type='button';pause.addEventListener('click',()=>root.closeSentenceTest());stageBreak.append(proceed,pause);AndreMotion.enter(stageBreak);proceed.focus({preventScroll:true});
  }
  function typeReading(key){const cur=current();if(!running||cur?.delivery?.mode!=='write'||cur.finished)return;AndreAnswerEditor.edit(cur,key,500);save();AndreAnswerEditor.draw(readingAnswer,cur,{animate:true});readingAnswer.classList.toggle('empty',!cur.draft);message('');}
  function topicProgress(){const button=el('sentenceTestButton');if(button)button.setAttribute('aria-label','Mit André und Ben · alle Themen gemischt · '+(engine.state.started?'Weiterlernen':'Los geht’s'));}

  root.refreshSentenceTopics=topicProgress;
  function render(){
    root.updateProfileLevel();
    if(!stageBreak.hidden)return;
    const cur=current(),t=task();if(!cur||!t)return;
    const format=delivery.prepare(engine),mode=format.mode,options=format.options;
    const sameTask=renderedTask===cur.id;
    const oldPrompt=!sameTask?AndreMotion.snapshot(el('sentencePrompt')):null;
    const before=sameTask?AndreMotion.captureCards([...el('wordBank').children,...el('answerZone').querySelectorAll('.sentence-token')]):new Map();
    renderedTask=cur.id;
    if(!t.groups.some(g=>g.id===activeGroup))activeGroup=t.groups[0].id;
    el('sentenceLevelText').textContent=engine.state.level;
    el('sentenceLevelText').classList.toggle('long-level',engine.state.level>=100);
    el('sentenceLevelBadge').setAttribute('aria-label','Level '+engine.state.level);
    el('sentenceLevelBadge').hidden=true;
    el('sentenceTaskLabel').textContent=t.cefr+(t.register==='colloquial'?' · Alltag':'');
    el('sentenceTaskLabel').setAttribute('aria-label','Aufgabe '+t.cefr+', '+(t.register==='colloquial'?'Alltagssprache':'Standard'));
    const stage=engine.stageSummary();el('sentenceModeLabel').textContent=cur.assisted?'Mit Hilfe':cur.rated&&!cur.finished?'Korrektur':cur.free?'Freies Üben':cur.roundLevel!==engine.flow.level?'Runde beendet':cur.kind==='intro'?'Einführung '+Math.min(2,engine.round().intro+(cur.finished?0:1))+' / 2':cur.practice?'Freies Üben':'Etappe '+stage.number+' · '+stage.done+' / '+stage.total;
    el('sentenceModeLabel').textContent=delivery.names[mode]+' · '+el('sentenceModeLabel').textContent;
    el('sentenceModeLabel').title='Alle 23 Themen in beide Richtungen; 80 % direkt richtig und neue Formen dreimal je Richtung.';
    const listening=mode==='listen',canAnswer=!listening||format.heard||format.text;
    const scene=root.AndreInterestPractice.scenes[cur.roundTheme]||'An Mert';
    el('sentencePrompt').textContent=listening?(cur.finished||format.text?t.answer:'Hör genau hin'):t.de;
    el('sentencePromptDirection').textContent=listening?(format.text?'Türkisch → Deutsch':'Türkisch hören'):mode==='dialog'?'Mert · '+scene:mode==='write'?'An Mert · auf Türkisch':'Deutsch → Türkisch';
    reading.hidden=mode==='build';el('sentenceGameActive').classList.toggle('reading-mode',mode!=='build');
    el('sentenceGameActive').classList.toggle('reading-writing',mode==='write'&&!cur.finished);
    listenActions.hidden=!listening||cur.finished;listenButton.disabled=['loading','playing'].includes(audioState);
    listenButton.textContent=audioState==='loading'?'Lädt …':audioState==='playing'?'Wird vorgelesen …':format.heard?'Noch einmal hören':'Anhören';textButton.hidden=format.text;
    readingAnswer.hidden=mode!=='write';readingOptions.hidden=!options.length;readingOptions.replaceChildren();
    for(const text of options){const choice=make('button','study-option',text);choice.type='button';choice.disabled=cur.finished||!canAnswer;choice.setAttribute('lang',cur.direction==='de'?'de':'tr');choice.setAttribute('aria-pressed',String(cur.draft===text));
      if(cur.finished&&text===(cur.direction==='de'?t.de:t.answer))choice.classList.add('is-correct');
      choice.addEventListener('click',()=>{if(cur.finished||!canAnswer)return;cur.draft=text;save();check(false);});readingOptions.append(choice);
    }
    if(mode==='write'){AndreAnswerEditor.draw(readingAnswer,cur,{editable:!cur.finished});readingAnswer._saveCaret=save;readingAnswer.classList.toggle('empty',!cur.draft);readingKeyboard.hidden=cur.finished;root.renderAppKeyboard('tr',{keyboard:readingKeyboard,onType:typeReading,onCheck:()=>check(false),onSkip:()=>check(true),reset:!sameTask,contextKey:cur.id});}
    else{readingKeyboard.hidden=true;AndreKeyboard.cancel(readingKeyboard);}
    duel.render(el('sentenceGameActive'));
    topicProgress();
    const zone=el('answerZone');zone.replaceChildren();
    const tabs=make('div','sentence-group-tabs','');tabs.hidden=t.groups.length===1;
    for(const g of t.groups){
      const title=make('button','sentence-group-title',g.label);title.type='button';title.disabled=cur.finished;title.dataset.sentenceGroup=g.id;title.setAttribute('aria-pressed',String(activeGroup===g.id));
      title.title=g.ordered?'Reihenfolge beachten':'';
      title.addEventListener('click',()=>{activeGroup=g.id;selected=null;render();});
      tabs.append(title);
    }
    zone.append(tabs);
    for(const g of t.groups){
      const content=make('div','sentence-group-words','');content.dataset.sentenceGroup=g.id;content.hidden=g.id!==activeGroup;content.setAttribute('aria-label',g.label);
      for(const token of cur.tokens.filter(t=>t.group===g.id))content.append(wordButton(token));zone.append(content);
    }
    const bank=el('wordBank'),cards=allowedCards().flatMap(card=>Array(card.count).fill(card)),words=cur.tokens.filter(t=>!t.group);
    // Keep the word being inflected visible while paging through further endings.
    const anchor=words.find(t=>t.id===selected),remaining=words.filter(t=>t!==anchor),items=[];
    const wordOrder=B.shuffle(cur.tokens,(()=>{let seed=cur.bankSeed||cur.id||1;return()=>((seed=seed*16807%2147483647)-1)/2147483646;})()).filter(t=>!t.group&&t!==anchor);
    for(let i=0;i<Math.max(wordOrder.length,cards.length);i++){if(wordOrder[i])items.push({token:wordOrder[i]});if(cards[i])items.push({card:cards[i]});}
    bank.parentElement.hidden=cur.finished||mode!=='build';
    const short=root.matchMedia('(max-height:700px)').matches,height=bank.getBoundingClientRect().height;
    const size=Math.max(3,Math.min(18,Math.floor((height-(short?14:20)+(short?6:8))/((short?44:52)+(short?6:8)))*3));
    // Long concrete endings occupy two grid cells. Pack actual rows so the
    // page never clips its last card, including pages with an anchored word.
    const pageItems=[[]];let occupied=anchor?1:0;
    for(const item of items){
      const width=item.card?.text.length>10?2:1;
      let position=occupied%3+width>3?occupied+(3-occupied%3):occupied;
      if(position+width>size){pageItems.push([]);occupied=anchor?1:0;position=occupied;}
      pageItems.at(-1).push(item);occupied=position+width;
    }
    const pages=pageItems.length;bankPage=Math.min(bankPage,pages-1);
    bank.replaceChildren();if(anchor)bank.append(wordButton(anchor));
    for(const item of pageItems[bankPage])bank.append(item.token?wordButton(item.token):grammarButton(item.card));
    const pager=el('sentenceBankPages');pager.replaceChildren();pager.hidden=pages===1||cur.finished;
    for(const [label,step] of [['‹',-1],['›',1]]){
      const button=make('button','sentence-icon',label);button.type='button';button.setAttribute('aria-label',step<0?'Vorherige Wörter':'Weitere Wörter');button.disabled=step<0?bankPage===0:bankPage===pages-1;
      button.addEventListener('click',()=>{root.AndreSound?.effect('page');bankPage+=step;render();el('sentenceBankPages').children[step<0?0:2]?.focus({preventScroll:true});});pager.append(button);if(step<0)pager.append(make('span','',String(bankPage+1)+' / '+pages));
    }
    for(const id of ['checkSentenceButton','sentenceUnknownButton'])el(id).disabled=cur.finished;
    el('checkSentenceButton').hidden=cur.finished||mode!=='build';el('sentenceUnknownButton').hidden=cur.finished||mode==='write';
    el('sentenceNextButton').hidden=!cur.finished;
    el('sentenceStorageWarning').textContent=[engine.storageError,duel.model.storageError].filter(Boolean).join(' ');
    el('sentenceStorageWarning').hidden=!el('sentenceStorageWarning').textContent;
    AndreMotion.cards(before,[...el('wordBank').children,...el('answerZone').querySelectorAll('.sentence-token')].filter(node=>node.dataset.modernToken!==landingToken));
    if(!sameTask){
      AndreMotion.enter(el('sentencePrompt'));
      if(oldPrompt)AndreMotion.play(oldPrompt,[{opacity:1},{opacity:0}],{duration:160,cleanup:()=>oldPrompt.remove()});
    }
  }
  function start(){
    stop();running=true;sentenceGameRunning=true;root.AndreSound?.session(true);
    next();
  }
  function stop(){
    cancelAudio();root.AndreJourneyRewards?.cancel();duel.hide();readingKeyboard.hidden=true;AndreKeyboard.cancel(readingKeyboard);running=false;sentenceGameRunning=false;root.AndreSound?.session(false);clearTimeout(advanceTimer);advanceTimer=null;clearDrag();stopConfettiCelebration();
    if(root.GrammarTrainer?.active)root.GrammarTrainer.close(false);
  }
  function next(){
    if(!running)return;

    cancelAudio();root.AndreJourneyRewards?.cancel();clearTimeout(advanceTimer);advanceTimer=null;selected=null;pendingCard=null;activeGroup=null;bankPage=0;
    if(engine.wordsReady()&&engine.stageSummary().complete){showStageBreak();return;}
    stageBreak.hidden=true;
    if(engine.flow.automatic&&!engine.state.selectedTheme)delivery.mixed(engine);
    const cur=engine.next();
    for(const token of cur?.tokens||[])if(!Object.keys(token.features).length&&!token.form)token.features=B.baseFeatures(token.lemma);
    el('sentenceGameActive').style.display=cur?'':'none';el('sentenceComplete').classList.toggle('show',!cur);
    if(!cur){
      duel.hide();document.querySelector('#sentenceComplete h2').textContent='Noch keine Wörter freigeschaltet';
      document.querySelector('#sentenceComplete p').textContent='Schalte zuerst Wörter frei, damit sie hier erscheinen';
      const button=el('sentenceUnlockNeededButton');button.textContent='Benötigte Wörter freischalten';button.onclick=()=>openTypingFromFloating();
      return;
    }
    message(cur.finished?(cur.direction==='de'?cur.task.de:cur.task.answer):cur.attempts?'Korrigiere weiter.':'');render();
    (cur.finished?el('sentenceNextButton'):cur.delivery.mode==='write'?readingAnswer:cur.delivery.mode==='listen'?listenButton:cur.delivery.mode==='dialog'?readingOptions.children[0]:el('sentencePrompt')).focus({preventScroll:true});
    if(cur.delivery.mode==='listen'&&!cur.finished&&!cur.delivery.heard&&!cur.delivery.text){if(root.AndreSound?.mode)listen();else{cur.delivery.text=true;save();render();}}
    const needed=engine.missingWords();
    if(cur.kind!=='current'&&needed.length&&C.bandAt(engine.state.level).start>1)message('Wiederholung · neue Wörter im Worttrainer freischalten.');
  }
  function check(unknown=false){
    if(!running||!current()||current().finished)return;
    const previousSection=engine.state.opened;
    const previousHighest=engine.state.highestLevel;
    const duelBefore=duel.capture();
    const beforeProgress=root.AndreJourneyRewards?.capture();
    const result=delivery.check(engine,{unknown,answer:current().draft});
    if(result.ignored)return;
    cancelAudio();const cue=duel.record(duelBefore,result,{unknown});render();duel.animate(cue);root.AndreJourneyRewards?.victory(cue,beforeProgress);
    const sounds={hit:'duelHit',assist:'duelHit',win:'duelWin',hurt:'duelHurt',help:'duelHelp'};
    root.AndreSound?.effect(result.transition?.pass||result.delta>0?'level':sounds[cue?.action]||(result.correct?'correct':'retry'));
    if(result.correct){
      message(task().answer,'ok');
      if(result.delta>0)AndreMotion.feedback(el('sentenceLevelText'),true);
      const milestone=engine.state.opened>previousSection||(result.level===160&&result.delta>0&&previousHighest<160);
      if(milestone)celebrateCorrectAnswer();
      el('sentenceNextButton').focus({preventScroll:true});
    }else{
      if(unknown){message('Lösung: '+(current().direction==='de'?task().de:task().answer)+'. Weiter zum nächsten Satz.','bad');return;}
      const issue=current().delivery.mode==='build'?result.issue:{area:'grammar'};
      const hints={word:'Prüfe die Wörter.',role:'Prüfe den Satzteil.',missing:'Es fehlt noch etwas.',extra:'Ein Wort ist zu viel.',grammar:current().direction==='de'?'Prüfe die Bedeutung.':current().delivery.mode==='build'?'Prüfe die Endungen.':'Prüfe deinen Satz.'};
      message((hints[issue?.area]||'Versuch es noch einmal.')+(result.delta<0?' Level '+result.level+'.':''),'bad');
      // Error motion belongs to the arena; the answer stays still.
    }
  }
  function reset(){
    if(!running||current()?.finished)return;
    current().tokens.forEach(t=>{t.group=null;t.features=B.baseFeatures(t.lemma);delete t.form;delete t.attachments;});selected=null;pendingCard=null;bankPage=0;save();render();message('');
  }
  function removeSelected(clearOnly=false){
    const token=current()?.tokens.find(t=>t.id===selected);if(!token||current().finished)return;
    if(clearOnly){token.features=B.baseFeatures(token.lemma);delete token.form;delete token.attachments;}else token.group=null;
    saveAndRender(token.id);
  }
  root.leaveSentenceArea=()=>root.closeSentenceTest();
  root.startSentenceGame=start;root.stopSentenceGame=stop;root.nextSentence=next;root.checkSentence=()=>check(false);root.resetSentence=reset;
  root.SentenceGame={engine,duel,start,stop,next,render,check,moveToken,apply,reset,allowedCards,removeSelected,typeReading,topicProgress,listen,soundChanged,get training(){return false;},get current(){return current();},get task(){return task();}};
  const topicList=el('sentenceTopicList');
  const mixed=make('button','sentence-topic test','');mixed.id='sentenceTestButton';mixed.type='button';
  const hero=make('span','journey-hero');hero.setAttribute('aria-hidden','true');
  for(const [name,svg] of [['andre',AndreDuelArt.andre],['ben',AndreDuelArt.ben]]){const figure=make('span','journey-hero-'+name);figure.innerHTML=svg;hero.append(figure);}
  mixed.classList.add('journey-start');mixed.append(hero,make('strong','journey-title','Mit André & Ben'),make('span','journey-subtitle','Alle Themen · gemeinsam üben'),make('span','journey-start-label','Los geht’s'));
  mixed.addEventListener('click',()=>root.openSentenceTest(null));topicList.replaceChildren(mixed);
  root.updateProfileLevel();
  el('sentenceUnknownButton').addEventListener('click',()=>check(true));
  el('sentenceNextButton').addEventListener('click',next);
  root.addEventListener('resize',()=>{if(running){clearDrag();render();}});
  // Opening the game and switching sentence parts can change the available
  // bank height after render; fit its pages to the settled layout as well.
  if(root.ResizeObserver)new root.ResizeObserver(()=>{if(running&&!drag)render();}).observe(el('wordBank'));
  document.addEventListener('keydown',event=>{if(!running||current()?.delivery?.mode!=='write'||current().finished||event.isComposing||event.ctrlKey||event.metaKey||event.altKey)return;if(event.target?.closest?.('button')&&['Enter',' '].includes(event.key))return;
    if(event.key==='Enter'){event.preventDefault();if(!event.repeat)check(false);}else if(event.key==='Backspace'){event.preventDefault();typeReading('BACKSPACE');}else if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||Array.from(event.key||'').length===1){event.preventDefault();typeReading(event.key);}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAudio();else if(running)render();});
  root.addEventListener('pagehide',()=>{stop();engine.save();});
})(window);
