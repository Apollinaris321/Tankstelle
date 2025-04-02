# Dokumentation

### Codequalität und Kollaboratives Entwickeln
Mithilfe von Github kann ein kollaboratives Entwickeln mehrer Entwickler gleichzeitig gewährleistet werden.
Um die Qualität des Codes zu gewährleisten wurden Unit-Tests genutzt und es wurden wenn möglich 
wieder verwendbare Komponenten genutzt.
Der Code wurde durch Kommentare dokumentiert und es wurde ESLint genutzt, um den Code 
sauber zu halten. 

### CRUD umbauen
Für die CRUD-Anwendung würde ich Spring Boot verwenden und eine MySQL Datenbank.
In der Datenbank wäre eine Liste mit Tankstellenobjekten gespeichert. 
Über eine API könnte der Admin der Seite neue Tankstellen hinzufügen, bearbeiten oder entfernen.

Ebenso könnte über die API die Nutzereingaben bearbeitet werden. Hierfür bräuchte man einen
- getAll Endpunkt der alle Tankstellen liefert
- findById einen Endpunkt der die korrekte Tankstelle für eine Id liefert
        
Um die Applikation zu hosten kann man einen Hetzner Cloud Server benutzen. Hierfür müsste man eine Domäne 
mieten und einen Webserver wie Nginx installieren. 
Die Webseite, Backend und Datenbank würde man dann in den Server hochladen. Um die ganzen Umgebungen nicht 
neu erstellen zu müssen, wäre es vorteilhaft die Applikation in einer Docker-Compose.yml zu definieren und nur 
den Dockercontainer laufen zu lassen. 