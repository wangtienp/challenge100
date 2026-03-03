
const fill = document.querySelector(".fill")
window.addEventListener('scroll',()=>{
    let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let widthPercent = scrollY/scrollableHeight *100
    fill.style.width = `${widthPercent.toFixed(2)}%`
})