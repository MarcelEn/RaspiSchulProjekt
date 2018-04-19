var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API');
});

router.get('/time', function(req, res, next) {
  res.send(moment().format());
});


router.all('/*', function (req, res, next) {
    res.sendStatus(404);
});
module.exports = router;
