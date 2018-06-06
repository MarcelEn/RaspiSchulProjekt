var express = require('express');
var router = express.Router();

router.post('/password', function (req, res, next) {
    //hash(error) == ca00fccfb408989eddc401062c4d1219a6aceb6b9b55412357f1790862e8f178
    console.log(req.body.old_password_hash)
    if (req.body.old_password_hash !== "ca00fccfb408989eddc401062c4d1219a6aceb6b9b55412357f1790862e8f178") {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

router.all('/*', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = router;