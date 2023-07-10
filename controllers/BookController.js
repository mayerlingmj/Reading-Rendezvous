const axios = require('axios')
const Book = require('../models/Book')

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, description } = req.body
  try {
    const openLibraryResponse = await axios.get(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(
        title
      )}&author=${encodeURIComponent(author)}`
    )
    const bookDetails = openLibraryResponse.data.docs[0]
    const book = await Book.create({
      title: bookDetails.title,
      author: bookDetails.author_name[0],
      description
    })
    res.status(201).json({ book })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create book' })
  }
}

// Get book details by ID
exports.getBookById = async (req, res) => {
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
