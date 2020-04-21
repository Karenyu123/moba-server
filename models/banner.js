const mongoose = require('mongoose')

const { Schema, model } = mongoose

const bannerSchema = new Schema({
  name: { type: String },
  banners: [
    {
      image: { type: String },
      url: { type: String }
    }
  ]
})

module.exports = model('Banner', bannerSchema)