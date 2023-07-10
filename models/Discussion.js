const { Schema } = require('mongoose')

const discussionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }
  },
  { timestamps: true }
)
module.exports = discussionSchema
