import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PostReview, UpdateReview, DeleteReview } from '../services/Review'

const AddReview = ({ user, bookId }) => {
  const [review, setReview] = useState({
    content: '',
    rating: '',
    user: user.id,
    book: bookId
  })
  const { reviewId } = useParams()
  const navigate = useNavigate()
  console.log(user)
  const handleReviewChange = (event) => {
    setReview({
      ...review,
      [event.target.id]: event.target.value
    })
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault()

    try {
      await PostReview(review)
      setReview('')
      navigate('/reviews')
    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewUpdate = async () => {
    try {
      await UpdateReview(reviewId, { review })
      navigate('/reviews')
    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewDelete = async () => {
    try {
      await DeleteReview(reviewId)
      navigate('/reviews')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={reviewId ? handleReviewUpdate : handleReviewSubmit}>
      <label htmlFor="review">Review:</label>
      <input
        id="content"
        value={review.content}
        onChange={handleReviewChange}
      />
      <input
        id="rating"
        type="number"
        min="1"
        max="5"
        value={review.rating}
        onChange={handleReviewChange}
      />
      <button type="submit">
        {reviewId ? 'Update Review' : 'Submit Review'}
      </button>
      {reviewId && (
        <button type="button" onClick={handleReviewDelete}>
          Delete Review
        </button>
      )}
    </form>
  )
}

export default AddReview
