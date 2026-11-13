# Gesamtprüfung und Lernerlebnis · 13.11.2026

## Ergebnis und Reichweite

Die App hat eine brauchbare Grundlage für personalisiertes Wort-, Formen- und Satztraining. Sie ist **noch kein vollständiger A1–B2-Sprachkurs**. Die Anzeige bezeichnet den Kursabschnitt, nicht eine unabhängig festgestellte Sprachkompetenz. Die persönliche Themenauswahl und bekannte Namen funktionieren als motivierender Kontext; sie ersetzen keine Fertigkeitsprüfung.

Geprüft wurden die Laufzeit-Verknüpfung, Datenmodelle, Freischaltungen, Speicherübergänge, Satzgeneratoren, Morphologie, Antwortprüfung, Tastatur, Gesten, Navigation, Filter und Rückmeldungen. Die automatisierten Prüfungen umfassen alle 160 Schritte und alle 23 Themen. [Einzelprotokoll aller Level](level-audit-2026-11-13.json). Kein Browser, Server, Mikrofon oder Live-App-Test wurde gestartet. Darstellung, Hörkomfort und Lernwirkung sind damit nicht abgenommen.

Die lokale Ausgangskopie war älter als GitHub. Vor Abschluss wurden sämtliche neueren Appänderungen bis `04f9d3e` übernommen: Textauswahl ohne Bild-/Sprechpflicht, eindeutige Ergebnisanzeige, automatische Worttrainer-Fortsetzung nach zwei Sekunden, bekannte Namen aus dem Lernwortschatz ausgeblendet und Buchstabenvarianten beim Gedrückthalten. Die zusätzlichen eigenständigen Projekte im Repository wurden nicht bearbeitet. Frühere lokale Aussagen zu einer aktiven Sprechphase sind für die veröffentlichte App überholt.

Das Inventar umfasst 564 Wörter/Namen, 474 Pflichtwort-IDs und 74 automatisch verfügbare Einträge. Im ersten Level sind 24 Wörter neu. In der geprüften Startmenge gibt es insgesamt 89 verschiedene Sätze; einzelne Themen haben zunächst nur eine Variante. Das erklärt echte Wiederholung trotz Generator.

Die 348 hinterlegten türkischen Referenzen werden zusätzlich mit ihren ausgeschriebenen Ausgangssätzen verglichen. Das prüft ihre technische Realisierung, nicht automatisch die Qualität jeder deutschen Übersetzung oder die Natürlichkeit jeder möglichen Kombination. Der Generator ist regelbasiert, endlich kombinatorisch und besitzt kein allgemeines Weltverständnis. Wiederholungen bleiben bei kleinem Wortschatz unvermeidlich.

## Korrigierte Fehler und umgesetzte Bedienung

| Befund | Änderung |
| --- | --- |
| Genitiv von `su` wurde `sunun` | Korrekt `suyun`; vorhandene Besitzketten bleiben erhalten. |
| Nominale Pluralfrage wurde `güzel miler` | Korrekt `güzeller mi`. |
| Nominale Prädikate über `predicatePerson` verloren Frage/Vergangenheit | Merkmale werden mitverarbeitet, z. B. `evde misin`, `evdeydim`. |
| 13 persönliche Referenzen verwechselten äußerlich gleiche Kasus- und Besitzformen | `Ben’i` wird als Akkusativ, `Mert’in` als Genitiv modelliert. Der Compiler enthält die semantische Entscheidung, die erzeugten Daten wurden erneuert. |
| Ein synchroner Fehler der Sprachausgabe konnte die Rückmeldung unterbrechen | Audioaufrufe sind abgesichert; die sichtbare Wortantwort und der aktuelle Textlernweg funktionieren ohne Audio. Die zunächst untersuchte alte Sprechpflicht ist im neueren GitHub-Stand bereits entfernt. |
| Fertige Sätze verschwanden automatisch | Erfolg und Lösung bleiben bis **Weiter** sichtbar. |
| Wortbank sprang nach dem Einsetzen durch erneutes Mischen | Die verbleibenden Wörter behalten ihre relative Reihenfolge. Seiten packen weiterhin platzsparend. |
| Ein Suffix konnte ungefragt am letzten von mehreren passenden Wörtern landen | Automatische Zuordnung nur bei eindeutigem Ziel; sonst Suffix und gewünschtes Wort antippen. Ziehen bleibt verfügbar. |
| Jede deutsche Satzbedeutung musste abgetippt werden | Neue deutsche Aufgaben wechseln zwischen Bedeutungsauswahl und Schreiben. Türkische Aufgaben bleiben aktiver Satzbau. |
| Nur visuelle Rückmeldung | Optionale kurze Klänge und sehr leise, selbst erzeugte Musik; standardmäßig aus. |

