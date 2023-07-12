import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Reviews = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const result = await axios.get('/reviews')
      setReviews(result.data)
    }

    fetchReviews()
  }, [])

  return (
    <div>
      {reviews.map((review, index) => (
        <p key={index}>{review.title}</p>
      ))}
    </div>
  )
}
export default Reviews
