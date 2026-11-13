# Klang und Tastaturfeedback · QA53 · 13.11.2026

Der Lautsprecher zeigt jetzt Ton aus, Ton an oder Ton + Musik als Symbol und knappe Beschriftung. Antippen schaltet weiter. Der vorhandene gespeicherte Tonmodus bleibt erhalten; neue Sitzungen beginnen weiterhin stumm. „Ton an“ aktiviert die Interaktionsklänge, die dritte Einstellung zusätzlich die bestehende Musik im Satzbau. Ausdrücklich angeforderte Sprachbeispiele bleiben unabhängig davon nutzbar.

Kurze synthetische Klänge begleiten Buttons, Filter, Tastatur, gesetzte Bausteine und Rücknahme. Ein leises gefiltertes Rauschen begleitet Ansichts- und Bankseitenwechsel sowie Karteikarten. Richtig/falsch unterscheiden sich, ein bestandenes Level bekommt einen kurzen aufsteigenden Klang, einschließlich Level160. Allgemeine Klicks werden unterdrückt, wenn dieselbe Interaktion bereits eine speziellere Rückmeldung ausgelöst hat. Keine heruntergeladenen oder fremden Soundaufnahmen.

Die gemeinsame Tastatur gibt je eingegebenem Zeichen einen 7-ms-Impuls, auch bei gehaltenem Löschen und Buchstabenvarianten. Neue Tastatureinstellungen aktivieren die Vibration. Bereits gespeichertes Ausschalten bleibt erhalten; die vorhandene Einstellung bleibt bedienbar. Der globale Buttonimpuls wird für die App-Tastatur ausgeschlossen, damit kein doppeltes Rütteln entsteht.

Audio wird im Benutzerereignis aktiviert. Musik pausiert im Hintergrund und beim Verlassen. Hörtexte pausieren Effekte/Musik; beim Worttrainer erhält die Fehlerrückmeldung180ms vor der anschließenden Sprachausgabe. Navigation bricht diese verzögerte Ausgabe ab. Lernstand und Bewertung bleiben unverändert.

Technische Grenzen: Die Web-Vibration ist geräte-/browserabhängig ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)). Der Browser kann Audio bis zu einer Nutzerinteraktion zurückhalten ([Chrome](https://developer.chrome.com/blog/autoplay)); deshalb wird der Audiokontext direkt in der Interaktion fortgesetzt. Keine Live-Tests: Klanggefühl, Lautstärke und echte Vibration werden auf dem Handy vom Nutzer beurteilt.

Prüfung: neue Offline-Fälle für sichtbaren Status, gespeicherte Stummschaltung, doppelte Impulse, gehaltenes Löschen, Navigation, Ergebnisfeedback, Sprachausgabe und deren Abbruch. Gesamtsuite und Veröffentlichung folgen; keine Erledigung ohne Nachweis.
