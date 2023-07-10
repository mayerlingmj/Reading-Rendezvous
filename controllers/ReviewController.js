const Review = require('../models/Review')

// Create a new review
exports.createReview = async (req, res) => {
  const { content, user, book } = req.body
  try {
    const review = await Review.create({ content, user, book })
    res.status(201).json({ review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create review' })
  }
}

// Get all reviews for a book
exports.getReviewsByBook = async (req, res) => {
  const { bookId } = req.params
  try {
    const reviews = await Review.find({ book: bookId })
    res.json({ reviews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch reviews' })
  }
}

// Update review details
exports.updateReview = async (req, res) => {
  const { id } = req.params
  const { content } = req.body
  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    )
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.json({ review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update review' })
  }
}

// Delete a review
exports.deleteReview = async (req, res) => {
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

// Get reviews by user
exports.getReviewsByUser = async (req, res) => {
  const { userId } = req.params
  try {
    const reviews = await Review.find({ user: userId })
    res.json({ reviews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch reviews' })
  }
}
