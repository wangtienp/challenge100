const passwordInput = document.querySelector("#password-text")
const lengthText = document.querySelector("#length-text")
const lengthInput = document.querySelector("#length-wheel")
const generateBtn = document.querySelector("#generate")
const resetBtn = document.querySelector("#reset")
const copyNotification = document.querySelector(".copy-notif")
const copyBtn = document.querySelector(".fa-copy")
const checkboxes = document.querySelectorAll(".checkbox input")

// console.log(symbol)
//initialize
let checkboxArr = [true, true, true, true]
let combos = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789", "`~!@#$%^&*()_-+={}[]:;|\"'?/<,>.\\"]
lengthInput.value = 12;
let passwordLength = 12;
let isCopy = false

window.addEventListener("load", initialized)

function initialized() {
    updateCheckbox()
    controlLength()
    copyText()
    reset()
    generateBtn.addEventListener('click', generatePassword)
}



function reset() {
    resetBtn.addEventListener("click", () => {
        passwordInput.value = ""
    })
}
function updateCheckbox() {
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                checkboxArr[index] = true
            }
            else {
                checkboxArr[index] = false
            }
            if (!atLeastOneChecked()) {
                checkboxes[index].checked = true
                checkboxArr[index] = true
            }

        })
    })
}
function generatePassword() {
    let password = []
    while (password.length < passwordLength) {
        let randomCheck = Math.floor(Math.random() * 4)
        if (checkboxArr[randomCheck] == false) continue
        else {
            let comboLength = combos[randomCheck].length
            let randomChar = combos[randomCheck][Math.floor(Math.random() * comboLength)]
            password.push(randomChar)
        }
    }

    if(passwordValid(password)){
        passwordInput.value = password.join("")
    }

}

function passwordValid(passwordArr) {
    let isValid = true;
    let passwordText = passwordArr.join("")
    let regexes = [/[A-Z]/, /[a-z]/, /\d/, /[~!@#$%^&*()_\-+={\[}\]:;|"\\'?\/<,>.]/]
    for (let i = 0; i < checkboxArr.length; i++) {
        if (checkboxArr[i] == false) continue
        else {
            if (regexes[i].test(passwordText) == false) {
                isValid = false
                break
            }
        }
    }
    if (!isValid) 
        {
            // console.log(passwordText)
            generatePassword()
        }
        
    return isValid

}


function atLeastOneChecked() {
    if (checkboxArr.some(item => item == true)) {
        return true;
    } else {
        return false
    }
}
function controlLength() {
    lengthInput.addEventListener("input", (e) => {
        let lengthVal = e.target.value;
        passwordLength = parseInt(lengthVal, 10)
        lengthText.textContent = lengthInput.value
        // console.log(passwordLength)
    })
}
function copyText() {
     copyBtn.addEventListener("click", () => {
        // console.log("halo")
        passwordInput.select()
        document.execCommand("copy")
        // await navigator.clipboard.writeText(passwordInput.value)
        if (isCopy) return
        isCopy = true;
        copyNotification.classList.remove("close")

        setTimeout(() => {
            isCopy = false
            copyNotification.classList.add("close")
        }, 1000)
    })
}