const mongoose = require('mongoose')

const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
})

const Discussion = mongoose.model('Discussion', discussionSchema)

module.exports = Discussion
