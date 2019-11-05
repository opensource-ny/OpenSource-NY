/* Our front line of communication, clients will access this page first for any requests */

const express = require('express');
var cors = require('cors')
const MongoClient  = require('mongodb').MongoClient;//Used to create database for information to go to, online resource.
const db = require('./db.js');//Used to link to the config of DataBase
//var database_router = require.resolve('database_route.js');
const bodyParser = require('body-parser');
var app = express();
const port = 5000;
const response = require('./response.js');
const handleListen = require('./handleListen.js');
const apiResponse = require('./apiresponse.js');

app.use(cors());//Future proofing as chrome/website use cors to authenticate requests

app.use(bodyParser.json({limit: '100mb'})); //Utilizied to increase json transfer limit (jsons may get large based on repo's)
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));//Same as previous reason
app.use('/api', apiResponse);


console.log("Hello");
// Let app start listening to port, will output error if anything goes wrong
const client = new MongoClient(db.uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("openSourceRepos").collection("openSourceRepos");//Database (openSourceReports) in collection (The collection of databases openSourceRepos)
  const { assessmentRoutes, initAssessmentRoutes } = require('./database.js'); //Initalizer to allow the database to be connect in express 4.x
  initAssessmentRoutes({db : collection});//Assign database and collection
  if (err) return console.log(err)
   app.use('/dbRoute', assessmentRoutes);
}); 
// Let app start listening to port, will output error if anything goes wrong

  
//app.use('/dbRoute', assessmentRoutes); //Use routes (Basically, this is a generalize route where if you do dbRoute/(Anything)* it will route it correctly as long as the prefix (dbRoute) exists and the route exists


app.listen( port, handleListen(console.log, port) );    

app.use('/api', apiResponse);
  //app.get('/', response.hello);
  //app.get( '/express_backend', response.express_backend);
 // app.post( '/pullrequest', response.pullrequest);
  //app.get( '/commits', response.commits);


// Our API and their approtiate functions


