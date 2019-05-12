/* Our front line of communication, clients will access this page first for any requests */

const express = require('express');
const MongoClient  = require('mongodb').MongoClient;//Used to create database for information to go to, online resource.
const bodyParser = require('body-parser');
const db = require('config/db');//Used to link to the config of DataBase
var cors = require('cors')
var app = express();
const port = 5000;
const response = require('./response.js');
const handleListen = require('./handleListen.js');
//https://github.com/expressjs/cors

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cors());



console.log("Hello");

const client = new MongoClient(db.uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("openSourceRepos").collection("openSourceRepos");
  const { assessmentRoutes, initAssessmentRoutes } = require('database_route.js');
  initAssessmentRoutes({db : collection});
  if (err) return console.log(err)
   app.use('/dbRoute', assessmentRoutes);
});
// Let app start listening to port, will output error if anything goes wrong
app.listen( port, handleListen(console.log, port) );      
  app.get('/', response.hello);
  app.post( '/pullrequest', response.pullrequest);
  app.get( '/commits', response.commits);
 // app.get( '/pullrequest/:name', response.pullrequestName);
  app.get( '/express_backend', response.express_backend);
<<<<<<< HEAD
  
=======


// Our API and their approtiate functions



>>>>>>> master
