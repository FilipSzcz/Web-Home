// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({
//     storage: storage
// })


// router.post('/', upload.single('file'), (req, res) => {
//     console.log(req.file.filename);
//     const name = req.file.filename;
//     console.log(name);
//     res.send(name);
// })
// router.get('/:file', (req, res) => {
//     console.log(req.params.file);
//     res.sendFile(path.join(__dirname, '../public', '/uploads', req.params.file));
// })

// module.exports = router;