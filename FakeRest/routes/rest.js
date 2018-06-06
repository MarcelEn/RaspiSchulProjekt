var express = require('express');
var router = express.Router();
var moment = require('moment');



/* GET users listing. */
router.get('/user', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query.q === 'maengler') {
        res.send(JSON.stringify(
            [{
                user_id: '10001',
                user_name: 'maengler',
                first_name: 'Marcel',
                last_name: 'Engler',
                mail: 'mengler@hhs.de'
            }]
        ));
    } else {
        res.send(JSON.stringify([]));
    }
});

router.get('/user/:userId', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    switch (req.params.userId) {
        case '10001':
            res.send(JSON.stringify({
                user_id: '10001',
                user_name: 'maengler',
                first_name: 'Marcel',
                last_name: 'Engler',
                mail: 'mengler@hhs.de'
            }))
            break;
        case '10002':
            res.send(JSON.stringify({
                user_id: '10002',
                user_name: 'liposselt',
                first_name: 'Linus',
                last_name: 'Posselt',
                mail: 'liposselt@hhs.de'
            }))
            break;
        default:
            res.send(JSON.stringify({}));
    }

});


router.get('/calendar', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query.user_id === '10001' || req.query.search_string === 'Hello') {
        res.send(JSON.stringify(
            [{
                    calendar_id: '50001',
                    calendar_title: 'Hello World!',
                    calendar_description: 'This is a fancy descpription',
                    owner_id: '10001',
                    visibility: 1
                },
                {
                    calendar_id: '50002',
                    calendar_title: 'Hello World 2!',
                    calendar_description: 'This is a fancy descpription 2',
                    owner_id: '10001',
                    visibility: 1
                },
                {
                    calendar_id: '50003',
                    calendar_title: 'Hello World 3!',
                    calendar_description: '<h1>Some fancy description</h1><p><em>This calendar covers:</em></p><ul><li>Some fancy stuff</li><li>and more stuff</li></ul>',
                    owner_id: '10002',
                    visibility: 1
                }
            ]
        ));
    } else {
        res.send(JSON.stringify([]));
    }
});


router.get('/calendar/saved', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
        [{
            calendar_id: '50003',
            calendar_title: 'Hello World 3!',
            calendar_description: '<h1>Some fancy description</h1><p><em>This calendar covers:</em></p><ul><li>Some fancy stuff</li><li>and more stuff</li></ul>',
            owner_id: '10002',
            visibility: 1
        }]
    ));
});

router.delete('/calendar/saved/:id', function (req, res, next) {
    res.sendStatus(204);
});

router.put('/calendar/saved/:id', function (req, res, next) {
    res.sendStatus(201);
});

router.delete('/calendar/:id', function (req, res, next) {
    res.sendStatus(204);
});

router.post('/calendar', function (req, res, next) {
    res.sendStatus(201);
});

let calendarCount = 1;
router.put('/calendar', function (req, res, next) {
    if (req.body.calendar_title === "error") {
        res.sendStatus(403);
    } else {
        res.send(JSON.stringify({
            calendar_id: "50404" + ++calendarCount
        }));
    }
});

router.get('/appointment', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
        [{
            appointment_id: req.query.calendar_id + 1,
            start: moment(moment().format("YYYY-MM-DD")).valueOf() + 36000000,
            end: moment(moment().format("YYYY-MM-DD")).valueOf() + 36000000 + 3600000,
            calendar_id: req.query.calendar_id,
            appointment_title: 'Hallo',
            appointment_description: '<h1>Some fancy description</h1><p><em>This calendar covers:</em></p><ul><li>Some fancy stuff</li><li>and more stuff</li></ul>'
        }, {
            appointment_id: req.query.calendar_id + 2,
            start: moment(moment().format("YYYY-MM-DD")).valueOf() + 36000000,
            end: moment(moment().format("YYYY-MM-DD")).valueOf() + 36000000 + 3600000,
            calendar_id: req.query.calendar_id,
            appointment_title: 'BB',
            appointment_description: '<h1>Some fancy description</h1><p><em>This calendar covers:</em></p><ul><li>Some fancy stuff</li><li>and more stuff</li></ul>'
        }]
    ));
});

router.post('/appointment', function (req, res, next) {
    if (req.body.appointment_id !== "500031") {
        res.sendStatus(201);
    } else {
        res.sendStatus(403);
    }
});

let addCount = 1;
router.put('/appointment', function (req, res, next) {
    res.send(JSON.stringify({
        appointment_id: "50004" + ++addCount
    }));
});

router.delete('/appointment/:id', function (req, res, next) {
    res.sendStatus(204);
});


router.all('/*', function (req, res, next) {
    res.sendStatus(404);
});




module.exports = router;