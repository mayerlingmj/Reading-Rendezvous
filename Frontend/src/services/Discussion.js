import api from './api'

export const PostDiscussion = async (data) => {
  try {
    const response = await api.post('/discussions', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const GetDiscussions = async (id) => {
  try {
    const res = await api.get(`/discussions/book/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateDiscussion = async (discussionId, data) => {
  try {
    const response = await api.put(`/discussions/${discussionId}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const PostComment = async (data) => {
  try {
    const response = await api.post('/comments', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const GetBook = async (bookId) => {
  try {
    const response = await api.get(`/books/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
