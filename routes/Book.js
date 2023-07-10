const express = require('express')
const router = require('express').Router()
const bookController = require('../controllers/BookController')

// Create a new book
router.post('/', bookController.createBook)

// Get book details by ID
router.get('/:id', bookController.getBookById)

module.exports = router
