import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://entertainment-app-m5.onrender.com'

// Fetch current authenticated user details
export const get_user  = createAsyncThunk('auth/get_user', async (_,thunkAPI) => {
    try{
    const options = {
        url: `${baseUrl}/users/user`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
        }
    };
   const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Signup new user using local backend API
export const signup = createAsyncThunk('auth/signup', async(value,thunkAPI) => {
    try{
    const res = await axios.post(`${baseUrl}/users/signup`, value)
    return {httpResponse:res.data,statusCode:res.status}
            
        }catch(err) {
                if (err.response) {
                    // Server responded with an error status
                  return thunkAPI.rejectWithValue( {
                            message: err.response.data.error,
                            statusCode: err.response.status,
                        })
                  
                } 
                    return thunkAPI.rejectWithValue({message: err.message});
                }
            
    
})
// Login user using local backend API
export const login  = createAsyncThunk('auth/login', async(value,thunkAPI) => {
    try{
     const res = await axios.post(`${baseUrl}/users/login`, value)
            return {httpResponse:res.data,statusCode:res.status}
            
        }catch(err) {
          
                if (err.response) {
                   
                    // Server responded with an error status
                     return thunkAPI.rejectWithValue( {
                            message: err.response.data.error,
                            statusCode: err.response.status,
                        })
                } 
                    // Other errors (network issue, timeout, etc.)
                     return thunkAPI.rejectWithValue({message: err.message});
                }
            });
