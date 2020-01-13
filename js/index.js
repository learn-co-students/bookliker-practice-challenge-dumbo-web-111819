document.addEventListener("DOMContentLoaded", function() {
    let bookList = document.getElementById("list")
    let bookUrl = "http://localhost:3000/books"
    let showBook = document.getElementById("show-panel")

    fetch(`${bookUrl}`)
        .then(r=>r.json())
        .then(bookData => {
            bookData.forEach(bookObject => {
                let bookLi = document.createElement("li")
                bookLi.innerText = bookObject.title
                bookList.append(bookLi)
                bookLi.addEventListener("click", e => {
                    renderBook(bookObject)
                })
            })
        })

    function renderBook(bookObject){
        showBook.innerHTML = ''
        let title = document.createElement("h2")
        let pic = document.createElement("img")
        let button = document.createElement("button")

        title.innerText = bookObject.title
        pic.src = bookObject.img_url
        showBook.append(title,pic)
        
        bookObject.users.forEach(user => {
            let userP = document.createElement("p")
            userP.innerText = user.username
            showBook.append(userP)
        })
        button.innerText = "Read Book"
        showBook.append(button)

        button.addEventListener("click", e => {
            likeBook(bookObject)

        })
    }

    function likeBook(bookObject){
        let me = {
            id: 1,
            username: "pouros"
        }
        if(bookObject.users[bookObject.users.length-1].id === 1){
            let readers = bookObject.users
            readers.pop()

            fetch(`${bookUrl}/${bookObject.id}`, {
                method: "PATCH",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({
                    users: readers
                })
            })
            .then(r=>r.json())
            .then(newBookObject => {
                renderBook(newBookObject)
            })
        } else {
            let readers = bookObject.users
            readers.push(me)

            fetch(`${bookUrl}/${bookObject.id}`, {
                method: "PATCH",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({
                    users: readers
                })
            })
            .then(r=>r.json())
            .then(newBookObject => {
                renderBook(newBookObject)
            })
        }
    }

})
