const form = document.querySelector(".sight-form")
console.log(form)
const title = document.querySelector("#title")
const timestamp = document.querySelector("#date-time")
const text = document.querySelector("#details")
const location = document.querySelector("#location")

let submitting = false
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateInput(title, timestamp, location, text)||submitting) return
    else{
        submitting = true
        submitButtonCursor()
        await postForm()
    }
})

function validateInput(...inputs) {
    let index
    let validInput= inputs.every((input,i)=>{
        index = i
        return input.value.trim() !== ""
    })

    if (!validInput) {
        sendFormValidateMessage(index)
    }
    return validInput
}

function sendFormValidateMessage(index) {
    let input = ""
    switch (index) {
        case 0:
            input = "Title"
            break
        case 1:
            input = "Timestamp"
            break
        case 2:
            input = "Location"
            break
        case 3:
            input = "Details"
            break
        default:
            break
    }
    sendMessage(`${input} field cannot be empty!`, "red")
}
function sendMessage(messageText,background){
    const message = document.querySelector(".message")
    message.textContent = messageText
    message.style.background = background
    if(message.classList.contains("inactive")){
        message.className = "message"
    }
    setTimeout(()=>{
        message.classList.add("inactive")
        submitting = false
        submitButtonCursor()
    },2000)  
}

function submitButtonCursor(){
    const submitButton = document.querySelector("button[type = 'submit']")
    if(submitting){
        submitButton.style.cursor = "not-allowed"
    }else{
        submitButton.style.cursor = "pointer"
    }
}
function resetForm(...inputs){
    inputs.forEach(input=>input.value="")
}
async function postForm(){
    const date = new Date(timestamp.value)

    const options ={
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        hour12:false
    }
    const readableDate = date.toLocaleDateString('en-GB',options)

    const formData ={
        title:title.value,
        timestamp:readableDate,
        location:location.value,
        text:text.value
    }
    console.log(formData)
    try{
        const response = await fetch("/api",{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(formData)
        })
        if(response.ok){
            resetForm(title,timestamp,location,text)
            sendMessage("Your sighting uploads successfully","green")
        }
        else{
            console.log(response.statusText)
            sendMessage("There is some issues - wait for fixed","red")
        }
    }catch(err){
        console.log(err)
    }
}