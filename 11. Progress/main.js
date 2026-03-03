const progresses = document.querySelectorAll(".progress")
const buttons = document.querySelectorAll(".buttons > button")
const bar = document.querySelector(".bar")
let selectedIndex = 1;


buttons.forEach(button => {
    button.addEventListener("click", () => {
        let dir = button.id == "next" ? 1 : -1
        selectedIndex += dir;
        updateProgress()
        barProgress()
        updateButton()
    })
})

function updateButton() {

    buttons[0].disabled = selectedIndex > 1 ? false : true;
    buttons[1].disabled = selectedIndex == progresses.length ? true : false;

}

function updateProgress() {

    progresses.forEach((progress, index) => {
        if (selectedIndex > index) {
            progress.classList.add("selected")
        } else {
            progress.classList.remove("selected")
        }
    })
}
function barProgress() {
    bar.style.width = `${(selectedIndex - 1) / (progresses.length - 1) * 100}%`
    
}