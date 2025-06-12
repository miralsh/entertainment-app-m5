import axios from 'axios'
import { url } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

const tmdbUrl = 'https://api.themoviedb.org/'
// Fetch trending content list from TMDB
export const get_trending_list = createAsyncThunk('media/getTrendingList', async (_, thunkAPI) => {
    try {
        const options = {
            url: url,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        const response = await axios.request(options)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Fetch movie certification data by movie ID
export const get_certification_movie = createAsyncThunk('media/get_certification_movie', async (movie_id, thunkAPI) => {
    try {
        const options = {
            url: `${tmdbUrl}3/movie/${movie_id}/release_dates`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        const response =
            await axios.request(options)
        return { id: movie_id, data: response.data }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Fetch TV certification data by series ID
export const get_certification_tv = createAsyncThunk('media/get_certification_tv', async (series_id, thunkAPI) => {
    try {
        const options = {
            url: `${tmdbUrl}3/tv/${series_id}/content_ratings`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        const res = await axios.request(options)
        return { id: series_id, data: response.data }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Fetch recommended movies for the user from TMDB
export const get_recommended = createAsyncThunk('media/get_recommended', async (_, thunkAPI) => {
    try {
        const options = {
            url: `${tmdbUrl}4/account/678ce223859fb4e6a86df1cb/movie/recommendations?page=1&include_adult=false&language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        const res = await axios.request(options)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }

})
// Fetch list of popular movies with pagination
export const get_movies = createAsyncThunk('media/get_movies', async (page, thunkAPI) => {
    try {
        const options = {
            url: `${tmdbUrl}3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }

})
// Fetch list of popular TV series with pagination
export const get_tvseries = createAsyncThunk('media/get_tvseries', async (page, thunkAPI) => {
    try {
        const options = {
            url: `${tmdbUrl}3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Search movie by name and page
export const search_movie = createAsyncThunk('media/search_movie', async ({ movieName, pg }, thunkAPI) => {
    try {
        const options = {
            url: `${tmdbUrl}3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${pg}`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})

// Search TV series by name and page
export const search_tv = createAsyncThunk('media/search_tv', async ({ tv, pg }, thunkAPI) => {
    try {
        const options = {
            url: `${tmdbUrl}3/search/tv?query=${tv}&include_adult=false&language=en-US&page=${pg}`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})



// Fetch detailed information about a movie
export const get_movieDetail = createAsyncThunk('media/get_movieDetail', async (id,thunkAPI) => {
    try{
        const options = {
        url: `${tmdbUrl}3/movie/${id}?language=en-US`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };
    const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Fetch detailed information about a TV series
export const get_tvseriesDetail = createAsyncThunk('media/get_tvseriesDetail', async (id,thunkAPI) => {
    try{
    const options = {
        url: `${tmdbUrl}3/tv/${id}?language=en-US`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };
    const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Fetch movie cast list by movie ID
export const get_movie_cast  = createAsyncThunk('media/get_movie_cast', async (id,thunkAPI) => {
try{
    const options = {
        url: `${tmdbUrl}3/movie/${id}/credits?language=en-US`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };
     const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})
// Fetch TV series cast list by series ID
export const get_tv_cast  = createAsyncThunk('media/get_tv_cast', async (id) => {
    try{

    const options = {
        url: `${tmdbUrl}3/tv/${id}/credits?language=en-US`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };
    const res = await axios.request(options)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})





