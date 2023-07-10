const { Schema } = require('mongoose')

const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }
  },
  { timestamps: true }
)

module.exports = reviewSchema
