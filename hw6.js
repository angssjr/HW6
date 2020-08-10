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




var ptr = Document.getElementById("body");
var h1 = Document.createElement("h1");
var temp = Document.getElementsByTagName("script"); //temp ptr;

var table = Document.createElement("table"); //create table

var thead = Document.createElement("thead");
thead.setAttribute("id", "thead");
table.appendChild(thead);

var tbody = Document.createElement("tbody");
tbody.setAttribute("id", "tbody");
table.appendChild(tbody);




ptr[0].insertBefore(table,temp[0]);

table.style.width = "400px";
table.style.height = "400px";
table.style.borderStyle = "solid";
table.style.borderColor = "black";



for (let i = 0; i<4; i++){
    if(i<1){
        createHeaderRow();
    }else{
        createDataRow(i);
    }
}

var cells = Document.querySelectorAll("td");
for (var z = 0; z  < cells.length; z++) {
    cells[z].style.border = "thin solid";
    cells[z].style.backgroundColor = "pink";
    cells[z].style.textAlign = "Center";
    cells[z].style.margin = "1px";
}





function createDataRow(x){
    var tbody = Document.getElementById("tbody");
    var dataRow = Document.createElement("tr");
    for(let k = 0; k<4; k++) {
        var newTd = Document.createElement("td")
        newTd.textContent = x+ ", "+ (k+1);
        dataRow.appendChild(newTd);
    }
    tbody.appendChild(dataRow);
}

function createHeaderRow(){
    var thead = Document.getElementById("thead");
    var headerRow = Document.createElement("tr");
    for(let i = 0; i < 4; i++){
        var newTh = Document.createElement("th");
        newTh.textContent = "Header " + (i+1);
        headerRow.appendChild(newTh);
    }
    thead.appendChild(headerRow);
}




app.listen(app.get('port'),function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu'+app.get('port')+'; press Ctrl-C to terminate.')
});
    