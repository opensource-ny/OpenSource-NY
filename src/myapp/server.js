/* Our front line of communication, clients will access this page first for any requests */

const express = require('express');
const app = express();
const port = 5000;
const response = require('./response.js');
const handleListen = require('./handleListen.js');

app.listen( port, handleListen(console.log, port) );

app.get('/', response);

app.get( '/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
