const mongoose = require('mongoose')
const { Schema, model } = mongoose

const heroSchema = new Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  scores: {
    difficult: { type: Number },
    skill: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      name: { type: String },
      icon: { type: String },
      desc: { type: String },
      coolTime: { type: String },
      cost: { type: String }
    }
  ],
  itemRecommand1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  itemRecommand2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  tips: {
    useTip: { type: String },
    attackTip: { type: String },
    teamTip: { type: String }
  },
  partner: [
    {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'}
  ]
})

module.exports = model('Hero', heroSchema)