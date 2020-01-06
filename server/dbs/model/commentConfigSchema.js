const mongoose = require('mongoose');

let configSchema = new mongoose.Schema({
    author: [],
    status: Boolean
});

let configModel = mongoose.model('commentConfig',configSchema);

module.exports = configModel;
