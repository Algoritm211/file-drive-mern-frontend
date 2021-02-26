import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/login-api";
import {userAPI} from "../api/user-api";


const authReducer = createSlice({
  name: 'login',
  initialState: {
    userData: {},
    userPhoto: null,
    isAuth: false
  },
  reducers: {
    setUserAuthData(state, action) {
      state.userData = action.payload
      state.isAuth = true
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
    }
  }
})

export const {setUserAuthData, logout, setUserPhoto, deleteUserPhoto} = authReducer.actions
export default authReducer.reducer

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const data = await authAPI.login(email, password)
    dispatch(setUserAuthData(data.user))
    localStorage.setItem('authToken', data.token)
  } catch (error) {
    alert(error.response.data.message)
  }
}

export const authUser = () => async (dispatch) => {
  try {
    const data = await authAPI.auth()
    dispatch(setUserAuthData(data.user))
    localStorage.setItem('authToken', data.token)
  } catch (error) {
    console.log(error)
    localStorage.removeItem('authToken')
    alert(error.response.data.message)
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
