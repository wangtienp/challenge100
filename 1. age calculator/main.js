let targetDate = document.getElementById('target-date');
let birthdayDate = document.getElementById('date-of-birth')
let submitBtn = document.getElementById('submit-btn')
let ageForm = document.getElementById('age-form')
let result = document.getElementById('result')
let error = document.getElementById('error')
let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
let errorText;
let resultYr,resultMth,resultDay
function defaultDate(){
    let today = new Date();
    let dateStr = today.getDate().toString()
    let monthStr = (today.getMonth()+1).toString();
    let year = today.getFullYear();
    let date = dateStr.padStart(2,"0");
    let month = monthStr.padStart(2,"0");
    // targetDate.value = ${month}-${date}-${year}
    targetDate.value = `${year}-${month}-${date}`
}
defaultDate()

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    getAge()
})

function getAge(){
    const date1 = new  Date(birthdayDate.value)
    const date2 = new Date(targetDate.value)
    
    let valid = validate(date1,date2)
    console.log(valid)
    if(!valid){
        error.innerText = errorText;
        return
    } 
        
    else{
        console.log('valid')
        errorText =''
        error.innerText = errorText;
    }

    if(isLeap(date2)){
        daysInMonth[1] = 29
    }else{
        daysInMonth[1] = 28
    }

    calculateAge(date1, date2)
    result.innerHTML = `Result Age: ${resultYr} years and ${resultMth} months and ${resultDay} days`


}

function validate(birth,target){
    let valid = false;    
    if(birth.getTime()>target.getTime()){
        errorText = 'birthday should not be larger'
    }
   
    else if(isNaN(birth.getTime())||isNaN(target.getTime())){
        errorText = 'time is wrong or empty'

    }else{
        valid = true;
    }
    return valid
}

function isLeap(target){
    let targetYear = target.getFullYear();
    let isLeap;
    if(targetYear % 400 == 0){
        isLeap = true;
    }
    else if(targetYear % 100 == 0){
        isLeap = false;
    }
    else if( targetYear % 4 == 0){
        isLeap = true;
    }
    else{
        isLeap = false;
    }
    return isLeap;
}

function calculateAge(birthday,target){
    let birthdayYr = birthday.getFullYear();
    let birthdayMoth = birthday.getMonth() +1;
    let birthdayDate = birthday.getDate();
    let targetYear = target.getFullYear();
    let targetMonth = target.getMonth() +1;
    let targetDate = target.getDate();

    if(targetDate >= birthdayDate){
        resultDay = targetDate - birthdayDate
    }else{
        resultDay = targetDate + daysInMonth[targetMonth - 2] - birthdayDate
        targetMonth--;
    }

    if(targetMonth >= birthdayMoth){
        resultMth = targetMonth - birthdayMoth
    }else{
        resultMth = targetMonth + 12 - birthdayMoth;
        targetYear--;
    }
    resultYr = targetYear - birthdayYr;
}