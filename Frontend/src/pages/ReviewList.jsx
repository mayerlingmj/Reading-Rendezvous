import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetReviews, DeleteReview, UpdateReview } from '../services/Review'

const ReviewList = ({ user }) => {
  const [reviews, setReviews] = useState([])

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

  const handleDeleteReview = async (reviewId) => {
    try {
      await DeleteReview(reviewId)
      const updatedReviews = reviews.filter((review) => review._id !== reviewId)
      setReviews(updatedReviews)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditReview = async (reviewId, updatedContent) => {
    try {
      await UpdateReview(reviewId, { content: updatedContent })
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId
          ? { ...review, content: updatedContent }
          : review
      )
      setReviews(updatedReviews)
    } catch (error) {
      console.error(error)
    }
  }

  console.log('Reviews:', reviews)

  return (
    <div>
      <h2>Review List</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <div>
            <input
              type="text"
              defaultValue={review.content}
              onChange={(e) => handleEditReview(review._id, e.target.value)}
            />
            <button onClick={() => handleDeleteReview(review._id)}>
              Delete
            </button>
          </div>
          <Link to={`/reviews/${review._id}`}>
            {review.content} {review.book && review.book.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ReviewList
