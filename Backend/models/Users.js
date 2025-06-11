const mongoose = require('mongoose')
// user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const Users = mongoose.model("User", userSchema)
module.exports = Users;