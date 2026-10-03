# Satzbau: gemeinsame Wortbank

Historischer Bericht. Die Beschriftungen, automatische Zielwahl und Speicherdaten
wurden am 03.10.2026 durch [konkrete türkische Bausteine](satzbau-tuerkische-bausteine.md)
ersetzt. Die folgenden Aussagen gelten für den damals geprüften Stand aus PR #3.

Stand: 02.10.2026. Nutzeranforderung: Wörter, Suffixe und Verbformen gehören in
einen Bereich und lassen sich dort oder im Satz verbinden. Der separate
Bearbeitungsblock aus PR #2 entfällt.

- Eine gemeinsame Kartenfläche enthält Wörter und die verfügbaren Formen.
  Kleine Beschriftungen unterscheiden beispielsweise Fall, Besitz und Person.
  Es gibt keine Wort-/Endungs-Auswahllisten und keinen zusätzlichen Formbereich.
- Eine Endung auf ein passendes Wort ziehen funktioniert in der Wortbank und
  im Satz. Auch Wort auf Endung funktioniert. Wortbankformen werden gespeichert
  und bleiben beim Einsetzen oder Zurückziehen am Wort erhalten.
- Endung antippen ergänzt das zuletzt verwendete passende Wort, ersatzweise
  eines im aktiven Satzteil oder in der Wortbank. Wörter antippen setzt sie ein.
  Im Satz entfernt Tippen die letzte Endung, dann das Wort. Ziehen ordnet um
  oder legt ein Wort samt Formen zurück. Abgebrochene Gesten räumen auf.
- Die Wortbank passt ihre Seitenzahl an die verfügbare Höhe an. Das gerade
  bearbeitete Wort in der Wortbank bleibt beim Blättern sichtbar, sodass sich
  auch mehrere Formen über verschiedene Seiten hinweg kombinieren lassen.
- Darkmode, feste Spielfläche, optionale Hilfe, Freischaltungen und Wertung bleiben
  erhalten. Curriculum, Lern-Engine und Speicherschema wurden nicht geändert.

## Prüfung

36 Node-Tests bestanden. Alle 733 Aufgaben wurden über die tatsächlichen Karten
und Seitenpfeile der gemeinsamen Wortbank gebaut und richtig geprüft. Zusätzliche
Regressionen decken beide Ziehrichtungen in der Wortbank, Endungsketten über Seiten,
Abbruch, Einsetzen, Rücknahme und Wiederaufnahme gespeicherter Wortbankformen ab.

Chrome mit isolierten Testdaten: echte Gesten erzeugen `arabayı` und `görüyorsun`
in der Wortbank; danach Einsetzen und Rücknahme im Satz. Helle/dunkle Ansicht und
390×844, 320×568 sowie 667×375 geprüft, einschließlich des B2-Satzteils mit fünf
Wörtern. Nach Abschluss der Layoutanpassung keine verdeckten Karten oder Aktionen
und keine Scrollfläche; Browserfehlerprotokoll leer. Echte Touchgeräte, Screenreader
und Andrés persönliche Erprobung bleiben externe Abnahmen.
