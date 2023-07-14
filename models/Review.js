const { Schema } = require('mongoose')

const reviewSchema = new Schema(
  {
    content: { type: String, required: false },
    rating: { type: Number, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: false }
  },
  { timestamps: true }
)

module.exports = reviewSchema
