const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
	title:String,
	time:String,
	content:String,
	original:String,
	des:String,
	list:String,
	author:String,
	readnumber:String,
    banner: String,
    imgFileName: String
});

let articleModel = mongoose.model('backArticle',articleSchema);

module.exports = articleModel;
