const { Discussion } = require('../models')

const createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create({ ...req.body })
    res.status(201).json({ discussion })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create discussion' })
  }
}

const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find({ book: req.params.id })
    res.json({ discussions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch discussions' })
  }
}

const getDiscussionById = async (req, res) => {
  const { id } = req.params
  try {
    const discussion = await Discussion.findById(id)
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' })
    }
    res.json({ discussion })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch discussion details' })
  }
}

const updateDiscussion = async (req, res) => {
  const { id } = req.params
  try {
    const discussion = await Discussion.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' })
    }
    res.json({ discussion })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update discussion' })
  }
}

const getDiscussionsByUser = async (req, res) => {
  const { userId } = req.params
  try {
    const discussions = await Discussion.find({ user: userId })
    res.json({ discussions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch discussions' })
  }
}

module.exports = {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  updateDiscussion,
  getDiscussionsByUser
}
