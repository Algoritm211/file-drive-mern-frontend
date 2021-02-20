import {instanceAxios} from "./login-api";


export const fileAPI = {
  getFiles(dirId) {
    return instanceAxios.get(`/files${dirId ? '?parent=' + dirId : ''}`)
      .then(data => data.data)
  },
  createDir(dirId, name) {
    return instanceAxios.post('/files/', {
      name,
      parent: dirId,
      type: 'dir'
    }).then(data => data.data)
  }
}
