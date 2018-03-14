const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
    timestamps: true,
  })

module.exports = {
  model: mongoose.model('Comment', Comment),
  schema: Comment,
}