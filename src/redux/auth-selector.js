
export const getAuth = (state) => {
  return state.authReducer.isAuth
}

export const getUserProfile = (state) => {
  return state.authReducer.userData
}

export const getUserPhoto = (state) => {
  return state.authReducer.userPhoto
}
