import {instanceAxios} from "./login-api";
import {addFile, changeLoadingProgress, toggleVisible} from "../redux/uploader-reducer";


export const fileAPI = {
  getFiles(dirId, sort) {
    if (dirId) {
      return instanceAxios.get(`/files?parent=${dirId}`)
        .then(data => data.data)
    }
    if (sort) {
      return instanceAxios.get(`/files?sort=${sort}`)
        .then(data => data.data)
    }
    if (dirId && sort) {
      return instanceAxios.get(`/files?parent=${dirId}&sort=${sort}`)
        .then(data => data.data)
    }
    return instanceAxios.get(`/files`)
      .then(data => data.data)
  },

  createDir(dirId, name) {
    return instanceAxios.post('/files/', {
      name,
      parent: dirId,
      type: 'dir'
    }).then(data => data.data)
  },

  uploadFile(file, dirId, dispatch) {
    const formData = new FormData()
    formData.append('file', file)
    if (dirId) {
      formData.append('parent', dirId)
    }

    let uploadingFile = {name: file.name, progress: 0, id: Date.now()}
    dispatch(toggleVisible(true))
    dispatch(addFile(uploadingFile))

    return instanceAxios.post('/files/upload/', formData, {
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength) {

          const progress = Math.round((progressEvent.loaded * 100) / totalLength)
          dispatch(changeLoadingProgress({file: uploadingFile, progress: progress}))
          // console.log(`Всего ${totalLength}, загружено ${loadPercent}%`)
        }
      }
    }).then(data => data.data)

  },

  downloadFile(fileId) {
    const fileBlob = instanceAxios.get(`/files/download/?id=${fileId}`, {
      responseType: 'blob'
    })
      .then(data => data.data)
    return fileBlob
  },

  deleteFile(fileId) {
    return instanceAxios.delete(`/files/?id=${fileId}`)
      .then(data => data.data)
  }
}
