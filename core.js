import connectBd from "./bd.js"
import createServer from "./server.js"

export function Core(){
   const bd = connectBd()
   const server = createServer()

   async function start(){

        console.log('[core]começou')
        await bd.start()
        await server.start()
        return true
    }

    function stop(){
        console.log('[core]acabou')
        //bd.stop()
    }

    return {
        start,
        stop
    }
}

//export default createCore