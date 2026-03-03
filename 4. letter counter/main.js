let input = document.querySelector("#type-input")



input.addEventListener('keyup',(e)=>{
   
    let value = e.target.value
    let count = value.length
    document.querySelector("#count").textContent = count.toString()
    
})