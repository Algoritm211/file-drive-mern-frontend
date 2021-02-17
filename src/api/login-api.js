import axios from "axios";


const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000/api/'
})


export const authAPI = {
  registration: async (email, password) => {
    return await instanceAxios.post('/auth/registration', {email, password})
      .then(data => data.data)
  },

  login: async (email, password) => {
    return await instanceAxios.post('/auth/login', {email, password})
      .then(data => data.data)
  },
  auth: async () => {
    const token = localStorage.getItem('authToken')
    return await instanceAxios.get('/auth/authorization', {headers: {Authorization: `Bearer ${token}`}})
      .then(data => data.data)
  }
}
