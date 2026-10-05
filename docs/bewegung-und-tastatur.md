# Bewegung und gemeinsame App-Tastatur

Stand: 05.10.2026. Alle sieben Bewegungsvorschläge und die konkreten Tastaturwünsche wurden freigegeben. Weiterführende Tastaturfunktionen bleiben Empfehlungen.

## Umgesetzt

- Navigation blendet die bisherige Ansicht aus und die nächste ein: 220 ms, 16 px. Beim horizontalen Wischen folgen Ansicht und Markierung dem Finger; Abbruch setzt den Zustand zurück. Vertikales Scrollen und Trainer bleiben ausgenommen.
- Trainer und Karteikarten öffnen/schließen mit kurzen Übergängen. Profil und Navigation bewegen sich über Transformation/Opazität, ihre Größe wird nicht fortlaufend animiert.
- Aktive Buttons reagieren beim Drücken in 80 ms mit einem Maßstab von .98, beim Loslassen in 160 ms. Tastaturtasten haben eine eigene schnellere Reaktion: 35 ms beim Drücken, 60 ms beim Loslassen, ohne Skalieren der Schrift. Gesperrte Buttons bleiben ohne Druckreaktion.
- Satzbausteine und benachbarte Karten wechseln ihre Position in 220 ms. Die Drag-Kopie bleibt am tatsächlichen Griffpunkt, folgt unmittelbar und landet in 180 ms am Ziel oder zurück am Ursprung. Beim Ablegen bleibt nur eine sichtbare Zielkarte. Suffixe verbinden sich sichtbar mit dem Wort; die Rücknahme zeigt die zurückgegebenen Bausteine.
- Aufgaben und Karteikarten wechseln mit 160–220 ms Überblendung. Bei gleicher Antwortsprache bleiben Tastatur und Tasten erhalten. Grammatikfortschritt wird zwischen bisherigem und neuem Wert animiert.
- Erfolg und Fehler geben lokale Rückmeldung. Konfetti erscheint bei neuen Wort-/Grammatikfreischaltungen und erstmals erreichten Satzbau-Meilensteinen; es ist kürzer und verwendet weniger Teile. Wiederholung einer bereits gelernten Grammatik und erneutes Erreichen von160 nach einem Levelverlust bleiben bei lokaler Bestätigung. Gewöhnliche richtige Satzantworten warten nicht auf Konfetti.
- `lib/motion.js` steuert Darstellung ohne Lernzustand, Antwortprüfung oder Speicherung zu verzögern. Navigation, Größenänderung, neue Ziehbewegung und Verlassen bereinigen Effekte. Reduzierte Bewegung und fehlende Animationsunterstützung führen direkt zum Endzustand. Farben folgen dem bestehenden Hell-/Darkmode.

Die gemeinsame deutsche Tastatur hat die Löschtaste rechts neben **m**, die türkische rechts neben **ç**. **ß** bleibt als Taste erhalten, jetzt am Ende der deutschen mittleren Reihe. Eingegebene Zeichen stehen sofort im Antworttext und erscheinen während 140 ms sanft mit 3 px Bewegung. Auch schnelle Eingabe, Löschen und Prüfung funktionieren während des Effekts; frühere Buchstaben dürfen ihre kurze Animation beenden. Vorhandene Hardwareeingabe und automatische Sprachwahl bleiben erhalten. Die vorhandene Vibration wird auf unterstützenden Geräten auf 8 ms für Tasten, 14 ms für sonstige Buttons verkürzt.

Nachtrag TS01/TS02: Alle Tastaturtasten verwenden dieselbe Schriftgröße von 1.08 rem und dieselbe Schriftfamilie. Dies gilt für beide Sprachen, Reihen und Trainer einschließlich der Sondertasten. Automatische Textvergrößerung wird im Tastaturbereich begrenzt; die Schrift bleibt an die Root-Schriftgröße gebunden. Der Tastendruck verändert nur Farbe und Position um 1 px, sodass Buchstaben dabei nicht kleiner werden. Die eigene Tastenreaktion ersetzt die langsamere allgemeine Buttonreaktion. Der Zeichen-Effekt im Antwortfeld bleibt erhalten.

## Empfehlungen zur weiteren Abstimmung

Die folgenden Werte sind eigene Gestaltungsvorschläge, keine aus Quellen abgeleiteten Pflichtwerte und noch nicht umgesetzt.

