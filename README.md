# Andrés Türkisch

Persönliche Türkisch-Lernapp mit Wortschatz, Grammatik und Satzbau.

[App öffnen](https://mertde1999.github.io/andre-tuerkisch/)

## Lernen

160 Lernschritte führen von A1 über A2/B1 bis B2. Der Wortschatz-Button zeigt den höchsten begonnenen Schritt: **Wörter für Level X freischalten**, anschließend sichtbar deaktiviert **Wörter für Level X freigeschaltet**. Bekannte gleiche Namen/Titel sind von Anfang an verfügbar; ihre Endungen bleiben Lernstoff.

Neue Wörter lernt André in ganzen Gruppen: Zuerst hört er die türkische Aussprache und spricht jedes Wort nach. Das Wortbild bleibt beim Anhören und Sprechen sichtbar; ein Lautsprecher-Symbol ermöglicht erneutes Anhören. Erst wenn alle neuen Wörter ausgesprochen sind, folgen die Bilder mit bis zu vier türkischen Antworten, ausschließlich aus dieser neuen Wortgruppe. Kleine Gruppen haben entsprechend weniger Antworten; alte Wörter und bekannte Namen werden nicht ergänzt. Nach allen richtigen Bildantworten folgen die schriftlichen Übersetzungen in beiden Richtungen. Bei Sprechfehlern oder „Keine Ahnung“ gibt es weiterhin türkisches und deutsches Audio. Der Wortschatz wird erst nach beiden korrekten Schreibantworten freigeschaltet. Zwei Schreibfehler zeigen eine große zweisprachige Lösung bis **Weiter**. Sprachprüfung, Stimmen und Vibration hängen vom Gerät ab; Bei fehlender Spracherkennung gibt es eine ausdrücklich gekennzeichnete Selbstprüfung. Ein schriftlicher Einstieg zum Überspringen der Sprechgruppe entfällt.

Grammatik zeigt 160 farbige Levelpunkte, nach Sprachstufe zusammengefasst. Vorbereitete und frühere Schritte öffnen Regelerklärungen. Neue Grammatik wird anschließend in den 23 Interessen-Themen im Satzbau angewandt. Der frühere separate Grammatik-Freischalttrainer entfällt.

Ein Level hat zwei unbewertete Einführungen und mindestens 46 gewertete Aufgaben: jedes Thema einmal Deutsch → Türkisch und einmal Türkisch → Deutsch. Zum Aufstieg braucht es mindestens 80 % direkt richtige Antworten und drei verschiedene unassistierte Anwendungen je neuer Pflichtform in jeder Richtung. Fehlende Anwendungen erhalten zusätzliche gezielte Aufgaben. Eine nicht bestandene Runde senkt den aktuellen Level einmal um eins; Wörter und gelernte Grammatik bleiben erhalten. Der höchste begonnene Schritt bleibt das Wortziel. Nach bestandenem Level160 folgt freies Üben und optionales weiteres Wörterlernen.

Die türkische Richtung bleibt ein festes Spiel mit Wort-/Suffixbank, Infinitiven, Drag-and-drop, Rücknahme und Bankseiten ohne Scrollen. Die Gegenrichtung verwendet die gemeinsame App-Tastatur zum Eingeben der Bedeutung; deutsche Bausteine gibt es nicht. A1/A2 nutzt -iyom/-iyon/-iyo/-iyoz und Fragen wie geliyon mu; ab dem erstmaligen Erreichen von B1 die Standardformen. Der Levelbalken enthält Zahl und Sprachstufen.

Alle Lernstände und angefangenen Aufgaben bleiben im Browser. Es gibt keine Oberfläche zum Sichern/Importieren. [Der neue Lernweg](docs/gefuehrter-lernweg.md) beschreibt Speicherung, Grenzfälle, Generator und Migration. Frühere Pläne in docs bleiben als Historie erhalten; die dort beschriebene ausschließlich wort-/grammatikbasierte Levelberechnung ist seit diesem neuen Nutzerauftrag überholt.

## Neue Wörter und Aufgaben

564 Wörter/Namen, 23 Themen und persönliche Referenzen bilden die Grundlage. Der Generator kombiniert Rollen und Flexion zu neuen Aufgaben. Mit begrenztem Wortschatz wiederholen sich Kombinationen; der Aufgabenbestand ist nicht auf160 Sätze beschränkt. Neue Wörter brauchen stabile IDs, Wortarten, deutsche Flexionsdaten, türkische Besonderheiten und Themen/Rollen. Ein eigener visueller Hinweis kann als picture.scene ergänzt werden; Fehlt für ein später ergänztes Wort noch ein geeignetes Bild, wird nur seine Bildauswahl ausdrücklich übersprungen; die Sprechgruppe und beide Schreibübersetzungen bleiben Pflicht. Neue Wörter vergrößern abgeschlossene Pflichtpakete nicht nachträglich. Neue Varianten bereits eingeführter Regeln können weiter geübt und freigeschaltet werden.

Die App-Tastatur bietet DE/TR, Zahlen, Shift, Satzzeichen, gehaltenes Löschen, einen antippbaren Cursor und sanfte Eingabeanimation. Buchstabenvorschau und kurze Vibration sind optional, standardmäßig aus. Die Einstellungen stehen im schriftlichen Worttrainer unter „Tastatur“. Es gibt keine automatische Antwortkorrektur.

## Offline prüfen

Kein Build und keine Paketinstallation nötig. Module und DOM-Adapter werden ohne laufende App geprüft:

```powershell
node --test tests/*.test.cjs
node tools/audit-guided-path.cjs
```

Die automatischen Prüfungen ersetzen weder eine echte Handybedienung noch eine unabhängige türkische Gesamtprüfung. Live-Tests führt auf Nutzerwunsch der Nutzer selbst durch.
