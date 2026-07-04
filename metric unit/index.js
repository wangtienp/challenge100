/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
const convertBtn = document.querySelector("#convert-btn")
const input = document.querySelector("#input")
const values = document.querySelectorAll(".value")
const units = [3.281, 0.264, 2.204]
const pluralHeads = [["meters", "feet"], ["liters", "gallons"], ["kilos", "pounds"]]
const singularHeads = [["meter", "foot"], ["liter", "gallon"], ["kilo", "pound"]]
input.addEventListener("keydown",(e)=>{
    if(!e.repeat &&e.key == 'Enter'){
        convertBtn.click()
    }
})
convertBtn.addEventListener("click", () => {
    const inputNumber = parseFloat(input.value)
    input.value = Number(inputNumber)
    values.forEach((val, index) => {
        const firstToSec = (inputNumber * units[index]).toFixed(3)
        const secToFirst = (inputNumber * (1 / units[index])).toFixed(3)

        val.textContent = `${inputNumber} ${ isMoreThan1Unit(inputNumber,index,0)} = ${firstToSec} ${isMoreThan1Unit(firstToSec,index,1)} | ${inputNumber} ${isMoreThan1Unit(inputNumber,index,1)} = ${secToFirst} ${isMoreThan1Unit(firstToSec,index,0)} `
    })

})

function isMoreThan1Unit(unit , i,j){
    return unit > 1 ? pluralHeads[i][j] : singularHeads[i][j]
}