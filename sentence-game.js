/* Browser adapter: all scoring and persistence live in lib/learning.js. */
(function(root){
  'use strict';
  const W=AndreWords,T=Turkish,C=AndreCurriculum,L=AndreLearning;
  const engine=new L.Engine();
  let running=false,activeGroup=null,selected=null,drag=null,advanceTimer=null,dragSuppressed=false;
  const el=id=>document.getElementById(id);
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  const task=()=>C.tasks.find(t=>t.id===engine.state.current?.taskId);
  const current=()=>engine.state.current;
  const message=(text,kind='')=>{el('sentenceFeedback').textContent=text;el('sentenceFeedback').className='sentence-feedback '+kind;};
  const labels={case:{bare:'Grundform',accusative:'Akkusativ · -(y)ı/i/u/ü',dative:'Dativ · -(y)a/e',locative:'Lokativ · -da/de/ta/te',ablative:'Ablativ · -dan/den/tan/ten',genitive:'Genitiv · -(n)ın/in/un/ün',instrumental:'Mit · -(y)la/le'},
    tense:{infinitive:'Infinitiv · -mak/mek',present:'Präsens · -iyor',past:'Vergangenheit · -di',reported:'Berichtet · -miş',future:'Zukunft · -acak/ecek',aorist:'Gewohnheit · Aorist',necessity:'Müssen · -malı/meli',conditional:'Bedingung · -sa/se',imperative:'Aufforderung',optative:'Wunsch',ma:'Handlung · -ma/me',dik:'Abhängiger Inhalt · -DIK',acak:'Zukünftiger Inhalt · -AcAK',an:'Handelnder · -an/en',ip:'Und dann · -ip',ince:'Sobald · -ince',arak:'Indem · -erek/arak',madan:'Ohne · -madan/meden',ken:'Während · -ken'},
    person:{ben:'Person · ich',sen:'Person · du',o:'Person · er/sie/es',biz:'Person · wir',siz:'Person · ihr/Sie',onlar:'Person · sie (Plural)'},
    poss:{ben:'Besitz · mein',sen:'Besitz · dein',o:'Besitz · sein/ihr',biz:'Besitz · unser',siz:'Besitz · euer/Ihr',onlar:'Besitz · ihr (Plural)'},
    voice:{active:'Aktiv',passive:'Passiv',reflexive:'Auf sich selbst',reciprocal:'Miteinander',causative:'Veranlassen'},
    register:{standard:'Standardform',colloquial:'Alltagsform'}};
  const introduced=()=>new Set([...engine.state.introduced,...(current()?.kind==='intro'?task().skills:[])]);
  function allowedCards(){
    const t=task(), slots=t.groups.flatMap(g=>g.slots), rules=introduced(), cards=[];
    const has=(key)=>slots.some(s=>Object.hasOwn(s.features,key));
    const append=(field,values)=>values.forEach(value=>cards.push({field,value,label:labels[field]?.[value]||String(value)}));
    const cases=['bare'];
    for(const name of ['accusative','dative','locative','ablative','genitive','instrumental'])if(rules.has(name)||slots.some(s=>s.features.case===name))cases.push(name);
    if(slots.some(s=>['noun','pronoun'].includes(W.byId[s.lemma].type))&&has('case'))append('case',cases);
    const people=rules.has('otherPeople')?T.people:T.people.slice(0,4);
    if(has('poss')){cards.push({field:'poss',value:null,label:'Ohne Besitzendung'});append('poss',people);}
    if(has('plural')){cards.push({field:'plural',value:false,label:'Einzahl'},{field:'plural',value:true,label:'Mehrzahl · -lar/ler'});}
    if(slots.some(s=>W.byId[s.lemma].type==='verb')){
      const ts=new Set(['infinitive']);
      const map={present:'present',past:'past',reported:'reported',future:'future',aorist:'aorist',necessity:'necessity',conditional:'conditional',imperative:'imperative',optative:'optative',nominalMa:'ma',nominalDik:'dik',nominalFuture:'acak',relativeAn:'an',ip:'ip',ince:'ince',arak:'arak',ken:'ken'};
      for(const [rule,value] of Object.entries(map))if(rules.has(rule))ts.add(value);
      for(const s of slots)if(s.features.tense)ts.add(s.features.tense);
      append('tense',[...ts].filter(tense=>slots.some(s=>s.features.tense===tense)||['infinitive','present','past','future'].includes(tense)).slice(-7));
    }
    if(has('person'))append('person',people);
    if(has('predicatePerson'))people.forEach(value=>cards.push({field:'predicatePerson',value,label:'Satzperson · '+labels.person[value].replace('Person · ', '')}));
    if(has('negative'))cards.push({field:'negative',value:false,label:'Bejahung'},{field:'negative',value:true,label:'Verneinung · -ma/me'});
    if(has('question'))cards.push({field:'question',value:false,label:'Aussage'},{field:'question',value:true,label:'Frage · mı/mi/mu/mü'});
    if(has('ability'))cards.push({field:'ability',value:false,label:'Ohne Können'},{field:'ability',value:true,label:'Können · -(y)abil/ebil'});
    if(has('past'))cards.push({field:'past',value:false,label:'Gegenwart'},{field:'past',value:true,label:'War · -(y)di'});
    if(has('voice'))append('voice',['active',...new Set(slots.map(s=>s.features.voice).filter(Boolean))]);
    if(t.register==='colloquial')append('register',['standard','colloquial']);
    return cards;
  }
  function fits(token,card){
    const type=W.byId[token.lemma].type;
    if(['tense','ability','negative','voice','register'].includes(card.field))return type==='verb';
    if(['person','question','past'].includes(card.field))return type==='verb'||token.nominal;
    if(card.field==='predicatePerson')return type==='noun';
    return ['noun','pronoun'].includes(type)||(type==='verb'&&['ma','dik','acak'].includes(token.features.tense));
  }
  function selectTarget(card){
    const cur=current();
    return cur.tokens.find(t=>t.id===selected&&t.group&&fits(t,card))||cur.tokens.filter(t=>t.group===activeGroup&&fits(t,card)).at(-1);
  }
  function saveAndRender(focusId){engine.save();render();if(focusId)el('sentenceToken-'+focusId)?.focus({preventScroll:true});}
  function apply(card,tokenId){
    if(!running||current()?.finished)return;
    const token=tokenId?current().tokens.find(t=>t.id===tokenId):selectTarget(card);
    if(!token||!fits(token,card)){message('Setze zuerst ein passendes Wort in den gewählten Satzteil.');return;}
    if(card.value===null||card.value==='active')delete token.features[card.field];else token.features[card.field]=card.value;
    selected=token.id;activeGroup=token.group;saveAndRender(token.id);
  }
  function moveToken(id,groupId,beforeId=null){
    if(!running||current()?.finished)return;
    const token=current().tokens.find(t=>t.id===id);if(!token)return;
    token.group=groupId;selected=id;if(groupId)activeGroup=groupId;
    if(beforeId&&beforeId!==id){
      const items=current().tokens;items.splice(items.indexOf(token),1);items.splice(items.findIndex(t=>t.id===beforeId),0,token);
    }
    saveAndRender(id);
  }
  function activate(token){
    if(!running||current()?.finished)return;
    if(!token.group)moveToken(token.id,activeGroup||task().groups[0].id);
    else{selected=token.id;activeGroup=token.group;render();el('sentenceToken-'+token.id)?.focus({preventScroll:true});}
  }
  function wordButton(token){
    let surface;
    try{surface=T.surface(token);}catch{surface=W.byId[token.lemma].tr+' · Form nicht möglich';}
    const button=make('button','sentence-token '+W.byId[token.lemma].type,surface);button.type='button';button.id='sentenceToken-'+token.id;
    button.dataset.modernToken=token.id;button.setAttribute('aria-pressed',String(selected===token.id&&!!token.group));
    button.classList.toggle('is-selected',selected===token.id&&!!token.group);button.disabled=current().finished;
    button.setAttribute('aria-label',surface+(token.group?': auswählen, danach Endung ändern oder zurücklegen':': in '+task().groups.find(g=>g.id===activeGroup)?.label+' einsetzen'));
    button.addEventListener('click',()=>{if(dragSuppressed){dragSuppressed=false;return;}activate(token);});
    attachDrag(button,{token:token.id});return button;
  }
  function attachDrag(button,payload){
    button.addEventListener('pointerdown',event=>{
      if(event.button!==0||!running||current()?.finished)return;
      drag={payload,button,x:event.clientX,y:event.clientY,moved:false,pointer:event.pointerId};button.setPointerCapture?.(event.pointerId);
    });
    button.addEventListener('pointermove',event=>{
      if(!drag||drag.button!==button)return;
      if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>10){drag.moved=true;button.style.opacity='.55';}
    });
    const end=event=>{
      if(!drag||drag.button!==button)return;
      const old=drag;drag=null;button.style.opacity='';
      if(event.type==='pointercancel')return;
      if(!old.moved)return;
      dragSuppressed=true;
      const under=document.elementFromPoint(event.clientX,event.clientY);
      const targetToken=under?.closest('[data-modern-token]')?.dataset.modernToken;
      const targetGroup=under?.closest('[data-sentence-group]')?.dataset.sentenceGroup;
      if(payload.card&&targetToken)apply(payload.card,targetToken);
      else if(payload.token&&targetGroup)moveToken(payload.token,targetGroup,targetToken);
      else if(payload.token&&under?.closest('#wordBank'))moveToken(payload.token,null);
      setTimeout(()=>{dragSuppressed=false;},0);
    };
    button.addEventListener('pointerup',end);button.addEventListener('pointercancel',end);
  }
  function render(){
    const cur=current(),t=task();if(!cur||!t)return;
    if(!t.groups.some(g=>g.id===activeGroup))activeGroup=t.groups[0].id;
    const band=C.bandAt(engine.state.level);
    el('sentenceLevelText').textContent=engine.state.level;
    el('sentenceLevelText').classList.toggle('long-level',engine.state.level>=100);
    el('sentenceLevelBadge').setAttribute('aria-label','Level '+engine.state.level);
    el('sentenceTaskLabel').textContent='Aufgabe · '+t.cefr+' · '+(t.register==='colloquial'?'Alltagssprache':'Standard');
    const modes={intro:'Einführung · ohne Levelwertung',current:'Levelaufgabe · erster Versuch zählt',targeted:'Gezielte Wiederholung · ohne Levelwertung',older:'Ältere Übung · ohne Levelwertung'};
    el('sentenceModeLabel').textContent=cur.rated&&cur.kind==='current'?'Bereits gewertet · Korrekturen ohne Leveländerung':cur.assisted&&cur.kind==='current'?'Mit Hilfe · ohne weitere Levelwertung':modes[cur.kind];
    el('sentenceLevelProgressText').textContent=band.title+' · Level '+band.start+'–'+band.end;
    el('sentenceChapterFill').style.width=((engine.state.level-band.start+1)/(band.end-band.start+1)*100)+'%';
    el('sentenceChapterBar').setAttribute('aria-valuenow',engine.state.level);el('sentenceChapterBar').setAttribute('aria-valuemin',band.start);el('sentenceChapterBar').setAttribute('aria-valuemax',band.end);
    el('sentencePrompt').textContent=t.de;
    const intro=el('sentenceLesson');intro.hidden=cur.kind!=='intro';
    if(cur.kind==='intro'){
      el('sentenceLessonTitle').textContent=C.bySkill[cur.target].title;
      el('sentenceLessonText').textContent=C.bySkill[cur.target].help;
      el('sentenceLessonSample').textContent=t.answer+'.';
    }
    const zone=el('answerZone');zone.replaceChildren();
    for(const g of t.groups){
      const section=make('div','sentence-group','');section.dataset.sentenceGroup=g.id;section.classList.toggle('is-active',activeGroup===g.id);
      const title=make('button','sentence-group-title',g.label+(g.ordered?' · Reihenfolge beachten':''));title.type='button';title.disabled=cur.finished;title.setAttribute('aria-pressed',String(activeGroup===g.id));
      title.addEventListener('click',()=>{activeGroup=g.id;selected=null;render();});
      const content=make('div','sentence-group-words','');for(const token of cur.tokens.filter(t=>t.group===g.id))content.append(wordButton(token));
      section.append(title,content);zone.append(section);
    }
    const bank=el('wordBank');bank.replaceChildren();for(const token of cur.tokens.filter(t=>!t.group))bank.append(wordButton(token));
    const grammar=el('grammarBank');grammar.replaceChildren();
    for(const id of ['wordBank','grammarBank','sentenceWordLabel','sentenceGrammarLabel','sentenceEditHint'])el(id).hidden=cur.finished;
    for(const card of allowedCards()){
      const button=make('button','sentence-grammar-card',card.label);button.type='button';button.disabled=cur.finished;
      button.addEventListener('click',()=>{if(dragSuppressed){dragSuppressed=false;return;}apply(card);});attachDrag(button,{card});grammar.append(button);
    }
    for(const id of ['checkSentenceButton','sentenceHintButton','sentenceUnknownButton','sentenceResetButton','sentenceRemoveButton','sentenceClearEndings'])el(id).disabled=cur.finished;
    el('sentenceRemoveButton').disabled=cur.finished||!cur.tokens.some(t=>t.id===selected&&t.group);
    el('sentenceClearEndings').disabled=el('sentenceRemoveButton').disabled;
    el('sentenceNextButton').hidden=!cur.finished;
    el('sentenceStorageWarning').textContent=engine.storageError;
    el('sentenceStorageWarning').hidden=!engine.storageError;
    const coverage=engine.coverageReport();
    const names=list=>list.map(c=>labels.case[c].split(' · ')[0]).join(', ')||'keine';
    el('sentenceCoverageText').textContent=engine.state.level<40?'Alle verfügbaren Fälle werden ab Level 40 regelmäßig wiederholt.':'In der aktuellen Übungsfolge bereits geprüft: '+names(coverage.covered)+'. Noch einzuplanen: '+names(coverage.missing)+'. Noch nicht verfügbar: '+names(coverage.unavailable)+'.';
  }
  function start(){
    stop();running=true;sentenceGameRunning=true;
    next();
  }
  function stop(){
    running=false;sentenceGameRunning=false;clearTimeout(advanceTimer);advanceTimer=null;drag=null;stopConfettiCelebration();
  }
  function next(){
    if(!running)return;
    clearTimeout(advanceTimer);advanceTimer=null;selected=null;activeGroup=null;
    const cur=engine.next();
    el('sentenceGameActive').style.display=cur?'flex':'none';el('sentenceComplete').classList.toggle('show',!cur);
    if(!cur){
      document.querySelector('#sentenceComplete h2').textContent='Wörter für den nächsten Schritt';
      const needed=engine.missingWords();
      document.querySelector('#sentenceComplete p').textContent=needed.length?'Schalte diese Wörter frei: '+needed.map(w=>w.tr+' ('+w.de+')').join(', ')+'.':'Schalte zuerst Wörter wie ev und güzel im Worttrainer frei.';
      return;
    }
    message(cur.attempts?'Dein erster Versuch ist bereits gewertet. Korrigiere den Satz ohne weitere Leveländerung.':'');render();
    el('sentencePrompt').focus({preventScroll:true});
    const needed=engine.missingWords();
    if(cur.kind!=='current'&&needed.length&&C.bandAt(engine.state.level).start>1)message('Für neue Levelaufgaben fehlen noch Wörter: '+needed.map(w=>w.tr).join(', ')+'. Diese Wiederholung ist ohne Levelwertung.');
  }
  function check(unknown=false){
    if(!running||!current()||current().finished)return;
    const result=engine.check({unknown});
    if(result.ignored)return;
    render();
    if(result.correct){
      const missing=engine.missingSkills();
      message('Richtig!'+(result.delta>0?' Level '+result.level+'.':result.direct&&result.kind==='current'&&missing.length&&engine.state.level===C.bandAt(engine.state.level).end?' Für den nächsten Abschnitt üben wir noch: '+missing.map(s=>s.title).join(', ')+'.':' Weiter üben, ohne zusätzliche Leveländerung.'),'ok');
      const duration=celebrateCorrectAnswer();
      advanceTimer=setTimeout(()=>{if(running)next();},Math.max(1000,duration));
      el('sentenceNextButton').focus({preventScroll:true});
    }else{
      const issue=result.issue;
      const hints={word:'Ein Wort passt noch nicht zur Bedeutung.',role:'Ein Wort steht im falschen Satzteil.',missing:'Es fehlt noch ein Baustein oder eine Verbform.',extra:'Ein Baustein ist zu viel.',grammar:'Eine Endung oder Verbform passt noch nicht.'};
      message((hints[issue.area]||'Prüfe die Bausteine.')+(issue.group?' Satzteil: '+issue.group+'.':'')+(result.delta<0?' Level '+result.level+'.':'')+' Du kannst korrigieren oder einen Hinweis öffnen.','bad');
    }
  }
  function reset(){
    if(!running||current()?.finished)return;
    current().tokens.forEach(t=>{t.group=null;t.features={};});selected=null;engine.save();render();
    message('Satz zurückgesetzt. Die bisherige Wertung bleibt erhalten.');
  }
  function hint(){if(!running)return;const text=engine.hint();if(text){render();message(text);}}
  function removeSelected(clearOnly=false){
    const token=current()?.tokens.find(t=>t.id===selected);if(!token||current().finished)return;
    if(clearOnly)token.features={};else token.group=null;
    saveAndRender(token.id);
  }
  function backupPanel(){
    const home=el('learnHome'),panel=make('details','sentence-storage','');
    panel.append(make('summary','','Lernstand sichern'));
    panel.append(make('p','','Dein Fortschritt bleibt in diesem Browser. Mit einer Sicherung kannst du Wörter und Satzbau auf einem anderen Gerät übernehmen.'));
    const actions=make('div','sentence-storage-actions',''),status=make('div','sentence-storage-status','');status.setAttribute('role','status');
    const exp=make('button','','Sicherung herunterladen'),imp=make('button','','Sicherung auswählen'),reset=make('button','','Satzbau zurücksetzen');
    for(const b of [exp,imp,reset])b.type='button';
    const input=make('input','','');input.type='file';input.accept='.json,application/json';input.hidden=true;
    const preview=make('div','','');preview.hidden=true;
    const accept=make('button','','Diese Sicherung übernehmen'),cancel=make('button','','Abbrechen');accept.type='button';cancel.type='button';let pending=null;
    cancel.addEventListener('click',()=>{pending=null;preview.hidden=true;status.textContent='';});
    const offer=(action,text,label)=>{pending=action;preview.textContent=text+' ';accept.textContent=label;preview.append(accept,cancel);preview.hidden=false;status.textContent='';};
    exp.addEventListener('click',()=>{
      try{
        const blob=new Blob([engine.snapshot()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
        a.href=url;a.download='andre-tuerkisch-'+L.day(Date.now())+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Sicherung heruntergeladen.';
      }catch{status.textContent='Die Sicherung konnte nicht heruntergeladen werden.';}
    });
    imp.addEventListener('click',()=>input.click());
    input.addEventListener('change',async()=>{
      pending=null;preview.hidden=true;const file=input.files?.[0];if(!file)return;
      if(file.size>2_000_000){status.textContent='Die Datei ist zu groß für eine Lernstand-Sicherung.';return;}
      try{
        const text=await file.text(),data=JSON.parse(text);
        if(data.format!=='andre-turkish-backup'||data.version!==2||data.learning?.version!==2||!data.unlocks)throw new Error();
        const clean=L.cleanState(data.learning),unlocks=L.unlocks(data.unlocks);
        offer({kind:'import',text},'Sicherung: Level '+clean.level+', '+Object.values(unlocks).filter(x=>x.toTurkish&&x.toGerman).length+' freigeschaltete Wörter. Dein jetziger Stand wird vor der Übernahme als Rückfallsicherung aufbewahrt.','Diese Sicherung übernehmen');
      }catch{status.textContent='Diese Datei ist keine gültige Lernstand-Sicherung.';}
      input.value='';
    });
    accept.addEventListener('click',()=>{
      if(!pending)return;
      try{
        const action=pending;localStorage.setItem('andreTurkishLastBackupV2',engine.snapshot());stop();
        if(action.kind==='reset'){if(!engine.reset())throw new Error(engine.storageError);}
        else engine.import(action.text);
        refreshUnlockUI();status.textContent=action.kind==='reset'?'Satzbau zurückgesetzt. Wortfreischaltungen bleiben erhalten.':action.kind==='undo'?'Rückfallsicherung wiederhergestellt.':'Sicherung übernommen.';pending=null;preview.hidden=true;
      }
      catch(error){status.textContent=error.message;}
    });
    reset.addEventListener('click',()=>{
      offer({kind:'reset'},'Satzbau auf Level 1 zurücksetzen? Deine freigeschalteten Wörter bleiben erhalten. Dein jetziger Stand wird vorher gesichert.','Satzbau jetzt zurücksetzen');
    });
    const undo=make('button','','Letzte Rückfallsicherung wiederherstellen');undo.type='button';
    undo.addEventListener('click',()=>{
      const text=localStorage.getItem('andreTurkishLastBackupV2');
      if(!text){status.textContent='Es gibt noch keine Rückfallsicherung.';return;}
      offer({kind:'undo',text},'Den zuletzt gesicherten Lernstand wiederherstellen? Dein jetziger Stand wird vorher gesichert.','Lernstand jetzt wiederherstellen');
    });
    actions.append(exp,imp,reset,undo);panel.append(actions,input,preview,status);home.append(panel);
  }
  function grammarIndex(){
    const panel=document.querySelector('#grammar .panel');
    const index=make('div','curriculum-index','');index.append(make('h3','','Satzbau · Level 1–160'));
    index.append(make('p','','A1–B2 beschreibt hier die Orientierung der Aufgaben. Satzbau allein ist keine vollständige Sprachprüfung.'));
    for(const band of C.bands){
      const item=make('details','','');item.append(make('summary','',band.cefr+' · '+band.start+'–'+band.end+' · '+band.title));
      for(const rule of C.skills.filter(s=>s.band===band.id))item.append(make('p','',rule.title+': '+rule.help));index.append(item);
    }
    panel.append(index);
  }
  root.startSentenceGame=start;root.stopSentenceGame=stop;root.nextSentence=next;root.checkSentence=()=>check(false);root.resetSentence=reset;
  root.SentenceGame={engine,start,stop,next,render,check,hint,moveToken,apply,reset,allowedCards,removeSelected};
  el('sentenceHintButton').addEventListener('click',hint);el('sentenceUnknownButton').addEventListener('click',()=>check(true));
  el('sentenceNextButton').addEventListener('click',next);el('sentenceRemoveButton').addEventListener('click',()=>removeSelected());
  el('sentenceClearEndings').addEventListener('click',()=>removeSelected(true));
  backupPanel();grammarIndex();
  root.addEventListener('pagehide',()=>{stop();engine.save();});
})(window);
