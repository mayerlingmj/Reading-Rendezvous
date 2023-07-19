import axios from 'axios'

export const BASE_URL = 'http://localhost:3001'
// export const BASE_URL = ''

const api = axios.create({ baseURL: BASE_URL })

// Intercepts every request axios makes
api.interceptors.request.use(
  (config) => {
    // Reads the token in localStorage
    const token = localStorage.getItem('token')
    // if the token exists, we set the authorization header
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config // We return the new config if the token exists or the default config if no token exists.
    // Provides the token to each request that passes through axios
  },
  (error) => Promise.reject(error)
)

export default api
