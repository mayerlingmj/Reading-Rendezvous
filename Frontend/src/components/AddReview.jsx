import React, { useState } from 'react'
import axios from 'axios'
import { PostReview } from '../services/Review'

const AddReview = ({ reviewId }) => {
  const [review, setReview] = useState('')

  const handleReviewChange = (event) => {
    setReview(event.target.value)
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault()

    try {
      await PostReview(review)

      setReview('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewUpdate = async () => {
    try {
      await axios.put(`/reviews/${reviewId}`, {
        review
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewDelete = async () => {
    try {
      await axios.delete(`/reviews/${reviewId}`)
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
