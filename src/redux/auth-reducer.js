import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/login-api";
import {userAPI} from "../api/user-api";
import {setAppReady} from "./app-reducer";


const authReducer = createSlice({
  name: 'auth',
  initialState: {
    userData: {},
    userPhoto: null,
    isAuth: false,
    authError: null,
    registrationError: null
  },
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload.isAuth
    },
    setUserAuthData(state, action) {
      state.userData = action.payload
      state.isAuth = true
      state.authError = null
    },
    logout(state) {
      state.userData = {}
      state.isAuth = false
      localStorage.removeItem('authToken')
    },
    setUserPhoto(state, action) {
      state.userData.avatar = action.payload
    },
    deleteUserPhoto(state) {
      state.userData.avatar = null
    },
    setAuthError(state, action) {
      state.authError = action.payload
    },
    setRegistrationError(state, action) {
      state.registrationError = action.payload
    },
    registrationSuccess(state, action) {
      state.registrationError = null
    }
  }
})

export const {
  setUserAuthData,
  logout,
  setUserPhoto,
  deleteUserPhoto,
  setIsAuth,
  setAuthError,
  setRegistrationError,
  registrationSuccess} = authReducer.actions
export default authReducer.reducer

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const data = await authAPI.registration(email, password)

    dispatch(registrationSuccess())
    dispatch(loginUser(email, password))
  } catch (error) {
    console.log(error)
    dispatch(setRegistrationError(error.response.data.message))
  }
}

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setAppReady(false))
    const data = await authAPI.login(email, password)
    await localStorage.setItem('authToken', data.token)
    dispatch(setUserAuthData(data.user))
    window.location.reload()
    dispatch(setAppReady(true))
  } catch (error) {
    dispatch(setAuthError(error.response.data.message))
    dispatch(setAppReady(true))
  }
}

export const authUser = () => async (dispatch) => {
  try {
    dispatch(setAppReady(false))
    const data = await authAPI.auth()
    dispatch(setUserAuthData(data.user))
    localStorage.setItem('authToken', data.token)
    dispatch(setAppReady(true))
  } catch (error) {
    console.log(error)
    localStorage.removeItem('authToken')
    setIsAuth({isAuth: false})
    setAuthError(error.response.data.message)
    // alert(error.response.data.message)
    dispatch(setAppReady(true))
  } finally {
    dispatch(setAppReady(true))
  }
}

export const setProfilePhoto = (photo) => async (dispatch) => {
  const data = await userAPI.setUserPhoto(photo)
  dispatch(setUserPhoto(data.avatarName))
}

export const deleteProfilePhoto = () => async (dispatch) => {
  const data = await userAPI.deleteUserPhoto()

  dispatch(deleteUserPhoto())
}
