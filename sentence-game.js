/* Browser adapter: all scoring and persistence live in lib/learning.js. */
(function(root){
  'use strict';
  const W=AndreWords,B=TurkishBlocks,C=AndreCurriculum,L=AndreLearning,G=AndreGrammar;
  const engine=new L.Engine();
  let running=false,activeGroup=null,selected=null,pendingCard=null,drag=null,advanceTimer=null,suppressUntil=0,bankPage=0;
  let training=false,trainingTask=null,trainingCurrent=null;
  const el=id=>document.getElementById(id);
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  const task=()=>{if(training)return trainingTask;const cur=engine.state.current,t=C.tasks.find(t=>t.id===cur?.taskId);return t?C.forLevel(t,cur.levelAtStart):null;};
  const current=()=>training?trainingCurrent:engine.state.current;
  const surface=token=>{try{return B.surface(token);}catch{return W.byId[token.lemma].tr+' · ?';}};
  const message=(text,kind='')=>{el('sentenceFeedback').textContent=text;el('sentenceFeedback').className='sentence-feedback '+kind;};
  const introduced=()=>new Set([...engine.state.introduced,...(current()?.kind==='intro'?task().skills:[])]);
  function allowedCards(){const known=engine.grammar.unlocked();return B.availableCards(task(),current(),training?C.skills.map(s=>s.id):[...introduced()],op=>known.has(G.key(op))||(training&&G.key(op)===trainingCurrent.entryId));}
  const fits=(token,card)=>B.fits(token,card);
  function selectTarget(card){
    const cur=current();
    return cur.tokens.find(t=>t.id===selected&&fits(t,card))||cur.tokens.filter(t=>t.group===activeGroup&&fits(t,card)).at(-1);
  }
  function save(){if(training){engine.grammar.state.current=trainingCurrent;return engine.grammar.save();}return engine.save();}
  function saveAndRender(focusId){save();render();if(focusId)el('sentenceToken-'+focusId)?.focus({preventScroll:true});}
  function apply(card,tokenId){
    if(!running||current()?.finished)return;
    card=allowedCards().find(c=>c.text===card.text);
    if(!card){pendingCard=null;render();return;}
    const token=tokenId?current().tokens.find(t=>t.id===tokenId):selectTarget(card);
    if(!token){pendingCard=card;render();message('Tippe auf das passende Wort.');return;}
    if(!fits(token,card)||!B.apply(token,card)){message('Diese Endung passt hier nicht.');return;}
    pendingCard=null;selected=token.id;if(token.group)activeGroup=token.group;saveAndRender(token.id);message('');
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
  function clearDrag(){
    const old=drag;drag=null;
    if(old){old.button.classList.remove('dragging');old.ghost?.remove();try{old.button.releasePointerCapture?.(old.pointer);}catch{}}
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
      clearDrag();
      suppressUntil=0;
      drag={payload,button,x:event.clientX,y:event.clientY,moved:false,pointer:event.pointerId};button.setPointerCapture?.(event.pointerId);
    });
    button.addEventListener('pointermove',event=>{
      if(!drag||drag.button!==button)return;
      if(!drag.moved&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>8){
        drag.moved=true;button.classList.add('dragging');
        const ghost=make('div',button.className.replace('dragging','')+' drag-ghost',button.textContent);
        ghost.setAttribute('aria-hidden','true');ghost.style.width=button.getBoundingClientRect().width+'px';document.body.append(ghost);drag.ghost=ghost;
      }
      if(!drag.moved)return;
      event.preventDefault?.();drag.ghost.style.left=event.clientX+'px';drag.ghost.style.top=event.clientY+'px';
      clearDropTargets();
      const target=dragDestination(event,payload);
      if(target?.word)target.word.classList.add('case-drop-over');else if(target?.group)target.group.classList.add('drag-over');else if(target?.bank)el('wordBank').classList.add('drag-over');
    });
    const end=event=>{
      if(!drag||drag.button!==button)return;
      const old=drag,target=event.type==='pointercancel'?null:dragDestination(event,payload);clearDrag();
      if(!old.moved)return;
      suppressUntil=Date.now()+350;
      if(target?.token)apply(target.card,target.token.id);
      else if(target?.group)moveToken(payload.token,target.group.dataset.sentenceGroup,target.beforeId);
      else if(target?.bank)moveToken(payload.token,null);
    };
    button.addEventListener('pointerup',end);button.addEventListener('pointercancel',end);button.addEventListener('lostpointercapture',()=>{if(drag?.button===button)clearDrag();});
  }
  function render(){
    const cur=current(),t=task();if(!cur||!t)return;
    if(!t.groups.some(g=>g.id===activeGroup))activeGroup=t.groups[0].id;
    el('sentenceLevelText').textContent=engine.state.level;
    el('sentenceLevelText').classList.toggle('long-level',engine.state.level>=100);
    el('sentenceLevelBadge').setAttribute('aria-label','Level '+engine.state.level);
    el('sentenceLevelBadge').hidden=training;
    el('sentenceTaskLabel').textContent=t.cefr+(t.register==='colloquial'?' · Alltag':'');
    el('sentenceTaskLabel').setAttribute('aria-label','Aufgabe '+t.cefr+', '+(t.register==='colloquial'?'Alltagssprache':'Standard'));
    el('sentenceModeLabel').textContent=training?'Grammatik freischalten':cur.assisted?'Mit Hilfe':cur.rated?'Korrektur':cur.kind==='intro'?'Einführung':cur.kind!=='current'?'Wiederholung':'';
    el('sentenceModeLabel').title=cur.rated?'Bereits gewertet; Korrekturen ohne Leveländerung':cur.kind==='current'&&!cur.assisted?'Erster Versuch zählt':'Ohne Levelwertung';
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
    el('sentenceStorageWarning').textContent=training?engine.grammar.error:engine.storageError;
    el('sentenceStorageWarning').hidden=!el('sentenceStorageWarning').textContent;
  }
  function start(){
    stop();running=true;sentenceGameRunning=true;
    next();
  }
  function stop(){
    running=false;sentenceGameRunning=false;clearTimeout(advanceTimer);advanceTimer=null;clearDrag();stopConfettiCelebration();
    if(training){save();training=false;el('sentenceBuilder').classList.remove('active');el('flashcards').append(el('sentenceBuilder'));el('grammarPanel').hidden=false;el('sentenceBackButton').textContent='← Lernspiele';el('sentenceLevelBadge').hidden=false;}
  }
  function next(){
    if(!running)return;
    if(training)return nextTraining();
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
    if(training){
      const result=unknown?{correct:false}:L.evaluate(task(),current().tokens);current().attempts++;
      if(result.correct){
        if(!engine.grammar.learn(current().entryId)){render();message(engine.grammar.error,'bad');return;}
        current().finished=true;save();renderGrammar();render();message('Freigeschaltet: '+G.byId[current().entryId].text,'ok');
        el('sentenceNextButton').focus({preventScroll:true});advanceTimer=setTimeout(()=>{if(running&&training)nextTraining();},1500);
      }else{save();render();message('Prüfe die Form und versuche es noch einmal.','bad');}
      return;
    }
    const result=engine.check({unknown});
    if(result.ignored)return;
    render();
    if(result.correct){
      message('Richtig!'+(result.delta>0?' Level '+result.level+'.':' Weiter ohne Leveländerung.'),'ok');
      const duration=celebrateCorrectAnswer();
      advanceTimer=setTimeout(()=>{if(running)next();},Math.max(1000,duration));
      el('sentenceNextButton').focus({preventScroll:true});
    }else{
      const issue=result.issue;
      const hints={word:'Prüfe die Wörter.',role:'Prüfe den Satzteil.',missing:'Es fehlt noch etwas.',extra:'Ein Wort ist zu viel.',grammar:'Prüfe die Endungen.'};
      message((hints[issue.area]||'Versuch es noch einmal.')+(result.delta<0?' Level '+result.level+'.':''),'bad');
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
  function grammarWord(word){
    const row=make('div','word-row '+word.type,'');row.dataset.grammarWord=word.id;
    row.classList.toggle('locked',!engine.unlocked().has(word.id));
    const text=make('div','','');text.append(make('div','word-de',word.de),make('div','word-tr',word.tr),make('span','type-badge '+word.type,typeNames[word.type]));row.append(text);return row;
  }
  function renderGrammar(){
    const list=el('grammarList'),known=engine.grammar.unlocked();list.replaceChildren();
    for(const [title,words] of [['Personalpronomen',W.words.filter(w=>w.type==='pronoun')],['Existenzwörter · var / yok',W.words.filter(w=>w.type==='existential')]]){
      const block=make('div','grammar-card '+(words[0]?.type==='pronoun'?'pronoun':'neutral'),'');block.append(make('h3','',title));
      const items=make('div','grammar-list','');words.forEach(w=>items.append(grammarWord(w)));block.append(items);list.append(block);
    }
    for(const [id,title] of Object.entries(G.groupNames)){
      const entries=G.entries.filter(e=>e.group===id).sort((a,b)=>a.min-b.min||a.label.localeCompare(b.label,'de')||a.text.localeCompare(b.text,'tr'));
      const block=make('details','grammar-card '+(id==='verbs'?'verb':id==='copula'?'adj':id==='cases'||id==='possession'?'noun':'neutral'),'');
      block.open=id==='cases';const count=entries.filter(e=>known.has(e.id)).length;
      block.append(make('summary','',title+' · '+count+' / '+entries.length));
      const items=make('div','grammar-list','');
      for(const e of entries){
        const row=make('button','word-row grammar-entry '+e.type,'');row.type='button';row.dataset.grammarEntry=e.id;row.classList.toggle('locked',!known.has(e.id));
        const text=make('div','','');text.append(make('div','word-de',e.label),make('div','word-tr',e.text));
        if(known.has(e.id)&&e.rule)text.append(make('div','standard',C.bySkill[e.rule].help));
        row.append(text);row.setAttribute('aria-label',e.label+' '+e.text+(known.has(e.id)?' · Freigeschaltet':' · Freischalten'));
        row.addEventListener('click',()=>{if(!known.has(e.id))openGrammarTraining(e.id);});items.append(row);
      }
      block.append(items);list.append(block);
    }
  }
  function nextTraining(entryId=null){
    clearTimeout(advanceTimer);advanceTimer=null;
    const saved=engine.grammar.state.current,words=engine.unlocked();
    const restore=!entryId&&saved&&!saved.finished?engine.grammar.exercise(saved.entryId,words,saved.levelAtStart||engine.state.level,saved.exerciseKey):null;
    const exercise=entryId?engine.grammar.exercise(entryId,words,engine.state.level):restore||engine.grammar.next(words,engine.state.level);
    if(!exercise){
      root.showView('grammar',null);renderGrammar();
      el('grammarStatus').textContent=engine.grammar.unlocked().size===G.entries.length?'Alles freigeschaltet.':'Für diese Variante brauchst du zuerst passende Wörter oder frühere Grammatikformen.';return;
    }
    trainingTask=exercise.task;
    const tokens=exercise.task.groups.flatMap(g=>g.slots).map((s,i)=>({id:'grammar-'+i,lemma:s.lemma,features:B.baseFeatures(s.lemma),nominal:s.nominal===true,group:null}));
    trainingCurrent={entryId:exercise.entryId,exerciseKey:exercise.key,levelAtStart:engine.state.level,id:1,bankSeed:17,attempts:0,finished:false,tokens};
    if(restore&&saved.exerciseKey===exercise.key){
      const loaded=Array.isArray(saved.tokens)?saved.tokens.map(L.cleanToken).filter(Boolean):[];
      if(loaded.length===tokens.length&&loaded.every((t,i)=>t.lemma===tokens[i].lemma&&[null,...exercise.task.groups.map(g=>g.id)].includes(t.group))){trainingCurrent={...trainingCurrent,levelAtStart:saved.levelAtStart,tokens:loaded};}
    }
    selected=null;pendingCard=null;activeGroup=null;bankPage=0;
    el('sentenceGameActive').style.display='';el('sentenceComplete').classList.remove('show');save();render();message('');el('sentencePrompt').focus({preventScroll:true});
  }
  function openGrammarTraining(entryId=null){
    root.showView('grammar',null);training=true;running=true;sentenceGameRunning=true;
    document.body.classList.add('learning-games-view','game-mode-active');el('grammarPanel').hidden=true;
    el('grammar').append(el('sentenceBuilder'));el('sentenceBuilder').classList.add('active');el('sentenceBackButton').textContent='← Grammatik';
    el('grammarUnlockFloatingButton').hidden=true;document.body.classList.add('without-unlock-button');nextTraining(entryId);
  }
  root.openGrammarTraining=openGrammarTraining;root.refreshGrammarUI=renderGrammar;
  root.leaveSentenceArea=()=>training?root.showView('grammar',null):root.backToLearnHome();
  root.startSentenceGame=start;root.stopSentenceGame=stop;root.nextSentence=next;root.checkSentence=()=>check(false);root.resetSentence=reset;
  root.SentenceGame={engine,start,stop,next,render,check,moveToken,apply,reset,allowedCards,removeSelected,get training(){return training;},get current(){return current();},get task(){return task();}};
  el('sentenceUnknownButton').addEventListener('click',()=>check(true));
  el('sentenceNextButton').addEventListener('click',next);
  root.addEventListener('resize',()=>{if(running){clearDrag();render();}});
  // Opening the game and switching sentence parts can change the available
  // bank height after render; fit its pages to the settled layout as well.
  if(root.ResizeObserver)new root.ResizeObserver(()=>{if(running&&!drag)render();}).observe(el('wordBank'));
  el('grammarUnlockFloatingButton').addEventListener('click',()=>openGrammarTraining());
  renderGrammar();
  root.addEventListener('pagehide',()=>{stop();engine.save();});
})(window);
