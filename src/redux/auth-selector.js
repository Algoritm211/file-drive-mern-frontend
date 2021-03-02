
export const getAuth = (state) => {
  return state.authReducer.isAuth
}

export const getUserProfile = (state) => {
  return state.authReducer.userData
}

export const getUserPhoto = (state) => {
  return state.authReducer.userPhoto
}

export const getAuthError = (state) => {
  return state.authReducer.authError
}


export const getRegistrationError = (state) => {
  return state.authReducer.registrationError
}