1. **Löschen gedrückt halten:** Sofort ein Zeichen löschen, nach etwa 450 ms wiederholt alle 70 ms löschen. Loslassen, Wegziehen, Aufgaben-/Sprachwechsel und Verlassen stoppen die Wiederholung. Kein ungewolltes zusätzliches Zeichen durch das nachfolgende Klickereignis.
2. **Shift und Satzzeichen:** Einmalige Großschreibung, optional Doppeltippen für Feststellung. Türkisch sprachabhängig `i → İ`, `ı → I`; Deutsch `ä/ö/ü → Ä/Ö/Ü`, `ß` gesondert behandeln. Eine kompakte zweite Ebene für `? . , ! ' -` erschließt ganze Sätze, ohne türkische Buchstaben zu verstecken. Umschalten darf weder Entwurf noch Löschposition verändern. Großschreibung bleibt für die aktuelle tolerante Antwortprüfung freiwillig.
3. **Kurze Buchstabenvorschau:** Den gedrückten Buchstaben knapp oberhalb der Taste zeigen, ohne Nachbartasten zu verdecken. Nach Loslassen etwa 120–160 ms ausblenden. Keine springende Taste oder vergrößerte Textfläche; bei reduzierter Bewegung nur eindeutige Farbänderung. Erst auf dem Handy beurteilen, ob die zusätzliche Anzeige hilft.
4. **Klarer Bearbeitungszustand:** Sichtbarer Cursor und Antippen zum Einfügen/Löschen an einer Stelle im Satz. Vor Auswahl einer Cursor-Geste zuerst die direkte Bedienung lösen; Leertasten-Ziehen wäre erst eine optionale Ergänzung. Hardware-, Bildschirm- und assistive Eingabe müssen denselben Entwurf bearbeiten. Das jetzige Entfernen am Textende bleibt bis dahin erhalten.
5. **Trefferflächen und Ruhe:** Möglichst 44 px hohe Tasten und größere Sondertasten; auf schmalen Geräten mindestens 24 × 24 CSS-px Trefferfläche beziehungsweise passende Abstände prüfen. Zwölf Buchstaben in einer Reihe passen auf einem kleinen Handy nicht alle mit 44 px Breite. Die aktuelle CSS-Untergrenze verhindert, dass fünf Reihen bei geringer Höhe beliebig zusammenschrumpfen; dies ersetzt keine Gerätemessung. Türkisch-Q, Deutsch-QWERTZ und automatische Sprachwahl beibehalten, nicht während eines Satzes neu ordnen.
6. **Feedback optional:** Sehr kurze Haptik als abschaltbare Ergänzung, Töne standardmäßig aus. Eine Web-App kann auf manchen Geräten keine Vibration erzeugen. Druckfarbe und sanfte Buchstaben müssen auch ohne Haptik verständlich bleiben. Keine automatische Korrektur oder Lösungsvorschläge in Freischaltprüfungen, damit André selbst übersetzt.

Empfohlene Reihenfolge: gehaltenes Löschen; danach Shift/Satzzeichen; anschließend Cursorbearbeitung und auf Wunsch Vorschau/Feedbackeinstellung. Trefferflächen bei der Nutzerprüfung auf dem echten Handy bewerten. Wischschreiben und automatische Wortergänzung sind derzeit keine Empfehlung für diese Lernprüfung.

## Recherchegrundlage

Nachtrag HL01 vom 05.10.2026: Der Vorschlag für gehaltenes Löschen ist jetzt
beauftragt und umgesetzt. Ein Zeichen beim Drücken, Wiederholung nach350ms
alle70ms; Ende bei Loslassen, Bewegung, Abbruch, Fokusverlust, Navigation und
gesperrter/neuer Tastatur. Gemeinsame Bedienung in beiden Trainern und Suche,
kein zusätzlicher Zeigerklick nach dem Halten. Offline geprüft; die übrigen
noch nicht umgesetzten Vorschläge behalten ihren bisherigen Status.

- [W3C: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): 24 × 24 CSS-px oder ausreichende Abstände; keine pauschale Behauptung, dass die ganze App dadurch konform ist.
- [W3C: Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): 44 × 44 CSS-px als erweitertes Ziel, größere Flächen unterstützen Touchbedienung.
- [W3C: Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html): Auslösen beim Loslassen ermöglicht Abbruch; Tastaturemulation ist eine ausdrücklich genannte Ausnahme. Sofortige Druckfarbe und spätere Aktivierung lassen sich trennen.
- [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): Nicht erforderliche Interaktionsbewegung abschaltbar gestalten.
- [MDN: toLocaleUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase): Türkische Großschreibung hängt von der Sprache ab.
- [MDN: Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API): begrenzte Browser-/Geräteunterstützung.
- [MDN: Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) und [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events): technische Grundlage für abbrechbare Effekte und Ziehbedienung.

## Prüfung

93 Offline-Tests bestanden. Sie decken gemeinsame Tastatur, Zeichenbestand, Deleteposition, unmittelbaren Entwurf, schnelle Eingabe, reduzierte Bewegung, Abbruchbereinigung, Navigationszustand, Griffpunkt/Drag-Abbruch, Trainer-Timer, feste Tastaturvorfahren und einmalige Meilensteinfeiern ab. Bestehende Tests prüfen weiterhin Lernfolge, Freischaltungen, Speicherung und Satzbaugesten. Keine Live-App, kein Browser und kein lokaler Prüfserver wurden gestartet. Das tatsächliche Bediengefühl, Darstellungsdetails und Leistung auf dem Handy bewertet der Nutzer.
