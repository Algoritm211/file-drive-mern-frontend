import {combineReducers} from "redux";
import authReducer from './auth-reducer'
import {configureStore} from "@reduxjs/toolkit";
import fileReducer from "./file-reducer";


const rootReducer = combineReducers({
  authReducer: authReducer,
  fileReducer: fileReducer
})


const store = configureStore({
  reducer: rootReducer,
})


window.__store__ = store

export default store
