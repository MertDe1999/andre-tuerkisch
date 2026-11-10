Mathegarten – privater Geräteabgleich

Webseite: https://mertde1999.github.io/andre-tuerkisch/mathegarten/
Stand: 10.11.2026 – Verbindung vorbereitet, Supabase-Konfiguration noch offen.

Einrichtung im ausgewählten Supabase-Projekt:
1. setup.sql anwenden. Die Tabelle ist für anonyme Besucher gesperrt. Angemeldete
   Nutzer lesen nur ihren eigenen Datensatz. Schreibzugriffe laufen über eine
   Funktion, die auth.uid() prüft und konkurrierende Versionen behandelt.
2. Unter Authentication / URL Configuration die Webseiten-Adresse als Site URL
   und als erlaubte Redirect URL eintragen. Email-Anmeldung aktivieren.
3. Die Projekt-URL und den öffentlichen Publishable- bzw. Anon-Key in
   cloud-config.js einsetzen. Niemals einen Service-Role- oder Secret-Key eintragen.
4. Nach Veröffentlichung Anmeldung und Abgleich mit zwei getrennten Browsern
   prüfen; Rechte für anonym und ein fremdes Konto separat prüfen.

Speicherung:
- Lokal bleibt der Stand im Browser, ausstehende Schreibvorgänge ebenfalls.
- Online: Punkte, Aufgabenstatistik, Tagessummen und angefangene Runde.
- Musik, Lautstärke und Bewegungsoptionen bleiben pro Gerät.
- Offline neu gelöste Aufgaben werden anhand des letzten abgeglichenen Standes
  ergänzt. Eine bereits gespeicherte, aber nicht bestätigte Anfrage wird anhand
  ihrer eindeutigen ID erkannt und nicht doppelt gezählt.
- Beim ersten Import eines vorhandenen lokalen Standes gelten die jeweils
  höheren Zähler. So wird dieselbe ältere Sicherung nicht doppelt importiert.
- Bei gleichzeitig verschiedenen Runden bleibt der zuletzt bestätigte Entwurf;
  Punkte und bearbeitete Aufgaben beider Geräte werden zusammengeführt.

Prüfungen: node tests.mjs und node cloud-tests.mjs.
Die Cloud-Modelltests ersetzen keine Prüfung gegen das tatsächliche Backend.
Supabase-JS 2.119.0 ist lokal mitgeliefert; Lizenz in dist/vendor.
