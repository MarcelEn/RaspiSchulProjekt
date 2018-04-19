var express = require('express');
var router = express.Router();

const makeCookie = (reg, res, next) => {
    res.cookie('accessToken', Math.random(), {
        maxAge: 900000
    });
    res.sendStatus(200);
}

router.post('/login/loginData', makeCookie);
router.post('/login/token', makeCookie);

router.delete('/logout', function (req, res, next   ) {
    res.clearCookie('accessToken');
    res.sendStatus(200);
});

router.post('/registrierung', makeCookie);



router.all('/*', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = router;