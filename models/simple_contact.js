var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SimpleContactSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type : String, required:true}
});

module.exports = mongoose.model('simplecontact', SimpleContactSchema);
