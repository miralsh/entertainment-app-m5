
import { createSlice } from "@reduxjs/toolkit"
import { get_user, login,signup } from "../thunks/authThunks"

 
 
const initialState = {
   signup: [],
  signup_error: [],
  login: [],
  login_error: [],
  user: []
}

 const authSlice=createSlice({name:'auth',initialState,reducers:{

 },
extraReducers:
    (builder)=>{

    builder
    .addCase(signup.fulfilled,(state,action)=>{
        state.signup=action.payload
        state.statusCode=action.payload
    })
    .addCase(signup.rejected,(state,action)=>{
        state.signup_error=action.payload
        state.statusCode=action.payload
    })
    .addCase(login.fulfilled,(state,action)=>{
         state.login=action.payload
        state.statusCode=action.payload
    })
    .addCase(login.rejected,(state,action)=>{
        state.login_error=action.payload
        state.statusCode=action.payload
    })
    .addCase(get_user.fulfilled,(state,action)=>{
        state.user=action.payload
    })
}})
 

export default authSlice.reducer