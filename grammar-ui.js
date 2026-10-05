(function(root){
 'use strict';const C=AndreCourse,G=AndreCourseGrammar,engine=SentenceGame.engine;
 const el=id=>document.getElementById(id),make=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;e.textContent=text;return e;};
 let active=false,selection=null,advanceTimer=null,keyboard=null,exerciseKey='',progressValue=0;
 const skipped=new Set();
 const trainer=make('section','grammar-trainer','');trainer.id='grammarTrainer';trainer.hidden=true;el('grammar').append(trainer);
 function button(text,action,cls='grammar-rule'){const b=make('button',cls,text);b.type='button';b.addEventListener('click',()=>{if(!b.disabled)action();});return b;}
 const colors={basics:'blue',existence:'lavender',cases:'noun',possession:'noun',copula:'adj',questions:'questionword',infinitive:'verb',verbs:'verb',modal:'polite',comparison:'adj',connections:'conjunction',time:'response',nominal:'noun',relative:'demonstrative',voice:'verb',report:'phrase',transfer:'lavender'};
 function available(){return engine.grammar.ready(engine.unlocked(),engine.state.opened).filter(e=>engine.grammar.exercise(e.id,engine.unlocked(),engine.state.opened));}
 function canUnlock(){return engine.grammar.ready(engine.unlocked(),engine.state.opened).some(e=>engine.grammar.exercise(e.id,engine.unlocked(),engine.state.opened));}
 function overview(){if(active)return;engine.refreshPool();const list=el('grammarList');list.replaceChildren();
  const opened=engine.state.opened,band=C.bands[opened-1],known=engine.grammar.unlocked();
  const missing=engine.missingWords();
  if(!missing.length&&G.core[band.index].every(id=>known.has(id)))list.append(button('Im Satzbau anwenden',()=>openLearnMode('sentences'),'grammar-primary'));
  for(const [group,title] of Object.entries(G.groupNames)){
   const entries=G.entries.filter(e=>e.group===group);if(!entries.length)continue;
   const card=make('section','grammar-topic','');card.dataset.grammarGroup=group;card.append(make('h3','',title));const rows=make('div','grammar-topic-rules','');
   for(const label of new Set(entries.map(e=>e.label))){const matching=entries.filter(e=>e.label===label),learned=matching.filter(e=>known.has(e.id)),locked=learned.length===0;
    const row=button('',()=>open(learned[0].id),'grammar-rule '+colors[group]+(locked?' locked':''));
    row.dataset.grammarRule=label;row.disabled=locked;
    const content=make('div','grammar-rule-content','');content.append(make('span','grammar-rule-title',label));
    if(!locked){const forms=[...new Set(learned.filter(e=>e.op).map(e=>e.text))];if(forms.length)content.append(make('span','grammar-rule-forms',forms.join(' · ')));}
    row.append(content,make('span','grammar-rule-status',locked?'':'✓'));
    row.setAttribute('aria-label',label+(locked?' · Gesperrt. Über Grammatik Freischalten lernen.':' · Freigeschaltet. Wiederholen.'));
    rows.append(row);
   }
   card.append(rows);list.append(card);
  }
 }
 function rule(e){const f=e.op?.after||{},text=e.text;
  if(e.op?.stage==='case')return ({dative:'Richtung oder Ziel: -e / -a. Nach einem Vokal steht y dazwischen.',locative:'Ort: -de / -da; nach ç, f, h, k, p, s, ş, t steht t statt d.',ablative:'Herkunft: -den / -dan; nach ç, f, h, k, p, s, ş, t steht t statt d.',accusative:'Ein bestimmtes Objekt erhält -ı, -i, -u oder -ü. Nach einem Vokal steht y dazwischen.',genitive:'Besitzer: -(n)ın / -(n)in / -(n)un / -(n)ün. Das besessene Nomen bekommt zusätzlich eine Besitzendung.',instrumental:'Begleitung oder Mittel: -la / -le; nach einem Vokal -yla / -yle.'})[f.case]+' Hier übst du '+text+'.';
  if(e.op?.stage==='poss')return 'Die Besitzendung zeigt, wem etwas gehört. Hier: '+text+'. Danach kann eine Fallendung folgen.';
  if(e.op?.stage==='plural')return 'Mehrzahl: nach a, ı, o, u steht -lar; nach e, i, ö, ü steht -ler.';
  if(f.voice)return ({passive:'Die betroffene Sache wird zum Subjekt; wer handelt, muss nicht genannt werden.',reflexive:'Die Person handelt an sich selbst. Die Reflexivform wird mit dem Verb gelernt.',causative:'Jemand veranlasst eine Handlung. Wer sie ausführt und was betroffen ist, sind verschiedene Rollen.',reciprocal:'Mehrere Personen handeln miteinander.'})[f.voice]+' Hier übst du '+text+'.';
  if(f.compound)return (f.compound==='past'?'Die zusätzliche Vergangenheitsendung verlegt Handlung, Gewohnheit oder Zukunft in eine frühere Betrachtungszeit.':'Die zusätzliche -miş-Form zeigt, dass die Information gehört oder erschlossen wurde.')+' Hier übst du '+text+'.';
  if(f.ability)return 'Nach dem Verbstamm steht -(y)abil / -(y)ebil für „können“. Die verneinte Form bedeutet „nicht können“. Hier übst du '+text+'.';
  if(f.tense==='present')return 'Entferne -mak / -mek und ergänze '+text+'. '+(f.register==='colloquial'?'Alltagsform für A1/A2; bei Fragen bleibt die Person am Verb.':'Standardform ab B1; bei Fragen steht die Person in der Regel an mı / mi / mu / mü.');
  if(e.op?.stage==='predicate')return 'Eigenschaft oder Nomen + Personenendung. In Fragen steht mı / mi / mu / mü getrennt. Hier übst du '+text+'.';
  const tenseHelp={past:'Eine abgeschlossene Handlung: -DI + Person. Nach stimmlosen Konsonanten wird d zu t.',future:'Etwas Zukünftiges: -(y)AcAK + Person. Vor der ich-/wir-Endung wird k zu ğ.',aorist:'Eine Gewohnheit oder allgemeine Aussage. Die Aoristform gehört zum Verb und wird mitgelernt.',reported:'-mIş bezeichnet Gehörtes oder nachträglich Festgestelltes.',necessity:'-mAlI + Person drückt eine Notwendigkeit aus.',conditional:'Die Bedingung endet auf -sA + Person; danach folgt, was unter dieser Bedingung passiert.',optative:'-(y)AlIm ist ein Vorschlag für uns: „Lass uns …“.',imperative:'Die du-Aufforderung ist der Verbstamm ohne -mak / -mek.',ma:'-mA macht die Handlung zum Nomen. Besitz nennt die handelnde Person; danach kann ein Fall folgen.',dik:'-DIK + Besitzendung bildet einen abhängigen Inhalt. Vor einer vokalischen Endung wird k zu ğ.',acak:'-AcAK + Besitzendung bildet einen zukünftigen Inhalt; vor einer vokalischen Endung wird k zu ğ.',an:'-(y)An beschreibt, wer etwas tut. Der beschreibende Teil steht vor seinem Nomen.',ip:'-(y)Ip verbindet zwei Handlungen derselben Person; die Zeit steht am letzten Verb.',ince:'-(y)IncA bedeutet „sobald / als“.',arak:'-(y)ArAk zeigt, wie oder womit die andere Handlung geschieht.',madan:'-mAdAn bedeutet „ohne … zu“; zusammen mit önce „bevor“.',ken:'Aorist + ken verbindet gleichzeitig ablaufende Handlungen: „während“.',infinitive:'-mak / -mek bezeichnet die Tätigkeit ohne Zeit oder Person.'};
  if(e.op)return (tenseHelp[f.tense]||e.label)+ ' Hier übst du '+text+'.';
  const use=e.id.slice(4);
  if(use.startsWith('morph:')){const word=AndreWords.byId[use.split(':')[1]];return 'Bei '+word.tr+' verändert sich der Stamm vor dieser Endung: '+(word.soften||word.vowelStem||word.progressiveStem)+'. Die Bedeutung bleibt gleich.';}
  if(use==='subject-person')return 'ben, sen, o und biz benennen die Person. Am Verb muss dieselbe Person stehen. Ein eindeutiges Personalpronomen darf auch fehlen.';
  if(use==='motion-target')return 'Das Ziel einer Bewegung erhält den Dativ: zum Haus / nach Hause heißt eve. Das Verb steht am Satzende.';
  return ({statement:'Im Türkischen steht die Aussage am Satzende. Bei „ist“ in der dritten Person ist oft keine eigene Endung nötig.',demonstrative:'bu bedeutet „dies / das“. Es steht vor dem, was du näher beschreibst.','negative-nominal':'değil verneint Eigenschaften und Nomen. Für ein verneintes Verb brauchst du dagegen die Verbendung.','question-ne':'ne fragt nach „was“.','icin:purpose':'Infinitiv + için nennt einen Zweck: etwas tun, um etwas zu erreichen.','icin:beneficiary':'Nomen + için bedeutet „für jemanden / etwas“.','icin:reason':'-DIK + Besitzendung + için nennt den Grund für die andere Handlung.','relative-subject':'Die Form auf -(y)An beschreibt das folgende Nomen: die Person oder Sache, die etwas tut.','relative-object':'Der beschreibende Satzteil steht vor dem Nomen. Seine Besitzendung nennt die handelnde Person.','content':'Der Inhalt wird zu einem Satzteil: -DIK oder -AcAK + Besitzendung, danach bei Bedarf die Fallendung.'})[use]||(/^(var|yok):/.test(use)?'var bedeutet „es gibt / vorhanden“, yok „es gibt nicht / fehlt“. Ort oder Besitzer stehen davor.':'Übersetze den ganzen Satz. Achte darauf, wie die bekannten Wörter die beiden Satzteile verbinden.');
 }
 function draw(){const cur=engine.grammar.state.current;if(!cur)return;
  const key=cur.entryId+'|'+cur.direction+'|'+cur.prompt,changed=key!==exerciseKey;
  const old=changed?AndreMotion.snapshot(trainer.querySelector('.grammar-exercise')):null;
  exerciseKey=key;trainer.replaceChildren();
  const e=G.byId[cur.entryId],count=engine.grammar.count(cur.entryId),total=G.THRESHOLD*2;
  trainer.append(button('← Grammatik',close,'learn-back'));
  const card=make('div','typing-game-card grammar-exercise',''),top=make('div','typing-top',''),progress=make('div','typing-progress',''),info=make('div','typing-progress-info','');
  info.append(make('span','','Grammatik Freischalten'),make('span','',(count.tr+count.de)+' / '+total));progress.append(info);
  const bar=make('div','bar',''),fill=make('div','bar-fill',''),value=(count.tr+count.de)/total*100;fill.style.width=value+'%';
  if(!changed&&value!==progressValue)AndreMotion.play(fill,[{width:progressValue+'%'},{width:value+'%'}]);progressValue=value;
  bar.append(fill);progress.append(bar);top.append(progress);card.append(top);
  card.append(make('h2','grammar-exercise-title',e.label),make('p','grammar-rule-help',rule(e)));
  const prompt=make('div','typing-prompt','');prompt.append(make('div','typing-direction',(cur.direction==='tr'?'Deutsch → Türkisch':'Türkisch → Deutsch')+(cur.context?' · '+cur.context:'')));
  const sentence=make('div','typing-word grammar-prompt-text',cur.prompt);sentence.setAttribute('lang',cur.direction==='tr'?'de':'tr');prompt.append(sentence);card.append(prompt);
  const answer=make('div','typing-answer'+(cur.draft?'':' empty')+(cur.answered&&cur.correct?' correct':''),cur.draft||'Antwort tippen …');answer.id='grammarAnswer';answer.tabIndex=0;answer.setAttribute('role','textbox');answer.setAttribute('aria-label','Deine Übersetzung');answer.setAttribute('aria-readonly','true');answer.setAttribute('lang',cur.direction==='tr'?'tr':'de');card.append(answer);
  AndreMotion.write(answer,cur.draft,{animate:false});
  const feedback=make('div','typing-feedback','');feedback.id='grammarFeedback';feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');feedback.textContent=engine.grammar.error;card.append(feedback);trainer.append(card);
  if(!keyboard){keyboard=make('div','custom-keyboard','');keyboard.id='grammarKeyboard';keyboard.setAttribute('aria-label','App-Tastatur');}trainer.append(keyboard);
  renderAppKeyboard(cur.direction==='tr'?'tr':'de',{keyboard,onType:type,onCheck:cur.answered?next:check,onSkip:skip,skipLabel:'Überspringen',checkLabel:cur.answered?'Nächste Aufgabe':'Antwort prüfen',disabled:advanceTimer!==null});
  if(changed)AndreMotion.enter(card);if(old)AndreMotion.play(old,[{opacity:1},{opacity:0}],{duration:160,cleanup:()=>old.remove()});
 }
 function type(key){const cur=engine.grammar.state.current;if(!active||!cur||cur.answered||advanceTimer!==null)return;
  cur.draft=key==='BACKSPACE'?Array.from(cur.draft||'').slice(0,-1).join(''):(cur.draft||'').length<400?(cur.draft||'')+key:cur.draft;
  engine.grammar.save();const answer=el('grammarAnswer');answer.className='typing-answer'+(cur.draft?'':' empty');AndreMotion.write(answer,cur.draft);el('grammarFeedback').textContent=engine.grammar.error;
 }
 function check(){const cur=engine.grammar.state.current;if(!active||!cur||cur.answered||advanceTimer!==null||!cur.draft?.trim())return;
  const wasUnlocked=engine.grammar.state.unlocked[cur.entryId]===true;
  const result=engine.grammar.check(cur.draft);if(result.ignored)return;
  const newlyUnlocked=result.unlocked&&!wasUnlocked;
  if(result.correct)advanceTimer=setTimeout(()=>{advanceTimer=null;if(active)next();},750);
  draw();el('grammarAnswer').classList.add(result.correct?'correct':'wrong');
  el('grammarFeedback').textContent=(result.correct?(newlyUnlocked?'Freigeschaltet.':cur.assisted?'Richtig korrigiert.':'Richtig.'):'Noch nicht richtig.')+(engine.grammar.error?' '+engine.grammar.error:'');el('grammarAnswer').focus();
  AndreMotion.feedback(el('grammarAnswer'),result.correct);if(newlyUnlocked)celebrateCorrectAnswer();
 }
 function skip(){const cur=engine.grammar.state.current;if(!active||!cur||cur.answered||advanceTimer!==null)return;
  if(selection){close();return;}skipped.add(cur.entryId);engine.grammar.state.current=null;engine.grammar.save();next();
 }
 function choose(){
  const cur=engine.grammar.state.current;
  if(cur&&!cur.answered&&!skipped.has(cur.entryId)){const resumed=engine.grammar.next(engine.unlocked(),engine.state.opened);if(resumed)return resumed;}
  const ready=available(),required=new Set(G.core.slice(0,engine.state.opened).flat()),ordered=[...ready.filter(e=>required.has(e.id)),...ready.filter(e=>!required.has(e.id))];
  if(ordered.length&&ordered.every(e=>skipped.has(e.id)))skipped.clear();
  const target=ordered.find(e=>!skipped.has(e.id));return target?engine.grammar.next(engine.unlocked(),engine.state.opened,target.id):null;
 }
 function open(id){root.showView('grammar',null);AndreMotion.cancel();selection=id||null;skipped.clear();
  const cur=id?engine.grammar.next(engine.unlocked(),engine.state.opened,id):choose();
  if(!cur){updateUnlockButtons();return;}
  AndreMotion.depart(el('grammarPanel'));active=true;el('grammarPanel').hidden=true;trainer.hidden=false;el('grammarUnlockFloatingButton').hidden=true;
  document.body.classList.add('without-unlock-button','learning-games-view','game-mode-active','grammar-training-view');root.scrollTo({top:0,behavior:'auto'});draw();el('grammarAnswer').focus();
 }
 function next(){if(!active||advanceTimer!==null)return;
  if(selection){close();return;}
  const previous=engine.grammar.state.current;
  const cur=previous&&!engine.grammar.state.unlocked[previous.entryId]&&!skipped.has(previous.entryId)?engine.grammar.next(engine.unlocked(),engine.state.opened,previous.entryId):choose();
  if(cur){draw();el('grammarAnswer').focus();}else close();
 }
 function close(animate=true){
  if(active&&animate){AndreMotion.cancel();AndreMotion.depart(trainer.querySelector('.grammar-exercise'));}
  const wasActive=active;clearTimeout(advanceTimer);advanceTimer=null;active=false;trainer.hidden=true;el('grammarPanel').hidden=false;
  document.body.classList.remove('learning-games-view','game-mode-active','grammar-training-view');overview();updateUnlockButtons();
  if(wasActive&&animate)AndreMotion.enter(el('grammarPanel'));
 }
 document.addEventListener('keydown',event=>{
  if(!active||event.isComposing||event.ctrlKey||event.metaKey||event.altKey||event.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;
  if(['Enter',' '].includes(event.key)&&event.target.closest?.('button,[role="button"]'))return;
  if(event.key==='Enter'){event.preventDefault();if(!event.repeat){if(engine.grammar.state.current?.answered)next();else check();}}
  else if(event.key==='Backspace'){event.preventDefault();type('BACKSPACE');}
  else if(/^[\p{L} '’.,?!-]$/u.test(event.key)){event.preventDefault();type(event.key);}
 });
 root.GrammarTrainer={open,close,next,type,check,canUnlock,get active(){return active;}};root.openGrammarTraining=open;root.refreshGrammarUI=overview;
 el('grammarUnlockFloatingButton').addEventListener('click',()=>{if(!el('grammarUnlockFloatingButton').disabled)open();});overview();updateUnlockButtons();
})(window);
