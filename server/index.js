function getData1() {
  fetch('http://localhost:3000/total_matches')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      var yearOfIpl = [];
      for (var key in data) {
        var arr=[];
        arr.push(data[key]);
        yearOfIpl.push({
          'name': key,
          'data': arr
        })
      }
      drawMatch(yearOfIpl);
       console.log(yearOfIpl);
    })
    .catch(error => console.error(error))
}

function getData2() {
  fetch('http://localhost:3000/team_win')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(getYear(data));
      console.log(getNameAndwin(data));
      console.log(getchatobject(getYear(data),getNameAndwin(data),data));
      drawTeamWise(getYear(data),getchatobject(getYear(data),getNameAndwin(data),data));
    })
    .catch(error => console.error(error))
}

function getData3() {
  fetch('http://localhost:3000/extra_Run')
    .then(res => res.json())
    .then(data => {
      var extraRunTeam = [];
      for (var key in data) {
        var arr=[];
        arr.push(data[key]);
        extraRunTeam.push({
          'name': key,
          'data': arr
        })
      }
      drawExtraRun(extraRunTeam);
      console.log(extraRunTeam);
    })
    .catch(error => console.error(error))
}

function getData4() {
  fetch('http://localhost:3000/bowler_Eco')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      drawPi(data);

    })
    .catch(error => console.error(error))
}
function getchatobject(year,team,data){
  var demo =[];
  team.forEach((team) =>{
    let obj ={name :team}
    let windata=[];
    year.forEach((year) =>{
      windata.push(data[year][team])
    })
    obj['data']= windata;
    demo.push(obj);
  })
  return demo;
}
function getYear(data){
  var arr=[];
  for(var key in data){
    arr.push(key);
  }
  return arr;
}
 function getNameAndwin(data){
   var arr=[];
   var arr2=[];
   for(var key in data){
     arr.push(data[key]);
   }
   arr.forEach((element) =>{
    for(var key in element){
     arr2.push(key);
    }
  })
      return([...new Set(arr2)])

 }

function drawMatch(data){
  Highcharts.chart('container1', {
chart: {
type: 'column'
},
title: {
text: 'totalMatches'
},

yAxis: {
min: 0,
title: {
  text: 'noOfmatch'
}
},
tooltip: {
headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
footerFormat: '</table>',
shared: true,
useHTML: true
},
plotOptions: {
column: {
  pointPadding: 0.2,
  borderWidth: 0
}
},
series:data

});
}
function drawExtraRun(data){
  Highcharts.chart('container1', {
chart: {
type: 'column'
},
title: {
text: 'totalMatches'
},

yAxis: {
min: 0,
title: {
  text: 'noOfmatch'
}
},
tooltip: {
headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
footerFormat: '</table>',
shared: true,
useHTML: true
},
plotOptions: {
column: {
  pointPadding: 0.2,
  borderWidth: 0
}
},
series:data

});
}
function drawTeamWise(year,data){
  Highcharts.chart('container1', {
chart: {
type: 'column'
},
title: {
text: 'totalMatches'
},
xAxis: {
categories: year,
crosshair: true
},

yAxis: {
min: 0,
title: {
  text: 'noOfmatch'
}
},
tooltip: {
headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
footerFormat: '</table>',
shared: true,
useHTML: true
},
plotOptions: {
column: {
  pointPadding: 0.2,
  borderWidth: 0
}
},
series:data

});


}
function drawPi(data) {
  Highcharts.chart('container1', {
chart: {
plotBackgroundColor: null,
plotBorderWidth: null,
plotShadow: false,
type: 'pie'
},
title: {
text: 'Browser market shares in January, 2018'
},
tooltip: {
pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
},
plotOptions: {
pie: {
  allowPointSelect: true,
  cursor: 'pointer',
  dataLabels: {
    enabled: true,
    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    style: {
      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    }
  }
}
},
series: [{
name: 'Brands',
colorByPoint: true,
data: data
}]
});

}
