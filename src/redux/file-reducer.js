import {createSlice} from "@reduxjs/toolkit";
import {fileAPI} from "../api/file-api";


const fileReducer = createSlice({
  name: 'files',
  initialState: {
    files: [],
    currentDir: null,
    fileStack: []
  },
  reducers: {
    setFiles(state, action) {
      state.files = action.payload
    },
    setCurrentDir(state, action) {
      state.currentDir = action.payload
    },
    createFile(state, action) {
      state.files.push(action.payload)
    },
    pushToFileStack(state, action) {
      state.fileStack.push(action.payload)
    },
    popFromFileStack(state, action) {
      state.fileStack.pop()
    }
  }
})

export const {setFiles, setCurrentDir, createFile, pushToFileStack, popFromFileStack} = fileReducer.actions
export default fileReducer.reducer


export const loadFiles = (dirId) => async (dispatch) => {
  const data = await fileAPI.getFiles(dirId)

  dispatch(setFiles(data))
}

export const createNewDir = (dirId, name) => async (dispatch) => {
  const dir = await fileAPI.createDir(dirId, name)
  dispatch(createFile(dir))
}

export const uploadFile = (file, dirId) => async (dispatch) => {
  const fileData = await fileAPI.uploadFile(file, dirId)

  dispatch(createFile(fileData))
}
