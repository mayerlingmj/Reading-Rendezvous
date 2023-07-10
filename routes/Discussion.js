const express = require('express')
const router = require('express').Router()
const discussionController = require('../controllers/DiscussionController')

// Create a new discussion
router.post('/', discussionController.createDiscussion)

// Get all discussions
router.get('/', discussionController.getAllDiscussions)

// Get discussion details by ID
router.get('/:id', discussionController.getDiscussionById)

// Update discussion details
router.put('/:id', discussionController.updateDiscussion)

// Delete a discussion
router.delete('/:id', discussionController.deleteDiscussion)

// Get discussions by user
router.get('/user/:userId', discussionController.getDiscussionsByUser)

module.exports = router
