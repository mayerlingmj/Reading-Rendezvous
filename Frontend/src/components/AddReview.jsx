import React, { useState } from 'react'
import axios from 'axios'

const AddReview = ({ bookId }) => {
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
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleReviewSubmit}>
      <label htmlFor="review">Review:</label>
      <input id="review" value={review} onChange={handleReviewChange} />
      <button type="submit">Submit Review</button>
    </form>
  )
}

export default AddReview
