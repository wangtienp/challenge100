import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { filteredDestination } from './utils/filteredDestination.js'
import {getDataByQueryParams} from './utils/getDataByQueryParam.js'
const PORT = 8001

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)
    if (urlObj.pathname === '/api' && req.method === 'GET') {
        let filteredData = getDataByQueryParams(destinations,queryObj)
        sendJSONResponse(res, 200, filteredData)
    }
    else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        const filteredData = filteredDestination(req, 'continent', destinations)

        sendJSONResponse(res, 200, filteredData)
    }
    else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const filteredData = filteredDestination(req, 'country', destinations)

        sendJSONResponse(res, 200, filteredData)
    }
    else {
        sendJSONResponse(res, 404, { error: "not found", message: `The requested route is ${req.url}, does not exist` })
    }
})
server.listen(PORT, () => {
    console.log(`Connected to port: ${PORT}`)
})