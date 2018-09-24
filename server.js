require('dotenv').config();

console.log(process.env.IRI_URL);

const express = require('express');
const Publish = require('./publish');
const bodyParser = require('body-parser');

const provider = require('./provider');
var canData;

const app = express();
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//app.use(bodyParser.bodyParser());


app.post('/notify', function (req, res) {
  //todo: this is just notification. Return here.
  console.log(req.body);
  var lastCan = req.body;
  canData = req.body;
  provider.setCan(canData);
  const body = req.body;
  console.log(canData.ambientairpressure);
  console.log("THIS GOES TO TANGLE");
  Publish(body).then(message => {
      //res.status(200);
      //res.send(message);
      console.log("Transaction done");
      console.log(message);

  }).catch(err => {
      console.log("Transaction rejected");
      console.log(err);
  });
  res.status(200);
  res.send(body)
  //res.sendStatus(200);

});

app.get('/buy', function (req, res) {
  res.send('list');
});

app.get('/all', function (req, res) {
  res.json(canData);
});

app.listen(3000);
