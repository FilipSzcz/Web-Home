const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

//routers 
const users = require('./router/users');
const login = require('./router/login');
const products = require('./router/products');
// const upload = require('./router/upload');

// mongodb connection
mongoose.connect('mongodb+srv://filipusss:nB2uryXYaZGZ6zCD@mieszkania-rspzn.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.error:'));


app.use(bodyParser.json());

app.use(cors());
app.use(express.static('./public'));


app.use('/users', users);
app.use('/login', login);
app.use('/products', products);
// app.use('/upload', upload)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})