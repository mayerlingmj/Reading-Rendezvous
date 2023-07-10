const express = require('express')
const router = require('express').Router()
const commentController = require('../controllers/CommentController')

// Create a new comment
router.post('/', commentController.createComment)

// Get all comments for a discussion
router.get(
  '/discussion/:discussionId',
  commentController.getCommentsByDiscussion
)

module.exports = router
