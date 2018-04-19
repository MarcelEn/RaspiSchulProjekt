var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET users listing. */
router.get('/nutzer', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if(req.query.q === 'Marcel'){
        res.send(JSON.stringify(['Marcel']));
    }
    res.send(JSON.stringify([]));
});


router.all('/*', function (req, res, next) {
    res.sendStatus(404);
});
module.exports = router;
