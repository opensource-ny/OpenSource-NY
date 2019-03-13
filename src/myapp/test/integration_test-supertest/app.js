/* Imitates the front end to test Express API that we have coded */
/* NOTE: This doesn't test the actual code in REACT App.js */

const express = require('express');
const handleListen = require('../../server/src/handleListen.js');
const response = require('../../server/src/response.js');

const app = express();
const PORT = 3000;

var server = app.listen(PORT, handleListen(console.log, PORT));

/* call the whole list of APIs to the Express server */
app.get('/', response.hello);
app.get('/express_backend', response.express_backend);

server.close();

module.exports = app;

