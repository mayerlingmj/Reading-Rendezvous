const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const AuthRouter = require('./routes/AuthRouter')
const BookRouter = require('./routes/BookRouter')
const DiscussionRouter = require('./routes/DiscussionRouter')
const ReviewRouter = require('./routes/ReviewRouter')
const CommentRouter = require('./routes/CommentRouter')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', AuthRouter)
app.use('/books', BookRouter)
app.use('/discussions', DiscussionRouter)
app.use('/reviews', ReviewRouter)
app.use('/comments', CommentRouter)

app.use('/', (req, res) => {
  res.send('Connected!')
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
