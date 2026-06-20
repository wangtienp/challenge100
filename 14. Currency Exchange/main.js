import { code,name } from "./json.js"
import {key, http,baseUrl } from "./http.js"

const from = document.querySelector(".from")
const to = document.querySelector(".to")
const result = document.querySelector(".result")

const cnvertForm = document.querySelector(".convert")
from.innerHTML =
`<input type = "number" value="1">
  <select>
  ${name.map((val,index) =>{
    return `<option value = ${code[index]} ${code[index] == "MYR"?"selected":""}>${val}</option>`
  })}
  </select>  
`

to.innerHTML =
`<input type = "number" readonly>
  <select>
  ${name.map((val,index) =>{
    return `<option value = ${code[index]} ${code[index] == "USD"?"selected":""}>${val}</option>`
  })}
  </select>  
`
const selectFrom = document.querySelector(".from>select")
const selectTo = document.querySelector(".to>select")
const inputFrom = document.querySelector(".from > input")
const inputTo = document.querySelector(".to>input")
selectFrom.addEventListener('change',()=>{
  selectFrom.blur()
})
selectTo.addEventListener('change',()=>{
  selectTo.blur()
})
cnvertForm.addEventListener('submit',async(e)=>{

  e.preventDefault()
  const to = selectTo.value
  const from = selectFrom.value
  const amount = inputFrom.value

  const data = await http()
  result.textContent = `1 ${selectFrom.options[selectFrom.selectedIndex].text} = ${data.result.toFixed(2)} ${selectTo.options[selectTo.selectedIndex].text}`
  const conversion_rate = data.result
  inputTo.value = (amount *conversion_rate).toFixed(2)
})