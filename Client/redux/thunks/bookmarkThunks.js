import axios from 'axios'


import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://entertainment-app-m5.onrender.com'


// Get all bookmarks of a user
export const get_bookmark = createAsyncThunk('media/get_bookmark', async (val,thunkAPI) => {
    try{
    // get bookmark with user id as input
    const options = {
        url: `${baseUrl}/bookmark/${val}`,
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
// Delete a specific bookmark by its ID and user ID
export const delete_bookmark = createAsyncThunk('media/delete_bookmark', async ({id, user_id},thunkAPI) => {
    try{
    // delete bookmark with id and user id as input
    console.log(id, user_id)
    const options = {
        url: `${baseUrl}/bookmark/${id}?user_id=${user_id}`,
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
        }
    };
    const res = await axios.request(options)
    console.log("delete_bkmark "+JSON.stringify(res.data))
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Add a movie or TV series to user's bookmark
export const add_to_bookmark = createAsyncThunk('media/add_to_bookmark', async (value, thunkAPI) => {
    try {

        const res = await axios.post(`${baseUrl}/bookmark`, value, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        })
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }

})
