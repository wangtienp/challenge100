import { sendResponse } from "../utils/sendResponse.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";

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

    } catch (error) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: error }))
    }

}