import Client from './api'

export const SignIn = async (credentials) => {
  try {
    const res = await Client.post('/auth/login', credentials)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const SignUp = async (credentials) => {
  try {
    const res = await Client.post('/auth/register', credentials)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
