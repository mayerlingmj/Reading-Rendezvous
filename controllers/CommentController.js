const { Comment } = require('../models')

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { content, userId, discussionId } = req.body
    const comment = await Comment.create({
      content,
      user: userId,
      discussion: discussionId
    })
    res.status(201).json({ comment })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create comment' })
  }
}

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'email')
    res.json({ comments })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch comments' })
  }
}

// Get comment by ID
const getCommentById = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findById(id).populate('user', 'email')
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    res.json({ comment })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch comment details' })
  }
}

// Update comment
const updateComment = async (req, res) => {
  const { id } = req.params
  const { content } = req.body
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    ).populate('user', 'email')
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    res.json({ comment })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update comment' })
  }
}

// Delete comment
const deleteComment = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByIdAndRemove(id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    res.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete comment' })
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment
}
