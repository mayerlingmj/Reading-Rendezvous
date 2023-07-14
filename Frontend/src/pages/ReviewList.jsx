import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReviewDetails from './ReviewDetails'
import { GetReviews } from '../services/Review'

const ReviewList = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await GetReviews()
        setReviews(response.reviews)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [])

  return (
    <div>
      <h2>Review List</h2>
      {reviews.map((review) => (
        <ReviewDetails key={review._id} review={review} />
      ))}
    </div>
  )
}

export default ReviewList
