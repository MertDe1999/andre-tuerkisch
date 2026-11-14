# Duell mit André und Ben

Seit dem Auftrag vom 14.11.2026 begleitet eine kompakte Arena den bestehenden Satzbau. André hat Locken, grüne Augen und ein Tanktop; Ben ist nach dem vom Nutzer bereitgestellten Foto gestaltet: dunkelgraues wuscheliges Fell, dunkle Schlappohren, braune Augen und beige Abzeichen an Brauen, Schnauze und Pfoten. Das Foto selbst wird nicht mit der App ausgeliefert. Vier eigene Vektorfiguren wechseln als Gegner: Matcha-Blob, Protein-Pudding, Tintenflummi und Sofa-Geist. Farben folgen dem bestehenden Hell-/Darkmode. Seit dem ergänzenden Auftrag begleitet dieselbe Arena alle vier automatisch wechselnden Aufgabenarten; siehe [automatische Duellrunde](automatische-duellrunde.md).

## Ablauf

- Die zwei unbewerteten Einführungen bilden eine eigene kurze Begegnung. Danach gehört jeweils eine Begegnung zur vorhandenen Etappe mit höchstens sechs Aufgaben; die achte reguläre Etappe hat vier Aufgaben. Zusätzliche Nachweisaufgaben behalten ihre eigenen Etappen. Freies Üben hat kosmetische Begegnungen mit sechs Aufgaben je Thema.
- Jeder vollständig gelöste Satz verursacht genau einen Treffer, auch eine richtige Korrektur. Das macht eine assistierte Antwort ausdrücklich nicht zu einem direkten Lernerfolg.
- Nur der erste Fehler pro Satz (auch direktes „Keine Ahnung“) kostet eines der drei Begegnungsherzen. Weitere Korrekturversuche kosten keine zusätzlichen Herzen. Beim dritten Fehler hilft Ben und füllt die Herzen wieder auf. Es gibt keine neue Lernsperre und keinen zusätzlichen Levelabzug.
- „Keine Ahnung“ zählt weiter nach den bisherigen Lernregeln, verursacht aber keinen Treffer. Bleiben am Etappenende gegnerische Lebenspunkte übrig, zieht der Gegner weiter. Der normale Pausenpunkt bleibt erreichbar.
- Der vorhandene Etappenzähler zeigt erledigte Aufgaben; der kleine gegnerische Balken zeigt Lebenspunkte. Diese Werte sind bei übersprungenen Aufgaben bewusst verschieden. Ein besiegter Gegner bedeutet nicht automatisch einen bestandenen Level.
- Der fertige Satz bleibt bis „Weiter“ sichtbar. Am Etappenende bleiben „Nächste Etappe“ und „Für heute fertig“. Kein Timer, keine automatisch gestartete nächste Aufgabe, keine abzuwartende Animation.

## Lernwertung und Speicherung

Die Lernmodule sind unverändert. Weiterhin gelten für einen regulären Level zwei Einführungen, mindestens 46 gewertete Aufgaben, alle 23 Themen in beiden Richtungen, mindestens 80 Prozent direkt richtige Antworten und die bisherigen Nachweise je neuer Pflichtform. Eine nicht bestandene Gesamtrunde senkt den aktuellen Level einmal; Freischaltungen bleiben erhalten.

`lib/duel.js` beobachtet bereits feststehende Ergebnisse. Es schreibt ausschließlich den separaten Browser-Schlüssel `andreDuelV1`, niemals Wörter, Grammatik, Aufgaben oder Kurslevel. Satz-IDs verhindern doppelte Treffer/Gegenangriffe. Das Ergebnis bleibt auch nach einem Levelwechsel seiner ursprünglichen Begegnung zugeordnet. Rückkehr und Reload setzen den Begegnungsstand fort. Höchstens 40 Begegnungen bleiben gespeichert; sehr lange nicht besuchte freie Themen können später neu starten, ohne irgendeinen Lernstand zu verlieren.

Bei einem bestehenden Spielstand mitten in einer Etappe hat der erste neue Gegner nur so viele Lebenspunkte wie Aufgaben übrig sind. Frühere Antworten werden nicht nachträglich als Treffer oder Fehler interpretiert. Kaputter/gesperrter kosmetischer Speicher blockiert das Lernen nicht; ein Schreibfehler wird über die bestehende Speicherwarnung angezeigt.

## Bewegung und Ton

Kurzes Atmen, Blinzeln und Bens Schwanzbewegung halten die Figuren lebendig. Treffer, Bens Hilfe und ein besiegter Gegner haben kurze eigene Animationen und synthetisierte Klänge. Die dekorative Szene wackelt um zwei Pixel; nach dem ergänzenden Auftrag reagiert auch der Levelbalken kurz auf ankommende Siegpunkte; Wortbank, Eingabe und Bedienfelder bleiben still. Die vorhandene Tonwahl gilt weiter, ein Levelabschluss behält seinen Levelklang. Aussprache und Hintergrundzustand werden respektiert.

Reduzierte Bewegung schaltet die bewegten Effekte ab; Lebenspunkte, Herzen und kurze Zustandsanzeigen bleiben sichtbar. Navigation, Hintergrund, Größenwechsel und geänderte Bewegungseinstellung brechen Animationen ab. Kein Animationsende vergibt einen Lernnachweis oder startet eine Aufgabe. Die Arena verkleinert sich bei geringer Höhe und wird beim Schreiben im Querformat seitlich angeordnet.

## Offline-Nachweise

```powershell
node --test tests/*.test.cjs
node tools/audit-duel.cjs
```

Die neuen Tests prüfen Treffer-/Fehler-Deduplizierung, Bens Hilfe, Überspringen, korrigierte Antworten, Migration mitten in einer Etappe, freies Üben, Speicherfehler, Navigation/Reload, reduzierte Bewegung, Hintergrund, Etappenwechsel und zentrale Tonwahl. Der zusätzliche Kursdurchlauf beobachtet alle 160 Level, beide Richtungen und alle 23 Themen. Vor und nach jeder Duelloperation werden die vollständigen Lernobjekte und Lernspeicher verglichen. Die vorbestehenden Prüfungen für Gesten und Tastatur bleiben bestehen.

Es erfolgen auf Nutzerwunsch keine Live-App-, Browser- oder Servertests. Die tatsächliche Darstellung, Touchbedienung und Klangwirkung auf Andrés Handy werden vom Nutzer beurteilt; Offline-Prüfungen behaupten diese Abnahme nicht.
