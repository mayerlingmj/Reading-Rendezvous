import api from './api'

export const PostReview = async (data) => {
  try {
    const response = await api.post('/reviews', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const GetReviews = async () => {
  try {
    const res = await api.get('/reviews')
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateReview = async (reviewId, data) => {
  try {
    const response = await api.put(`/reviews/${reviewId}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const DeleteReview = async (reviewId) => {
  try {
    await api.delete(`/reviews/${reviewId}`)
  } catch (error) {
    throw error
  }
}
