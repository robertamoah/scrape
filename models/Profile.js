const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const newsBro = new mongoose.Schema({
  teaser: {type: String},
  title: {type: String},
  link: {type:String},
  notes: [{type: Schema.Types.ObjectId, ref: "Note"}]
})

const Article = mongoose.model("News", newsBro)

module.exports =  Article;

// there is a delay in send to mongo needs to fix it. work on it..