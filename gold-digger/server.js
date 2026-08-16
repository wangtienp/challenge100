import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet, handleLivePrice, handlePost} from './handler/handler.js'
const PORT = 8000

const __dir = import.meta.dirname
const server = http.createServer(async (req, res) => {
    if(req.url ==="/api"){
        if(req.method === "GET"){
            await handleGet(res)
        }
        else if(req.method === "POST"){
            await handlePost(req,res)
        }
    }
    else if(req.url === "/api/gold-price"){
        await handleLivePrice(res)
    }
    else if (!req.url.startsWith('/api')) {
        await serveStatic(__dir, req, res)
    }
})
server.listen(PORT, () => {
    console.log("Connected to Port 8000")
})
