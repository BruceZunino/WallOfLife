var express = require('express');
var app = express();

const mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'walloflife'
});


// We define where the server will be dislay
let server = app.listen(5050, function(){
  let host = server.address().address
  let port = server.address().port
})

// We conncet our back-end to our mysql server 
connection.connect(function(error){
  if(error) console.log(error);
  else console.log("connected");
})


// Here we get all the information from the table data on our server
app.get('/data', function(req, res){
  connection.query('select * from data', function(error, rows, field){
    if(error) console.log(error);
    else{
      console.log(rows);
      res.send(rows);
    }
  })
});

app.post('/data', function (req, res) {
  var sql =  `INSERT INTO data (user, img, created_at) VALUES ('${req.body.user}', '${req.body.img}', '${req.body.created_at}');`

  connection.query(sql, function (err) {
    if (err) throw err
  })
});