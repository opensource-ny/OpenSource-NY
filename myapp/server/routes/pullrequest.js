var express = require('express');
var router = express.Router();



router.get('/:url',function(req,res,next){

    console.log(req.params);

    res.status(200).send("All good");

});