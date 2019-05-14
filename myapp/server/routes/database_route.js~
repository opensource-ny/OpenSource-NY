const router = require("express").Router();
//const passport = require('passport');
//require('../config/passport');
//LocalStrategy = require('passport-local').Strategy; //./database_route.js
const Sequelize = require('sequelize');
const jwebtoken = require('jsonwebtoken');
// const jwtSecret = require('../config/jwtConfig')
    

/*router.get(() => {
	res.status(404).send("Sorry, can't find that!");
	res.redirect('/404.html');
});*/


/*router.get('/', function(req, res) {
    res.send('GET handler for /database_route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /database_route.');
});*/

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

module.exports = router;
