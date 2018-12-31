function getData1() {
  fetch("http://localhost:9000/totalmatch")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      var arr = data.reduce(function(final, curr) {
        var a = [];
        a.push(curr['data']);
        final.push({
          name: curr['season'],
          data: a
        });

        return final;
      }, []);
      console.log(arr);
      drawMatch(arr);

    })

}
//----------------------------------------------------------------------------------------------------------
function getData2() {
  fetch("http://localhost:9000/teamwin")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      var arr =data.reduce(function(final , cur){
         final[cur['winner']] =final[cur['winner']] || [];
         final[cur['winner']].push(cur['data']);
         return final;
      },{});
      console.log(arr);
      var finalArray=[];
      for (var key in arr) {
        var obj ={};
        obj['name']= key,
        obj['data'] = arr[key]
        finalArray.push(obj);
      }
      console.log(finalArray);
      drawTeamWise(finalArray);

    })
    .catch(error => console.error(error))
}

//----------------------------------------------------------------------------------------------------------
function getData3() {
  fetch("http://localhost:9000/extra_run")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      var arr = data.reduce(function(final, curr) {
        var a = [];
        a.push(curr['data']);
        final.push({
          name: curr['name'],
          data: a
        });

        return final;
      }, []);
      console.log(arr);
      drawExtraRun(arr);

    })
    .catch(error => console.error(error))
}
//--------------------------------------------------------------------------------------------------------
function getData4() {
  fetch("http://localhost:9000/bowler")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      var arr = data.reduce(function(final, curr) {
        var a = [];
        a.push(curr['bowler']);
        a.push(curr['eco']);
        final.push(a);
        return final
      }, []);
      console.log(arr);
      drawPi(arr);
    })

    .catch(error => console.error(error))
}
//---------------------------------------------------------------------------
function drawMatch(data) {
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
    series: data

  });
}
//---------------------------------------------------------------------------------------------------
function drawExtraRun(data) {
  Highcharts.chart('container1', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'extra run'
    },

    yAxis: {
      min: 0,
      title: {
        text: 'run'
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
    series: data

  });
}
//-----------------------------------------------------------------------------------------------------------
function drawPi(data) {
  Highcharts.chart('container1', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Bowler economy'
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
//-----------------------------------------------------------------------------------------------------------
function drawTeamWise(data){
  Highcharts.chart('container1', {
chart: {
type: 'column'
},
title: {
text: 'team wise win'
},
// xAxis: {
// categories: year,
// crosshair: true
// },

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
