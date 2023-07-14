import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ReviewDetail = ({ reviewId }) => {
  const [review, setReview] = useState(null)

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/reviews/${reviewId}`)
        setReview(response.data)
        console.log(response)
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
