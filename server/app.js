const express = require('express');
var path = require('path');
var app = express();
app.use(express.static('/client'))
app.use(express.static(__dirname + '/client'));
app.get('/', (req, res) => {
  res.sendFile('index.html');

});
var csvToJson = require('convert-csv-to-json');
var matchesDataset = csvToJson.fieldDelimiter(',').getJsonFromCsv('./matches.csv');
var deliveriesDataset = csvToJson.fieldDelimiter(',').getJsonFromCsv('./deliveries.csv');
var file = require('./ipl.js');

app.get('/total_matches', (req, res) => {
  res.send(file.totalMatches());
});
app.get('/team_win', (req, res) => {
  res.send(file.teamWise_win());
});
app.get('/extra_Run', (req, res) => {
  res.send(file.extra_Run());
});
app.get('/bowler_Eco', (req, res) => {
  res.send(file.bowler());
});

app.listen(3000);
