Der NX_TOKEN befindet sich in helper/api.js und ist 30 Tage gültig.
Vite ist so konfiguriert das API-Calls über den localhost geproxyt werden um CORS Probleme zu vermeiden (siehe vite.config.js)

Der genutzte Endpunkt zur Erstellung neuer Order ist zur Zeit /order . Der Endpunkt, welcher in den docs beschrieben wird "/order/plan" hat zu einem unbestimmten Validation Fehler geführt. In dem genutzten Frontend wird allerdings auch /order gebraucht. 

Mögliche Verbesserungen ab hier:

- Vollständige Tests für alle Komponenten (aktuell nur eine Komponente zur Veranschaulichung. "npm run test"
- Abfangen aller Fehlercodes und Validationfehler als Anzeige an den Input Controls
- Barrierefreie Bedienung
- Vollständigeres Toast Feedback
