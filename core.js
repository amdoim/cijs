import connectBd from "./bd.js"
import createServer from "./server.js"

   const bd = connectBd()
   const server = createServer()



export function Core(){

   async function start(){

        console.log('[core]started')
        await bd.start()
        await server.start()
        return true
    }

    function stop(){
        console.log('[core]done')
        //bd.stop()
    }

    return {
        start,
        stop
    }
}

//export default createCore