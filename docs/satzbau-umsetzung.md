# Satzbau: Umsetzung und Prüfstand

Stand: 02.10.2026. Beauftragt durch „Setze die Planung um“. Technische Umsetzung des [geprüften Plans](satzbau-plan.md); persönliche Erprobung wird gesondert abgenommen.

## Gelieferte Funktionen

| Paket | Ergebnis |
| --- | --- |
| P01 | Gemeinsamer Katalog mit stabilen IDs: 33 bestehende + 18 ergänzte Wörter; 65 Karten. Bestehende Freischaltungen einschließlich Redewendungen mit Satzzeichen bleiben zugeordnet. |
| P02 | 20 Abschnitte, 56 Regeln und 733 Aufgaben über Level 1–160; explizite Voraussetzungen, neutrale Einführungen und separate Aufgabenlabels. |
| P03 | Einmalige +1/−1-Wertung aktueller Aufgaben, Hilfe/Wiederholung/Korrektur neutral; Aufgabeninstanz über Reload gespeichert, Obergrenze 160, Übergang erst mit zwei ohne Hilfe gelösten Aufgaben je Regel. |
| P04 | Sechs Grundkategorien plus Mit-Form, Harmonie, Stammwechsel, Plural, Besitzketten, Fragen/Verneinung und frühe Vergangenheit; Standard-/Alltagsregister. |
| P05 | Gemeinsame Planung in 20 Aufgaben: Ziel 12 aktuell / 5 gezielt / 3 älter; verfügbare Fälle sichern, Akkusativ zusätzlich gewichten, Personen/Varianten ausgleichen, dieselbe gezielte Schwäche begrenzen. Fehlende Fälle/Wörter sichtbar. |
| P06 | Wort-, Form- und Satzbezugsfehler unterscheiden; konkrete falsche Regel nachfördern. Fehler nach 3–5 anderen Aufgaben, richtige Antworten zunächst nach etwa 10 Aufgaben, danach 1/3/7/21 Tagen und später 60 Tagen; höchstens eine Tagesstufe pro lokalem Lerntag. Gestufte Hinweise. |
| P07 | V2-Lernstand, historische V1-Wertung, JSON-Export/-Import mit Vorschau, bestätigtes Rücksetzen und Rückfallsicherung; ungültiges V2-JSON vor Überschreiben separat aufbewahren, Speicherfehler anzeigen. |
| P08 | Technische A1-Spielrunden und Gegenbeispiele geprüft. Die persönliche Erprobung mit André und vollständige externe Abnahme bleiben offen. |
| P09 | A2: Vergangenheit/nominale Vergangenheit, sechs Personen, Zukunft, Aorist, Können, Vergleich, berichtete Vergangenheit, Begründung und -ip. |
| P10 | Satzteilgruppen und passende Umstellungsregeln; falsche Zuordnung ablehnen; Pronomen nur konstruktionsabhängig weglassbar. |
| P11 | B1: Notwendigkeit, Wünsche, Zweck, -ma, -ken/-ince/-erek, vorher/nachher, Aoristbedingungen, -DIK/-AcAK und abhängige Inhalte. |
| P12 | B2: Relativkonstruktionen, Passiv/reflexiv/reziprok/Veranlassung, indirekte Aussagen/Fragen, rağmen und kombinierte Aufgaben; Training geht auf Level 160 weiter. |

Die Mixwerte sind Ziele für verfügbare Aufgaben. Ohne fällige Wiederholungen, bei knappen Freischaltungen oder erforderlicher Fallabdeckung verschiebt sich der Mix. Einführungen und Korrekturversuche verbrauchen keine weitere Stelle in einem 20er-Block. Ein Abstieg entfernt eingeführte Regeln nicht.

## Validierung

- 31 Node-Tests bestanden. Unabhängig festgelegte türkische Formen prüfen unter anderem `arabasında`, `evlerimizde`, `evimdeyim`, `gideceğim`, `geldin mi`, `gördüğünü`, `gelirsen`, `gideyim` und `gidelim`.
- Alle 733 Aufgaben lassen sich im tatsächlichen Browseradapter über Wort- und Formkarten lösen. Gegenprüfungen verwerfen falsche Personen, Fälle, Gruppenzuordnungen und Reihenfolgen.
- Simulierte vollständige Lernreise erreicht 160, führt alle Regeln ein und bleibt danach auf maximal 160. Leere/kleine Wortschätze, Fallabdeckung, Nachförderung, Tageswechsel, korrupte Imports, Speicherfehler und Rücksetzen geprüft.
- Echte Browserrunde A1: absichtlich `arabaya` statt `arabayı`, einmaliger Abstieg 16→15, Reload und erneutes Prüfen ohne weiteren Abstieg, korrekte Korrektur ohne Aufstieg.
- Echte Browserrunde B2: `senin gördüğün araba güzel` aus einzelnen Karten gebaut; erster Versuch richtig, 125→126. Tastaturbedienung und sichtbarer Satzbezug geprüft.
- Responsive Ansicht mit 390×844 Pixeln: kein seitlicher Überlauf. Das ist eine Browsergrößenprüfung, keine Prüfung auf einem echten Handy.
- Import mit Vorschau übernimmt Test-Level 42 und 51 Freischaltungen. Rücksetzen mit Bestätigung ergibt Level 1 bei erhaltenen Wörtern; Wiederherstellung bringt den vorherigen Teststand zurück. Keine JavaScriptfehler in den geprüften Runden.
- Download-Schaltfläche erzeugt die Sicherung und die Erfolgsmeldung. Das Download-Ereignis des eingebauten Prüf-Browsers wurde nicht geliefert; die gespeicherte Datei wurde deshalb dort nicht unabhängig nachgelesen. Der Datenrundlauf ist im Node-Test geprüft, der Dateiimport im Browser.

Alle Browserdaten waren isolierte Testdaten unter eigenen Speicherschlüsseln. Nachweise und Screenshots liegen in der lokalen Projektakte unter `00_Codex/Pruefungen/2026-10-02/`.

## Verbleibende Abnahmen

Persönliche kurze Runden mit André, echte Handy-/Touch- und Screenreaderprüfung sowie unabhängige türkische Gesamtprüfung der Aufgaben und Hilfen stehen aus. Die technischen Sprachbeispiele wurden geprüft; damit ist keine externe sprachliche Freigabe behauptet. A1–B2 bezeichnet die Orientierung der Grammatikaufgaben bei bewusst begrenztem Wortschatz, keine Zertifizierung der Sprachkompetenz.

Der Arbeitsbranch wird als PR geprüft. Die Live-App übernimmt Änderungen erst nach dem Merge und dem Pages-Lauf.
