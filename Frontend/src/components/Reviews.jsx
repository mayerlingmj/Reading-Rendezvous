import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Reviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([])
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/${bookId}`)
        setReviews(response.data.reviews)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [bookId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`/reviews/${bookId}`, {
        reviewText
      })
      const newReview = response.data.review
      setReviews([...reviews, newReview])
      setReviewText('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setReviewText(e.target.value)
  }

  return (
    <div>
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="reviewText"
          value={reviewText}
          onChange={handleChange}
          placeholder="Write your review..."
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <div>
        {reviews.map((review) => (
          <div key={review._id}>
            <p>{review.title}</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
