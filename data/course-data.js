/* Authored bilingual reference structures. Rebuild with tools/build-course.cjs. */
(function(root){const data=[
  {
    "id": "s01",
    "start": 1,
    "end": 5,
    "title": "Dinge und Eigenschaften",
    "words": [
      "ev",
      "araba",
      "güzel",
      "bu"
    ],
    "help": "(a) Nomen als Subjekt, Eigenschaft als Prädikat ohne ausdrückliches „sein“; (b) `bu` als Zeigewort vor einem Nomen oder allein als Subjekt. Keine neue Endung.",
    "examples": [
      {
        "id": "S01a",
        "tr": "Ev güzel.",
        "de": "Das Haus ist schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S01b",
        "tr": "Araba güzel.",
        "de": "Das Auto ist schön.",
        "slots": [
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S01c",
        "tr": "Bu ev güzel.",
        "de": "Dieses Haus ist schön.",
        "slots": [
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S01d",
        "tr": "Bu araba.",
        "de": "Das ist ein Auto.",
        "slots": [
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {}
          }
        ]
      }
    ]
  },
  {
    "id": "s02",
    "start": 6,
    "end": 10,
    "title": "Vorhanden, nicht vorhanden und fragen",
    "words": [
      "var",
      "yok",
      "değil",
      "ne"
    ],
    "help": "(a) Existenz mit `var`; (b) Fehlen mit `yok`; (c) Eigenschaft mit `değil` verneinen; (d) Frage `mi` nach güzel, `mı` nach var; (e) `ne` als Frage nach einer Sache. Frageformen jeweils getrennt lernen.",
    "examples": [
      {
        "id": "S02a",
        "tr": "Ev var.",
        "de": "Es gibt ein Haus.",
        "slots": [
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w015",
            "features": {}
          }
        ]
      },
      {
        "id": "S02b",
        "tr": "Araba yok.",
        "de": "Es gibt kein Auto.",
        "slots": [
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w016",
            "features": {}
          }
        ]
      },
      {
        "id": "S02c",
        "tr": "Ev güzel değil.",
        "de": "Das Haus ist nicht schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          },
          {
            "lemma": "w034",
            "features": {}
          }
        ]
      },
      {
        "id": "S02d",
        "tr": "Ev güzel mi?",
        "de": "Ist das Haus schön?",
        "slots": [
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {
              "person": "o",
              "question": true
            },
            "nominal": true
          }
        ]
      },
      {
        "id": "S02e",
        "tr": "Araba var mı?",
        "de": "Gibt es ein Auto?",
        "slots": [
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w015",
            "features": {
              "person": "o",
              "question": true
            },
            "nominal": true
          }
        ]
      },
      {
        "id": "S02f",
        "tr": "Bu ne?",
        "de": "Was ist das?",
        "slots": [
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w023",
            "features": {}
          }
        ]
      }
    ]
  },
  {
    "id": "s03",
    "start": 11,
    "end": 15,
    "title": "Wer kommt?",
    "words": [
      "ben",
      "sen",
      "o",
      "biz",
      "gelmek"
    ],
    "help": "(a) Infinitivkarte gelmek beim Beugen zum Stamm gel umformen; (b) die vier Kurzformen `geliyom, geliyon, geliyo, geliyoz`; (c) `gelmiyo` als erste negative Präsensform. Die anderen negativen Personenformen bleiben zusätzliche Einzelübungen.",
    "examples": [
      {
        "id": "S03a",
        "tr": "Ben geliyom.",
        "de": "Ich komme.",
        "slots": [
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S03b",
        "tr": "Sen geliyon.",
        "de": "Du kommst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "sen",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S03c",
        "tr": "O geliyo.",
        "de": "Er kommt.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S03d",
        "tr": "Biz geliyoz.",
        "de": "Wir kommen.",
        "slots": [
          {
            "lemma": "w033",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "biz",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S03e",
        "tr": "O gelmiyo.",
        "de": "Er kommt nicht.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "negative": true,
              "register": "colloquial"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s04",
    "start": 16,
    "end": 20,
    "title": "Wo und wohin?",
    "words": [
      "anne",
      "baba",
      "gitmek"
    ],
    "help": "(a) Lokativ `-de, -da`; (b) gitmek → `gidiyo`, Stammwechsel git→gid in dieser Umgebung; (c) Dativ `-e, -ya`; (d) nominale Personenformen `-im, -sin, -iz` nach güzel sowie `-yim` nach evde. Die letzte kleine Runde kann separat nach der Ortsrunde erfolgen.",
    "examples": [
      {
        "id": "S04a",
        "tr": "Anne evde.",
        "de": "Mama ist im Haus.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S04b",
        "tr": "Baba arabada.",
        "de": "Papa ist im Auto.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S04c",
        "tr": "Baba gidiyo.",
        "de": "Papa geht.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S04d",
        "tr": "Anne eve gidiyo.",
        "de": "Mama geht nach Hause.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S04e",
        "tr": "Baba arabaya gidiyo.",
        "de": "Papa geht zum Auto.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S04f",
        "tr": "Ben güzelim.",
        "de": "Ich bin schön.",
        "slots": [
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {
              "person": "ben"
            },
            "nominal": true
          }
        ]
      },
      {
        "id": "S04g",
        "tr": "Sen güzelsin.",
        "de": "Du bist schön.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {
              "person": "sen"
            },
            "nominal": true
          }
        ]
      },
      {
        "id": "S04h",
        "tr": "Biz güzeliz.",
        "de": "Wir sind schön.",
        "slots": [
          {
            "lemma": "w033",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {
              "person": "biz"
            },
            "nominal": true
          }
        ]
      },
      {
        "id": "S04i",
        "tr": "Ben evdeyim.",
        "de": "Ich bin im Haus.",
        "slots": [
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "locative",
              "predicatePerson": "ben"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s05",
    "start": 21,
    "end": 25,
    "title": "Bestimmte Objekte",
    "words": [
      "görmek",
      "sevmek",
      "bir"
    ],
    "help": "(a) Präsensvariante `-üyo` → görüyo; (b) Akkusativ `-i, -yı, -yi` an ev/araba/anne; (c) direkte Objekte bei görmek und sevmek; (d) nicht näher bestimmtes Objekt mit `bir` gegenüber einem kontextuell bestimmten Objekt. Regelmäßiges seviyo verwendet die bereits gelernte `-iyo`-Form.",
    "examples": [
      {
        "id": "S05a",
        "tr": "O görüyo.",
        "de": "Er sieht.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S05b",
        "tr": "O evi görüyo.",
        "de": "Er sieht das Haus.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S05c",
        "tr": "O arabayı görüyo.",
        "de": "Er sieht das Auto.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S05d",
        "tr": "O anneyi görüyo.",
        "de": "Er sieht die Mutter.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w005",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S05e",
        "tr": "O bir ev görüyo.",
        "de": "Er sieht ein Haus.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w052",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S05f",
        "tr": "O arabayı seviyo.",
        "de": "Er mag das Auto.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w012",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s06",
    "start": 26,
    "end": 30,
    "title": "Woher und mit wem?",
    "words": [],
    "help": "(a) Ablativ `-den, -dan`; (b) Begleitung `-yle`; (c) Verkehrsmittel `-yla`. Beide Mit-Verwendungen werden erklärt; sie teilen Formnachweise, wo diese identisch sind.",
    "examples": [
      {
        "id": "S06a",
        "tr": "Anne evden geliyo.",
        "de": "Mama kommt aus dem Haus.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "ablative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S06b",
        "tr": "Baba arabadan geliyo.",
        "de": "Papa kommt vom Auto.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "ablative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S06c",
        "tr": "Baba anneyle geliyo.",
        "de": "Papa kommt mit Mama.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w005",
            "features": {
              "case": "instrumental"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S06d",
        "tr": "Anne arabayla geliyo.",
        "de": "Mama kommt mit dem Auto.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "instrumental"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s07",
    "start": 31,
    "end": 35,
    "title": "Mehrzahl und Besitz",
    "words": [
      "kapı"
    ],
    "help": "(a) Plural `-ler, -lar`; (b) Besitz erste Person `-im, -m` und zweite Person `-in`; (c) Besitz dritte Person `-sı`; (d) Genitiv `-nin, -in`; (e) Besitzverwendung von var/yok. Nacheinander lernen: erst Besitzwort, dann Besitzerkette, dann „haben“.",
    "examples": [
      {
        "id": "S07a",
        "tr": "Evler güzel.",
        "de": "Die Häuser sind schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "plural": true
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07b",
        "tr": "Arabalar güzel.",
        "de": "Die Autos sind schön.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "plural": true
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07c",
        "tr": "Evim güzel.",
        "de": "Mein Haus ist schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "poss": "ben"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07d",
        "tr": "Arabam güzel.",
        "de": "Mein Auto ist schön.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "poss": "ben"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07e",
        "tr": "Evin güzel.",
        "de": "Dein Haus ist schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "poss": "sen"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07f",
        "tr": "Arabası güzel.",
        "de": "Sein Auto ist schön.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "poss": "o"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07g",
        "tr": "Annenin arabası güzel.",
        "de": "Das Auto der Mutter ist schön.",
        "slots": [
          {
            "lemma": "w005",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w004",
            "features": {
              "poss": "o"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07h",
        "tr": "Evin kapısı güzel.",
        "de": "Die Tür des Hauses ist schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w053",
            "features": {
              "poss": "o"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S07i",
        "tr": "Evim var.",
        "de": "Ich habe ein Haus.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "poss": "ben"
            }
          },
          {
            "lemma": "w015",
            "features": {}
          }
        ]
      },
      {
        "id": "S07j",
        "tr": "Evim yok.",
        "de": "Ich habe kein Haus.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "poss": "ben"
            }
          },
          {
            "lemma": "w016",
            "features": {}
          }
        ]
      }
    ]
  },
  {
    "id": "s08",
    "start": 36,
    "end": 40,
    "title": "A1 verbinden und anwenden",
    "words": [
      "istemek",
      "yıkamak"
    ],
    "help": "(a) Besitz plus Dativ/Lokativ `evime, evimde`, dritte Person plus Lokativ `arabasında` mit `-nda`; (b) positiver du-Imperativ gel/git; (c) Tätigkeit/Infinitiv `-mek, -mak` als Satzteil, istemek→istiyom mit Vokalveränderung; (d) Verbfragen mit bekanntem Kurzpräsens und neuem `mu`, Person bleibt am Verb.",
    "examples": [
      {
        "id": "S08a",
        "tr": "Anne evime geliyo.",
        "de": "Mama kommt zu meinem Haus.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "poss": "ben",
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S08b",
        "tr": "Baba evimde.",
        "de": "Papa ist in meinem Haus.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "poss": "ben",
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S08c",
        "tr": "Anne arabasında.",
        "de": "Mama ist in ihrem Auto.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "poss": "o",
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S08d",
        "tr": "Gel!",
        "de": "Komm!",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "imperative",
              "person": "sen"
            }
          }
        ]
      },
      {
        "id": "S08e",
        "tr": "Git!",
        "de": "Geh!",
        "slots": [
          {
            "lemma": "w011",
            "features": {
              "tense": "imperative",
              "person": "sen"
            }
          }
        ]
      },
      {
        "id": "S08f",
        "tr": "Gitmek güzel.",
        "de": "Gehen ist schön.",
        "slots": [
          {
            "lemma": "w011",
            "features": {
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S08g",
        "tr": "Arabayı yıkamak güzel.",
        "de": "Das Auto zu waschen ist schön.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S08h",
        "tr": "Gitmek istiyom.",
        "de": "Ich möchte gehen.",
        "slots": [
          {
            "lemma": "w011",
            "features": {
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w046",
            "features": {
              "tense": "present",
              "person": "ben",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S08i",
        "tr": "Arabayı yıkamak istiyom.",
        "de": "Ich möchte das Auto waschen.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w046",
            "features": {
              "tense": "present",
              "person": "ben",
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S08j",
        "tr": "Geliyom mu?",
        "de": "Komme ich?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben",
              "question": true,
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S08k",
        "tr": "Geliyon mu?",
        "de": "Kommst du?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "sen",
              "question": true,
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S08l",
        "tr": "Geliyo mu?",
        "de": "Kommt er?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "question": true,
              "register": "colloquial"
            }
          }
        ]
      },
      {
        "id": "S08m",
        "tr": "Geliyoz mu?",
        "de": "Kommen wir?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "biz",
              "question": true,
              "register": "colloquial"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s09",
    "start": 41,
    "end": 45,
    "title": "Vergangenes erzählen",
    "words": [
      "dün"
    ],
    "help": "(a) gel-dim/-din/-di/-dik; (b) git-tim und gör-düm, dabei Stamm/Endung passend behandeln; (c) gelmedi/gelmedim als verneinte Formen; (d) Vergangenheitsfrage mit bekanntem mi; (e) nominale Vergangenheit -di nach güzel. -di-Vergangenheit ist nicht ausschließlich auf Augenzeugenberichte beschränkt.",
    "examples": [
      {
        "id": "S09a",
        "tr": "Dün geldim.",
        "de": "Ich bin gestern gekommen.",
        "slots": [
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S09b",
        "tr": "Dün geldin.",
        "de": "Du bist gestern gekommen.",
        "slots": [
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "sen"
            }
          }
        ]
      },
      {
        "id": "S09c",
        "tr": "Dün geldi.",
        "de": "Er ist gestern gekommen.",
        "slots": [
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S09d",
        "tr": "Dün geldik.",
        "de": "Wir sind gestern gekommen.",
        "slots": [
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "biz"
            }
          }
        ]
      },
      {
        "id": "S09e",
        "tr": "Eve gittim.",
        "de": "Ich bin nach Hause gegangen.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S09f",
        "tr": "Arabayı gördüm.",
        "de": "Ich habe das Auto gesehen.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S09g",
        "tr": "Anne gelmedi.",
        "de": "Mama ist nicht gekommen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "o",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S09h",
        "tr": "Dün gelmedim.",
        "de": "Ich bin gestern nicht gekommen.",
        "slots": [
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "ben",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S09i",
        "tr": "Geldin mi?",
        "de": "Bist du gekommen?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "sen",
              "question": true
            }
          }
        ]
      },
      {
        "id": "S09j",
        "tr": "Ev güzeldi.",
        "de": "Das Haus war schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {
              "person": "o",
              "past": true
            },
            "nominal": true
          }
        ]
      }
    ]
  },
  {
    "id": "s10",
    "start": 46,
    "end": 50,
    "title": "Vorhaben und Zukunft",
    "words": [
      "yarın",
      "bugün"
    ],
    "help": "(a) geleceğim/geleceksin/gelecek/geleceğiz; (b) gidecek mit Stammwechsel; (c) gelmeyecek. k→ğ vor den einschlägigen vokalischen Personenendungen gezielt erklären, nicht als Veränderung vor jeder Endung.",
    "examples": [
      {
        "id": "S10a",
        "tr": "Yarın geleceğim.",
        "de": "Ich werde morgen kommen.",
        "slots": [
          {
            "lemma": "w055",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S10b",
        "tr": "Yarın geleceksin.",
        "de": "Du wirst morgen kommen.",
        "slots": [
          {
            "lemma": "w055",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "sen"
            }
          }
        ]
      },
      {
        "id": "S10c",
        "tr": "Yarın gelecek.",
        "de": "Er wird morgen kommen.",
        "slots": [
          {
            "lemma": "w055",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S10d",
        "tr": "Yarın geleceğiz.",
        "de": "Wir werden morgen kommen.",
        "slots": [
          {
            "lemma": "w055",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "biz"
            }
          }
        ]
      },
      {
        "id": "S10e",
        "tr": "Anne bugün eve gidecek.",
        "de": "Mama wird heute nach Hause gehen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w056",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "future",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S10f",
        "tr": "Baba yarın gelmeyecek.",
        "de": "Papa wird morgen nicht kommen.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w055",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "o",
              "negative": true
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s11",
    "start": 51,
    "end": 55,
    "title": "Regelmäßig oder nur gehört?",
    "words": [
      "her",
      "gün"
    ],
    "help": "(a) Aorist gelir/gelirim und gider; (b) gelmez/gelmem, erste Person der Verneinung eigens behandeln; (c) gelmiş/gitmiş als berichtete oder erschlossene Vergangenheit. Die verschiedenen Aoriststämme sind Wortdaten, keine freie Rateformel.",
    "examples": [
      {
        "id": "S11a",
        "tr": "Anne her gün gelir.",
        "de": "Mama kommt jeden Tag.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w057",
            "features": {}
          },
          {
            "lemma": "w058",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S11b",
        "tr": "Her gün gelirim.",
        "de": "Ich komme jeden Tag.",
        "slots": [
          {
            "lemma": "w057",
            "features": {}
          },
          {
            "lemma": "w058",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S11c",
        "tr": "Baba her gün eve gider.",
        "de": "Papa geht jeden Tag nach Hause.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w057",
            "features": {}
          },
          {
            "lemma": "w058",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "aorist",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S11d",
        "tr": "Baba gelmez.",
        "de": "Papa kommt nicht.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "o",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S11e",
        "tr": "Ben gelmem.",
        "de": "Ich komme nicht.",
        "slots": [
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S11f",
        "tr": "Anne gelmiş.",
        "de": "Mama ist offenbar gekommen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "reported",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S11g",
        "tr": "Baba eve gitmiş.",
        "de": "Papa ist wohl nach Hause gegangen.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "reported",
              "person": "o"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s12",
    "start": 56,
    "end": 60,
    "title": "Vergleichen und können",
    "words": [
      "daha",
      "en"
    ],
    "help": "(a) daha + Eigenschaft; (b) Vergleichspartner im bereits bekannten Ablativ; (c) en + Eigenschaft; (d) gelebilirim/gelebilir; (e) gelemem als negative Fähigkeit. `-eme-` nicht durch ein beliebiges negatives bilmek ersetzen.",
    "examples": [
      {
        "id": "S12a",
        "tr": "Araba daha güzel.",
        "de": "Das Auto ist schöner.",
        "slots": [
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w040",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S12b",
        "tr": "Araba evden daha güzel.",
        "de": "Das Auto ist schöner als das Haus.",
        "slots": [
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "ablative"
            }
          },
          {
            "lemma": "w040",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S12c",
        "tr": "Bu en güzel ev.",
        "de": "Das ist das schönste Haus.",
        "slots": [
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w041",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {}
          }
        ]
      },
      {
        "id": "S12d",
        "tr": "Gelebilirim.",
        "de": "Ich kann kommen.",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben",
              "ability": true
            }
          }
        ]
      },
      {
        "id": "S12e",
        "tr": "Anne gelebilir.",
        "de": "Mama kann kommen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "o",
              "ability": true
            }
          }
        ]
      },
      {
        "id": "S12f",
        "tr": "Gelemem.",
        "de": "Ich kann nicht kommen.",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben",
              "negative": true,
              "ability": true
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s13",
    "start": 61,
    "end": 65,
    "title": "Müssen und gemeinsam etwas vorschlagen",
    "words": [],
    "help": "(a) gelmeliyim/gitmeliyim; (b) yıkamalıyım als zweite Harmonie; (c) gelelim/gidelim, Stammwechsel bei gitmek. Notwendigkeit und gemeinsamer Vorschlag sind getrennte Gebrauchsziele.",
    "examples": [
      {
        "id": "S13a",
        "tr": "Gelmeliyim.",
        "de": "Ich muss kommen.",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "necessity",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S13b",
        "tr": "Eve gitmeliyim.",
        "de": "Ich muss nach Hause gehen.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "necessity",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S13c",
        "tr": "Arabayı yıkamalıyım.",
        "de": "Ich muss das Auto waschen.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "necessity",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S13d",
        "tr": "Eve gelelim.",
        "de": "Lass uns nach Hause kommen.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "optative",
              "person": "biz"
            }
          }
        ]
      },
      {
        "id": "S13e",
        "tr": "Eve gidelim.",
        "de": "Lass uns nach Hause gehen.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "optative",
              "person": "biz"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s14",
    "start": 66,
    "end": 70,
    "title": "Verbinden, begründen und einen Zweck nennen",
    "words": [
      "ve",
      "ama",
      "çünkü",
      "için"
    ],
    "help": "(a) ve für gleichrangige Satzteile; (b) ama zwischen Aussagen; (c) çünkü als Begründung; (d) Nomen + için als Begünstigter; (e) Infinitiv + için als Zweck. Früher freiwillig gelernte ve/ama-Nachweise übernehmen.",
    "examples": [
      {
        "id": "S14a",
        "tr": "Anne ve baba evde.",
        "de": "Mama und Papa sind im Haus.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w021",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S14b",
        "tr": "Ev güzel ama araba güzel değil.",
        "de": "Das Haus ist schön, aber das Auto ist nicht schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          },
          {
            "lemma": "w045",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          },
          {
            "lemma": "w034",
            "features": {}
          }
        ]
      },
      {
        "id": "S14c",
        "tr": "Eve geliyom çünkü anne evde.",
        "de": "Ich komme nach Hause, weil Mama im Haus ist.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben",
              "register": "colloquial"
            }
          },
          {
            "lemma": "w038",
            "features": {}
          },
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S14d",
        "tr": "Bu araba anne için.",
        "de": "Dieses Auto ist für Mama.",
        "slots": [
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w037",
            "features": {}
          }
        ]
      },
      {
        "id": "S14e",
        "tr": "Evi görmek için geliyom.",
        "de": "Ich komme, um das Haus zu sehen.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w037",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben",
              "register": "colloquial"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s15",
    "start": 71,
    "end": 75,
    "title": "Ablauf und Begleitung",
    "words": [
      "önce",
      "sonra",
      "gülmek",
      "yürümek"
    ],
    "help": "(a) gidip mit -ip; (b) gülerek mit -erek, yürüyerek mit -yerek; (c) gitmeden önce; (d) geldikten sonra. Letztere sind eigene zeitliche Bauwege, nicht schon durch Verneinung oder Vergangenheit freigegeben.",
    "examples": [
      {
        "id": "S15a",
        "tr": "Eve gidip anneyi gördüm.",
        "de": "Ich bin nach Hause gegangen und habe die Mutter gesehen.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "ip"
            }
          },
          {
            "lemma": "w005",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S15b",
        "tr": "Gülerek eve geldim.",
        "de": "Ich bin lachend nach Hause gekommen.",
        "slots": [
          {
            "lemma": "w059",
            "features": {
              "tense": "arak"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S15c",
        "tr": "Yürüyerek eve geldim.",
        "de": "Ich bin zu Fuß nach Hause gekommen.",
        "slots": [
          {
            "lemma": "w060",
            "features": {
              "tense": "arak"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S15d",
        "tr": "Gitmeden önce arabayı gördüm.",
        "de": "Vor dem Gehen habe ich das Auto gesehen.",
        "slots": [
          {
            "lemma": "w011",
            "features": {
              "tense": "madan"
            }
          },
          {
            "lemma": "w043",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S15e",
        "tr": "Geldikten sonra arabayı gördüm.",
        "de": "Nach dem Kommen habe ich das Auto gesehen.",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "case": "ablative"
            }
          },
          {
            "lemma": "w042",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "past",
              "person": "ben"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s16",
    "start": 76,
    "end": 80,
    "title": "Wer etwas tut",
    "words": [
      "kitap",
      "yazmak"
    ],
    "help": "(a) Akkusativ -ı und kitap→kitabı als kurze Worttransferübung; (b) Subjektrelativ -en → gelen/giden; (c) -an → yazan; (d) -yan nach vokalischem Stamm → yıkayan. Das beschriebene Nomen handelt selbst; die Beschreibung steht davor. Bestehende Aussage-/Objektmuster bleiben Grundlage.",
    "examples": [
      {
        "id": "S16a",
        "tr": "Eve gelen anne güzel.",
        "de": "Die Mutter, die nach Hause kommt, ist schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "an"
            }
          },
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S16b",
        "tr": "Eve giden baba güzel.",
        "de": "Der Vater, der nach Hause geht, ist schön.",
        "slots": [
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "an"
            }
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S16c",
        "tr": "Bu kitabı yazan baba evde.",
        "de": "Der Vater, der dieses Buch schreibt, ist im Haus.",
        "slots": [
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w061",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w062",
            "features": {
              "tense": "an"
            }
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S16d",
        "tr": "Arabayı yıkayan anne evde.",
        "de": "Die Mutter, die das Auto wäscht, ist im Haus.",
        "slots": [
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "an"
            }
          },
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "locative"
            }
          }
        ]
      },
      {
        "id": "S16e",
        "tr": "Baba bu kitabı görüyo.",
        "de": "Papa sieht dieses Buch.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w061",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "o",
              "register": "colloquial"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s17",
    "start": 81,
    "end": 85,
    "title": "Übergang zu Standardformen und Zeitbezüge",
    "words": [
      "siz",
      "onlar",
      "okumak"
    ],
    "help": "(a) geliyorum/geliyorsun/geliyor/geliyoruz; (b) gelmiyorum/gelmiyorsun/gelmiyor/gelmiyoruz; (c) Standardfragen geliyor muyum/musun/mu/muyuz; (d) geliyorsunuz/geliyorlar und nominal güzelsiniz; (e) dritte Person görüyor/yıkıyor/okuyor, dazu Kontraktion bei yıkamak/okumak; (f) gelirken/giderken; (g) gelince. Formen aus einer früher freiwillig gelernten Standardrunde anrechnen.",
    "examples": [
      {
        "id": "S17a",
        "tr": "Ben geliyorum.",
        "de": "Ich komme.",
        "slots": [
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S17b",
        "tr": "Sen geliyorsun.",
        "de": "Du kommst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "sen"
            }
          }
        ]
      },
      {
        "id": "S17c",
        "tr": "O geliyor.",
        "de": "Er kommt.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S17d",
        "tr": "Biz geliyoruz.",
        "de": "Wir kommen.",
        "slots": [
          {
            "lemma": "w033",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "biz"
            }
          }
        ]
      },
      {
        "id": "S17e",
        "tr": "Ben gelmiyorum.",
        "de": "Ich komme nicht.",
        "slots": [
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S17f",
        "tr": "Sen gelmiyorsun.",
        "de": "Du kommst nicht.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "sen",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S17g",
        "tr": "O gelmiyor.",
        "de": "Er kommt nicht.",
        "slots": [
          {
            "lemma": "w032",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S17h",
        "tr": "Biz gelmiyoruz.",
        "de": "Wir kommen nicht.",
        "slots": [
          {
            "lemma": "w033",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "biz",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S17i",
        "tr": "Geliyor muyum?",
        "de": "Komme ich?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben",
              "question": true
            }
          }
        ]
      },
      {
        "id": "S17j",
        "tr": "Geliyor musun?",
        "de": "Kommst du?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "sen",
              "question": true
            }
          }
        ]
      },
      {
        "id": "S17k",
        "tr": "Geliyor mu?",
        "de": "Kommt er?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "question": true
            }
          }
        ]
      },
      {
        "id": "S17l",
        "tr": "Geliyor muyuz?",
        "de": "Kommen wir?",
        "slots": [
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "biz",
              "question": true
            }
          }
        ]
      },
      {
        "id": "S17m",
        "tr": "Siz geliyorsunuz.",
        "de": "Ihr kommt.",
        "slots": [
          {
            "lemma": "w035",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "siz"
            }
          }
        ]
      },
      {
        "id": "S17n",
        "tr": "Onlar geliyorlar.",
        "de": "Sie kommen.",
        "slots": [
          {
            "lemma": "w036",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "onlar"
            }
          }
        ]
      },
      {
        "id": "S17o",
        "tr": "Siz güzelsiniz.",
        "de": "Ihr seid schön.",
        "slots": [
          {
            "lemma": "w035",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {
              "person": "siz"
            },
            "nominal": true
          }
        ]
      },
      {
        "id": "S17p",
        "tr": "Anne evi görüyor.",
        "de": "Mama sieht das Haus.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S17q",
        "tr": "Baba arabayı yıkıyor.",
        "de": "Papa wäscht das Auto.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S17r",
        "tr": "Anne bu kitabı okuyor.",
        "de": "Mama liest dieses Buch.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w022",
            "features": {}
          },
          {
            "lemma": "w061",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w063",
            "features": {
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S17s",
        "tr": "Sen gelirken ben gidiyorum.",
        "de": "Während du kommst, gehe ich.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ken"
            }
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S17t",
        "tr": "Sen gelince ben gidiyorum.",
        "de": "Sobald du kommst, gehe ich.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ince"
            }
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S17u",
        "tr": "Sen giderken ben geliyorum.",
        "de": "Während du gehst, komme ich.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "ken"
            }
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s18",
    "start": 86,
    "end": 90,
    "title": "Wenn etwas passiert",
    "words": [],
    "help": "(a) gelirsen mit Aorist+se+n; (b) gelirsem; (c) gidersen. Reale/offene Bedingung und Folge, noch keine irreale Vergangenheit.",
    "examples": [
      {
        "id": "S18a",
        "tr": "Sen gelirsen ben gelirim.",
        "de": "Wenn du kommst, komme ich.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "conditional",
              "person": "sen"
            }
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S18b",
        "tr": "Ben gelirsem anne gelir.",
        "de": "Wenn ich komme, kommt Mama.",
        "slots": [
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "conditional",
              "person": "ben"
            }
          },
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S18c",
        "tr": "Sen gidersen baba gelir.",
        "de": "Wenn du gehst, kommt Papa.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "conditional",
              "person": "sen"
            }
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "o"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s19",
    "start": 91,
    "end": 95,
    "title": "Eine Handlung als Sache benennen",
    "words": [],
    "help": "(a) explizite Besitzer benim/senin mit schon bekannten evim/evin; (b) Nominalisierung -me + Besitz erste/zweite Person → gelmem/gelmen; (c) -ma + Besitz zweite Person → yıkaman. Identischer Text gelmem in S11 ist eine andere Funktion.",
    "examples": [
      {
        "id": "S19a",
        "tr": "Benim evim güzel.",
        "de": "Mein Haus ist schön.",
        "slots": [
          {
            "lemma": "w030",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "poss": "ben"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S19b",
        "tr": "Senin evin güzel.",
        "de": "Dein Haus ist schön.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "poss": "sen"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S19c",
        "tr": "Senin gelmen güzel.",
        "de": "Es ist schön, dass du kommst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ma",
              "poss": "sen"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S19d",
        "tr": "Benim gelmem güzel.",
        "de": "Es ist schön, dass ich komme.",
        "slots": [
          {
            "lemma": "w030",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ma",
              "poss": "ben"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S19e",
        "tr": "Senin arabayı yıkaman güzel.",
        "de": "Es ist schön, dass du das Auto wäschst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "ma",
              "poss": "sen"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      }
    ]
  },
  {
    "id": "s20",
    "start": 96,
    "end": 100,
    "title": "Wissen, dass etwas geschieht",
    "words": [
      "bilmek"
    ],
    "help": "(a) biliyorum mit bereits gelernter Präsensform; (b) nichtzukünftiger Inhalt geldiğin + Akkusativ → geldiğini; (c) Harmonievariante gördüğün + Akkusativ → gördüğünü; (d) zukünftiger Inhalt geleceğin + Akkusativ → geleceğini. Besitzbezug zweite Person und Akkusativ am gesamten Inhalt müssen vorbereitet sein; insbesondere die neue konkrete -ü-Variante nicht überspringen.",
    "examples": [
      {
        "id": "S20a",
        "tr": "Senin geldiğini biliyorum.",
        "de": "Ich weiß, dass du gekommen bist.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "poss": "sen",
              "case": "accusative"
            }
          },
          {
            "lemma": "w047",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S20b",
        "tr": "Senin evi gördüğünü biliyorum.",
        "de": "Ich weiß, dass du das Haus gesehen hast.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen",
              "case": "accusative"
            }
          },
          {
            "lemma": "w047",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S20c",
        "tr": "Senin geleceğini biliyorum.",
        "de": "Ich weiß, dass du kommen wirst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "acak",
              "poss": "sen",
              "case": "accusative"
            }
          },
          {
            "lemma": "w047",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s21",
    "start": 101,
    "end": 105,
    "title": "Welches Ding gemeint ist",
    "words": [],
    "help": "(a) Objektrelativ gördüğün; (b) zukünftiges Objektrelativ göreceğin; (c) bekannter Akkusativ oder Dativ am beschriebenen Nomen. Gleichartige Formen aus S20 liefern Formnachweise, aber nicht automatisch die neue Relativverwendung.",
    "examples": [
      {
        "id": "S21a",
        "tr": "Senin gördüğün araba güzel.",
        "de": "Das Auto, das du gesehen hast, ist schön.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S21b",
        "tr": "Senin göreceğin araba güzel.",
        "de": "Das Auto, das du sehen wirst, ist schön.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "acak",
              "poss": "sen"
            }
          },
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S21c",
        "tr": "Senin gördüğün arabayı seviyorum.",
        "de": "Ich mag das Auto, das du gesehen hast.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w012",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S21d",
        "tr": "Senin göreceğin eve gidiyorum.",
        "de": "Ich gehe zu dem Haus, das du sehen wirst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "acak",
              "poss": "sen"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s22",
    "start": 106,
    "end": 110,
    "title": "Getan werden und sich selbst",
    "words": [],
    "help": "(a) Passiv -n an yıka/oku und -ül an gör; (b) reflexives yıkan mit eigener Bedeutung; (c) Rollenbezug. Präsens -ıyor/-uyor/-üyor aus S17, kitap-Stammwechsel aus S16 bekannt.",
    "examples": [
      {
        "id": "S22a",
        "tr": "Araba yıkanıyor.",
        "de": "Das Auto wird gewaschen.",
        "slots": [
          {
            "lemma": "w004",
            "features": {}
          },
          {
            "lemma": "w050",
            "features": {
              "voice": "passive",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S22b",
        "tr": "Ev görülüyor.",
        "de": "Das Haus wird gesehen.",
        "slots": [
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w014",
            "features": {
              "voice": "passive",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S22c",
        "tr": "Kitap okunuyor.",
        "de": "Das Buch wird gelesen.",
        "slots": [
          {
            "lemma": "w061",
            "features": {}
          },
          {
            "lemma": "w063",
            "features": {
              "voice": "passive",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S22d",
        "tr": "Anne yıkanıyor.",
        "de": "Mama wäscht sich.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w050",
            "features": {
              "voice": "reflexive",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s23",
    "start": 111,
    "end": 115,
    "title": "Etwas berichten oder erfragen",
    "words": [
      "söylemek",
      "sormak"
    ],
    "help": "(a) söylüyorum und soruyorum mit neuen konkreten Präsensvarianten -üyorum/-uyorum und Kontraktion söyle→söyl; (b) Zukunftsinhalte berichten; (c) indirekte Ja/Nein-Frage gelip gelmediğini mit wiederholtem Verbstamm und nominalisiertem negativem Teil. Diese neue Kette gezielt vorbereiten.",
    "examples": [
      {
        "id": "S23a",
        "tr": "Senin geleceğini söylüyorum.",
        "de": "Ich sage, dass du kommen wirst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "acak",
              "poss": "sen",
              "case": "accusative"
            }
          },
          {
            "lemma": "w048",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S23b",
        "tr": "Senin geldiğini söylüyorum.",
        "de": "Ich sage, dass du gekommen bist.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "poss": "sen",
              "case": "accusative"
            }
          },
          {
            "lemma": "w048",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S23c",
        "tr": "Senin gelip gelmediğini soruyorum.",
        "de": "Ich frage, ob du gekommen bist.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ip"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "negative": true,
              "poss": "sen",
              "case": "accusative"
            }
          },
          {
            "lemma": "w049",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s24",
    "start": 116,
    "end": 120,
    "title": "Trotz eines Umstands",
    "words": [
      "rağmen"
    ],
    "help": "(a) Nominalisierung+Besitz+Dativ → gelmene/gitmene/görmene; (b) trotz-/obwohl-Verwendung mit rağmen; (c) eine bekannte Zeitverbindung mit bekannter Fähigkeit verbinden. Negatives gitmiyorum vor S24b als Transfer von gelmiyorum üben; t bleibt vor der Verneinung erhalten, anders als in gidiyorum. Die sichtbare -miyorum-Form ist bereits gelernt.",
    "examples": [
      {
        "id": "S24a",
        "tr": "Senin gelmene rağmen anne gelmiyor.",
        "de": "Obwohl du kommst, kommt Mama nicht.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ma",
              "poss": "sen",
              "case": "dative"
            }
          },
          {
            "lemma": "w039",
            "features": {}
          },
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S24b",
        "tr": "Senin gitmene rağmen ben gitmiyorum.",
        "de": "Obwohl du gehst, gehe ich nicht.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "ma",
              "poss": "sen",
              "case": "dative"
            }
          },
          {
            "lemma": "w039",
            "features": {}
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "ben",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S24c",
        "tr": "Senin evi görmene rağmen ben arabayı görüyorum.",
        "de": "Obwohl du das Haus siehst, sehe ich das Auto.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "ma",
              "poss": "sen",
              "case": "dative"
            }
          },
          {
            "lemma": "w039",
            "features": {}
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S24d",
        "tr": "Sen gelince ben gelebilirim.",
        "de": "Sobald du kommst, kann ich kommen.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ince"
            }
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben",
              "ability": true
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s25",
    "start": 121,
    "end": 125,
    "title": "Vergangenes zeitlich einordnen",
    "words": [],
    "help": "(a) gidiyordum als laufende Handlung in der Vergangenheit; (b) gelmiştim als Vorvergangenheit; (c) gelecektim als damaliger Plan/erwartete Zukunft; (d) gelirdim als frühere Gewohnheit. Die vier Formen werden mit unterschiedlichen zeitlichen Bedeutungen gelernt, nicht als austauschbare Vergangenheiten.",
    "examples": [
      {
        "id": "S25a",
        "tr": "Anne gelirken ben eve gidiyordum.",
        "de": "Während Mama kam, war ich auf dem Weg nach Hause.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "ken"
            }
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "ben",
              "compound": "past"
            }
          }
        ]
      },
      {
        "id": "S25b",
        "tr": "Anne gelmeden önce ben gelmiştim.",
        "de": "Bevor Mama kam, war ich schon gekommen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "madan"
            }
          },
          {
            "lemma": "w043",
            "features": {}
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "reported",
              "person": "ben",
              "compound": "past"
            }
          }
        ]
      },
      {
        "id": "S25c",
        "tr": "Dün gelecektim ama gelmedim.",
        "de": "Ich wollte gestern kommen, bin aber nicht gekommen.",
        "slots": [
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "ben",
              "compound": "past"
            }
          },
          {
            "lemma": "w045",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "ben",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S25d",
        "tr": "Her gün gelirdim.",
        "de": "Früher kam ich jeden Tag.",
        "slots": [
          {
            "lemma": "w057",
            "features": {}
          },
          {
            "lemma": "w058",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben",
              "compound": "past"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s26",
    "start": 126,
    "end": 130,
    "title": "Miteinander und veranlassen",
    "words": [
      "görüşmek"
    ],
    "help": "(a) wechselseitige Handlung görüşmek; (b) yıka→yıkat, Veranlassung mit -t; (c) verursachender Sprecher, betroffenes Objekt und ausführende Person im Dativ; (d) gül→güldür mit -dür, ursprünglicher Handelnder wird zum Akkusativobjekt. Neue Akkusativvariante babayı ist mit bekanntem -yı regulär.",
    "examples": [
      {
        "id": "S26a",
        "tr": "Anne ve baba görüşüyor.",
        "de": "Mama und Papa treffen sich.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w021",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w064",
            "features": {
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S26b",
        "tr": "Anne arabayı yıkatıyor.",
        "de": "Mama lässt das Auto waschen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "voice": "causative",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S26c",
        "tr": "Anne arabayı babaya yıkatıyor.",
        "de": "Mama lässt Papa das Auto waschen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w006",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "voice": "causative",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S26d",
        "tr": "Anne babayı güldürüyor.",
        "de": "Mama bringt Papa zum Lachen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w059",
            "features": {
              "voice": "causative",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s27",
    "start": 131,
    "end": 135,
    "title": "Beschreibungen mit Besitz und Fällen",
    "words": [],
    "help": "(a) Objektrelativ mit dritter Person gördüğü, statt zweiter Person gördüğün; (b) beschriebenes Nomen im Lokativ/Dativ; (c) beschriebenes Nomen als Besitzer eines weiteren Nomens. Neue -ü-Besitzvariante und k→ğ innerhalb dieser konkreten Kette vorbereiten.",
    "examples": [
      {
        "id": "S27a",
        "tr": "Annenin gördüğü arabada baba var.",
        "de": "Papa ist in dem Auto, das die Mutter gesehen hat.",
        "slots": [
          {
            "lemma": "w005",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "o"
            }
          },
          {
            "lemma": "w004",
            "features": {
              "case": "locative"
            }
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w015",
            "features": {}
          }
        ]
      },
      {
        "id": "S27b",
        "tr": "Annenin gördüğü arabaya gidiyorum.",
        "de": "Ich gehe zu dem Auto, das die Mutter gesehen hat.",
        "slots": [
          {
            "lemma": "w005",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "o"
            }
          },
          {
            "lemma": "w004",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S27c",
        "tr": "Senin gördüğün evin kapısı güzel.",
        "de": "Die Tür des Hauses, das du gesehen hast, ist schön.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w053",
            "features": {
              "poss": "o"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      }
    ]
  },
  {
    "id": "s28",
    "start": 136,
    "end": 140,
    "title": "Berichte mit Personen und Zeitbezug",
    "words": [],
    "help": "(a) babanın als zusätzliche Genitivvariante -nın; (b) berichteter Inhalt dritte Person geleceği/geleceğini und geldiği/geldiğini, einschließlich Besitz-i + Akkusativ-ni; (c) söyledi als regelmäßige Vergangenheit des bekannten söylemek; (d) Ereigniszeit relativ zum Bericht verankern; (e) geliyormuş/gelecekmiş für vermittelte gegenwärtige/zukünftige Information.",
    "examples": [
      {
        "id": "S28a",
        "tr": "Anne, babanın geleceğini söyledi.",
        "de": "Mama sagte, dass Papa kommen werde.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "acak",
              "poss": "o",
              "case": "accusative"
            }
          },
          {
            "lemma": "w048",
            "features": {
              "tense": "past",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S28b",
        "tr": "Baba, annenin geldiğini söyledi.",
        "de": "Papa sagte, dass Mama gekommen sei.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w005",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "poss": "o",
              "case": "accusative"
            }
          },
          {
            "lemma": "w048",
            "features": {
              "tense": "past",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S28c",
        "tr": "Anne dün bugün geleceğini söyledi.",
        "de": "Mama sagte gestern, dass sie heute kommen werde.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w056",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "acak",
              "poss": "o",
              "case": "accusative"
            }
          },
          {
            "lemma": "w048",
            "features": {
              "tense": "past",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S28d",
        "tr": "Anne geliyormuş.",
        "de": "Mama kommt gerade, wie ich gehört habe.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "o",
              "compound": "reported"
            }
          }
        ]
      },
      {
        "id": "S28e",
        "tr": "Baba gelecekmiş.",
        "de": "Papa wird kommen, wie ich gehört habe.",
        "slots": [
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "o",
              "compound": "reported"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s29",
    "start": 141,
    "end": 145,
    "title": "Seit, solange und weil",
    "words": [
      "beri",
      "sürece"
    ],
    "help": "(a) geldiğin+den beri; (b) geldiğin sürece; (c) geldiğin için. Die neue Ablativkette an nominalisiertem Inhalt und die jeweilige Funktion getrennt lernen. `için` ist schon bekannt, aber die Begründung mit -DIK ist neu und unterscheidet sich vom Infinitivzweck in S14.",
    "examples": [
      {
        "id": "S29a",
        "tr": "Sen geldiğinden beri ev güzel.",
        "de": "Seit du gekommen bist, ist das Haus schön.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "poss": "sen",
              "case": "ablative"
            }
          },
          {
            "lemma": "w065",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {}
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S29b",
        "tr": "Sen geldiğin sürece ben gelirim.",
        "de": "Solange du kommst, komme ich.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w066",
            "features": {}
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S29c",
        "tr": "Sen geldiğin için ben geliyorum.",
        "de": "Ich komme, weil du kommst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w037",
            "features": {}
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s30",
    "start": 146,
    "end": 150,
    "title": "Gegensatz und Alternativen",
    "words": [
      "oysa",
      "dolayı",
      "yerine",
      "bile"
    ],
    "help": "(a) oysa zwischen kontrastierenden Aussagen; (b) geldiğinden dolayı als Begründung; (c) gitmek yerine als Alternative; (d) gelirsen bile als einräumende Bedingung. Alle Wörter zuerst im Wörterbuch, alle vier Anwendungen danach in Grammatik.",
    "examples": [
      {
        "id": "S30a",
        "tr": "Anne geldi, oysa baba gelmedi.",
        "de": "Mama kam, Papa dagegen nicht.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "o"
            }
          },
          {
            "lemma": "w067",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "o",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S30b",
        "tr": "Sen geldiğinden dolayı ben geliyorum.",
        "de": "Ich komme, weil du kommst.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "dik",
              "poss": "sen",
              "case": "ablative"
            }
          },
          {
            "lemma": "w068",
            "features": {}
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "present",
              "person": "ben"
            }
          }
        ]
      },
      {
        "id": "S30c",
        "tr": "Anne eve gitmek yerine arabayı yıkıyor.",
        "de": "Statt nach Hause zu gehen, wäscht Mama das Auto.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w069",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S30d",
        "tr": "Sen gelirsen bile baba gelmez.",
        "de": "Selbst wenn du kommst, kommt Papa nicht.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "conditional",
              "person": "sen"
            }
          },
          {
            "lemma": "w070",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "o",
              "negative": true
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s31",
    "start": 151,
    "end": 155,
    "title": "Mehrere bekannte Beziehungen verbinden",
    "words": [],
    "help": "keine neue Endung. Vier Transferziele: Bedingung+Relativsatz+Ziel; Veranlassung+Zweck; Relativsatz+Passiv; Bericht+Gegensatz. Bekannte Formen müssen auch in ihrer tatsächlichen Zusammensetzung freigegeben sein. Der reguläre Generator nutzt nur bereits geübte Bauwege; erstmals neue Verknüpfungen erhalten eine kurze Grammatik-Anwendungsrunde.",
    "examples": [
      {
        "id": "S31a",
        "tr": "Sen gelirsen baba senin gördüğün eve gelecek.",
        "de": "Wenn du kommst, wird Papa zu dem Haus kommen, das du gesehen hast.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "conditional",
              "person": "sen"
            }
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S31b",
        "tr": "Anne arabayı yıkatmak için geldi.",
        "de": "Mama kam, um das Auto waschen zu lassen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "voice": "causative",
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w037",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S31c",
        "tr": "Senin gördüğün kitap okunuyor.",
        "de": "Das Buch, das du gesehen hast, wird gelesen.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w061",
            "features": {}
          },
          {
            "lemma": "w063",
            "features": {
              "voice": "passive",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S31d",
        "tr": "Anne, babanın geleceğini söyledi ama baba gelmedi.",
        "de": "Mama sagte, dass Papa kommen werde, aber Papa kam nicht.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "acak",
              "poss": "o",
              "case": "accusative"
            }
          },
          {
            "lemma": "w048",
            "features": {
              "tense": "past",
              "person": "o"
            }
          },
          {
            "lemma": "w045",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "past",
              "person": "o",
              "negative": true
            }
          }
        ]
      }
    ]
  },
  {
    "id": "s32",
    "start": 156,
    "end": 160,
    "title": "Anwenden und gezielt festigen",
    "words": [],
    "help": "keine neue Grammatik. Vier endliche Prüffelder: (a) Fälle/Besitz/Personen; (b) Zeitbezug und berichtete Information; (c) Haupt-/Nebensatzbezüge; (d) Verbrollen und logische Verbindungen. Je Feld zwei verschiedene selbst gelöste Anwendungen. Aktuelle Schwächen bestimmen die Auswahl innerhalb dieser Felder; keine nachträglich unbegrenzte Pflichtliste.",
    "examples": [
      {
        "id": "S32a",
        "tr": "Annenin gördüğü arabada baba var.",
        "de": "Papa ist in dem Auto, das die Mutter gesehen hat.",
        "slots": [
          {
            "lemma": "w005",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "o"
            }
          },
          {
            "lemma": "w004",
            "features": {
              "case": "locative"
            }
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w015",
            "features": {}
          }
        ]
      },
      {
        "id": "S32b",
        "tr": "Senin gördüğün evin kapısı güzel.",
        "de": "Die Tür des Hauses, das du gesehen hast, ist schön.",
        "slots": [
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w053",
            "features": {
              "poss": "o"
            }
          },
          {
            "lemma": "w010",
            "features": {}
          }
        ]
      },
      {
        "id": "S32c",
        "tr": "Anne gelmeden önce ben gelmiştim.",
        "de": "Bevor Mama kam, war ich schon gekommen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "madan"
            }
          },
          {
            "lemma": "w043",
            "features": {}
          },
          {
            "lemma": "w030",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "reported",
              "person": "ben",
              "compound": "past"
            }
          }
        ]
      },
      {
        "id": "S32d",
        "tr": "Anne dün bugün geleceğini söyledi.",
        "de": "Mama sagte gestern, dass sie heute kommen werde.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w054",
            "features": {}
          },
          {
            "lemma": "w056",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "acak",
              "poss": "o",
              "case": "accusative"
            }
          },
          {
            "lemma": "w048",
            "features": {
              "tense": "past",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S32e",
        "tr": "Sen gelirsen baba senin gördüğün eve gelecek.",
        "de": "Wenn du kommst, wird Papa zu dem Haus kommen, das du gesehen hast.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "conditional",
              "person": "sen"
            }
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w031",
            "features": {
              "case": "genitive"
            }
          },
          {
            "lemma": "w014",
            "features": {
              "tense": "dik",
              "poss": "sen"
            }
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "future",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S32f",
        "tr": "Sen gelirsen bile baba gelmez.",
        "de": "Selbst wenn du kommst, kommt Papa nicht.",
        "slots": [
          {
            "lemma": "w031",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "conditional",
              "person": "sen"
            }
          },
          {
            "lemma": "w070",
            "features": {}
          },
          {
            "lemma": "w006",
            "features": {}
          },
          {
            "lemma": "w013",
            "features": {
              "tense": "aorist",
              "person": "o",
              "negative": true
            }
          }
        ]
      },
      {
        "id": "S32g",
        "tr": "Anne arabayı babaya yıkatıyor.",
        "de": "Mama lässt Papa das Auto waschen.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w006",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "voice": "causative",
              "tense": "present",
              "person": "o"
            }
          }
        ]
      },
      {
        "id": "S32h",
        "tr": "Anne eve gitmek yerine arabayı yıkıyor.",
        "de": "Statt nach Hause zu gehen, wäscht Mama das Auto.",
        "slots": [
          {
            "lemma": "w005",
            "features": {}
          },
          {
            "lemma": "w003",
            "features": {
              "case": "dative"
            }
          },
          {
            "lemma": "w011",
            "features": {
              "tense": "infinitive"
            }
          },
          {
            "lemma": "w069",
            "features": {}
          },
          {
            "lemma": "w004",
            "features": {
              "case": "accusative"
            }
          },
          {
            "lemma": "w050",
            "features": {
              "tense": "present",
              "person": "o"
            }
          }
        ]
      }
    ]
  }
];if(typeof module==="object"&&module.exports)module.exports=data;else root.AndreCourseData=data;})(typeof globalThis==="object"?globalThis:this);
