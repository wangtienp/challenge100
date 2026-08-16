import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet, handlePost, handleNews } from './handler/routeHandler.js'
import { sendResponse } from './utils/sendResponse.js'

const PORT = 8000

const __dirname = import.meta.dirname
const server = http.createServer(async (req, res) => {

    if (req.url === "/api") {
        if (req.method === 'GET') {
            await handleGet(res)
        }
        else if (req.method === "POST") {
            await handlePost(req, res)
        }
        else {
            sendResponse(res,405,'text/html','<html><h1>Method Not Allowed</h1></html>')
        }
    }
    else if (req.url === "/api/news") {
        await handleNews(res)
    }
    else if (!req.url.startsWith("/api")) {
        await serveStatic(__dirname, req, res)
    }
    else {

        sendResponse(res,400,'text/html','<html><h1>Bad Request</h1></html>')
    }
})
server.listen(PORT, () => {
    console.log(`connected to Port: ${PORT}`)
})