/* Browser adapter: all scoring and persistence live in lib/learning.js. */
(function(root){
  'use strict';
  const W=AndreWords,B=TurkishBlocks,C=AndreCourse,L=AndreCourseLearning,G=AndreCourseGrammar;
  const engine=new L.Engine();
  let running=false,activeGroup=null,selected=null,pendingCard=null,drag=null,advanceTimer=null,suppressUntil=0,bankPage=0,renderedTask=null,landingToken=null;
  const el=id=>document.getElementById(id);
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  const task=()=>engine.task();
  const current=()=>engine.state.current;
  const surface=token=>{try{return B.surface(token);}catch{return W.byId[token.lemma].tr+' · ?';}};
  const message=(text,kind='')=>{el('sentenceFeedback').textContent=text;el('sentenceFeedback').className='sentence-feedback '+kind;};
  const introduced=()=>new Set(['present','past','future','aorist','reported','accusative','dative','locative','ablative','genitive','instrumental',...(engine.state.standard?['otherPeople']:[])]);
  function allowedCards(){const known=engine.grammar.unlocked();return B.availableCards(task(),current(),[...introduced()],op=>known.has(G.key(op)));}
  const fits=(token,card)=>B.fits(token,card);
  function selectTarget(card){
    const cur=current();
    return cur.tokens.find(t=>t.id===selected&&fits(t,card))||cur.tokens.filter(t=>t.group===activeGroup&&fits(t,card)).at(-1);
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
    pendingCard=null;selected=token.id;if(token.group)activeGroup=token.group;saveAndRender(token.id);message('');
    AndreMotion.land(joining,el('sentenceToken-'+token.id));
  }
  function moveToken(id,groupId,beforeId=null){
    if(!running||current()?.finished)return;
    const token=current().tokens.find(t=>t.id===id);if(!token)return;
    token.group=groupId;selected=id;if(groupId)activeGroup=groupId;
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
  function render(){
    root.updateProfileLevel();
    const cur=current(),t=task();if(!cur||!t)return;
    const sameTask=renderedTask===cur.id;
    const oldPrompt=!sameTask?AndreMotion.snapshot(el('sentencePrompt')):null;
    const before=sameTask?AndreMotion.captureCards([...el('wordBank').children,...el('answerZone').querySelectorAll('.sentence-token')]):new Map();
    renderedTask=cur.id;
    if(!t.groups.some(g=>g.id===activeGroup))activeGroup=t.groups[0].id;
    el('sentenceLevelText').textContent=engine.state.level;
    el('sentenceLevelText').classList.toggle('long-level',engine.state.level>=100);
    el('sentenceLevelBadge').setAttribute('aria-label','Level '+engine.state.level);
    el('sentenceLevelBadge').hidden=false;
    el('sentenceTaskLabel').textContent=t.cefr+(t.register==='colloquial'?' · Alltag':'');
    el('sentenceTaskLabel').setAttribute('aria-label','Aufgabe '+t.cefr+', '+(t.register==='colloquial'?'Alltagssprache':'Standard'));
    el('sentenceModeLabel').textContent=cur.assisted?'Mit Hilfe':cur.rated?'Korrektur':cur.kind==='intro'?'Einführung':cur.kind!=='current'?'Wiederholung':'';
    el('sentenceModeLabel').title='Satzbau übt dein gelerntes Sprachlevel.';
    el('sentencePrompt').textContent=t.de;
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
    const wordOrder=B.shuffle(remaining,(()=>{let seed=cur.bankSeed||cur.id||1;return()=>((seed=seed*16807%2147483647)-1)/2147483646;})());
    for(let i=0;i<Math.max(wordOrder.length,cards.length);i++){if(wordOrder[i])items.push({token:wordOrder[i]});if(cards[i])items.push({card:cards[i]});}
    bank.parentElement.hidden=cur.finished;
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
      button.addEventListener('click',()=>{bankPage+=step;render();el('sentenceBankPages').children[step<0?0:2]?.focus({preventScroll:true});});pager.append(button);if(step<0)pager.append(make('span','',String(bankPage+1)+' / '+pages));
    }
    for(const id of ['checkSentenceButton','sentenceUnknownButton'])el(id).disabled=cur.finished;
    el('checkSentenceButton').hidden=cur.finished;el('sentenceUnknownButton').hidden=cur.finished;
    el('sentenceNextButton').hidden=!cur.finished;
    el('sentenceStorageWarning').textContent=engine.storageError;
    el('sentenceStorageWarning').hidden=!el('sentenceStorageWarning').textContent;
    AndreMotion.cards(before,[...el('wordBank').children,...el('answerZone').querySelectorAll('.sentence-token')].filter(node=>node.dataset.modernToken!==landingToken));
    if(!sameTask){
      AndreMotion.enter(el('sentencePrompt'));
      if(oldPrompt)AndreMotion.play(oldPrompt,[{opacity:1},{opacity:0}],{duration:160,cleanup:()=>oldPrompt.remove()});
    }
  }
  function start(){
    stop();running=true;sentenceGameRunning=true;
    next();
  }
  function stop(){
    running=false;sentenceGameRunning=false;clearTimeout(advanceTimer);advanceTimer=null;clearDrag();stopConfettiCelebration();
    if(root.GrammarTrainer?.active)root.GrammarTrainer.close(false);
  }
  function next(){
    if(!running)return;

    clearTimeout(advanceTimer);advanceTimer=null;selected=null;pendingCard=null;activeGroup=null;bankPage=0;
    const cur=engine.next();
    for(const token of cur?.tokens||[])if(!Object.keys(token.features).length&&!token.form)token.features=B.baseFeatures(token.lemma);
    el('sentenceGameActive').style.display=cur?'':'none';el('sentenceComplete').classList.toggle('show',!cur);
    if(!cur){
      const empty=engine.unlocked().size===0;
      const missingGrammar=!empty?engine.missingGrammar():[];
      document.querySelector('#sentenceComplete h2').textContent=empty?'Noch keine Wörter freigeschaltet':missingGrammar.length?'Grammatik für den nächsten Schritt':'Wörter für den nächsten Schritt';
      const needed=engine.missingWords();
      document.querySelector('#sentenceComplete p').textContent=!empty&&needed.length?'Schalte diese Wörter frei: '+needed.map(w=>w.tr+' ('+w.de+')').join(', ')+'.':'Schalte zuerst Wörter frei, damit sie hier erscheinen';
      const button=el('sentenceUnlockNeededButton');button.textContent=missingGrammar.length?'Benötigte Grammatik freischalten':'Benötigte Wörter freischalten';
      button.onclick=()=>missingGrammar.length?openGrammarTraining():openTypingFromFloating();
      if(missingGrammar.length)document.querySelector('#sentenceComplete p').textContent='Schalte zuerst Grammatik frei, damit du diese Sätze bilden kannst.';
      return;
    }
    message(cur.attempts?'Korrigiere weiter.':'');render();
    el('sentencePrompt').focus({preventScroll:true});
    const needed=engine.missingWords();
    if(cur.kind!=='current'&&needed.length&&C.bandAt(engine.state.level).start>1)message('Wiederholung · neue Wörter im Worttrainer freischalten.');
  }
  function check(unknown=false){
    if(!running||!current()||current().finished)return;
    const previousSection=engine.state.opened;
    const previousHighest=engine.state.highestLevel;
    const result=engine.check({unknown});
    if(result.ignored)return;
    render();
    if(result.correct){
      message('Richtig!','ok');
      AndreMotion.feedback(el('answerZone'),true);
      if(result.delta>0)AndreMotion.feedback(el('sentenceLevelText'),true);
      const milestone=engine.state.opened>previousSection||(result.level===160&&result.delta>0&&previousHighest<160);
      const duration=milestone?celebrateCorrectAnswer():800;
      advanceTimer=setTimeout(()=>{if(running)next();},Math.max(1000,duration));
      el('sentenceNextButton').focus({preventScroll:true});
    }else{
      const issue=result.issue;
      const hints={word:'Prüfe die Wörter.',role:'Prüfe den Satzteil.',missing:'Es fehlt noch etwas.',extra:'Ein Wort ist zu viel.',grammar:'Prüfe die Endungen.'};
      message((hints[issue.area]||'Versuch es noch einmal.')+(result.delta<0?' Level '+result.level+'.':''),'bad');
      AndreMotion.feedback(el('answerZone'),false);
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
  root.SentenceGame={engine,start,stop,next,render,check,moveToken,apply,reset,allowedCards,removeSelected,get training(){return false;},get current(){return current();},get task(){return task();}};
  const topicList=el('sentenceTopicList');
  const mixed=make('button','sentence-topic test','');mixed.id='sentenceTestButton';mixed.type='button';
  mixed.append(make('span','','Alles gemischt'),make('span','sentence-topic-arrow','›'));
  mixed.addEventListener('click',()=>root.openSentenceTest(null));topicList.append(mixed);
  for(const topic of root.AndreInterestGenerator.themes){
    const button=make('button','sentence-topic','');button.type='button';button.dataset.sentenceTopic=topic.id;
    button.style.background='var(--'+(topic.color==='lavender'?'lavender':topic.color+'-soft')+')';
    button.append(make('span','',topic.title),make('span','sentence-topic-arrow','›'));
    button.addEventListener('click',()=>root.openSentenceTest(topic.id));topicList.append(button);
  }
  root.updateProfileLevel();
  el('sentenceUnknownButton').addEventListener('click',()=>check(true));
  el('sentenceNextButton').addEventListener('click',next);
  root.addEventListener('resize',()=>{if(running){clearDrag();render();}});
  // Opening the game and switching sentence parts can change the available
  // bank height after render; fit its pages to the settled layout as well.
  if(root.ResizeObserver)new root.ResizeObserver(()=>{if(running&&!drag)render();}).observe(el('wordBank'));
  root.addEventListener('pagehide',()=>{stop();engine.save();});
})(window);
