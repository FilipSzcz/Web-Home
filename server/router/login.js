const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Users = require("../models/users");
let users = '';
Users.find({}, (err, data) => {
    users = data;
})

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        users = data;
    })
})

router.post('/', (req, res) => {
    let isCorrect = false;
    let active = '';
    let isEmail = false;
    users.forEach(user => {
        if (user.email === req.body.email) {
            isEmail = true;
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) {
                    isCorrect = true;
                    active = user;
                    res.send(active);
                } else {
                    res.send(false);
                }
            })
        }
        // let isCorrect = false;
        // let active = '';
        // users.forEach(user => {
        //     if (user.email === req.body.email && user.password === req.body.password) {
        //         isCorrect = true;
        //         active = user;
        //     }
        // })
        // if (isCorrect) {
        //     res.send(active);
        // } else {
        //     res.send(false);
        // }
    })
    if (!isEmail) {
        res.send(false);
    }
})

module.exports = router;