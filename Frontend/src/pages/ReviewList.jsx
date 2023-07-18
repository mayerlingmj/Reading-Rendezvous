import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetReviews, DeleteReview, UpdateReview } from '../services/Review'

const ReviewList = ({ user }) => {
  const [reviews, setReviews] = useState([])
  const [editInputs, setEditInputs] = useState({})

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await GetReviews()
        console.log('Response from server:', response)
        setReviews(response.reviews)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    const newEditInputs = reviews.reduce((inputs, review) => {
      inputs[review._id] = review.content
      return inputs
    }, {})
    setEditInputs(newEditInputs)
  }, [reviews])

  const handleDeleteReview = async (reviewId) => {
    try {
      await DeleteReview(reviewId)
      const updatedReviews = reviews.filter((review) => review._id !== reviewId)
      setReviews(updatedReviews)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (reviewId, newValue) => {
    setEditInputs({
      ...editInputs,
      [reviewId]: newValue
    })
  }

  const handleUpdateReview = async (reviewId) => {
    try {
      await UpdateReview(reviewId, { content: editInputs[reviewId] })
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId
          ? { ...review, content: editInputs[reviewId] }
          : review
      )
      setReviews(updatedReviews)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Review List</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <div>
            <input
              type="text"
              value={editInputs[review._id] || ''}
              onChange={(e) => handleInputChange(review._id, e.target.value)}
            />
            <button onClick={() => handleUpdateReview(review._id)}>
              Update
            </button>
            <button onClick={() => handleDeleteReview(review._id)}>
              Delete
            </button>
          </div>
          <Link to={`/reviews/${review._id}`}>
            {review.content} {review.book && review.book.title}
          </Link>
          {review.book && review.book.cover_i && (
            <img
              src={`http://covers.openlibrary.org/b/id/${review.book.cover_i}-M.jpg`}
              alt={review.book.title}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ReviewList
