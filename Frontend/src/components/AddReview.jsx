import React, { useState } from 'react'
import axios from 'axios'

const AddReview = ({ bookId, onReviewChange }) => {
  const [review, setReview] = useState('')

  const handleReviewChange = (event) => {
    setReview(event.target.value)
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post('/reviews', {
        bookId,
        review
      })

      setReview('')

      onReviewChange()
    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewUpdate = async (updatedReview) => {
    try {
      await axios.put(`/reviews/${reviewId}`, {
        review: updatedReview
      })

      onReviewChange()
    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewDelete = async () => {
    try {
      await axios.delete(`/reviews/${reviewId}`)

      onReviewChange()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleReviewSubmit}>
      <label htmlFor="review">Review:</label>
      <input id="review" value={review} onChange={handleReviewChange} />
      <button type="submit">Submit Review</button>
      <button type="button" onClick={() => handleReviewUpdate(review)}>
        Update Review
      </button>
      <button type="button" onClick={handleReviewDelete}>
        Delete Review
      </button>
    </form>
  )
}

export default AddReview
