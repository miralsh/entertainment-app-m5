    import axios from 'axios'
    import { ACTIVE, ADD_TO_BOOKMARK, CLEAR_SEARCH_LIST, DELETE_BOOKMARK, GET_BOOKMARK, GET_CERTIFICATION, GET_MOVIE_CAST, GET_MOVIE_DETAIL, GET_MOVIES, GET_RECOMMENDED, GET_TRENDING_LIST, GET_TV_CAST, GET_TV_CERT, GET_TV_SERIES, GET_TV_SERIES_DETAIL, GET_USER, LOGIN, LOGIN_ERROR, SEARCH_ALL, SEARCH_BOOKMARK, SEARCH_MOVIE, SEARCH_TV, SIGNUP, SIGNUP_ERROR } from './actionType'
    import { url } from '../constants';

    const baseUrl='https://entertainment-app-m5.onrender.com'
    const tmdbUrl='https://api.themoviedb.org/'
    // Fetch trending content list from TMDB
    export const get_trending_list = () => {
        const options = {
            url: url,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:  `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_TRENDING_LIST,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch movie certification data by movie ID
    export const get_certification_movie = (movie_id) => {
        const options = {
            url: `${tmdbUrl}3/movie/${movie_id}/release_dates`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_CERTIFICATION,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch TV certification data by series ID
    export const get_certification_tv = (series_id) => {
    const options = {
            url: `${tmdbUrl}3/tv/${series_id}/content_ratings`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_TV_CERT,
                                payload: {
                                    id: series_id,
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch recommended movies for the user from TMDB
    export const get_recommended = () => {
        const options = {
            url: `${tmdbUrl}4/account/678ce223859fb4e6a86df1cb/movie/recommendations?page=1&include_adult=false&language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_RECOMMENDED,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch list of popular movies with pagination
    export const get_movies = (page) => {
        const options = {
            url: `${tmdbUrl}3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_MOVIES,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch list of popular TV series with pagination
    export const get_tvseries = (page) => {
    const options = {
            url: `${tmdbUrl}3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_TV_SERIES,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Search movie by name and page
    export const search_movie = (movieName, pg) => {
    const options = {
            url: `${tmdbUrl}3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${pg}`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: SEARCH_MOVIE,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Clear search results from state
    export const clear_search_list = () => {
        return { type: CLEAR_SEARCH_LIST }
    }
    // Search TV series by name and page
    export const search_tv = (tv, pg) => {

        const options = {
            url: `${tmdbUrl}3/search/tv?query=${tv}&include_adult=false&language=en-US&page=${pg}`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: SEARCH_TV,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Add a movie or TV series to user's bookmark
    export const add_to_bookmark = (value) => {
        return (dispatch) => {
            axios.post(`${baseUrl}/bookmark`, value, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
                }
            })
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: ADD_TO_BOOKMARK,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Get all bookmarks of a user
    export const get_bookmark = (val) => {
        // get bookmark with user id as input
        const options = {
            url: `${baseUrl}/bookmark/${val}`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_BOOKMARK,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Delete a specific bookmark by its ID and user ID
    export const delete_bookmark = (id, user_id) => {
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
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: DELETE_BOOKMARK,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch current authenticated user details
    export const get_user = () => {
    const options = {
            url: `${baseUrl}/users/user`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_USER,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch detailed information about a movie
    export const get_movieDetail = (id) => {

        const options = {
            url: `${tmdbUrl}3/movie/${id}?language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_MOVIE_DETAIL,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch detailed information about a TV series
    export const get_tvseriesDetail = (id) => {

        const options = {
            url: `${tmdbUrl}3/tv/${id}?language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_TV_SERIES_DETAIL,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch movie cast list by movie ID
    export const get_movie_cast = (id) => {

        const options = {
            url: `${tmdbUrl}3/movie/${id}/credits?language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_MOVIE_CAST,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Fetch TV series cast list by series ID
    export const get_tv_cast = (id) => {

        const options = {
            url: `${tmdbUrl}3/tv/${id}/credits?language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };
        return (dispatch) => {
            axios.request(options)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: GET_TV_CAST,
                                payload: {
                                    httpResponse: data
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    // Signup new user using local backend API
    export const signup = (value) => {
        return (dispatch) => {
            axios.post(`${baseUrl}/users/signup`, value)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: SIGNUP,
                                payload: {
                                    httpResponse: data,
                                    statusCode: res.status
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    if (err.response) {
                        // Server responded with an error status
                        dispatch({
                            type: SIGNUP_ERROR,
                            payload: {
                                message: err.response.data.error,
                                statusCode: err.response.status,
                            },
                        });
                    } else {
                        // Other errors (network issue, timeout, etc.)
                        console.error("Unexpected error:", err.message);
                    }
                });
        }
    }
    // Login user using local backend API
    export const login = (value) => {
        return (dispatch) => {
            axios.post(`${baseUrl}/users/login`, value)
                .then((res) => {
                    dispatch(
                        ((data) => {
                            return {
                                type: LOGIN,
                                payload: {
                                    httpResponse: data,
                                    statusCode: res.status
                                }
                            }
                        })(res.data)
                    )

                }).catch((err) => {
                    if (err.response) {
                        // Server responded with an error status
                        dispatch({
                            type: LOGIN_ERROR,
                            payload: {
                                message: err.response.data.error,
                                statusCode: err.response.status,
                            },
                        });
                    } else {
                        // Other errors (network issue, timeout, etc.)
                        console.error("Unexpected error:", err.message);
                    }
                });
        }
    }
    // Store searched data for both movies and TV in global state
    export const searchAll = (value) => {
        return {
            type: SEARCH_ALL,
            payload: value
        }
    }

    // Filter bookmarks based on search input
    export const searchBookmark = (value) => {
        return {
            type: SEARCH_BOOKMARK,
            payload: value
        }
    }

    // Set active tab/view in UI 
    export const setActive = (value) => {
        return {
            type: ACTIVE,
            payload: value
        }
    }