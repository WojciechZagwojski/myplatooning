//Bindet Middleware ein.
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//BIndet Scripte, die sich im gleichen Verzeichniss befinden, ein
const collection = require('./collection');

var jsonfile = require('jsonfile');
var path = require('path');
var file = 'can.json'

//Kreiert eine Express Applikation
const app = express();
//Applikation in JSON parsen
app.use(bodyParser.json());

var lastCan=null;

//EventEmitter welcher, jedes mal wenn sich etwas ändert, eine Nachricht aussendet. 
fs.watch('can.json', (eventType, filename) => {
    if (filename) {
        console.log(eventType);
        var lastCan = null;
        //Synchrones auslesen des Inhaltes.
        console.log(jsonfile.readFileSync(file));
    }
});

//Reference zu einem Objekt ohne Rückgabewert.
exports.setCan = function(canData){
    lastCan=canData;
}

//Gibt die Aktuellste Information aus dem Auto zurück.
app.get('/all', function (req, res) {
    res.json(lastCan);
});

//Stellt die Extrahierten Informationen der Transaktionen in einer Map dar.
app.use('/map', express.static(path.join(__dirname + '/public')));

//Gibt die Extrahierte JSON Message aller Addressen zurück
app.get('/collection', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var collector = collection.collection(function(result){res.send(result)});
});

//Die Anwendung startet einen Server und ist an Port 3001 empfangsbereit für Verbindungen.
app.listen(3001);
