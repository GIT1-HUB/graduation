const mongoose = require('mongoose');

let configSchema = new mongoose.Schema({
    // author: [],
    author:String,
    status: Boolean
});

let configModel = mongoose.model('commentConfig',configSchema);

module.exports = configModel;
