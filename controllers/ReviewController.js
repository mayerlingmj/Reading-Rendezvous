const { Review } = require('../models')

const createReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body })
    res.status(201).json({ review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create review' })
  }
}

const getReviewsByBook = async (req, res) => {
  const { bookId } = req.params
  try {
    const reviews = await Review.find({}).populate('book')
    res.json({ reviews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch reviews' })
  }
}

const updateReview = async (req, res) => {
  const { id } = req.params
  try {
    const review = await Review.findByIdAndUpdate(id, req.body, { new: true })
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.json({ review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update review' })
  }
}

const deleteReview = async (req, res) => {
  const { id } = req.params
  try {
    const review = await Review.findByIdAndRemove(id)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete review' })
  }
}

const getReviewsByUser = async (req, res) => {
  const { userId } = req.params
  try {
    const reviews = await Review.find({ user: userId })
    res.json({ reviews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch reviews' })
  }
}

module.exports = {
  createReview,
  getReviewsByBook,
  updateReview,
  deleteReview,
  getReviewsByUser
}
