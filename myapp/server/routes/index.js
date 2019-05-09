
var router = require('express').Router();


router.get('/',function(req,res,next){

    console.log("Welcome to backend");

    res.send("All good");

});



module.exports = router;