import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PostReview, UpdateReview, DeleteReview } from '../services/Review'

const AddReview = () => {
  const [review, setReview] = useState('')
  const { reviewId } = useParams()
  const navigate = useNavigate()

  const handleReviewChange = (event) => {
    setReview(event.target.value)
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
      <input id="review" value={review} onChange={handleReviewChange} />
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
