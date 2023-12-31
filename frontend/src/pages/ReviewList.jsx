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

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://i.imgur.com/UIwoDai.jpg)'
    document.body.style.backgroundSize = 'cover'

    return () => {
      document.body.style.backgroundImage = null
    }
  }, [])

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <h2 style={{ width: '100%', textAlign: 'center' }}>Review List</h2>
      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            width: '200px',
            margin: '10px',
            backgroundColor: 'lightpink',
            borderRadius: '5px',
            padding: '10px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <textarea
              value={editInputs[review._id] || ''}
              onChange={(e) => handleInputChange(review._id, e.target.value)}
              style={{
                marginBottom: '10px',
                width: '100%',
                resize: 'vertical'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                style={{
                  backgroundColor: 'hotpink',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  width: '48%'
                }}
                onClick={() => handleUpdateReview(review._id)}
              >
                Update
              </button>
              <button
                style={{
                  backgroundColor: 'hotpink',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  width: '48%'
                }}
                onClick={() => handleDeleteReview(review._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <Link
            to={`/reviews/${review._id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            {review.content}
          </Link>
          {review.book && review.book.cover_i && (
            <img
              src={`http://covers.openlibrary.org/b/id/${review.book.cover_i}-M.jpg`}
              alt={review.book.title}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ReviewList
