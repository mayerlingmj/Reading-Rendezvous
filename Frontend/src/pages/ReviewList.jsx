import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetReviews } from '../services/Review'

const ReviewList = (user) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await GetReviews(user.id)
        console.log('Response from server:', response)
        setReviews(response.reviews)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [])
  console.log('Reviews:', reviews)
  return (
    <div>
      <h2>Review List</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <Link to={`/reviews/${userId}`}>{review.content}</Link>
        </div>
      ))}
    </div>
  )
}

export default ReviewList
