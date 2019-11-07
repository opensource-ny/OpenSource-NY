/* Will contain all the response that the server will send out base on requests */
const request = require('request');

module.exports = { 
    hello: (req, res) => {
        res.send('Hello World!');
    },

    express_backend: (req, res) => {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!' });
    },

    pullrequest:(req, res) => {
        //console.log(req.body);
        var url = `https://api.github.com/repos/`+ req.body.repo + `/pulls?state=all`;
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
    },

    commits:(req, res) => {
        //console.log(req.body);
        var url =  `https://api.github.com/repos/`+req.body.username+`/`+ req.body.repo + `/commits/`
        
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
    },

   /* pullrequestName:(req, res) => {
    
            console.log(req.params.name);
            console.log(res);
    } */

   
}

