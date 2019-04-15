const router = require("express").Router();
var ObjectID = require('mongodb').ObjectID;//Gets mongodb id
function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}
//const passport = require('passport');
//require('../config/passport');
//LocalStrategy = require('passport-local').Strategy; //./database_route.js
//const Sequelize = require('sequelize');
//const jwebtoken = require('jsonwebtoken');
// const jwtSecret = require('../config/jwtConfig')
const cors = require('cors')
let globalVariable = { db: null };

function initAssessmentRoutes(options) {
    globalVariable = options;
}    

/*router.get(() => {
	res.status(404).send("Sorry, can't find that!");
	res.redirect('/404.html');
});*/


/*router.get('/', function(req, res) {
    res.send('GET handler for /database_route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /database_route.');
});*/

module.exports = {
    assessmentRoutes: router,
    initAssessmentRoutes,
};

router.get('/db', (req, res) => {
    //var format = req.query.format;
    var usernameV = req.query.username;
    var repositoryV = req.query.repository;
    var id = "5cb258ad77fcbc46f49f6020"
    //const objNote = { 'username' : usernameV, 'repository' : repositoryV };
    //console.log(usernameV + " wot " + repositoryV);
    //console.log(typeOf(repositoryV));
    globalVariable.db.find({ 'username' : usernameV}, {'repository' : repositoryV }).toArray(function(err, documents) {
        var value = JSON.stringify(documents);
        console.log(typeOf(value));
        if(err){
            res.send({ error: "Could not find username in repository specificed" });
            return;
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(value);
        }
    });

});

router.post('/addToDB', cors(),(req, res) => {
  const note = { username : req.body.User , repoistory : req.body.Repository , pullRequests : JSON.stringify(JSON.parse(req.body.Repos), null, 2) };
  console.log(typeOf(note.username));
  globalVariable.db.findOne({"username" : note.username, "repository" : note.repository}, (err,item) =>{
    //console.log("ITEM: " + item);
    if(!item){
      globalVariable.db.insertOne(note, (err, result) => {
	    if (err) { 
	    	res.send({ 'error': 'An error has occurred' }); 
	    }else {
	    	res.send(result.ops[0]);
	    }
      });
    }
    else{
      var allPRs = JSON.parse(item.pullRequests);
      var currentPRs = JSON.parse(note.pullRequests);
      var keyCount  = Object.keys(currentPRs).length;
      var keyCountPRS  = Object.keys(allPRs).length;
      var newMap = new Map();
      for(var pos = 0; pos <  keyCountPRS; pos++){
            //console.log(allPRs[pos].id);
            newMap.set(allPRs[pos].id, pos);
      }
      var needToAdd = [];
      for(var pos = 0; pos < keyCount; pos++){
         var ID = currentPRs[pos].id;
         if(!(newMap.has(ID))){
            //console.log(currentPRs[pos].id + " NOT IN ALLPRS");
            needToAdd.push(currentPRs[pos]);
         }
      }

      for(var pos = 0; pos < needToAdd.length; pos++){
        //console.log(needToAdd[pos]);
        allPRs[(keyCountPRS)+pos] = needToAdd[pos];
      }
      //console.log(allPRs);
      globalVariable.db.updateOne( {_id : item._id}, { $set : { pullRequests : JSON.stringify(allPRs, null, 2)}});
      needToAdd.length > 0 ? (console.log("Updated Database"), res.send("Updated Database")) : (console.log({'error' : ":  Username exists"}), res.send({'error': "Username exists"}));
    }
  });
  //res.send('added to DB');
});

router.delete('/removeFromDB/:username', (req, res) => {
  const username = req.params.username;
  try{
    globalVariable.db.remove(username);
  }
  catch(err){
    console.log(err);
    res.send(err);
  }  
  
  res.send('removed from DB');
});




