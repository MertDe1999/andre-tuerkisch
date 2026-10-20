# Geführter Lernweg, 09.10.2026

Dieser vom Nutzer freigegebene Ablauf ersetzt die frühere Berechnung des Levels ausschließlich aus Freischaltungen. Historische Berichte bleiben erhalten.

## Ablauf und Wertung

Die festen32 Pflichtpakete werden zu160 konkreten Schritten geteilt. Zusätzliche Wörter sichern die Beispiele und anfängliche Anker für alle23 Themen. Der aktuelle Stand enthält474 Pflicht-Wort-IDs und74 unmittelbar bekannte Namen/gleiche Wörter. Das Wortziel ist der höchste begonnene Schritt und fällt bei einem Levelverlust nicht zurück. Seit der Änderung vom20.10.2026 beginnt eine Gruppe direkt mit allen Bildentscheidungen, danach folgen beide Schreibübersetzungen. Nachsprechen und Sprachprüfung entfallen. Bis zu vier Antworten kommen ausschließlich aus dieser neuen Gruppe. Bei kleinen Gruppen werden weniger Antworten gezeigt; spätere oder alte Wörter werden nicht hinzugenommen. Die Auswahlreihenfolge bleibt während derselben Aufgabe auch nach einer Pause erhalten. Ein bekanntes vollständiges altes Wort bleibt bekannt; alte teilweise erfolgreiche Schreibrichtungen werden übernommen. Automatisch bekannte Namen und gleiche Wörter sind im Wörterbuch einschließlich Suche, Wortartfiltern und Lernzähler ausgeblendet; für Satzbau und Endungen bleiben sie verfügbar.

Zwei Einführungen zählen nicht zur Wertung. Danach zählen23 Themen je zweimal, einmal je Richtung. Direkte erste Antworten zählen als Erfolg. Ein Fehler oder eine Hilfe macht diesen Satz für die Wertung nicht direkt; die Korrektur bleibt erlaubt. „Keine Ahnung“ beendet den Satz als Fehler und zeigt die Lösung. Die komplette Runde muss80% erreichen. Jede neue Pflichtform braucht drei unterschiedliche türkische Antworten in jeder Richtung. Nach der Themenabdeckung folgen fehlende Anwendungen gezielt; nach maximal46+max(18,8×Pflichtformen) gewerteten Aufgaben wird die Runde entschieden. Eine nicht bestandene Runde verliert genau einen Level, mindestens1. Aufstiege bis160 öffnen das nächste Wortziel. Gelernte Wörter/Formen verschwinden beim Abstieg nicht.

Bereits eingeführte Regeln und die aktuelle Regel erhalten Übungserlaubnisse für ihre konkreten Varianten; spätere Konstruktionen bleiben gesperrt. Die dauerhafte Freigabe einer Form erfordert drei unterschiedliche Antworten je Richtung. Erfolge optionaler Formen werden nach bestandenen Runden über die Schritte hinweg gesammelt. Im freien Training nach160 erfolgt dasselbe ohne erneute Levelwertung. Das Öffnen einer Regelerklärung schaltet keine Form frei.

Wer ein bereits abgeschlossenes Thema erneut öffnet, übt frei, bis die übrigen Themen erledigt sind. „Alles gemischt“ führt automatisch durch die offenen Richtungen. Der Zähler an jeder Themenkarte zeigt0/2,1/2 oder2/2.

## Bilder, Audio und Tastatur

Die visuellen Aufgaben nutzen eigene Piktogramm-Szenen ohne geschriebene Lösung. Das Bild und die türkische Textauswahl erscheinen direkt beim Einstieg. Sie zeigen Gegenstände, Tätigkeiten, Beziehungen, Gegensatzpaare und Situationen. Für alle vorhandenen lernpflichtigen Wörter gibt es eine Zuordnung. Bildverständnis und Emoji-Darstellung sind noch vom Nutzer auf seinem Handy zu beurteilen. Neue Wörter können picture.scene mitbringen; ungeeignete generische Bilder werden nicht als eindeutige Aufgabe verwendet.

Es gibt keine Sprechaufgabe, Mikrofonaufnahme oder Selbstprüfung mehr. Gespeicherte Sprechaufgaben wechseln beim Öffnen direkt zur aktuell ausstehenden Bild- oder Schreibphase. Bisherige Bildentscheidungen, schriftliche Erfolge und Freischaltungen bleiben erhalten. Fehlt bei einem später ergänzten Wort ein Bild, betrifft „Bild fehlt“/Weiter nur dessen Bildauswahl; andere Wörter und beide Schreibrichtungen werden nicht übersprungen.

Nach einer falschen Bildantwort wird Audio auf Türkisch, dann Deutsch abgespielt. Das Lautsprecher-Symbol ermöglicht erneutes Anhören der Lösung. Navigation oder eine neue Aufgabe bricht die Wiedergabe ab und macht verspätete Audio-Rückmeldungen unwirksam. Die verfügbaren Stimmen hängen vom Browser und Gerät ab.

Zwei falsche Schreibantworten in derselben Richtung zeigen Türkisch und Deutsch getrennt auf einer dauerhaft sichtbaren Karte mit Anhören/Weiter. Diese Hilfe schaltet das Wort nicht frei. Für beide Eingaberichtungen gibt es die gemeinsame Tastatur, Cursor, Satzzeichen und gehaltenes Löschen. Optionale Vorschau/Vibration sind standardmäßig aus. Vibration wird nur nach Nutzereingaben angefordert und bleibt auf nicht unterstützten Geräten ohne Wirkung. [MDN vibrate](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate)

## Technische Daten und Erweiterbarkeit

learning-path definiert die eingefrorenen Schritte. guided-learning erweitert den bisherigen Kurskern. Gespeichert werden zusätzlich andreGuidedPathV1 (aktuell/höchster Schritt, Runde, abgeschlossene Schritte, Variantenbelege), andreWordPreparationV1 (Bild-/Schreibzustände; alte Sprechfelder werden nicht mehr ausgewertet) und andreKeyboardPreferencesV1. Bisherige Browser-Wort- und Grammatikfreigaben bleiben in ihren bestehenden Schlüsseln. Der alte Satzlevel wird archiviert; bekannte konkrete Voraussetzungen werden bei der Übernahme berücksichtigt. Angefangene zulässige Aufgaben bleiben als Einführung erhalten.

Der Generator verwendet zweisprachige Satzbäume, Wortrollen und Morphologie. Bei knappen Pflichtformen erweitern geprüfte lexikalische Ersetzungen und Anreden wie „Mert, …“ die verfügbaren Anwendungen. Grammatikbedarfe unveränderter Aufgaben werden gecacht. Quellen für Wörter und persönliche Themen bleiben data/words, lexicon, interests und interest-references; neue Wort-IDs erweitern freiwillige Übungen, nicht rückwirkend den Pflichtweg.

Prüfungen: Modelle, vollständige Runden,160 Schritte/alle23 Themen, konkrete Formen, Migration, Erstwertung, Tastatur/Gesten, simulierte Audioereignisse und vollständiges Wörterlernen ohne Mikrofon-API. Keine Live-App- oder Handytests durch Codex. Echte Darstellung, Stimmen und unabhängige Sprachabnahme bleiben externe Prüfungen.
