import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet } from './handler/routeHandler.js'

const PORT = 8000

const __dirname = import.meta.dirname
const server = http.createServer(async (req,res)=>{
    if(req.url.startsWith("/api")){
        if(req.method === 'GET'){
            await handleGet(res)
        }
    }
    else if(!req.url.startsWith("/api")){
        await serveStatic(__dirname, req,res)
    }
})
server.listen(PORT,()=>{
    console.log(`connected to Port: ${PORT}`)
})