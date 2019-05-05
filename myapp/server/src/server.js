/* Our front line of communication, clients will access this page first for any requests */

const express = require('express');
const app = express();
const port = 5000;
const response = require('./response.js');
const handleListen = require('./handleListen.js');


// Let app start listening to port, will output error if anything goes wrong
app.listen( port, handleListen(console.log, port) );


// Our API and their approtiate functions
app.get('/', response.hello);

app.get( '/express_backend', response.express_backend);

app.get( '/pullrequest/:url', response.pullrequest);
