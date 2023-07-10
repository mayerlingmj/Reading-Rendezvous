const mongoose = require('mongoose')

const User = require('./User')
const Book = require('./Book')
const Discussion = require('./Discussion')
const Review = require('./Review')
const Comment = require('./Comment')

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })

module.exports = {
  User,
  Book,
  Discussion,
  Review,
  Comment
}
