const form = document.querySelector("form")
const textInput =  document.querySelector("#text-input")
textInput.addEventListener("keyup",(e)=>{
    textInput.setAttribute('value',e.target.value)
})
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const voices = speechSynthesis.getVoices()
    const utterThis = new SpeechSynthesisUtterance(textInput.value)
    if(voices.length!=0){
        utterThis.voice =voices[0]
        speechSynthesis.speak(utterThis)
    }

})