var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    price: {type : Number, required:true}
});

module.exports = mongoose.model('product', ProductSchema);
