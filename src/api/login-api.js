import axios from "axios";


export const instanceAxios = axios.create({
  baseURL: 'https://react-mern-server.herokuapp.com/api/',
  headers: {Authorization: `Bearer ${localStorage.getItem('authToken')}`}
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
    return await instanceAxios.get('/auth/authorization',)
      .then(data => data.data)
  }
}
