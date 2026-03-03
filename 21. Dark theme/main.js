const isDark = localStorage.getItem('dark'||"")
const slider = document.querySelector("#theme-slider")

slider.addEventListener("change",updateTheme)
initializeTheme()
function updateTheme(){
    if(slider.checked){
        localStorage.setItem('dark','active')
        document.body.classList.add("dark-theme")
    }
    else{
        localStorage.setItem('dark',"")
        document.body.classList.remove("dark-theme")
    }
}
function initializeTheme(){
    if(isDark == ""){
        document.body.classList.remove("dark-theme")
        slider.checked = false
    }
    else{
        document.body.classList.add("dark-theme")
        slider.checked = true
    }
}