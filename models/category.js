const mongoose = require('mongoose')
const { Schema, model } = mongoose

const catSchema = new Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
  }
})

module.exports = model('Category', catSchema)