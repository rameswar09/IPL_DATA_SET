var express =require('express');
var mysql =require('mysql');
var csv =require('fast-csv');
var app =express();
var cors =require('cors');
app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
 });
// app.use(express.static('/client'))
 app.use(express.static(__dirname + '/client'));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ramu",
  database :'ipldb'
});
  var data;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");


});

// app.get('/',(req ,res) => {
//   res.sendFile('index.html', { root:'../client'});
// });

app.get('/totalmatch',(req ,res) =>{
  var data;
  con.query("select season , count(id) AS data  from matches group by(season)" , function(err ,result){
    if(err)
    throw err;
    data =result;
    console.log(result);
    res.send(data);
  });

});
app.get('/teamwin',(req ,res) =>{
  var data;
  con.query("select season ,winner ,count(*) AS data from matches group by season ,winner" , function(err ,result){
    if(err)
    throw err;
    data =result;
    console.log(result);
    res.send(data);
  });

});
app.get('/extra_run',(req ,res) =>{
  var data;
  con.query("select batting_team AS name ,SUM(extra_runs) AS data from (select * from deliveries where match_id IN (select id  from matches where season= 2016)) AS filter group by batting_team" , function(err ,result){
    if(err)
    throw err;
    data =result;
    console.log(result);
    res.send(data);
  });

});
app.get('/bowler',(req ,res) =>{
  var data;
  con.query("select bowler ,eco from (select bowler , (total/over) AS eco , over from (select (ball/6) AS over , bowler , total from (select COUNT(ball) AS ball , bowler , SUM(total_runs - extra_runs) AS total  from (select * from deliveries where match_id IN (select id  from matches where season= 2015)) AS filter group by(bowler)) AS filter2) AS final  order by eco ASC) AS final2  LIMIT 5" , function(err ,result){
    if(err)
    throw err;
    data =result;
    console.log(result);
    res.send(data);
  });

});

app.listen(9000);
