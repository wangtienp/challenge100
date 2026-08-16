import { sendResponse } from "../utils/sendResponse.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvent.js";
import { newsData } from "../data/newsData.js";

export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 200, 'application/json', content)
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        const sanitizeBody = sanitizeInput(parsedBody)
        await addNewSighting(sanitizeBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(sanitizeBody))
        sightingEvents.emit('sighting-added', sanitizeBody)

    } catch (error) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: error }))
    }

}

export async function handleNews(res) {

    res.statusCode = 200
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    // initialize
    writeData(res)
    setInterval(() => {
       writeData(res)
    }, 2000)
}

function writeData(res) {
    let randomIndex = Math.floor(Math.random() * newsData.length)
    res.write(`data:${JSON.stringify({ event: 'news-update', story: newsData[randomIndex] })}\n\n`)
}