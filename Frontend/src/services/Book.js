import api from './api'

export const PostBook = async (data) => {
  try {
    const response = await api.post('/books', data)
    return response.data
  } catch (error) {
    throw error
  }
}
export const GetBooks = async () => {
  try {
    const res = await api.get('/books')
    return res.data
  } catch (error) {
    throw error
  }
}
