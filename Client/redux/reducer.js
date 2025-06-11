import { ACTIVE, ADD_TO_BOOKMARK, CLEAR_SEARCH_LIST, DELETE_BOOKMARK, GET_BOOKMARK, GET_CERTIFICATION, GET_MOVIE_CAST, GET_MOVIE_DETAIL, GET_MOVIES, GET_RECOMMENDED, GET_TRENDING_LIST, GET_TV_CAST, GET_TV_CERT, GET_TV_SERIES, GET_TV_SERIES_DETAIL, GET_USER, LOGIN, LOGIN_ERROR, SEARCH_ALL, SEARCH_BOOKMARK, SEARCH_MOVIE, SEARCH_TV, SIGNUP, SIGNUP_ERROR } from "./actionType"

const INIT_STATE = {
  trending: [],
  certification: [],
  certificationMap: {},
  tv_cert: {},
  recommended: [],
  movies: {},
  tv_series: {},
  bookmark: [],
  added: [],
  movieDetail: {},
  tvDetail: {},
  movie_cast: [],
  tv_cast: [],
  signup: [],
  signup_error: [],
  login: [],
  login_error: [],
  user: [],
  delete_bookmark: [],
  search_movie: {},
  search_tv: {},
  search_all: [],
  search_bkmark: [],
  active: 'Home'
}

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRENDING_LIST: {
      console.log("get_trending_list " + JSON.stringify(action.payload.httpResponse.results))
      return { ...state, trending: action.payload.httpResponse.results }
    }
    case SEARCH_ALL: {
      const filtered = state.trending.filter(e => {
        return e.name ? e.name.toLowerCase().includes(action.payload.toLowerCase()) : e.title && e.title.toLowerCase().includes(action.payload.toLowerCase())
      })
      const filter_recom = state.recommended.filter(e => {
        return e.name ? e.name.toLowerCase().includes(action.payload.toLowerCase()) : e.title && e.title.toLowerCase().includes(action.payload.toLowerCase())
      })
      console.log("filter " + JSON.stringify(filtered) + " " + JSON.stringify(filter_recom))
      const merged = [...new Set([...filtered, ...filter_recom])]
      console.log("merged ", merged)
      return { ...state, search_all: merged }
    }

    case SEARCH_BOOKMARK: {
      const filtered = state.bookmark.filter(e => {
        return e.name ? e.name.toLowerCase().includes(action.payload.toLowerCase()) : e.title && e.title.toLowerCase().includes(action.payload.toLowerCase())
      })

      console.log("filter " + JSON.stringify(filtered))
      return { ...state, search_bkmark: filtered }
    }
    case GET_CERTIFICATION: {
      const id = action.payload.httpResponse.id;
      const auRelease = action.payload.httpResponse.results.find(e => e.iso_3166_1 === 'AU');
      const cert = auRelease?.release_dates?.[0]?.certification || 'N/A';

      return {
        ...state,
        certificationMap: {
          ...state.certificationMap,
          [id]: cert
        }
      };
    }
    case GET_TV_CERT: {
      const id = action.payload.httpResponse.id;
      const auRelease = action.payload.httpResponse.results.find(e => e.iso_3166_1 === 'AU');
      const cert = auRelease?.rating || 'N/A';
      return {
        ...state,
        tv_cert: {
          ...state.tv_cert,
          [id]: cert
        }
      };
    }
    case GET_RECOMMENDED: {
      return { ...state, recommended: action.payload.httpResponse.results }
    }
    case GET_MOVIES: {
      console.log("get_movies " + JSON.stringify(action.payload.httpResponse))
      return { ...state, movies: action.payload.httpResponse }
    }
    case SEARCH_MOVIE: {
      console.log("get_searched_movies " + JSON.stringify(action.payload.httpResponse))
      return { ...state, search_movie: action.payload.httpResponse }
    }
    case SEARCH_TV: {
      console.log("get_searched_tv " + JSON.stringify(action.payload.httpResponse))
      return { ...state, search_tv: action.payload.httpResponse }
    }
    case CLEAR_SEARCH_LIST: {
      console.log("clear ")
      return { ...state, search_tv: {}, search_movie: {}, search_all: [], search_bkmark: [] }
    }
    case ACTIVE: {
      console.log("active " + state.active)
      return { ...state, active: action.payload }
    }
    case GET_TV_SERIES: {
      console.log("get_tvseries " + JSON.stringify(action.payload.httpResponse))
      return { ...state, tv_series: action.payload.httpResponse }
    }
    case GET_BOOKMARK: {
      console.log("get_bookmark " + JSON.stringify(action.payload.httpResponse))
      return { ...state, bookmark: action.payload.httpResponse }
    }
    case ADD_TO_BOOKMARK: {
      console.log("get_bookmark " + JSON.stringify(action.payload.httpResponse))
      return { ...state, added: action.payload.httpResponse }
    }
    case GET_MOVIE_DETAIL: {
      return { ...state, movieDetail: action.payload.httpResponse }
    }
    case GET_TV_SERIES_DETAIL: {
      return { ...state, tvDetail: action.payload.httpResponse }
    }
    case GET_MOVIE_CAST: {
      return { ...state, movie_cast: action.payload.httpResponse.cast }
    }
    case GET_TV_CAST: {
      return { ...state, tv_cast: action.payload.httpResponse.cast }
    }
    case SIGNUP: {
      console.log("signup", action.payload)
      return { ...state, signup: action.payload }
    }
    case SIGNUP_ERROR: {
      console.log("signup error", action.payload)
      return { ...state, signup_error: action.payload }
    }
    case LOGIN: {
      console.log("login", action.payload)
      return { ...state, login: action.payload }
    }
    case LOGIN_ERROR: {
      console.log("login error", action.payload)
      return { ...state, login_error: action.payload }
    }
    case GET_USER: {
      console.log("get_user " + JSON.stringify(action.payload.httpResponse))
      return { ...state, user: action.payload.httpResponse }
    }
    case DELETE_BOOKMARK: {
      console.log("delete " + JSON.stringify(action.payload.httpResponse))
      return { ...state, delete_bookmark: action.payload.httpResponse }
    }
    default:
      return state
  }
}