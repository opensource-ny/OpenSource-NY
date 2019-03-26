const db = require('mongoose');
db.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

module.exports = db;