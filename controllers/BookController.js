const { Book } = require('../models')

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, description } = req.body
    const book = await Book.create({ title, author, description })
    res.status(201).json({ book })
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
