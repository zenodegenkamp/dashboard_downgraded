let toDoObject = {
    work: [],
    selfImprovement: [],
    social: [],
    financial: [],
    sport: []
}

localStorage.setItem('todo', JSON.stringify(toDoObject))

// Uses the unsplash API to retreive a new background image every 10seconds 
function getBackground() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        .then(res => res.json())
        .then(data => {

            document.body.style.backgroundImage = `url(${data.urls.regular})`

        })
        .catch(err => {
            // Use a default background image/author
            document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
        })
}

getBackground()
setInterval(getBackground, 10000)

// Retreives the price of Bitcoin And Ethereum
function getCrypto(coin) {
    fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
        .then(res => {
            if (!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => {

            let color = ''
            if (data.market_data.price_change_percentage_24h > 0) {
                color = 'green'
            }
            else {
                color = 'red'
            }

            document.getElementById(coin).innerHTML = `
            <img id='coin-img' src=${data.image.small} />
            <span class='coin-name' >${data.name}</span>
            <h3 id='crypto-price'> ${data.market_data.current_price.eur} <span id='price-percent' class='${color}'>(${Math.round(data.market_data.price_change_percentage_24h)}%)</span></h3>
        `
            document.getElementById("crypto")
        })
        .catch(err => console.error(err))



}
getCrypto("bitcoin")
getCrypto("ethereum")

// Updates the information every 10s
setInterval(function () {
    getCrypto("bitcoin")
}, 100000)
setInterval(function () {
    getCrypto("ethereum")
}, 100000)


// Get the current weather for the specific location of the user
function getLocation(position) {

    const lat = position.coords.latitude
    const lon = position.coords.longitude

    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Something wen't wrong")
            }
            return res.json()
        })
        .then(data => {

            let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

            const temp = Math.round(data.main.temp)

            document.getElementById("weather").innerHTML = `
            <div id='weather-top'>   
                <img id='weather-icon' src='${iconUrl}'/>
                <h1 id='weather-degree'>${Math.round(data.main.temp)} ℃</h1>
            </div>
            <div id='weather-bot'>
                <p id='weather-title'>${data.name}</p>
            </div>
            `
        }
        )
}

function errorGetLocation() {
    console.log("An error has occured")
}

navigator.geolocation.getCurrentPosition(getLocation, errorGetLocation)

// Retreives the current time 
function getTime() {
    const today = new Date()

    const dayMonth = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()

    let hours = ''
    let minutes = ''

    if (today.getHours() < 10) {
        hours = '0' + today.getHours()
    }
    else {
        hours = today.getHours()
    }

    if (today.getMinutes() < 10) {
        minutes = '0' + today.getMinutes()
    }
    else {
        minutes = today.getMinutes()
    }

    const time = hours + ':' + minutes


    document.getElementById('time').innerHTML = `
    <h1 id='time-hourminute'>${time}</h1> 
    <h5 id='date'>${dayMonth}</h5>
    `
}

// Get time every 1s
setInterval(getTime, 1000)

// document.addEventListener("click", getNews)

// // Uses the news API to retreive artricles and shows 9 based on random selection
// function getNews(e) {

//     if (e.target.dataset.news === "open") {

//         fetch('https://newsapi.org/v2/top-headlines?country=nl&apiKey=dc69189542d2438386df559f2ebdc03f')
//             .then(res => {
//                 if (!res.ok) {
//                     throw Error("Something went wrong")
//                 }
//                 return res.json()
//             })
//             .then(data => {

//                 const newsArray = data.articles
//                 const updatedNewsArray = []

//                 newsArray.map(function (article) {
//                     if (article.urlToImage != null && article.description != null) {
//                         updatedNewsArray.push(article)
//                     }
//                 })

//                 // Generate random numbers 
//                 let randomCountArray = []
//                 for (let j = 0; randomCountArray.length < 8; j++) {

//                     let randomNumber = (Math.floor(Math.random() * (updatedNewsArray.length - 1)))
//                     if (!randomCountArray.includes(randomNumber)) {
//                         randomCountArray.push(randomNumber)
//                     }

//                 }

//                 let newsHtml = `
//             <div class='news-article' id='news-btn-close' style="background-color: grey">
//             <i id="news-icon" class="fa-solid fa-chevron-left style="color: #f5f5f5;" data-news='close'></i>
//                 </div>
//             </div>
//             `

//                 for (let i = 0; i < 8; i++) {

//                     let randomIndex = randomCountArray[i]

//                     newsHtml += `
//                 <div class='news-article' style='background-image: linear-gradient(
//                     rgba(0, 0, 0, 0.5),
//                     rgba(0, 0, 0, 0.5)
//                   ), url("${updatedNewsArray[randomIndex].urlToImage}");'>
//                     <div id='middle-article'> 
//                         <h1 class='news-title'>${updatedNewsArray[randomIndex].title}</h1>
//                         <hr>
//                         <p class='news-description'>${updatedNewsArray[randomIndex].description}</p>
//                         <a class='news-link' href=${updatedNewsArray[randomIndex].url} target=”_blank”>Lees meer...</a>
//                     </div>
//                 </div>
                
//                 `
//                 }

//                 document.getElementById('news').innerHTML = newsHtml

//             })
//             .catch((err => console.error(err)))
//     }

//     else if (e.target.dataset.news === "close") {

