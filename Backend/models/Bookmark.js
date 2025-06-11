const mongoose = require('mongoose')

// bookmark schema
const bookmarkSchema = new mongoose.Schema({
    backdrop_path: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    original_title: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    original_name: {
        type: String,
        required: false
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    media_type: {
        type: String,
        required: true
    },
    adult: {
        type: Boolean,
        required: true
    },
    original_language: {
        type: String,
        required: true
    },
    genre_ids: {
        type: Array,
        required: true
    },
    popularity: {
        type: mongoose.Decimal128,
        required: true

    },
    release_date: {
        type: String,
        required: false
    },
    first_air_date: {
        type: String,
        required: false
    },
    video: {
        type: Boolean,
        required: false
    },
    vote_average: {
        type:  mongoose.Decimal128,
        required: true
    },
    vote_count: {
        type: Number,
        required: true
    },
    origin_country: {
        type: Array,
        required: false
    },
    user_id:{
        type:String,
        required:true
    }
})

const Bookmark=mongoose.model("bookmark",bookmarkSchema)
module.exports=Bookmark;