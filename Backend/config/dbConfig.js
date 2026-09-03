const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        if (!process.env.MONGODBURL) {
            throw new Error('MONGODBURL is not configured')
        }

        await mongoose.connect(process.env.MONGODBURL)
        console.log("database connection successful")
    } catch (err) {
        console.error("database connection error: " + err.message)
    }
}
module.exports = dbConnection;
