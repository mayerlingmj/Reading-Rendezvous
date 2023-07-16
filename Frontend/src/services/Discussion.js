import api from './api'

export const PostDiscussion = async (data) => {
  try {
    const response = await api.post('/discussions', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const GetDiscussions = async () => {
  try {
    const res = await api.get('/discussions')
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
