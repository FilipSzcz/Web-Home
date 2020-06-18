var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
})

module.exports = mongoose.model('Users', usersSchema);