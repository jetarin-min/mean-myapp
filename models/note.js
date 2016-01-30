var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text: {type: String, required: true},
    uid: {type: String, required: true},
    date: { type : Date, default: Date.now }
});

module.exports = mongoose.model('note', NoteSchema);
