/* Personal vocabulary, semantic roles and pronunciation profiles. */
(function(root){'use strict';const data={
  "version": 1,
  "themes": [
    {
      "id": "T01",
      "title": "Trash-TV",
      "references": [
        "RTL",
        "RTLZWEI",
        "Frauentausch",
        "Dschungelcamp"
      ],
      "anchor": {
        "tr": "Program komik.",
        "de": "Die Sendung ist lustig.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw001",
        "iw002",
        "iw003",
        "iw004",
        "iw005",
        "iw006",
        "iw007",
        "iw008",
        "iw009",
        "iw010",
        "iw011",
        "iw012",
        "iw013",
        "iw014",
        "iw015",
        "iw016",
        "iw017",
        "iw421",
        "in025",
        "in026",
        "in027",
        "in028"
      ],
      "color": "noun"
    },
    {
      "id": "T02",
      "title": "Nintendo & Sims",
      "references": [
        "Zelda",
        "Link",
        "Mario",
        "Luigi",
        "Peach",
        "Bowser",
        "Kirby",
        "Splatoon",
        "Mario Party",
        "The Sims"
      ],
      "anchor": {
        "tr": "Kirby komik.",
        "de": "Kirby ist lustig.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw018",
        "iw019",
        "iw020",
        "iw021",
        "iw022",
        "iw023",
        "iw024",
        "iw025",
        "iw026",
        "iw027",
        "iw028",
        "iw029",
        "iw030",
        "iw031",
        "iw032",
        "iw033",
        "iw034",
        "iw035",
        "iw414",
        "iw416",
        "in004",
        "in006",
        "in007",
        "in008",
        "in009",
        "in010",
        "in011",
        "in029",
        "in030",
        "in031"
      ],
      "color": "verb"
    },
    {
      "id": "T03",
      "title": "Sport & Protein",
      "references": [
        "Gym"
      ],
      "anchor": {
        "tr": "Havuz büyük.",
        "de": "Das Schwimmbecken ist groß.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw036",
        "iw037",
        "iw038",
        "iw039",
        "iw040",
        "iw041",
        "iw042",
        "iw043",
        "iw044",
        "iw045",
        "iw046",
        "iw047",
        "iw048",
        "iw049",
        "iw050",
        "iw051",
        "iw052",
        "iw053",
        "iw054",
        "iw055",
        "iw417",
        "iw418",
        "iw419",
        "iw422",
        "iw423"
      ],
      "color": "adj"
    },
    {
      "id": "T04",
      "title": "Mathe & Geschichte",
      "references": [
        "Roma",
        "Mısır",
        "Fransız Devrimi"
      ],
      "anchor": {
        "tr": "Soru kolay.",
        "de": "Die Frage ist leicht.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw056",
        "iw057",
        "iw058",
        "iw059",
        "iw060",
        "iw061",
        "iw062",
        "iw063",
        "iw064",
        "iw065",
        "iw066",
        "iw067",
        "iw068",
        "iw069",
        "iw070",
        "iw071",
        "iw072",
        "iw073",
        "iw074",
        "iw075",
        "iw076",
        "iw077",
        "iw078",
        "iw079",
        "iw080",
        "iw412",
        "iw413",
        "in023",
        "in024"
      ],
      "color": "lavender"
    },
    {
      "id": "T05",
      "title": "Mert & André",
      "references": [
        "Mert",
        "André",
        "Burger King",
        "Plant-based Long Chicken",
        "Peter Pane"
      ],
      "anchor": {
        "tr": "Mert tatlı.",
        "de": "Mert ist süß.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw081",
        "iw082",
        "iw083",
        "iw084",
        "iw085",
        "iw086",
        "iw087",
        "iw088",
        "iw089",
        "iw090",
        "iw091",
        "iw092",
        "iw093",
        "iw094",
        "iw095",
        "iw096",
        "iw421",
        "in001",
        "in002",
        "in046",
        "in047",
        "in048"
      ],
      "color": "pronoun"
    },
    {
      "id": "T06",
      "title": "Boys & Style",
      "references": [
        "Asyalı erkek",
        "ortadan ayrılmış saç"
      ],
      "anchor": {
        "tr": "Adam yakışıklı.",
        "de": "Der Mann sieht gut aus.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw097",
        "iw098",
        "iw099",
        "iw100",
        "iw101",
        "iw102",
        "iw103",
        "iw104",
        "iw105",
        "iw106",
        "iw107",
        "iw108",
        "iw109",
        "iw110",
        "iw111",
        "iw112",
        "iw113",
        "iw114"
      ],
      "color": "demonstrative"
    },
    {
      "id": "T07",
      "title": "Ben & Hunde",
      "references": [
        "Ben"
      ],
      "anchor": {
        "tr": "Köpek küçük.",
        "de": "Der Hund ist klein.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw115",
        "iw116",
        "iw117",
        "iw118",
        "iw119",
        "iw120",
        "iw121",
        "iw122",
        "iw123",
        "iw124",
        "iw125",
        "iw126",
        "iw127",
        "iw128",
        "iw129",
        "in003"
      ],
      "color": "response"
    },
    {
      "id": "T08",
      "title": "TikTok & Streaming",
      "references": [
        "TikTok",
        "Netflix",
        "Disney+"
      ],
      "anchor": {
        "tr": "Video kısa.",
        "de": "Das Video ist kurz.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw130",
        "iw131",
        "iw132",
        "iw133",
        "iw134",
        "iw135",
        "iw136",
        "iw137",
        "iw138",
        "iw139",
        "iw140",
        "iw141",
        "iw142",
        "iw143",
        "iw144",
        "in040",
        "in041",
        "in042"
      ],
      "color": "noun"
    },
    {
      "id": "T09",
      "title": "Serien & Cartoons",
      "references": [
        "Black Mirror",
        "Phineas",
        "Ferb",
        "Phineas und Ferb",
        "Invader Zim",
        "Zim",
        "Gir",
        "SüngerBob",
        "Family Guy",
        "Drawn Together",
        "Avatar",
        "Aang",
        "Korra",
        "Die Legende von Korra"
      ],
      "anchor": {
        "tr": "Korra güçlü.",
        "de": "Korra ist stark.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw145",
        "iw146",
        "iw147",
        "iw148",
        "iw149",
        "iw150",
        "iw151",
        "iw152",
        "iw153",
        "iw154",
        "iw155",
        "iw156",
        "iw157",
        "iw158",
        "iw159",
        "iw160",
        "iw161",
        "in005",
        "in012",
        "in013",
        "in014",
        "in015",
        "in016",
        "in017",
        "in035",
        "in036",
        "in037",
        "in038",
        "in039"
      ],
      "color": "verb"
    },
    {
      "id": "T10",
      "title": "Gaming & Technik",
      "references": [
        "PS5",
        "Nintendo Switch",
        "Quest 3"
      ],
      "anchor": {
        "tr": "Telefon yeni.",
        "de": "Das Handy ist neu.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw162",
        "iw163",
        "iw164",
        "iw165",
        "iw166",
        "iw167",
        "iw168",
        "iw169",
        "iw170",
        "iw171",
        "iw172",
        "iw173",
        "iw174",
        "iw175",
        "iw420",
        "in043",
        "in044",
        "in045"
      ],
      "color": "adj"
    },
    {
      "id": "T11",
      "title": "Koop mit Mert",
      "references": [
        "Split Fiction",
        "Mio",
        "Zoe",
        "Splatoon 3",
        "Salmon Run"
      ],
      "anchor": {
        "tr": "Takım güçlü.",
        "de": "Das Team ist stark.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw027",
        "iw068",
        "iw176",
        "iw177",
        "iw178",
        "iw179",
        "iw180",
        "iw181",
        "iw182",
        "iw183",
        "iw184",
        "iw185",
        "iw186",
        "iw187",
        "iw188",
        "iw189",
        "in018",
        "in019",
        "in032",
        "in033",
        "in034"
      ],
      "color": "lavender"
    },
    {
      "id": "T12",
      "title": "Einkaufen",
      "references": [
        "Kaufland",
        "EDEKA",
        "REWE"
      ],
      "anchor": {
        "tr": "Market büyük.",
        "de": "Der Supermarkt ist groß.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw190",
        "iw191",
        "iw192",
        "iw193",
        "iw194",
        "iw195",
        "iw196",
        "iw197",
        "iw198",
        "iw199",
        "iw200",
        "iw201",
        "iw202",
        "iw203",
        "iw204",
        "iw205",
        "in049",
        "in050",
        "in051"
      ],
      "color": "pronoun"
    },
    {
      "id": "T13",
      "title": "Essen & Getränke",
      "references": [
        "ÁRO",
        "Red Bull",
        "Bananenbrot",
        "Käsekuchen",
        "Donauwelle"
      ],
      "anchor": {
        "tr": "Çikolata tatlı.",
        "de": "Die Schokolade ist süß.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw110",
        "iw206",
        "iw207",
        "iw208",
        "iw209",
        "iw210",
        "iw211",
        "iw212",
        "iw213",
        "iw214",
        "iw215",
        "iw216",
        "iw217",
        "iw218",
        "iw219",
        "iw220",
        "iw221",
        "iw222",
        "iw223",
        "iw224",
        "iw225",
        "iw226",
        "iw417",
        "iw422",
        "in052",
        "in053",
        "in054"
      ],
      "color": "demonstrative"
    },
    {
      "id": "T14",
      "title": "Matcha & Kokos",
      "references": [
        "Kokos",
        "Matcha"
      ],
      "anchor": {
        "tr": "Matcha acı.",
        "de": "Matcha ist bitter.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw227",
        "iw228",
        "iw229",
        "iw230",
        "iw231",
        "iw232",
        "iw233",
        "iw234",
        "iw235",
        "iw236",
        "iw237",
        "iw238",
        "iw239",
        "iw240",
        "iw241",
        "iw242"
      ],
      "color": "response"
    },
    {
      "id": "T15",
      "title": "Paris & Münster",
      "references": [
        "Paris",
        "Münster",
        "ÁRO",
        "Eyfel Kulesi"
      ],
      "anchor": {
        "tr": "Paris güzel.",
        "de": "Paris ist schön.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw127",
        "iw243",
        "iw244",
        "iw245",
        "iw246",
        "iw247",
        "iw248",
        "iw249",
        "iw250",
        "iw251",
        "iw252",
        "iw253",
        "iw254",
        "iw255",
        "iw256",
        "iw257",
        "iw258",
        "iw259",
        "in021",
        "in022",
        "in052"
      ],
      "color": "noun"
    },
    {
      "id": "T16",
      "title": "Scharf mit Mert",
      "references": [
        "Jalapeño",
        "Sriracha"
      ],
      "anchor": {
        "tr": "Sos acı.",
        "de": "Die Soße ist scharf.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw241",
        "iw242",
        "iw260",
        "iw261",
        "iw262",
        "iw263",
        "iw264",
        "iw265",
        "iw266",
        "iw267",
        "iw268",
        "iw269",
        "iw270",
        "iw271",
        "iw272",
        "iw273",
        "in055",
        "in056"
      ],
      "color": "verb"
    },
    {
      "id": "T17",
      "title": "Auto & Geräte",
      "references": [
        "Book 5",
        "Samsung Galaxy S25+",
        "Nintendo Switch 2",
        "robot süpürge"
      ],
      "anchor": {
        "tr": "Araba yeni.",
        "de": "Das Auto ist neu.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw155",
        "iw274",
        "iw275",
        "iw276",
        "iw277",
        "iw278",
        "iw279",
        "iw280",
        "iw281",
        "iw282",
        "iw283",
        "iw284",
        "iw285",
        "iw286",
        "iw287",
        "iw288",
        "iw420",
        "in057",
        "in058",
        "in059"
      ],
      "color": "adj"
    },
    {
      "id": "T18",
      "title": "Augen & Locken",
      "references": [
        "Mert",
        "André"
      ],
      "anchor": {
        "tr": "Saç kıvırcık.",
        "de": "Das Haar ist lockig.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw099",
        "iw105",
        "iw111",
        "iw152",
        "iw238",
        "iw273",
        "iw289",
        "iw290",
        "iw291",
        "iw292",
        "iw293",
        "iw294",
        "iw295",
        "iw296",
        "iw297",
        "iw414",
        "iw416",
        "in001",
        "in002"
      ],
      "color": "lavender"
    },
    {
      "id": "T19",
      "title": "Bei Mama",
      "references": [
        "Ben",
        "André"
      ],
      "anchor": {
        "tr": "Anne tatlı.",
        "de": "Die Mutter ist lieb.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw298",
        "iw299",
        "iw300",
        "iw301",
        "iw302",
        "iw303",
        "iw304",
        "iw305",
        "iw306",
        "iw307",
        "iw308",
        "iw309",
        "iw310",
        "iw311",
        "iw312",
        "iw313",
        "in002",
        "in003"
      ],
      "color": "pronoun"
    },
    {
      "id": "T20",
      "title": "Wochenendküche",
      "references": [
        "Mert",
        "André"
      ],
      "anchor": {
        "tr": "Mutfak küçük.",
        "de": "Die Küche ist klein.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw078",
        "iw189",
        "iw301",
        "iw311",
        "iw314",
        "iw315",
        "iw316",
        "iw317",
        "iw318",
        "iw319",
        "iw320",
        "iw321",
        "iw322",
        "iw323",
        "iw324",
        "iw325",
        "iw326",
        "iw413",
        "in001",
        "in002"
      ],
      "color": "demonstrative"
    },
    {
      "id": "T21",
      "title": "Socken & Geschenke",
      "references": [
        "Mert",
        "André"
      ],
      "anchor": {
        "tr": "Çorap güzel.",
        "de": "Die Socke ist schön.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw128",
        "iw171",
        "iw282",
        "iw296",
        "iw327",
        "iw328",
        "iw329",
        "iw330",
        "iw331",
        "iw332",
        "iw333",
        "iw334",
        "iw335",
        "iw336",
        "iw337",
        "iw338",
        "in001",
        "in002"
      ],
      "color": "response"
    },
    {
      "id": "T22",
      "title": "Kochsendungen",
      "references": [
        "André"
      ],
      "anchor": {
        "tr": "Aşçı komik.",
        "de": "Der Koch ist lustig.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw001",
        "iw140",
        "iw249",
        "iw298",
        "iw304",
        "iw319",
        "iw339",
        "iw340",
        "iw341",
        "iw342",
        "iw343",
        "iw344",
        "iw345",
        "iw346",
        "iw347",
        "in002"
      ],
      "color": "noun"
    },
    {
      "id": "T23",
      "title": "Frech & vulgär",
      "references": [
        "Merz",
        "siktir git",
        "Merz, leck Eier!"
      ],
      "anchor": {
        "tr": "Merz aptal.",
        "de": "Merz ist dumm.",
        "construction": "nominal-statement",
        "requires_word_learning": true,
        "requires_grammar_learning": true
      },
      "words": [
        "iw348",
        "iw349",
        "iw350",
        "iw351",
        "iw352",
        "iw353",
        "iw354",
        "iw355",
        "iw356",
        "iw357",
        "iw358",
        "iw359",
        "iw360",
        "iw361",
        "iw362",
        "iw363",
        "iw364",
        "in020"
      ],
      "color": "verb"
    }
  ],
  "words": [
    {
      "id": "iw001",
      "tr": "program",
      "de": "Sendung",
      "deAnswers": [
        "Sendung"
      ],
      "type": "noun",
      "themes": [
        "T01",
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Sendung",
        "plural": "Sendungen"
      },
      "semantic": "media"
    },
    {
      "id": "iw002",
      "tr": "sunucu",
      "de": "Moderator",
      "deAnswers": [
        "Moderator"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Moderator",
        "plural": "Moderatoren",
        "weak": false,
        "oblique": "Moderatoren"
      },
      "semantic": "human"
    },
    {
      "id": "iw003",
      "tr": "yarışmacı",
      "de": "Kandidat",
      "deAnswers": [
        "Kandidat"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Kandidat",
        "plural": "Kandidaten",
        "weak": true,
        "oblique": "Kandidaten"
      },
      "semantic": "human"
    },
    {
      "id": "iw004",
      "tr": "röportaj",
      "de": "Interview",
      "deAnswers": [
        "Interview"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Interview",
        "plural": "Interviews"
      },
      "semantic": "thing"
    },
    {
      "id": "iw005",
      "tr": "tartışma",
      "de": "Streitgespräch",
      "deAnswers": [
        "Streitgespräch"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Streitgespräch",
        "plural": "Streitgespräche"
      },
      "semantic": "thing"
    },
    {
      "id": "iw006",
      "tr": "kavga",
      "de": "Streit",
      "deAnswers": [
        "Streit"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Streit",
        "plural": "Streite"
      },
      "semantic": "thing"
    },
    {
      "id": "iw007",
      "tr": "itiraf",
      "de": "Geständnis",
      "deAnswers": [
        "Geständnis"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Geständnis",
        "plural": "Geständnisse"
      },
      "semantic": "thing"
    },
    {
      "id": "iw008",
      "tr": "drama",
      "de": "Drama",
      "deAnswers": [
        "Drama"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Drama",
        "plural": "Dramen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw009",
      "tr": "skandal",
      "de": "Skandal",
      "deAnswers": [
        "Skandal"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Skandal",
        "plural": "Skandale"
      },
      "semantic": "thing"
    },
    {
      "id": "iw010",
      "tr": "reyting",
      "de": "Einschaltquote",
      "deAnswers": [
        "Einschaltquote"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Einschaltquote",
        "plural": "Einschaltquoten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw011",
      "tr": "sahne",
      "de": "Szene",
      "deAnswers": [
        "Szene"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Szene",
        "plural": "Szenen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw012",
      "tr": "final",
      "de": "Finale",
      "deAnswers": [
        "Finale"
      ],
      "type": "noun",
      "themes": [
        "T01"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Finale",
        "plural": "Finals"
      },
      "semantic": "thing"
    },
    {
      "id": "iw013",
      "tr": "bağırmak",
      "de": "schreien",
      "deAnswers": [
        "schreien"
      ],
      "type": "verb",
      "themes": [
        "T01"
      ],
      "interest": true,
      "aorist": "bağırır",
      "deGrammar": {
        "infinitive": "schreien",
        "present": [
          "schreie",
          "schreist",
          "schreit",
          "schreien",
          "schreit",
          "schreien"
        ],
        "participle": "geschrien",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "bağır",
      "progressiveStem": "bağır"
    },
    {
      "id": "iw014",
      "tr": "abartmak",
      "de": "übertreiben",
      "deAnswers": [
        "übertreiben"
      ],
      "type": "verb",
      "themes": [
        "T01"
      ],
      "interest": true,
      "aorist": "abartır",
      "deGrammar": {
        "infinitive": "übertreiben",
        "present": [
          "übertreibe",
          "übertreibst",
          "übertreibt",
          "übertreiben",
          "übertreibt",
          "übertreiben"
        ],
        "participle": "übertrieben",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "abart",
      "progressiveStem": "abart"
    },
    {
      "id": "iw015",
      "tr": "yalan söylemek",
      "de": "lügen",
      "deAnswers": [
        "lügen"
      ],
      "type": "verb",
      "themes": [
        "T01"
      ],
      "interest": true,
      "aorist": "yalan söyler",
      "deGrammar": {
        "infinitive": "lügen",
        "present": [
          "lüge",
          "lügst",
          "lügt",
          "lügen",
          "lügt",
          "lügen"
        ],
        "participle": "gelogen",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "yalan söyle",
      "progressiveStem": "yalan söyl"
    },
    {
      "id": "iw016",
      "tr": "şikâyet etmek",
      "de": "sich beschweren",
      "deAnswers": [
        "sich beschweren"
      ],
      "type": "verb",
      "themes": [
        "T01"
      ],
      "interest": true,
      "aorist": "şikâyet eder",
      "deGrammar": {
        "infinitive": "sich beschweren",
        "present": [
          "beschwere mich",
          "beschwerst dich",
          "beschwert sich",
          "beschweren uns",
          "beschwert euch",
          "beschweren sich"
        ],
        "participle": "beschwert",
        "auxiliary": "haben",
        "frame": "simple",
        "reflexive": true
      },
      "stem": "şikâyet et",
      "progressiveStem": "şikâyet ed",
      "vowelStem": "şikâyet ed"
    },
    {
      "id": "iw017",
      "tr": "iddia etmek",
      "de": "behaupten",
      "deAnswers": [
        "behaupten"
      ],
      "type": "verb",
      "themes": [
        "T01"
      ],
      "interest": true,
      "aorist": "iddia eder",
      "deGrammar": {
        "infinitive": "behaupten",
        "present": [
          "behaupte",
          "behauptest",
          "behauptet",
          "behaupten",
          "behauptet",
          "behaupten"
        ],
        "participle": "behauptet",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "iddia et",
      "progressiveStem": "iddia ed",
      "vowelStem": "iddia ed"
    },
    {
      "id": "iw018",
      "tr": "oyun",
      "de": "Spiel",
      "deAnswers": [
        "Spiel"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Spiel",
        "plural": "Spiele"
      },
      "semantic": "thing"
    },
    {
      "id": "iw019",
      "tr": "oyuncu",
      "de": "Spieler",
      "deAnswers": [
        "Spieler"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Spieler",
        "plural": "Spieler"
      },
      "semantic": "human"
    },
    {
      "id": "iw020",
      "tr": "kahraman",
      "de": "Held",
      "deAnswers": [
        "Held"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Held",
        "plural": "Helden",
        "weak": true,
        "oblique": "Helden"
      },
      "semantic": "human"
    },
    {
      "id": "iw021",
      "tr": "düşman",
      "de": "Gegner",
      "deAnswers": [
        "Gegner"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Gegner",
        "plural": "Gegner"
      },
      "semantic": "human"
    },
    {
      "id": "iw022",
      "tr": "kılıç",
      "de": "Schwert",
      "deAnswers": [
        "Schwert"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Schwert",
        "plural": "Schwerter"
      },
      "semantic": "thing",
      "soften": "kılıc"
    },
    {
      "id": "iw023",
      "tr": "kalkan",
      "de": "Schild",
      "deAnswers": [
        "Schild"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schild",
        "plural": "Schilde"
      },
      "semantic": "thing"
    },
    {
      "id": "iw024",
      "tr": "yıldız",
      "de": "Stern",
      "deAnswers": [
        "Stern"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Stern",
        "plural": "Sterne"
      },
      "semantic": "thing"
    },
    {
      "id": "iw025",
      "tr": "mantar",
      "de": "Pilz",
      "deAnswers": [
        "Pilz"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Pilz",
        "plural": "Pilze"
      },
      "semantic": "food"
    },
    {
      "id": "iw026",
      "tr": "boya",
      "de": "Farbe",
      "deAnswers": [
        "Farbe"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Farbe",
        "plural": "Farben"
      },
      "semantic": "thing"
    },
    {
      "id": "iw027",
      "tr": "mürekkep",
      "de": "Tinte",
      "deAnswers": [
        "Tinte"
      ],
      "type": "noun",
      "themes": [
        "T02",
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Tinte",
        "plural": "Tinten"
      },
      "semantic": "thing",
      "soften": "mürekkeb"
    },
    {
      "id": "iw028",
      "tr": "harita",
      "de": "Karte",
      "deAnswers": [
        "Karte"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Karte",
        "plural": "Karten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw029",
      "tr": "hazine",
      "de": "Schatz",
      "deAnswers": [
        "Schatz"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schatz",
        "plural": "Schätze"
      },
      "semantic": "thing"
    },
    {
      "id": "iw030",
      "tr": "mobilya",
      "de": "Möbel",
      "deAnswers": [
        "Möbel"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Möbelstück",
        "plural": "Möbelstücke"
      },
      "semantic": "thing"
    },
    {
      "id": "iw031",
      "tr": "komşu",
      "de": "Nachbar",
      "deAnswers": [
        "Nachbar"
      ],
      "type": "noun",
      "themes": [
        "T02"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Nachbar",
        "plural": "Nachbarn",
        "weak": true,
        "oblique": "Nachbarn"
      },
      "semantic": "human"
    },
    {
      "id": "iw032",
      "tr": "zıplamak",
      "de": "springen",
      "deAnswers": [
        "springen"
      ],
      "type": "verb",
      "themes": [
        "T02"
      ],
      "interest": true,
      "aorist": "zıplar",
      "deGrammar": {
        "infinitive": "springen",
        "present": [
          "springe",
          "springst",
          "springt",
          "springen",
          "springt",
          "springen"
        ],
        "participle": "gesprungen",
        "auxiliary": "sein",
        "frame": "simple"
      },
      "stem": "zıpla",
      "progressiveStem": "zıpl"
    },
    {
      "id": "iw033",
      "tr": "kazanmak",
      "de": "gewinnen",
      "deAnswers": [
        "gewinnen"
      ],
      "type": "verb",
      "themes": [
        "T02"
      ],
      "interest": true,
      "aorist": "kazanır",
      "deGrammar": {
        "infinitive": "gewinnen",
        "present": [
          "gewinne",
          "gewinnst",
          "gewinnt",
          "gewinnen",
          "gewinnt",
          "gewinnen"
        ],
        "participle": "gewonnen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "kazan",
      "progressiveStem": "kazan"
    },
    {
      "id": "iw034",
      "tr": "kaybetmek",
      "de": "verlieren",
      "deAnswers": [
        "verlieren"
      ],
      "type": "verb",
      "themes": [
        "T02"
      ],
      "interest": true,
      "aorist": "kaybeder",
      "deGrammar": {
        "infinitive": "verlieren",
        "present": [
          "verliere",
          "verlierst",
          "verliert",
          "verlieren",
          "verliert",
          "verlieren"
        ],
        "participle": "verloren",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "kaybet",
      "progressiveStem": "kaybed",
      "vowelStem": "kaybed"
    },
    {
      "id": "iw035",
      "tr": "inşa etmek",
      "de": "bauen",
      "deAnswers": [
        "bauen"
      ],
      "type": "verb",
      "themes": [
        "T02"
      ],
      "interest": true,
      "aorist": "inşa eder",
      "deGrammar": {
        "infinitive": "bauen",
        "present": [
          "baue",
          "baust",
          "baut",
          "bauen",
          "baut",
          "bauen"
        ],
        "participle": "gebaut",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "inşa et",
      "progressiveStem": "inşa ed",
      "vowelStem": "inşa ed"
    },
    {
      "id": "iw036",
      "tr": "havuz",
      "de": "Schwimmbecken",
      "deAnswers": [
        "Schwimmbecken"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Schwimmbecken",
        "plural": "Schwimmbecken",
        "at": "in dem Schwimmbecken",
        "to": "zu dem Schwimmbecken",
        "from": "aus dem Schwimmbecken"
      },
      "semantic": "place"
    },
    {
      "id": "iw037",
      "tr": "antrenman",
      "de": "Training",
      "deAnswers": [
        "Training"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Training",
        "plural": "Trainings"
      },
      "semantic": "thing"
    },
    {
      "id": "iw038",
      "tr": "ağırlık",
      "de": "Gewicht beim Training",
      "deAnswers": [
        "Gewicht beim Training"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Gewicht",
        "plural": "Gewichte"
      },
      "semantic": "thing"
    },
    {
      "id": "iw039",
      "tr": "kas",
      "de": "Muskel",
      "deAnswers": [
        "Muskel"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Muskel",
        "plural": "Muskeln"
      },
      "semantic": "thing"
    },
    {
      "id": "iw040",
      "tr": "ter",
      "de": "Schweiß",
      "deAnswers": [
        "Schweiß"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schweiß",
        "plural": "Schweiß"
      },
      "semantic": "thing"
    },
    {
      "id": "iw041",
      "tr": "havlu",
      "de": "Handtuch",
      "deAnswers": [
        "Handtuch"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Handtuch",
        "plural": "Handtücher"
      },
      "semantic": "thing"
    },
    {
      "id": "iw042",
      "tr": "mayo",
      "de": "Badeanzug",
      "deAnswers": [
        "Badeanzug"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Badeanzug",
        "plural": "Badeanzüge"
      },
      "semantic": "thing"
    },
    {
      "id": "iw043",
      "tr": "park",
      "de": "Park",
      "deAnswers": [
        "Park"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Park",
        "plural": "Parks",
        "at": "in dem Park",
        "to": "zu dem Park",
        "from": "aus dem Park"
      },
      "semantic": "place"
    },
    {
      "id": "iw044",
      "tr": "protein",
      "de": "Protein",
      "deAnswers": [
        "Protein"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Protein",
        "plural": "Proteine"
      },
      "semantic": "thing"
    },
    {
      "id": "iw045",
      "tr": "protein tozu",
      "de": "Proteinpulver",
      "deAnswers": [
        "Proteinpulver"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Proteinpulver",
        "plural": "Proteinpulver"
      },
      "semantic": "thing",
      "compoundParts": [
        "protein",
        "toz"
      ]
    },
    {
      "id": "iw046",
      "tr": "chia tohumu",
      "de": "Chiasamen",
      "deAnswers": [
        "Chiasamen"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Chiasamen",
        "plural": "Chiasamen"
      },
      "semantic": "thing",
      "compoundParts": [
        "chia",
        "tohum"
      ]
    },
    {
      "id": "iw047",
      "tr": "kalori",
      "de": "Kalorie",
      "deAnswers": [
        "Kalorie"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Kalorie",
        "plural": "Kalorien"
      },
      "semantic": "thing"
    },
    {
      "id": "iw048",
      "tr": "yoğurt",
      "de": "Joghurt",
      "deAnswers": [
        "Joghurt"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Joghurt",
        "plural": "Joghurts"
      },
      "semantic": "food",
      "soften": "yoğurd"
    },
    {
      "id": "iw049",
      "tr": "yulaf",
      "de": "Hafer",
      "deAnswers": [
        "Hafer"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Hafer",
        "plural": "Hafer"
      },
      "semantic": "food"
    },
    {
      "id": "iw050",
      "tr": "beslenme",
      "de": "Ernährung",
      "deAnswers": [
        "Ernährung"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Ernährung",
        "plural": "Ernährungsweisen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw051",
      "tr": "yüzmek",
      "de": "schwimmen",
      "deAnswers": [
        "schwimmen"
      ],
      "type": "verb",
      "themes": [
        "T03"
      ],
      "interest": true,
      "aorist": "yüzer",
      "deGrammar": {
        "infinitive": "schwimmen",
        "present": [
          "schwimme",
          "schwimmst",
          "schwimmt",
          "schwimmen",
          "schwimmt",
          "schwimmen"
        ],
        "participle": "geschwommen",
        "auxiliary": "sein",
        "frame": "simple"
      },
      "stem": "yüz",
      "progressiveStem": "yüz"
    },
    {
      "id": "iw052",
      "tr": "koşmak",
      "de": "laufen",
      "deAnswers": [
        "laufen"
      ],
      "type": "verb",
      "themes": [
        "T03"
      ],
      "interest": true,
      "aorist": "koşar",
      "deGrammar": {
        "infinitive": "laufen",
        "present": [
          "laufe",
          "läufst",
          "läuft",
          "laufen",
          "lauft",
          "laufen"
        ],
        "participle": "gelaufen",
        "auxiliary": "sein",
        "frame": "motion"
      },
      "stem": "koş",
      "progressiveStem": "koş"
    },
    {
      "id": "iw053",
      "tr": "dinlenmek",
      "de": "sich ausruhen",
      "deAnswers": [
        "sich ausruhen"
      ],
      "type": "verb",
      "themes": [
        "T03"
      ],
      "interest": true,
      "aorist": "dinlenir",
      "deGrammar": {
        "infinitive": "sich ausruhen",
        "present": [
          "ruhe mich aus",
          "ruhst dich aus",
          "ruht sich aus",
          "ruhen uns aus",
          "ruht euch aus",
          "ruhen sich aus"
        ],
        "participle": "ausgeruht",
        "auxiliary": "haben",
        "frame": "simple",
        "reflexive": true,
        "separable": "aus"
      },
      "stem": "dinlen",
      "progressiveStem": "dinlen"
    },
    {
      "id": "iw054",
      "tr": "spor yapmak",
      "de": "Sport machen",
      "deAnswers": [
        "Sport machen"
      ],
      "type": "verb",
      "themes": [
        "T03"
      ],
      "interest": true,
      "aorist": "spor yapar",
      "deGrammar": {
        "infinitive": "Sport machen",
        "present": [
          "mache Sport",
          "machst Sport",
          "macht Sport",
          "machen Sport",
          "macht Sport",
          "machen Sport"
        ],
        "participle": "Sport gemacht",
        "auxiliary": "haben",
        "frame": "simple",
        "fixed": "Sport"
      },
      "stem": "spor yap",
      "progressiveStem": "spor yap"
    },
    {
      "id": "iw055",
      "tr": "kilo vermek",
      "de": "abnehmen",
      "deAnswers": [
        "abnehmen"
      ],
      "type": "verb",
      "themes": [
        "T03"
      ],
      "interest": true,
      "aorist": "kilo verir",
      "deGrammar": {
        "infinitive": "abnehmen",
        "present": [
          "nehme ab",
          "nimmst ab",
          "nimmt ab",
          "nehmen ab",
          "nehmt ab",
          "nehmen ab"
        ],
        "participle": "abgenommen",
        "auxiliary": "haben",
        "frame": "simple",
        "separable": "ab"
      },
      "stem": "kilo ver",
      "progressiveStem": "kilo ver"
    },
    {
      "id": "iw056",
      "tr": "öğretmen",
      "de": "Lehrer",
      "deAnswers": [
        "Lehrer"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Lehrer",
        "plural": "Lehrer"
      },
      "semantic": "human"
    },
    {
      "id": "iw057",
      "tr": "öğrenci",
      "de": "Schüler",
      "deAnswers": [
        "Schüler"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schüler",
        "plural": "Schüler"
      },
      "semantic": "human"
    },
    {
      "id": "iw058",
      "tr": "ders",
      "de": "Unterrichtsstunde",
      "deAnswers": [
        "Unterrichtsstunde"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Unterrichtsstunde",
        "plural": "Unterrichtsstunden"
      },
      "semantic": "thing"
    },
    {
      "id": "iw059",
      "tr": "sınıf",
      "de": "Klasse",
      "deAnswers": [
        "Klasse"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Klasse",
        "plural": "Klassen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw060",
      "tr": "soru",
      "de": "Frage",
      "deAnswers": [
        "Frage"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Frage",
        "plural": "Fragen"
      },
      "semantic": "problem"
    },
    {
      "id": "iw061",
      "tr": "cevap",
      "de": "Antwort",
      "deAnswers": [
        "Antwort"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Antwort",
        "plural": "Antworten"
      },
      "semantic": "thing",
      "soften": "cevab"
    },
    {
      "id": "iw062",
      "tr": "ödev",
      "de": "Hausaufgabe",
      "deAnswers": [
        "Hausaufgabe"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Hausaufgabe",
        "plural": "Hausaufgaben"
      },
      "semantic": "problem"
    },
    {
      "id": "iw063",
      "tr": "sınav",
      "de": "Prüfung",
      "deAnswers": [
        "Prüfung"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Prüfung",
        "plural": "Prüfungen"
      },
      "semantic": "problem"
    },
    {
      "id": "iw064",
      "tr": "kesir",
      "de": "Bruch",
      "deAnswers": [
        "Bruch"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Bruch",
        "plural": "Brüche"
      },
      "semantic": "problem"
    },
    {
      "id": "iw065",
      "tr": "yüzde",
      "de": "Prozent",
      "deAnswers": [
        "Prozent"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Prozent",
        "plural": "Prozente"
      },
      "semantic": "thing"
    },
    {
      "id": "iw066",
      "tr": "denklem",
      "de": "Gleichung",
      "deAnswers": [
        "Gleichung"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Gleichung",
        "plural": "Gleichungen"
      },
      "semantic": "problem"
    },
    {
      "id": "iw067",
      "tr": "üçgen",
      "de": "Dreieck",
      "deAnswers": [
        "Dreieck"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Dreieck",
        "plural": "Dreiecke"
      },
      "semantic": "thing"
    },
    {
      "id": "iw068",
      "tr": "alan",
      "de": "Flächeninhalt / Gebiet / Fläche",
      "deAnswers": [
        "Flächeninhalt",
        "Gebiet",
        "Fläche"
      ],
      "type": "noun",
      "themes": [
        "T04",
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Fläche",
        "plural": "Flächen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw069",
      "tr": "grafik",
      "de": "Diagramm",
      "deAnswers": [
        "Diagramm"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Diagramm",
        "plural": "Diagramme"
      },
      "semantic": "thing"
    },
    {
      "id": "iw070",
      "tr": "olasılık",
      "de": "Wahrscheinlichkeit",
      "deAnswers": [
        "Wahrscheinlichkeit"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Wahrscheinlichkeit",
        "plural": "Wahrscheinlichkeiten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw071",
      "tr": "tarih",
      "de": "Geschichte",
      "deAnswers": [
        "Geschichte"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Geschichte",
        "plural": "Geschichten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw072",
      "tr": "kaynak",
      "de": "Quelle",
      "deAnswers": [
        "Quelle"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Quelle",
        "plural": "Quellen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw073",
      "tr": "devrim",
      "de": "Revolution",
      "deAnswers": [
        "Revolution"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Revolution",
        "plural": "Revolutionen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw074",
      "tr": "imparatorluk",
      "de": "Kaiserreich",
      "deAnswers": [
        "Kaiserreich"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Kaiserreich",
        "plural": "Kaiserreiche"
      },
      "semantic": "thing"
    },
    {
      "id": "iw075",
      "tr": "Orta Çağ",
      "de": "Mittelalter",
      "deAnswers": [
        "Mittelalter"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Mittelalter",
        "plural": "Mittelalter"
      },
      "semantic": "thing",
      "properName": true,
      "harmonyStem": "orta çağ"
    },
    {
      "id": "iw076",
      "tr": "sanayileşme",
      "de": "Industrialisierung",
      "deAnswers": [
        "Industrialisierung"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Industrialisierung",
        "plural": "Industrialisierungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw077",
      "tr": "açıklamak",
      "de": "erklären",
      "deAnswers": [
        "erklären"
      ],
      "type": "verb",
      "themes": [
        "T04"
      ],
      "interest": true,
      "aorist": "açıklar",
      "deGrammar": {
        "infinitive": "erklären",
        "present": [
          "erkläre",
          "erklärst",
          "erklärt",
          "erklären",
          "erklärt",
          "erklären"
        ],
        "participle": "erklärt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "açıkla",
      "progressiveStem": "açıkl"
    },
    {
      "id": "iw078",
      "tr": "hazırlamak",
      "de": "vorbereiten",
      "deAnswers": [
        "vorbereiten"
      ],
      "type": "verb",
      "themes": [
        "T04",
        "T20"
      ],
      "interest": true,
      "aorist": "hazırlar",
      "deGrammar": {
        "infinitive": "vorbereiten",
        "present": [
          "bereite vor",
          "bereitest vor",
          "bereitet vor",
          "bereiten vor",
          "bereitet vor",
          "bereiten vor"
        ],
        "participle": "vorbereitet",
        "auxiliary": "haben",
        "frame": "object",
        "separable": "vor"
      },
      "stem": "hazırla",
      "progressiveStem": "hazırl",
      "voice": {
        "passive": "hazırlan",
        "causative": "hazırlat"
      }
    },
    {
      "id": "iw079",
      "tr": "hesaplamak",
      "de": "berechnen",
      "deAnswers": [
        "berechnen"
      ],
      "type": "verb",
      "themes": [
        "T04"
      ],
      "interest": true,
      "aorist": "hesaplar",
      "deGrammar": {
        "infinitive": "berechnen",
        "present": [
          "berechne",
          "berechnst",
          "berechnt",
          "berechnen",
          "berechnt",
          "berechnen"
        ],
        "participle": "berechnet",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "hesapla",
      "progressiveStem": "hesapl"
    },
    {
      "id": "iw080",
      "tr": "düzeltmek",
      "de": "korrigieren",
      "deAnswers": [
        "korrigieren"
      ],
      "type": "verb",
      "themes": [
        "T04"
      ],
      "interest": true,
      "aorist": "düzeltir",
      "deGrammar": {
        "infinitive": "korrigieren",
        "present": [
          "korrigiere",
          "korrigierst",
          "korrigiert",
          "korrigieren",
          "korrigiert",
          "korrigieren"
        ],
        "participle": "korrigiert",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "düzelt",
      "progressiveStem": "düzelt"
    },
    {
      "id": "iw081",
      "tr": "sevgili",
      "de": "Partner in einer Liebesbeziehung",
      "deAnswers": [
        "Partner in einer Liebesbeziehung"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Partner",
        "plural": "Partner"
      },
      "semantic": "human"
    },
    {
      "id": "iw082",
      "tr": "aşk",
      "de": "Liebe",
      "deAnswers": [
        "Liebe"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Liebe",
        "plural": "Lieben"
      },
      "semantic": "thing"
    },
    {
      "id": "iw083",
      "tr": "randevu",
      "de": "Verabredung",
      "deAnswers": [
        "Verabredung"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Verabredung",
        "plural": "Verabredungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw084",
      "tr": "akşam",
      "de": "Abend",
      "deAnswers": [
        "Abend"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Abend",
        "plural": "Abende"
      },
      "semantic": "thing"
    },
    {
      "id": "iw085",
      "tr": "restoran",
      "de": "Restaurant",
      "deAnswers": [
        "Restaurant"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Restaurant",
        "plural": "Restaurants",
        "at": "in dem Restaurant",
        "to": "zu dem Restaurant",
        "from": "aus dem Restaurant"
      },
      "semantic": "place"
    },
    {
      "id": "iw086",
      "tr": "masa",
      "de": "Tisch",
      "deAnswers": [
        "Tisch"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Tisch",
        "plural": "Tische"
      },
      "semantic": "thing"
    },
    {
      "id": "iw087",
      "tr": "menü",
      "de": "Speisekarte",
      "deAnswers": [
        "Speisekarte"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Speisekarte",
        "plural": "Speisekarten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw088",
      "tr": "burger",
      "de": "Burger",
      "deAnswers": [
        "Burger"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Burger",
        "plural": "Burger"
      },
      "semantic": "food"
    },
    {
      "id": "iw089",
      "tr": "tavuk",
      "de": "Hähnchen",
      "deAnswers": [
        "Hähnchen"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Hähnchen",
        "plural": "Hähnchen"
      },
      "semantic": "food"
    },
    {
      "id": "iw090",
      "tr": "bitki",
      "de": "Pflanze",
      "deAnswers": [
        "Pflanze"
      ],
      "type": "noun",
      "themes": [
        "T05"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Pflanze",
        "plural": "Pflanzen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw091",
      "tr": "öpmek",
      "de": "küssen",
      "deAnswers": [
        "küssen"
      ],
      "type": "verb",
      "themes": [
        "T05"
      ],
      "interest": true,
      "aorist": "öper",
      "deGrammar": {
        "infinitive": "küssen",
        "present": [
          "küsse",
          "küsst",
          "küsst",
          "küssen",
          "küsst",
          "küssen"
        ],
        "participle": "geküsst",
        "auxiliary": "haben",
        "frame": "person-object"
      },
      "stem": "öp",
      "progressiveStem": "öp"
    },
    {
      "id": "iw092",
      "tr": "sarılmak",
      "de": "umarmen",
      "deAnswers": [
        "umarmen"
      ],
      "type": "verb",
      "themes": [
        "T05"
      ],
      "interest": true,
      "aorist": "sarılır",
      "deGrammar": {
        "infinitive": "umarmen",
        "present": [
          "umarme",
          "umarmst",
          "umarmt",
          "umarmen",
          "umarmt",
          "umarmen"
        ],
        "participle": "umarmt",
        "auxiliary": "haben",
        "frame": "person-dative"
      },
      "stem": "sarıl",
      "progressiveStem": "sarıl"
    },
    {
      "id": "iw093",
      "tr": "özlemek",
      "de": "vermissen",
      "deAnswers": [
        "vermissen"
      ],
      "type": "verb",
      "themes": [
        "T05"
      ],
      "interest": true,
      "aorist": "özler",
      "deGrammar": {
        "infinitive": "vermissen",
        "present": [
          "vermisse",
          "vermisst",
          "vermisst",
          "vermissen",
          "vermisst",
          "vermissen"
        ],
        "participle": "vermisst",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "özle",
      "progressiveStem": "özl"
    },
    {
      "id": "iw094",
      "tr": "buluşmak",
      "de": "sich verabreden",
      "deAnswers": [
        "sich verabreden"
      ],
      "type": "verb",
      "themes": [
        "T05"
      ],
      "interest": true,
      "aorist": "buluşur",
      "deGrammar": {
        "infinitive": "sich treffen",
        "present": [
          "treffe mich",
          "triffst dich",
          "trifft sich",
          "treffen uns",
          "trefft euch",
          "treffen sich"
        ],
        "participle": "getroffen",
        "auxiliary": "haben",
        "frame": "simple",
        "reflexive": true
      },
      "stem": "buluş",
      "progressiveStem": "buluş"
    },
    {
      "id": "iw095",
      "tr": "sipariş vermek",
      "de": "bestellen",
      "deAnswers": [
        "bestellen"
      ],
      "type": "verb",
      "themes": [
        "T05"
      ],
      "interest": true,
      "aorist": "sipariş verir",
      "deGrammar": {
        "infinitive": "bestellen",
        "present": [
          "bestelle",
          "bestellst",
          "bestellt",
          "bestellen",
          "bestellt",
          "bestellen"
        ],
        "participle": "bestellt",
        "auxiliary": "haben",
        "frame": "food-object"
      },
      "stem": "sipariş ver",
      "progressiveStem": "sipariş ver"
    },
    {
      "id": "iw096",
      "tr": "paylaşmak",
      "de": "teilen",
      "deAnswers": [
        "teilen"
      ],
      "type": "verb",
      "themes": [
        "T05"
      ],
      "interest": true,
      "aorist": "paylaşır",
      "deGrammar": {
        "infinitive": "teilen",
        "present": [
          "teile",
          "teilst",
          "teilt",
          "teilen",
          "teilt",
          "teilen"
        ],
        "participle": "geteilt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "paylaş",
      "progressiveStem": "paylaş"
    },
    {
      "id": "iw097",
      "tr": "adam",
      "de": "Mann",
      "deAnswers": [
        "Mann"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Mann",
        "plural": "Männer"
      },
      "semantic": "human"
    },
    {
      "id": "iw098",
      "tr": "erkek",
      "de": "Mann / männliche Person",
      "deAnswers": [
        "Mann",
        "männliche Person"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Mann",
        "plural": "Männer"
      },
      "semantic": "human",
      "soften": "erkeğ"
    },
    {
      "id": "iw099",
      "tr": "saç",
      "de": "Haar",
      "deAnswers": [
        "Haar"
      ],
      "type": "noun",
      "themes": [
        "T06",
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Haar",
        "plural": "Haare"
      },
      "semantic": "body"
    },
    {
      "id": "iw100",
      "tr": "yüz",
      "de": "Gesicht",
      "deAnswers": [
        "Gesicht"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Gesicht",
        "plural": "Gesichter"
      },
      "semantic": "body"
    },
    {
      "id": "iw101",
      "tr": "gülüş",
      "de": "Lächeln",
      "deAnswers": [
        "Lächeln"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Lächeln",
        "plural": "Lächeln"
      },
      "semantic": "thing"
    },
    {
      "id": "iw102",
      "tr": "karın",
      "de": "Bauch",
      "deAnswers": [
        "Bauch"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Bauch",
        "plural": "Bäuche"
      },
      "semantic": "body",
      "vowelLoss": "karn"
    },
    {
      "id": "iw103",
      "tr": "karın kası",
      "de": "Bauchmuskel",
      "deAnswers": [
        "Bauchmuskel"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Bauchmuskel",
        "plural": "Bauchmuskeln"
      },
      "semantic": "body",
      "compoundParts": [
        "karın",
        "kas"
      ]
    },
    {
      "id": "iw104",
      "tr": "kot pantolon",
      "de": "Jeans",
      "deAnswers": [
        "Jeans"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Jeans",
        "plural": "Jeans"
      },
      "semantic": "clothing"
    },
    {
      "id": "iw105",
      "tr": "atlet",
      "de": "Tanktop / Unterhemd",
      "deAnswers": [
        "Tanktop",
        "Unterhemd"
      ],
      "type": "noun",
      "themes": [
        "T06",
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Tanktop",
        "plural": "Tanktops"
      },
      "semantic": "clothing"
    },
    {
      "id": "iw106",
      "tr": "bakış",
      "de": "Blick",
      "deAnswers": [
        "Blick"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Blick",
        "plural": "Blicke"
      },
      "semantic": "thing"
    },
    {
      "id": "iw107",
      "tr": "Asya",
      "de": "Asien",
      "deAnswers": [
        "Asien"
      ],
      "type": "noun",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Asien",
        "plural": "Asien",
        "at": "in Asien",
        "to": "nach Asien",
        "from": "aus Asien"
      },
      "semantic": "place",
      "properName": true,
      "harmonyStem": "asya"
    },
    {
      "id": "iw108",
      "tr": "yakışıklı",
      "de": "gut aussehend",
      "deAnswers": [
        "gut aussehend"
      ],
      "type": "adj",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "gut aussehend"
      }
    },
    {
      "id": "iw109",
      "tr": "çekici",
      "de": "attraktiv",
      "deAnswers": [
        "attraktiv"
      ],
      "type": "adj",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "attraktiv"
      }
    },
    {
      "id": "iw110",
      "tr": "tatlı",
      "de": "süß",
      "deAnswers": [
        "süß"
      ],
      "type": "adj",
      "themes": [
        "T06",
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "süß"
      }
    },
    {
      "id": "iw111",
      "tr": "kıvırcık",
      "de": "lockig",
      "deAnswers": [
        "lockig"
      ],
      "type": "adj",
      "themes": [
        "T06",
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "lockig"
      }
    },
    {
      "id": "iw112",
      "tr": "bol",
      "de": "weit geschnitten",
      "deAnswers": [
        "weit geschnitten"
      ],
      "type": "adj",
      "themes": [
        "T06"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "weit geschnitten"
      }
    },
    {
      "id": "iw113",
      "tr": "bakmak",
      "de": "schauen",
      "deAnswers": [
        "schauen"
      ],
      "type": "verb",
      "themes": [
        "T06"
      ],
      "interest": true,
      "aorist": "bakar",
      "deGrammar": {
        "infinitive": "anschauen",
        "present": [
          "schaue an",
          "schaust an",
          "schaut an",
          "schauen an",
          "schaut an",
          "schauen an"
        ],
        "participle": "angeschaut",
        "auxiliary": "haben",
        "frame": "look-dative",
        "separable": "an"
      },
      "stem": "bak",
      "progressiveStem": "bak"
    },
    {
      "id": "iw114",
      "tr": "gülümsemek",
      "de": "lächeln",
      "deAnswers": [
        "lächeln"
      ],
      "type": "verb",
      "themes": [
        "T06"
      ],
      "interest": true,
      "aorist": "gülümser",
      "deGrammar": {
        "infinitive": "lächeln",
        "present": [
          "lächele",
          "lächelst",
          "lächelt",
          "lächeln",
          "lächelt",
          "lächeln"
        ],
        "participle": "gelächelt",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "gülümse",
      "progressiveStem": "gülüms"
    },
    {
      "id": "iw115",
      "tr": "köpek",
      "de": "Hund",
      "deAnswers": [
        "Hund"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Hund",
        "plural": "Hunde"
      },
      "semantic": "animal",
      "soften": "köpeğ"
    },
    {
      "id": "iw116",
      "tr": "pati",
      "de": "Pfote",
      "deAnswers": [
        "Pfote"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Pfote",
        "plural": "Pfoten"
      },
      "semantic": "body"
    },
    {
      "id": "iw117",
      "tr": "kuyruk",
      "de": "Schwanz eines Tieres",
      "deAnswers": [
        "Schwanz eines Tieres"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schwanz",
        "plural": "Schwänze"
      },
      "semantic": "body"
    },
    {
      "id": "iw118",
      "tr": "tasma",
      "de": "Leine / Halsband",
      "deAnswers": [
        "Leine",
        "Halsband"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Leine",
        "plural": "Leinen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw119",
      "tr": "mama",
      "de": "Tierfutter",
      "deAnswers": [
        "Tierfutter"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Tierfutter",
        "plural": "Tierfutter"
      },
      "semantic": "food"
    },
    {
      "id": "iw120",
      "tr": "kemik",
      "de": "Knochen",
      "deAnswers": [
        "Knochen"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Knochen",
        "plural": "Knochen"
      },
      "semantic": "thing",
      "soften": "kemiğ"
    },
    {
      "id": "iw121",
      "tr": "top",
      "de": "Ball",
      "deAnswers": [
        "Ball"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Ball",
        "plural": "Bälle"
      },
      "semantic": "thing"
    },
    {
      "id": "iw122",
      "tr": "kanape",
      "de": "Sofa",
      "deAnswers": [
        "Sofa"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Sofa",
        "plural": "Sofas"
      },
      "semantic": "thing"
    },
    {
      "id": "iw123",
      "tr": "oyuncak",
      "de": "Spielzeug",
      "deAnswers": [
        "Spielzeug"
      ],
      "type": "noun",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Spielzeug",
        "plural": "Spielzeuge"
      },
      "semantic": "thing",
      "soften": "oyuncağ"
    },
    {
      "id": "iw124",
      "tr": "havlamak",
      "de": "bellen",
      "deAnswers": [
        "bellen"
      ],
      "type": "verb",
      "themes": [
        "T07"
      ],
      "interest": true,
      "aorist": "havlar",
      "deGrammar": {
        "infinitive": "bellen",
        "present": [
          "belle",
          "bellst",
          "bellt",
          "bellen",
          "bellt",
          "bellen"
        ],
        "participle": "gebellt",
        "auxiliary": "haben",
        "frame": "animal-simple"
      },
      "stem": "havla",
      "progressiveStem": "havl"
    },
    {
      "id": "iw125",
      "tr": "uyumak",
      "de": "schlafen",
      "deAnswers": [
        "schlafen"
      ],
      "type": "verb",
      "themes": [
        "T07"
      ],
      "interest": true,
      "aorist": "uyur",
      "deGrammar": {
        "infinitive": "schlafen",
        "present": [
          "schlafe",
          "schläfst",
          "schläft",
          "schlafen",
          "schlaft",
          "schlafen"
        ],
        "participle": "geschlafen",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "uyu",
      "progressiveStem": "uyu"
    },
    {
      "id": "iw126",
      "tr": "beslemek",
      "de": "füttern",
      "deAnswers": [
        "füttern"
      ],
      "type": "verb",
      "themes": [
        "T07"
      ],
      "interest": true,
      "aorist": "besler",
      "deGrammar": {
        "infinitive": "füttern",
        "present": [
          "füttere",
          "fütterst",
          "füttert",
          "füttern",
          "füttert",
          "füttern"
        ],
        "participle": "gefüttert",
        "auxiliary": "haben",
        "frame": "animal-object"
      },
      "stem": "besle",
      "progressiveStem": "besl"
    },
    {
      "id": "iw127",
      "tr": "gezmek",
      "de": "herumgehen / spazieren / besichtigen",
      "deAnswers": [
        "herumgehen",
        "spazieren",
        "besichtigen"
      ],
      "type": "verb",
      "themes": [
        "T07",
        "T15"
      ],
      "interest": true,
      "aorist": "gezer",
      "deGrammar": {
        "infinitive": "spazieren gehen",
        "present": [
          "gehe spazieren",
          "gehst spazieren",
          "geht spazieren",
          "gehen spazieren",
          "geht spazieren",
          "gehen spazieren"
        ],
        "participle": "spazieren gegangen",
        "auxiliary": "sein",
        "frame": "motion",
        "fixed": "spazieren"
      },
      "stem": "gez",
      "progressiveStem": "gez"
    },
    {
      "id": "iw128",
      "tr": "sevimli",
      "de": "niedlich",
      "deAnswers": [
        "niedlich"
      ],
      "type": "adj",
      "themes": [
        "T07",
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "niedlich"
      }
    },
    {
      "id": "iw129",
      "tr": "uslu",
      "de": "brav",
      "deAnswers": [
        "brav"
      ],
      "type": "adj",
      "themes": [
        "T07"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "brav"
      }
    },
    {
      "id": "iw130",
      "tr": "video",
      "de": "Video",
      "deAnswers": [
        "Video"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Video",
        "plural": "Videos"
      },
      "semantic": "media"
    },
    {
      "id": "iw131",
      "tr": "dizi",
      "de": "Serie",
      "deAnswers": [
        "Serie"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Serie",
        "plural": "Serien"
      },
      "semantic": "media"
    },
    {
      "id": "iw132",
      "tr": "film",
      "de": "Film",
      "deAnswers": [
        "Film"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Film",
        "plural": "Filme"
      },
      "semantic": "media"
    },
    {
      "id": "iw133",
      "tr": "bölüm",
      "de": "Folge",
      "deAnswers": [
        "Folge"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Folge",
        "plural": "Folgen"
      },
      "semantic": "media"
    },
    {
      "id": "iw134",
      "tr": "ekran",
      "de": "Bildschirm",
      "deAnswers": [
        "Bildschirm"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Bildschirm",
        "plural": "Bildschirme"
      },
      "semantic": "thing"
    },
    {
      "id": "iw135",
      "tr": "yorum",
      "de": "Kommentar",
      "deAnswers": [
        "Kommentar"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Kommentar",
        "plural": "Kommentare"
      },
      "semantic": "thing"
    },
    {
      "id": "iw136",
      "tr": "beğeni",
      "de": "Like",
      "deAnswers": [
        "Like"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Like",
        "plural": "Likes"
      },
      "semantic": "thing"
    },
    {
      "id": "iw137",
      "tr": "bildirim",
      "de": "Benachrichtigung",
      "deAnswers": [
        "Benachrichtigung"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Benachrichtigung",
        "plural": "Benachrichtigungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw138",
      "tr": "altyazı",
      "de": "Untertitel",
      "deAnswers": [
        "Untertitel"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Untertitel",
        "plural": "Untertitel"
      },
      "semantic": "thing"
    },
    {
      "id": "iw139",
      "tr": "abonelik",
      "de": "Abonnement",
      "deAnswers": [
        "Abonnement"
      ],
      "type": "noun",
      "themes": [
        "T08"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Abonnement",
        "plural": "Abonnements"
      },
      "semantic": "thing"
    },
    {
      "id": "iw140",
      "tr": "izlemek",
      "de": "anschauen",
      "deAnswers": [
        "anschauen"
      ],
      "type": "verb",
      "themes": [
        "T08",
        "T22"
      ],
      "interest": true,
      "aorist": "izler",
      "deGrammar": {
        "infinitive": "anschauen",
        "present": [
          "schaue an",
          "schaust an",
          "schaut an",
          "schauen an",
          "schaut an",
          "schauen an"
        ],
        "participle": "angeschaut",
        "auxiliary": "haben",
        "frame": "media-object",
        "separable": "an"
      },
      "stem": "izle",
      "progressiveStem": "izl"
    },
    {
      "id": "iw141",
      "tr": "seçmek",
      "de": "auswählen",
      "deAnswers": [
        "auswählen"
      ],
      "type": "verb",
      "themes": [
        "T08"
      ],
      "interest": true,
      "aorist": "seçer",
      "deGrammar": {
        "infinitive": "auswählen",
        "present": [
          "wähle aus",
          "wählst aus",
          "wählt aus",
          "wählen aus",
          "wählt aus",
          "wählen aus"
        ],
        "participle": "ausgewählt",
        "auxiliary": "haben",
        "frame": "object",
        "separable": "aus"
      },
      "stem": "seç",
      "progressiveStem": "seç"
    },
    {
      "id": "iw142",
      "tr": "duraklatmak",
      "de": "pausieren",
      "deAnswers": [
        "pausieren"
      ],
      "type": "verb",
      "themes": [
        "T08"
      ],
      "interest": true,
      "aorist": "duraklatır",
      "deGrammar": {
        "infinitive": "pausieren",
        "present": [
          "pausiere",
          "pausierst",
          "pausiert",
          "pausieren",
          "pausiert",
          "pausieren"
        ],
        "participle": "pausiert",
        "auxiliary": "haben",
        "frame": "media-object"
      },
      "stem": "duraklat",
      "progressiveStem": "duraklat"
    },
    {
      "id": "iw143",
      "tr": "kaydırmak",
      "de": "scrollen",
      "deAnswers": [
        "scrollen"
      ],
      "type": "verb",
      "themes": [
        "T08"
      ],
      "interest": true,
      "aorist": "kaydırır",
      "deGrammar": {
        "infinitive": "scrollen",
        "present": [
          "scrolle",
          "scrollst",
          "scrollt",
          "scrollen",
          "scrollt",
          "scrollen"
        ],
        "participle": "gescrollt",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "kaydır",
      "progressiveStem": "kaydır"
    },
    {
      "id": "iw144",
      "tr": "yüklemek",
      "de": "hochladen / laden",
      "deAnswers": [
        "hochladen",
        "laden"
      ],
      "type": "verb",
      "themes": [
        "T08"
      ],
      "interest": true,
      "aorist": "yükler",
      "deGrammar": {
        "infinitive": "laden",
        "present": [
          "lade",
          "lädst",
          "lädt",
          "laden",
          "ladet",
          "laden"
        ],
        "participle": "geladen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "yükle",
      "progressiveStem": "yükl"
    },
    {
      "id": "iw145",
      "tr": "karakter",
      "de": "Figur",
      "deAnswers": [
        "Figur"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Figur",
        "plural": "Figuren"
      },
      "semantic": "thing"
    },
    {
      "id": "iw146",
      "tr": "uzaylı",
      "de": "Außerirdischer",
      "deAnswers": [
        "Außerirdischer"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Außerirdische",
        "plural": "Außerirdischen",
        "weak": true,
        "oblique": "Außerirdischen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw147",
      "tr": "sünger",
      "de": "Schwamm",
      "deAnswers": [
        "Schwamm"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schwamm",
        "plural": "Schwämme"
      },
      "semantic": "thing"
    },
    {
      "id": "iw148",
      "tr": "deniz",
      "de": "Meer",
      "deAnswers": [
        "Meer"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Meer",
        "plural": "Meere"
      },
      "semantic": "thing"
    },
    {
      "id": "iw149",
      "tr": "su",
      "de": "Wasser",
      "deAnswers": [
        "Wasser"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Wasser",
        "plural": "Wasser"
      },
      "semantic": "drink"
    },
    {
      "id": "iw150",
      "tr": "ateş",
      "de": "Feuer",
      "deAnswers": [
        "Feuer"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Feuer",
        "plural": "Feuer"
      },
      "semantic": "thing"
    },
    {
      "id": "iw151",
      "tr": "toprak",
      "de": "Erde",
      "deAnswers": [
        "Erde"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Erde",
        "plural": "Erden"
      },
      "semantic": "thing",
      "soften": "toprağ"
    },
    {
      "id": "iw152",
      "tr": "hava",
      "de": "Luft / Wetter",
      "deAnswers": [
        "Luft",
        "Wetter"
      ],
      "type": "noun",
      "themes": [
        "T09",
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Luft",
        "plural": "Lüfte"
      },
      "semantic": "thing"
    },
    {
      "id": "iw153",
      "tr": "buluş",
      "de": "Erfindung",
      "deAnswers": [
        "Erfindung"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Erfindung",
        "plural": "Erfindungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw154",
      "tr": "makine",
      "de": "Maschine",
      "deAnswers": [
        "Maschine"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Maschine",
        "plural": "Maschinen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw155",
      "tr": "robot",
      "de": "Roboter",
      "deAnswers": [
        "Roboter"
      ],
      "type": "noun",
      "themes": [
        "T09",
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Roboter",
        "plural": "Roboter"
      },
      "semantic": "device"
    },
    {
      "id": "iw156",
      "tr": "mizah",
      "de": "Humor",
      "deAnswers": [
        "Humor"
      ],
      "type": "noun",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Humor",
        "plural": "Humor"
      },
      "semantic": "thing"
    },
    {
      "id": "iw157",
      "tr": "korkmak",
      "de": "Angst haben",
      "deAnswers": [
        "Angst haben"
      ],
      "type": "verb",
      "themes": [
        "T09"
      ],
      "interest": true,
      "aorist": "korkar",
      "deGrammar": {
        "infinitive": "Angst haben",
        "present": [
          "habe Angst",
          "hast Angst",
          "hat Angst",
          "haben Angst",
          "habt Angst",
          "haben Angst"
        ],
        "participle": "Angst gehabt",
        "auxiliary": "haben",
        "frame": "simple",
        "fixed": "Angst"
      },
      "stem": "kork",
      "progressiveStem": "kork"
    },
    {
      "id": "iw158",
      "tr": "şaşırmak",
      "de": "sich wundern",
      "deAnswers": [
        "sich wundern"
      ],
      "type": "verb",
      "themes": [
        "T09"
      ],
      "interest": true,
      "aorist": "şaşırır",
      "deGrammar": {
        "infinitive": "sich wundern",
        "present": [
          "wundere mich",
          "wunderst dich",
          "wundert sich",
          "wundern uns",
          "wundert euch",
          "wundern sich"
        ],
        "participle": "gewundert",
        "auxiliary": "haben",
        "frame": "simple",
        "reflexive": true
      },
      "stem": "şaşır",
      "progressiveStem": "şaşır"
    },
    {
      "id": "iw159",
      "tr": "kurtarmak",
      "de": "retten",
      "deAnswers": [
        "retten"
      ],
      "type": "verb",
      "themes": [
        "T09"
      ],
      "interest": true,
      "aorist": "kurtarır",
      "deGrammar": {
        "infinitive": "retten",
        "present": [
          "rette",
          "rettest",
          "rettet",
          "retten",
          "rettet",
          "retten"
        ],
        "participle": "gerettet",
        "auxiliary": "haben",
        "frame": "person-object"
      },
      "stem": "kurtar",
      "progressiveStem": "kurtar"
    },
    {
      "id": "iw160",
      "tr": "komik",
      "de": "lustig",
      "deAnswers": [
        "lustig"
      ],
      "type": "adj",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "lustig"
      }
    },
    {
      "id": "iw161",
      "tr": "garip",
      "de": "seltsam",
      "deAnswers": [
        "seltsam"
      ],
      "type": "adj",
      "themes": [
        "T09"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "seltsam"
      }
    },
    {
      "id": "iw162",
      "tr": "konsol",
      "de": "Konsole",
      "deAnswers": [
        "Konsole"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Konsole",
        "plural": "Konsolen"
      },
      "semantic": "device"
    },
    {
      "id": "iw163",
      "tr": "telefon",
      "de": "Handy",
      "deAnswers": [
        "Handy"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Handy",
        "plural": "Handys"
      },
      "semantic": "device"
    },
    {
      "id": "iw164",
      "tr": "kulaklık",
      "de": "Kopfhörer",
      "deAnswers": [
        "Kopfhörer"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Kopfhörer",
        "plural": "Kopfhörer"
      },
      "semantic": "device"
    },
    {
      "id": "iw165",
      "tr": "kumanda",
      "de": "Controller",
      "deAnswers": [
        "Controller"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Controller",
        "plural": "Controller"
      },
      "semantic": "device"
    },
    {
      "id": "iw166",
      "tr": "pil",
      "de": "Akku / Batterie",
      "deAnswers": [
        "Akku",
        "Batterie"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Akku",
        "plural": "Akkus"
      },
      "semantic": "device"
    },
    {
      "id": "iw167",
      "tr": "kablo",
      "de": "Kabel",
      "deAnswers": [
        "Kabel"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Kabel",
        "plural": "Kabel"
      },
      "semantic": "device"
    },
    {
      "id": "iw168",
      "tr": "şarj",
      "de": "Ladung",
      "deAnswers": [
        "Ladung"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Ladung",
        "plural": "Ladungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw169",
      "tr": "bağlantı",
      "de": "Verbindung",
      "deAnswers": [
        "Verbindung"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Verbindung",
        "plural": "Verbindungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw170",
      "tr": "sanal gerçeklik",
      "de": "Virtual Reality",
      "deAnswers": [
        "Virtual Reality"
      ],
      "type": "noun",
      "themes": [
        "T10"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "virtuelle Realität",
        "plural": "virtuelle Realitäten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw171",
      "tr": "açmak",
      "de": "öffnen / einschalten",
      "deAnswers": [
        "öffnen",
        "einschalten"
      ],
      "type": "verb",
      "themes": [
        "T10",
        "T21"
      ],
      "interest": true,
      "aorist": "açar",
      "deGrammar": {
        "infinitive": "öffnen",
        "present": [
          "öffne",
          "öffnst",
          "öffnt",
          "öffnen",
          "öffnt",
          "öffnen"
        ],
        "participle": "geöffnet",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "aç",
      "progressiveStem": "aç"
    },
    {
      "id": "iw172",
      "tr": "kapatmak",
      "de": "schließen / ausschalten",
      "deAnswers": [
        "schließen",
        "ausschalten"
      ],
      "type": "verb",
      "themes": [
        "T10"
      ],
      "interest": true,
      "aorist": "kapatır",
      "deGrammar": {
        "infinitive": "schließen",
        "present": [
          "schließe",
          "schließt",
          "schließt",
          "schließen",
          "schließt",
          "schließen"
        ],
        "participle": "geschlossen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "kapat",
      "progressiveStem": "kapat"
    },
    {
      "id": "iw173",
      "tr": "şarj etmek",
      "de": "aufladen",
      "deAnswers": [
        "aufladen"
      ],
      "type": "verb",
      "themes": [
        "T10"
      ],
      "interest": true,
      "aorist": "şarj eder",
      "deGrammar": {
        "infinitive": "aufladen",
        "present": [
          "lade auf",
          "lädst auf",
          "lädt auf",
          "laden auf",
          "ladet auf",
          "laden auf"
        ],
        "participle": "aufgeladen",
        "auxiliary": "haben",
        "frame": "device-object",
        "separable": "auf"
      },
      "stem": "şarj et",
      "progressiveStem": "şarj ed",
      "vowelStem": "şarj ed"
    },
    {
      "id": "iw174",
      "tr": "bağlamak",
      "de": "verbinden",
      "deAnswers": [
        "verbinden"
      ],
      "type": "verb",
      "themes": [
        "T10"
      ],
      "interest": true,
      "aorist": "bağlar",
      "deGrammar": {
        "infinitive": "verbinden",
        "present": [
          "verbinde",
          "verbindest",
          "verbindet",
          "verbinden",
          "verbindet",
          "verbinden"
        ],
        "participle": "verbunden",
        "auxiliary": "haben",
        "frame": "device-object"
      },
      "stem": "bağla",
      "progressiveStem": "bağl"
    },
    {
      "id": "iw175",
      "tr": "güncellemek",
      "de": "aktualisieren",
      "deAnswers": [
        "aktualisieren"
      ],
      "type": "verb",
      "themes": [
        "T10"
      ],
      "interest": true,
      "aorist": "günceller",
      "deGrammar": {
        "infinitive": "aktualisieren",
        "present": [
          "aktualisiere",
          "aktualisierst",
          "aktualisiert",
          "aktualisieren",
          "aktualisiert",
          "aktualisieren"
        ],
        "participle": "aktualisiert",
        "auxiliary": "haben",
        "frame": "device-object"
      },
      "stem": "güncelle",
      "progressiveStem": "güncell"
    },
    {
      "id": "iw176",
      "tr": "takım",
      "de": "Team",
      "deAnswers": [
        "Team"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Team",
        "plural": "Teams"
      },
      "semantic": "thing"
    },
    {
      "id": "iw177",
      "tr": "eş",
      "de": "Spielpartner",
      "deAnswers": [
        "Spielpartner"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Spielpartner",
        "plural": "Spielpartner"
      },
      "semantic": "human"
    },
    {
      "id": "iw178",
      "tr": "görev",
      "de": "Aufgabe / Mission",
      "deAnswers": [
        "Aufgabe",
        "Mission"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Mission",
        "plural": "Missionen"
      },
      "semantic": "problem"
    },
    {
      "id": "iw179",
      "tr": "engel",
      "de": "Hindernis",
      "deAnswers": [
        "Hindernis"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Hindernis",
        "plural": "Hindernisse"
      },
      "semantic": "problem"
    },
    {
      "id": "iw180",
      "tr": "zafer",
      "de": "Sieg",
      "deAnswers": [
        "Sieg"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Sieg",
        "plural": "Siege"
      },
      "semantic": "thing"
    },
    {
      "id": "iw181",
      "tr": "yenilgi",
      "de": "Niederlage",
      "deAnswers": [
        "Niederlage"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Niederlage",
        "plural": "Niederlagen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw182",
      "tr": "yumurta",
      "de": "Ei",
      "deAnswers": [
        "Ei"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Ei",
        "plural": "Eier"
      },
      "semantic": "food"
    },
    {
      "id": "iw183",
      "tr": "silah",
      "de": "Waffe",
      "deAnswers": [
        "Waffe"
      ],
      "type": "noun",
      "themes": [
        "T11"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Waffe",
        "plural": "Waffen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw184",
      "tr": "yardım etmek",
      "de": "helfen",
      "deAnswers": [
        "helfen"
      ],
      "type": "verb",
      "themes": [
        "T11"
      ],
      "interest": true,
      "aorist": "yardım eder",
      "deGrammar": {
        "infinitive": "helfen",
        "present": [
          "helfe",
          "hilfst",
          "hilft",
          "helfen",
          "helft",
          "helfen"
        ],
        "participle": "geholfen",
        "auxiliary": "haben",
        "frame": "help-dative"
      },
      "stem": "yardım et",
      "progressiveStem": "yardım ed",
      "vowelStem": "yardım ed"
    },
    {
      "id": "iw185",
      "tr": "birlikte oynamak",
      "de": "zusammen spielen",
      "deAnswers": [
        "zusammen spielen"
      ],
      "type": "verb",
      "themes": [
        "T11"
      ],
      "interest": true,
      "aorist": "birlikte oynar",
      "deGrammar": {
        "infinitive": "zusammen spielen",
        "present": [
          "spiele zusammen",
          "spielst zusammen",
          "spielt zusammen",
          "spielen zusammen",
          "spielt zusammen",
          "spielen zusammen"
        ],
        "participle": "zusammen gespielt",
        "auxiliary": "haben",
        "frame": "game-object",
        "fixed": "zusammen"
      },
      "stem": "birlikte oyna",
      "progressiveStem": "birlikte oyn"
    },
    {
      "id": "iw186",
      "tr": "çözmek",
      "de": "lösen",
      "deAnswers": [
        "lösen"
      ],
      "type": "verb",
      "themes": [
        "T11"
      ],
      "interest": true,
      "aorist": "çözer",
      "deGrammar": {
        "infinitive": "lösen",
        "present": [
          "löse",
          "löst",
          "löst",
          "lösen",
          "löst",
          "lösen"
        ],
        "participle": "gelöst",
        "auxiliary": "haben",
        "frame": "problem-object"
      },
      "stem": "çöz",
      "progressiveStem": "çöz",
      "voice": {
        "passive": "çözül"
      }
    },
    {
      "id": "iw187",
      "tr": "başarmak",
      "de": "schaffen",
      "deAnswers": [
        "schaffen"
      ],
      "type": "verb",
      "themes": [
        "T11"
      ],
      "interest": true,
      "aorist": "başarır",
      "deGrammar": {
        "infinitive": "schaffen",
        "present": [
          "schaffe",
          "schaffst",
          "schafft",
          "schaffen",
          "schafft",
          "schaffen"
        ],
        "participle": "geschafft",
        "auxiliary": "haben",
        "frame": "problem-object"
      },
      "stem": "başar",
      "progressiveStem": "başar"
    },
    {
      "id": "iw188",
      "tr": "yeniden denemek",
      "de": "erneut versuchen",
      "deAnswers": [
        "erneut versuchen"
      ],
      "type": "verb",
      "themes": [
        "T11"
      ],
      "interest": true,
      "aorist": "yeniden dener",
      "deGrammar": {
        "infinitive": "erneut versuchen",
        "present": [
          "versuche erneut",
          "versuchst erneut",
          "versucht erneut",
          "versuchen erneut",
          "versucht erneut",
          "versuchen erneut"
        ],
        "participle": "erneut versucht",
        "auxiliary": "haben",
        "frame": "object",
        "fixed": "erneut"
      },
      "stem": "yeniden dene",
      "progressiveStem": "yeniden den"
    },
    {
      "id": "iw189",
      "tr": "birlikte",
      "de": "zusammen",
      "deAnswers": [
        "zusammen"
      ],
      "type": "adverb",
      "themes": [
        "T11",
        "T20"
      ],
      "interest": true
    },
    {
      "id": "iw190",
      "tr": "market",
      "de": "Supermarkt",
      "deAnswers": [
        "Supermarkt"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Supermarkt",
        "plural": "Supermärkte",
        "at": "in dem Supermarkt",
        "to": "zu dem Supermarkt",
        "from": "aus dem Supermarkt"
      },
      "semantic": "place"
    },
    {
      "id": "iw191",
      "tr": "alışveriş",
      "de": "Einkauf",
      "deAnswers": [
        "Einkauf"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Einkauf",
        "plural": "Einkäufe"
      },
      "semantic": "thing"
    },
    {
      "id": "iw192",
      "tr": "sepet",
      "de": "Einkaufskorb",
      "deAnswers": [
        "Einkaufskorb"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Einkaufskorb",
        "plural": "Einkaufskörbe"
      },
      "semantic": "thing"
    },
    {
      "id": "iw193",
      "tr": "poşet",
      "de": "Einkaufstüte",
      "deAnswers": [
        "Einkaufstüte"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Einkaufstüte",
        "plural": "Einkaufstüten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw194",
      "tr": "liste",
      "de": "Liste",
      "deAnswers": [
        "Liste"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Liste",
        "plural": "Listen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw195",
      "tr": "raf",
      "de": "Regal",
      "deAnswers": [
        "Regal"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Regal",
        "plural": "Regale"
      },
      "semantic": "thing"
    },
    {
      "id": "iw196",
      "tr": "kasa",
      "de": "Kasse",
      "deAnswers": [
        "Kasse"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Kasse",
        "plural": "Kassen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw197",
      "tr": "fiyat",
      "de": "Preis",
      "deAnswers": [
        "Preis"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Preis",
        "plural": "Preise"
      },
      "semantic": "thing"
    },
    {
      "id": "iw198",
      "tr": "indirim",
      "de": "Rabatt",
      "deAnswers": [
        "Rabatt"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Rabatt",
        "plural": "Rabatte"
      },
      "semantic": "thing"
    },
    {
      "id": "iw199",
      "tr": "fiş",
      "de": "Kassenbon",
      "deAnswers": [
        "Kassenbon"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Kassenbon",
        "plural": "Kassenbons"
      },
      "semantic": "thing"
    },
    {
      "id": "iw200",
      "tr": "ürün",
      "de": "Produkt",
      "deAnswers": [
        "Produkt"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Produkt",
        "plural": "Produkte"
      },
      "semantic": "thing"
    },
    {
      "id": "iw201",
      "tr": "sıra",
      "de": "Warteschlange",
      "deAnswers": [
        "Warteschlange"
      ],
      "type": "noun",
      "themes": [
        "T12"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Warteschlange",
        "plural": "Warteschlangen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw202",
      "tr": "almak",
      "de": "kaufen / nehmen",
      "deAnswers": [
        "kaufen",
        "nehmen"
      ],
      "type": "verb",
      "themes": [
        "T12"
      ],
      "interest": true,
      "aorist": "alır",
      "deGrammar": {
        "infinitive": "kaufen",
        "present": [
          "kaufe",
          "kaufst",
          "kauft",
          "kaufen",
          "kauft",
          "kaufen"
        ],
        "participle": "gekauft",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "al",
      "progressiveStem": "al"
    },
    {
      "id": "iw203",
      "tr": "ödemek",
      "de": "bezahlen",
      "deAnswers": [
        "bezahlen"
      ],
      "type": "verb",
      "themes": [
        "T12"
      ],
      "interest": true,
      "aorist": "öder",
      "deGrammar": {
        "infinitive": "bezahlen",
        "present": [
          "bezahle",
          "bezahlst",
          "bezahlt",
          "bezahlen",
          "bezahlt",
          "bezahlen"
        ],
        "participle": "bezahlt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "öde",
      "progressiveStem": "öd"
    },
    {
      "id": "iw204",
      "tr": "aramak",
      "de": "suchen",
      "deAnswers": [
        "suchen"
      ],
      "type": "verb",
      "themes": [
        "T12"
      ],
      "interest": true,
      "aorist": "arar",
      "deGrammar": {
        "infinitive": "suchen",
        "present": [
          "suche",
          "suchst",
          "sucht",
          "suchen",
          "sucht",
          "suchen"
        ],
        "participle": "gesucht",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "ara",
      "progressiveStem": "ar"
    },
    {
      "id": "iw205",
      "tr": "unutmak",
      "de": "vergessen",
      "deAnswers": [
        "vergessen"
      ],
      "type": "verb",
      "themes": [
        "T12"
      ],
      "interest": true,
      "aorist": "unutur",
      "deGrammar": {
        "infinitive": "vergessen",
        "present": [
          "vergesse",
          "vergisst",
          "vergisst",
          "vergessen",
          "vergesst",
          "vergessen"
        ],
        "participle": "vergessen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "unut",
      "progressiveStem": "unut"
    },
    {
      "id": "iw206",
      "tr": "çikolata",
      "de": "Schokolade",
      "deAnswers": [
        "Schokolade"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Schokolade",
        "plural": "Schokoladen"
      },
      "semantic": "food"
    },
    {
      "id": "iw207",
      "tr": "kase",
      "de": "Schüssel",
      "deAnswers": [
        "Schüssel"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Schüssel",
        "plural": "Schüsseln"
      },
      "semantic": "thing"
    },
    {
      "id": "iw208",
      "tr": "pirinç",
      "de": "Reis",
      "deAnswers": [
        "Reis"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Reis",
        "plural": "Reis"
      },
      "semantic": "food"
    },
    {
      "id": "iw209",
      "tr": "somon",
      "de": "Lachs",
      "deAnswers": [
        "Lachs"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Lachs",
        "plural": "Lachse"
      },
      "semantic": "food"
    },
    {
      "id": "iw210",
      "tr": "suşi",
      "de": "Sushi",
      "deAnswers": [
        "Sushi"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Sushi",
        "plural": "Sushi"
      },
      "semantic": "food"
    },
    {
      "id": "iw211",
      "tr": "muz",
      "de": "Banane",
      "deAnswers": [
        "Banane"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Banane",
        "plural": "Bananen"
      },
      "semantic": "food"
    },
    {
      "id": "iw212",
      "tr": "ekmek",
      "de": "Brot",
      "deAnswers": [
        "Brot"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Brot",
        "plural": "Brote"
      },
      "semantic": "food",
      "soften": "ekmeğ"
    },
    {
      "id": "iw213",
      "tr": "kek",
      "de": "Kuchen",
      "deAnswers": [
        "Kuchen"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Kuchen",
        "plural": "Kuchen"
      },
      "semantic": "food"
    },
    {
      "id": "iw214",
      "tr": "peynir",
      "de": "Käse",
      "deAnswers": [
        "Käse"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Käse",
        "plural": "Käse"
      },
      "semantic": "food"
    },
    {
      "id": "iw215",
      "tr": "vişne",
      "de": "Sauerkirsche",
      "deAnswers": [
        "Sauerkirsche"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Sauerkirsche",
        "plural": "Sauerkirschen"
      },
      "semantic": "food"
    },
    {
      "id": "iw216",
      "tr": "tatlandırıcı",
      "de": "Süßstoff",
      "deAnswers": [
        "Süßstoff"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Süßstoff",
        "plural": "Süßstoffe"
      },
      "semantic": "food"
    },
    {
      "id": "iw217",
      "tr": "şarap",
      "de": "Wein",
      "deAnswers": [
        "Wein"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Wein",
        "plural": "Weine"
      },
      "semantic": "drink"
    },
    {
      "id": "iw218",
      "tr": "üzüm",
      "de": "Traube",
      "deAnswers": [
        "Traube"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Traube",
        "plural": "Trauben"
      },
      "semantic": "food"
    },
    {
      "id": "iw219",
      "tr": "meyve suyu",
      "de": "Fruchtsaft",
      "deAnswers": [
        "Fruchtsaft"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Fruchtsaft",
        "plural": "Fruchtsäfte"
      },
      "semantic": "drink",
      "compoundParts": [
        "meyve",
        "su"
      ]
    },
    {
      "id": "iw220",
      "tr": "vanilya",
      "de": "Vanille",
      "deAnswers": [
        "Vanille"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Vanille",
        "plural": "Vanille"
      },
      "semantic": "food"
    },
    {
      "id": "iw221",
      "tr": "çilek",
      "de": "Erdbeere",
      "deAnswers": [
        "Erdbeere"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Erdbeere",
        "plural": "Erdbeeren"
      },
      "semantic": "food"
    },
    {
      "id": "iw222",
      "tr": "çeşit",
      "de": "Sorte",
      "deAnswers": [
        "Sorte"
      ],
      "type": "noun",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Sorte",
        "plural": "Sorten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw223",
      "tr": "yemek",
      "de": "essen",
      "deAnswers": [
        "essen"
      ],
      "type": "verb",
      "themes": [
        "T13"
      ],
      "interest": true,
      "aorist": "yer",
      "deGrammar": {
        "infinitive": "essen",
        "present": [
          "esse",
          "isst",
          "isst",
          "essen",
          "esst",
          "essen"
        ],
        "participle": "gegessen",
        "auxiliary": "haben",
        "frame": "food-object"
      },
      "stem": "ye",
      "progressiveStem": "yi",
      "vowelStem": "yi",
      "voice": {
        "passive": "yen"
      }
    },
    {
      "id": "iw224",
      "tr": "içmek",
      "de": "trinken",
      "deAnswers": [
        "trinken"
      ],
      "type": "verb",
      "themes": [
        "T13"
      ],
      "interest": true,
      "aorist": "içer",
      "deGrammar": {
        "infinitive": "trinken",
        "present": [
          "trinke",
          "trinkst",
          "trinkt",
          "trinken",
          "trinkt",
          "trinken"
        ],
        "participle": "getrunken",
        "auxiliary": "haben",
        "frame": "drink-object"
      },
      "stem": "iç",
      "progressiveStem": "iç",
      "voice": {
        "passive": "içil"
      }
    },
    {
      "id": "iw225",
      "tr": "tatmak",
      "de": "probieren",
      "deAnswers": [
        "probieren"
      ],
      "type": "verb",
      "themes": [
        "T13"
      ],
      "interest": true,
      "aorist": "tadar",
      "deGrammar": {
        "infinitive": "probieren",
        "present": [
          "probiere",
          "probierst",
          "probiert",
          "probieren",
          "probiert",
          "probieren"
        ],
        "participle": "probiert",
        "auxiliary": "haben",
        "frame": "food-object"
      },
      "stem": "tat",
      "progressiveStem": "tat",
      "vowelStem": "tad"
    },
    {
      "id": "iw226",
      "tr": "lezzetli",
      "de": "lecker",
      "deAnswers": [
        "lecker"
      ],
      "type": "adj",
      "themes": [
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "lecker"
      }
    },
    {
      "id": "iw227",
      "tr": "matcha",
      "de": "Matcha",
      "deAnswers": [
        "Matcha"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Matcha",
        "plural": "Matcha"
      },
      "semantic": "drink"
    },
    {
      "id": "iw228",
      "tr": "Hindistan cevizi",
      "de": "Kokosnuss",
      "deAnswers": [
        "Kokosnuss"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Kokosnuss",
        "plural": "Kokosnüsse"
      },
      "semantic": "thing",
      "compoundParts": [
        "Hindistan",
        "ceviz"
      ]
    },
    {
      "id": "iw229",
      "tr": "çay",
      "de": "Tee",
      "deAnswers": [
        "Tee"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Tee",
        "plural": "Tees"
      },
      "semantic": "drink"
    },
    {
      "id": "iw230",
      "tr": "süt",
      "de": "Milch",
      "deAnswers": [
        "Milch"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Milch",
        "plural": "Milch"
      },
      "semantic": "drink"
    },
    {
      "id": "iw231",
      "tr": "tat",
      "de": "Geschmack",
      "deAnswers": [
        "Geschmack"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Geschmack",
        "plural": "Geschmäcker"
      },
      "semantic": "thing"
    },
    {
      "id": "iw232",
      "tr": "koku",
      "de": "Geruch",
      "deAnswers": [
        "Geruch"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Geruch",
        "plural": "Gerüche"
      },
      "semantic": "thing"
    },
    {
      "id": "iw233",
      "tr": "fincan",
      "de": "Tasse",
      "deAnswers": [
        "Tasse"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Tasse",
        "plural": "Tassen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw234",
      "tr": "malzeme",
      "de": "Zutat",
      "deAnswers": [
        "Zutat"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Zutat",
        "plural": "Zutaten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw235",
      "tr": "tercih",
      "de": "Vorliebe",
      "deAnswers": [
        "Vorliebe"
      ],
      "type": "noun",
      "themes": [
        "T14"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Vorliebe",
        "plural": "Vorlieben"
      },
      "semantic": "thing"
    },
    {
      "id": "iw236",
      "tr": "sevmek",
      "de": "mögen / lieben",
      "deAnswers": [
        "mögen",
        "lieben"
      ],
      "type": "verb",
      "themes": [
        "T14"
      ],
      "interest": true,
      "aorist": "sever",
      "deGrammar": {
        "infinitive": "mögen",
        "present": [
          "mag",
          "magst",
          "mag",
          "mögen",
          "mögt",
          "mögen"
        ],
        "participle": "gemocht",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "sev",
      "progressiveStem": "sev"
    },
    {
      "id": "iw237",
      "tr": "istemek",
      "de": "wollen / möchten",
      "deAnswers": [
        "wollen",
        "möchten"
      ],
      "type": "verb",
      "themes": [
        "T14"
      ],
      "interest": true,
      "aorist": "ister",
      "deGrammar": {
        "infinitive": "möchten",
        "present": [
          "möchte",
          "möchtest",
          "möchte",
          "möchten",
          "möchtet",
          "möchten"
        ],
        "participle": "gewollt",
        "auxiliary": "haben",
        "frame": "complement"
      },
      "stem": "iste",
      "progressiveStem": "ist"
    },
    {
      "id": "iw238",
      "tr": "beğenmek",
      "de": "gut finden",
      "deAnswers": [
        "gut finden"
      ],
      "type": "verb",
      "themes": [
        "T14",
        "T18"
      ],
      "interest": true,
      "aorist": "beğenir",
      "deGrammar": {
        "infinitive": "gut finden",
        "present": [
          "finde gut",
          "findest gut",
          "findet gut",
          "finden gut",
          "findet gut",
          "finden gut"
        ],
        "participle": "gut gefunden",
        "auxiliary": "haben",
        "frame": "object",
        "fixed": "gut"
      },
      "stem": "beğen",
      "progressiveStem": "beğen"
    },
    {
      "id": "iw239",
      "tr": "tercih etmek",
      "de": "bevorzugen",
      "deAnswers": [
        "bevorzugen"
      ],
      "type": "verb",
      "themes": [
        "T14"
      ],
      "interest": true,
      "aorist": "tercih eder",
      "deGrammar": {
        "infinitive": "bevorzugen",
        "present": [
          "bevorzuge",
          "bevorzugst",
          "bevorzugt",
          "bevorzugen",
          "bevorzugt",
          "bevorzugen"
        ],
        "participle": "bevorzugt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "tercih et",
      "progressiveStem": "tercih ed",
      "vowelStem": "tercih ed"
    },
    {
      "id": "iw240",
      "tr": "reddetmek",
      "de": "ablehnen",
      "deAnswers": [
        "ablehnen"
      ],
      "type": "verb",
      "themes": [
        "T14"
      ],
      "interest": true,
      "aorist": "reddeder",
      "deGrammar": {
        "infinitive": "ablehnen",
        "present": [
          "lehne ab",
          "lehnst ab",
          "lehnt ab",
          "lehnen ab",
          "lehnt ab",
          "lehnen ab"
        ],
        "participle": "abgelehnt",
        "auxiliary": "haben",
        "frame": "object",
        "separable": "ab"
      },
      "stem": "reddet",
      "progressiveStem": "redded",
      "vowelStem": "redded"
    },
    {
      "id": "iw241",
      "tr": "acı",
      "de": "bitter / scharf",
      "deAnswers": [
        "bitter",
        "scharf"
      ],
      "type": "adj",
      "themes": [
        "T14",
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "bitter"
      }
    },
    {
      "id": "iw242",
      "tr": "hafif",
      "de": "mild / leicht",
      "deAnswers": [
        "mild",
        "leicht"
      ],
      "type": "adj",
      "themes": [
        "T14",
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "leicht"
      }
    },
    {
      "id": "iw243",
      "tr": "gezi",
      "de": "Ausflug",
      "deAnswers": [
        "Ausflug"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Ausflug",
        "plural": "Ausflüge"
      },
      "semantic": "thing"
    },
    {
      "id": "iw244",
      "tr": "şehir",
      "de": "Stadt",
      "deAnswers": [
        "Stadt"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Stadt",
        "plural": "Städte",
        "at": "in der Stadt",
        "to": "zu der Stadt",
        "from": "aus der Stadt"
      },
      "semantic": "place",
      "vowelLoss": "şehr"
    },
    {
      "id": "iw245",
      "tr": "fotoğraf",
      "de": "Foto",
      "deAnswers": [
        "Foto"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Foto",
        "plural": "Fotos"
      },
      "semantic": "thing"
    },
    {
      "id": "iw246",
      "tr": "müze",
      "de": "Museum",
      "deAnswers": [
        "Museum"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Museum",
        "plural": "Museen",
        "at": "in dem Museum",
        "to": "zu dem Museum",
        "from": "aus dem Museum"
      },
      "semantic": "place"
    },
    {
      "id": "iw247",
      "tr": "kule",
      "de": "Turm",
      "deAnswers": [
        "Turm"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Turm",
        "plural": "Türme",
        "at": "in dem Turm",
        "to": "zu dem Turm",
        "from": "aus dem Turm"
      },
      "semantic": "place"
    },
    {
      "id": "iw248",
      "tr": "köprü",
      "de": "Brücke",
      "deAnswers": [
        "Brücke"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Brücke",
        "plural": "Brücken",
        "at": "in der Brücke",
        "to": "zu der Brücke",
        "from": "aus der Brücke"
      },
      "semantic": "place"
    },
    {
      "id": "iw249",
      "tr": "fırın",
      "de": "Bäckerei / Backofen",
      "deAnswers": [
        "Bäckerei",
        "Backofen"
      ],
      "type": "noun",
      "themes": [
        "T15",
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Bäckerei",
        "plural": "Bäckereien",
        "at": "in der Bäckerei",
        "to": "zu der Bäckerei",
        "from": "aus der Bäckerei"
      },
      "semantic": "place"
    },
    {
      "id": "iw250",
      "tr": "kruvasan",
      "de": "Croissant",
      "deAnswers": [
        "Croissant"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Croissant",
        "plural": "Croissants"
      },
      "semantic": "thing"
    },
    {
      "id": "iw251",
      "tr": "otel",
      "de": "Hotel",
      "deAnswers": [
        "Hotel"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Hotel",
        "plural": "Hotels",
        "at": "in dem Hotel",
        "to": "zu dem Hotel",
        "from": "aus dem Hotel"
      },
      "semantic": "place"
    },
    {
      "id": "iw252",
      "tr": "tren",
      "de": "Zug",
      "deAnswers": [
        "Zug"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Zug",
        "plural": "Züge"
      },
      "semantic": "thing"
    },
    {
      "id": "iw253",
      "tr": "bilet",
      "de": "Fahrkarte",
      "deAnswers": [
        "Fahrkarte"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Fahrkarte",
        "plural": "Fahrkarten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw254",
      "tr": "Noel pazarı",
      "de": "Weihnachtsmarkt",
      "deAnswers": [
        "Weihnachtsmarkt"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Weihnachtsmarkt",
        "plural": "Weihnachtsmärkte",
        "at": "auf dem Weihnachtsmarkt",
        "to": "zu dem Weihnachtsmarkt",
        "from": "aus dem Weihnachtsmarkt"
      },
      "semantic": "place",
      "compoundParts": [
        "Noel",
        "pazar"
      ]
    },
    {
      "id": "iw255",
      "tr": "meydan",
      "de": "Platz",
      "deAnswers": [
        "Platz"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Platz",
        "plural": "Plätze",
        "at": "auf dem Platz",
        "to": "zu dem Platz",
        "from": "aus dem Platz"
      },
      "semantic": "place"
    },
    {
      "id": "iw256",
      "tr": "hatıra",
      "de": "Erinnerung",
      "deAnswers": [
        "Erinnerung"
      ],
      "type": "noun",
      "themes": [
        "T15"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Erinnerung",
        "plural": "Erinnerungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw257",
      "tr": "fotoğraf çekmek",
      "de": "fotografieren",
      "deAnswers": [
        "fotografieren"
      ],
      "type": "verb",
      "themes": [
        "T15"
      ],
      "interest": true,
      "aorist": "fotoğraf çeker",
      "deGrammar": {
        "infinitive": "fotografieren",
        "present": [
          "fotografiere",
          "fotografierst",
          "fotografiert",
          "fotografieren",
          "fotografiert",
          "fotografieren"
        ],
        "participle": "fotografiert",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "fotoğraf çek",
      "progressiveStem": "fotoğraf çek"
    },
    {
      "id": "iw258",
      "tr": "seyahat etmek",
      "de": "reisen",
      "deAnswers": [
        "reisen"
      ],
      "type": "verb",
      "themes": [
        "T15"
      ],
      "interest": true,
      "aorist": "seyahat eder",
      "deGrammar": {
        "infinitive": "reisen",
        "present": [
          "reise",
          "reist",
          "reist",
          "reisen",
          "reist",
          "reisen"
        ],
        "participle": "gereist",
        "auxiliary": "sein",
        "frame": "motion"
      },
      "stem": "seyahat et",
      "progressiveStem": "seyahat ed",
      "vowelStem": "seyahat ed"
    },
    {
      "id": "iw259",
      "tr": "ziyaret etmek",
      "de": "besuchen",
      "deAnswers": [
        "besuchen"
      ],
      "type": "verb",
      "themes": [
        "T15"
      ],
      "interest": true,
      "aorist": "ziyaret eder",
      "deGrammar": {
        "infinitive": "besuchen",
        "present": [
          "besuche",
          "besuchst",
          "besucht",
          "besuchen",
          "besucht",
          "besuchen"
        ],
        "participle": "besucht",
        "auxiliary": "haben",
        "frame": "person-object"
      },
      "stem": "ziyaret et",
      "progressiveStem": "ziyaret ed",
      "vowelStem": "ziyaret ed"
    },
    {
      "id": "iw260",
      "tr": "sos",
      "de": "Soße",
      "deAnswers": [
        "Soße"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Soße",
        "plural": "Soßen"
      },
      "semantic": "food"
    },
    {
      "id": "iw261",
      "tr": "biber",
      "de": "Paprika / Chili",
      "deAnswers": [
        "Paprika",
        "Chili"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Paprika",
        "plural": "Paprikas"
      },
      "semantic": "food"
    },
    {
      "id": "iw262",
      "tr": "acı biber",
      "de": "Chili",
      "deAnswers": [
        "Chili"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Chili",
        "plural": "Chilis"
      },
      "semantic": "thing"
    },
    {
      "id": "iw263",
      "tr": "baharat",
      "de": "Gewürz",
      "deAnswers": [
        "Gewürz"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Gewürz",
        "plural": "Gewürze"
      },
      "semantic": "food"
    },
    {
      "id": "iw264",
      "tr": "tuz",
      "de": "Salz",
      "deAnswers": [
        "Salz"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Salz",
        "plural": "Salze"
      },
      "semantic": "food"
    },
    {
      "id": "iw265",
      "tr": "sarımsak",
      "de": "Knoblauch",
      "deAnswers": [
        "Knoblauch"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Knoblauch",
        "plural": "Knoblauch"
      },
      "semantic": "food"
    },
    {
      "id": "iw266",
      "tr": "yağ",
      "de": "Öl",
      "deAnswers": [
        "Öl"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Öl",
        "plural": "Öle"
      },
      "semantic": "food"
    },
    {
      "id": "iw267",
      "tr": "limon",
      "de": "Zitrone",
      "deAnswers": [
        "Zitrone"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Zitrone",
        "plural": "Zitronen"
      },
      "semantic": "food"
    },
    {
      "id": "iw268",
      "tr": "damla",
      "de": "Tropfen",
      "deAnswers": [
        "Tropfen"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Tropfen",
        "plural": "Tropfen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw269",
      "tr": "kaşık",
      "de": "Löffel",
      "deAnswers": [
        "Löffel"
      ],
      "type": "noun",
      "themes": [
        "T16"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Löffel",
        "plural": "Löffel"
      },
      "semantic": "thing"
    },
    {
      "id": "iw270",
      "tr": "eklemek",
      "de": "hinzufügen",
      "deAnswers": [
        "hinzufügen"
      ],
      "type": "verb",
      "themes": [
        "T16"
      ],
      "interest": true,
      "aorist": "ekler",
      "deGrammar": {
        "infinitive": "hinzufügen",
        "present": [
          "füge hinzu",
          "fügst hinzu",
          "fügt hinzu",
          "fügen hinzu",
          "fügt hinzu",
          "fügen hinzu"
        ],
        "participle": "hinzugefügt",
        "auxiliary": "haben",
        "frame": "food-object",
        "separable": "hinzu"
      },
      "stem": "ekle",
      "progressiveStem": "ekl"
    },
    {
      "id": "iw271",
      "tr": "karıştırmak",
      "de": "mischen",
      "deAnswers": [
        "mischen"
      ],
      "type": "verb",
      "themes": [
        "T16"
      ],
      "interest": true,
      "aorist": "karıştırır",
      "deGrammar": {
        "infinitive": "mischen",
        "present": [
          "mische",
          "mischst",
          "mischt",
          "mischen",
          "mischt",
          "mischen"
        ],
        "participle": "gemischt",
        "auxiliary": "haben",
        "frame": "food-object"
      },
      "stem": "karıştır",
      "progressiveStem": "karıştır"
    },
    {
      "id": "iw272",
      "tr": "yanmak",
      "de": "brennen",
      "deAnswers": [
        "brennen"
      ],
      "type": "verb",
      "themes": [
        "T16"
      ],
      "interest": true,
      "aorist": "yanar",
      "deGrammar": {
        "infinitive": "brennen",
        "present": [
          "brenne",
          "brennst",
          "brennt",
          "brennen",
          "brennt",
          "brennen"
        ],
        "participle": "gebrannt",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "yan",
      "progressiveStem": "yan"
    },
    {
      "id": "iw273",
      "tr": "sıcak",
      "de": "heiß / warm",
      "deAnswers": [
        "heiß",
        "warm"
      ],
      "type": "adj",
      "themes": [
        "T16",
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "heiß"
      }
    },
    {
      "id": "iw274",
      "tr": "araba",
      "de": "Auto",
      "deAnswers": [
        "Auto"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Auto",
        "plural": "Autos"
      },
      "semantic": "device"
    },
    {
      "id": "iw275",
      "tr": "anahtar",
      "de": "Schlüssel",
      "deAnswers": [
        "Schlüssel"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schlüssel",
        "plural": "Schlüssel"
      },
      "semantic": "thing"
    },
    {
      "id": "iw276",
      "tr": "bilgisayar",
      "de": "Computer",
      "deAnswers": [
        "Computer"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Computer",
        "plural": "Computer"
      },
      "semantic": "device"
    },
    {
      "id": "iw277",
      "tr": "klavye",
      "de": "Tastatur",
      "deAnswers": [
        "Tastatur"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Tastatur",
        "plural": "Tastaturen"
      },
      "semantic": "device"
    },
    {
      "id": "iw278",
      "tr": "dosya",
      "de": "Datei",
      "deAnswers": [
        "Datei"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Datei",
        "plural": "Dateien"
      },
      "semantic": "thing"
    },
    {
      "id": "iw279",
      "tr": "süpürge",
      "de": "Staubsauger",
      "deAnswers": [
        "Staubsauger"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Staubsauger",
        "plural": "Staubsauger"
      },
      "semantic": "device"
    },
    {
      "id": "iw280",
      "tr": "zemin",
      "de": "Boden",
      "deAnswers": [
        "Boden"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Boden",
        "plural": "Böden"
      },
      "semantic": "thing"
    },
    {
      "id": "iw281",
      "tr": "toz",
      "de": "Staub",
      "deAnswers": [
        "Staub"
      ],
      "type": "noun",
      "themes": [
        "T17"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Staub",
        "plural": "Staub"
      },
      "semantic": "thing"
    },
    {
      "id": "iw282",
      "tr": "hediye",
      "de": "Geschenk",
      "deAnswers": [
        "Geschenk"
      ],
      "type": "noun",
      "themes": [
        "T17",
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Geschenk",
        "plural": "Geschenke"
      },
      "semantic": "thing"
    },
    {
      "id": "iw283",
      "tr": "temizlemek",
      "de": "sauber machen",
      "deAnswers": [
        "sauber machen"
      ],
      "type": "verb",
      "themes": [
        "T17"
      ],
      "interest": true,
      "aorist": "temizler",
      "deGrammar": {
        "infinitive": "reinigen",
        "present": [
          "reinige",
          "reinigst",
          "reinigt",
          "reinigen",
          "reinigt",
          "reinigen"
        ],
        "participle": "gereinigt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "temizle",
      "progressiveStem": "temizl",
      "voice": {
        "passive": "temizlen",
        "causative": "temizlet"
      }
    },
    {
      "id": "iw284",
      "tr": "hediye etmek",
      "de": "schenken",
      "deAnswers": [
        "schenken"
      ],
      "type": "verb",
      "themes": [
        "T17"
      ],
      "interest": true,
      "aorist": "hediye eder",
      "deGrammar": {
        "infinitive": "schenken",
        "present": [
          "schenke",
          "schenkst",
          "schenkt",
          "schenken",
          "schenkt",
          "schenken"
        ],
        "participle": "geschenkt",
        "auxiliary": "haben",
        "frame": "give"
      },
      "stem": "hediye et",
      "progressiveStem": "hediye ed",
      "vowelStem": "hediye ed"
    },
    {
      "id": "iw285",
      "tr": "çalışmak",
      "de": "arbeiten / funktionieren",
      "deAnswers": [
        "arbeiten",
        "funktionieren"
      ],
      "type": "verb",
      "themes": [
        "T17"
      ],
      "interest": true,
      "aorist": "çalışır",
      "deGrammar": {
        "infinitive": "arbeiten",
        "present": [
          "arbeite",
          "arbeitest",
          "arbeitet",
          "arbeiten",
          "arbeitet",
          "arbeiten"
        ],
        "participle": "gearbeitet",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "çalış",
      "progressiveStem": "çalış"
    },
    {
      "id": "iw286",
      "tr": "bozulmak",
      "de": "kaputtgehen",
      "deAnswers": [
        "kaputtgehen"
      ],
      "type": "verb",
      "themes": [
        "T17"
      ],
      "interest": true,
      "aorist": "bozulur",
      "deGrammar": {
        "infinitive": "kaputtgehen",
        "present": [
          "gehe kaputt",
          "gehst kaputt",
          "geht kaputt",
          "gehen kaputt",
          "geht kaputt",
          "gehen kaputt"
        ],
        "participle": "kaputtgegangen",
        "auxiliary": "sein",
        "frame": "simple",
        "separable": "kaputt"
      },
      "stem": "bozul",
      "progressiveStem": "bozul"
    },
    {
      "id": "iw287",
      "tr": "tamir etmek",
      "de": "reparieren",
      "deAnswers": [
        "reparieren"
      ],
      "type": "verb",
      "themes": [
        "T17"
      ],
      "interest": true,
      "aorist": "tamir eder",
      "deGrammar": {
        "infinitive": "reparieren",
        "present": [
          "repariere",
          "reparierst",
          "repariert",
          "reparieren",
          "repariert",
          "reparieren"
        ],
        "participle": "repariert",
        "auxiliary": "haben",
        "frame": "device-object"
      },
      "stem": "tamir et",
      "progressiveStem": "tamir ed",
      "vowelStem": "tamir ed"
    },
    {
      "id": "iw288",
      "tr": "taşımak",
      "de": "tragen / transportieren",
      "deAnswers": [
        "tragen",
        "transportieren"
      ],
      "type": "verb",
      "themes": [
        "T17"
      ],
      "interest": true,
      "aorist": "taşır",
      "deGrammar": {
        "infinitive": "tragen",
        "present": [
          "trage",
          "tragst",
          "tragt",
          "tragen",
          "tragt",
          "tragen"
        ],
        "participle": "getragen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "taşı",
      "progressiveStem": "taşı"
    },
    {
      "id": "iw289",
      "tr": "göz",
      "de": "Auge",
      "deAnswers": [
        "Auge"
      ],
      "type": "noun",
      "themes": [
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Auge",
        "plural": "Augen"
      },
      "semantic": "body"
    },
    {
      "id": "iw290",
      "tr": "bukle",
      "de": "Locke",
      "deAnswers": [
        "Locke"
      ],
      "type": "noun",
      "themes": [
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Locke",
        "plural": "Locken"
      },
      "semantic": "body"
    },
    {
      "id": "iw291",
      "tr": "perma",
      "de": "Dauerwelle",
      "deAnswers": [
        "Dauerwelle"
      ],
      "type": "noun",
      "themes": [
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Dauerwelle",
        "plural": "Dauerwellen"
      },
      "semantic": "body"
    },
    {
      "id": "iw292",
      "tr": "ayna",
      "de": "Spiegel",
      "deAnswers": [
        "Spiegel"
      ],
      "type": "noun",
      "themes": [
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Spiegel",
        "plural": "Spiegel"
      },
      "semantic": "thing"
    },
    {
      "id": "iw293",
      "tr": "yaz",
      "de": "Sommer",
      "deAnswers": [
        "Sommer"
      ],
      "type": "noun",
      "themes": [
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Sommer",
        "plural": "Sommer"
      },
      "semantic": "thing"
    },
    {
      "id": "iw294",
      "tr": "yeşil",
      "de": "grün",
      "deAnswers": [
        "grün"
      ],
      "type": "adj",
      "themes": [
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "grün"
      }
    },
    {
      "id": "iw295",
      "tr": "güzel",
      "de": "schön",
      "deAnswers": [
        "schön"
      ],
      "type": "adj",
      "themes": [
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "schön"
      }
    },
    {
      "id": "iw296",
      "tr": "giymek",
      "de": "anziehen / tragen",
      "deAnswers": [
        "anziehen",
        "tragen"
      ],
      "type": "verb",
      "themes": [
        "T18",
        "T21"
      ],
      "interest": true,
      "aorist": "giyer",
      "deGrammar": {
        "infinitive": "tragen",
        "present": [
          "trage",
          "tragst",
          "tragt",
          "tragen",
          "tragt",
          "tragen"
        ],
        "participle": "getragen",
        "auxiliary": "haben",
        "frame": "clothing-object"
      },
      "stem": "giy",
      "progressiveStem": "giy"
    },
    {
      "id": "iw297",
      "tr": "yakışmak",
      "de": "gut stehen",
      "deAnswers": [
        "gut stehen"
      ],
      "type": "verb",
      "themes": [
        "T18"
      ],
      "interest": true,
      "aorist": "yakışır",
      "deGrammar": {
        "infinitive": "gut stehen",
        "present": [
          "stehe gut",
          "stehst gut",
          "steht gut",
          "stehen gut",
          "steht gut",
          "stehen gut"
        ],
        "participle": "gut gestanden",
        "auxiliary": "haben",
        "frame": "fit-dative",
        "fixed": "gut"
      },
      "stem": "yakış",
      "progressiveStem": "yakış"
    },
    {
      "id": "iw298",
      "tr": "anne",
      "de": "Mutter",
      "deAnswers": [
        "Mutter"
      ],
      "type": "noun",
      "themes": [
        "T19",
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Mutter",
        "plural": "Mütter"
      },
      "semantic": "human"
    },
    {
      "id": "iw299",
      "tr": "ev",
      "de": "Haus",
      "deAnswers": [
        "Haus"
      ],
      "type": "noun",
      "themes": [
        "T19"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Haus",
        "plural": "Häuser",
        "at": "in dem Haus",
        "to": "zu dem Haus",
        "from": "aus dem Haus"
      },
      "semantic": "place"
    },
    {
      "id": "iw300",
      "tr": "kapı",
      "de": "Tür",
      "deAnswers": [
        "Tür"
      ],
      "type": "noun",
      "themes": [
        "T19"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Tür",
        "plural": "Türen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw301",
      "tr": "mutfak",
      "de": "Küche",
      "deAnswers": [
        "Küche"
      ],
      "type": "noun",
      "themes": [
        "T19",
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Küche",
        "plural": "Küchen",
        "at": "in der Küche",
        "to": "zu der Küche",
        "from": "aus der Küche"
      },
      "semantic": "place"
    },
    {
      "id": "iw302",
      "tr": "sofra",
      "de": "gedeckter Esstisch",
      "deAnswers": [
        "gedeckter Esstisch"
      ],
      "type": "noun",
      "themes": [
        "T19"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "gedeckter Tisch",
        "plural": "gedeckte Tische"
      },
      "semantic": "thing"
    },
    {
      "id": "iw303",
      "tr": "tabak",
      "de": "Teller",
      "deAnswers": [
        "Teller"
      ],
      "type": "noun",
      "themes": [
        "T19"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Teller",
        "plural": "Teller"
      },
      "semantic": "thing",
      "soften": "tabağ"
    },
    {
      "id": "iw304",
      "tr": "yemek",
      "de": "Essen / Gericht",
      "deAnswers": [
        "Essen",
        "Gericht"
      ],
      "type": "noun",
      "themes": [
        "T19",
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Essen",
        "plural": "Gerichte"
      },
      "semantic": "food",
      "voice": {
        "passive": "yen"
      },
      "soften": "yemeğ"
    },
    {
      "id": "iw305",
      "tr": "çorba",
      "de": "Suppe",
      "deAnswers": [
        "Suppe"
      ],
      "type": "noun",
      "themes": [
        "T19"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Suppe",
        "plural": "Suppen"
      },
      "semantic": "food"
    },
    {
      "id": "iw306",
      "tr": "ziyaret",
      "de": "Besuch",
      "deAnswers": [
        "Besuch"
      ],
      "type": "noun",
      "themes": [
        "T19"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Besuch",
        "plural": "Besuche"
      },
      "semantic": "thing"
    },
    {
      "id": "iw307",
      "tr": "aile",
      "de": "Familie",
      "deAnswers": [
        "Familie"
      ],
      "type": "noun",
      "themes": [
        "T19"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Familie",
        "plural": "Familien"
      },
      "semantic": "thing"
    },
    {
      "id": "iw308",
      "tr": "gelmek",
      "de": "kommen",
      "deAnswers": [
        "kommen"
      ],
      "type": "verb",
      "themes": [
        "T19"
      ],
      "interest": true,
      "aorist": "gelir",
      "deGrammar": {
        "infinitive": "kommen",
        "present": [
          "komme",
          "kommst",
          "kommt",
          "kommen",
          "kommt",
          "kommen"
        ],
        "participle": "gekommen",
        "auxiliary": "sein",
        "frame": "motion"
      },
      "stem": "gel",
      "progressiveStem": "gel"
    },
    {
      "id": "iw309",
      "tr": "gitmek",
      "de": "gehen",
      "deAnswers": [
        "gehen"
      ],
      "type": "verb",
      "themes": [
        "T19"
      ],
      "interest": true,
      "aorist": "gider",
      "deGrammar": {
        "infinitive": "gehen",
        "present": [
          "gehe",
          "gehst",
          "geht",
          "gehen",
          "geht",
          "gehen"
        ],
        "participle": "gegangen",
        "auxiliary": "sein",
        "frame": "motion"
      },
      "stem": "git",
      "progressiveStem": "git",
      "vowelStem": "gid"
    },
    {
      "id": "iw310",
      "tr": "beklemek",
      "de": "warten",
      "deAnswers": [
        "warten"
      ],
      "type": "verb",
      "themes": [
        "T19"
      ],
      "interest": true,
      "aorist": "bekler",
      "deGrammar": {
        "infinitive": "warten",
        "present": [
          "warte",
          "wartest",
          "wartet",
          "warten",
          "wartet",
          "warten"
        ],
        "participle": "gewartet",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "bekle",
      "progressiveStem": "bekl"
    },
    {
      "id": "iw311",
      "tr": "pişirmek",
      "de": "kochen / garen",
      "deAnswers": [
        "kochen",
        "garen"
      ],
      "type": "verb",
      "themes": [
        "T19",
        "T20"
      ],
      "interest": true,
      "aorist": "pişirir",
      "deGrammar": {
        "infinitive": "kochen",
        "present": [
          "koche",
          "kochst",
          "kocht",
          "kochen",
          "kocht",
          "kochen"
        ],
        "participle": "gekocht",
        "auxiliary": "haben",
        "frame": "food-object"
      },
      "stem": "pişir",
      "progressiveStem": "pişir",
      "voice": {
        "passive": "pişiril"
      }
    },
    {
      "id": "iw312",
      "tr": "davet etmek",
      "de": "einladen",
      "deAnswers": [
        "einladen"
      ],
      "type": "verb",
      "themes": [
        "T19"
      ],
      "interest": true,
      "aorist": "davet eder",
      "deGrammar": {
        "infinitive": "einladen",
        "present": [
          "lade ein",
          "lädst ein",
          "lädt ein",
          "laden ein",
          "ladet ein",
          "laden ein"
        ],
        "participle": "eingeladen",
        "auxiliary": "haben",
        "frame": "person-object",
        "separable": "ein"
      },
      "stem": "davet et",
      "progressiveStem": "davet ed",
      "vowelStem": "davet ed"
    },
    {
      "id": "iw313",
      "tr": "doymak",
      "de": "satt werden",
      "deAnswers": [
        "satt werden"
      ],
      "type": "verb",
      "themes": [
        "T19"
      ],
      "interest": true,
      "aorist": "doyar",
      "deGrammar": {
        "infinitive": "satt werden",
        "present": [
          "werde satt",
          "wirst satt",
          "wird satt",
          "werden satt",
          "werdet satt",
          "werden satt"
        ],
        "participle": "satt geworden",
        "auxiliary": "sein",
        "frame": "simple",
        "fixed": "satt"
      },
      "stem": "doy",
      "progressiveStem": "doy"
    },
    {
      "id": "iw314",
      "tr": "hafta sonu",
      "de": "Wochenende",
      "deAnswers": [
        "Wochenende"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Wochenende",
        "plural": "Wochenenden"
      },
      "semantic": "thing",
      "compoundParts": [
        "hafta",
        "son"
      ]
    },
    {
      "id": "iw315",
      "tr": "tencere",
      "de": "Kochtopf",
      "deAnswers": [
        "Kochtopf"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Kochtopf",
        "plural": "Kochtöpfe"
      },
      "semantic": "thing"
    },
    {
      "id": "iw316",
      "tr": "tava",
      "de": "Pfanne",
      "deAnswers": [
        "Pfanne"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Pfanne",
        "plural": "Pfannen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw317",
      "tr": "bıçak",
      "de": "Messer",
      "deAnswers": [
        "Messer"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Messer",
        "plural": "Messer"
      },
      "semantic": "thing",
      "soften": "bıçağ"
    },
    {
      "id": "iw318",
      "tr": "tahta",
      "de": "Brett",
      "deAnswers": [
        "Brett"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Brett",
        "plural": "Bretter"
      },
      "semantic": "thing"
    },
    {
      "id": "iw319",
      "tr": "tarif",
      "de": "Rezept",
      "deAnswers": [
        "Rezept"
      ],
      "type": "noun",
      "themes": [
        "T20",
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Rezept",
        "plural": "Rezepte"
      },
      "semantic": "thing"
    },
    {
      "id": "iw320",
      "tr": "domates",
      "de": "Tomate",
      "deAnswers": [
        "Tomate"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Tomate",
        "plural": "Tomaten"
      },
      "semantic": "food"
    },
    {
      "id": "iw321",
      "tr": "soğan",
      "de": "Zwiebel",
      "deAnswers": [
        "Zwiebel"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Zwiebel",
        "plural": "Zwiebeln"
      },
      "semantic": "food"
    },
    {
      "id": "iw322",
      "tr": "makarna",
      "de": "Nudeln",
      "deAnswers": [
        "Nudeln"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Nudel",
        "plural": "Nudeln"
      },
      "semantic": "food"
    },
    {
      "id": "iw323",
      "tr": "salata",
      "de": "Salat",
      "deAnswers": [
        "Salat"
      ],
      "type": "noun",
      "themes": [
        "T20"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Salat",
        "plural": "Salate"
      },
      "semantic": "food"
    },
    {
      "id": "iw324",
      "tr": "yıkamak",
      "de": "waschen",
      "deAnswers": [
        "waschen"
      ],
      "type": "verb",
      "themes": [
        "T20"
      ],
      "interest": true,
      "aorist": "yıkar",
      "deGrammar": {
        "infinitive": "waschen",
        "present": [
          "wasche",
          "wäschst",
          "wäscht",
          "waschen",
          "wascht",
          "waschen"
        ],
        "participle": "gewaschen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "yıka",
      "progressiveStem": "yık"
    },
    {
      "id": "iw325",
      "tr": "doğramak",
      "de": "klein schneiden",
      "deAnswers": [
        "klein schneiden"
      ],
      "type": "verb",
      "themes": [
        "T20"
      ],
      "interest": true,
      "aorist": "doğrar",
      "deGrammar": {
        "infinitive": "schneiden",
        "present": [
          "schneide",
          "schneidest",
          "schneidet",
          "schneiden",
          "schneidet",
          "schneiden"
        ],
        "participle": "geschnitten",
        "auxiliary": "haben",
        "frame": "food-object"
      },
      "stem": "doğra",
      "progressiveStem": "doğr"
    },
    {
      "id": "iw326",
      "tr": "alışveriş yapmak",
      "de": "einkaufen",
      "deAnswers": [
        "einkaufen"
      ],
      "type": "verb",
      "themes": [
        "T20"
      ],
      "interest": true,
      "aorist": "alışveriş yapar",
      "deGrammar": {
        "infinitive": "einkaufen",
        "present": [
          "kaufe ein",
          "kaufst ein",
          "kauft ein",
          "kaufen ein",
          "kauft ein",
          "kaufen ein"
        ],
        "participle": "eingekauft",
        "auxiliary": "haben",
        "frame": "simple",
        "separable": "ein"
      },
      "stem": "alışveriş yap",
      "progressiveStem": "alışveriş yap"
    },
    {
      "id": "iw327",
      "tr": "çorap",
      "de": "Socke",
      "deAnswers": [
        "Socke"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Socke",
        "plural": "Socken"
      },
      "semantic": "clothing"
    },
    {
      "id": "iw328",
      "tr": "kaplumbağa",
      "de": "Schildkröte",
      "deAnswers": [
        "Schildkröte"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Schildkröte",
        "plural": "Schildkröten"
      },
      "semantic": "animal"
    },
    {
      "id": "iw329",
      "tr": "renk",
      "de": "Farbe",
      "deAnswers": [
        "Farbe"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Farbe",
        "plural": "Farben"
      },
      "semantic": "thing",
      "soften": "reng"
    },
    {
      "id": "iw330",
      "tr": "desen",
      "de": "Muster",
      "deAnswers": [
        "Muster"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Muster",
        "plural": "Muster"
      },
      "semantic": "thing"
    },
    {
      "id": "iw331",
      "tr": "çift",
      "de": "Paar",
      "deAnswers": [
        "Paar"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Paar",
        "plural": "Paare"
      },
      "semantic": "thing"
    },
    {
      "id": "iw332",
      "tr": "kutu",
      "de": "Schachtel",
      "deAnswers": [
        "Schachtel"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Schachtel",
        "plural": "Schachteln"
      },
      "semantic": "thing"
    },
    {
      "id": "iw333",
      "tr": "dolap",
      "de": "Schrank",
      "deAnswers": [
        "Schrank"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schrank",
        "plural": "Schränke"
      },
      "semantic": "thing"
    },
    {
      "id": "iw334",
      "tr": "sürpriz",
      "de": "Überraschung",
      "deAnswers": [
        "Überraschung"
      ],
      "type": "noun",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Überraschung",
        "plural": "Überraschungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw335",
      "tr": "vermek",
      "de": "geben",
      "deAnswers": [
        "geben"
      ],
      "type": "verb",
      "themes": [
        "T21"
      ],
      "interest": true,
      "aorist": "verir",
      "deGrammar": {
        "infinitive": "geben",
        "present": [
          "gebe",
          "gibst",
          "gibt",
          "geben",
          "gebt",
          "geben"
        ],
        "participle": "gegeben",
        "auxiliary": "haben",
        "frame": "give"
      },
      "stem": "ver",
      "progressiveStem": "ver"
    },
    {
      "id": "iw336",
      "tr": "rengârenk",
      "de": "kunterbunt",
      "deAnswers": [
        "kunterbunt"
      ],
      "type": "adj",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "kunterbunt"
      }
    },
    {
      "id": "iw337",
      "tr": "renkli",
      "de": "bunt",
      "deAnswers": [
        "bunt"
      ],
      "type": "adj",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "bunt"
      },
      "derivationWord": {
        "base": "renk",
        "kind": "li"
      }
    },
    {
      "id": "iw338",
      "tr": "desenli",
      "de": "gemustert",
      "deAnswers": [
        "gemustert"
      ],
      "type": "adj",
      "themes": [
        "T21"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "gemustert"
      },
      "derivationWord": {
        "base": "desen",
        "kind": "li"
      }
    },
    {
      "id": "iw339",
      "tr": "televizyon",
      "de": "Fernseher",
      "deAnswers": [
        "Fernseher"
      ],
      "type": "noun",
      "themes": [
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Fernseher",
        "plural": "Fernseher"
      },
      "semantic": "media"
    },
    {
      "id": "iw340",
      "tr": "aşçı",
      "de": "Koch",
      "deAnswers": [
        "Koch"
      ],
      "type": "noun",
      "themes": [
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Koch",
        "plural": "Köche"
      },
      "semantic": "human"
    },
    {
      "id": "iw341",
      "tr": "yarışma",
      "de": "Wettbewerb",
      "deAnswers": [
        "Wettbewerb"
      ],
      "type": "noun",
      "themes": [
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Wettbewerb",
        "plural": "Wettbewerbe"
      },
      "semantic": "thing"
    },
    {
      "id": "iw342",
      "tr": "çocukluk",
      "de": "Kindheit",
      "deAnswers": [
        "Kindheit"
      ],
      "type": "noun",
      "themes": [
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Kindheit",
        "plural": "Kindheiten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw343",
      "tr": "anı",
      "de": "Erinnerung",
      "deAnswers": [
        "Erinnerung"
      ],
      "type": "noun",
      "themes": [
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Erinnerung",
        "plural": "Erinnerungen"
      },
      "semantic": "thing"
    },
    {
      "id": "iw344",
      "tr": "hatırlamak",
      "de": "sich erinnern",
      "deAnswers": [
        "sich erinnern"
      ],
      "type": "verb",
      "themes": [
        "T22"
      ],
      "interest": true,
      "aorist": "hatırlar",
      "deGrammar": {
        "infinitive": "sich erinnern",
        "present": [
          "erinnere mich",
          "erinnerst dich",
          "erinnert sich",
          "erinnern uns",
          "erinnert euch",
          "erinnern sich"
        ],
        "participle": "erinnert",
        "auxiliary": "haben",
        "frame": "simple",
        "reflexive": true
      },
      "stem": "hatırla",
      "progressiveStem": "hatırl"
    },
    {
      "id": "iw345",
      "tr": "öğrenmek",
      "de": "lernen",
      "deAnswers": [
        "lernen"
      ],
      "type": "verb",
      "themes": [
        "T22"
      ],
      "interest": true,
      "aorist": "öğrenir",
      "deGrammar": {
        "infinitive": "lernen",
        "present": [
          "lerne",
          "lernst",
          "lernt",
          "lernen",
          "lernt",
          "lernen"
        ],
        "participle": "gelernt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "öğren",
      "progressiveStem": "öğren"
    },
    {
      "id": "iw346",
      "tr": "denemek",
      "de": "ausprobieren",
      "deAnswers": [
        "ausprobieren"
      ],
      "type": "verb",
      "themes": [
        "T22"
      ],
      "interest": true,
      "aorist": "dener",
      "deGrammar": {
        "infinitive": "ausprobieren",
        "present": [
          "probiere aus",
          "probierst aus",
          "probiert aus",
          "probieren aus",
          "probiert aus",
          "probieren aus"
        ],
        "participle": "ausprobiert",
        "auxiliary": "haben",
        "frame": "object",
        "separable": "aus"
      },
      "stem": "dene",
      "progressiveStem": "den"
    },
    {
      "id": "iw347",
      "tr": "eski",
      "de": "alt / ehemalig",
      "deAnswers": [
        "alt",
        "ehemalig"
      ],
      "type": "adj",
      "themes": [
        "T22"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "alt"
      }
    },
    {
      "id": "iw348",
      "tr": "siyaset",
      "de": "Politik",
      "deAnswers": [
        "Politik"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Politik",
        "plural": "Politik"
      },
      "semantic": "thing"
    },
    {
      "id": "iw349",
      "tr": "siyasetçi",
      "de": "Politiker",
      "deAnswers": [
        "Politiker"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Politiker",
        "plural": "Politiker",
        "weak": false,
        "oblique": "Politiker"
      },
      "semantic": "human"
    },
    {
      "id": "iw350",
      "tr": "konuşma",
      "de": "Rede",
      "deAnswers": [
        "Rede"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Rede",
        "plural": "Reden"
      },
      "semantic": "thing"
    },
    {
      "id": "iw351",
      "tr": "söz",
      "de": "Ausspruch",
      "deAnswers": [
        "Ausspruch"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Ausspruch",
        "plural": "Aussprüche"
      },
      "semantic": "thing"
    },
    {
      "id": "iw352",
      "tr": "aptal",
      "de": "dumm",
      "deAnswers": [
        "dumm"
      ],
      "type": "adj",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "dumm"
      }
    },
    {
      "id": "iw353",
      "tr": "salak",
      "de": "Idiot / blöd",
      "deAnswers": [
        "Idiot",
        "blöd"
      ],
      "type": "adj",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "blöd"
      }
    },
    {
      "id": "iw354",
      "tr": "saçma",
      "de": "absurd",
      "deAnswers": [
        "absurd"
      ],
      "type": "adj",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "absurd"
      }
    },
    {
      "id": "iw355",
      "tr": "bok",
      "de": "Scheiße",
      "deAnswers": [
        "Scheiße"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Scheiße",
        "plural": "Scheiße"
      },
      "semantic": "thing"
    },
    {
      "id": "iw356",
      "tr": "göt",
      "de": "Arsch",
      "deAnswers": [
        "Arsch"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Arsch",
        "plural": "Ärsche"
      },
      "semantic": "body"
    },
    {
      "id": "iw357",
      "tr": "yarak",
      "de": "Schwanz / Penis (vulgär)",
      "deAnswers": [
        "Schwanz",
        "Penis (vulgär)"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Schwanz",
        "plural": "Schwänze"
      },
      "semantic": "body",
      "soften": "yarağ"
    },
    {
      "id": "iw358",
      "tr": "taşak",
      "de": "Hoden / Eier (vulgär)",
      "deAnswers": [
        "Hoden",
        "Eier (vulgär)"
      ],
      "type": "noun",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Hoden",
        "plural": "Hoden"
      },
      "semantic": "body"
    },
    {
      "id": "iw359",
      "tr": "lan",
      "de": "ey / Mann (grob)",
      "deAnswers": [
        "ey",
        "Mann (grob)"
      ],
      "type": "colloquial",
      "themes": [
        "T23"
      ],
      "interest": true
    },
    {
      "id": "iw360",
      "tr": "bıkmak",
      "de": "genervt sein / genug haben",
      "deAnswers": [
        "genervt sein",
        "genug haben"
      ],
      "type": "verb",
      "themes": [
        "T23"
      ],
      "interest": true,
      "aorist": "bıkar",
      "deGrammar": {
        "infinitive": "genug haben",
        "present": [
          "habe genug",
          "hast genug",
          "hat genug",
          "haben genug",
          "habt genug",
          "haben genug"
        ],
        "participle": "genug gehabt",
        "auxiliary": "haben",
        "frame": "simple",
        "fixed": "genug"
      },
      "stem": "bık",
      "progressiveStem": "bık"
    },
    {
      "id": "iw361",
      "tr": "küfür etmek",
      "de": "fluchen",
      "deAnswers": [
        "fluchen"
      ],
      "type": "verb",
      "themes": [
        "T23"
      ],
      "interest": true,
      "aorist": "küfür eder",
      "deGrammar": {
        "infinitive": "fluchen",
        "present": [
          "fluche",
          "fluchst",
          "flucht",
          "fluchen",
          "flucht",
          "fluchen"
        ],
        "participle": "geflucht",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "küfür et",
      "progressiveStem": "küfür ed",
      "vowelStem": "küfür ed"
    },
    {
      "id": "iw362",
      "tr": "gülmek",
      "de": "lachen",
      "deAnswers": [
        "lachen"
      ],
      "type": "verb",
      "themes": [
        "T23"
      ],
      "interest": true,
      "aorist": "güler",
      "deGrammar": {
        "infinitive": "lachen",
        "present": [
          "lache",
          "lachst",
          "lacht",
          "lachen",
          "lacht",
          "lachen"
        ],
        "participle": "gelacht",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "gül",
      "progressiveStem": "gül"
    },
    {
      "id": "iw363",
      "tr": "şerefsiz",
      "de": "ehrlos / Schwein als Beleidigung",
      "deAnswers": [
        "ehrlos",
        "Schwein als Beleidigung"
      ],
      "type": "adj",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "ehrlos"
      },
      "derivationWord": {
        "base": "şeref",
        "kind": "siz"
      }
    },
    {
      "id": "iw364",
      "tr": "boktan",
      "de": "beschissen",
      "deAnswers": [
        "beschissen"
      ],
      "type": "adj",
      "themes": [
        "T23"
      ],
      "interest": true,
      "deGrammar": {
        "positive": "beschissen"
      }
    },
    {
      "id": "iw365",
      "tr": "ben",
      "de": "ich",
      "deAnswers": [
        "ich"
      ],
      "type": "pronoun",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw366",
      "tr": "sen",
      "de": "du",
      "deAnswers": [
        "du"
      ],
      "type": "pronoun",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw367",
      "tr": "o",
      "de": "er / sie / es",
      "deAnswers": [
        "er",
        "sie",
        "es"
      ],
      "type": "pronoun",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw368",
      "tr": "biz",
      "de": "wir",
      "deAnswers": [
        "wir"
      ],
      "type": "pronoun",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw369",
      "tr": "siz",
      "de": "ihr / Sie",
      "deAnswers": [
        "ihr",
        "Sie"
      ],
      "type": "pronoun",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw370",
      "tr": "onlar",
      "de": "sie (Mehrzahl)",
      "deAnswers": [
        "sie (Mehrzahl)"
      ],
      "type": "pronoun",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw371",
      "tr": "bir",
      "de": "ein",
      "deAnswers": [
        "ein"
      ],
      "type": "determiner",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw372",
      "tr": "bu",
      "de": "dies",
      "deAnswers": [
        "dies"
      ],
      "type": "demonstrative",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw373",
      "tr": "ve",
      "de": "und",
      "deAnswers": [
        "und"
      ],
      "type": "conjunction",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw374",
      "tr": "ama",
      "de": "aber",
      "deAnswers": [
        "aber"
      ],
      "type": "conjunction",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw375",
      "tr": "çünkü",
      "de": "weil / denn",
      "deAnswers": [
        "weil",
        "denn"
      ],
      "type": "conjunction",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw376",
      "tr": "sonra",
      "de": "danach / nach",
      "deAnswers": [
        "danach",
        "nach"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw377",
      "tr": "önce",
      "de": "vorher / vor",
      "deAnswers": [
        "vorher",
        "vor"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw378",
      "tr": "bugün",
      "de": "heute",
      "deAnswers": [
        "heute"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw379",
      "tr": "dün",
      "de": "gestern",
      "deAnswers": [
        "gestern"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw380",
      "tr": "yarın",
      "de": "morgen",
      "deAnswers": [
        "morgen"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw381",
      "tr": "burada",
      "de": "hier",
      "deAnswers": [
        "hier"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw382",
      "tr": "orada",
      "de": "dort",
      "deAnswers": [
        "dort"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw383",
      "tr": "çok",
      "de": "sehr / viel",
      "deAnswers": [
        "sehr",
        "viel"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw384",
      "tr": "az",
      "de": "wenig",
      "deAnswers": [
        "wenig"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw385",
      "tr": "daha",
      "de": "mehr / noch",
      "deAnswers": [
        "mehr",
        "noch"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw386",
      "tr": "en",
      "de": "am meisten",
      "deAnswers": [
        "am meisten"
      ],
      "type": "adverb",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw387",
      "tr": "var",
      "de": "vorhanden",
      "deAnswers": [
        "vorhanden"
      ],
      "type": "existential",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw388",
      "tr": "yok",
      "de": "nicht vorhanden",
      "deAnswers": [
        "nicht vorhanden"
      ],
      "type": "existential",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw389",
      "tr": "değil",
      "de": "nicht bei Nominalsätzen",
      "deAnswers": [
        "nicht bei Nominalsätzen"
      ],
      "type": "negation",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw390",
      "tr": "için",
      "de": "für / um zu",
      "deAnswers": [
        "für",
        "um zu"
      ],
      "type": "postposition",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw391",
      "tr": "ile",
      "de": "mit",
      "deAnswers": [
        "mit"
      ],
      "type": "postposition",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw392",
      "tr": "rağmen",
      "de": "trotz",
      "deAnswers": [
        "trotz"
      ],
      "type": "postposition",
      "themes": [],
      "interest": true
    },
    {
      "id": "iw393",
      "tr": "kolay",
      "de": "leicht",
      "deAnswers": [
        "leicht"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "leicht"
      }
    },
    {
      "id": "iw394",
      "tr": "zor",
      "de": "schwierig",
      "deAnswers": [
        "schwierig"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "schwierig"
      }
    },
    {
      "id": "iw395",
      "tr": "büyük",
      "de": "groß",
      "deAnswers": [
        "groß"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "groß"
      }
    },
    {
      "id": "iw396",
      "tr": "küçük",
      "de": "klein",
      "deAnswers": [
        "klein"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "klein"
      }
    },
    {
      "id": "iw397",
      "tr": "kısa",
      "de": "kurz",
      "deAnswers": [
        "kurz"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "kurz"
      }
    },
    {
      "id": "iw398",
      "tr": "uzun",
      "de": "lang",
      "deAnswers": [
        "lang"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "lang"
      }
    },
    {
      "id": "iw399",
      "tr": "yeni",
      "de": "neu",
      "deAnswers": [
        "neu"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "neu"
      }
    },
    {
      "id": "iw400",
      "tr": "güçlü",
      "de": "stark",
      "deAnswers": [
        "stark"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "stark"
      }
    },
    {
      "id": "iw401",
      "tr": "yorgun",
      "de": "müde",
      "deAnswers": [
        "müde"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "müde"
      }
    },
    {
      "id": "iw402",
      "tr": "aç",
      "de": "hungrig",
      "deAnswers": [
        "hungrig"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "hungrig"
      }
    },
    {
      "id": "iw403",
      "tr": "mutlu",
      "de": "glücklich",
      "deAnswers": [
        "glücklich"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "glücklich"
      }
    },
    {
      "id": "iw404",
      "tr": "pahalı",
      "de": "teuer",
      "deAnswers": [
        "teuer"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "teuer"
      }
    },
    {
      "id": "iw405",
      "tr": "ucuz",
      "de": "billig",
      "deAnswers": [
        "billig"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "billig"
      }
    },
    {
      "id": "iw406",
      "tr": "hızlı",
      "de": "schnell",
      "deAnswers": [
        "schnell"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "schnell"
      }
    },
    {
      "id": "iw407",
      "tr": "yavaş",
      "de": "langsam",
      "deAnswers": [
        "langsam"
      ],
      "type": "adj",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "positive": "langsam"
      }
    },
    {
      "id": "iw408",
      "tr": "görmek",
      "de": "sehen",
      "deAnswers": [
        "sehen"
      ],
      "type": "verb",
      "themes": [],
      "interest": true,
      "aorist": "görür",
      "deGrammar": {
        "infinitive": "sehen",
        "present": [
          "sehe",
          "siehst",
          "sieht",
          "sehen",
          "seht",
          "sehen"
        ],
        "participle": "gesehen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "gör",
      "progressiveStem": "gör",
      "voice": {
        "passive": "görül"
      }
    },
    {
      "id": "iw409",
      "tr": "oynamak",
      "de": "spielen",
      "deAnswers": [
        "spielen"
      ],
      "type": "verb",
      "themes": [],
      "interest": true,
      "aorist": "oynar",
      "deGrammar": {
        "infinitive": "spielen",
        "present": [
          "spiele",
          "spielst",
          "spielt",
          "spielen",
          "spielt",
          "spielen"
        ],
        "participle": "gespielt",
        "auxiliary": "haben",
        "frame": "game-object"
      },
      "stem": "oyna",
      "progressiveStem": "oyn"
    },
    {
      "id": "iw410",
      "tr": "iç",
      "de": "Inneres",
      "deAnswers": [
        "Inneres"
      ],
      "type": "noun",
      "themes": [],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Innere",
        "plural": "Innere"
      },
      "semantic": "thing"
    },
    {
      "id": "iw411",
      "tr": "telefon etmek",
      "de": "anrufen",
      "deAnswers": [
        "anrufen"
      ],
      "type": "verb",
      "themes": [],
      "interest": true,
      "aorist": "telefon eder",
      "deGrammar": {
        "infinitive": "anrufen",
        "present": [
          "rufe an",
          "rufst an",
          "ruft an",
          "rufen an",
          "ruft an",
          "rufen an"
        ],
        "participle": "angerufen",
        "auxiliary": "haben",
        "frame": "person-object",
        "separable": "an"
      },
      "stem": "telefon et",
      "progressiveStem": "telefon ed",
      "vowelStem": "telefon ed"
    },
    {
      "id": "iw412",
      "tr": "matematik",
      "de": "Mathematik",
      "deAnswers": [
        "Mathematik"
      ],
      "type": "noun",
      "themes": [
        "T04"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "f",
        "singular": "Mathematik",
        "plural": "Mathematik"
      },
      "semantic": "thing"
    },
    {
      "id": "iw413",
      "tr": "yapmak",
      "de": "machen",
      "deAnswers": [
        "machen"
      ],
      "type": "verb",
      "themes": [
        "T04",
        "T20"
      ],
      "interest": true,
      "aorist": "yapar",
      "deGrammar": {
        "infinitive": "machen",
        "present": [
          "mache",
          "machst",
          "macht",
          "machen",
          "macht",
          "machen"
        ],
        "participle": "gemacht",
        "auxiliary": "haben",
        "frame": "object"
      },
      "stem": "yap",
      "progressiveStem": "yap",
      "voice": {
        "causative": "yaptır",
        "passive": "yapıl"
      }
    },
    {
      "id": "iw414",
      "tr": "dans",
      "de": "Tanz",
      "deAnswers": [
        "Tanz"
      ],
      "type": "noun",
      "themes": [
        "T02",
        "T18"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Tanz",
        "plural": "Tänze"
      },
      "semantic": "thing"
    },
    {
      "id": "iw415",
      "tr": "etmek",
      "de": "tun; Hilfsverb in festen Verbindungen",
      "deAnswers": [
        "tun; Hilfsverb in festen Verbindungen"
      ],
      "type": "verb",
      "themes": [],
      "interest": true,
      "aorist": "eder",
      "deGrammar": {
        "infinitive": "tun",
        "present": [
          "tue",
          "tust",
          "tut",
          "tun",
          "tut",
          "tun"
        ],
        "participle": "getan",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "et",
      "progressiveStem": "ed",
      "vowelStem": "ed",
      "voice": {
        "passive": "edil"
      }
    },
    {
      "id": "iw416",
      "tr": "dans etmek",
      "de": "tanzen",
      "deAnswers": [
        "tanzen"
      ],
      "type": "verb",
      "themes": [
        "T02",
        "T18"
      ],
      "interest": true,
      "aorist": "dans eder",
      "deGrammar": {
        "infinitive": "tanzen",
        "present": [
          "tanze",
          "tanzt",
          "tanzt",
          "tanzen",
          "tanzt",
          "tanzen"
        ],
        "participle": "getanzt",
        "auxiliary": "haben",
        "frame": "simple"
      },
      "stem": "dans et",
      "progressiveStem": "dans ed",
      "vowelStem": "dans ed"
    },
    {
      "id": "iw417",
      "tr": "içecek",
      "de": "Getränk",
      "deAnswers": [
        "Getränk"
      ],
      "type": "noun",
      "themes": [
        "T03",
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Getränk",
        "plural": "Getränke"
      },
      "semantic": "thing",
      "soften": "içeceğ"
    },
    {
      "id": "iw418",
      "tr": "spor",
      "de": "Sport",
      "deAnswers": [
        "Sport"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Sport",
        "plural": "Sportarten"
      },
      "semantic": "thing"
    },
    {
      "id": "iw419",
      "tr": "salon",
      "de": "Saal; in spor salonu: Sporthalle / Fitnessstudio",
      "deAnswers": [
        "Saal; in spor salonu: Sporthalle",
        "Fitnessstudio"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Saal",
        "plural": "Säle",
        "at": "in dem Saal",
        "to": "zu dem Saal",
        "from": "aus dem Saal"
      },
      "semantic": "place"
    },
    {
      "id": "iw420",
      "tr": "girmek",
      "de": "hineingehen",
      "deAnswers": [
        "hineingehen"
      ],
      "type": "verb",
      "themes": [
        "T10",
        "T17"
      ],
      "interest": true,
      "aorist": "girer",
      "deGrammar": {
        "infinitive": "hineingehen",
        "present": [
          "gehe hinein",
          "gehst hinein",
          "geht hinein",
          "gehen hinein",
          "geht hinein",
          "gehen hinein"
        ],
        "participle": "hineingegangen",
        "auxiliary": "sein",
        "frame": "motion",
        "separable": "hinein"
      },
      "stem": "gir",
      "progressiveStem": "gir"
    },
    {
      "id": "iw421",
      "tr": "söylemek",
      "de": "sagen",
      "deAnswers": [
        "sagen"
      ],
      "type": "verb",
      "themes": [
        "T01",
        "T05"
      ],
      "interest": true,
      "aorist": "söyler",
      "deGrammar": {
        "infinitive": "sagen",
        "present": [
          "sage",
          "sagst",
          "sagt",
          "sagen",
          "sagt",
          "sagen"
        ],
        "participle": "gesagt",
        "auxiliary": "haben",
        "frame": "complement"
      },
      "stem": "söyle",
      "progressiveStem": "söyl"
    },
    {
      "id": "iw422",
      "tr": "protein içeceği",
      "de": "Proteindrink / Proteinshake",
      "deAnswers": [
        "Proteindrink",
        "Proteinshake"
      ],
      "type": "noun",
      "themes": [
        "T03",
        "T13"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "m",
        "singular": "Proteinshake",
        "plural": "Proteinshakes"
      },
      "semantic": "drink",
      "compoundParts": [
        "protein",
        "içecek"
      ]
    },
    {
      "id": "iw423",
      "tr": "spor salonu",
      "de": "Fitnessstudio / Sporthalle",
      "deAnswers": [
        "Fitnessstudio",
        "Sporthalle"
      ],
      "type": "noun",
      "themes": [
        "T03"
      ],
      "interest": true,
      "deGrammar": {
        "gender": "n",
        "singular": "Fitnessstudio",
        "plural": "Fitnessstudios",
        "at": "in dem Fitnessstudio",
        "to": "zu dem Fitnessstudio",
        "from": "aus dem Fitnessstudio"
      },
      "semantic": "place",
      "compoundParts": [
        "spor",
        "salon"
      ]
    },
    {
      "id": "ic423",
      "tr": "chia",
      "de": "Chia",
      "deAnswers": [
        "Chia"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "f",
        "singular": "Chia",
        "plural": "Chia"
      }
    },
    {
      "id": "ic424",
      "tr": "tohum",
      "de": "Samen",
      "deAnswers": [
        "Samen"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "m",
        "singular": "Samen",
        "plural": "Samen"
      }
    },
    {
      "id": "ic425",
      "tr": "meyve",
      "de": "Frucht",
      "deAnswers": [
        "Frucht"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "f",
        "singular": "Frucht",
        "plural": "Früchte"
      }
    },
    {
      "id": "ic426",
      "tr": "Hindistan",
      "de": "Indien",
      "deAnswers": [
        "Indien"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "n",
        "singular": "Indien",
        "plural": "Indien"
      },
      "properName": true,
      "harmonyStem": "hindistan"
    },
    {
      "id": "ic427",
      "tr": "ceviz",
      "de": "Walnuss",
      "deAnswers": [
        "Walnuss"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "food",
      "deGrammar": {
        "gender": "f",
        "singular": "Walnuss",
        "plural": "Walnüsse"
      }
    },
    {
      "id": "ic428",
      "tr": "Noel",
      "de": "Weihnachten",
      "deAnswers": [
        "Weihnachten"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "n",
        "singular": "Weihnachten",
        "plural": "Weihnachten"
      },
      "properName": true,
      "harmonyStem": "noel"
    },
    {
      "id": "ic429",
      "tr": "pazar",
      "de": "Markt",
      "deAnswers": [
        "Markt"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "place",
      "deGrammar": {
        "gender": "m",
        "singular": "Markt",
        "plural": "Märkte",
        "at": "in dem Markt",
        "to": "zu dem Markt",
        "from": "aus dem Markt"
      }
    },
    {
      "id": "ic430",
      "tr": "hafta",
      "de": "Woche",
      "deAnswers": [
        "Woche"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "f",
        "singular": "Woche",
        "plural": "Wochen"
      }
    },
    {
      "id": "ic431",
      "tr": "son",
      "de": "Ende",
      "deAnswers": [
        "Ende"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "n",
        "singular": "Ende",
        "plural": "Enden"
      }
    },
    {
      "id": "ic432",
      "tr": "şeref",
      "de": "Ehre",
      "deAnswers": [
        "Ehre"
      ],
      "type": "noun",
      "interest": true,
      "themes": [],
      "semantic": "thing",
      "deGrammar": {
        "gender": "f",
        "singular": "Ehre",
        "plural": "Ehren"
      }
    },
    {
      "id": "in001",
      "tr": "Mert",
      "de": "Mert",
      "deAnswers": [
        "Mert"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "mert",
      "semantic": "human",
      "interest": true,
      "themes": [
        "T05",
        "T18",
        "T20",
        "T21"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Mert",
        "plural": "Mert"
      }
    },
    {
      "id": "in002",
      "tr": "André",
      "de": "André",
      "deAnswers": [
        "André"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "andre",
      "semantic": "human",
      "interest": true,
      "themes": [
        "T05",
        "T18",
        "T19",
        "T20",
        "T21",
        "T22"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "André",
        "plural": "André"
      }
    },
    {
      "id": "in003",
      "tr": "Ben",
      "de": "Ben",
      "deAnswers": [
        "Ben"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "ben",
      "semantic": "animal",
      "interest": true,
      "themes": [
        "T07",
        "T19"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Ben",
        "plural": "Ben"
      }
    },
    {
      "id": "in004",
      "tr": "Kirby",
      "de": "Kirby",
      "deAnswers": [
        "Kirby"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "körbi",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Kirby",
        "plural": "Kirby"
      }
    },
    {
      "id": "in005",
      "tr": "Korra",
      "de": "Korra",
      "deAnswers": [
        "Korra"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "korra",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Korra",
        "plural": "Korra"
      }
    },
    {
      "id": "in006",
      "tr": "Mario",
      "de": "Mario",
      "deAnswers": [
        "Mario"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "mario",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Mario",
        "plural": "Mario"
      }
    },
    {
      "id": "in007",
      "tr": "Luigi",
      "de": "Luigi",
      "deAnswers": [
        "Luigi"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "luici",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Luigi",
        "plural": "Luigi"
      }
    },
    {
      "id": "in008",
      "tr": "Peach",
      "de": "Peach",
      "deAnswers": [
        "Peach"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "piç",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Peach",
        "plural": "Peach"
      }
    },
    {
      "id": "in009",
      "tr": "Bowser",
      "de": "Bowser",
      "deAnswers": [
        "Bowser"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "bauzır",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Bowser",
        "plural": "Bowser"
      }
    },
    {
      "id": "in010",
      "tr": "Zelda",
      "de": "Zelda",
      "deAnswers": [
        "Zelda"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "zelda",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Zelda",
        "plural": "Zelda"
      }
    },
    {
      "id": "in011",
      "tr": "Link",
      "de": "Link",
      "deAnswers": [
        "Link"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "link",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Link",
        "plural": "Link"
      }
    },
    {
      "id": "in012",
      "tr": "Aang",
      "de": "Aang",
      "deAnswers": [
        "Aang"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "ang",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Aang",
        "plural": "Aang"
      }
    },
    {
      "id": "in013",
      "tr": "Gir",
      "de": "Gir",
      "deAnswers": [
        "Gir"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "gir",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Gir",
        "plural": "Gir"
      }
    },
    {
      "id": "in014",
      "tr": "Zim",
      "de": "Zim",
      "deAnswers": [
        "Zim"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "zim",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Zim",
        "plural": "Zim"
      }
    },
    {
      "id": "in015",
      "tr": "Phineas",
      "de": "Phineas",
      "deAnswers": [
        "Phineas"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "finiıs",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Phineas",
        "plural": "Phineas"
      }
    },
    {
      "id": "in016",
      "tr": "Ferb",
      "de": "Ferb",
      "deAnswers": [
        "Ferb"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "förb",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Ferb",
        "plural": "Ferb"
      }
    },
    {
      "id": "in017",
      "tr": "SüngerBob",
      "de": "SpongeBob",
      "deAnswers": [
        "SpongeBob"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "süngerbob",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "SpongeBob",
        "plural": "SüngerBob"
      }
    },
    {
      "id": "in018",
      "tr": "Mio",
      "de": "Mio",
      "deAnswers": [
        "Mio"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "mio",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T11"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Mio",
        "plural": "Mio"
      }
    },
    {
      "id": "in019",
      "tr": "Zoe",
      "de": "Zoe",
      "deAnswers": [
        "Zoe"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "zoi",
      "semantic": "fiction",
      "interest": true,
      "themes": [
        "T11"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Zoe",
        "plural": "Zoe"
      }
    },
    {
      "id": "in020",
      "tr": "Merz",
      "de": "Merz",
      "deAnswers": [
        "Merz"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "merts",
      "semantic": "human",
      "interest": true,
      "themes": [
        "T23"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Merz",
        "plural": "Merz"
      }
    },
    {
      "id": "in021",
      "tr": "Paris",
      "de": "Paris",
      "deAnswers": [
        "Paris"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "paris",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T15"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Paris",
        "plural": "Paris",
        "at": "in Paris",
        "to": "nach Paris",
        "from": "aus Paris"
      }
    },
    {
      "id": "in022",
      "tr": "Münster",
      "de": "Münster",
      "deAnswers": [
        "Münster"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "münster",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T15"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Münster",
        "plural": "Münster",
        "at": "in Münster",
        "to": "nach Münster",
        "from": "aus Münster"
      }
    },
    {
      "id": "in023",
      "tr": "Roma",
      "de": "Rom",
      "deAnswers": [
        "Rom"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "roma",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T04"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Rom",
        "plural": "Roma",
        "at": "in Rom",
        "to": "nach Rom",
        "from": "aus Rom"
      }
    },
    {
      "id": "in024",
      "tr": "Mısır",
      "de": "Ägypten",
      "deAnswers": [
        "Ägypten"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "mısır",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T04"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Ägypten",
        "plural": "Mısır",
        "at": "in Ägypten",
        "to": "nach Ägypten",
        "from": "aus Ägypten"
      }
    },
    {
      "id": "in025",
      "tr": "RTL",
      "de": "RTL",
      "deAnswers": [
        "RTL"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "er te el",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T01"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "RTL",
        "plural": "RTL"
      }
    },
    {
      "id": "in026",
      "tr": "RTLZWEI",
      "de": "RTLZWEI",
      "deAnswers": [
        "RTLZWEI"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "er te el tsvay",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T01"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "RTLZWEI",
        "plural": "RTLZWEI"
      }
    },
    {
      "id": "in027",
      "tr": "Frauentausch",
      "de": "Frauentausch",
      "deAnswers": [
        "Frauentausch"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "frauentausch",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T01"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Frauentausch",
        "plural": "Frauentausch"
      }
    },
    {
      "id": "in028",
      "tr": "Dschungelcamp",
      "de": "Dschungelcamp",
      "deAnswers": [
        "Dschungelcamp"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "dschungelkemp",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T01"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Dschungelcamp",
        "plural": "Dschungelcamp"
      }
    },
    {
      "id": "in029",
      "tr": "Mario Party",
      "de": "Mario Party",
      "deAnswers": [
        "Mario Party"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "mario parti",
      "semantic": "game",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Mario Party",
        "plural": "Mario Party"
      }
    },
    {
      "id": "in030",
      "tr": "The Sims",
      "de": "The Sims",
      "deAnswers": [
        "The Sims"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "dı sims",
      "semantic": "game",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "The Sims",
        "plural": "The Sims"
      }
    },
    {
      "id": "in031",
      "tr": "Splatoon",
      "de": "Splatoon",
      "deAnswers": [
        "Splatoon"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "splətun",
      "semantic": "game",
      "interest": true,
      "themes": [
        "T02"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Splatoon",
        "plural": "Splatoon"
      }
    },
    {
      "id": "in032",
      "tr": "Splatoon 3",
      "de": "Splatoon 3",
      "deAnswers": [
        "Splatoon 3"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "splətun üç",
      "semantic": "game",
      "interest": true,
      "themes": [
        "T11"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Splatoon 3",
        "plural": "Splatoon 3"
      }
    },
    {
      "id": "in033",
      "tr": "Salmon Run",
      "de": "Salmon Run",
      "deAnswers": [
        "Salmon Run"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "selmın ran",
      "semantic": "game",
      "interest": true,
      "themes": [
        "T11"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Salmon Run",
        "plural": "Salmon Run"
      }
    },
    {
      "id": "in034",
      "tr": "Split Fiction",
      "de": "Split Fiction",
      "deAnswers": [
        "Split Fiction"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "split fikşın",
      "semantic": "game",
      "interest": true,
      "themes": [
        "T11"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Split Fiction",
        "plural": "Split Fiction"
      }
    },
    {
      "id": "in035",
      "tr": "Black Mirror",
      "de": "Black Mirror",
      "deAnswers": [
        "Black Mirror"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "blek mirır",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Black Mirror",
        "plural": "Black Mirror"
      }
    },
    {
      "id": "in036",
      "tr": "Invader Zim",
      "de": "Invader Zim",
      "deAnswers": [
        "Invader Zim"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "inveydır zim",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Invader Zim",
        "plural": "Invader Zim"
      }
    },
    {
      "id": "in037",
      "tr": "Family Guy",
      "de": "Family Guy",
      "deAnswers": [
        "Family Guy"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "femili gay",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Family Guy",
        "plural": "Family Guy"
      }
    },
    {
      "id": "in038",
      "tr": "Drawn Together",
      "de": "Drawn Together",
      "deAnswers": [
        "Drawn Together"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "dron tugeđır",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Drawn Together",
        "plural": "Drawn Together"
      }
    },
    {
      "id": "in039",
      "tr": "Avatar",
      "de": "Avatar",
      "deAnswers": [
        "Avatar"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "avatar",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Avatar",
        "plural": "Avatar"
      }
    },
    {
      "id": "in040",
      "tr": "TikTok",
      "de": "TikTok",
      "deAnswers": [
        "TikTok"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "tiktok",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T08"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "TikTok",
        "plural": "TikTok"
      }
    },
    {
      "id": "in041",
      "tr": "Netflix",
      "de": "Netflix",
      "deAnswers": [
        "Netflix"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "netfliks",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T08"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Netflix",
        "plural": "Netflix"
      }
    },
    {
      "id": "in042",
      "tr": "Disney+",
      "de": "Disney+",
      "deAnswers": [
        "Disney+"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "disney plas",
      "semantic": "media",
      "interest": true,
      "themes": [
        "T08"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Disney+",
        "plural": "Disney+"
      }
    },
    {
      "id": "in043",
      "tr": "PS5",
      "de": "PS5",
      "deAnswers": [
        "PS5"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "pe es beş",
      "semantic": "device",
      "interest": true,
      "themes": [
        "T10"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "PS5",
        "plural": "PS5"
      }
    },
    {
      "id": "in044",
      "tr": "Nintendo Switch",
      "de": "Nintendo Switch",
      "deAnswers": [
        "Nintendo Switch"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "nintendo sviç",
      "semantic": "device",
      "interest": true,
      "themes": [
        "T10"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Nintendo Switch",
        "plural": "Nintendo Switch"
      }
    },
    {
      "id": "in045",
      "tr": "Quest 3",
      "de": "Quest 3",
      "deAnswers": [
        "Quest 3"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "kvest üç",
      "semantic": "device",
      "interest": true,
      "themes": [
        "T10"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Quest 3",
        "plural": "Quest 3"
      }
    },
    {
      "id": "in046",
      "tr": "Burger King",
      "de": "Burger King",
      "deAnswers": [
        "Burger King"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "börgır king",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T05"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Burger King",
        "plural": "Burger King",
        "at": "bei Burger King",
        "to": "zu Burger King",
        "from": "aus Burger King"
      }
    },
    {
      "id": "in047",
      "tr": "Plant-based Long Chicken",
      "de": "Plant-based Long Chicken",
      "deAnswers": [
        "Plant-based Long Chicken"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "plant beyst long çikın",
      "semantic": "food",
      "interest": true,
      "themes": [
        "T05"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Plant-based Long Chicken",
        "plural": "Plant-based Long Chicken"
      }
    },
    {
      "id": "in048",
      "tr": "Peter Pane",
      "de": "Peter Pane",
      "deAnswers": [
        "Peter Pane"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "peter pane",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T05"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Peter Pane",
        "plural": "Peter Pane",
        "at": "bei Peter Pane",
        "to": "zu Peter Pane",
        "from": "aus Peter Pane"
      }
    },
    {
      "id": "in049",
      "tr": "Kaufland",
      "de": "Kaufland",
      "deAnswers": [
        "Kaufland"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "kauflant",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T12"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Kaufland",
        "plural": "Kaufland",
        "at": "bei Kaufland",
        "to": "zu Kaufland",
        "from": "aus Kaufland"
      }
    },
    {
      "id": "in050",
      "tr": "EDEKA",
      "de": "EDEKA",
      "deAnswers": [
        "EDEKA"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "edeka",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T12"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "EDEKA",
        "plural": "EDEKA",
        "at": "bei EDEKA",
        "to": "zu EDEKA",
        "from": "aus EDEKA"
      }
    },
    {
      "id": "in051",
      "tr": "REWE",
      "de": "REWE",
      "deAnswers": [
        "REWE"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "reve",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T12"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "REWE",
        "plural": "REWE",
        "at": "bei REWE",
        "to": "zu REWE",
        "from": "aus REWE"
      }
    },
    {
      "id": "in052",
      "tr": "ÁRO",
      "de": "ÁRO",
      "deAnswers": [
        "ÁRO"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "aro",
      "semantic": "place",
      "interest": true,
      "themes": [
        "T13",
        "T15"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "ÁRO",
        "plural": "ÁRO",
        "at": "bei ÁRO",
        "to": "zu ÁRO",
        "from": "aus ÁRO"
      }
    },
    {
      "id": "in053",
      "tr": "Red Bull",
      "de": "Red Bull",
      "deAnswers": [
        "Red Bull"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "red bul",
      "semantic": "drink",
      "interest": true,
      "themes": [
        "T13"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Red Bull",
        "plural": "Red Bull"
      }
    },
    {
      "id": "in054",
      "tr": "Donauwelle",
      "de": "Donauwelle",
      "deAnswers": [
        "Donauwelle"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "donauvellı",
      "semantic": "food",
      "interest": true,
      "themes": [
        "T13"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Donauwelle",
        "plural": "Donauwelle"
      }
    },
    {
      "id": "in055",
      "tr": "Jalapeño",
      "de": "Jalapeño",
      "deAnswers": [
        "Jalapeño"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "halapenyo",
      "semantic": "food",
      "interest": true,
      "themes": [
        "T16"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Jalapeño",
        "plural": "Jalapeño"
      }
    },
    {
      "id": "in056",
      "tr": "Sriracha",
      "de": "Sriracha",
      "deAnswers": [
        "Sriracha"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "siraça",
      "semantic": "food",
      "interest": true,
      "themes": [
        "T16"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Sriracha",
        "plural": "Sriracha"
      }
    },
    {
      "id": "in057",
      "tr": "Book 5",
      "de": "Book 5",
      "deAnswers": [
        "Book 5"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "buk beş",
      "semantic": "device",
      "interest": true,
      "themes": [
        "T17"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Book 5",
        "plural": "Book 5"
      }
    },
    {
      "id": "in058",
      "tr": "Samsung Galaxy S25+",
      "de": "Samsung Galaxy S25+",
      "deAnswers": [
        "Samsung Galaxy S25+"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "samsung galaksi es yirmi beş plas",
      "semantic": "device",
      "interest": true,
      "themes": [
        "T17"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Samsung Galaxy S25+",
        "plural": "Samsung Galaxy S25+"
      }
    },
    {
      "id": "in059",
      "tr": "Nintendo Switch 2",
      "de": "Nintendo Switch 2",
      "deAnswers": [
        "Nintendo Switch 2"
      ],
      "type": "noun",
      "properName": true,
      "harmonyStem": "nintendo sviç iki",
      "semantic": "device",
      "interest": true,
      "themes": [
        "T17"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Nintendo Switch 2",
        "plural": "Nintendo Switch 2"
      }
    },
    {
      "id": "ix001",
      "tr": "pembe",
      "de": "rosa",
      "type": "adj",
      "deGrammar": {
        "positive": "rosa"
      },
      "themes": [
        "T02",
        "T21"
      ],
      "deAnswers": [
        "rosa"
      ],
      "interest": true
    },
    {
      "id": "ix002",
      "tr": "üzüm suyu",
      "de": "Traubensaft",
      "type": "noun",
      "semantic": "drink",
      "compoundParts": [
        "üzüm",
        "su"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Traubensaft",
        "plural": "Traubensäfte"
      },
      "themes": [
        "T13"
      ],
      "deAnswers": [
        "Traubensaft"
      ],
      "interest": true
    },
    {
      "id": "ix003",
      "tr": "muzlu ekmek",
      "de": "Bananenbrot",
      "type": "noun",
      "semantic": "food",
      "deGrammar": {
        "gender": "n",
        "singular": "Bananenbrot",
        "plural": "Bananenbrote"
      },
      "themes": [
        "T13"
      ],
      "deAnswers": [
        "Bananenbrot"
      ],
      "interest": true,
      "derivedPhrase": [
        {
          "tr": "muz",
          "derivation": "with"
        },
        {
          "tr": "ekmek"
        }
      ]
    },
    {
      "id": "ix004",
      "tr": "cheesecake",
      "de": "Käsekuchen",
      "type": "noun",
      "semantic": "food",
      "deGrammar": {
        "gender": "m",
        "singular": "Käsekuchen",
        "plural": "Käsekuchen"
      },
      "themes": [
        "T13"
      ],
      "deAnswers": [
        "Käsekuchen"
      ],
      "interest": true
    },
    {
      "id": "ix005",
      "tr": "çiş",
      "de": "Pipi",
      "type": "noun",
      "semantic": "thing",
      "deGrammar": {
        "gender": "n",
        "singular": "Pipi",
        "plural": "Pipi"
      },
      "themes": [
        "T23"
      ],
      "deAnswers": [
        "Pipi"
      ],
      "interest": true
    },
    {
      "id": "ird772567a04",
      "tr": "penis",
      "de": "Penis",
      "type": "noun",
      "semantic": "body",
      "themes": [
        "T23"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Penis",
        "plural": "Penisse"
      },
      "deAnswers": [
        "Penis"
      ],
      "interest": true
    },
    {
      "id": "ir8c640b441a",
      "tr": "kafe",
      "de": "Café",
      "type": "noun",
      "semantic": "place",
      "themes": [
        "T15",
        "T05"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Café",
        "plural": "Cafés",
        "at": "in dem Café",
        "to": "zu dem Café",
        "from": "aus dem Café"
      },
      "deAnswers": [
        "Café"
      ],
      "interest": true
    },
    {
      "id": "ir76a031057e",
      "tr": "uygulama",
      "de": "App",
      "type": "noun",
      "semantic": "device",
      "themes": [
        "T08",
        "T10"
      ],
      "deGrammar": {
        "gender": "f",
        "singular": "App",
        "plural": "Apps"
      },
      "deAnswers": [
        "App"
      ],
      "interest": true
    },
    {
      "id": "ira37de9f233",
      "tr": "çocuk",
      "de": "Kind",
      "type": "noun",
      "semantic": "child",
      "themes": [
        "T22"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Kind",
        "plural": "Kinder"
      },
      "soften": "çocuğ",
      "deAnswers": [
        "Kind"
      ],
      "interest": true
    },
    {
      "id": "ir58c99659b4",
      "tr": "yürüyüş",
      "de": "Spaziergang",
      "type": "noun",
      "semantic": "thing",
      "themes": [
        "T03",
        "T05"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Spaziergang",
        "plural": "Spaziergänge"
      },
      "deAnswers": [
        "Spaziergang"
      ],
      "interest": true
    },
    {
      "id": "irdd798f8475",
      "tr": "buzdolabı",
      "de": "Kühlschrank",
      "type": "noun",
      "semantic": "device",
      "themes": [
        "T20"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Kühlschrank",
        "plural": "Kühlschränke"
      },
      "deAnswers": [
        "Kühlschrank"
      ],
      "interest": true
    },
    {
      "id": "ire917c02cce",
      "tr": "pantolon",
      "de": "Hose",
      "type": "noun",
      "semantic": "clothing",
      "themes": [
        "T06"
      ],
      "deGrammar": {
        "gender": "f",
        "singular": "Hose",
        "plural": "Hosen"
      },
      "deAnswers": [
        "Hose"
      ],
      "interest": true
    },
    {
      "id": "ir6ee068099d",
      "tr": "yarı",
      "de": "Hälfte",
      "type": "noun",
      "semantic": "thing",
      "themes": [
        "T13"
      ],
      "deGrammar": {
        "gender": "f",
        "singular": "Hälfte",
        "plural": "Hälften"
      },
      "deAnswers": [
        "Hälfte"
      ],
      "interest": true
    },
    {
      "id": "irbf508df077",
      "tr": "metin",
      "de": "Text",
      "type": "noun",
      "semantic": "problem",
      "themes": [
        "T04"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Text",
        "plural": "Texte"
      },
      "vowelLoss": "metn",
      "deAnswers": [
        "Text"
      ],
      "interest": true
    },
    {
      "id": "ir8bb2644b7f",
      "tr": "yer",
      "de": "Boden",
      "type": "noun",
      "semantic": "place",
      "themes": [
        "T17"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Boden",
        "plural": "Böden",
        "at": "in dem Boden",
        "to": "zu dem Boden",
        "from": "aus dem Boden"
      },
      "deAnswers": [
        "Boden"
      ],
      "interest": true
    },
    {
      "id": "ir549d150861",
      "tr": "kırıntı",
      "de": "Krümel",
      "type": "noun",
      "semantic": "food",
      "themes": [
        "T17"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Krümel",
        "plural": "Krümel"
      },
      "deAnswers": [
        "Krümel"
      ],
      "interest": true
    },
    {
      "id": "ir8b489fed61",
      "tr": "kapak",
      "de": "Umschlag",
      "type": "noun",
      "semantic": "thing",
      "themes": [
        "T04"
      ],
      "deGrammar": {
        "gender": "m",
        "singular": "Umschlag",
        "plural": "Umschläge"
      },
      "soften": "kapağ",
      "deAnswers": [
        "Umschlag"
      ],
      "interest": true
    },
    {
      "id": "irfa091631b2",
      "tr": "kahkaha",
      "de": "lautes Lachen",
      "type": "noun",
      "semantic": "thing",
      "themes": [
        "T23"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "lautes Lachen",
        "plural": "Gelächter"
      },
      "deAnswers": [
        "lautes Lachen"
      ],
      "interest": true
    },
    {
      "id": "irf917dd860e",
      "tr": "sıkıcı",
      "de": "langweilig",
      "type": "adj",
      "deGrammar": {
        "positive": "langweilig"
      },
      "themes": [
        "T01"
      ],
      "deAnswers": [
        "langweilig"
      ],
      "interest": true
    },
    {
      "id": "ira61cf0e3ae",
      "tr": "altın",
      "de": "golden",
      "type": "adj",
      "deGrammar": {
        "positive": "golden"
      },
      "themes": [
        "T11"
      ],
      "deAnswers": [
        "golden"
      ],
      "interest": true
    },
    {
      "id": "irec900036c3",
      "tr": "yine",
      "de": "wieder",
      "type": "adverb",
      "themes": [
        "T11"
      ],
      "deAnswers": [
        "wieder"
      ],
      "interest": true
    },
    {
      "id": "ircdd7c88e00",
      "tr": "şimdi",
      "de": "jetzt",
      "type": "adverb",
      "themes": [
        "T03"
      ],
      "deAnswers": [
        "jetzt"
      ],
      "interest": true
    },
    {
      "id": "ir3cade42e07",
      "tr": "hâlâ",
      "de": "immer noch",
      "type": "adverb",
      "themes": [
        "T17"
      ],
      "deAnswers": [
        "immer noch"
      ],
      "interest": true
    },
    {
      "id": "ir0856651347",
      "tr": "siktir",
      "de": "verpiss dich (derb)",
      "type": "interjection",
      "themes": [
        "T23"
      ],
      "deAnswers": [
        "verpiss dich (derb)"
      ],
      "interest": true
    },
    {
      "id": "ir49c5768677",
      "tr": "anlatmak",
      "de": "erklären",
      "type": "verb",
      "stem": "anlat",
      "progressiveStem": "anlat",
      "aorist": "anlatır",
      "themes": [
        "T04"
      ],
      "deGrammar": {
        "infinitive": "erklären",
        "present": [
          "erkläre",
          "erklärst",
          "erklärt",
          "erklären",
          "erklärt",
          "erklären"
        ],
        "participle": "erklärt",
        "auxiliary": "haben",
        "frame": "problem-object"
      },
      "deAnswers": [
        "erklären"
      ],
      "interest": true
    },
    {
      "id": "ir2d3bbac358",
      "tr": "kalmak",
      "de": "bleiben",
      "type": "verb",
      "stem": "kal",
      "progressiveStem": "kal",
      "aorist": "kalır",
      "themes": [
        "T19"
      ],
      "deGrammar": {
        "infinitive": "bleiben",
        "present": [
          "bleibe",
          "bleibst",
          "bleibt",
          "bleiben",
          "bleibt",
          "bleiben"
        ],
        "participle": "geblieben",
        "auxiliary": "sein",
        "frame": "simple"
      },
      "deAnswers": [
        "bleiben"
      ],
      "interest": true
    },
    {
      "id": "irc40ee240f9",
      "tr": "toplamak",
      "de": "sammeln",
      "type": "verb",
      "stem": "topla",
      "progressiveStem": "topl",
      "aorist": "toplar",
      "themes": [
        "T11"
      ],
      "deGrammar": {
        "infinitive": "sammeln",
        "present": [
          "sammle",
          "sammelst",
          "sammelt",
          "sammeln",
          "sammelt",
          "sammeln"
        ],
        "participle": "gesammelt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "deAnswers": [
        "sammeln"
      ],
      "interest": true,
      "voice": {
        "passive": "toplan"
      }
    },
    {
      "id": "irc7bf75f5c7",
      "tr": "bitirmek",
      "de": "erledigen",
      "type": "verb",
      "stem": "bitir",
      "progressiveStem": "bitir",
      "aorist": "bitirir",
      "themes": [
        "T12"
      ],
      "deGrammar": {
        "infinitive": "erledigen",
        "present": [
          "erledige",
          "erledigst",
          "erledigt",
          "erledigen",
          "erledigt",
          "erledigen"
        ],
        "participle": "erledigt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "deAnswers": [
        "erledigen"
      ],
      "interest": true
    },
    {
      "id": "ir5c682c70a6",
      "tr": "çıkmak",
      "de": "aufbrechen",
      "type": "verb",
      "stem": "çık",
      "progressiveStem": "çık",
      "aorist": "çıkar",
      "themes": [
        "T03"
      ],
      "deGrammar": {
        "infinitive": "aufbrechen",
        "present": [
          "breche auf",
          "brichst auf",
          "bricht auf",
          "brechen auf",
          "brecht auf",
          "brechen auf"
        ],
        "participle": "aufgebrochen",
        "auxiliary": "sein",
        "frame": "motion",
        "separable": "auf"
      },
      "deAnswers": [
        "aufbrechen"
      ],
      "interest": true
    },
    {
      "id": "ir76b1837fd1",
      "tr": "öpüşmek",
      "de": "sich küssen",
      "type": "verb",
      "stem": "öpüş",
      "progressiveStem": "öpüş",
      "aorist": "öpüşür",
      "themes": [
        "T05"
      ],
      "deGrammar": {
        "infinitive": "sich küssen",
        "present": [
          "küsse mich",
          "küsst dich",
          "küsst sich",
          "küssen uns",
          "küsst euch",
          "küssen sich"
        ],
        "participle": "geküsst",
        "auxiliary": "haben",
        "frame": "simple",
        "reflexive": true
      },
      "deAnswers": [
        "sich küssen"
      ],
      "interest": true
    },
    {
      "id": "ir6bd2136e8b",
      "tr": "saklamak",
      "de": "aufbewahren",
      "type": "verb",
      "stem": "sakla",
      "progressiveStem": "sakl",
      "aorist": "saklar",
      "themes": [
        "T20"
      ],
      "deGrammar": {
        "infinitive": "aufbewahren",
        "present": [
          "bewahre auf",
          "bewahrst auf",
          "bewahrt auf",
          "bewahren auf",
          "bewahrt auf",
          "bewahren auf"
        ],
        "participle": "aufbewahrt",
        "auxiliary": "haben",
        "frame": "object",
        "separable": "auf"
      },
      "deAnswers": [
        "aufbewahren"
      ],
      "interest": true
    },
    {
      "id": "irdd1002cc89",
      "tr": "getirmek",
      "de": "mitbringen",
      "type": "verb",
      "stem": "getir",
      "progressiveStem": "getir",
      "aorist": "getirir",
      "themes": [
        "T13"
      ],
      "deGrammar": {
        "infinitive": "mitbringen",
        "present": [
          "bringe mit",
          "bringst mit",
          "bringt mit",
          "bringen mit",
          "bringt mit",
          "bringen mit"
        ],
        "participle": "mitgebracht",
        "auxiliary": "haben",
        "frame": "object",
        "separable": "mit"
      },
      "deAnswers": [
        "mitbringen"
      ],
      "interest": true
    },
    {
      "id": "ir61e5550b8b",
      "tr": "durdurmak",
      "de": "pausieren",
      "type": "verb",
      "stem": "durdur",
      "progressiveStem": "durdur",
      "aorist": "durdurur",
      "themes": [
        "T08"
      ],
      "deGrammar": {
        "infinitive": "pausieren",
        "present": [
          "pausiere",
          "pausierst",
          "pausiert",
          "pausieren",
          "pausiert",
          "pausieren"
        ],
        "participle": "pausiert",
        "auxiliary": "haben",
        "frame": "media-object"
      },
      "deAnswers": [
        "pausieren"
      ],
      "interest": true
    },
    {
      "id": "irdf45ec5f2f",
      "tr": "çekmek",
      "de": "machen",
      "type": "verb",
      "stem": "çek",
      "progressiveStem": "çek",
      "aorist": "çeker",
      "themes": [
        "T15"
      ],
      "deGrammar": {
        "infinitive": "machen",
        "present": [
          "mache",
          "machst",
          "macht",
          "machen",
          "macht",
          "machen"
        ],
        "participle": "gemacht",
        "auxiliary": "haben",
        "frame": "object"
      },
      "deAnswers": [
        "machen"
      ],
      "interest": true
    },
    {
      "id": "ir4d4dee8403",
      "tr": "yalamak",
      "de": "lecken",
      "type": "verb",
      "stem": "yala",
      "progressiveStem": "yal",
      "aorist": "yalar",
      "themes": [
        "T23"
      ],
      "deGrammar": {
        "infinitive": "lecken",
        "present": [
          "lecke",
          "leckst",
          "leckt",
          "lecken",
          "leckt",
          "lecken"
        ],
        "participle": "geleckt",
        "auxiliary": "haben",
        "frame": "object"
      },
      "deAnswers": [
        "lecken"
      ],
      "interest": true
    },
    {
      "id": "ir2b68af4a3d",
      "tr": "demek",
      "de": "sagen",
      "type": "verb",
      "stem": "de",
      "progressiveStem": "di",
      "aorist": "der",
      "themes": [
        "T23"
      ],
      "deGrammar": {
        "infinitive": "sagen",
        "present": [
          "sage",
          "sagst",
          "sagt",
          "sagen",
          "sagt",
          "sagen"
        ],
        "participle": "gesagt",
        "auxiliary": "haben",
        "frame": "complement"
      },
      "vowelStem": "di",
      "deAnswers": [
        "sagen"
      ],
      "interest": true
    },
    {
      "id": "ir557f8e9aa2",
      "tr": "duymak",
      "de": "hören",
      "type": "verb",
      "stem": "duy",
      "progressiveStem": "duy",
      "aorist": "duyar",
      "themes": [
        "T23"
      ],
      "deGrammar": {
        "infinitive": "hören",
        "present": [
          "höre",
          "hörst",
          "hört",
          "hören",
          "hört",
          "hören"
        ],
        "participle": "gehört",
        "auxiliary": "haben",
        "frame": "object"
      },
      "deAnswers": [
        "hören"
      ],
      "interest": true
    },
    {
      "id": "irb355ab80e4",
      "tr": "Fransız Devrimi",
      "de": "Französische Revolution",
      "type": "noun",
      "semantic": "problem",
      "themes": [
        "T04"
      ],
      "deGrammar": {
        "gender": "f",
        "singular": "Französische Revolution",
        "plural": "Französische Revolutionen"
      },
      "properName": true,
      "possessed": true,
      "harmonyStem": "fransız devrimi",
      "deAnswers": [
        "Französische Revolution"
      ],
      "interest": true
    },
    {
      "id": "ir8a59232024",
      "tr": "Phineas ve Ferb",
      "de": "Phineas und Ferb",
      "type": "noun",
      "semantic": "media",
      "themes": [
        "T09"
      ],
      "deGrammar": {
        "gender": "n",
        "singular": "Phineas und Ferb",
        "plural": "Phineas und Ferb"
      },
      "properName": true,
      "harmonyStem": "ferb",
      "deAnswers": [
        "Phineas und Ferb"
      ],
      "interest": true
    },
    {
      "id": "irdc9162fdf8",
      "tr": "okumak",
      "de": "lesen",
      "type": "verb",
      "stem": "oku",
      "progressiveStem": "oku",
      "aorist": "okur",
      "themes": [
        "T04"
      ],
      "deGrammar": {
        "infinitive": "lesen",
        "present": [
          "lese",
          "liest",
          "liest",
          "lesen",
          "lest",
          "lesen"
        ],
        "participle": "gelesen",
        "auxiliary": "haben",
        "frame": "object"
      },
      "deAnswers": [
        "lesen"
      ],
      "interest": true,
      "voice": {
        "passive": "okun",
        "causative": "okut"
      }
    }
  ],
  "references": [
    "RTL",
    "RTLZWEI",
    "Frauentausch",
    "Dschungelcamp",
    "Zelda",
    "Link",
    "Mario",
    "Luigi",
    "Peach",
    "Bowser",
    "Kirby",
    "Splatoon",
    "Mario Party",
    "The Sims",
    "Gym",
    "Roma",
    "Mısır",
    "Fransız Devrimi",
    "Mert",
    "André",
    "Burger King",
    "Plant-based Long Chicken",
    "Peter Pane",
    "Asyalı erkek",
    "ortadan ayrılmış saç",
    "Ben",
    "TikTok",
    "Netflix",
    "Disney+",
    "Black Mirror",
    "Phineas",
    "Ferb",
    "Phineas und Ferb",
    "Invader Zim",
    "Zim",
    "Gir",
    "SüngerBob",
    "Family Guy",
    "Drawn Together",
    "Avatar",
    "Aang",
    "Korra",
    "Die Legende von Korra",
    "PS5",
    "Nintendo Switch",
    "Quest 3",
    "Split Fiction",
    "Mio",
    "Zoe",
    "Splatoon 3",
    "Salmon Run",
    "Kaufland",
    "EDEKA",
    "REWE",
    "ÁRO",
    "Red Bull",
    "Bananenbrot",
    "Käsekuchen",
    "Donauwelle",
    "Kokos",
    "Matcha",
    "Paris",
    "Münster",
    "Eyfel Kulesi",
    "Jalapeño",
    "Sriracha",
    "Book 5",
    "Samsung Galaxy S25+",
    "Nintendo Switch 2",
    "robot süpürge",
    "Merz",
    "siktir git",
    "Merz, leck Eier!"
  ]
};
if(typeof module==='object'&&module.exports)module.exports=data;else root.AndreInterestData=data;
})(typeof globalThis==='object'?globalThis:this);
