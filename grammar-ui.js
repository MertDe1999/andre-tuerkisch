(function(root){
 'use strict';const C=AndreCourse,G=AndreCourseGrammar,engine=SentenceGame.engine;
 const el=id=>document.getElementById(id),make=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;e.textContent=text;return e;};
 let active=false,selection=null;
 const trainer=make('section','grammar-trainer','');trainer.id='grammarTrainer';trainer.hidden=true;el('grammar').append(trainer);
 function button(text,action,cls='grammar-rule'){const b=make('button',cls,text);b.type='button';b.addEventListener('click',action);return b;}
 function overview(){if(active)return;engine.refreshPool();const list=el('grammarList');list.replaceChildren();
  const opened=engine.state.opened,band=C.bands[opened-1],words=engine.unlocked(),known=engine.grammar.unlocked();
  el('grammarStatus').textContent=band.cefr+' · '+band.title;
  const missing=engine.missingWords();
  if(missing.length){const note=make('div','grammar-next-words','');note.append(make('p','','Für den nächsten Schritt: '+missing.map(w=>w.tr).join(', ')),button('Wörter freischalten',()=>openTypingFromFloating()));list.append(note);}
  if(!missing.length&&G.core[band.index].every(id=>known.has(id)))list.append(button('Im Satzbau anwenden',()=>openLearnMode('sentences'),'grammar-primary'));
  for(const [group,title] of Object.entries(G.groupNames)){
   const entries=G.entries.filter(e=>e.group===group&&e.min<=band.end);if(!entries.length)continue;
   const card=make('section','grammar-topic','');card.append(make('h3','',title));const rows=make('div','grammar-topic-rules','');
   for(const label of new Set(entries.map(e=>e.label))){const matching=entries.filter(e=>e.label===label),count=matching.filter(e=>known.has(e.id)).length;
    const ready=matching.find(e=>!known.has(e.id)&&engine.grammar.exercise(e.id,words,opened));
    const row=button(label,()=>open(ready?.id||matching.find(e=>known.has(e.id))?.id));
    row.append(make('span','grammar-rule-status',count===matching.length?'✓':count?count+' / '+matching.length:'›'));
    row.disabled=!ready&&!count;row.setAttribute('aria-label',label+(ready?' · Üben':count?' · Wiederholen':' · Zuerst Wörter oder frühere Formen lernen'));
    rows.append(row);
   }
   card.append(rows);list.append(card);
  }
  if(opened<32)list.append(make('p','grammar-preview','Danach: '+C.bands[opened].title));
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
 function draw(){trainer.replaceChildren();const cur=engine.grammar.state.current;if(!cur)return;
  const e=G.byId[cur.entryId],count=engine.grammar.count(cur.entryId);
  trainer.append(button('← Grammatik',close,'grammar-back'),make('h2','',e.label),make('p','grammar-rule-help',rule(e)),make('p','grammar-progress','Türkisch '+count.tr+' / 3 · Deutsch '+count.de+' / 3'));
  if(cur.targets?.length>1)trainer.append(make('p','grammar-direction','Neue Formen: '+cur.targets.map(id=>G.byId[id]?.text).filter(Boolean).join(' · ')));
  const prompt=make('div','grammar-prompt',cur.prompt);prompt.setAttribute('lang',cur.direction==='tr'?'de':'tr');trainer.append(make('p','grammar-direction',(cur.direction==='tr'?'Ins Türkische':'Ins Deutsche')+(cur.context?' · '+cur.context:'')),prompt);
  const form=make('form','grammar-answer-form',''),input=make('input','grammar-answer','');input.id='grammarAnswer';input.type='text';input.autocomplete='off';input.spellcheck=false;input.value=cur.draft||'';input.setAttribute('aria-label','Deine Übersetzung');input.setAttribute('lang',cur.direction==='tr'?'tr':'de');input.disabled=cur.answered;input.addEventListener('input',()=>{cur.draft=input.value;engine.grammar.save();});form.append(input);
  if(cur.direction==='tr'){const keys=make('div','grammar-keys','');for(const letter of ['ç','ğ','ı','ö','ş','ü']){const key=button(letter,()=>{const from=input.selectionStart??(input.value||'').length,to=input.selectionEnd??from;input.value=(input.value||'').slice(0,from)+letter+(input.value||'').slice(to);cur.draft=input.value;engine.grammar.save();input.focus();input.setSelectionRange?.(from+1,from+1);},'grammar-key');key.disabled=cur.answered;keys.append(key);}form.append(keys);}
  const feedback=make('p','grammar-feedback','');feedback.setAttribute('role','status');
  const submit=()=>{cur.draft=input.value;const result=engine.grammar.check(input.value);if(result.ignored)return;draw();const f=el('grammarFeedback');f.textContent=(result.correct?(result.unlocked?'Freigeschaltet.':cur.assisted?'Richtig korrigiert. Übe diese Form gleich noch einmal.':'Richtig.'):'Noch nicht richtig. Versuche es noch einmal.')+(engine.grammar.error?' '+engine.grammar.error:'');if(!result.correct)el('grammarAnswer').focus();};
  form.addEventListener('submit',event=>{event.preventDefault();submit();});
  if(!cur.answered){form.append(button('Prüfen',submit,'grammar-primary'),button('Lösung zeigen',()=>{feedback.textContent=engine.grammar.reveal();},'grammar-back'));}
  else form.append(button('Weiter',next,'grammar-primary'));
  feedback.id='grammarFeedback';if(engine.grammar.error)feedback.textContent=engine.grammar.error;form.append(feedback);trainer.append(form);
 }
 function open(id){root.showView('grammar',null);active=true;selection=id?{group:G.byId[id].group,label:G.byId[id].label}:null;
  el('grammarPanel').hidden=true;trainer.hidden=false;el('grammarUnlockFloatingButton').hidden=true;document.body.classList.add('without-unlock-button');
  const cur=engine.grammar.next(engine.unlocked(),engine.state.opened,id);if(!cur){close();el('grammarStatus').textContent='Schalte zuerst die passenden Wörter oder die vorherige Form frei.';return;}draw();
 }
 function next(){const previous=engine.grammar.state.current;let id=previous&&!engine.grammar.state.unlocked[previous.entryId]?previous.entryId:null;
  if(!id&&selection)id=engine.grammar.ready(engine.unlocked(),engine.state.opened).find(e=>e.group===selection.group&&e.label===selection.label)?.id;
  if(!id&&selection){close();return;}
  const cur=engine.grammar.next(engine.unlocked(),engine.state.opened,id);if(cur)draw();else close();
 }
 function close(){active=false;trainer.hidden=true;el('grammarPanel').hidden=false;overview();updateUnlockButtons();}
 root.GrammarTrainer={open,close,next,get active(){return active;}};root.openGrammarTraining=open;root.refreshGrammarUI=overview;
 el('grammarUnlockFloatingButton').addEventListener('click',()=>open());overview();
})(window);
