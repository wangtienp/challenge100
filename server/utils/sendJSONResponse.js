export function sendJSONResponse(res, statusCode,payload) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origi', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}