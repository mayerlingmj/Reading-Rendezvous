const Discussion = require('../models/Discussion')

// Create a new discussion
exports.createDiscussion = async (req, res) => {
  const { title, content, userId, bookId } = req.body
  try {
    const discussion = await Discussion.create({
      title,
      content,
      user: userId,
      book: bookId
    })
    res.status(201).json({ discussion })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create discussion' })
  }
}

// Get all discussions
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('user', 'email')
    res.json({ discussions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch discussions' })
  }
}

// Get discussion details by ID
exports.getDiscussionById = async (req, res) => {
  const { id } = req.params
  try {
    const discussion = await Discussion.findById(id).populate('user', 'email')
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' })
    }
    res.json({ discussion })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch discussion details' })
  }
}

// Update discussion details
exports.updateDiscussion = async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  try {
    const discussion = await Discussion.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    ).populate('user', 'email')
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' })
    }
    res.json({ discussion })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update discussion' })
  }
}

// Delete a discussion
exports.deleteDiscussion = async (req, res) => {
  const { id } = req.params
  try {
    const discussion = await Discussion.findByIdAndRemove(id)
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' })
    }
    res.json({ message: 'Discussion deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete discussion' })
  }
}

// Get discussions by user
exports.getDiscussionsByUser = async (req, res) => {
  const { userId } = req.params
  try {
    const discussions = await Discussion.find({ user: userId }).populate(
      'user',
      'email'
    )
    res.json({ discussions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch discussions' })
  }
}
