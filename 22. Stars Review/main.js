const app = document.querySelector("#app")

let count = 0

app.innerHTML = `
    <div class="container">
        <h1>How was your experience?</h1>
        <div class="star-container">
            ${'<span class="star">&#9734;</span>'.repeat(5)}
        </div>
       <p class = "review">${count} of 5<p>
    </div>   
`
const stars = document.querySelectorAll(".star")
const review = document.querySelector(".review")
stars.forEach((star,index) =>{
    star.addEventListener('click',(e)=>{
        for(let j=0; j<index+1;j++){
            stars[j].innerHTML = "&#9733;"
        }
        for(let k = stars.length -1; k>index;k--){
            stars[k].innerHTML ="&#9734;"
        }
        count = index+1
        review.textContent = `${count} of 5`
    })
})