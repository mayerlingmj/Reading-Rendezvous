const mongoose = require('mongoose')

const userSchema = require('./User')
const bookSchema = require('./Book')
const discussionSchema = require('./Discussion')
const reviewSchema = require('./Review')
const commentSchema = require('./Comment')

const User = mongoose.model('User', userSchema)
const Book = mongoose.model('Book', bookSchema)
const Discussion = mongoose.model('Discussion', discussionSchema)
const Review = mongoose.model('Review', reviewSchema)
const Comment = mongoose.model('Comment', commentSchema)
module.exports = {
  User,
  Book,
  Discussion,
  Review,
  Comment
}
