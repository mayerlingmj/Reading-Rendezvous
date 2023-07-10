const express = require('express')
const router = require('express').Router()
const authController = require('../controllers/AuthController')

// User registration
router.post('/register', authController.registerUser)

// User login
router.post('/login', authController.loginUser)

module.exports = router
