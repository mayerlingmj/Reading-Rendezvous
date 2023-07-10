const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

// User registration
exports.registerUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({ email, password: hashedPassword })
    res.status(201).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to register user' })
  }
}

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, APP_SECRET, {
      expiresIn: '1h'
    })
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to login' })
  }
}
