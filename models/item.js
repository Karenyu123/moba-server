const mongoose = require('mongoose')
const { Schema, model } = mongoose

const itemSchema = new Schema({
  name: { type: String },
  icon: { type: String }
})

module.exports = model('Item', itemSchema)