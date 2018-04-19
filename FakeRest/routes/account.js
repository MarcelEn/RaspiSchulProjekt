var express = require('express');
var router = express.Router();

const makeCookie = (reg, res, next) => {
    res.cookie('accessToken', 'fancy_token', {
        maxAge: 900000,
        httpOnly: true
    });
    res.sendStatus(200);
}

router.post('/login', makeCookie);
router.post('/registrierung', makeCookie);



router.all('/*', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = router;