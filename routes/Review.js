const express = require('express')
const router = require('express').Router()
const reviewController = require('../controllers/ReviewController')

// Create a new review
router.post('/', reviewController.createReview)

// Get all reviews for a book
router.get('/book/:bookId', reviewController.getReviewsByBook)

// Update review details
router.put('/:id', reviewController.updateReview)

// Delete a review
router.delete('/:id', reviewController.deleteReview)

// Get reviews by user
router.get('/user/:userId', reviewController.getReviewsByUser)

module.exports = router
