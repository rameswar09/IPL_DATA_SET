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
  var arr =matchesDataset.reduce(function(com , com1){
  com[com1['season']]  = (com[com1['season']] || 0) + 1
   return com
},{});
  return arr;
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

  var arr =deliveriesDataset.reduce(function(id ,id1){
    if(idArray.includes(id1['match_id'])){
       id[id1['batting_team']]  = ((id[id1['batting_team']]||0) + parseInt(id1['extra_runs']));
    }
    return id;
  },{});
  return arr;
}

function bowler() {
  var idArray_2015 = [];
  var bowlerEco = {};
  for (var i = 0; i < len; i++) {
    if (matchesDataset[i].season == 2015) {
      idArray_2015.push(matchesDataset[i].id);
    }
  }
var arr1 =deliveriesDataset
        .filter(id => idArray_2015.includes(id['match_id']))
var arr2 =arr1.reduce(function(run ,run1){
          run[run1['bowler']] =(run[run1['bowler']] ||0) +(parseInt(run1['total_runs'])- parseInt(run1['extra_runs']))
          return run;
        },{});
var arr3 = arr1.reduce(function(bowl, bowl1){
  bowl[bowl1['bowler']]=(bowl[bowl1['bowler']] || 0)+1;
  return bowl;
}, {});
for (var key in arr2) {
   arr2[key]=(arr2[key]/(arr3[key]/6)).toFixed(2);
}

var bowlersArr = [];
  for (economy in arr2) {
      bowlersArr.push([economy, parseFloat(arr2[economy])]);
  }
  bowlersArr.sort(function (bowlersEconomyData1, bowlersEconomyData2) {

      return bowlersEconomyData1[1] - bowlersEconomyData2[1];
  });
  return bowlersArr.slice(0, 5);


}
