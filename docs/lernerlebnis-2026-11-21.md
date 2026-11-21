# Bedienung und Abwechslung · 21. November 2026

Diese Überarbeitung folgt einer Nutzerweg-Prüfung im Quellcode und in isolierten Modellen. Es wurden keine Live-App-, Browser-, Handy- oder Klangtests durchgeführt.

## Konkrete Befunde und Änderungen

| Vorher | Jetzt |
| --- | --- |
| Einstieg sagt auch bei offenen Aufgaben „Los geht’s“; bei fehlenden Wörtern führt ein Umweg über eine leere Spielansicht. | Dieselbe André/Ben-Karte zeigt „Wörter lernen“ oder „Weiterlernen“, nennt den aktuellen Level und öffnet bei fehlenden Wörtern direkt den Worttrainer. |
| Nach einem Levelaufstieg heißt es irreführend, noch keine Wörter seien freigeschaltet. | Bei vorhandenem Wortschatz wird die Vorbereitung des nächsten Levels genannt. Die ursprüngliche leere Erstansicht bleibt erhalten. |
| Eine falsche Satz-Auswahl bleibt anklickbar; wiederholtes Antippen verarbeitet denselben Irrtum erneut. | Die Auswahl bleibt sichtbar markiert und deaktiviert, auch nach Neuladen. Andere Antworten bleiben korrigierbar. Korrekturen ergeben weiterhin keinen direkten Lernnachweis. |
| Vier lange Antworttexte können die feste Fläche überladen. | Lange Listen werden auf zwei oder drei nahe Alternativen gekürzt; richtige Antwort, erlaubter Wortschatz und Grammatik bleiben erhalten. Gespeicherte Listen behalten die korrekte und nach Möglichkeit gewählte Antwort. Keine deutsche Eingabe als Ersatz. |
| Die Reihenfolge der drei türkischen Aufgabenarten wiederholt sich gleich. | Je Dreiergruppe bleiben Satzbau, Dialog und Schreiben vertreten; ihre Startreihenfolge wandert. Hör-/Verständnisaufgaben bleiben dazwischen. Kein Menü zur Moduswahl. |
| Gelöste Sätze lassen sich nach der Antwort nicht unmittelbar anhören. | Ein kleiner Lautsprecher neben „Weiter“ liest den fertigen türkischen Satz. Erneutes Antippen stoppt; Navigation/Hintergrund brechen ab. Anhören bewertet nichts und startet keine Folgeaufgabe. |
| Die Gegnerleiste vermittelt keine konkrete verbleibende Trefferzahl. | „Noch X Treffer“ ergänzt den vorhandenen Balken. Herzen, Ben-Hilfe und Schadensregeln sind unverändert. |
| Ein gescheiterter Rundenschluss erklärt den Levelrückgang kaum. | Die bestehende Ergebniszeile nennt den folgenden Level und ob direkte Antworten oder Formnachweise fehlen. |

Alle 23 Interessen, Wortportionen, Freischaltungen und bisherige Kursbedingungen bleiben erhalten. Die Prüfung ergab keine Grundlage, die Lernquoten oder das Levelsystem heimlich zu ändern. Die Änderung fügt keine Informationsblöcke, Startdialogsperren, neuen Währungen oder Pflichtzeiten hinzu.

## Prüfung

Die vorhandenen Offline-Modelle prüfen Auswahl, Gesten, Audioabbruch, Speicherung und die 160 Lernschritte. Neue gezielte Regressionen prüfen den Einstieg, korrigierte Antworten, lange Auswahltexte, abwechslungsreiche Aufgabenfolgen, Wiedergabe nach der Lösung und Rundenschluss. Vollständige Ergebnisse und Veröffentlichungsnachweise stehen in der lokalen Projektakte, Bericht 59.

## Weitere Produktarbeit

Eine tatsächliche Nutzungsbeobachtung mit André bleibt wichtig: Welche Fehler wiederholen sich, welche Sätze wirken witzig, wann möchte er pausieren? Als nächste eigenständige Ausbauschritte sind kontextreiche mehrteilige Dialoge, zeitlich verteilte Abrufwiederholungen und eine unabhängige sprachliche Gesamtprüfung dokumentiert. Die jetzigen geführten Dialogantworten sind noch keine freien Gespräche. Eine reine Oberflächenüberarbeitung belegt keine vollständige Kurs- oder B2-Kompetenz.
