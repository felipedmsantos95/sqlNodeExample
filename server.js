const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/usuario');

const port  = 3000;

var db = mysql.createConnection({
  host: "localhost",
  user: "dragonfly_adm",
  password: "icts123",
  database: "dragonfly"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  db.query("CREATE TABLE IF NOT EXISTS usuarios (id INT(5) NOT NULL AUTO_INCREMENT, nome VARCHAR(50), idade INT(3), endereco VARCHAR(255), email VARCHAR(255), telefone VARCHAR(255), PRIMARY KEY(id))",
   function (err, result) {
    if (err) throw err; 
  });
});

global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

