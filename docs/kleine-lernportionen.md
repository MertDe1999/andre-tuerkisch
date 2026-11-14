# Kleine Lernportionen · 13.11.2026

Aktualisierung vom 14.11.2026: [Die automatische Duellrunde](automatische-duellrunde.md) ersetzt die manuelle Themen-/Moduswahl und deutsche Schreibantworten. Die hier beschriebenen älteren Eingabeabläufe bleiben als Historie erhalten; Kursanforderungen und gespeicherte Nachweise gelten weiter.

## Verhalten

Die 24 Startwörter werden in sechs feste Portionen mit je vier Wörtern aufgeteilt. Auch spätere Wortpakete werden in höchstens vier neue Wörter geteilt. Jede Portion durchläuft zuerst die gesamte türkische Textauswahl, danach beide Schreibrichtungen. Erst danach beginnt auf ausdrücklichen Klick die nächste Portion. Kleine Restgruppen behalten weniger Auswahlmöglichkeiten; bekannte oder spätere Wörter werden nicht ergänzt.

Eine schmale Fortschrittslinie zeigt die Auswahl-/Schreibnachweise der aktuellen Portion. Am Ende stehen nur „Portion geschafft“, die Zahl gelernter Wörter und „Nächste Portion“ / „Für heute fertig“. Nach der letzten Portion führt „Zur Grammatik“ weiter. Die zweisekündige Rückmeldung innerhalb einer Portion bleibt erhalten; der Pausenpunkt verschwindet nicht automatisch. Alle Wörter des höchsten begonnenen Levels bleiben Voraussetzung für dessen Grammatik/Satzbau.

Die Satzbau-Runde besteht weiterhin aus zwei ungewerteten Einführungen und mindestens 46 gewerteten Sätzen. Sie ist jetzt in Etappen mit höchstens sechs gewerteten Sätzen geteilt: sieben Sechseretappen und zuletzt vier Themenaufgaben. Falls danach Formnachweise fehlen, folgen ebenfalls kurze Etappen mit höchstens sechs Sätzen. Wird das Level innerhalb einer zusätzlichen Etappe beendet, endet diese früher. Etappe und kleiner Satzzähler ersetzen die lange Rundenanzeige.

Nach einer Etappe bleiben „Etappe geschafft“, die direkt richtigen Antworten sowie „Nächste Etappe“ / „Für heute fertig“ sichtbar. Eine Etappe allein verändert den Level nicht. Alle 23 Themen, beide Richtungen, mindestens 80 Prozent direkt richtig und drei verschiedene Anwendungen je neuer Pflichtform/Richtung gelten weiterhin für das gesamte Level. Fehler werden daher auch über Pausen hinweg berücksichtigt; kein erneuter Abstieg durch denselben Satz.

Ein begonnenes offenes Thema führt nach seinen zwei Richtungen automatisch zum nächsten offenen Thema. Wer ein bereits erledigtes Thema ausdrücklich neu öffnet, übt weiterhin frei. Freies Üben zählt weder für Etappen noch für die Levelwertung. Nach Level 160 bleibt das freie Training erhalten.

## Speicherung und Übernahme

Portionen speichern ihre festen Wort-IDs, Nummer und Gesamtzahl in `andreWordPreparationV1`. Angehende Wörter verschwinden nicht aus der Portion, sobald die erste Schreibantwort richtig ist. Teilweise gelernte Richtungen, fehlgeschlagene Versuche, Entwurf und Cursor werden weiterverwendet. Beim ersten Wechsel aus einem alten großen Paket wird die aktuelle Frage samt gültigen Antwortoptionen bevorzugt in die erste kleine Portion übernommen. Keine bereits bestandene Richtung wird zurückgesetzt.

Etappen speichern Startposition und Nummer innerhalb von `andreGuidedPathV1`. Bestehende Runden behalten sämtliche Antworten, Themen und Grammatiknachweise. Alte Runden werden anhand ihres bisherigen Zählers passend eingeordnet; eine bereits angefangene Frage wird nicht durch einen nachträglichen Pausenpunkt verdrängt. Neue Etappenabschlüsse bleiben nach Navigation und Neuladen offen, bis André selbst fortsetzt.

Vier Wörter und sechs Sätze sind bewusste Größen für diesen Umsetzungsschritt, keine wissenschaftlich nachgewiesenen Idealzahlen. Die Erprobung auf dem Handy bleibt beim Nutzer; keine Live-Tests durch Codex.

## Prüfung

Neue Offline-Fälle prüfen alle 160 Wortpakete und 474 Pflichtwörter, die sechs Startportionen, bestehende Auswahl-/Schreibzustände, explizite Pausen, Neuladen, Satznachweise, alten Rundenzähler, Themenwechsel und vollständigen Aufstieg. Der vollständige Kurssimulator berücksichtigt jede Etappenpause und prüft weiterhin alle 160 Level/23 Themen/beide Richtungen. Tatsächliche Ergebnisse und Veröffentlichung stehen in der lokalen Projektakte.

Weitere Aufgaben aus dem Kursaudit bleiben separat offen (QA51-03 bis QA51-10), insbesondere zusätzliche Hör-/Dialog-/Schreibfertigkeiten und unabhängige Sprachabnahme.
