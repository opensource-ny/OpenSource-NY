const express = require('express');
const app = express();
const port = 5000;

app.listen( port, () => console.log( `Example app listening on port ${port}!` ) );

app.get( '/', (req, res) => {
    res.send('Hello World!')
} );

app.get( '/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
