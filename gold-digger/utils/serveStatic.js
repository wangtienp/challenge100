import path from "node:path";
import { getContentType } from "./getContentType.js";
import { sendResponse } from "./sendResponse.js";
import fs from 'node:fs/promises'

export async function serveStatic(dirname, req, res) {
    const publicPath = path.join(dirname, 'public')
    const filePath = path.join(publicPath, req.url === "/" ? "index.html" : req.url)

    const ext = path.extname(filePath)

    const contentType = getContentType(ext)

    try {
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, content)
    } catch (err) {
        if (err.code === 'ENOENT') {
            const notFoundPath = path.join(publicPath, '404.html')
            const notFoundContent = await fs.readFile(notFoundPath)
            sendResponse(res, 404, contentType, notFoundContent)
        } else {
            sendResponse(res, 500, 'text/html', `<html><h1>Server error : ${error.code}</h1></html>`)
        }
    }
}