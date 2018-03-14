const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = require('./../comment/comment.model').schema

const Post = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
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
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [Comment],
  },
}, {
    timestamps: true,
  })

module.exports = {
  model: mongoose.model('Post', Post),
  schema: Post,
}