import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/login-api";




const authReducer = createSlice({
  name: 'login',
  initialState: {
    userData: {},
    isAuth: false
  },
  reducers: {
    setUserAuthData(state, action) {
      state.userData = action.payload.userData
      state.isAuth = true
    },
    logout(state) {
      state.userData = {}
      state.isAuth = false
      localStorage.removeItem('authToken')
    }
  }
})

export const {setUserAuthData, logout} = authReducer.actions
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
