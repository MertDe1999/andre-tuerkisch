# Grammatik, Lernpfad und Satzgenerator

Umsetzung vom 04.10.2026. Ersetzt die frühere Grammatikübersicht mit hunderten Einzelkarten. Die bestehende Satzbaufläche, ihre Darkmode-Farben, Seitenpfeile und Gesten bleiben erhalten.

## Lernfolge

1. Wörterbuch: Wörter einer kleinen vorbereiteten Gruppe in beiden Richtungen lernen. Das gilt auch für Personalpronomen und Funktionswörter.
2. Grammatik: Thema und Regel wählen; kurze Erklärung lesen und Wörtergruppen oder Sätze übersetzen. Jede konkrete Form und jede Verwendung braucht drei richtige Antworten pro Richtung. Eine gezeigte Lösung zählt nicht. Zwischenstände und Eingaben bleiben gespeichert.
3. Satzbau: Gelerntes ohne Hilfe anwenden. Ein neuer Abschnitt öffnet erst nach seinem Vorgänger. Am Ende eines Abschnitts müssen die Pflichtformen gelernt und die Lernziele an jeweils zwei unterschiedlichen türkischen Sätzen direkt gelöst sein. Identische Wiederholungen zählen nicht als zweite Anwendung.

Die 32 Pakete sind feste Daten. Ihr vollständiger Inhalt steht in `data/reference-pairs.json`; jedes enthält neue Wörter, die Pflichtfolge und eigene deutsch-türkische Referenzpaare. Der Anfangswortschatz umfasst 53 Pflichtwörter aus dem Gesamtkatalog von 70 Wörtern. Jedes Paket umfasst fünf Level, je acht Pakete entsprechen A1, A2, B1 und B2. Die Stufen sind eine didaktische Einordnung der App.

Neu hinzukommende Wörter vergrößern weder bereits abgeschlossene Pflichtpakete noch deren Erfolgsschwellen. Neue nötige Varianten können zusätzlich gelernt werden. Bekannte Wörter schalten ihre grammatische Verwendung nicht automatisch frei: `var` kennen und Existenz/Besitz mit `var` ausdrücken sind getrennte Kenntnisse.

Die Standardformen beginnen ab dem erreichten B1-Übergang und bleiben nach einem Abstieg verfügbar. A1/A2 verwenden die vereinbarten Kurzformen und Fragen mit Person am Verb. Ein erster Fehler einer aktuellen Aufgabe senkt den Level einmal; ihre Korrektur verändert ihn nicht nochmals. Alte Aufgaben und gezielte Wiederholungen bleiben ohne Levelwertung. Tageswiederholungen warten beim nächsten Öffnen.

## Satzbildung und Wortergänzungen

Der Generator arbeitet mit kontrollierten Konstruktionen und Wortdaten. Bei einfachen Ereignissen verbindet ein gemeinsamer Satzbaum Person, Verb, Objekt/Ziel, Zeit, Frage und Verneinung. Daraus entstehen beide Sprachen und die benötigten Karten. Nomen bringen deutsche Artikel, Plural- und Ortsformen mit; Verben bringen Stamm, Präsensstamm, Aorist, deutsche Personenformen, Hilfsverb und Ergänzungstyp mit.

Komplexe Konstruktionen behalten die geprüften Beziehungen ihrer Referenzstruktur. Passende Nomen und Verben werden über ihre Wortdaten eingesetzt. Bei Nomen bleiben Genus, Zahl und gebundene Bezüge konsistent; Verben benötigen denselben Ergänzungstyp und kompatible deutsche Formen. Unklare deutsche Homographen, unvollständige Formdaten und lexikalisierte Ableitungen werden nicht geraten. Neue Adjektive mit einem deutschen Prädikatsprofil können nominale Aussagen bilden.

