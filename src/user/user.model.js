const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  posts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post',
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'Post',
  },
}, {
    timestamps: true,
  })

module.exports = {
  model: mongoose.model('User', User),
  schema: User,
}