import path from 'node:path'
import fs from 'fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(dir, req, res) {
    const publicPath = path.join(dir, 'public')
    const filePath = path.join(publicPath,
        req.url === '/' ? 'index.html' : req.url
    )

    // get the extension of all files
    const ext = path.extname(filePath)

    // get the content type of all files
    const contentType = getContentType(ext)
    try {
        // read the content of all files
        const content = await fs.readFile(filePath)

        sendResponse(res, 200, contentType, content)
    } catch (error) {
        if (error.code === 'ENOENT') {
            const notFoundPath = path.join(publicPath, '404.html')
            const content = await fs.readFile(notFoundPath)
            sendResponse(res, 404, 'text/html', content)
        } else {
            sendResponse(res, 500, 'text/html', `<html><h1>Server error : ${error.code}</h1></html>`)
        }
    }
}