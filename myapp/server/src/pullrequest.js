var router = require('express').Router();



router.get('/',function(req,res,next){

    console.log(req.params);
    console.log("You are in pull request");
    res.status(200).send("All good");

});

router.get('/:url',function(req,res,next){

    console.log(req.params);

    res.status(200).send("All good");

});

module.exports=router;