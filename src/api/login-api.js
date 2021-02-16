import axios from "axios";


const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000/'
})


export const loginAPI = {
  registration: async (email, password) => {
    try {
      const response = await instanceAxios.post('/api/auth/registration', {email, password})
      alert(JSON.stringify(response.data.message))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}
