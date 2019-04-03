const router = require("express").Router();
const passport = require('passport');
require('../config/passport');
LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const jwebtoken = require('jsonwebtoken');
// const jwtSecret = require('../config/jwtConfig')
    
module.exports = router;

router.get(() => {
	res.status(404).send("Sorry, can't find that!");
	res.redirect('/404.html');
});