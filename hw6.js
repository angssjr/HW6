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
app.set('port', 6140);

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
    res.render('get',context);
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
    res.render('post', context);
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




app.listen(app.get('port'),function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu'+app.get('port')+'; press Ctrl-C to terminate.')
});
    