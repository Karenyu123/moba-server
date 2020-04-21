const mongoose = require('mongoose')

const { Schema, model } = mongoose
const articleSchema = new Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  content: { type: String },
})

module.exports = model('Article',articleSchema)