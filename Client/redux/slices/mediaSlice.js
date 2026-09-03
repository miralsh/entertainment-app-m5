import { createSlice } from "@reduxjs/toolkit"
import { get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_movies, get_recommended, get_trending_list, get_tv_cast, get_tvseries, get_tvseriesDetail, search_movie, search_tv } from "../thunks/mediaThunks"

const initialState = {
    trending: [],
    certification: [],
    certificationMap: {},
    tv_cert: {},
    recommended: [],
    movies: {},
    tv_series: {},
    movieDetail: {},
    tvDetail: {},
    movie_cast: [],
    tv_cast: [],
    search_movie: {},
    search_tv: {},
    search_all: [],
    requestStatus: { trending: 'idle', recommended: 'idle' },
    requestError: { trending: null, recommended: null }
}

const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {

        searchAll: (state,action) => {
            const filtered = state.trending.filter(e => {
                return e.name ? e.name.toLowerCase().includes(action.payload.toLowerCase()) : e.title && e.title.toLowerCase().includes(action.payload.toLowerCase())
            })
            const filter_recom = state.recommended.filter(e => {
                return e.name ? e.name.toLowerCase().includes(action.payload.toLowerCase()) : e.title && e.title.toLowerCase().includes(action.payload.toLowerCase())
            })
            console.log("filter " + JSON.stringify(filtered) + " " + JSON.stringify(filter_recom))
            const merged = [...new Set([...filtered, ...filter_recom])]
            console.log("merged ", merged)
            state.search_all = merged
        },
        clear_search_list: (state) => {
            state.search_tv = {};
            state.search_movie = {};
            state.search_all = [];
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_trending_list.pending, (state) => {
                state.requestStatus.trending = 'loading'
                state.requestError.trending = null
            })
            .addCase(get_trending_list.fulfilled, (state, action) => {
                state.trending = action.payload.results
                state.requestStatus.trending = 'succeeded'
            })
            .addCase(get_trending_list.rejected, (state, action) => {
                state.requestStatus.trending = 'failed'
                state.requestError.trending = action.payload?.status_message || action.payload?.message || 'Unable to load trending titles.'
            })
            .addCase(get_recommended.pending, (state) => {
                state.requestStatus.recommended = 'loading'
                state.requestError.recommended = null
            })
            .addCase(get_recommended.fulfilled, (state, action) => {
                state.recommended = action.payload.results
                state.requestStatus.recommended = 'succeeded'
            })
            .addCase(get_recommended.rejected, (state, action) => {
                state.requestStatus.recommended = 'failed'
                state.requestError.recommended = action.payload?.status_message || action.payload?.message || 'Unable to load recommendations.'
            })
            .addCase(get_movies.fulfilled, (state, action) => {
                state.movies = action.payload
            })
            .addCase(get_tvseries.fulfilled, (state, action) => {
                state.tv_series = action.payload
            })
            .addCase(get_certification_movie.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const auRelease = action.payload.data.results?.find(e => e.iso_3166_1 === 'AU');
                const cert = auRelease?.release_dates?.[0]?.certification || 'N/A';
                state.certificationMap[id] = cert
            }
            )
            .addCase(get_certification_tv.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const auRelease = action.payload.data.results?.find(e => e.iso_3166_1 === 'AU');
                const cert = auRelease?.rating || 'N/A';
                state.tv_cert[id] = cert
            })
            .addCase(get_movie_cast.fulfilled, (state, action) => {
                state.movie_cast = action.payload.cast
            })
            .addCase(get_tv_cast.fulfilled, (state, action) => {
                state.tv_cast = action.payload.cast
            })
            .addCase(get_movieDetail.fulfilled, (state, action) => {
                state.movieDetail = action.payload
            })
            .addCase(get_tvseriesDetail.fulfilled, (state, action) => {
                state.tvDetail = action.payload
            })
            .addCase(search_tv.fulfilled, (state, action) => {
                state.search_tv = action.payload
            })
            .addCase(search_movie.fulfilled, (state, action) => {
                state.search_movie = action.payload
            })
    }
})


export const { clear_search_list:clearMediaSearchList,searchAll } = mediaSlice.actions;
export default mediaSlice.reducer;
