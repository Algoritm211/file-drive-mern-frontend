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
  },

  uploadFile(file, dirId) {
    const formData = new FormData()
    formData.append('file', file)
    if (dirId) {
      formData.append('parent', dirId)
    }

    return instanceAxios.post('/files/upload/', formData, {
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength) {
          const loadPercent = Math.round((progressEvent.loaded * 100) / totalLength)
          console.log(`Всего ${totalLength}, загружено ${loadPercent}%`)
        }
      }
    }).then(data => data.data)

  }
}
