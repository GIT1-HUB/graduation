const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    id: String,
    title: String,
    author:String,
    comment: []
});

let commentModel = mongoose.model('comment',commentSchema);

module.exports = commentModel;
