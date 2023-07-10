const { Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    discussion: {
      type: Schema.Types.ObjectId,
      ref: 'Discussion',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = commentSchema
