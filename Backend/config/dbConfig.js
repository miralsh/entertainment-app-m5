const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        // connect to the mongo db via the mongo db url
        const connect = mongoose.connect(process.env.MONGODBURL)
        const database = mongoose.connection;

        // on error
        database.on("err", () => {
            console.log("database connection error")
        })

        // connection successful
        database.once("connected", () => {
            console.log("database connection successful")
        })
    } catch (err) {
        //error
        console.log("not connected " + err.message)

    }
}
module.exports = dbConnection;