import axios from 'axios'

const baseURL = 'https://openlibrary.org'

const GetBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    )
    return response.data
  } catch (error) {
    throw error
  }
}

const SearchBooks = async (query) => {
  try {
    const response = await axios.get(`${baseURL}/search.json?q=${query}`)
    return response.data.docs
  } catch (error) {
    throw error
  }
}

export default api
