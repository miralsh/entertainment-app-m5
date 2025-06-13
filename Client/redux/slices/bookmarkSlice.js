
import { createSlice } from "@reduxjs/toolkit"
import { add_to_bookmark, delete_bookmark, get_bookmark } from "../thunks/bookmarkThunks"

const initialState = {
    bookmark: [],
    added: [],
    delete_bookmark: [],
    search_movie: {},
    search_bkmark: []
}

const bookmarkSlice = createSlice({
    name: 'bookmark', initialState, reducers: {
        searchBookmark: (state,action) => {
            const filtered = state.bookmark.filter(e => {
                return e.name ? e.name.toLowerCase().includes(action.payload.toLowerCase()) : e.title && e.title.toLowerCase().includes(action.payload.toLowerCase())
            })
            state.search_bkmark = filtered
        },
        clear_search_list: (state) => {
            state.search_bkmark = [];
            
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(get_bookmark.fulfilled, (state, action) => {
                    state.bookmark = action.payload
                })
                .addCase(add_to_bookmark.fulfilled, (state, action) => {
                    state.added = action.payload
                })
                .addCase(delete_bookmark.fulfilled, (state, action) => {
                    state.delete_bookmark = action.payload
                })
        }
})

       export const {searchBookmark,clear_search_list:clearBkmarkSearchList}=bookmarkSlice.actions
       export default bookmarkSlice.reducer