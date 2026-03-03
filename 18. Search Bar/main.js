const searchBtn = document.querySelector(".search-btn")
const removeSearch = document.querySelector(".remove")
const searchInput = document.querySelector("#search-input")
const itemContainer = document.querySelector(".item-container")
const endpoint = "https://dummyjson.com/products"
const searchForm = document.querySelector("#search-form")
const searchQuery = "search?q="
const pageController = document.querySelector(".page-controller")
let skip = 0
let limit = 15
let isSearching = false
const SEARCH = "searching"

const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get('page')) || 1;
let keywordParam = urlParams.get('search') || '';



// remove input value
function removeInput() {
    searchInput.value = ""
    removeSearch.classList.add("hide")
}
// show or hide remove button
function showHideRemove() {
    if (searchInput.value.trim() == "") {
        if (removeSearch.classList.contains("hide")) return
        else {
            removeSearch.classList.add("hide")
        }
    }
    else {
        removeSearch.classList.remove("hide")
    }
}

// fetch data
async function http(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Could not fetch products data")
        }
        const data = await response.json()
        console.log("http")
        displayProducts(data)
        displayPagination(data)
    } catch (error) {
        console.log(error)
    }
}
// searchInput.value = "halo"
// showHideRemove()
// display products
function displayProducts(data) {
    itemContainer.innerHTML = ""
    const products = data.products
    console.log(products)
    for (let index = 0; index < products.length; index++) {
        const item = document.createElement("div")
        item.className = "item"
        item.innerHTML = `<div class="item-ic" title = "${products[index].title}">
        <img src="${products[index].images[0]}" alt = "${products[index].title}" class = "item-img">
        <div class="desc">
            <div class="name">${products[index].title}</div>
                        <div class="price"><span class="currency">RM</span><span class="value">${products[index].price}</span></div>
                        <div class="rating">
                            <div class="stars">
                                <div class="star">
                                    <div class="empty"></div>
                                </div>
                                <div class="star">
                                    <div class="empty"></div>
                                </div>
                                <div class="star">
                                    <div class="empty"></div>
                                </div>
                                <div class="star">
                                    <div class="empty"></div>
                                </div>
                                <div class="star">
                                    <div class="empty"></div>
                                </div>
                            </div>
                            <div class="title">${products[index].rating}</div>
                        </div>
        </div>
       </div>`
        getStarRating(item, products[index].rating)
        itemContainer.append(item)
    }
}

function getStarRating(item, rating) {
    let floorRating = Math.floor(rating);
    let remainderPercent = (rating - floorRating) * 100;
    const stars = item.querySelectorAll(".rating>.stars>.star")
    for (let i = 1; i < rating; i++) {
        stars[i - 1].innerHTML = `<div class="fill"></div>`
    }
    stars[floorRating].innerHTML = `<div class="partial"></div>`
    let partialStar = stars[floorRating].querySelector(".partial")
    partialStar.style.setProperty('--getpartial', `${remainderPercent}%`)
}

function displayPagination(data) {
    console.log("pagination")
    pageController.innerHTML = ""
    const total = data.total
    const maxPageAllowed = 5
    const totalPages = Math.ceil(total / limit)

    let keyword = searchInput.value
    console.log(keyword)
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // 2. Calculate Sliding Window (Start and End of the 5 buttons)
    let startPage = Math.max(1, currentPage - Math.floor(maxPageAllowed / 2));
    let endPage = startPage + maxPageAllowed - 1;

    // Adjust if endPage exceeds totalPages
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageAllowed + 1);
    }


    // 4. prev page
    const prevPage = keyword !== '' ? createSearchPage('&lt;', currentPage - 1, keyword) : createPage('&lt;', currentPage - 1)
    pageController.append(prevPage)
    if (currentPage == 1) {
        prevPage.style.display = 'none'
    }
    else {
        prevPage.style.display = 'flex'
    }


    // 5. insert page
    for (let i = startPage; i <= endPage; i++) {
        let page = keyword !== '' ? createSearchPage(`${i}`, i, keyword, currentPage == i) : createPage(`${i}`, i, currentPage == i)

        pageController.append(page)
    }
    // 6. next page
    const nextPage = keyword !== '' ? createSearchPage('&gt;', currentPage + 1, keyword) : createPage('&gt;', currentPage + 1)

    pageController.append(nextPage)
    if (currentPage == totalPages) {
        nextPage.style.display = 'none'
    }
    else {
        nextPage.style.display = 'flex'
    }
}
// 3. create page function
function createPage(text, p, isCurrent = false) {
    const page = document.createElement('a')
    page.className = 'page'
    page.innerHTML = text;
    page.href = `/?page=${p}`;
    let url = new URL(window.location.href);
    url.search = ""
    if (isCurrent) {
        url.searchParams.set('page', p)
        window.history.pushState({}, '', `${url.toString()}`)

        page.classList.add("active")
        page.setAttribute("aria-current", "page")
        page.onclick = function (event) {
            event.preventDefault()
        }
    } else {
        page.classList.remove("active")
        page.removeAttribute("aria-current")
    }
    return page
}
function createSearchPage(text, p, keyword, isCurrent = false) {
    
    const page = document.createElement('a')
    page.className = 'page'
    page.innerHTML = text;
    page.href = `/?page=${p}&search=${keyword}`;
    let url = new URL(window.location.href);
    url.search = ""
    showHideRemove()
    if (isCurrent) {
        url.searchParams.set('page', p)
        url.searchParams.set('search', keyword)
        window.history.pushState({}, '', `${url.toString()}`)
        page.classList.add("active")
        page.setAttribute("aria-current", "page")
        page.onclick = function (event) {
            event.preventDefault()
        }
    } else {
        page.classList.remove("active")
        page.removeAttribute("aria-current")
    }
    return page
}




// initialized when open the window
window.addEventListener("load", () => {
    console.log("keyword param: " + keywordParam)
    if (keywordParam == '') {
        http(`${endpoint}?skip=${(currentPage - 1) * limit}&limit=${limit}`)
    } else {
        searchInput.value = keywordParam
        http(`${endpoint}/${searchQuery}${keywordParam}&skip=${(currentPage - 1) * limit}&limit=${limit}`)
    }

})

// search part
searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    currentPage = 1

    localStorage.setItem(SEARCH, searchInput.value)
    http(`${endpoint}/${searchQuery}${searchInput.value}&skip=${(currentPage - 1) * limit}&limit=${limit}`)
    showHideRemove()
})
// when input then show hide remove
searchInput.addEventListener("input", showHideRemove)
removeSearch.addEventListener("click", removeInput)


function getSearchInput() {
    let store = localStorage.getItem(SEARCH)
    return store == '' ? null : store
}
