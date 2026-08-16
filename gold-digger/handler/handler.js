import fs from 'node:fs/promises'
import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewTransaction } from '../utils/addNewTransaction.js'
import pdfDocument from 'pdfkit'

export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 200, "application/json", content)
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        await addNewTransaction(parsedBody)
        const doc = createReceipt(parsedBody)
        sendResponse(res,201,"application/pdf",doc,true)
        // sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
    } catch (err) {
        console.log("wrong")
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
    }
}
export async function handleLivePrice(res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    writeData(res)
    setInterval(() => {
        writeData(res)
    }, 2000)
}

function getRandom() {
    let randomRange = Math.random()
    return randomRange > 0.75 ? randomRange : getRandom()
}
function writeData(res) {
    let goldPrice = parseFloat(Math.max(9500, Math.min(getRandom() * 11000, 10700)).toFixed(2))
    res.write(`data:${JSON.stringify({ event: 'price-update', price: goldPrice })}\n\n`)
}

function createReceipt(gramsBody) {
    const doc = new pdfDocument()
    const amount = `Amount Invested: ₹${gramsBody["amount"]}`
    const price = `Gold price purchased: ₹${gramsBody["price_per_gram"]}`
    const gramBought = `Gold purchased: ${gramsBody["grams_bought"]} grams`
    const option = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        second:"2-digit",
        hour12: true
    }
    const date = new Date()
    const dateText = `Date: ${date.toLocaleString('us', option)}`

    // pdf context
    doc.fontSize(18)
    doc.text("Gold Digger Receipt", {
        align: "center"
    })

    doc.moveDown(4)
    doc.fontSize(12)
    doc.text(dateText)
    doc.moveDown(0.5) // Small spacing between lines
    doc.text("-------------------------------------------------")
    doc.text(amount)
    doc.moveDown(0.5)
    doc.text(price)
    doc.moveDown(0.5)
    doc.text(gramBought)
    doc.text("-------------------------------------------------")
    doc.moveDown(2)
    doc.text("Thank you for investing with Gold Digger.", {
        align: "center"
    })
    return doc
}