Die Bedeutungsauswahl wird anhand von Level und Thema in ungefähr drei von vier deutschen Themenaufgaben versucht. Zwei bis vier unterschiedliche Antworten stammen aus zulässigen Sätzen derselben Aufgabenstufe; bei langen Texten gibt es weniger Optionen. Reicht der Pool nicht, bleibt die Schreibaufgabe. Vorhandene Schreibentwürfe werden nicht umgewandelt. Fehler und Hilfe zählen weiterhin nicht als direkter Erfolg; Reihenfolge und Auswahl bleiben gespeichert. Wiedererkennen ist ein rezeptiver Nachweis, kein Nachweis selbstständiger schriftlicher Produktion. Die aktuelle Wortlernfolge **ganze Gruppe Textauswahl → beide Schreibrichtungen** mit zweisekündiger automatischer Fortsetzung bleibt bestehen.

Das Notensymbol wechselt **aus → Klänge → Klänge und Musik → aus**. Keine Wiedergabe beim Laden; Aktivierung durch Bedienung. Musik endet beim Verlassen des Satzbaus und pausiert im Hintergrund. Keine Musikdateien, Downloads, zusätzlichen Dienste oder personenbezogenen Tonaufzeichnungen. Die Klänge sind ein optionales Gestaltungsmittel, kein behaupteter Lernverstärker. Die Umsetzung folgt den [Web-Audio-Hinweisen von MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices) zu Nutzeraktivierung und Kontrolle.

## Vollständiger Weg: fachliche Einordnung der 32 Abschnitte

Je Abschnitt wurden alle fünf Einzellevel auf verfügbare Wörter, neue Formen, Satzpool und Themenabdeckung geprüft. Die folgende Spalte „Nächster Lernschritt“ ist eine **Empfehlung für den Ausbau**, keine bereits implementierte Fertigkeit.

| Level | Vorhandener Schwerpunkt | Nächster Lernschritt für einen vollständigen Kurs |
| --- | --- | --- |
| 1–5 | Dinge, Eigenschaften | Gegenstände aus Gehörtem auswählen; kurze Selbstvorstellung |
| 6–10 | var/yok, Verneinung, Fragen | Frage hören und passend antworten |
| 11–15 | Person und Präsens | Zwei Personenhandlungen unterscheiden; kleine Dialoge |
| 16–20 | Ort und Ziel | Wege und Orte auf einer Skizze verstehen |
| 21–25 | Bestimmte Objekte | Bestimmtheit aus einer Situation wählen |
| 26–30 | Herkunft und Begleitung | Treffpunkt, Start und Begleitung vereinbaren |
| 31–35 | Plural und Besitz | Personen und Gegenstände zuordnen |
| 36–40 | A1-Verknüpfungen | Erste Alltagsmission ohne vorgegebene Übersetzung |
| 41–45 | Vergangenheit | Kurzen Tagesablauf hören und ordnen |
| 46–50 | Zukunft | Ausflug planen und Rückfragen beantworten |
| 51–55 | Gewohnheit und Gehörtes | Beobachtung, Hörensagen und Routine unterscheiden |
| 56–60 | Vergleichen und Können | Angebote vergleichen und auswählen |
| 61–65 | Müssen und Vorschläge | Gemeinsam einen Plan aushandeln |
| 66–70 | Verbindung, Grund, Zweck | Einen Plan mit eigener Begründung formulieren |
| 71–75 | Ablauf und Begleitung | Handlungsfolge anhand kurzer Audios rekonstruieren |
| 76–80 | Handelnde näher beschreiben | Personen in Bildern und Texten identifizieren |
| 81–85 | Standardformen, Zeitbezüge | Alltagssprache verstehen und in Standardsprache umformulieren |
| 86–90 | Bedingungen | Alternativpläne und Folgen erklären |
| 91–95 | Nominalisierte Handlungen | Wünsche und Meinungen in eigener Form ausdrücken |
| 96–100 | Abhängige Aussagen | Aussagen anderer verstehen und zusammenfassen |
| 101–105 | Objektbezüge | Mehrdeutige Bezüge aus Kontext auflösen |
| 106–110 | Passiv und Reflexivität | Vorgänge beschreiben, ohne immer Handelnde zu nennen |
| 111–115 | Berichten und Erfragen | Rückfragen und kurze indirekte Berichte |
| 116–120 | Einräumung | Verschiedene Gründe abwägen |
| 121–125 | Vergangenes zeitlich einordnen | Zusammenhängende Erlebniserzählung |
| 126–130 | Gegenseitigkeit und Veranlassung | Handlungsverantwortung im Kontext unterscheiden |
| 131–135 | Besitz und komplexe Bezüge | Präzise längere Beschreibungen |
| 136–140 | Berichte, Personen, Zeit | Perspektivwechsel über mehrere Sätze |
| 141–145 | Seit, solange, weil | Zeitverlauf und kausale Zusammenhänge erklären |
| 146–150 | Gegensatz und Alternativen | Eine Position mit Gegenargument begründen |
| 151–155 | Mehrere Beziehungen | Kurze Stellungnahme lesen, hören und beantworten |
| 156–160 | Transfer | Getrennte Hör-, Gesprächs-, Lese- und Schreibaufgaben |

