const targets = document.querySelectorAll(".item")
const dropZones = document.querySelectorAll(".item-box")

targets.forEach((target) => {
    target.addEventListener("dragstart", (e) => {
        target.classList.add("dragging")
        console.log(e)
    })
    target.addEventListener("dragend", (e) => {
        console.log('dragend', e)
        target.classList.remove("dragging")
    })

})
dropZones.forEach((dropZone) => {
    addZIndex(dropZone)
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault()

    })
    dropZone.addEventListener("dragenter", () => {
        dropZone.classList.add("dragover")
    })
    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover")
    })
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault()
        console.log('drop', e)
        dropZone.classList.remove("dragover")
        const target = document.querySelector(".dragging")
        dropZone.append(target)
        addZIndex(dropZone)
    })
})

function addZIndex(dropZone) {
    let children = dropZone.querySelectorAll(".item");
    if (children.length = 0) return
    else if (children.length < 2) {
        children.forEach(child => {
            child.style.zIndex = 'auto'
        })
    }
    else {
        children.forEach((child, index) => {
            child.style.zIndex = index
        })
    }
}



