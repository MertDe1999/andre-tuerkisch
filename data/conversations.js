/* Mert offers two plans. His next line follows André's chosen plan.
   Lines are dictionary lemmas with optional morphology, including distractors. */
(function(root) {
  'use strict';
  const verb = (lemma, tense, person, extra = {}) => [lemma, {tense, person, ...extra}];
  const noun = (lemma, nounCase) => [lemma, {case: nounCase}];
  const branch = (pick, question, cue, answer, other, ask) => ({pick, question, cue, answer, other, ask});
  const scene = (title, theme, level, branches, opening) => ({title, theme, level, branches, opening});
  const want = verb('istemek','present','ben');
  const wantQuestion = ['ne',verb('istemek','present','sen')];
  const watch = ['izlemek',{tense:'infinitive'}];
  // Each list contains natural replies expressing one of the two intentions.
  const opening = (question, cue, left, right) => ({question,cue,replies:[left,right]});
  function order(cue,left,right) {
    function replies(item) {
      const definite=noun(item,'accusative');
      const options=[[item,want],[definite,want],[definite,verb('tercih etmek','present','ben')],[definite,verb('sevmek','present','ben')]];
      const action=['matcha','çay'].includes(item)?'içmek':item==='sos'?null:'yemek';
      if(action)options.push([item,[action,{tense:'infinitive'}],want]);
      return options;
    }
    return opening(wantQuestion,cue,replies(left),replies(right));
  }
  const scenes = [
    scene('Spielabend', 'T02', 1, [
      branch('Mario Party', ['Mario', 'Luigi'], 'Stell Mert deinen Charakter vor. Es ist Luigi.', ['bu','Luigi'], ['bu','Mario']),
      branch('Splatoon 3', ['mürekkep'], 'Mert zeigt dir die Tinte. Sag, dass sie schön ist.', ['mürekkep','güzel'], ['oyun','güzel'])
    ]),
    scene('Serienabend auf dem Sofa', 'T09', 1, [
      branch('Avatar', ['Aang', 'Korra'], 'Zeig auf Aang und stell ihn vor.', ['bu','Aang'], ['bu','Korra']),
      branch('Invader Zim', ['Zim', 'Gir'], 'Stell den kleinen Roboter Gir vor.', ['bu','Gir'], ['bu','Zim'])
    ], opening(['ne',watch,verb('istemek','present','sen')], 'Avatar oder Invader Zim? Sag, worauf du Lust hast.',
      [['Avatar',watch,want],['Avatar','güzel']], [['Invader Zim',watch,want],['Invader Zim','güzel']])),
    scene('Euer Abendessen', 'T05', 1, [
      branch('Burger King', ['Plant-based Long Chicken', 'burger'], 'Bestell den Plant-based Long Chicken.', ['Plant-based Long Chicken'], ['burger']),
      branch('Peter Pane', ['burger', 'çikolata'], 'Du möchtest erst etwas Herzhaftes.', ['burger'], ['çikolata'])
    ]),
    scene('Euer Wochenendtrip', 'T15', 1, [
      branch('Paris', ['gezi', 'çikolata'], 'Du möchtest zuerst einen Ausflug machen.', ['gezi'], ['çikolata']),
      branch('Münster', ['ÁRO', 'market'], 'Du willst zu ÁRO essen gehen.', ['ÁRO'], ['market'])
    ], opening(wantQuestion,'Paris oder Münster? Erzähl Mert, wohin du möchtest.',
      [[noun('Paris','dative'),['gitmek',{tense:'infinitive'}],want],['Paris','güzel']],
      [[noun('Münster','dative'),['gitmek',{tense:'infinitive'}],want],['Münster','güzel']])),
    scene('Die Runde mit Ben', 'T07', 1, [
      branch('park', ['Ben', 'Mert'], 'Mert fragt, wer mitkommt. Sag ihm, dass Ben dabei ist.', ['Ben'], ['Mert']),
      branch('ev', ['Ben', 'anne'], 'Mert fragt, wer zu Hause wartet. Du meinst deine Mutter.', ['anne'], ['Ben'])
    ]),
    scene('Die Einkaufsliste', 'T12', 1, [
      branch('REWE', ['sos', 'çikolata'], 'Du suchst etwas Süßes.', ['çikolata'], ['sos']),
      branch('EDEKA', ['Jalapeño', 'çikolata'], 'Nimm für Mert etwas Scharfes mit.', ['Jalapeño'], ['çikolata'])
    ]),
    scene('Schokolade oder scharfe Soße?', 'T16', 6, [
      branch('çikolata', ['çikolata'], 'Die Schokolade ist schon da. Sag Mert Bescheid.', ['çikolata','var'], ['çikolata','yok']),
      branch('sos', ['sos'], 'Die Soße ist alle. Sag Mert Bescheid.', ['sos','yok'], ['sos','var'])
    ], order('Magst du Schokolade oder möchtest du Soße?', 'çikolata','sos')),
    scene('Beim Serienquiz', 'T09', 6, [
      branch('Avatar', ['Korra'], 'Korrigiere Mert. Auf dem Bild ist Aang.', ['bu','Aang'], ['bu','Korra']),
      branch('Invader Zim', ['Zim'], 'Korrigiere Mert. Auf dem Bild ist Gir.', ['bu','Gir'], ['bu','Zim'])
    ]),
    scene('Nach dem Sport', 'T03', 21, [
      branch('havuz', ['yüzmek', 'dinlenmek'], 'Du möchtest schwimmen.', [['yüzmek',{tense:'infinitive'}], verb('istemek','present','ben')], [['dinlenmek',{tense:'infinitive'}], verb('istemek','present','ben')]),
      branch('park', ['koşmak', 'dinlenmek'], 'Du möchtest dich ausruhen.', [['dinlenmek',{tense:'infinitive'}], verb('istemek','present','ben')], [['koşmak',{tense:'infinitive'}], verb('istemek','present','ben')])
    ]),
    scene('Was lief gestern?', 'T08', 41, [
      branch('Netflix', ['film', 'dizi'], 'Erzähl Mert, dass du einen Film gesehen hast.', ['film',verb('izlemek','past','ben')], ['dizi',verb('izlemek','past','ben')], ['ne',verb('izlemek','past','sen')]),
      branch('Disney+', ['film', 'dizi'], 'Erzähl Mert von gestern. Du hast eine Serie gesehen.', ['dizi',verb('izlemek','past','ben')], ['film',verb('izlemek','past','ben')], ['ne',verb('izlemek','past','sen')])
    ]),
    scene('Morgen im Unterricht', 'T04', 51, [
      branch('matematik', ['üçgen', 'denklem'], 'Du wirst das Dreieck erklären.', [noun('üçgen','accusative'),verb('açıklamak','future','ben')], [noun('denklem','accusative'),verb('açıklamak','future','ben')], ['ne',verb('anlatmak','future','sen')]),
      branch('tarih', ['devrim', 'kaynak'], 'Du wirst die Revolution erklären.', [noun('devrim','accusative'),verb('açıklamak','future','ben')], [noun('kaynak','accusative'),verb('açıklamak','future','ben')], ['ne',verb('anlatmak','future','sen')])
    ]),
    scene('Ein freies Wochenende', 'T15', 81, [
      branch('Paris', ['müze', 'fırın'], 'Du möchtest zuerst ins Museum gehen.', [noun('müze','dative'),['gitmek',{tense:'infinitive'}],verb('istemek','present','ben')], [noun('fırın','dative'),['gitmek',{tense:'infinitive'}],verb('istemek','present','ben')]),
      branch('Münster', ['park', 'kafe'], 'Du möchtest ins Café gehen.', [noun('kafe','dative'),['gitmek',{tense:'infinitive'}],verb('istemek','present','ben')], [noun('park','dative'),['gitmek',{tense:'infinitive'}],verb('istemek','present','ben')])
    ]),
    scene('Die Fernbedienung beim Trash-TV', 'T01', 1, [
      branch('Frauentausch',['drama','program'],'Mert fragt, was dich an der Sendung reizt. Du willst Drama.', ['drama'], ['program']),
      branch('Dschungelcamp',['RTL','RTLZWEI'],'Mert sucht den Sender für das Dschungelcamp.', ['RTL'], ['RTLZWEI'])
    ], opening(['ne',watch,verb('istemek','present','sen')],'Frauentausch oder Dschungelcamp? Du suchst aus.',
      [['Frauentausch',watch,want]], [['Dschungelcamp',watch,want]])),
    scene('Das Outfit fürs Date', 'T06', 6, [
      branch('atlet',['bol','güzel'],'Sag, dass dir das Tanktop gefällt.', ['atlet','güzel'],['atlet','bol']),
      branch('pantolon',['bol','güzel'],'Beschreib den Schnitt deiner Hose. Sie sitzt locker.', ['pantolon','bol'],['pantolon','güzel'])
    ]),
    scene('Welche Konsole kommt mit?', 'T10', 1, [
      branch('PS5',['kumanda','kablo'],'Das Kabel fehlt. Sag es Mert.', ['kablo','yok'], ['kumanda','yok']),
      branch('Nintendo Switch',['pil','kablo'],'Beruhige Mert. Ein Kabel ist da.', ['kablo','var'], ['kablo','yok'])
    ]),
    scene('Eine Runde Koop', 'T11', 1, [
      branch('Split Fiction',['Mio','Zoe'],'Du übernimmst Zoe. Mert spielt Mio.', ['Zoe'], ['Mio']),
      branch('Splatoon 3',['Salmon Run','Split Fiction'],'Du willst zusammen goldene Eier sammeln. Wähle den Modus.', ['Salmon Run'], ['Split Fiction'])
    ]),
    scene('Etwas Süßes bei ÁRO', 'T13', 1, [
      branch('çikolata',['çilek','muz'],'Mert fragt nach der Frucht dazu. Du möchtest Erdbeeren.', ['çilek'], ['muz']),
      branch('kek',['Donauwelle','cheesecake'],'Mert steht an der Theke. Bitte um Käsekuchen.', ['cheesecake'], ['Donauwelle'])
    ], order('Schokolade oder Kuchen? Sag Mert, was du möchtest.', 'çikolata','kek')),
    scene('Zwei Tassen für euch', 'T14', 6, [
      branch('matcha',['Mert','André'],'Der Matcha ist für Mert. Sag, für wen er ist.', ['Mert'], ['André']),
      branch('çay',['süt','çikolata'],'Du möchtest Milch zum Tee.', ['süt'], ['çikolata'])
    ], order('Matcha für Mert oder Tee für dich? Bestell ein Getränk.', 'matcha','çay')),
    scene('Ladekabel gesucht', 'T17', 6, [
      branch('Book 5',['klavye','kablo'],'Mert sucht das Kabel zum Laptop. Du hast es.', ['kablo','var'], ['kablo','yok']),
      branch('Samsung Galaxy S25+',['araba','ev'],'Mert sucht das Handy. Es ist im Auto.', [noun('araba','locative')], [noun('ev','locative')])
    ]),
    scene('Was dir an André auffällt', 'T18', 1, [
      branch('göz',['yeşil','güzel'],'Mert fragt nach der Augenfarbe. Antworte mit der Farbe.', ['yeşil'], ['güzel']),
      branch('saç',['kıvırcık','yeşil'],'Mert fragt, wie die Haare fallen. Beschreib die Locken.', ['kıvırcık'], ['yeşil'])
    ]),
    scene('Samstag in der Küche', 'T20', 6, [
      branch('makarna',['sos','peynir'],'Für die Nudeln fehlt die Soße. Sag es Mert.', ['sos','yok'], ['peynir','yok']),
      branch('salata',['domates','soğan'],'Für den Salat sind noch Tomaten da.', ['domates','var'], ['soğan','var'])
    ], order('Was kocht ihr am Wochenende – Nudeln oder Salat?', 'makarna','salata')),
    scene('Socken für Mert', 'T21', 6, [
      branch('renk',['pembe','yeşil'],'Für dieses Paar sucht Mert Rosa aus.', ['pembe'], ['yeşil']),
      branch('desen',['kaplumbağa','köpek'],'Erinnere Mert an das Schildkrötenmotiv.', ['kaplumbağa'], ['köpek'])
    ]),
    scene('Kochfernsehen mit Mama', 'T22', 6, [
      branch('tarif',['çorba','makarna'],'Welches Rezept soll Mama aufschreiben? Nimm die Suppe.', ['çorba'], ['makarna']),
      branch('yarışma',['aşçı','sunucu'],'Wen feuert ihr an? Du meinst den Koch.', ['aşçı'], ['sunucu'])
    ]),
    scene('Kommentar vom Sofa', 'T23', 6, [
      branch('siyaset',['saçma','komik'],'Der politische Spruch war absurd. Sag, was du davon hältst.', ['saçma'], ['komik']),
      branch('skandal',['boktan','komik'],'Die Ausrede war beschissen. Sag es auf Türkisch.', ['boktan'], ['komik'])
    ]),
    scene('Erst Ben, dann der Abend', 'T19', 121, [
      branch('park', ['film', 'dizi'], 'Wenn Ben nach Hause kommt, werdet ihr einen Film sehen.', ['Ben',noun('ev','dative'),['gelmek',{tense:'ince'}], 'film',verb('izlemek','future','biz')], ['Ben',noun('ev','dative'),['gelmek',{tense:'ince'}],'dizi',verb('izlemek','future','biz')], ['Ben',noun('ev','dative'),['gelmek',{tense:'ince'}],'ne',verb('yapmak','future','biz')]),
      branch('ev', ['çay', 'su'], 'Bevor Ben kommt, werdet ihr Tee trinken.', ['Ben',['gelmek',{tense:'madan'}],'önce','çay',verb('içmek','future','biz')], ['Ben',['gelmek',{tense:'madan'}],'önce','su',verb('içmek','future','biz')], ['Ben',['gelmek',{tense:'madan'}],'önce','ne',verb('içmek','future','biz')])
    ])
  ];
  // Before the richer vocabulary is available these scenes use the first word
  // package and familiar names. Each one retires when a fuller scene is playable.
  const starters=[
    ['Figurenwahl', 'T02', 'Mario Party','Luigi','Mario','Mert nimmt Mario. Du spielst Luigi.', 'The Sims','ev','araba','Du möchtest im Spiel zuerst ein Haus.'],
    ['Sporttasche', 'T03', 'havuz','protein','Red Bull','Nach dem Schwimmen möchtest du einen Proteinsnack.', 'park','Ben','Mert','Nimm Ben mit in den Park.'],
    ['Geschichtsstunde', 'T04','Roma','öğretmen','Mert','Wer erklärt Rom in der Klasse? Antworte mit dem Beruf.', 'Mısır','video','gezi','Für Ägypten plant ihr einen Filmclip statt eines Ausflugs.'],
    ['Ein Kompliment', 'T06','saç','güzel','adam','Sag, dass dir die Frisur gefällt.', 'adam','André','Mert','Mert fragt, wen du auf dem Foto meinst. Es ist André.'],
    ['Bildschirmzeit', 'T08','TikTok','video','film','Du willst einen kurzen Clip sehen.', 'Netflix','Black Mirror','Avatar','Heute möchtest du etwas Düsteres.'],
    ['Lieblingsfiguren', 'T09','Avatar','Aang','Gir','Nenne den Luftbändiger.', 'Invader Zim','Gir','Zim','Mert mag den kleinen Roboter. Wie heißt er?'],
    ['Auf dem Sofa spielen', 'T10','PS5','oyun','film','Du willst spielen. Nenne das Spiel als Beschäftigung.', 'Quest 3','video','oyun','Mert hat ein VR-Video vorbereitet. Wähle das Video.'],
    ['An der Kuchentheke', 'T13','Donauwelle','çikolata','chia','Was gehört oben auf die Donauwelle?','Red Bull','market','mutfak','Das Getränk ist alle. Wohin zum Einkaufen?'],
    ['Merts Getränk', 'T14','matcha','Mert','André','Für wen ist der Matcha?', 'Red Bull','market','ev','Ihr wollt die Sorte kaufen. Nenne den Supermarkt.'],
    ['Scharfe Bestellung', 'T16','Sriracha','sos','çikolata','Was für eine Zutat ist Sriracha?', 'Jalapeño','Mert','Ben','Wer von euch liebt die scharfen Chilis?'],
    ['Unterwegs mit Technik', 'T17','araba','Münster','ev','Ihr fahrt zum Weihnachtsmarkt. Nenne die Stadt.', 'Book 5','video','oyun','Auf dem Laptop zeigst du Mert einen Videoclip.'],
    ['Komplimente für André', 'T18','André','saç','araba','Du bewunderst seine Dauerwelle. Was gefällt dir?', 'Mert','güzel','köpek','André macht dir ein Kompliment. Welches Wort passt?'],
    ['Besuch bei Mama', 'T19','anne','mutfak','park','Wo bereitet Mama das Essen vor?', 'Ben','köpek','anne','Mert fragt, wer Ben ist. Nenne das Tier.'],
    ['Wochenende zu zweit', 'T20','market','sos','oyun','Was fehlt für euer Essen? Nimm die Soße mit.', 'mutfak','masa','araba','Du willst den Tisch decken. Nenne den Tisch.'],
    ['Ein Geschenk aussuchen', 'T21','Mert','hediye','araba','Nenne das türkische Wort für das Geschenk für Mert.', 'André','çikolata','konsol','Für André soll es etwas Süßes sein.'],
    ['Mit Mama vor dem Fernseher', 'T22','anne','program','gezi','Ihr setzt euch vor den Fernseher. Was beginnt jetzt?', 'mutfak','çikolata','havuz','Ihr kocht das Dessert nach. Was kommt hinein?'],
    ['Kommentar zur Talkshow', 'T23','Merz','drama','protein','Wie nennst du das Theater im Studio?', 'RTL','yarak','program','Mert will das derbe Wort hören, das gerade weggepiept wurde.']
  ];
  for (const [title,theme,left,a,b,cue,right,c,d,otherCue] of starters) {
    const s=scene(title,theme,1,[
      branch(left,[a,b],cue,[a],[b]),
      branch(right,[d,c],otherCue,[c],[d])
    ]);
    s.starter=true;
    scenes.push(s);
  }
  // A returning conversation can ask about a different detail of the same decision.
  const followups = [
    ['Serienabend auf dem Sofa','Avatar',['su','ateş'],'Mert fragt nach dem Element von Korras Heimatstamm.', ['su'],['ateş']],
    ['Serienabend auf dem Sofa','Invader Zim',['robot','uzaylı'],'Und was ist Gir eigentlich? Sag es Mert.', ['robot'],['uzaylı']],
    ['Euer Wochenendtrip','Paris',['fırın','müze'],'Du willst zuerst Croissants holen. Wohin geht ihr?', [noun('fırın','dative')],[noun('müze','dative')]],
    ['Euer Wochenendtrip','Münster',['kafe','park'],'Du möchtest einen Spaziergang. Wohin geht ihr?', [noun('park','dative')],[noun('kafe','dative')]],
    ['Schokolade oder scharfe Soße?','çikolata',['muz','çilek'],'Mert möchte Obst mit Schokolade. Schlag Banane vor.', ['muz'],['çilek']],
    ['Schokolade oder scharfe Soße?','sos',['Sriracha','Jalapeño'],'Mert fragt nach seiner Lieblingssoße. Nimm Sriracha.', ['Sriracha'],['Jalapeño']],
    ['Zwei Tassen für euch','matcha',['süt','su'],'Mert möchte seinen Matcha mit Milch.', ['süt'],['su']],
    ['Zwei Tassen für euch','çay',['Mert','André'],'Für wen ist der Tee? Antworte für dich als André.', ['André'],['Mert']],
    ['Samstag in der Küche','makarna',['tencere','tava'],'Worin kocht ihr die Nudeln? Nenne den Topf.', ['tencere'],['tava']],
    ['Samstag in der Küche','salata',['limon','çikolata'],'Mert sucht etwas Saures für das Dressing.', ['limon'],['çikolata']],
    ['Eine Runde Koop','Split Fiction',['yeniden denemek','dinlenmek'],'Ihr seid gescheitert. Schlag einen neuen Versuch vor.', [['yeniden denemek',{tense:'infinitive'}],want],[['dinlenmek',{tense:'infinitive'}],want]],
    ['Eine Runde Koop','Splatoon 3',['takım','görev'],'Mert fragt, was euch noch fehlt. Ihr sucht ein Team.', ['takım','yok'],['görev','yok']]
  ];
  for (const [title,pick,question,cue,answer,other] of followups) {
    const target=scenes.find(s=>s.title===title).branches.find(b=>b.pick===pick);
    target.followups=[{question,cue,answer,other}];
  }
  // A second, open decision in the same conversation. Each possible message
  // carries Mert's own follow-up and the sentence André can build in reply.
  const at = word => noun(word,'locative');
  const past = (word,person) => verb(word,'past',person);
  const present = (word,person) => verb(word,'present',person);
  const available = {question:true};
  const isThere = word => [word,['var',available]];
  const route = (pick,question,cue,answer) => ({pick,question,cue,answer});
  const plans = {
    T01: [['ne',past('beğenmek','sen')],
      route('sunucu',['sunucu','komik', ['değil',available]],'Sag, dass der Moderator lustig war.', ['sunucu',['komik',{past:true}]]),
      route('yarışmacı',['yarışmacı',['komik',available]],'Du fandest den Kandidaten süß.', ['yarışmacı','sevimli'])],
    T02: [['Zelda','için','ne',present('istemek','sen')],
      route('kılıç',isThere('kılıç'),'Du hast ein neues Schwert entdeckt.', ['yeni','kılıç','var']),
      route('kalkan',isThere('kalkan'),'Der Schild ist im Haus.', ['kalkan',at('ev')])],
    T03: [['bugün','ne',present('istemek','sen')],
      route('antrenman',['antrenman','bugün', ['değil',available]],'Das Training ist morgen.', ['antrenman','yarın']),
      route('havuz',isThere('havlu'),'Dein Handtuch liegt im Auto.', ['havlu',at('araba')])],
    T04: [['yarın','ne','var'],
      route('sınav',isThere('soru'),'Die Frage ist leicht.', ['soru','kolay']),
      route('ödev',['ödev',['kolay',available]],'Die Hausaufgabe ist kurz.', ['ödev','kısa'])],
    T05: [['ne',present('istemek','sen')],
      route('burger',isThere('sos'),'Es gibt scharfe Soße.', ['acı','sos','var']),
      route('çorba',['çorba',['sıcak',available]],'Die Suppe ist warm.', ['çorba','sıcak'])],
    T06: [['ne',present('giymek','sen')],
      route('atlet',['atlet',['yeni',available]],'Das Tanktop ist neu.', ['atlet','yeni']),
      route('kot pantolon',['kot pantolon',['yeni',available]],'Die Jeans ist ein Geschenk.', ['kot pantolon','bir','hediye'])],
    T07: [['Ben','ne',present('istemek','o')],
      route('top',['top',at('ev'),['değil',available]],'Bens Ball liegt im Auto.', ['top',at('araba')]),
      route('mama',isThere('mama'),'Du hast das Futter im Auto.', ['mama',at('araba')])],
    T08: [['ne', ['izlemek',{tense:'infinitive'}],present('istemek','sen')],
      route('film',['film',['komik',available]],'Der Film ist lustig.', ['film','komik']),
      route('dizi',isThere('altyazı'),'Es gibt Untertitel.', ['altyazı','var'])],
    T09: [['ne',past('beğenmek','sen')],
      route('kahraman',['kahraman',['güçlü',available]],'Der Held ist stark.', ['kahraman','güçlü']),
      route('düşman',['düşman',['komik',available]],'Der Gegner ist ein Roboter.', ['düşman','bir','robot'])],
    T10: [['ne',present('istemek','sen')],
      route('Quest 3',isThere('pil'),'Die Batterie liegt auf dem Tisch.', ['pil',at('masa')]),
      route('PS5',isThere('kumanda'),'Der Controller ist zu Hause.', ['kumanda',at('ev')])],
    T11: [['ne',present('istemek','sen')],
      route('takım',['takım',['güçlü',available]],'Euer Team ist stark.', ['takım','güçlü']),
      route('görev',['görev',['kolay',available]],'Die Mission ist kurz.', ['görev','kısa'])],
    T12: [['ne',present('istemek','sen')],
      route('ekmek',isThere('ekmek'),'Es gibt noch Brot.', ['ekmek','var']),
      route('süt',isThere('süt'),'Die Milch ist aus.', ['süt','yok'])],
    T13: [['ne',present('istemek','sen')],
      route('kek',['kek',['tatlı',available]],'Der Kuchen ist süß.', ['kek','tatlı']),
      route('muz',isThere('çikolata'),'Zur Banane ist noch Schokolade da.', ['çikolata','var'])],
    T14: [['ne',present('istemek','sen')],
      route('matcha',['matcha','Mert','için', ['değil',available]],'Der Matcha ist für Mert.', ['matcha','Mert','için']),
      route('çay',isThere('süt'),'Für den Tee ist Milch da.', ['süt','var'])],
    T15: [['bugün','ne', ['görmek',{tense:'infinitive'}],present('istemek','sen')],
      route('müze',['müze',['büyük',available]],'Das Museum ist groß.', ['müze','büyük']),
      route('köprü',['köprü',['güzel',available]],'Die Brücke ist schön.', ['köprü','güzel'])],
    T16: [['ne',present('istemek','sen')],
      route('Sriracha',['sos',['acı',available]],'Die Soße ist scharf.', ['sos','acı']),
      route('Jalapeño',isThere('biber'),'Es gibt scharfe Paprika.', ['acı','biber','var'])],
    T17: [['ne',present('istemek','sen')],
      route('telefon',isThere('şarj'),'Das Handy hat keinen Akku mehr. Sag: Keine Ladung mehr.', ['şarj','yok']),
      route('bilgisayar',isThere('klavye'),'Die Tastatur liegt auf dem Tisch.', ['klavye',at('masa')])],
    T18: [['ne',past('beğenmek','sen')],
      route('saç',['saç',['kıvırcık',available]],'Die Haare sind lockig.', ['saç','kıvırcık']),
      route('gülüş',['gülüş',['güzel',available]],'Das Lächeln ist schön.', ['gülüş','güzel'])],
    T19: [['ne',present('istemek','sen')],
      route('çay',isThere('fincan'),'Die Tasse steht auf dem Tisch.', ['fincan',at('masa')]),
      route('yemek',['anne','ne',past('pişirmek','o')],'Mama hat Suppe gekocht.', ['anne','çorba',past('pişirmek','o')])],
    T20: [['ne',['pişirmek',{tense:'infinitive'}],present('istemek','sen')],
      route('çorba',isThere('tencere'),'Der Topf steht auf dem Tisch.', ['tencere',at('masa')]),
      route('suşi',isThere('pirinç'),'Für das Sushi ist noch Reis da.', ['pirinç','var'])],
    T21: [['ne',past('beğenmek','sen')],
      route('desen',['desen',['sevimli',available]],'Das Motiv ist süß.', ['desen','sevimli']),
      route('renk',['renk',['güzel',available]],'Dir gefällt die Farbe.', ['renk','güzel'])],
    T22: [['ne', ['pişirmek',{tense:'infinitive'}],present('istemek','sen')],
      route('kek',isThere('yumurta'),'Die Eier stehen auf dem Tisch.', ['yumurta',at('masa')]),
      route('çorba',isThere('tuz'),'Für die Suppe fehlt Salz.', ['tuz','yok'])],
    T23: [['ne',past('beğenmek','sen')],
      route('yorum',['yorum',['komik',available]],'Der Kommentar war lustig.', ['yorum',['komik',{past:true}]]),
      route('röportaj',['röportaj',['kısa',available]],'Das Interview war kurz.', ['röportaj',['kısa',{past:true}]])]
  };
  for (const s of scenes) {
    const [question,...routes]=plans[s.theme];
    s.continuation={question,routes};
  }
  // Mert first responds to the detail André actually sent. Extra variants
  // have their own reaction, since their subject can differ from the first.
  const reactions={
    'Spielabend':[['Luigi','komik'],['mürekkep','güzel']],
    'Serienabend auf dem Sofa':[['Aang','güçlü'],['Gir','komik']],
    'Euer Abendessen':[['bu','burger','güzel'],['burger','güzel']],
    'Euer Wochenendtrip':[['Paris','güzel'],['ÁRO','güzel']],
    'Die Runde mit Ben':[['Ben','sevimli'],['anne',at('ev')]],
    'Die Einkaufsliste':[['çikolata','tatlı'],['Jalapeño','acı']],
    'Schokolade oder scharfe Soße?':[['muz','var'],['domates','var']],
    'Beim Serienquiz':[['Aang','güçlü'],['Gir','sevimli']],
    'Nach dem Sport':[['havuz','güzel'],['park','güzel']],
    'Was lief gestern?':[['film','güzel'],['dizi','güzel']],
    'Morgen im Unterricht':[['matematik','güzel'],['tarih','güzel']],
    'Ein freies Wochenende':[['Paris','güzel'],['Münster','güzel']],
    'Die Fernbedienung beim Trash-TV':[['bu','program','komik'],['Dschungelcamp','komik']],
    'Das Outfit fürs Date':[['atlet','güzel'],['kot pantolon','güzel']],
    'Welche Konsole kommt mit?':[['kablo',at('ev')],['kablo','var']],
    'Eine Runde Koop':[['Mio','güçlü'],['Salmon Run','güzel']],
    'Etwas Süßes bei ÁRO':[['çilek','tatlı'],['kek','güzel']],
    'Zwei Tassen für euch':[['matcha',present('sevmek','ben')],['süt','var']],
    'Ladekabel gesucht':[['bilgisayar',at('ev')],['araba',at('ev')]],
    'Was dir an André auffällt':[['göz','güzel'],['kıvırcık','saç','güzel']],
    'Samstag in der Küche':[['domates','var'],['salata','güzel']],
    'Socken für Mert':[['renk','güzel'],['kaplumbağa','sevimli']],
    'Kochfernsehen mit Mama':[['çorba','güzel'],['aşçı','güçlü']],
    'Kommentar vom Sofa':[['siyaset','saçma'],['skandal','büyük']],
    'Erst Ben, dann der Abend':[['film','güzel'],['çay','sıcak']],
    'Figurenwahl':[['Luigi','komik'],['ev','güzel']],
    'Sporttasche':[['protein','var'],['Ben','sevimli']],
    'Geschichtsstunde':[['ders','güzel'],['video','kısa']],
    'Ein Kompliment':[['saç','güzel'],['André','yakışıklı']],
    'Bildschirmzeit':[['video','kısa'],['Black Mirror','güzel']],
    'Lieblingsfiguren':[['Aang','güçlü'],['Gir','komik']],
    'Auf dem Sofa spielen':[['oyun','güzel'],['video','kısa']],
    'An der Kuchentheke':[['çikolata','tatlı'],['market','büyük']],
    'Merts Getränk':[['matcha',present('sevmek','ben')],['Red Bull','var']],
    'Scharfe Bestellung':[['sos','acı'],['Jalapeño','güzel']],
    'Unterwegs mit Technik':[['Münster','güzel'],['video','kısa']],
    'Komplimente für André':[['saç','güzel'],['sen',['yakışıklı',{person:'sen'}]]],
    'Besuch bei Mama':[['anne',at('ev')],['Ben','sevimli']],
    'Wochenende zu zweit':[['sos','acı'],['sofra','güzel']],
    'Ein Geschenk aussuchen':[['hediye','güzel'],['çikolata','tatlı']],
    'Mit Mama vor dem Fernseher':[['program','güzel'],['çikolata','tatlı']],
    'Kommentar zur Talkshow':[['drama','büyük'],['RTL','komik']]
  };
  const extraReactions=[
    ['Korra','güçlü'],['Gir','sevimli'],['kruvasan','güzel'],['park','güzel'],
    ['muz','tatlı'],['Sriracha','acı'],['süt','var'],['çay','sıcak'],
    ['tencere',at('ev')],['limon','var'],['birlikte','daha','kolay'],['biz','bir',['takım',{person:'biz'}]]
  ];
  for (const s of scenes) s.branches.forEach((b,i)=>{b.reaction=reactions[s.title][i];});
  followups.forEach(([title,pick],i)=>{
    scenes.find(s=>s.title===title).branches.find(b=>b.pick===pick).followups[0].reaction=extraReactions[i];
  });
  if (typeof module === 'object' && module.exports) module.exports = scenes;
  else root.AndreConversations = scenes;
})(typeof globalThis === 'object' ? globalThis : this);
