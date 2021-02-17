import axios from "axios";


const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000/'
})


export const authAPI = {
  registration: async (email, password) => {
    return await instanceAxios.post('/api/auth/registration', {email, password})
      .then(data => data.data)
  },

  login: async (email, password) => {
    return await instanceAxios.post('/api/auth/login', {email, password})
      .then(data => data.data)
  }
}
