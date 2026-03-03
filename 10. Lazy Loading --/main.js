const backgroundImg = document.querySelector(".background");
const loadingText = document.querySelector(".loading-text");
let percent = 0

let intervalId = setInterval(blurring,30)

function blurring(){
    
    percent++
    if(percent >99){
        clearInterval(intervalId)
    }
    backgroundImg.style.filter = `blur(${scaleBetween(percent , 30,0, 0,100)}px)`
    loadingText.style.opacity = scaleBetween(percent,1,0,0,100)
    loadingText.textContent = `${percent}%`
}

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}