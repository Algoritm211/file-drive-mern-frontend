


export const getFiles = (state) => {
  return state.fileReducer.files
}

export const getCurrentDir = (state) => {
  return state.fileReducer.currentDir
}

export const getFileStack = (state) => {
  return state.fileReducer.fileStack
}

export const getModeFileView = (state) => {
  return state.fileReducer.mode
}
