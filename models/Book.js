const { Schema } = require('mongoose')

const bookSchema = new Schema({
  title: { type: String, required: false, unique: true },
  author_name: { type: Array, required: false },
  cover_i: { type: String, required: false }
})

module.exports = bookSchema
