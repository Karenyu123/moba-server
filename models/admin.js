const mongoose = require('mongoose')
const { Schema, model } = mongoose
const adminSchema = new Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
    return require('bcryptjs').hashSync(val, 10)
    }
  }
})

module.exports = model('Admin', adminSchema)