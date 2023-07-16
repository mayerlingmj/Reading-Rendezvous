import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AddReview from '../components/AddReview'
import { GetReviews } from '../services/Review'

const Review = () => {
  const [reviews, setReviews] = useState([])
  const [selectedReviewId, setSelectedReviewId] = useState(null)
  const { reviewId } = useParams()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await GetReviews()
        setReviews(response.data.reviews)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    if (reviewId) {
      setSelectedReviewId(reviewId)
    }
  }, [reviewId])

  return (
    <div>
      <h2>Review</h2>
      {selectedReviewId ? (
        <AddReview reviewId={selectedReviewId} />
      ) : (
        <AddReview />
      )}
      <h2>Review List</h2>
      {reviews.map((review) => (
        <div key={review._id} onClick={() => setSelectedReviewId(review._id)}>
          {review.content}
        </div>
      ))}
    </div>
  )
}

export default Review
