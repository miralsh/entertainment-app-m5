// import { reducer } from './reducer';
// import {applyMiddleware,createStore} from 'redux';
// import {thunk} from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from './slices/mediaSlice'
import authReducer from './slices/authSlice'
import bookmarkReducer from './slices/bookmarkSlice'
import uiReducer from './slices/uiSlice'
//export const store = configureStore(reducer,applyMiddleware(thunk));
export const store=configureStore({reducer:{media:mediaReducer,auth:authReducer,bookmark:bookmarkReducer,ui:uiReducer}})