Beispiel einer späteren Erweiterung: Ein vollständig beschriebenes `aramak` kann im vorhandenen Inhaltsmuster `senin evi aradığını biliyorum` erzeugen: „Ich weiß, dass du das Haus gesucht hast.“ Dafür wird keine neue Satzliste pro Verb benötigt. Ein Nomen wie `kedi` erzeugt mit seinen deutschen Daten „Meine Katze ist schön.“ statt eines geratenen männlichen Artikels. Neue Konjunktionen oder neue Verbrahmen brauchen weiterhin eine passende Konstruktionsdefinition.

Pro Auswahlrunde gibt es begrenzte Erzeugungsversuche. Neue Kombinationen werden regelmäßig nachgeladen, während die aktive Aufgabe als vollständiger Datensatz gespeichert bleibt. Der endliche Wortschatz liefert viele Kombinationen, kein allgemeines oder unbegrenztes Sprachverständnis. Ungewöhnliche Kombinationen sind möglich; Kasus, Personenbezug und Verbrollen bleiben verbindlich.

## Harte Freigaben

- Alle lexikalischen Bausteine müssen im Wörterbuch bekannt sein.
- Jede konkrete Endung besitzt einen Schlüssel aus Funktion, Merkmalen und tatsächlicher Schreibweise. Akkusativ `-i` gibt Besitz `-i` nicht frei.
- Verwendungen wie Existenz, Ziel einer Bewegung, Infinitivzweck und Begründung werden separat geprüft.
- Wortabhängige Stammwechsel besitzen eigene Transferfreigaben.
- Grammatikübungen dürfen nur ihre bezeichneten neuen Ziele verwenden. Mehrteilige nominalisierte Formen werden als vollständige Wortkette geübt; gezählt werden ausschließlich die tatsächlich vorkommenden Varianten.
- Spätere Abschnittsformen bleiben gesperrt. Gespeicherte Aufgaben und Übungen werden beim Wiederaufnehmen erneut auf bekannte Wörter/Formen geprüft.

Eine gerade gelernte Variante gilt auch für weitere bekannte Wörter, wenn die übrigen Voraussetzungen erfüllt sind. Genus oder Stammwechsel werden beim Ergänzen neuer Wörter nicht anhand der deutschen Übersetzung geraten.

## Speicherung und Migration

Alles bleibt lokal im Browser. Es gibt keinen neuen Sicherungs-/Exportknopf und keinen Server für persönliche Lernstände. Wortfortschritt verwendet stabile Wort-IDs und liest die bisherigen türkischen Textschlüssel weiterhin. Bei gemischten Daten hat der stabile ID-Eintrag Vorrang.

Die neuen Zustände liegen in `andreTurkishGrammarCourseV2` und `andreTurkishSentenceCourseV3`. Vorhandene konkrete Formfreigaben, Level, höchster Level, Wortstatistiken und laufende Korrekturen werden übernommen. Alte Datensätze bleiben erhalten. Neue Verwendungen werden nicht aus einem alten Wort- oder Levelstand erfunden. Eine angefangene Aufgabe wartet bei fehlender neuer Grammatik, ohne ihre erste Wertung zu verlieren.

Neue Wörter können über die zentralen Daten oder `AndreWords.register` ergänzt werden. IDs dürfen nicht geändert oder wiederverwendet werden. Ohne ausreichendes Sprachprofil bleibt ein Wort im Wörterbuch lernbar; ungeprüfte Satzplätze werden nicht automatisch freigegeben.

## Prüfumfang

Die Tests laufen ausschließlich lokal in Node und einem DOM-Modell. Sie prüfen unabhängige Flexionsbeispiele, alle 188 neuen Referenzen einschließlich ihrer konkreten Karten, die bisherigen 733 Form-/Gestenfixtures, Übersetzungsschwellen, den realen Lernweg bis 160, alte Speicherstände, Wiederaufnahme und spätere Wortergänzungen. Der zusätzliche Paketaudit prüft alle 32 Abschnitte auf blockierte Freigaben und ausreichende Anwendungsbeispiele.

Keine Live-App, kein Browser und kein Handy wurden zur Erprobung geöffnet. Die persönliche Handyprüfung übernimmt der Nutzer. Die automatischen Tests sind keine unabhängige sprachwissenschaftliche Zertifizierung aller möglichen neuen Wortkombinationen.
