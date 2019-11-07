const router = require("express").Router();
const request = require('request');

//returns all pullrequests from a repo given through a query 
router.get('/pullrequest', (req, res) => {
  console.log(req.query.repo);
  
  console.log("You are in pull reqeust");

  var url = `https://api.github.com/repos/`+ req.query.repo + `/pulls?state=all`;
  //console.log(url);
  const options = { 
      url: url,
      headers:{
          'user-agent': 'node.js'
      } 
  };
  console.log("Before request");
  request(options,function(error,response,body){
          var output= JSON.parse(body);
       //   console.log(body);
      if(!error && response.statusCode==200){
          console.log("THE FOLLOWING IS A RESPONSE:"+JSON.stringify(response));
          res.status(200).send(body);
         // console.log(response.statusCode);
      }else{
          console.log("this is the error: "+error);
          res.status(404).send("Error on the github call");
      }
  });
 

});


//returns commits from a repo based on a username. 
router.get('/commits', (req, res) => {
     //console.log(req.body);
     var url =  `https://api.github.com/repos/`+req.query.username+`/`+ req.query.repo + `/commits/`
        
     //console.log(url);
     const options = { 
         url: url,
         headers:{
             'user-agent': 'node.js'
         } 
     };

     request(options,function(error,response,body){
             var output= JSON.parse(body);
         if(!error && response.statusCode==200){
             res.status(200).send(body);
         }else{
             console.log("this is the error: "+error);
             res.status(404).send("Error on the github call");
         }
     });

});




// Our API and their approtiate functions


module.exports = router;