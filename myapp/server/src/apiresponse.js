const router = require('express').Router();
const request = require('request');

//returns all pullrequests from a repo given through a query
router.get('/pullrequest', (req, res) => {
    const url = `https://api.github.com/repos/${req.query.repo}/pulls?state=all`;
    request(
        {
            url,
            headers: {
                'user-agent': 'node.js'
            }
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200).send(body);
            } else {
                res.status(404).send({ error: JSON.parse(body) });
            }
        }
    );
});

//returns commits from a repo based on a username.
router.get('/commits', (req, res) => {
    //console.log(req.body);
    var url =
        `https://api.github.com/repos/` +
        req.query.username +
        `/` +
        req.query.repo +
        `/commits/`;

    //console.log(url);
    const options = {
        url: url,
        headers: {
            'user-agent': 'node.js'
        }
    };

    request(options, function(error, response, body) {
        var output = JSON.parse(body);
        if (!error && response.statusCode == 200) {
            res.status(200).send(body);
        } else {
            console.log('this is the error: ' + error);
            res.status(404).send('Error on the github call');
        }
    });
});

// Our API and their approtiate functions

module.exports = router;
