import api from './api'

export const SignInUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (credentials) => {
  try {
    const response = await api.post('/auth/register', credentials)
    return response.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const response = await api.get('/auth/session')
    return response.data
  } catch (error) {
    throw error
  }
}