//         let newsHtml = `
//             <div class='news-article' id='news-btn'>
//             <i id="news-icon" class="fa-solid fa-newspaper" style="color: #f5f5f5;" data-news='open'></i>
//                 </div>
//             </div>
//             <div class='news-article' id='to-do-btn'>
//                 <i id="news-icon" class="fa-solid fa-circle-check" style="color: #f5f5f5;" data-action='render'></i>
//             </div>
//             `
//         document.getElementById('news').innerHTML = newsHtml
//     }

// }

// Uses an API to retreive random motivational qoutes
function getQuote() {
    fetch("https://type.fit/api/quotes")
        .then(res => {
            if (!res.ok) {
                throw Error("something wen't wrong")
            }
            return res.json()
        })
        .then(data => {

            let qouteAuthor = ''

            let randomQouteIndex = Math.floor(Math.random() * (data.length))

            if (data[randomQouteIndex].author === null) {
                qouteAuthor = "unkown"
            }
            else {
                qouteAuthor = data[randomQouteIndex].author
            }

            document.getElementById('quote').innerHTML = `
        <h3 id='quote-title'>${data[randomQouteIndex].text}</h3>
        <p>"${qouteAuthor}"</p>
        `
        })
        .catch((err => console.error(err)))
}

getQuote()


document.getElementById('news').addEventListener('click', updateLocalStorage)
document.getElementById('news').addEventListener('change', updateLocalStorage)
function updateLocalStorage(e) {

    let category = e.target.dataset.category

    if (e.target.dataset.news === 'close') {
        document.getElementById('news').innerHTML = `
        <div class='news-article' id='to-do-btn'>
            <img id="icon" src='show.svg' data-action='render'>
        </div>
        `
    }

    if (e.target.dataset.action === 'add') {
        let value = document.getElementById(`${category}-input`).value


        if (!toDoObject[category]) {
            toDoObject[category] = []
        }

        toDoObject[category].push(value)

        localStorage.setItem('todo', JSON.stringify(toDoObject))
        renderToDo()
    }

    else if (e.target.dataset.action === 'remove') {
        let value = e.target.parentElement.textContent.trim()
        let index = toDoObject[category].indexOf(value)
        toDoObject[category].splice(index, 1)
        localStorage.setItem('todo', JSON.stringify(toDoObject))
        renderToDo()
    }
    else if (e.target.dataset.action === 'clearAll') {
        toDoObject[category] = []
        localStorage.setItem('todo', JSON.stringify(toDoObject))
        renderToDo()
    }
    else if (e.target.dataset.action === 'render') {
        renderToDo()
    }
}

document.getElementById('to-do-btn').addEventListener('click', renderToDo)

// Renders the innerHtml based on the local storage
function renderToDo() {

    let todoHtml = `
    <div class='news-article' id='to-do-btn'>
                    <img id="icon" src='back.svg' data-news='close'>
                   
    </div>
    `

    const toDoObject = JSON.parse(localStorage.getItem("todo"))

    // Loops through object based on the key
    for (let category in toDoObject) {

        liItems = ''

        // Loops through the arrays of the object
        for (let i = 0; i < toDoObject[category].length; i++) {


            liItems += `
            <li class='todo-item'>${toDoObject[category][i]}</li>
            <button data-category='${category}' data-action="remove" class='remove-todo'>X</button>
            `
        }

        // Creates the Html for the page for each category
        todoHtml += `
    <div class='to-do-list' id='${category}'>
        <div class='header-todo'>
            <h1>${category}</h1>
        </div>
        <div class='bottom-todo'>
        <hr>
        <ul>
            ${liItems}
        </ul>
        <input type="text" id="${category}-input" name="${category}-input" />
        <button data-category='${category}' data-action="add" id='add-todo'>Add</button>
        <button data-category='${category}' data-action="clearAll" id='add-todo'>Clear all</button>
        </div>
    </div>
    `
    }

    document.getElementById('news').innerHTML = todoHtml
    document.getElementById('news').addEventListener('click', updateLocalStorage)
}


// Function to retreive AEX and SP500 data, however not able to use it anymore due to payment wall

// function getMarketData() {

//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'ddb917cb21msh61ecb7435107ab6p1c5578jsn742909b19509',
//             'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
//         }
//     }


//     fetch('https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=%5EGSPC&region=DE', options)
//         .then(res => res.json())
//         .then(data => {

//             let color = ''
//             if (data.price.regularMarketChangePercent.fmt > 0 ){
//                 color = 'green'
//             }
//             else {
//                 color = 'red'
//             }
//             document.getElementById('sp500').innerHTML = `
//             <h3 class='coin-name'> SP500 USD  ${data.price.regularMarketPrice.fmt} <span id='price-percent' class='${color}'>(${data.price.regularMarketChangePercent.fmt})</span></h3>
//             `
//         })


//         fetch('https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=%5EAEX&region=DE', options)
//         .then(res => res.json())
//         .then(data => {

//             let color = ''
//             if (data.price.regularMarketChangePercent.fmt > 0 ){
//                 color = 'green'
//             }
//             else {
//                 color = 'red'
//             }
//             document.getElementById('aex').innerHTML = `
//             <h3 class='coin-name'>AEX <span>USD </span>${data.price.regularMarketPrice.fmt} <span id='price-percent' class='${color}'>(${data.price.regularMarketChangePercent.fmt})</span></h3>
//             `
//         })

// }

//     getMarketData()

// sp500 %5EGSPC