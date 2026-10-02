# Andrés Türkisch

Persönliches Türkisch-Lernspiel für André mit Wörterbuch, Grammatik, Worttrainer, Karteikarten und Satzbau.

[App öffnen](https://mertde1999.github.io/andre-tuerkisch/)

## Lokal starten

Die App benötigt keinen Build und keine Paketinstallation. `index.html` im Browser öffnen oder den Ordner über einen lokalen HTTP-Server ausliefern, beispielsweise mit Python:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Dann `http://127.0.0.1:8000/` öffnen. Der Lernstand wird lokal im jeweiligen Browser und Website-Ursprung gespeichert. Die lokale Ansicht und die veröffentlichte App haben daher getrennte Fortschritte.

## Bedienung

Wörter werden nach einer richtigen Antwort in beiden Übersetzungsrichtungen freigeschaltet. Die App-Tastatur und die Hardwaretastatur können im Worttrainer verwendet werden: Buchstaben eingeben, mit Backspace löschen und mit Enter prüfen. Tab navigiert zwischen Bedienelementen; Enter oder Leertaste aktiviert fokussierte Buttons und Karteikarten. Satzbausteine lassen sich tippen, ziehen oder per Tastatur aktivieren.

Der Satzbau umfasst 160 Spiellevel mit A1–B2-Orientierung. Setze Wörter in den gewählten Satzteil, wähle dort ein Wort aus und ergänze seine Endungen. Besitz, Fälle, Zeiten und Personen lassen sich kombinieren. Einfache Satzteile erlauben passende Umstellungen; Relativsätze und andere gebundene Gruppen prüfen auch Reihenfolge und Bezug. Standard- und Alltagsformen werden gekennzeichnet. Chatten ist bisher ein Platzhalter.

Nur der erste Versuch einer aktuellen Levelaufgabe zählt: richtig +1, falsch −1, mindestens Level 1 und höchstens 160. Einführungen, Hinweise, gezielte/ältere Wiederholungen und Fehlerkorrekturen bleiben ohne Leveländerung. Vor dem nächsten Abschnitt müssen seine Regeln an jeweils zwei verschiedenen Aufgaben ohne Hilfe gelöst sein. Bereits eingeführte Regeln bleiben nach einem Abstieg verfügbar.

Aufgaben und Ablenker verwenden ausschließlich Wörter, die im Worttrainer in beiden Richtungen freigeschaltet wurden. Der gemeinsame Katalog enthält die bisherigen 33 Wörter und 18 Ergänzungen für die neuen Konstruktionen, insgesamt 51 Wörter und 65 Karten. Fehlende Wörter werden angezeigt.

Der Aufgabenplan verbindet aktuelle Übungen, fällige Wiederholungen und ältere Aufgaben. Wiederholungen warten beim nächsten Öffnen; die App arbeitet nicht im Hintergrund. Unter **Lernspiele → Lernstand sichern** lassen sich Fortschritt und Freischaltungen als JSON herunterladen, mit Vorschau importieren oder der Satzbau zurücksetzen. Vor Import/Rücksetzen wird eine Rückfallsicherung aufbewahrt. Die alten Wortfreischaltungen bleiben gültig; der frühere Spiellevel wird als Historie erhalten, das neue Curriculum beginnt bei Level 1.

## Tests

Node.js 22 oder neuer:

```sh
node --test tests/sentence-builder.test.cjs tests/learning-controls.test.cjs
```

31 Tests prüfen unabhängige Flexionsbeispiele, falsche Formen/Satzbezüge, den vollständigen Weg bis Level 160, Wiederholungsdaten, Migration, Sicherungen und Bedienung. Das DOM-Modell führt alle tatsächlichen Skripte in Seitenreihenfolge aus und baut jede der 733 Aufgaben über die Baustein-/Endungssteuerung. GitHub Actions führt die Tests bei Pull Requests und Änderungen an `main` oder `codex/**` aus.

## Aufbau und Prüfstand

`data/words.js` versorgt Wörterbuch, Trainer, Karten und Satzbau. `lib/turkish.js` bildet die Flexion für diesen Wortschatz; `lib/curriculum.js` enthält 56 Regeln, Voraussetzungen und Aufgaben. `lib/learning.js` verwaltet Prüfung, Auswahl, Wertung und Speicherung. `sentence-game.js` verbindet diese Funktionen mit der Oberfläche.

Der [Satzbauplan](docs/satzbau-plan.md) und die [frühere Vorlage](docs/eingereichter-satzbauplan-2026-10-02.txt) bleiben erhalten. Der [Umsetzungs- und Prüfbericht](docs/satzbau-umsetzung.md) dokumentiert P01–P12, Browsernachweise und verbleibende Abnahmen. Satzbau mit diesem begrenzten Wortschatz ist kein vollständiger A1–B2-Sprachkurs. Persönliche Erprobung mit André, echte Handy-/Screenreaderprüfung und unabhängige sprachliche Gesamtprüfung stehen noch aus.
