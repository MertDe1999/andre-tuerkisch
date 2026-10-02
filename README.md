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

Im aktuellen Satzspiel führen fünf richtige Sätze zum nächsten Level und drei kumulierte Fehler zum Neustart auf Level 1. Die Wortreihenfolge wird bei der Prüfung ignoriert; bestimmte Pronomen können entfallen. Die Verbübungen verwenden die bestehenden umgangssprachlichen Formen, während die Grammatik auch Standardformen zeigt. Chatten ist bisher ein Platzhalter.

## Tests

Node.js 22 oder neuer:

```sh
node --test tests/sentence-builder.test.cjs tests/learning-controls.test.cjs
```

Die Tests führen das echte Inline-JavaScript in einem kleinen DOM-Modell aus. Sie prüfen Satzlogik, Auswahl, Wiederholung, Flexion, Spielverlauf, Übergänge, Konfetti, Freischaltdaten und Bedienungsaktionen. Echte Browser-, Layout-, Touch- und Screenreaderprüfungen ergänzen diese Tests. GitHub Actions führt die Tests bei Pull Requests und Änderungen an `main` oder `codex/**` aus.
