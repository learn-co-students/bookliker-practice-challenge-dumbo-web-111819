const bookList = document.querySelector('#list');
const bookContents = document.querySelector('#show-panel')



fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(json => json.forEach(renderBooks))

function renderBooks(book) {
    const bookLi = document.createElement('li')
    bookLi.textContent = book.title
    bookLi.addEventListener('click', e => {
        displayBook(book)
    })
    bookList.append(bookLi)
}

function displayBook(book) {
    bookContents.textContent = '';

        const bookPicture = document.createElement('img');
            bookPicture.src = book.img_url;

        const bookTitle = document.createElement('h2')
            bookTitle.textContent = book.title;

        const bookDescription = document.createElement('p');
            bookDescription.textContent = book.description 

        const likerHeading = document.createElement('h4')
            likerHeading.textContent = 'People Who Liked This:'

        const likers = document.createElement('ul')
            book.users.forEach(user => addUser(user, likers))

        const likeButton = document.createElement('button')
            likeButton.textContent = 'Like book'
            likeButton.addEventListener('click', ()=>likeABook(book,likers))

        bookContents.append(bookTitle, bookPicture, bookDescription,likerHeading,likeButton, likers )
}

function addUser(user, likers){
    const bookUser = document.createElement('li');
    bookUser.textContent = user.username;
    likers.append(bookUser);
}

function likeABook(book, likers){
    book.users.push({"id":1, "username":"pouros"})
    let configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            users: book.users
        })
    }
    fetch(`http://localhost:3000/books/${book.id}`, configObj)
        .then(resp => resp.json())
        .then(json => {
            likers.innerHTML = '';
            json.users.forEach(user => addUser(user, likers))
    })
}