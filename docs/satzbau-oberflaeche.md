# Satzbau: kompakte Oberfläche und alte Gesten

Stand: 02.10.2026. Korrektur nach Nutzerfeedback zum Ausbau bis Level 160.

## Vergleich mit dem früheren Build

Referenz: `74e0d791791b7aa0e3056ebb7aeef5944c3781a8`, vor dem Curriculum-Ausbau.
Die alte Ansicht hatte farbige Wortkarten, eine übersichtliche Aufgabe und zwei
Spielaktionen. Ein Tippen setzte Wörter ein; im Satz nahm es zuerst die Endung
und anschließend das Wort zurück. Ziehen zeigte eine bewegliche Kopie und erlaubte
Einsetzen, Umordnen, Rücklegen und das Anheften von Endungen.

Beim Ausbau waren diese Gesten durch bloßes Auswählen ersetzt worden. Die
zusätzlichen Karten und Erklärungen machten die Ansicht scrollbar. Neue Farben
verwendeten Variablen, die die App gar nicht definiert, sowie helle Ersatzwerte.
Auch die Wortkarten hatten die falschen Klassen für die bestehende Farbpalette.

## Korrektur

- Feste Spielfläche mit Level, kleinem Sprachlabel, Aufgabe, Satz und Wortbank.
  Unten bleiben „Keine Ahnung“ und „Prüfen“; nach Erfolg „Weiter“.
- Abschnittstitel, Fallmix, dauerhafte Erklärtexte und Bearbeitungsschaltflächen
  entfallen aus dem Spiel. Hilfe und gestufte Tipps liegen hinter „?“.
- Die bestehende Palette mit `surface`, `surface-soft`, `line`, `muted` und den
  Wortfarben gilt auch für die neue Oberfläche. Keine hellen Ersatzfarben.
- Tippen nimmt die zuletzt angelegte/ersetzte Endung zurück, dann das Wort.
  Ziehen mit Kopie und Zielmarkierung setzt Wörter ein, ordnet sie um, legt sie
  zurück und heftet Formen an passende Wörter. Abbruch und Navigation räumen auf.
- Formen erscheinen nur für Wörter im aktiven Satzteil. Zwei kompakte Auswahlen
  bestimmen Wort und Art der Endung; höchstens vier Karten bleiben sichtbar.
  Weitere Formen und große Wortbanken sind über Pfeile erreichbar, ohne Scrollen.
  Sehr kurze Ansichten zeigen drei Wörter pro Seite; Querformat nutzt zwei Spalten.
- Alle Wort-/Formaktionen bleiben ungewertet. Die bestehende Engine, Freischaltungen,
  160 Level, 733 Aufgaben, Wiederholung und gespeicherte Erstwertung bleiben erhalten.

## Prüfung

34 Node-Tests bestanden. Alle 733 Aufgaben wurden mit den tatsächlichen
Form-Auswahllisten, Seitenpfeilen und Karten gebaut und richtig geprüft.
Zusätzliche Regressionen prüfen Rücknahme von Endungsketten, Drag-and-drop,
Reihenfolge, Rücklegen, Endungsablage, Abbruch sowie optionale Hilfe/Tastaturfokus.

Browserprüfung in IAB und normalem Chrome: echtes Ziehen von Wort und Endung,
Umordnen, Rücknahme per Tippen, A1-Formen sowie langer B2-Satz mit drei Satzteilen.
Helle und dunkle Ansicht, 390×844, 320×568 und 667×375 geprüft. Im langen B2-Test
entsprachen Breite/Höhe der Inhalte den verfügbaren Flächen; Aktionen waren sichtbar.
Auch Fehler- und Erfolgszustand im Querformat geprüft. Darkmode-Proben verwendeten
isolierte Testseiten mit den identischen dunklen CSS-Regeln der App.

Echte Touchgeräte, Screenreader und Andrés persönliche Erprobung bleiben externe
Abnahmen. Testdaten waren durch eigene Speicherschlüssel vom echten Lernstand getrennt.
