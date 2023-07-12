import axios from 'axios'

const api = axios.create({
  baseURL: 'https://openlibrary.org/'
})

export const getAllBooks = async () => {
  try {
    const response = await api.get('/books')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

export const getDiscussions = async () => {
  try {
    const response = await api.get('/discussions')
    return response.data
  } catch (error) {
    console.error('Error fetching discussions:', error)
    throw error
  }
}

export default api
