/* Shared vocabulary. IDs remain stable across storage migrations. */
(function(root){
 'use strict';
 const words = [
  {
    "id": "w001",
    "de": "Baum",
    "tr": "ağaç",
    "deAnswers": [
      "baum"
    ],
    "type": "noun",
    "labels": {
      "subject": "Der Baum",
      "object": "den Baum",
      "adjectiveObject": "den schönen Baum",
      "to": "zum Baum",
      "from": "vom Baum",
      "at": "am Baum"
    },
    "soften": "ağac",
    "tipDe": "Im Garten steht ein großer Baum.",
    "tipTr": "Bahçede büyük bir ağaç var."
  },
  {
    "id": "w002",
    "de": "Weg / Straße",
    "tr": "yol",
    "deAnswers": [
      "weg",
      "straße",
      "strasse"
    ],
    "type": "noun",
    "labels": {
      "subject": "Der Weg",
      "object": "den Weg",
      "adjectiveObject": "den schönen Weg",
      "to": "zum Weg",
      "from": "vom Weg",
      "at": "auf dem Weg"
    },
    "soften": null,
    "tipDe": "Dieser Weg ist sehr lang.",
    "tipTr": "Bu yol çok uzun."
  },
  {
    "id": "w003",
    "de": "Haus",
    "tr": "ev",
    "deAnswers": [
      "haus"
    ],
    "type": "noun",
    "labels": {
      "subject": "Das Haus",
      "object": "das Haus",
      "adjectiveObject": "das schöne Haus",
      "to": "nach Hause",
      "from": "aus dem Haus",
      "at": "im Haus"
    },
    "soften": null,
    "tipDe": "Das Haus ist sehr schön.",
    "tipTr": "Ev çok güzel."
  },
  {
    "id": "w004",
    "de": "Auto",
    "tr": "araba",
    "deAnswers": [
      "auto"
    ],
    "type": "noun",
    "labels": {
      "subject": "Das Auto",
      "object": "das Auto",
      "adjectiveObject": "das schöne Auto",
      "to": "zum Auto",
      "from": "vom Auto",
      "at": "im Auto"
    },
    "soften": null,
    "tipDe": "Das Auto steht vor dem Haus.",
    "tipTr": "Araba evin önünde."
  },
  {
    "id": "w005",
    "de": "Mama / Mutter",
    "tr": "anne",
    "deAnswers": [
      "mama",
      "mutter"
    ],
    "type": "noun",
    "labels": {
      "subject": "Mama",
      "object": "Mama",
      "adjectiveObject": "die schöne Mama",
      "to": "zu Mama",
      "from": "von Mama",
      "at": "bei Mama"
    },
    "soften": null,
    "tipDe": "Mama ist zu Hause.",
    "tipTr": "Anne evde."
  },
  {
    "id": "w006",
    "de": "Papa / Vater",
    "tr": "baba",
    "deAnswers": [
      "papa",
      "vater"
    ],
    "type": "noun",
    "labels": {
      "subject": "Papa",
      "object": "Papa",
      "adjectiveObject": "den schönen Papa",
      "to": "zu Papa",
      "from": "von Papa",
      "at": "bei Papa"
    },
    "soften": null,
    "tipDe": "Papa ist im Auto.",
    "tipTr": "Baba arabada."
  },
  {
    "id": "w007",
    "de": "älterer Bruder",
    "tr": "abi",
    "deAnswers": [
      "älterer bruder",
      "aelterer bruder"
    ],
    "type": "noun",
    "labels": {
      "subject": "Der ältere Bruder",
      "object": "den älteren Bruder",
      "to": "zum älteren Bruder",
      "from": "vom älteren Bruder",
      "at": "beim älteren Bruder"
    },
    "soften": null,
    "tipDe": "Mein älterer Bruder ist zu Hause.",
    "tipTr": "Abim evde."
  },
  {
    "id": "w008",
    "de": "ältere Schwester",
    "tr": "abla",
    "deAnswers": [
      "ältere schwester",
      "aeltere schwester"
    ],
    "type": "noun",
    "labels": {
      "subject": "Die ältere Schwester",
      "object": "die ältere Schwester",
      "to": "zur älteren Schwester",
      "from": "von der älteren Schwester",
      "at": "bei der älteren Schwester"
    },
    "soften": null,
    "tipDe": "Meine ältere Schwester ist zu Hause.",
    "tipTr": "Ablam evde."
  },
  {
    "id": "w009",
    "de": "Penis",
    "tr": "yarak",
    "deAnswers": [
      "penis"
    ],
    "type": "noun",
    "note": "vulgär",
    "labels": {
      "subject": "Der Penis",
      "object": "den Penis",
      "adjectiveObject": "den schönen Penis",
      "to": "zum Penis",
      "from": "vom Penis",
      "at": "am Penis"
    },
    "soften": "yarağ",
    "tipDe": "Das Wort ist sehr vulgär.",
    "tipTr": "Bu kelime çok kaba."
  },
  {
    "id": "w010",
    "de": "schön",
    "tr": "güzel",
    "deAnswers": [
      "schön",
      "schoen"
    ],
    "type": "adj",
    "tipDe": "Das Haus ist schön.",
    "tipTr": "Ev güzel."
  },
  {
    "id": "w011",
    "de": "gehen",
    "tr": "gitmek",
    "deAnswers": [
      "gehen"
    ],
    "type": "verb",
    "note": "auch „das Gehen“",
    "profile": {
      "forms": [
        "gehe",
        "gehst",
        "geht",
        "gehen"
      ],
      "pattern": "motion"
    },
    "stem": "git",
    "progressiveStem": "gid",
    "aorist": "gider",
    "voice": {},
    "tipDe": "Gehen ist schön.",
    "tipTr": "Gitmek güzel."
  },
  {
    "id": "w012",
    "de": "lieben / mögen",
    "tr": "sevmek",
    "deAnswers": [
      "lieben",
      "mögen",
      "moegen"
    ],
    "type": "verb",
    "profile": {
      "forms": [
        "mag",
        "magst",
        "mag",
        "mögen"
      ],
      "standaloneForms": [
        "liebe",
        "liebst",
        "liebt",
        "lieben"
      ],
      "pattern": "object"
    },
    "stem": "sev",
    "progressiveStem": "sev",
    "aorist": "sever",
    "voice": {},
    "tipDe": "Ich mag dich.",
    "tipTr": "Seni seviyom."
  },
  {
    "id": "w013",
    "de": "kommen",
    "tr": "gelmek",
    "deAnswers": [
      "kommen"
    ],
    "type": "verb",
    "profile": {
      "forms": [
        "komme",
        "kommst",
        "kommt",
        "kommen"
      ],
      "pattern": "motion"
    },
    "stem": "gel",
    "progressiveStem": "gel",
    "aorist": "gelir",
    "voice": {},
    "tipDe": "Ich komme nach Hause.",
    "tipTr": "Eve geliyom."
  },
  {
    "id": "w014",
    "de": "sehen",
    "tr": "görmek",
    "deAnswers": [
      "sehen"
    ],
    "type": "verb",
    "profile": {
      "forms": [
        "sehe",
        "siehst",
        "sieht",
        "sehen"
      ],
      "pattern": "object"
    },
    "stem": "gör",
    "progressiveStem": "gör",
    "aorist": "görür",
    "voice": {
      "passive": "görül",
      "reciprocal": "görüş",
      "causative": "göster"
    },
    "tipDe": "Das Haus zu sehen ist schön.",
    "tipTr": "Evi görmek güzel."
  },
  {
    "id": "w015",
    "de": "es gibt / vorhanden / haben",
    "tr": "var",
    "deAnswers": [
      "es gibt",
      "vorhanden",
      "haben"
    ],
    "type": "existential",
    "tipDe": "Ich habe ein Auto.",
    "tipTr": "Benim arabam var."
  },
  {
    "id": "w016",
    "de": "es gibt nicht / nicht vorhanden / nicht haben",
    "tr": "yok",
    "deAnswers": [
      "es gibt nicht",
      "nicht vorhanden",
      "nicht haben"
    ],
    "type": "existential",
    "tipDe": "Ich habe kein Auto.",
    "tipTr": "Benim arabam yok."
  },
  {
    "id": "w017",
    "de": "nö",
    "tr": "yo",
    "deAnswers": [
      "nö",
      "noe"
    ],
    "type": "colloquial",
    "tipDe": "Nö, heute nicht.",
    "tipTr": "Yo, bugün değil."
  },
  {
    "id": "w018",
    "de": "ja",
    "tr": "evet",
    "deAnswers": [
      "ja"
    ],
    "type": "response",
    "tipDe": "Ja, das ist schön.",
    "tipTr": "Evet, bu güzel."
  },
  {
    "id": "w019",
    "de": "genau",
    "tr": "aynen",
    "deAnswers": [
      "genau"
    ],
    "type": "response",
    "tipDe": "Genau, das meine ich.",
    "tipTr": "Aynen, onu diyorum."
  },
  {
    "id": "w020",
    "de": "nein",
    "tr": "hayır",
    "deAnswers": [
      "nein"
    ],
    "type": "response",
    "tipDe": "Nein, heute nicht.",
    "tipTr": "Hayır, bugün değil."
  },
  {
    "id": "w021",
    "de": "und",
    "tr": "ve",
    "deAnswers": [
      "und"
    ],
    "type": "conjunction",
    "tipDe": "Mama und Papa sind zu Hause.",
    "tipTr": "Anne ve baba evde."
  },
  {
    "id": "w022",
    "de": "das / dies",
    "tr": "bu",
    "deAnswers": [
      "das",
      "dies"
    ],
    "type": "demonstrative",
    "tipDe": "Das ist schön.",
    "tipTr": "Bu güzel."
  },
  {
    "id": "w023",
    "de": "was",
    "tr": "ne",
    "deAnswers": [
      "was"
    ],
    "type": "questionword",
    "tipDe": "Was ist das?",
    "tipTr": "Bu ne?"
  },
  {
    "id": "w024",
    "de": "Hallo",
    "tr": "merhaba",
    "deAnswers": [
      "hallo"
    ],
    "type": "greeting",
    "tipDe": "Hallo, André!",
    "tipTr": "Merhaba, André!"
  },
  {
    "id": "w025",
    "de": "Tschüss / Auf Wiedersehen",
    "tr": "güle güle",
    "deAnswers": [
      "tschüss",
      "tschuess",
      "auf wiedersehen"
    ],
    "type": "greeting",
    "tipDe": "Tschüss, bis später!",
    "tipTr": "Güle güle!"
  },
  {
    "id": "w026",
    "de": "bitte",
    "tr": "lütfen",
    "deAnswers": [
      "bitte"
    ],
    "type": "polite",
    "tipDe": "Bitte, André.",
    "tipTr": "Lütfen, André."
  },
  {
    "id": "w027",
    "de": "Ja bitte? / Wie bitte?",
    "tr": "efendim",
    "deAnswers": [
      "ja bitte",
      "wie bitte",
      "mein herr",
      "meine dame"
    ],
    "type": "polite",
    "note": "wörtlich: Mein Herr / Meine Dame",
    "tipDe": "Jemand ruft dich – du antwortest höflich.",
    "tipTr": "Biri seni çağırıyor: Efendim?"
  },
  {
    "id": "w028",
    "de": "Gesundheit! / Lebe lange!",
    "tr": "Çok yaşa!",
    "deAnswers": [
      "gesundheit",
      "lebe lange"
    ],
    "type": "phrase",
    "tipDe": "Nach dem Niesen: Gesundheit!",
    "tipTr": "Hapşırınca: Çok yaşa!"
  },
  {
    "id": "w029",
    "de": "Gleichfalls! / Sehe es auch!",
    "tr": "Sen de gör!",
    "deAnswers": [
      "gleichfalls",
      "sehe es auch"
    ],
    "type": "phrase",
    "tipDe": "Als Antwort: Gleichfalls!",
    "tipTr": "Cevap: Sen de gör!"
  },
  {
    "id": "w030",
    "de": "ich",
    "tr": "ben",
    "deAnswers": [
      "ich"
    ],
    "type": "pronoun",
    "tipDe": "Ich bin schön.",
    "tipTr": "Ben güzelim."
  },
  {
    "id": "w031",
    "de": "du",
    "tr": "sen",
    "deAnswers": [
      "du"
    ],
    "type": "pronoun",
    "tipDe": "Du bist schön.",
    "tipTr": "Sen güzelsin."
  },
  {
    "id": "w032",
    "de": "er / sie / es",
    "tr": "o",
    "deAnswers": [
      "er",
      "sie",
      "es"
    ],
    "type": "pronoun",
    "tipDe": "Er/Sie/Es ist schön.",
    "tipTr": "O güzel."
  },
  {
    "id": "w033",
    "de": "wir",
    "tr": "biz",
    "deAnswers": [
      "wir"
    ],
    "type": "pronoun",
    "tipDe": "Wir kommen.",
    "tipTr": "Biz geliyoz."
  },
  {
    "id": "w034",
    "tr": "değil",
    "de": "nicht (bei Nominalsätzen)",
    "type": "other",
    "deAnswers": [
      "nicht"
    ]
  },
  {
    "id": "w035",
    "tr": "siz",
    "de": "ihr / Sie",
    "type": "pronoun",
    "deAnswers": [
      "ihr",
      "sie"
    ]
  },
  {
    "id": "w036",
    "tr": "onlar",
    "de": "sie (Mehrzahl)",
    "type": "pronoun",
    "deAnswers": [
      "sie"
    ]
  },
  {
    "id": "w037",
    "tr": "için",
    "de": "für / um … zu",
    "type": "other",
    "deAnswers": [
      "für",
      "fuer",
      "um zu"
    ]
  },
  {
    "id": "w038",
    "tr": "çünkü",
    "de": "weil / denn",
    "type": "conjunction",
    "deAnswers": [
      "weil",
      "denn"
    ]
  },
  {
    "id": "w039",
    "tr": "rağmen",
    "de": "trotz",
    "type": "other",
    "deAnswers": [
      "trotz"
    ]
  },
  {
    "id": "w040",
    "tr": "daha",
    "de": "mehr / noch",
    "type": "other",
    "deAnswers": [
      "mehr",
      "noch"
    ]
  },
  {
    "id": "w041",
    "tr": "en",
    "de": "am meisten",
    "type": "other",
    "deAnswers": [
      "am meisten"
    ]
  },
  {
    "id": "w042",
    "tr": "sonra",
    "de": "danach / nach",
    "type": "other",
    "deAnswers": [
      "danach",
      "nach"
    ]
  },
  {
    "id": "w043",
    "tr": "önce",
    "de": "vorher / vor",
    "type": "other",
    "deAnswers": [
      "vorher",
      "vor"
    ]
  },
  {
    "id": "w044",
    "tr": "hemen",
    "de": "sofort",
    "type": "other",
    "deAnswers": [
      "sofort"
    ]
  },
  {
    "id": "w045",
    "tr": "ama",
    "de": "aber",
    "type": "conjunction",
    "deAnswers": [
      "aber"
    ]
  },
  {
    "id": "w046",
    "tr": "istemek",
    "de": "wollen / möchten",
    "type": "verb",
    "deAnswers": [
      "wollen",
      "möchten",
      "moechten"
    ],
    "stem": "iste",
    "progressiveStem": "ist",
    "aorist": "ister",
    "profile": {
      "forms": [
        "will",
        "willst",
        "will",
        "wollen"
      ],
      "pattern": "complement"
    }
  },
  {
    "id": "w047",
    "tr": "bilmek",
    "de": "wissen",
    "type": "verb",
    "deAnswers": [
      "wissen"
    ],
    "stem": "bil",
    "aorist": "bilir",
    "profile": {
      "forms": [
        "weiß",
        "weißt",
        "weiß",
        "wissen"
      ],
      "pattern": "complement"
    }
  },
  {
    "id": "w048",
    "tr": "söylemek",
    "de": "sagen",
    "type": "verb",
    "deAnswers": [
      "sagen"
    ],
    "stem": "söyle",
    "progressiveStem": "söyl",
    "aorist": "söyler",
    "profile": {
      "forms": [
        "sage",
        "sagst",
        "sagt",
        "sagen"
      ],
      "pattern": "complement"
    }
  },
  {
    "id": "w049",
    "tr": "sormak",
    "de": "fragen",
    "type": "verb",
    "deAnswers": [
      "fragen"
    ],
    "stem": "sor",
    "aorist": "sorar",
    "profile": {
      "forms": [
        "frage",
        "fragst",
        "fragt",
        "fragen"
      ],
      "pattern": "complement"
    }
  },
  {
    "id": "w050",
    "tr": "yıkamak",
    "de": "waschen",
    "type": "verb",
    "deAnswers": [
      "waschen"
    ],
    "stem": "yıka",
    "progressiveStem": "yık",
    "aorist": "yıkar",
    "profile": {
      "forms": [
        "wasche",
        "wäschst",
        "wäscht",
        "waschen"
      ],
      "pattern": "object"
    },
    "voice": {
      "passive": "yıkan",
      "reflexive": "yıkan",
      "causative": "yıkat"
    }
  },
  {
    "id": "w051",
    "tr": "olmak",
    "de": "sein / werden",
    "type": "verb",
    "deAnswers": [
      "sein",
      "werden"
    ],
    "stem": "ol",
    "aorist": "olur",
    "profile": {
      "forms": [
        "bin",
        "bist",
        "ist",
        "sind"
      ],
      "pattern": "simple"
    }
  }
];
 const derivedCards = [
  {
    "de": "zum Haus / nach Hause",
    "tr": "eve",
    "type": "noun",
    "tipDe": "Ich gehe nach Hause.",
    "tipTr": "Eve gidiyom.",
    "requires": [
      "ev"
    ]
  },
  {
    "de": "aus dem Haus",
    "tr": "evden",
    "type": "noun",
    "tipDe": "Ich komme aus dem Haus.",
    "tipTr": "Evden geliyom.",
    "requires": [
      "ev"
    ]
  },
  {
    "de": "im Haus",
    "tr": "evde",
    "type": "noun",
    "tipDe": "Mama ist im Haus.",
    "tipTr": "Anne evde.",
    "requires": [
      "ev"
    ]
  },
  {
    "de": "das Haus (bestimmtes Objekt)",
    "tr": "evi",
    "type": "noun",
    "tipDe": "Ich sehe das Haus.",
    "tipTr": "Evi görüyom.",
    "requires": [
      "ev"
    ]
  },
  {
    "de": "des Hauses",
    "tr": "evin",
    "type": "noun",
    "tipDe": "Die Tür des Hauses ist schön.",
    "tipTr": "Evin kapısı güzel.",
    "requires": [
      "ev"
    ]
  },
  {
    "de": "Ist es schön?",
    "tr": "Güzel mi?",
    "type": "adj",
    "tipDe": "Ist das Haus schön?",
    "tipTr": "Ev güzel mi?",
    "requires": [
      "güzel"
    ]
  },
  {
    "de": "Ich bin schön.",
    "tr": "Güzelim.",
    "type": "adj",
    "tipDe": "Heute bin ich schön.",
    "tipTr": "Bugün güzelim.",
    "requires": [
      "güzel"
    ]
  },
  {
    "de": "Du bist schön.",
    "tr": "Güzelsin.",
    "type": "adj",
    "tipDe": "Du bist heute schön.",
    "tipTr": "Bugün güzelsin.",
    "requires": [
      "güzel"
    ]
  },
  {
    "de": "Er/Sie/Es ist schön.",
    "tr": "O güzel.",
    "type": "adj",
    "tipDe": "Er/Sie/Es ist schön.",
    "tipTr": "O güzel.",
    "requires": [
      "o",
      "güzel"
    ]
  },
  {
    "de": "ich komme",
    "tr": "geliyom",
    "type": "verb",
    "tipDe": "Ich komme aus dem Haus.",
    "tipTr": "Evden geliyom.",
    "requires": [
      "gelmek"
    ]
  },
  {
    "de": "du kommst",
    "tr": "geliyon",
    "type": "verb",
    "tipDe": "Du kommst nach Hause.",
    "tipTr": "Eve geliyon.",
    "requires": [
      "gelmek"
    ]
  },
  {
    "de": "er/sie/es kommt",
    "tr": "geliyo",
    "type": "verb",
    "tipDe": "Mein älterer Bruder kommt nach Hause.",
    "tipTr": "Abi eve geliyo.",
    "requires": [
      "gelmek"
    ]
  },
  {
    "de": "wir kommen",
    "tr": "geliyoz",
    "type": "verb",
    "tipDe": "Wir kommen nach Hause.",
    "tipTr": "Eve geliyoz.",
    "requires": [
      "gelmek"
    ]
  },
  {
    "de": "Gehen ist schön.",
    "tr": "Gitmek güzel.",
    "type": "verb",
    "tipDe": "Gehen ist schön.",
    "tipTr": "Gitmek güzel.",
    "requires": [
      "gitmek",
      "güzel"
    ]
  }
];
 const byId = Object.assign(Object.create(null),Object.fromEntries(words.map(w=>[w.id,w])));
 const byLemma = Object.assign(Object.create(null),Object.fromEntries(words.map(w=>[w.tr.toLocaleLowerCase('tr-TR'),w])));
 const cards = [...words.map(w=>({de:w.de,tr:w.tr,type:w.type,tipDe:w.tipDe||w.de,tipTr:w.tipTr||w.tr,requires:[w.tr]})),...derivedCards];
 const api = {words,byId,byLemma,cards};
 if(typeof module==='object' && module.exports) module.exports=api;
 else root.AndreWords=api;
})(typeof globalThis==='object'?globalThis:this);
