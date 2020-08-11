var express = require('express');
var exphbs = require('express-handlebars');

var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

var app = express();
var bodyParser = require('body-parser');


app.engine('handlebars', exphbs());
app.set('view engine','handlebars');
app.set('port', 6141);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




app.get('/', (req,res)=>{
    console.log('GET! hello world!');
    var qParams = [];
    for(var p in req.query){
        qParams.push({"name":p,"value":req.query[p]})
    }   
    var context = {};
    context.dataList = qParams;
    res.render('home',context);
})

app.post('/', function(req,res){
    console.log("POST!");
    var qParams = [];
    for (var p in req.query){
        qParams.push({"name":p,"value":req.query[p]})
      }
    for (var p in req.body){
      qParams.push({"name":p,"value":req.body[p]})
    }
    console.log(qParams);
    console.log(req.query);
    console.log(req.body);
    
    var context = {};
    context.dataList = qParams;
    res.render('home', context);
  });

  
app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});


    
document.getElementById("urlSubmit1").addEventListener("click", function(event){
var req1 = new XMLHttpRequest();
var payload = {"CITY_NAME":null, "COUNTRY_CODE": null, "ZIP_CODE":null};
payload.CITY_NAME = document.getElementById("CITY_NAME").value;
payload.COUNTRY_CODE = document.getElementById("COUNTRY_CODE").value;
payload.ZIP_CODE = document.getElementById("ZIP_CODE").value;
//GET1
req1.open("GET", "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q="+payload.CITY_NAME+","+payload.COUNTRY_CODE+"&appid="+ apiKey, true);
req1.setRequestHeader("Content-Type", "application/json");
req1.send();
event.preventDefault();
});



//POST
document.getElementById("urlSubmit2").addEventListener("click",function(event){
var req3 = new XMLHttpRequest();
var payload2 = {"Dog": "Golden Retriever",
                "Age": "7 Human Years"};
req3.open("POST", "https://cors-anywhere.herokuapp.com/http://httpbin.org/post", true);
req3.setRequestHeader('Content-Type', 'application/json');
event.preventDefault();
req3.send(JSON.stringify(payload2));
req3.addEventListener('load',function(){
    if(req3.status >= 200 && req3.status < 400){
        var response3 = JSON.parse(req3.responseText);
        console.log(response3);
    } else {
        console.log("Error in network request: " + req3.statusText);
    }
});
event.preventDefault();
});
        





app.listen(app.get('port'),function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu'+app.get('port')+'; press Ctrl-C to terminate.');
})
