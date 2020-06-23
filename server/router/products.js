const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');


let filesName = [];

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})


const Products = require("../models/products");

let products = '';
Products.find({}, (err, data) => {
    products = data;
})

setInterval(() => {
    Products.find({}, (err, data) => {
        products = data;
    })
    router.get('/', (req, res) => {
        res.send(products);
    })
}, 100)

router.post('/upload', upload.single('file'), (req, res) => {
    filesName.push(`http://localhost:5000/products/upload/${req.file.filename}`);
})
router.get('/upload/:file', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/uploads', req.params.file));
})

// router.get('/', (req, res) => {
//     res.send(products);
// })

router.post('/', (req, res) => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();

    day < 10 ? day = `0${day}` : day;
    month < 10 ? month = `0${month}` : month;
    hour < 10 ? hours = `0${hour}` : hour;
    minute < 10 ? minute = `0${minute}` : minute;
    let date = `${day}.${month}.${year}`;
    let time = `${hour}:${minute}`;

    const newProduct = new Products({
        name: req.body.name,
        city: req.body.city,
        district: req.body.district,
        surface: req.body.surface,
        rooms: req.body.rooms,
        year: req.body.year,
        price: req.body.price,
        phone: req.body.phone,
        desc: req.body.desc,
        author: req.body.author,
        authorId: req.body.authorId,
        file: filesName,
        term: {
            date: date,
            time: time
        }
    })
    filesName = [];

    newProduct.save((err) => {
        Products.find({}, (err, data) => {
            products = data;
        })
    })
    res.send(true);
})

router.post('/comments', (req, res) => {

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();

    day < 10 ? day = `0${day}` : day;
    month < 10 ? month = `0${month}` : month;
    hour < 10 ? hours = `0${hour}` : hour;
    minute < 10 ? minute = `0${minute}` : minute;
    let date = `${day}.${month}.${year}`;
    let time = `${hour}:${minute}`;

    let check = {
        date: date,
        time: time,
        author: req.body.author,
        desc: req.body.desc
    };

    Products.updateOne({
        _id: req.body.productId
    }, {
        $push: {
            comments: check
        }
    }, function (err, res) {
        if (err) throw err;
    });

    Products.find({}, (err, data) => {
        products = data;
    })
    res.send('ok')
})

module.exports = router;