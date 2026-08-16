export function sendResponse(res, statusCode, contentType, payload,isPdf=false) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', contentType)
    if(isPdf){
        res.setHeader('Content-Disposition', 'attachment; filename="receipt.pdf"')
        payload.pipe(res)
        payload.end()
    }
    else{
        res.end(payload)
    }
}