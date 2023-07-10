const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
