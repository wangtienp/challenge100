import { getStockData } from "./fakeStockAPI.js";

const shareName = document.querySelector(".share-name")
const shareSymbol = document.querySelector(".share-symbol")
const priceText = document.querySelector(".price")
const arrow = document.querySelector(".arrow")
const timeText = document.querySelector(".time")

setInterval(()=>{
    const stockData =getStockData()
    renderStock(stockData)
},1500)
let prevPrice = +priceText.textContent
function renderStock(stockData){
    let {name , sym, price, time} = stockData
    shareName.textContent = `Name: ${name}`
    shareSymbol.textContent = `Symbol: ${sym}`
    priceText.textContent = price
    timeText.textContent = `Time: ${time}`
    
    pointArrow(prevPrice,price)
    prevPrice = price
}

function pointArrow(prevPrice,price){
    arrow.className =`arrow ${prevPrice>price? 'fall': prevPrice < price ? 'rise' : 'draw'}`
}