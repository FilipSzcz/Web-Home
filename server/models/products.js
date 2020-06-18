var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    id: String,
    name: String,
    city: String,
    district: String,
    surface: String,
    rooms: String,
    year: String,
    price: String,
    phone: String,
    desc: String,
    author: String,
    authorId: String,
    file: [String],
    term: {
        date: String,
        time: String
    },
})

module.exports = mongoose.model('Products', productsSchema);