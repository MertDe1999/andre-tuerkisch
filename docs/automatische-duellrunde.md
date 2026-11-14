# Gemeinsam mit André und Ben

Stand: 14. November 2026. Diese Änderung ersetzt die sichtbare Auswahl von Themen und Übungsarten durch eine gemeinsame Runde. Die früheren freiwilligen Formate aus `hoeren-dialog-schreiben.md` sind historische Vorläufer; ihre gespeicherten Nachweise bleiben erhalten.

## Einstieg und Aufgaben

Satzbau hat eine einzige große Karte: André und Ben mit ruhiger Bewegung, „Mit André & Ben“, „Alle Themen · gemeinsam üben“ und „Los geht’s“. Alle 23 Interessen bleiben Teil des Kurses. Ihre Reihenfolge wird pro Levelrunde gemischt und gespeichert. Ein bereits angefangener Satz wird beim Umstieg weitergeführt.

Die zwei Einführungen bleiben Bausteinaufgaben. Danach wechseln türkische Antworten zwischen Satzbau, einer geführten Dialogreaktion und einer kurzen schriftlichen Übersetzung an Mert. Dazwischen stehen türkische Höraufgaben mit deutscher Bedeutungsauswahl. Die übliche Folge lautet Satzbau → Hören → Dialog → Hören → Schreiben → Hören. Es gibt keine sichtbare Moduswahl.

- **Satzbau:** bekannte türkische Wörter und freigegebene Endungen wie bisher antippen, verbinden, verschieben und zurücklegen.
- **Hören:** den türkischen Satz hören und die passende deutsche Bedeutung auswählen. Die Vorlage bleibt verborgen, bis die Aufgabe abgeschlossen oder ausdrücklich als Text geöffnet wird. Stummer Ton oder eine fehlende türkische Stimme zeigen die Textaufgabe. Sie zählt als Bedeutungsverständnis, nicht als Hörnachweis.
- **Dialog:** eine kurze persönliche Szene mit Mert und die beabsichtigte deutsche Aussage; die passende türkische Antwort auswählen. Es ist eine geführte Reaktion, kein frei bewertetes Gespräch.
- **Schreiben:** die vorgegebene Aussage auf Türkisch eingeben. Die gemeinsame Tastatur, Varianten, Cursor, Haptik und gehaltenes Löschen bleiben erhalten. Es handelt sich um eine begrenzte Übersetzungsaufgabe; beliebige freie Texte werden nicht behauptet.

Auswahlantworten stammen aus verfügbaren Aufgaben derselben Lernumgebung. Ähnliche Struktur und möglichst viele gemeinsame Wörter werden bevorzugt. Gleichbedeutende Antworten werden nicht als falsche Ablenker verwendet. Keine gesperrten Wörter oder Grammatikformen werden ergänzt. Bis zu vier eindeutige Antworten erscheinen; ein einzelner möglicher Satz zählt nur als assistiertes Üben. Reihenfolge und türkische Entwürfe bleiben gespeichert. Frühere deutsche Entwürfe werden intern erhalten, aber nicht mehr zum Abtippen geöffnet.

Auch beim Wörterlernen entfällt deutsche Eingabe. Jede Portion enthält zuerst die deutschen Wortvorlagen mit türkischer Auswahl, danach Türkisch schreiben und die deutsche Bedeutung auswählen. Deutsche Antworten kommen ausschließlich aus den gerade gelernten Portionswörtern, bei kleinen Gruppen entsprechend weniger. Wörter mit mehreren deutschen Bedeutungen werden anhand ihrer hinterlegten Antwort bewertet. Automatische Aussprache, Fehlerwiederholungen und vorhandene Teilfreigaben bleiben erhalten.

## Duell und Fortschritt

Alle vier Formate verwenden dieselbe Arena und Begegnung. André beginnt mit drei Herzen. Der erste Fehler pro Satz kostet ein Herz; „Keine Ahnung“ beim ersten Versuch zählt ebenfalls als Fehler. Weitere Korrekturen kosten keine zusätzlichen Herzen. Nach dem dritten Verlust füllt Ben alle drei Herzen auf. Es gibt keinen Timer, kein Game-over und keine neue Aufstiegsbedingung.

Jeder gelöste Satz verursacht einen Treffer, auch eine Korrektur. Gewöhnlich braucht ein Gegner sechs Treffer; die Einführungsbegegnung braucht zwei, die achte reguläre Etappe vier. Zusätzliche Nachweisetappen und ein Spielstand mitten in einer Etappe können kürzer sein. Überspringen verursacht keinen Treffer; ein überlebender Gegner zieht am Etappenende weiter. Ein Gegner entspricht einer kurzen Etappe, nicht dem ganzen Level.

Der Kurs behält zwei Einführungen, mindestens 46 gewertete Aufgaben, alle 23 Themen in beiden Richtungen, mindestens 80 Prozent direkt richtige Antworten und drei unterschiedliche unassistierte Beispiele pro neuer Pflichtform und Richtung. Korrigierte Antworten bleiben nicht-direkt. Eine nicht bestandene Gesamtrunde senkt den aktuellen Level einmal; Wörter und Grammatik bleiben freigeschaltet.

Die Headbar bleibt sichtbar. Name, Wortzähler und Ton stehen oben; der Levelbalken erhält eine eigene Zeile. Sehr kurzes Querformat verwendet eine kompakte Zeile. Sprachstufen und Levelzahl stehen weiterhin im Balken. Die Arena und Aufgaben passen sich dem verbleibenden festen Platz an.

Nach einem Sieg fliegen zwei bis sechs kleine Punkte zur Leiste. Beim Ankommen reagiert sie kurz mit einem Pixel Bewegung und leichter Vergrößerung. Die Punkte sind eine Darstellung des Kursfortschritts, keine neue Währung. Der Balken zeigt abgeschlossene Level sowie einen Teilfortschritt aus Einführungen, Themenabdeckung, Grammatiknachweisen und direkter Trefferrate. Der laufende Schritt erreicht höchstens 99 Prozent, bis die vorhandene Kursprüfung bestanden ist. Eine Sprachstufe wird erst nach dem letzten bestandenen Schritt voll. Nach abgeschlossenem B2 bleibt sie voll.

Die Animation vergibt keine Lernnachweise. Reduzierte Bewegung, Navigation, Hintergrund und Größenwechsel beenden sie sofort und zeigen den echten aktuellen Balkenstand. Keine Animation verzögert die Bedienung. Störungen im dekorativen Speicher ändern keine Lernstände.

## Prüfungen und Grenzen

`node --test tests/*.test.cjs` prüft die Modelle und simulierte Bedienelemente. `node tools/audit-automatic-course.cjs` führt alle 160 Level mit den vier Formaten durch und vergleicht an 1.280 Übergängen die vollständige Kurswertung mit dem bisherigen direkten Bewertungsweg. Der dokumentierte Lauf umfasste 7.981 Antworten und 1.204 Etappenpausen; alle 23 Themen und vier Formate waren erreichbar. Dabei wurden mindestens vier erlaubte Antworten je Auswahl gefunden. Kleine künstliche Pools werden separat geprüft.

Keine Live-App-, Browser-, Server-, Mikrofon- oder Klangtests. Tatsächliche mobile Darstellung, Stimmenqualität, Touchgefühl und unabhängige sprachliche Gesamtprüfung bleiben außerhalb dieser Offline-Nachweise.
