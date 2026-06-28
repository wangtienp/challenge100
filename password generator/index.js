const upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const symbol = ["`", "~", "@", "!", "$", "%", "^", "&", "*", "(", ")", "-", "_", "{", "}", "[", "]", ",", ":", "<", ">", "|", ":", ".", "?", "/",]
const passwordArr = [lower, upper, number, symbol]
const generatePassBtn = document.querySelector(".generate-pass")
const lengthWheel = document.querySelector(".length-wheel")
const lengthText = document.querySelector(".len")
const passwordToggles = document.querySelectorAll(".password-toggle > input")
const passwordInputs = document.querySelectorAll(".password-input")
const copyBtns = document.querySelectorAll(".copy")
const copyBox = document.querySelector(".copy-text")


// stretch goal
// 1. length define
// 2. to skip certain 
// 3. copy and click
lengthWheel.addEventListener("change", (e) => {
    lengthWheel.setAttribute('value', e.target.value)
    lengthText.textContent = e.target.value
})
generatePassBtn.addEventListener("click", () => {
    let passwords = ["", ""]
    for (let i = 0; i < passwords.length; i++) {
        copyBtns[i].disabled = false
        while (passwords[i].length < parseInt(lengthWheel.value, 10)) {
            let toggleIndex = Math.floor(Math.random() * passwordToggles.length)
            // to make sure the toggle whether is checked
            if (passwordToggles[toggleIndex].checked) {
                let passwordSelectIndex = Math.floor(Math.random() * passwordArr[toggleIndex].length)
                passwords[i] += passwordArr[toggleIndex][passwordSelectIndex]
            }
            passwordInputs[i].value = passwords[i]
        }
    }

})
copyBtns.forEach((copyBtn,index)=>{
    copyBtn.addEventListener("click",()=>{
        let text = passwordInputs[index].value
        navigator.clipboard.writeText(text).then(()=>{copyBox.classList.add('active')})
        setTimeout(()=>{copyBox.classList.remove('active')},500)
    })
})
