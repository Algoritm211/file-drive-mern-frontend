import {createSlice} from "@reduxjs/toolkit";

const uploaderReducer = createSlice({
  name: 'uploaderReducer',
  initialState: {
    isVisible: false,
    files: []
  },
  reducers: {
    toggleVisible(state, action) {
      state.isVisible = action.payload
    },
    addFile(state, action) {
      state.files.push(action.payload)
    },
    removeFile(state, action) {
      state.files = state.files.filter(file => file.id !== action.payload.id)
    },
    changeLoadingProgress(state, action) {
      const newProgress = action.payload.progress
      const uploadFile = action.payload.file

      state.files = state.files.map((file) => {
        if (file.id === uploadFile.id) {
          return {...file, progress: newProgress}
        }
        return file
      })
    }
  }
})


export const {toggleVisible, removeFile, addFile, changeLoadingProgress} = uploaderReducer.actions

export default uploaderReducer.reducer
