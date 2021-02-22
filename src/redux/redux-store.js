import {combineReducers} from "redux";
import authReducer from './auth-reducer'
import {configureStore} from "@reduxjs/toolkit";
import fileReducer from "./file-reducer";
import uploaderReducer from './uploader-reducer'


const rootReducer = combineReducers({
  authReducer: authReducer,
  fileReducer: fileReducer,
  uploaderReducer: uploaderReducer
})


const store = configureStore({
  reducer: rootReducer,
})


window.__store__ = store

export default store
