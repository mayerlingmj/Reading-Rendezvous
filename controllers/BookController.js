const { Book } = require('../models')
const controller = require('../controllers/AuthController')

// Create a new book
const createBook = async (req, res) => {
  try {
    console.log(controller.CheckSession)
    const book = await Book.create({ ...req.body })
    res.status(201).send(book)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create book' })
  }
}

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.json({ books })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch books' })
  }
}

// Get book by ID
const getBookById = async (req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.json({ book })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch book details' })
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById
}
