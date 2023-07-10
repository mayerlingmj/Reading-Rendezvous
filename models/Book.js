const { Schema } = require('mongoose')

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: { type: String, required: true }
})

module.exports = bookSchema
