const express = require('express');
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require('bcrypt');

let users = '';
Users.find({}, (err, data) => {
    users = data;
})

router.get('/', (req, res) => {
    res.send(users);
})

router.post('/', (req, res) => {
    let isCorrect = true;
    users.forEach(user => {
        if (user.email === req.body.email) {
            isCorrect = false;
        }
    })
    if (isCorrect) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            hashPassword = hash;
            const newUser = new Users({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                surname: req.body.surname
            })

            newUser.save((err) => {
                Users.find({}, (err, data) => {
                    users = data;
                })
            })
        });

        res.send(true)
    } else {
        res.send(false)
    }
})

module.exports = router;