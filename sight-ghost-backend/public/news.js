const eventSource = new EventSource("/api/news")
const newsTextbox = document.querySelector(".news-textbox")

eventSource.onmessage=(event)=>{
    const data = JSON.parse(event.data)
    const story = data.story
    newsTextbox.textContent = story
}
eventSource.onerror=()=>{
    console.log("Cannot get the news")
}