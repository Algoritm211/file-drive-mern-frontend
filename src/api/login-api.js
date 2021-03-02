import axios from "axios";
import {SERVER_HOST} from "../assets/server-info";


export const instanceAxios = axios.create({
  baseURL: `${SERVER_HOST}api/`,
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
