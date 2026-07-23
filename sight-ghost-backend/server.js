import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req,res)=>{

    await serveStatic(__dirname, req,res)
    
})
server.listen(PORT,()=>{
    console.log(`connected to Port: ${PORT}`)
})