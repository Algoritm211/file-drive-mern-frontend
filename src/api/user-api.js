import {instanceAxios} from "./login-api";


export const userAPI = {
  setUserPhoto(file) {
    const formData = new FormData()
    formData.append('file', file)
    return instanceAxios.post('/files/avatar', formData)
      .then(data => data.data)
  },

  deleteUserPhoto() {
    return instanceAxios.delete('/files/avatar')
      .then(data => data.data)
  }
}