Der [Europarat](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale) beschreibt A1/A2 über einfache alltägliche Kommunikation, B1 über zusammenhängende Äußerungen und B2 über komplexere Inhalte, Interaktion und begründete Standpunkte. Die [Deskriptoren](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) umfassen Rezeption, Produktion, Interaktion und Mediation. Daraus folgt meine Bewertung: Eine Grammatikliste und korrekt zusammengesetzte Sätze allein belegen diese Stufen nicht.

Der [Lehrplan der Universität Ardahan](https://touam.ardahan.edu.tr/sayfa/bilgi-paketi-ve-ders-katalogu-8138-67-75d8f213-c2ab-466f-a01e-74136f460001) stützt Fälle, Besitz und Präsens im frühen Kurs sowie Zeitformen und Modalität im Aufbau. Er führt unter anderem einfache Relativformen schon in A2 und komplexere Nominalisierungen in B1. Diese Platzierungen sind mit der Richtung der App vereinbar. Seine B2-Liste enthält zusätzliche Verbindungen und Formen, etwa `-DIKçA` und `-mAksIzIn`, die die App noch nicht systematisch abdeckt. Die Quelle beschreibt außerdem eigenständige Hör-, Interaktions- und Schreibziele. Die 160er-Aufteilung ist unsere Gestaltung, keine offizielle Prüfungseinteilung. Die ältere Kastamonu-Seite lieferte beim aktuellen Abruf keinen verlässlich auslesbaren vollständigen Lehrplan; sie wurde daher nicht als Detailnachweis verwendet.

A1/A2-Alltagsformen ohne Schluss-r bleiben auf ausdrücklichen Nutzerwunsch erhalten, Standardformen ab erstmaligem B1. Für Kursersatz sollte Standardsprache später zusätzlich schon früh **hörend erkannt** werden; eine r-Aussprachestörung ist kein Grund, Verständnis von Standardtürkisch auszuschließen. Das ist eine Empfehlung, keine heimliche Änderung der bisherigen Aussprachevereinbarung.

## Offene Befunde und priorisierter Ausbau

| Priorität / Aufgabe | Beleg / konkrete Verbesserung | Abnahmekriterium |
| --- | --- | --- |
| Hoch · QA51-01 Einstieg entlasten | Level 1 verlangt 24 neue Wörter. Der Vollgruppenablauf und die 23 Themen erzeugen einen langen Einstieg. In kleine abgeschlossene Lernportionen aus Auswahl und Schreiben zerlegen. | Jede Portion vollständig; alte Gruppen sicher fortsetzen; keine vorgezogenen unbekannten Antwortwörter. |
| Hoch · QA51-02 Runden in kurze Etappen teilen | Mindestens 46 gewertete Aufgaben je Level; zwei Einführungen und zusätzliche Formnachweise kommen hinzu. Für den jetzigen Gesamtauftrag wurden die vom Nutzer vereinbarten Quoten nicht still geändert. | Kurze sichtbare Etappen bei weiterhin gesicherter Themenabdeckung; Rückkehr genau an derselben Stelle. |
| Hoch · QA51-03 Fertigkeiten statt bloßer Formen | Hörverständnis, spontane Dialoge und freies mehrsätziges Schreiben fehlen weitgehend. | Pro Stufe getrennte Aufgaben und Nachweise für diese Fertigkeiten; kein B2-Versprechen aus dem Spiellevel. |
| Hoch · QA51-04 Eigenständige Sprachabnahme | Automatische Oberflächenvergleiche entdecken keine unpassende Bedeutung oder semantische Rollenwahl. | Türkischkundige Prüfung der Referenzen, Rollenregeln und ausgewählter Generatorausgaben; konkrete Negativbeispiele als Tests. |
| Mittel · QA51-05 Vertraute Namen präzisieren | `Aang`, `Link`, `Mert` und `Ben` sind automatisch verfügbar; `ben` als Pronomen bleibt getrennt. Derzeit gilt aber jedes `properName` als bekannt, auch `Mısır` oder `Orta Çağ`. | Eigene Vertrautheitsangabe statt Gleichsetzung von Eigenname und bekanntem türkischem Wort; Migration ohne Verlust alter Freigaben. |
| Mittel · QA51-06 Wirkliche Variation | Neue Wörter und Anreden liefern neue Zeichenketten, aber nicht automatisch neue Lernerfahrungen. Bei Formenknappheit ergänzt der Code Anreden als weitere Belege. | Nachweise nach grammatischem Kontext unterscheiden; bloßer Namenswechsel erfüllt nicht allein alle Transferziele. |
| Mittel · QA51-07 Fällige Wiederholungen | Die App speichert Wiederholungsdaten und gewichtet Fälligkeit; das garantiert noch keine gezielte spätere Abrufprüfung jedes Wortes. | Verteilte spätere Aufgaben mit Abruf statt nur Wiedererkennen, inklusive fälliger Wörter nach Kursabschluss. |
| Mittel · QA51-08 B2 vervollständigen | Die vorhandenen B2-Muster verbinden bekannte Formen; zusätzliche Formen, längere Texte, Register und Argumentation fehlen. | Erweiterte Konstruktionen mit Voraussetzungen, zweisprachigen Referenzen und Transferaufgaben; unabhängig überprüft. |
| Mittel · QA51-09 Audio und Ergebnisdauer | Stimmen hängen vom Gerät ab. Wortergebnisse wechseln aktuell nach zwei Sekunden; diese neuere Einstellung bleibt erhalten. | Hörqualität auf Andrés Handy prüfen; bei Bedarf einstellbare Ergebnisdauer oder Pause anbieten. Ein späteres Aussprachemodul braucht eine eigene, geeignete Bewertung. |
| Wartung · QA51-10 Alte Pfade reduzieren | Alter Lernkern, neuer Kurskern und geführter Weg sind aufeinander geschichtet; index.html enthält historische Oberflächenlogik. | Schrittweise Entkopplung mit Migrations- und Gestennachweisen; keine pauschale Neuschreibung. |

Für spätere Wiederholungen ist [Kim und Webb, 2022](https://onlinelibrary.wiley.com/doi/full/10.1111/lang.12479) relevant: Die Metaanalyse untersucht verteiltes Zweitsprachenlernen und stützt zeitlich verteilte Übung. Sie validiert weder unsere 46 Aufgaben, noch die 80-%-Grenze, noch drei Anwendungen pro Richtung. Diese Schwellen bleiben Produktentscheidungen und müssen anhand tatsächlicher Nutzung überprüft werden.

## Prüfpfade und Grenzen

- `node --test tests/*.test.cjs`: bestehende Kern-, UI-Modell-, Gesten-, Migrations-, Tastatur- und neue Fehlerfälle.
- `node tools/audit-experience.cjs`: 348 Referenzrealisierungen, eingebundene Skripte/Assets, Wörter und Einzelinventar aller 160 Level.
- `node tools/audit-guided-path.cjs`: reproduzierbarer kompletter Durchlauf mit allen Themen, beiden Richtungen und den neuen Verständnisoptionen.
- Bereits bestehender Generator-Test: 11.040 Ausgaben aus 160 Leveln × 23 Themen × drei Varianten; erlaubt keine Aussage über jede theoretisch mögliche Kombination.

Die lokale Projektakte enthält die tatsächlichen Laufprotokolle und Veröffentlichungsnachweise. Verbesserungen an Navigation und Ton sind offline geprüft, ihr subjektives Gefühl und das Verhalten echter Mobilbrowser bleiben bewusst offen. Es wurden keine Benutzer-Lernstände gelöscht, keine fremden Stimmen aufgenommen und keine Live-Tests durchgeführt.
