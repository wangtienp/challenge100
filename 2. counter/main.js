let countText = document.querySelector('.default').textContent;
let count = parseInt(countText,10);
let minusBtn = document.querySelector("#minus")
let plusBtn = document.querySelector("#plus")

minusBtn.addEventListener('click',()=>{
    count--;
    document.querySelector('.default').textContent = count.toString()
})
plusBtn.addEventListener('click',()=>{
    count++;
    document.querySelector('.default').textContent = count.toString()
})