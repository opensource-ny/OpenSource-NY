const router = require("express").Router();
var ObjectID = require('mongodb').ObjectID;//Gets mongodb id
function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

const cors = require('cors') //Future proofing to prevent cross origin issue
let globalVariable = { db: null };

function initAssessmentRoutes(options) {
    globalVariable = options;
}    
//These are used to keep global variable to connect to database.


module.exports = {
    assessmentRoutes: router,
    initAssessmentRoutes,
};

//Exporting router and database


//Route to get data from the database, searchs by username and repository and then sends it back as json
router.get('/db', (req, res) => {

    var usernameV = req.query.username;
    var repositoryV = req.query.repository;
    var id = "5cb258ad77fcbc46f49f6020"

    globalVariable.db.find({ 'username' : usernameV}, {'repository' : repositoryV }).toArray(function(err, documents) {
        var value = documents;
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



//Post route to add a user to the database based on repository. It first checks if the user + repository exists, if either does not exist then it creates them based on the provided information
//If they do exist then we go to the else condition where we iterate every single pr in this repository by this user, if they have done nothing new it does not change anything; however, (66-83)
//if they have added new issues/prs then it is automatically added to a temp copy of the prs, and the user repository count is updated (line 89);
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
            
            newMap.set(allPRs[pos].id, pos);
      }
      var needToAdd = [];
      for(var pos = 0; pos < keyCount; pos++){
         var ID = currentPRs[pos].id;
         if(!(newMap.has(ID))){
            
            needToAdd.push(currentPRs[pos]);
         }
      }

      for(var pos = 0; pos < needToAdd.length; pos++){
       
        allPRs[(keyCountPRS)+pos] = needToAdd[pos];
      }
 
      globalVariable.db.updateOne( {_id : item._id}, { $set : { pullRequests : JSON.stringify(allPRs, null, 2)}});
      needToAdd.length > 0 ? (console.log("Updated Database"), res.send("Updated Database")) : (console.log({'error' : ":  Username exists"}), res.send({'error': "Username exists"}));
    }
  });
  
});


//Searches by username to remove the user from the database, nothing extreme. 
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




