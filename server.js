import express from "express"
import bodyParser from "body-parser"
import rotas from "./app/routes/app.routes.js"


function createServer(){

    async function start(){
        
        const app = express()
        app.set('views', './app/views')
        app.set('view engine', 'pug')
        app.use(express.static('./public'))

        app.use(bodyParser.urlencoded({ extended: true }))

        app.use(bodyParser.json())
        /*
        app.get("/", (req, res) => {
        res.json({ message: "Server is running :D" })
        })*/

        app.use(rotas)

        let PORT = 5000

        //const rotas = require("./app/routes/app.routes.js")

        //app.use(rotas)

        app.listen(PORT, () => {
        console.log(`[server]Server is listening on port ${PORT}`)
        })
    }

    function stop(){
        console.log('[server] proccess stoped')
    }

    return{
        start,
        stop
    }
    
}


export default createServer