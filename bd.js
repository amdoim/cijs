//const mongoose = require("mongoose");
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.URL_MONGO
mongoose.Promise = global.Promise

function connectBd (){

    async function start(){
        console.log('[bd] started proccess to connect in bd')
        await mongoose
            .connect(MONGO_URL, {
                useNewUrlParser: true,
            })
            .then(() => {
                console.log("[bd]Successfully connected to the database")
            })
            .catch((err) => {
                console.log("[bd]Could not connect to the database. Error...", err)
                process.exit()
            });
    }

    function stop(){
        console.log('[bd]stopped proccess')
        process.exit()
    }

    return {
        start,
        stop
    }
}

export default connectBd