const showPass = document.querySelector(".fa-eye");
const hidePass = document.querySelector(".fa-eye-slash");
const passwordInput = document.querySelector("#password");
const strengthText = document.querySelector(".strength-text")
const passwordStrength = document.querySelector("#password-strength")
showPass.addEventListener("click", showPassword)
hidePass.addEventListener("click", hidePassword)
passwordInput.addEventListener("input", showPasswordStrength)
const passwordStrengthArr = ["weak", "average", "optimum"]
function showPassword() {
    passwordInput.type = 'text'
    showPass.classList.add("hide")
    hidePass.classList.remove("hide")
}
function hidePassword() {
    passwordInput.type = "password";
    hidePass.classList.add("hide")
    showPass.classList.remove("hide")
}
function showPasswordStrength() {
    if (passwordInput.value.length != 0) {
        passwordStrength.classList.remove("hide")
        updatePassMeter()
        updateStrengthText()
    }
    else {
        passwordStrength.classList.add("hide")
        strengthText.textContent=""
    }
}

function updatePassMeter() {
    passwordStrength.value = passwordInput.value.length;
    
}

function updateStrengthText(){
    switch (true) {
        case (passwordInput.value.length < passwordStrength.low):
            strengthText.textContent = "Weak";
            strengthText.classList.remove(...passwordStrengthArr);
            strengthText.classList.add(passwordStrengthArr[0]);
            break;
        case (passwordInput.value.length < passwordStrength.high):
            strengthText.textContent = "Average";
            strengthText.classList.remove(...passwordStrengthArr);
            strengthText.classList.add(passwordStrengthArr[1]);
            break;
        case (passwordInput.value.length >= passwordStrength.high):
            strengthText.textContent = "Optimum";
            strengthText.classList.remove(...passwordStrengthArr);
            strengthText.classList.add(passwordStrengthArr[2]);
            break;
        default: break;
    }
}