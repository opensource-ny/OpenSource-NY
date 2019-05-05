/* Will contain all the response that the server will send out base on requests */

module.exports = { 
    hello: (req, res) => {
        res.send('Hello World!');
    },

    express_backend: (req, res) => {
        console.log('YOUR EXPRESS BACKEND IS CONNECTED TO REACT!');
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!' });
    },

    pullrequest: (req, res) => {
        console.log(req.params[0]);
       // console.log('YOU ARE IN PULL REQUEST!!!!!');
        res.send({ express: 'You are in Pull Request!' });
    }
}

