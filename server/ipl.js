var csvToJson = require('convert-csv-to-json');
var matchesDataset = csvToJson.fieldDelimiter(',').getJsonFromCsv('./matches.csv');
var deliveriesDataset = csvToJson.fieldDelimiter(',').getJsonFromCsv('./deliveries.csv');
var len = matchesDataset.length;
var len_deliver = deliveriesDataset.length;
module.exports.totalMatches = totalMatches;
module.exports.teamWise_win = teamWise_win;
module.exports.extra_Run = extra_Run;
module.exports.bowler = bowler;
function totalMatches() {
  var totalNoOfMatches = {};
  for (var i = 0; i < len; i++) {
    if (totalNoOfMatches[matchesDataset[i].season] != undefined) {
      totalNoOfMatches[matchesDataset[i].season] += 1;
    } else {
      totalNoOfMatches[matchesDataset[i].season] = 1;
    }
  }
  return totalNoOfMatches;
}
function teamWise_win() {
  var teamWiseWin = {};

    matchesDataset.forEach(match => {
        var year = match['season'];
        if (teamWiseWin[year]) {
            var winner = match['winner'];
            if (teamWiseWin[year][winner]) {
                teamWiseWin[year][winner] += 1;
            } else {
                teamWiseWin[year][winner] = 1;
            }
        } else {
            teamWiseWin[year] = {};
            teamWiseWin[year][match['winner']] = 1;
        }

    });

    return teamWiseWin;

}

function extra_Run() {
  var idArray = [];
  for (var i = 0; i < len; i++) {
    if (matchesDataset[i].season == 2016) {
      idArray.push(matchesDataset[i].id);
    }
  }
  var extraRun = {};
  for (var i = 0; i < idArray.length; i++) {
    for (var j = 0; j < len_deliver; j++) {
      if (deliveriesDataset[j].match_id == idArray[i]) {
        if (extraRun[deliveriesDataset[j].batting_team] != undefined) {
          extraRun[deliveriesDataset[j].batting_team] += parseInt(deliveriesDataset[j].extra_runs);
        } else {
          extraRun[deliveriesDataset[j].batting_team] = 0;
        }

      }
    }
  }
  return extraRun;
}

function bowler() {
  var idArray_2015 = [];
  var bowlerEco = {};
  for (var i = 0; i < len; i++) {
    if (matchesDataset[i].season == 2015) {
      idArray_2015.push(matchesDataset[i].id);
    }
  }
  var nameAndRun = {};
  var nameAndbowl = {};
  for (var i = 0; i < idArray_2015.length; i++) {
    for (var j = 0; j < len_deliver; j++) {
      if (deliveriesDataset[j].match_id == idArray_2015[i]) {
        if (nameAndRun[deliveriesDataset[j].bowler] != undefined) {
          nameAndRun[deliveriesDataset[j].bowler] += (parseInt(deliveriesDataset[j].total_runs)-(parseInt(deliveriesDataset[j].extra_runs)));
          nameAndbowl[deliveriesDataset[j].bowler] += 1;
        } else {
          nameAndRun[deliveriesDataset[j].bowler] = 0;
          nameAndbowl[deliveriesDataset[j].bowler] = 0;
        }
      }
    }
  }

  var x;
  for (x in nameAndRun) {
    nameAndRun[x] = ((nameAndRun[x]) / (nameAndbowl[x] / 6)).toFixed(2);
  }
  var bowlersArr = [];
    for (economy in nameAndRun) {
        bowlersArr.push([economy, parseFloat(nameAndRun[economy])]);
    }
    bowlersArr.sort(function (bowlersEconomyData1, bowlersEconomyData2) {

        return bowlersEconomyData1[1] - bowlersEconomyData2[1];
    });



  return bowlersArr.slice(0, 5);

}
