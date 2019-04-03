/* Will contain all the response that the server will send out base on requests */

module.exports = { 
    hello: (req, res) => {
        res.send('Hello World!');
    },

    express_backend: (req, res) => {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!' });
    }
}