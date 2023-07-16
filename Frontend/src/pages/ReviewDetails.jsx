import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ReviewDetail = () => {
  const [review, setReview] = useState(null)
  const { reviewId } = useParams()

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/reviews/${reviewId}`)
        setReview(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReview()
  }, [reviewId])

  if (!review) {
    return <div>Loading review...</div>
  }

  return (
    <div>
      <h2>Review Details</h2>
      <p>Review ID: {review._id}</p>
      <p>Review Content: {review.content}</p>
    </div>
  )
}

export default ReviewDetail
