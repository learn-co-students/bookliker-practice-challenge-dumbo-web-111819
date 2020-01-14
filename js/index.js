const URL = "http://localhost:3000/books"
const bookList = document.getElementById("list")
const showBook = document.querySelector("#show-panel")
fetch(URL).then(r=> r.json()).then(obj => obj.forEach(turnJSONtoHTML))

function turnJSONtoHTML(book) { 
    let newDiv = document.createElement('div')
    let newLi = document.createElement('li')
    newLi.innerText = book.title
    newDiv.append(newLi)
    bookList.append(newDiv)
    newLi.addEventListener('click', (event) => {
        showBook.innerText = ''
        let anotherDiv = document.createElement('div')
        // let topLi = document.createElement('li')
        let li2 = document.createElement('li')
        let li3 = document.createElement('li')
        let image = document.createElement('img')
        let likebttn = document.createElement('button')
        likebttn.innerText = "LIKE"
        li2.innerText = `Description: ${book.description} `
        image.src = book.img_url
        book.users.forEach(user => {
        
           li3.append(`Liked by ${user.username}`)
        })
        anotherDiv.append(li2,image,li3,likebttn)
        showBook.append(anotherDiv)
    })
}


// "title": "Picture Perfect",
// "description": "When her seven-year-old nephew, a hemophiliac, mysteriously disappears during their camping trip, pediatrician Lorrie Ryan races against time to find the missing boy with the help of FBI agent Stuart Saunders. Previously published as Panda Bear Is Critical. Reprint.",
// "img_url": "http://books.google.com/books/content?id=CEMZ1OoPDIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
// "users": [