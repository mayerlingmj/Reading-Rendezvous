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
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <h2 style={{ width: '100%', textAlign: 'center' }}>Add Review</h2>
      <div
        style={{
          width: '200px',
          margin: '10px',
          backgroundColor: 'lightpink',
          borderRadius: '5px',
          padding: '10px',
          boxSizing: 'border-box'
        }}
      >
        <form onSubmit={reviewId ? handleReviewUpdate : handleReviewSubmit}>
          <label htmlFor="review" style={{ display: 'block' }}>
            Review:
          </label>
          <textarea
            id="content"
            value={review.content}
            onChange={handleReviewChange}
            style={{ marginBottom: '10px', width: '100%', height: '100px' }}
          />
          <label htmlFor="rating" style={{ display: 'block' }}>
            Rating:
          </label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={review.rating}
            onChange={handleReviewChange}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <button type="submit">
            {reviewId ? 'Update Review' : 'Submit Review'}
          </button>
          {reviewId && (
            <button
              type="button"
              onClick={handleReviewDelete}
              style={{
                backgroundColor: 'hotpink',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginBottom: '10px',
                width: '100%'
              }}
            >
              Delete Review
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddReview
