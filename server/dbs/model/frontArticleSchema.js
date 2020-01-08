import mongoose from 'mongoose'
const Schema = mongoose.Schema
const articleSchema = new Schema({
  title:String,
	time:String,
	content:String,
	original:String,
	des:String,
	list:String,
	author:String,
	readnumber:{type:Number,default:0},
	imgFileName: String,
	comment: []
})

export default mongoose.model('frontArticle', articleSchema)
