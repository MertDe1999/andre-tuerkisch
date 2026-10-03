/* Explicit grammar prerequisites and authored sentence patterns, A1–B2 orientation. */
(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const W=node?require('../data/words.js'):root.AndreWords;
  const T=node?require('./turkish.js'):root.Turkish;
  const bands=[
    [1,5,'Kurze Aussagen'],[6,10,'Präsens'],[11,15,'Ort, Ziel und Plural'],[16,20,'Akkusativ'],
    [21,25,'Objekt und Ort'],[26,30,'Herkunft und Wünsche'],[31,35,'Besitz'],[36,40,'Vergangenheit und Grundlagen'],
    [41,50,'Vergangenheit vertiefen'],[51,60,'Zukunft und Gewohnheiten'],[61,70,'Können und Vergleichen'],[71,80,'Berichtete Handlungen'],
    [81,90,'Notwendigkeit und Zweck'],[91,100,'Zeit und Begleitung'],[101,110,'Bedingung und abhängige Inhalte'],[111,120,'Satzteile verbinden'],
    [121,130,'Relativsätze'],[131,140,'Wer handelt?'],[141,150,'Indirekte Rede'],[151,160,'Alles verbinden']
  ].map(([start,end,title],i)=>({id:'b'+i,start,end,title,cefr:start<=40?'A1':start<=80?'A2':start<=120?'B1':'B2'}));
  const skills=[];
  function skill(id,min,title,help,prerequisites=[],goal){
    const band=bands.find(b=>min>=b.start&&min<=b.end);
    const value={id,min,band:band.id,title,help,prerequisites,goal};skills.push(value);return value;
  }
  skill('bare',1,'Kurzer Nominalsatz','Das Nomen bleibt in der Grundform: Ev güzel. Das Haus ist schön.',[],'bare');
  skill('nominalNegative',3,'Nicht sein','Bei einem Nominalsatz steht değil nach der Eigenschaft: Ev güzel değil.',['bare']);
  skill('nominalQuestion',4,'Ja/Nein-Frage','mı/mi/mu/mü steht getrennt und richtet sich nach dem letzten Vokal: Ev güzel mi?',['bare']);
  skill('present',6,'Präsens und Person','Das Verb startet im Infinitiv. Beim Verbinden ersetzt die Endung -mak/-mek: gelmek + -iyom → geliyom. A1/A2 übt für ich/du/er/wir die Alltagsformen -iyom/-iyon/-iyo/-iyoz; ab B1 die Standardformen -iyorum/-iyorsun/-iyor/-iyoruz. Die Vokalharmonie gilt weiter.',['bare']);
  skill('negative',8,'Verbverneinung','Vor der Zeitform steht die Verneinung. A1/A2: gelmiyom, gitmiyon. Ab B1: gelmiyorum, gitmiyorsun.',['present']);
  skill('verbQuestion',9,'Präsensfrage','A1/A2: Die Personenendung bleibt am Verb, danach folgt mu: geliyom mu? geliyon mu? geliyo mu? geliyoz mu? Ab B1 Standard: geliyor musun?',['present','nominalQuestion']);
  skill('locative',11,'Wo?','-da/-de, nach stimmlosen Konsonanten -ta/-te: evde, ağaçta.',['bare'],'locative');
  skill('dative',13,'Wohin?','-a/-e zeigt ein Ziel; nach einem Vokal kommt y: eve, arabaya.',['present'],'dative');
  skill('plural',15,'Mehrzahl','-lar/-ler richtet sich nach dem letzten Vokal: arabalar, evler.',['bare']);
  skill('accusative',16,'Bestimmtes Objekt','Ein bestimmtes/spezifisches direktes Objekt erhält -(y)ı/i/u/ü: arabayı görüyorum.',['present'],'accusative');
  skill('specificity',19,'Objektbedeutung unterscheiden','Araba görüyorum meint ein nicht näher bestimmtes Auto. Arabayı görüyorum meint das bestimmte Auto. Der deutsche Artikel allein ist keine allgemeine Kasusregel.',['accusative']);
  skill('accusativeDetail',21,'Akkusativ und Stammwechsel','Vor einem Vokal kann sich der Stamm ändern: ağaç → ağacı, yarak → yarağı. Das wird am jeweiligen Wort gelernt.',['accusative']);
  skill('objectLocation',23,'Objekt und Ort verbinden','Arabada yarağı görüyorsun: arabada nennt den Ort, yarağı das bestimmte Objekt.',['accusative','locative']);
  skill('ablative',26,'Woher?','-dan/-den, nach stimmlosen Konsonanten -tan/-ten: evden, ağaçtan.',['present'],'ablative');
  skill('imperative',28,'Kurze Aufforderung','Die du-Form ist meist der Verbstamm: Gel! Git! Andere Personen haben eigene Formen.',['present']);
  skill('want',29,'Etwas möchten','Der Infinitiv steht vor istemek: Gitmek istiyorum. Ich möchte gehen.',['present']);
  skill('possessive',31,'Besitzendung','Mein/dein/sein Haus: evim, evin, evi. Die Besitzperson ist Teil der Endung.',['bare']);
  skill('genitive',33,'Besitzer und Besitz','Annenin arabası: der Besitzer trägt den Genitiv, das Auto die passende Besitzendung. Beide gehören zusammen.',['possessive'],'genitive');
  skill('possessiveCase',35,'Fall nach Besitz','Erst Besitz, dann Fall: arabamda, arabasında. Nach Besitz der dritten Person steht vor vielen Kasusendungen n.',['genitive','locative','dative','accusative']);
  skill('past',36,'Bestimmte Vergangenheit','-dı/-di/-du/-dü oder -tı/-ti/-tu/-tü plus Person: geldim, gittin.',['present']);
  skill('instrumental',38,'Mit-Form','-(y)la/le: arabayla, anneyle. Diese Form kommt zusätzlich zu den sechs Grundkategorien.',['dative']);
  skill('pastQuestions',41,'Vergangenheit verneinen und fragen','Im -di-Präteritum bleibt die Person am Verb: Geldin mi? Gelmedin mi?',['past','negative','verbQuestion']);
  skill('nominalPast',45,'Nominale Vergangenheit','Ev güzeldi: Das Haus war schön. Nach Vokalen kommt y vor der Vergangenheitsendung.',['past','bare']);
  skill('otherPeople',48,'Ihr/Sie und sie','siz ist ihr oder höfliches Sie; onlar ist sie im Plural. Die Endungen unterscheiden beide.',['present']);
  skill('future',51,'Zukunft','-acak/-ecek: geleceğim, gideceksin. Vor der ich-/wir-Endung wird das k zu ğ.',['past']);
  skill('aorist',56,'Gewohnheit und allgemeine Aussage','Die Aoristform gehört zum Verb: gelir, gider, görür, sever. Verneint: gelmem, gelmezsin, gelmeyiz.',['future','negative']);
  skill('ability',61,'Können','-(y)abil/ebil: gelebilirim, gidebilirsin. Verneinte Fähigkeit hat andere Formen, etwa gidemiyorum.',['aorist']);
  skill('comparison',64,'Vergleichen','Der Vergleichspartner kann im Ablativ stehen: Araba evden daha güzel. En güzel: am schönsten.',['ablative']);
  skill('combinedNoun',67,'Plural, Besitz und Fall','Die Reihenfolge ist Nomen → Mehrzahl → Besitz → Fall: evlerimizde.',['plural','possessiveCase']);
  skill('reported',71,'Berichtete Vergangenheit','-mış/-miş/-muş/-müş signalisiert zum Beispiel eine gehörte Nachricht oder Schlussfolgerung. Der Aufgabenkontext nennt diese Perspektive.',['past']);
  skill('reason',74,'Einfach begründen','çünkü verbindet eine Aussage mit ihrem Grund. Beide Satzteile behalten ihre eigene Person.',['present']);
  skill('ip',77,'Handlungen verbinden','-ıp/-ip/-up/-üp verbindet Handlungen desselben Subjekts: Eve gidip arabayı görüyorum.',['present','dative','accusative']);
  skill('necessity',81,'Müssen','-malı/-meli: gitmeliyim, gelmelisin. Die Personenendung hängt an der Notwendigkeitsform.',['present']);
  skill('optative',83,'Wünsche und Vorschläge','Gideyim: Ich gehe mal / lass mich gehen. Gidelim: Lass uns gehen. Die ich-/wir-Form ist ein Wunsch oder Vorschlag, kein du-Befehl.',['imperative','want']);
  skill('purpose',84,'Um … zu','Ein Infinitiv vor için drückt den Zweck aus: Arabayı görmek için geliyorum.',['accusative','present']);
  skill('nominalMa',87,'Eine Handlung als Nomen','-ma/-me plus Besitz: senin gelmen, dein Kommen. Die Besitzperson bezeichnet das Subjekt dieser Handlung.',['genitive','want']);
  skill('ken',91,'Während','Der zeitliche Satzteil steht hier mit dem Aorist plus -ken: Sen gelirken ben gidiyorum.',['aorist']);
  skill('ince',94,'Als / sobald','-(y)ınca/ince/unca/ünce: gelince, gidince. Der Kontext bestimmt die zeitliche Bedeutung.',['present']);
  skill('arak',97,'Begleitende Handlung','-(y)arak/erek: görerek. Hier haben begleitende Handlung und Hauptverb dasselbe Subjekt.',['present']);
  skill('beforeAfter',99,'Vor und nach einer Handlung','gitmeden önce: vor dem Gehen. gittikten sonra: nach dem Gehen. Die Verknüpfung bestimmt die Reihenfolge der Handlungen.',['past','ablative']);
  skill('conditional',101,'Wenn','Die bekannte Aoristform erhält -sa/-se plus Person: gelirsem, gelirsen. So üben wir eine reale oder mögliche Bedingung.',['aorist']);
  skill('nominalDik',104,'Abhängiger Inhalt','-dık/-dik/-duk/-dük plus Besitz und gegebenenfalls Kasus: geldiğini. Die Besitzperson gehört zum Subjekt des abhängigen Inhalts.',['nominalMa','accusative']);
  skill('nominalFuture',108,'Zukünftiger abhängiger Inhalt','-acak/-ecek plus Besitz und Kasus: geleceğini. Zukunft und Satzbezug werden zusammen ausgedrückt.',['nominalDik','future']);
  skill('multiClause',111,'Bezüge zwischen Satzteilen','Ordne jedes Wort seinem Satzteil zu. Ein richtiges Wort im falschen Nebensatz verändert die Bedeutung.',['ken','ince','conditional']);
  skill('indirect',116,'Indirekte Aussage','Senin geldiğini biliyorum: Ich weiß, dass du gekommen bist/da bist. Inhalt und Hauptaussage haben getrennte Personen.',['nominalDik']);
  skill('relativeAn',121,'Wer handelt?','-an/-en beschreibt den Handelnden: eve gelen anne, die Mutter, die nach Hause kommt.',['dative','nominalDik']);
  skill('relativeDik',125,'Objekt im Relativsatz','Senin gördüğün araba: das Auto, das du gesehen hast. Besitzerendung und Genitiv bezeichnen hier das Subjekt des Relativsatzes.',['nominalDik']);
  skill('relativeFuture',128,'Zukünftige Beschreibung','Senin göreceğin araba: das Auto, das du sehen wirst. Die Beschreibung bleibt vor dem Nomen.',['relativeDik','nominalFuture']);
  skill('passive',131,'Passiv','görülüyor: wird gesehen. Das bisherige Objekt wird zum Subjekt; ein Akkusativ ist dafür nicht passend.',['present']);
  skill('reflexive',134,'Auf sich selbst bezogen','Anne yıkanıyor: Mama wäscht sich. Der Kontext unterscheidet diese Form vom Passiv eines Gegenstands.',['passive']);
  skill('reciprocal',136,'Miteinander','Anne ve baba görüşüyorlar: Mama und Papa treffen sich. Die abgeleitete Verbform wird als eigene Bedeutung eingeführt.',['otherPeople']);
  skill('causative',138,'Etwas veranlassen','Anne arabayı yıkatıyor: Mama lässt das Auto waschen. Die Veranlassung verändert die Verbrollen.',['passive','accusative']);
  skill('indirectSpeech',141,'Eine Aussage berichten','Senin geleceğini söylüyorum: Ich sage, dass du kommen wirst. Der Inhalt hat seinen eigenen Personenbezug.',['indirect','nominalFuture']);
  skill('indirectQuestion',145,'Eine Frage berichten','Senin gelip gelmediğini soruyorum: Ich frage, ob du gekommen bist. Positive und negative Form gehören zur eingebetteten Frage.',['indirect','ip','negative']);
  skill('concession',148,'Obwohl / trotzdem','Senin gelmene rağmen gidiyorum: Obwohl du kommst, gehe ich. rağmen verlangt hier eine nominalisierte Handlung im Dativ.',['nominalMa','dative']);
  skill('advancedMix',151,'Mehrere bekannte Konstruktionen','Verbinde Relativsatz, Besitz, Zeitform und Kasus. Prüfe zuerst den Bezug jedes Satzteils, danach die Endungen.',['relativeFuture','causative','indirectQuestion','concession']);
  const bySkill=Object.assign(Object.create(null),Object.fromEntries(skills.map(s=>[s.id,s])));
  const tasks=[];
  const s=(lemma,features={},extra={})=>({lemma:W.byLemma[lemma].id,features,...extra});
  const group=(id,label,slots,ordered=false)=>({id,label,slots,ordered});
  function add(id,de,skillIds,groups,extra={}){
    const max=Math.max(...skillIds.map(id=>bySkill[id].min));
    const band=bands.find(b=>max>=b.start&&max<=b.end);
    const slots=groups.flatMap(g=>g.slots);
    const requires=[...new Set(slots.filter(x=>!x.literal).flatMap(x=>[x.lemma,...[x.features.person,x.features.poss].filter(Boolean).map(p=>W.byLemma[p]?.id).filter(Boolean)]))];
    const cases=[...new Set(slots.filter(x=>!x.literal && W.byId[x.lemma].type==='noun').map(x=>x.features.case || 'bare').filter(x=>x!=='instrumental'))];
    const person=slots.find(x=>W.byId[x.lemma]?.type==='verb'&&x.features.person)?.features.person || null;
    const task=forLevel({id,family:id,de,skills:skillIds,requires,groups,band:band.id,min:max,cefr:band.cefr,cases,person,register:'standard',...extra},max);
    tasks.push(task);
  }
  const single=(slots,ordered=false)=>[group('main','Dein Satz',slots,ordered)];
  const nouns=W.words.filter(w=>w.labels), people=T.people.slice(0,4);
  for(const n of nouns){
    add('nominal-'+n.id,n.labels.subject+' ist schön.',['bare'],single([s(n.tr),s('güzel')]));
    add('negative-'+n.id,n.labels.subject+' ist nicht schön.',['nominalNegative'],single([s(n.tr),s('güzel'),s('değil')],true));
    add('question-'+n.id,'Ist '+n.labels.subject.replace(/^D/,'d')+' schön?',['nominalQuestion'],single([s(n.tr),s('güzel',{question:true},{nominal:true})]));
  }
  const verbDe={gelmek:['komme','kommst','kommt','kommen','kommt','kommen'],gitmek:['gehe','gehst','geht','gehen','geht','gehen'],'görmek':['sehe','siehst','sieht','sehen','seht','sehen'],sevmek:['mag','magst','mag','mögen','mögt','mögen']};
  const subjectDe=['Ich','Du','Er/Sie','Wir','Ihr','Sie'];
  for(const lemma of Object.keys(verbDe))for(const p of people){
    const i=T.people.indexOf(p), prefix=subjectDe[i]+' '+verbDe[lemma][i];
    const v=(features={})=>s(lemma,{tense:'present',person:p,...features});
    add('present-'+lemma+'-'+p,prefix+'.',['present'],single([s(p),v()]));
    add('colloquial-'+lemma+'-'+p,prefix+'.',['present'],single([s(p),v({register:'colloquial'})]),{register:'colloquial'});
    add('negative-present-'+lemma+'-'+p,prefix+' nicht.',['negative'],single([s(p),v({negative:true})]));
    add('question-present-'+lemma+'-'+p,verbDe[lemma][i].charAt(0).toUpperCase()+verbDe[lemma][i].slice(1)+' '+subjectDe[i].toLowerCase()+'?',['verbQuestion'],single([s(p),v({question:true})]));
    if(['gelmek','gitmek'].includes(lemma))for(const n of nouns){
      add('dative-'+lemma+'-'+p+'-'+n.id,prefix+' '+n.labels.to+'.',['dative'],single([s(p),s(n.tr,{case:'dative'}),v()]));
      add('ablative-'+lemma+'-'+p+'-'+n.id,prefix+' '+n.labels.from+'.',['ablative'],single([s(p),s(n.tr,{case:'ablative'}),v()]));
    }
    if(['görmek','sevmek'].includes(lemma))for(const n of nouns){
      const detail=!!n.soften;
      add('object-'+lemma+'-'+p+'-'+n.id,prefix+' '+n.labels.object+'.',[detail?'accusativeDetail':'accusative'],single([s(p),s(n.tr,{case:'accusative'}),v()]));
      if(lemma==='görmek'){
        for(const place of ['ev','araba']){
          if(n.tr===place || (place==='araba'&&['ev','ağaç','yol'].includes(n.tr))) continue;
          add('location-object-'+p+'-'+n.id+'-'+place,prefix+' '+n.labels.object+' '+W.byLemma[place].labels.at+'.',['objectLocation',...(detail?['accusativeDetail']:[])],single([s(p),s(place,{case:'locative'}),s(n.tr,{case:'accusative'}),v()]));
        }
      }
    }
  }
  for(const n of nouns){
    if(['ev','araba','yol'].includes(n.tr))for(const actor of ['anne','baba','abi','abla']){
      add('locative-'+actor+'-'+n.id,W.byLemma[actor].labels.subject+' ist '+n.labels.at+'.',['locative'],single([s(actor),s(n.tr,{case:'locative'})]));
    }
    for(const p of people){
      const feminine=['anne','abla'].includes(n.tr);
      const pos=(feminine?['Meine','Deine','Seine/Ihre','Unsere']:['Mein','Dein','Sein/Ihr','Unser'])[T.people.indexOf(p)];
      const label={anne:'Mama',baba:'Papa',abi:'älterer Bruder',abla:'ältere Schwester',yarak:'Penis'}[n.tr]||n.de.split('/')[0].trim();
      add('possess-'+p+'-'+n.id,pos+' '+label+' ist schön.',['possessive'],single([s(n.tr,{poss:p}),s('güzel')]));
    }
  }
  for(const n of ['ev','araba']){
    add('plural-'+n,'Die '+(n==='ev'?'Häuser':'Autos')+' sind schön.',['plural'],single([s(n,{plural:true}),s('güzel')]));
    add('specific-'+n,'Du siehst ein '+W.byLemma[n].de+' (nicht näher bestimmt).',['specificity'],single([s('sen'),s(n),s('görmek',{tense:'present',person:'sen'})]));
    for(const owner of ['anne','baba'])add('genitive-'+owner+'-'+n,'Das '+W.byLemma[n].de+' von '+W.byLemma[owner].labels.subject+' ist schön.',['genitive'],single([s(owner,{case:'genitive'}),s(n,{poss:'o'}),s('güzel')],true));
    for(const p of ['ben','sen']){
      add('poss-case-'+p+'-'+n,(p==='ben'?'Ich bin':'Du bist')+' in '+(p==='ben'?'meinem':'deinem')+' '+W.byLemma[n].de+'.',['possessiveCase'],single([s(p),s(n,{poss:p,case:'locative'},{nominal:false})],true));
      // Locative nominal predicate needs the person ending as a separate nominal operation.
      const task=tasks.at(-1);task.groups[0].slots[1].features.predicatePerson=p;
      task.answer=task.groups[0].slots.map(T.surface).join(' ');
    }
    add('instrument-'+n,'Ich komme mit dem '+W.byLemma[n].de+'.',['instrumental'],single([s('ben'),s(n,{case:'instrumental'}),s('gelmek',{tense:'present',person:'ben'})]));
    add('plural-poss-case-'+n,'Wir sind in unseren '+(n==='ev'?'Häusern':'Autos')+'.',['combinedNoun'],single([s('biz'),s(n,{plural:true,poss:'biz',case:'locative',predicatePerson:'biz'})]));
    tasks.at(-1).answer='biz '+T.nominal(T.noun(n,{plural:true,poss:'biz',case:'locative'}),{person:'biz'});
  }
  for(const lemma of ['gelmek','gitmek']){
    add('imperative-'+lemma,(lemma==='gelmek'?'Komm':'Geh')+'!',['imperative'],single([s(lemma,{tense:'imperative',person:'sen'})]));
    add('want-'+lemma,'Ich möchte '+(lemma==='gelmek'?'kommen':'gehen')+'.',['want'],single([s(lemma,{tense:'infinitive'}),s('istemek',{tense:'present',person:'ben'})],true));
  }
  for(const p of T.people){
    const i=T.people.indexOf(p), subject=subjectDe[i];
    for(const lemma of ['gelmek','gitmek']){
      const action=lemma==='gelmek'?'kommen':'gehen', past=lemma==='gelmek'?'kam':'ging';
      const pastDe=[past,past+'st',past,past+'en',past+'t',past+'en'][i];
      add('past-'+lemma+'-'+p,subject+' '+pastDe+'.',['past',...(i>3?['otherPeople']:[])],single([s(p),s(lemma,{tense:'past',person:p})]));
      add('past-neg-'+lemma+'-'+p,subject+' '+pastDe+' nicht.',['pastQuestions',...(i>3?['otherPeople']:[])],single([s(p),s(lemma,{tense:'past',person:p,negative:true})]));
      add('past-q-'+lemma+'-'+p,pastDe.charAt(0).toUpperCase()+pastDe.slice(1)+' '+subject.toLowerCase()+'?',['pastQuestions',...(i>3?['otherPeople']:[])],single([s(p),s(lemma,{tense:'past',person:p,question:true})]));
      if(i>3) add('people-'+lemma+'-'+p,subject+' '+verbDe[lemma][i]+'.',['otherPeople'],single([s(p),s(lemma,{tense:'present',person:p})]));
      add('future-'+lemma+'-'+p,subject+' '+['werde','wirst','wird','werden','werdet','werden'][i]+' '+action+'.',['future'],single([s(p),s(lemma,{tense:'future',person:p})]));
      add('habit-'+lemma+'-'+p,subject+' '+verbDe[lemma][i]+' regelmäßig.',['aorist'],single([s(p),s(lemma,{tense:'aorist',person:p})]));
      add('habit-neg-'+lemma+'-'+p,subject+' '+verbDe[lemma][i]+' gewöhnlich nicht.',['aorist'],single([s(p),s(lemma,{tense:'aorist',person:p,negative:true})]));
      add('ability-'+lemma+'-'+p,subject+' '+['kann','kannst','kann','können','könnt','können'][i]+' '+action+'.',['ability'],single([s(p),s(lemma,{tense:'aorist',ability:true,person:p})]));
      add('reported-'+lemma+'-'+p,subject+' '+pastDe+' (wie ich gehört habe).',['reported'],single([s(p),s(lemma,{tense:'reported',person:p})]));
      add('necessity-'+lemma+'-'+p,subject+' '+['muss','musst','muss','müssen','müsst','müssen'][i]+' '+action+'.',['necessity'],single([s(p),s(lemma,{tense:'necessity',person:p})]));
    }
  }
  for(const n of ['ev','araba']){
    add('nominal-past-'+n,'Das '+W.byLemma[n].de+' war schön.',['nominalPast'],single([s(n),s('güzel',{past:true},{nominal:true})]));
    const other=n==='ev'?'araba':'ev';
    add('compare-'+n,'Das '+W.byLemma[n].de+' ist schöner als das '+W.byLemma[other].de+'.',['comparison'],single([s(n),s(other,{case:'ablative'}),s('daha'),s('güzel')],true));
    add('super-'+n,'Das '+W.byLemma[n].de+' ist am schönsten.',['comparison'],single([s(n),s('en'),s('güzel')],true));
    add('reason-'+n,'Ich komme, weil das '+W.byLemma[n].de+' schön ist.',['reason'],[group('main','Aussage',[s('ben'),s('gelmek',{tense:'present',person:'ben'})]),group('reason','Grund',[s('çünkü'),s(n),s('güzel')],true)]);
    add('ip-'+n,'Ich gehe '+W.byLemma[n].labels.to+' und sehe Mama.',['ip'],[group('first','Erste Handlung',[s(n,{case:'dative'}),s('gitmek',{tense:'ip'})],true),group('main','Danach',[s('anne',{case:'accusative'}),s('görmek',{tense:'present',person:'ben'})])]);
    add('purpose-'+n,'Ich komme, um das '+W.byLemma[n].de+' zu sehen.',['purpose'],[group('purpose','Zweck',[s(n,{case:'accusative'}),s('görmek',{tense:'infinitive'}),s('için')],true),group('main','Handlung',[s('gelmek',{tense:'present',person:'ben'})])]);
  }
  for(const p of ['sen','o']){
    const owner=p==='sen'?'dein':'sein/ihr', subject=p==='sen'?'du':'er/sie';
    const embedded=(lemma,tense,caseKey)=>[s(p,{case:'genitive'}),s(lemma,{tense,poss:p,case:caseKey})];
    for(const lemma of ['gelmek','gitmek']){
      const action=lemma==='gelmek'?'Kommen':'Gehen', finite=lemma==='gelmek'?'kommst':'gehst';
      add('ma-'+lemma+'-'+p,owner.charAt(0).toUpperCase()+owner.slice(1)+' '+action+' ist schön.',['nominalMa'],[group('action','Handlung',embedded(lemma,'ma','bare'),true),group('main','Eigenschaft',[s('güzel')])]);
      add('ken-'+lemma+'-'+p,'Während '+subject+' '+(p==='sen'?finite:lemma==='gelmek'?'kommt':'geht')+', gehe ich nach Hause.',['ken'],[group('time','Während',[s(p),s(lemma,{tense:'ken'})],true),group('main','Hauptaussage',[s('ben'),s('ev',{case:'dative'}),s('gitmek',{tense:'present',person:'ben'})])]);
      add('ince-'+lemma+'-'+p,'Sobald '+subject+' '+(p==='sen'?finite:lemma==='gelmek'?'kommt':'geht')+', gehe ich nach Hause.',['ince'],[group('time','Sobald',[s(p),s(lemma,{tense:'ince'})],true),group('main','Hauptaussage',[s('ben'),s('ev',{case:'dative'}),s('gitmek',{tense:'present',person:'ben'})])]);
      add('conditional-'+lemma+'-'+p,'Wenn '+subject+' '+(p==='sen'?finite:lemma==='gelmek'?'kommt':'geht')+', komme ich.',['conditional'],[group('condition','Bedingung',[s(p),s(lemma,{tense:'conditional',person:p})],true),group('main','Folge',[s('gelmek',{tense:'aorist',person:'ben'})])]);
      add('dik-'+lemma+'-'+p,'Ich weiß, dass '+subject+' '+(lemma==='gelmek'?'gekommen':'gegangen')+' '+(p==='sen'?'bist':'ist')+'.',['nominalDik'],[group('content','Inhalt',embedded(lemma,'dik','accusative'),true),group('main','Aussage',[s('bilmek',{tense:'present',person:'ben'})])]);
      add('future-content-'+lemma+'-'+p,'Ich weiß, dass '+subject+' '+(lemma==='gelmek'?'kommen':'gehen')+' '+(p==='sen'?'wirst':'wird')+'.',['nominalFuture'],[group('content','Inhalt',embedded(lemma,'acak','accusative'),true),group('main','Aussage',[s('bilmek',{tense:'present',person:'ben'})])]);
      add('indirect-'+lemma+'-'+p,'Ich sage, dass '+subject+' '+(lemma==='gelmek'?'gekommen':'gegangen')+' '+(p==='sen'?'bist':'ist')+'.',['indirect'],[group('content','Inhalt',embedded(lemma,'dik','accusative'),true),group('main','Aussage',[s('söylemek',{tense:'present',person:'ben'})])]);
      add('speech-'+lemma+'-'+p,'Ich sage, dass '+subject+' '+(lemma==='gelmek'?'kommen':'gehen')+' '+(p==='sen'?'wirst':'wird')+'.',['indirectSpeech'],[group('content','Inhalt',embedded(lemma,'acak','accusative'),true),group('main','Aussage',[s('söylemek',{tense:'present',person:'ben'})])]);
      add('indirect-q-'+lemma+'-'+p,'Ich frage, ob '+subject+' '+(lemma==='gelmek'?'gekommen':'gegangen')+' '+(p==='sen'?'bist':'ist')+'.',['indirectQuestion'],[group('content','Frageinhalt',[s(p,{case:'genitive'}),s(lemma,{tense:'ip'}),s(lemma,{tense:'dik',negative:true,poss:p,case:'accusative'})],true),group('main','Aussage',[s('sormak',{tense:'present',person:'ben'})])]);
      add('despite-'+lemma+'-'+p,'Obwohl '+subject+' '+(p==='sen'?finite:lemma==='gelmek'?'kommt':'geht')+', gehe ich.',['concession'],[group('concession','Obwohl',[...embedded(lemma,'ma','dative'),s('rağmen')],true),group('main','Hauptaussage',[s('gitmek',{tense:'present',person:'ben'})])]);
    }
  }
  for(const n of ['ev','araba']){
    add('arak-'+n,'Ich komme und sehe dabei das '+W.byLemma[n].de+'.',['arak'],[group('accompany','Begleitend',[s(n,{case:'accusative'}),s('görmek',{tense:'arak'})],true),group('main','Handlung',[s('gelmek',{tense:'present',person:'ben'})])]);
    add('multi-'+n,'Sobald du kommst, kann ich das '+W.byLemma[n].de+' sehen.',['multiClause'],[group('time','Zeit',[s('sen'),s('gelmek',{tense:'ince'})],true),group('main','Hauptaussage',[s(n,{case:'accusative'}),s('görmek',{tense:'aorist',ability:true,person:'ben'})])]);
    for(const actor of ['anne','baba']){
      add('relative-an-'+actor+'-'+n,W.byLemma[actor].labels.subject+', die/der '+W.byLemma[n].labels.to+' kommt, ist schön.',['relativeAn'],[group('relative','Beschriebene Person',[s(n,{case:'dative'}),s('gelmek',{tense:'an'}),s(actor)],true),group('main','Aussage',[s('güzel')])]);
    }
    for(const p of ['sen','ben']){
      const deP=p==='sen'?'du':'ich', dePast=p==='sen'?'hast':'habe', deFuture=p==='sen'?'wirst':'werde';
      const phrase=tense=>[s(p,{case:'genitive'}),s('görmek',{tense,poss:p}),s(n)];
      add('relative-dik-'+n+'-'+p,'Das '+W.byLemma[n].de+', das '+deP+' gesehen '+dePast+', ist schön.',['relativeDik'],[group('relative','Beschriebenes Objekt',phrase('dik'),true),group('main','Aussage',[s('güzel')])]);
      add('relative-future-'+n+'-'+p,'Das '+W.byLemma[n].de+', das '+deP+' sehen '+deFuture+', ist schön.',['relativeFuture'],[group('relative','Beschriebenes Objekt',phrase('acak'),true),group('main','Aussage',[s('güzel')])]);
    }
    add('passive-'+n,'Das '+W.byLemma[n].de+' wird gesehen.',['passive'],single([s(n),s('görmek',{voice:'passive',tense:'present',person:'o'})]));
  }
  for(const actor of ['anne','baba']){
    add('reflexive-'+actor,W.byLemma[actor].labels.subject+' wäscht sich.',['reflexive'],single([s(actor),s('yıkamak',{voice:'reflexive',tense:'present',person:'o'})]));
    add('reciprocal-'+actor,W.byLemma[actor].labels.subject+' und '+(actor==='anne'?'Papa':'Mama')+' treffen sich.',['reciprocal'],single([s(actor),s('ve'),s(actor==='anne'?'baba':'anne'),s('görmek',{voice:'reciprocal',tense:'present',person:'onlar'})],true));
    add('causative-'+actor,W.byLemma[actor].labels.subject+' lässt das Auto waschen.',['causative'],single([s(actor),s('araba',{case:'accusative'}),s('yıkamak',{voice:'causative',tense:'present',person:'o'})]));
    add('advanced-'+actor,'Obwohl du kommst, wird das Auto, das '+W.byLemma[actor].labels.subject+' gesehen hat, gewaschen.',['advancedMix'],[group('concession','Obwohl',[s('sen',{case:'genitive'}),s('gelmek',{tense:'ma',poss:'sen',case:'dative'}),s('rağmen')],true),group('relative','Beschriebenes Objekt',[s(actor,{case:'genitive'}),s('görmek',{tense:'dik',poss:'o'}),s('araba')],true),group('main','Hauptaussage',[s('yıkamak',{voice:'passive',tense:'present',person:'o'})])]);
  }
  // Consolidation uses the earlier cases inside the new tense or construction.
  for(const p of T.people){
    const i=T.people.indexOf(p), subj=subjectDe[i];
    for(const lemma of ['gelmek','gitmek']){
      const action=lemma==='gelmek'?'kommen':'gehen', present=verbDe[lemma][i];
      add('future-neg-'+lemma+'-'+p,subj+' '+['werde','wirst','wird','werden','werdet','werden'][i]+' nicht '+action+'.',['future'],single([s(p),s(lemma,{tense:'future',person:p,negative:true})]));
      add('future-q-'+lemma+'-'+p,['Werde','Wirst','Wird','Werden','Werdet','Werden'][i]+' '+subj.toLowerCase()+' '+action+'?',['future'],single([s(p),s(lemma,{tense:'future',person:p,question:true})]));
      add('habit-q-'+lemma+'-'+p,present.charAt(0).toUpperCase()+present.slice(1)+' '+subj.toLowerCase()+' regelmäßig?',['aorist'],single([s(p),s(lemma,{tense:'aorist',person:p,question:true})]));
      add('ability-neg-'+lemma+'-'+p,subj+' '+['kann','kannst','kann','können','könnt','können'][i]+' gerade nicht '+action+'.',['ability'],single([s(p),s(lemma,{tense:'present',person:p,ability:true,negative:true})]));
      for(const place of ['ev','araba']){
        add('past-place-'+lemma+'-'+p+'-'+place,subj+' '+(lemma==='gelmek'?['kam','kamst','kam','kamen','kamt','kamen']:['ging','gingst','ging','gingen','gingt','gingen'])[i]+' '+W.byLemma[place].labels.to+'.',['past',...(i>3?['otherPeople']:[])],single([s(p),s(place,{case:'dative'}),s(lemma,{tense:'past',person:p})]));
      }
    }
    for(const n of ['ev','araba'])add('past-object-'+p+'-'+n,subj+' '+['sah','sahst','sah','sahen','saht','sahen'][i]+' '+W.byLemma[n].labels.object+'.',['past',...(i>3?['otherPeople']:[])],single([s(p),s(n,{case:'accusative'}),s('görmek',{tense:'past',person:p})]));
  }
  for(const p of ['ben','sen'])for(const n of ['ev','araba']){
    const i=T.people.indexOf(p), obj=(p==='ben'?'mein':'dein')+' '+W.byLemma[n].de;
    add('poss-object-'+p+'-'+n,subjectDe[i]+' '+verbDe['görmek'][i]+' '+obj+'.',['possessiveCase'],single([s(p),s(n,{poss:p,case:'accusative'}),s('görmek',{tense:'present',person:p})]));
  }
  for(const owner of ['anne','baba'])for(const n of ['ev','araba']){
    add('genitive-dative-'+owner+'-'+n,'Ich gehe '+(n==='ev'?'zum Haus':'zum Auto')+' von '+W.byLemma[owner].labels.subject+'.',['possessiveCase'],[group('destination','Ziel mit Besitzer',[s(owner,{case:'genitive'}),s(n,{poss:'o',case:'dative'})],true),group('main','Handlung',[s('gitmek',{tense:'present',person:'ben'})])]);
  }
  for(const lemma of ['gelmek','gitmek'])for(const p of ['ben','biz']){
    add('optative-'+lemma+'-'+p,p==='biz'?'Lass uns '+(lemma==='gelmek'?'kommen':'gehen')+'!':'Ich '+(lemma==='gelmek'?'komme':'gehe')+' mal.',['optative'],single([s(lemma,{tense:'optative',person:p})]));
  }
  for(const place of ['ev','araba']){
    for(const before of [true,false])add('before-after-'+place+'-'+before,(before?'Vor':'Nach')+' dem '+(place==='ev'?'Nachhausegehen':'Gang zum Auto')+' sehe ich Mama.',['beforeAfter'],[group('time','Zeitliche Verbindung',[s(place,{case:'dative'}),s('gitmek',before?{tense:'madan'}:{tense:'dik',case:'ablative'}),s(before?'önce':'sonra')],true),group('main','Hauptaussage',[s('anne',{case:'accusative'}),s('görmek',{tense:'present',person:'ben'})])]);
  }
  for(const actor of ['anne','baba'])for(const p of ['ben','sen'])for(const place of ['ev','araba']){
    add('advanced-relative-'+actor+'-'+p+'-'+place,(p==='ben'?'Ich gehe':'Du gehst')+' '+(place==='ev'?'zum Haus':'zum Auto')+', das '+W.byLemma[actor].labels.subject+' gesehen hat.',['advancedMix'],[group('destination','Ziel mit Beschreibung',[s(actor,{case:'genitive'}),s('görmek',{tense:'dik',poss:'o'}),s(place,{case:'dative'})],true),group('main','Hauptaussage',[s(p),s('gitmek',{tense:'present',person:p})])]);
    add('advanced-purpose-'+actor+'-'+p+'-'+place,(p==='ben'?'Ich komme':'Du kommst')+', um das '+W.byLemma[place].de+' zu sehen, das '+W.byLemma[actor].labels.subject+' sehen wird.',['advancedMix'],[group('purpose','Zweck mit Beschreibung',[s(actor,{case:'genitive'}),s('görmek',{tense:'acak',poss:'o'}),s(place,{case:'accusative'}),s('görmek',{tense:'infinitive'}),s('için')],true),group('main','Hauptaussage',[s('gelmek',{tense:'present',person:p})])]);
  }
  function bandAt(level){return bands.find(b=>level>=b.start&&level<=b.end)||bands.at(-1);}
  function prerequisites(id){return [...new Set(bySkill[id].prerequisites.flatMap(p=>[p,...prerequisites(p)]))];}
  function forLevel(task,level=task.min){
    const register=Math.max(level||1,task.min||1)<81?'colloquial':'standard';
    const groups=task.groups.map(g=>({...g,slots:g.slots.map(slot=>W.byId[slot.lemma]?.type==='verb'&&slot.features.tense==='present'
      ?{...slot,features:{...slot.features,register}}:slot)}));
    const hasPresent=groups.some(g=>g.slots.some(s=>W.byId[s.lemma]?.type==='verb'&&s.features.tense==='present'));
    return {...task,groups,verbRegister:register,register:hasPresent?register:'standard',answer:groups.map(g=>g.slots.map(T.surface).join(' ')).join(' ')};
  }
  const api={bands,skills,bySkill,tasks,bandAt,forLevel,prerequisites,maxLevel:160};
  if(node) module.exports=api;else root.AndreCurriculum=api;
})(typeof globalThis==='object'?globalThis:this);
