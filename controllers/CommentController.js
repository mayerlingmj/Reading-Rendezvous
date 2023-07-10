const Comment = require('../models/Comment')

// Create a new comment
exports.createComment = async (req, res) => {
  const { content, user, discussion } = req.body
  try {
    const comment = await Comment.create({ content, user, discussion })
    res.status(201).json({ comment })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create comment' })
  }
}

// Get all comments for a discussion
exports.getCommentsByDiscussion = async (req, res) => {
  const { discussionId } = req.params
  try {
    const comments = await Comment.find({ discussion: discussionId })
    res.json({ comments })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch comments' })
  }
}
