const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })

// Import models
const User = require('./models/User')
const Book = require('./models/Book')
const Discussion = require('./models/Discussion')
const Review = require('./models/Review')
const Comment = require('./models/Comment')

// Import controllers
const authController = require('./controllers/AuthController')
const bookController = require('./controllers/BookController')
const discussionController = require('./controllers/DiscussionController')
const reviewController = require('./controllers/ReviewController')
const commentController = require('./controllers/CommentController')

// Routes
app.post('/api/auth/register', authController.registerUser)
app.post('/api/auth/login', authController.loginUser)

app.post('/api/books', bookController.createBook)
app.get('/api/books/:id', bookController.getBookById)

app.post('/api/discussions', discussionController.createDiscussion)
app.get('/api/discussions', discussionController.getAllDiscussions)
app.get('/api/discussions/:id', discussionController.getDiscussionById)
app.put('/api/discussions/:id', discussionController.updateDiscussion)
app.delete('/api/discussions/:id', discussionController.deleteDiscussion)
app.get(
  '/api/discussions/user/:userId',
  discussionController.getDiscussionsByUser
)

app.post('/api/reviews', reviewController.createReview)
app.get('/api/reviews/book/:bookId', reviewController.getReviewsByBook)
app.put('/api/reviews/:id', reviewController.updateReview)
app.delete('/api/reviews/:id', reviewController.deleteReview)
app.get('/api/reviews/user/:userId', reviewController.getReviewsByUser)

app.post('/api/comments', commentController.createComment)
app.get(
  '/api/comments/discussion/:discussionId',
  commentController.getCommentsByDiscussion
)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error' })
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
