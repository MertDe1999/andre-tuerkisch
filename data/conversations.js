/* Mert offers two plans. His next line follows André's chosen plan.
   Lines are dictionary lemmas with optional morphology, including distractors. */
(function(root) {
  'use strict';
  const verb = (lemma, tense, person, extra = {}) => [lemma, {tense, person, ...extra}];
  const noun = (lemma, nounCase) => [lemma, {case: nounCase}];
  const branch = (pick, question, cue, answer, other, ask) => ({pick, question, cue, answer, other, ask});
  const scene = (title, theme, level, branches) => ({title, theme, level, branches});
  const scenes = [
    scene('Spielabend', 'T02', 1, [
      branch('Mario Party', ['Mario', 'Luigi'], 'Stell Mert deinen Charakter vor. Es ist Luigi.', ['bu','Luigi'], ['bu','Mario']),
      branch('Splatoon 3', ['mürekkep'], 'Mert zeigt dir die Tinte. Sag, dass sie schön ist.', ['mürekkep','güzel'], ['oyun','güzel'])
    ]),
    scene('Serienabend auf dem Sofa', 'T09', 1, [
      branch('Avatar', ['Aang', 'Korra'], 'Zeig auf Aang und stell ihn vor.', ['bu','Aang'], ['bu','Korra']),
      branch('Invader Zim', ['Zim', 'Gir'], 'Stell den kleinen Roboter Gir vor.', ['bu','Gir'], ['bu','Zim'])
    ]),
    scene('Euer Abendessen', 'T05', 1, [
      branch('Burger King', ['Plant-based Long Chicken', 'burger'], 'Bestell den Plant-based Long Chicken.', ['Plant-based Long Chicken'], ['burger']),
      branch('Peter Pane', ['burger', 'çikolata'], 'Du möchtest erst etwas Herzhaftes.', ['burger'], ['çikolata'])
    ]),
    scene('Euer Wochenendtrip', 'T15', 1, [
      branch('Paris', ['gezi', 'çikolata'], 'Du möchtest zuerst einen Ausflug machen.', ['gezi'], ['çikolata']),
      branch('Münster', ['ÁRO', 'market'], 'Du willst zu ÁRO essen gehen.', ['ÁRO'], ['market'])
    ]),
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
    ]),
    scene('Beim Serienquiz', 'T09', 6, [
      branch('Avatar', ['Korra'], 'Korrigiere Mert. Auf dem Bild ist Aang.', ['bu','Aang'], ['bu','Korra']),
      branch('Invader Zim', ['Zim'], 'Korrigiere Mert. Auf dem Bild ist Gir.', ['bu','Gir'], ['bu','Zim'])
    ]),
    scene('Nach dem Sport', 'T03', 21, [
      branch('havuz', ['yüzmek', 'dinlenmek'], 'Du möchtest schwimmen.', [['yüzmek',{tense:'infinitive'}], verb('istemek','present','ben')], [['dinlenmek',{tense:'infinitive'}], verb('istemek','present','ben')]),
      branch('park', ['koşmak', 'dinlenmek'], 'Du möchtest dich ausruhen.', [['dinlenmek',{tense:'infinitive'}], verb('istemek','present','ben')], [['koşmak',{tense:'infinitive'}], verb('istemek','present','ben')])
    ]),
    scene('Was lief gestern?', 'T09', 41, [
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
    scene('Erst Ben, dann der Abend', 'T19', 121, [
      branch('park', ['film', 'dizi'], 'Wenn Ben nach Hause kommt, werdet ihr einen Film sehen.', ['Ben',noun('ev','dative'),['gelmek',{tense:'ince'}], 'film',verb('izlemek','future','biz')], ['Ben',noun('ev','dative'),['gelmek',{tense:'ince'}],'dizi',verb('izlemek','future','biz')], ['Ben',noun('ev','dative'),['gelmek',{tense:'ince'}],'ne',verb('yapmak','future','biz')]),
      branch('ev', ['çay', 'su'], 'Bevor Ben kommt, werdet ihr Tee trinken.', ['Ben',['gelmek',{tense:'madan'}],'önce','çay',verb('içmek','future','biz')], ['Ben',['gelmek',{tense:'madan'}],'önce','su',verb('içmek','future','biz')], ['Ben',['gelmek',{tense:'madan'}],'önce','ne',verb('içmek','future','biz')])
    ])
  ];
  if (typeof module === 'object' && module.exports) module.exports = scenes;
  else root.AndreConversations = scenes;
})(typeof globalThis === 'object' ? globalThis : this);
