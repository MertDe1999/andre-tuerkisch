# Andrés Türkisch

Persönliches Türkisch-Lernspiel für André mit Wortschatz, Grammatik, Worttrainer, Karteikarten und Satzbau.

[App öffnen](https://mertde1999.github.io/andre-tuerkisch/)

## Lokal starten

Die App benötigt keinen Build und keine Paketinstallation. `index.html` im Browser öffnen oder den Ordner über einen lokalen HTTP-Server ausliefern, beispielsweise mit Python:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Dann `http://127.0.0.1:8000/` öffnen. Der Lernstand wird lokal im jeweiligen Browser und Website-Ursprung gespeichert. Die lokale Ansicht und die veröffentlichte App haben daher getrennte Fortschritte.

## Bedienung

Die Navigation bietet **Wortschatz**, **Grammatik** und **Satzbau**. Satzbau zeigt **Alles gemischt** und 23 spielbare Interessen-Themen: Nintendo, Sport, Unterricht, Mert und André, Ben, Streaming, Koop, Einkaufen, Essen, Reisen und weitere persönliche Themen. Zurück führt zur Themenübersicht. Jede angefangene Themenaufgabe wird beim Wechsel und erneuten Öffnen fortgesetzt. Wörterfreischaltung und Karteikarten gehören zum Wortschatz. Die Einträge stehen nach Wortart zusammen: zuerst Nomen, Verben und Adjektive, anschließend die weiteren vorhandenen Kategorien. Innerhalb einer Wortart sind die türkischen Wörter alphabetisch sortiert.

Oberhalb der Suche erscheinen farbige Wortartenfilter, sobald mindestens ein Wort der jeweiligen Art in beiden Richtungen freigeschaltet ist. Antippen zeigt die passenden Einträge; erneutes Antippen hebt den Filter auf. Die Auswahl lässt sich mit der Suche kombinieren. Wörter mit mehreren Wortarten erscheinen in allen passenden Filtern. Ohne Suchtext bleiben gesperrte passende Wörter wie bisher sichtbar. Die Liste blendet beim Wechsel kurz ein; reduzierte Bewegung wird berücksichtigt. Später ergänzte Wörter werden aus derselben Datenquelle eingeordnet.

Die Wortartenfilter sind kompakte Chips. Ein Algorithmus misst ihre Breiten und stellt möglichst volle Zeilen zusammen; eine andere Bildschirmbreite, neue Freischaltungen oder Schriftänderungen aktualisieren die Anordnung. Antippen eines Filters lässt die Reihenfolge stabil. Die Wortliste bleibt nach Wortart und türkischem Alphabet sortiert.

**Karteikarten** öffnet die Abfrage über den kompakten Button neben dem Wortschatz-Titel. Zurück führt ins Wortschatz; Karteikarten bleiben im Wortschatz. Freischaltungen, Abfragerichtungen und Tastaturbedienung bleiben erhalten.

Wörter werden nach einer richtigen Antwort in beiden Übersetzungsrichtungen freigeschaltet. Die App-Tastatur und die Hardwaretastatur können im Worttrainer verwendet werden: Buchstaben eingeben, mit Backspace löschen und mit Enter prüfen. Tab navigiert zwischen Bedienelementen; Enter oder Leertaste aktiviert fokussierte Buttons und Karteikarten. Satzbausteine lassen sich tippen, ziehen oder per Tastatur aktivieren.

Wort- und Grammatiktrainer teilen dieselbe Tastatur. Löschen steht im Deutschen rechts neben `m`, im Türkischen rechts neben `ç`; alle bisherigen Buchstaben bleiben erhalten. Neue Zeichen erscheinen sanft, sind aber sofort Teil der prüfbaren Antwort. Navigation, Trainer und Karten verwenden gemeinsame kurze Übergänge. Ziehen behält den Griffpunkt und zeigt das Ablegen; reduzierte Bewegung wird durchgängig berücksichtigt. Konfetti begleitet neue Freischaltungen. Umfang, Prüfung und weitere Tastaturempfehlungen stehen in [Bewegung und Tastatur](docs/bewegung-und-tastatur.md).

Der Satzbau umfasst 160 Spiellevel mit A1–B2-Orientierung. Im Wörter-Bereich stehen ausschließlich türkische Wörter und tatsächliche Endungen. Verben starten im Infinitiv: `sevmek` + `-iyo` → `seviyo`, ab B1 `sevmek` + `-iyor` → `seviyor`. Beim Verbinden wird `-mak/-mek` ersetzt; beim Zurücknehmen erscheint wieder der Infinitiv. A1/A2 (Level 1–80) verwendet für ben/sen/o/biz die Alltagsformen `-iyom/-iyon/-iyo/-iyoz` mit passender Vokalharmonie. Ab B1 (Level 81) gelten Standardformen auch für ältere Wiederholungsaufgaben. Die Form bleibt während einer begonnenen Aufgabe unverändert. Deutsche Personen- und Grammatikschalter entfallen. Ziehe eine Endung auf ein passendes Wort oder ein Wort auf eine Endung – in der Wortbank oder im Satz. Antippen einer Endung ergänzt das ausgewählte passende Wort oder das zuletzt eingesetzte passende Wort im aktiven Satzteil. Ohne Ziel bleibt die Endung ausgewählt, bis du ein Wort antippst; das funktioniert auch über Bankseiten hinweg. Wörter antippen setzt sie in den gewählten Satzteil; im Satz entfernt Tippen zuerst die letzte Endung, danach das Wort. Geformte Wörter behalten ihre Endungen beim Einsetzen oder Zurückziehen. Seitenpfeile zeigen weitere Bausteine ohne Scrollen; lange Endungen erhalten breitere Karten. Besitz, Fälle, Zeiten und Personen lassen sich kombinieren. Einfache Satzteile erlauben passende Umstellungen; Relativsätze und andere gebundene Gruppen prüfen auch Reihenfolge und Bezug. Alltagsaufgaben sind sichtbar gekennzeichnet.

**Wörter Freischalten** erscheint im Wortschatz. Der Trainer bereitet zuerst die kleine Wortgruppe für den nächsten Abschnitt vor. Alle Wörter einschließlich `ben`, `var` und `yok` werden hier gelernt. Anschließend bleibt weiteres Wörterlernen möglich.

**Grammatik Freischalten** steht in der Grammatikübersicht direkt über der Navigationsleiste, auch bei einem frischen Lernstand. Solange keine Übung mit den bekannten Wörtern möglich ist, bleibt der Button sichtbar gesperrt. Benötigte Wörter lernt man im Wortschatz. Der Grammatik-Titel hat keinen Untertitel und keinen zusätzlichen Wörter-Einstieg im Themenblock. Der Button öffnet eigene Übersetzungsübungen. Themenkarten enthalten wenige Regelbuttons statt einzelner Variantenkarten. Jede konkrete Form oder Verwendung benötigt drei richtige Antworten ins Türkische und drei ins Deutsche; Hilfen zählen nicht mit. Kurze Regeln stehen über der Aufgabe. Bekannte Formen können wiederholt werden. Wörter, konkrete Formen und Anwendungen bleiben getrennte Freigaben.

32 feste Pakete führen durch Level 1–160. Ein neuer Abschnitt öffnet nach allen Wort- und Grammatikpflichten des vorherigen. Die Grammatikfreischaltung enthält die erforderlichen Anwendungen; Satzbauantworten sind keine Aufstiegsbedingung. Neue Wörter erweitern passende Muster und optionale Varianten; abgeschlossene Pflichtpakete wachsen dadurch nicht nachträglich. Ein kurzer Ausblick zeigt das nächste Thema.

Im Satzbau erscheinen nur bekannte Wörter, konkrete Formen und Konstruktionen, auch bei Ablenkern. Angefangene Aufgaben werden samt gewählten Formen und erster Wertung gespeichert. Alte Wortfreischaltungen und konkrete Grammatikformen werden übernommen. Die Levelanzeige wird aus diesen Freischaltungen neu berechnet; der frühere Satzbau-Level bleibt als Historie gespeichert. Noch nicht gelernte neue Konstruktionen warten auf ihre Grammatikübung. Der [frühere Lernpfadbericht](docs/grammatik-lernpfad-generator.md) bleibt als historischer Stand erhalten.

Verwendete Suffix-Bausteine verschwinden aus dem Wörterblock, auch wenn sie dort bereits mit einem Wort verbunden werden. Beim Zurücknehmen erscheint die Endung wieder. Für mehrfach benötigte gleiche Endungen gibt es entsprechend mehrere Karten; jede Kopie wird einzeln verwendet. Angeheftete Endungen bleiben auch nach Neuladen verwendet.

Präsensfragen in A1/A2 behalten die vereinfachte Person am Verb: `geliyom mu`, `geliyon mu`, `geliyo mu`, `geliyoz mu`. Ab B1 stehen die Standardformen, etwa `geliyor musun` oder `geliyor muyuz`. Bereits gespeicherte korrekte Alltagsfragen werden samt verbrauchter Endung angepasst; Lernfortschritt und Wertung bleiben erhalten. Die Satzbaufläche hat keinen Info-Button. Ohne Freischaltungen zeigt sie nur den Titel „Noch keine Wörter freigeschaltet“, den Text „Schalte zuerst Wörter frei, damit sie hier erscheinen“ und den Button „Benötigte Wörter freischalten“ zum Worttrainer.

**Der Kurslevel steigt ausschließlich durch freigeschaltete Wörter und Grammatik.** Die 32 festen Pflichtpakete verteilen 548 Wort-IDs und die bestehenden Grammatikpflichten auf Level 1–160. Innerhalb eines Pakets zählt dessen gelernter Anteil; erst nach allen Wort- und Grammatikpflichten öffnet sich der nächste Abschnitt. Die Übersetzungen im Satzbau bleiben Übung: richtige Antworten, Fehler, Hilfe und Korrekturen verändern den Level nicht. Wörter und Grammatik werden weiterhin getrennt gelernt. Neue optionale Wörter verändern bereits abgeschlossene Pflichtpakete nicht.

Aufgaben und Ablenker verwenden ausschließlich Wörter, die im Worttrainer in beiden Richtungen freigeschaltet wurden. Auch Einführungen enthalten bis zu zwei zufällige ähnliche Wörter derselben Wortart, soweit welche verfügbar sind. Hinzu kommen bis zu drei ähnliche türkische Endungen derselben Endungsfamilie. Der Mix bleibt während einer Aufgabe und nach Neuladen stabil. Falsche Vokalharmonie bleibt sichtbar und wird nicht automatisch korrigiert. Der Katalog enthält 564 Wörter und Namen mit stabilen IDs, einschließlich getrennter Bedeutungen für Ben/ben und yemek als Essen/essen. Weitere optionale Wörter erweitern passende Aufgaben. Fehlende Wörter werden angezeigt.

Der Aufgabenplan verbindet aktuelle Übungen, fällige Wiederholungen und ältere Aufgaben. Wiederholungen warten beim nächsten Öffnen; die App arbeitet nicht im Hintergrund. Lernstand, angefangene Aufgaben und Wortfreischaltungen werden automatisch im jeweiligen Browser gespeichert und beim Öffnen geladen. Eine Oberfläche zum Herunterladen, Importieren oder Zurücksetzen des Lernstands gibt es derzeit nicht. Bestehende Wort- und Grammatikfreischaltungen sowie angefangene Aufgaben bleiben erhalten. Der frühere, durch Satzbau erreichte Level wird als Historie gespeichert; die aktuelle Anzeige berechnet den tatsächlichen Lernfortschritt nach den neuen Pflichtpaketen. Standardformen beginnen mit dem gelernten B1-Level 81.

Die Wortschatzsuche öffnet die gemeinsame App-Tastatur mit einer kurzen 160-ms-
Einblendung. Die linke Taste wechselt die Sprache; Löschen sitzt rechts neben m bzw. ç.
Suchtreffer und Wortartfilter reagieren sofort. Haken, Escape und Tippen außerhalb
schließen die Tastatur; Suchtext und Lernstand bleiben erhalten. Bei Navigation
oder Trainerstart wird sie sofort entfernt. Das Suchfeld verwendet readonly und
inputmode="none", um die native Handytastatur zu vermeiden; Hardwareeingabe wird
separat verarbeitet. Die Liste bleibt oberhalb der fixierten Tastatur erreichbar.
Reduzierte Bewegung deaktiviert die Animation. `lib/dictionary-search.js` verwaltet
nur diese Eingabe und Darstellung, ohne Lernstände zu speichern.

Alle App-Tastaturen folgen den deutschen/türkischen Bildvorlagen: Zahlenreihe,
QWERTZ oder Türkisch-Q, Shift links und Löschen rechts. Die breite Leertaste
zeigt Deutsch/Türkisch. Darüber schweben die Aktionen „Keine Ahnung“ und Haken
als pastellfarbene Schaltflächen; in der Suche ersetzt der Sprachwechsel „Keine
Ahnung“. Farben folgen dem hellen/dunklen App-Theme. Shift gilt für einen Buchstaben und beachtet
`ı → I` sowie `i → İ`. `s` gedrückt halten bietet `ß`, mit Shift `ẞ`; Abbruch
oder Navigation übernimmt kein Zeichen. `lib/app-keyboard.js` und `keyboard.css`
teilen Darstellung/Bedienung; Freischaltungen und Bewertungsregeln bleiben getrennt.

Die Löschtaste löscht beim Drücken ein Zeichen und wiederholt nach 350 ms alle
70 ms. Loslassen, Wegbewegen, Abbruch oder Verlassen der Tastatur stoppt sofort;
der nachfolgende Klick löscht kein zusätzliches Zeichen. Dies gilt für Worttrainer,
Grammatik und Suche. In der Topleiste steht der aktuelle Lern-Level mittig
zwischen André und „Gelernt“, aus den Wort- und Grammatikfreigaben des Browserstands.
Der Balken enthält die Levelzahl und füllt sich innerhalb der aktuellen Sprachstufe:
A1 1–40, A2 41–80, B1 81–120, B2 121–160. Die aktuelle Stufe, Levelzahl und das nächste Ziel stehen im Balken, ohne Pfeil. Am ersten Level jeder Stufe ist er leer, am letzten voll;
der nächste Abschnitt beginnt neu. Bei 160 wird das B2-Ziel markiert, ohne C1.

## Tests

Grammatik zeigt farbige Themenkarten und gesperrte unbekannte Regeln. Freischalten erfolgt über den zentralen Button; gelernte Regeln können wiederholt werden. Die Übersetzungsübung verwendet dieselbe vollständige App-Tastatur wie „Wörter Freischalten“, ohne Lösungsanzeige. Überspringen vergibt keinen Fortschritt.

Node.js 22 oder neuer:

```sh
node --test tests/*.test.cjs
```

Die automatischen Prüfungen laufen ohne Browserstart, lokalen Webserver oder Live-App-Aufruf. Sie prüfen die 188 bisherigen Referenzaufgaben über die tatsächlichen Wortbank-Bedienelemente im DOM-Modell, die alten 733 Gesten-/Formfixtures, die 160 persönlichen Referenzen, Übersetzungsschwellen, Speicherung, Migration, Wortergänzungen sowie den vollständigen Lernweg bis Level 160. Die Themenabdeckung prüft 11.040 generierte Aufgaben: drei je Kombination aus 160 Leveln und 23 Themen. GitHub Actions führt dieselben Tests aus.

`node tools/audit-course.cjs` prüft zusätzlich jedes tatsächliche Pflichtpaket auf erreichbare Freischaltungen und mindestens zwei verfügbare Anwendungen je Lernziel. `node tools/build-course.cjs` baut die strukturierten Referenzdaten neu auf. Sprachliche Mehrdeutigkeiten werden dort ausdrücklich aufgelöst.

## Aufbau und Prüfstand

`data/words.js`, `data/lexicon.js` und `data/interests.js` liefern Wörter, zweisprachige Flexionsdaten, Bedeutungsrollen und Themen. `data/interest-references.js` ergänzt 160 persönliche Referenzen; `lib/interest-generator.js` erzeugt neue nominale Aussagen, Handlungen, Besitzgruppen und verbundene B1/B2-Satzbäume aus denselben Rollen in beiden Sprachen. `lib/course-progress.js` berechnet ausschließlich Freischaltfortschritt aus dem eingefrorenen `data/learning-packages.js`. `data/reference-pairs.json` hält die 188 Referenzpaare, `data/course-data.js` ihre strukturierten Formen. `lib/course.js` verbindet Rollen, Flexion und deutsche Wortformen zu variablen Aufgaben. `lib/course-grammar.js` verwaltet Form-/Anwendungsfreigaben, `lib/course-learning.js` den Lernweg und die Speicherung. `grammar-ui.js` ersetzt die alte Grammatikansicht; `sentence-game.js` erhält die bestehende Wortbank und Gesten. Die alten Lernmodule bleiben für Migration und Regressionen erhalten.

Der [Satzbauplan](docs/satzbau-plan.md) und die [frühere Vorlage](docs/eingereichter-satzbauplan-2026-10-02.txt) bleiben erhalten. Der [Umsetzungs- und Prüfbericht](docs/satzbau-umsetzung.md) dokumentiert P01–P12; die [gemeinsame Wortbank](docs/satzbau-gemeinsame-wortbank.md) beschreibt deren ursprüngliche Umsetzung. [Türkische Bausteine](docs/satzbau-tuerkische-bausteine.md) bleibt als historischer Stand erhalten; [Infinitive und Aussprache](docs/satzbau-infinitiv-und-aussprache.md) beschreibt die aktuelle Ergänzung. Satzbau mit diesem begrenzten Wortschatz ist kein vollständiger A1–B2-Sprachkurs. Persönliche Erprobung mit André, echte Handy-/Screenreaderprüfung und unabhängige sprachliche Gesamtprüfung stehen noch aus.


## Interessen und neue Wörter

Alle 23 Themen stehen auf jedem Level unter ihren Wort- und Grammatikvoraussetzungen zur Verfügung. Der gespeicherte Themenzyklus gibt jedem verfügbaren Thema eine Runde. Neue Batches kombinieren Akteur, Handlung, Objekt, Empfänger, Ort und Satzverbindungen; kürzlich verwendete Antworten werden zurückgestellt. Mit kleinem Wortschatz sind Wiederholungen möglich. Es gibt keine feste Obergrenze von 160 Aufgaben. Neue Wörter brauchen eine stabile ID, Wortart, deutsche Flexionsdaten, türkische Besonderheiten und passende Themen/Rollen; sie erweitern die Satzfamilien ohne neue Einzelsätze.

Zusammengesetzte Nomen und Ableitungen behalten ihre Grammatikpflichten: `üzüm + su + -yu`, `muz + -lu + ekmek`, `renk + -li`. Namen erhalten passende Apostrophe und Ausspracheprofile. Die Wortbank enthält weiterhin türkische Wörter, Infinitive und gelernte konkrete Endungen.

Die persönliche Sammlung lässt sich mit `node tools/build-interest-references.cjs` neu kompilieren. Unbekannte Formen stoppen die Kompilierung. `tools/build-learning-packages.cjs` erhält einen vorhandenen Lernpfad; `--replace-path` dient nur einer bewusst geplanten Kursrevision. Weitere Inhalts- und Handyprüfungen bleiben getrennt von der automatischen Prüfung.
