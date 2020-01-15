// document.addEventListener("DOMContentLoaded", function() {});
//title: "Picture Perfect"
// description: "When her seven-year-old nephew, a hemophiliac, mysteriously disappears during their camping trip, pediatrician Lorrie Ryan races against time to find the missing boy with the help of FBI agent Stuart Saunders. Previously published as Panda Bear Is Critical. Reprint."
// img_url: "http://books.google.com/books/content?id=

const BOOKS_URL = "http://localhost:3000/books";
const booksUL = document.getElementById("list");
const showPanel = document.getElementById("show-panel");
const usersDiv = document.createElement("div");
      



getBooks();

function getBooks(){

    fetch(BOOKS_URL)
    .then(r => r.json())
    .then(books => {
        books.forEach(book => {
            listBooks(book);
        });
    })
}//getBooks




function listBooks(book){
    const bookLI = document.createElement("li")
    bookLI.innerText = book.title;
    booksUL.append(bookLI);

    //add eventListener for clicking each book
    bookLI.addEventListener('click', (e) => {

        addToPanel(book)

    })//CLICK EVENT
}//listBooks




function addToPanel(book){
    //Clear panel each time we append
    showPanel.innerHTML = "";
    //build panel
    const titleH2 = document.createElement("h2");
        titleH2.innerText = book.title;
    const bookImg = document.createElement("img");
        bookImg.src = book.img_url;
        bookImg.alt = book.title;
    const bookDesc = document.createElement("p");
        bookDesc.innerText = book.description
    const likeButton = document.createElement("button");
        likeButton.innerText = "like";
        likeButton.style.color = "blue";
    showPanel.append(titleH2, bookImg, bookDesc, likeButton);
    showPanel.append(usersDiv);
    //clear the list of users so that they only show when button is clicked 
    usersDiv.innerHTML = "";
     //List users who read the book
     displayUsers(book);
   
        
 

    //like a book
    likeButton.addEventListener('click', (e) => {
        book.users.push({id:1, username:"Pouros"})
       
        fetch(BOOKS_URL + `/${book.id}`, {
            method: "PATCH",
            headers:{
                    "content-type":"application/json",
                    "accept":"application/json"
            },
            body: JSON.stringify({
                    users: book.users
            })
        })//FETCH
        .then(r => r.json())
        .then(userData => {
            displayUsers(book)
        })
    })//CLICK EVENT

}//addToPanel




function displayUsers(book){    
    usersDiv.innerHTML = "";
    book.users.forEach(user => {
            const lTag = document.createElement("li");
            lTag.innerText = user.username;
            usersDiv.append(lTag);

    })
}//displayUsers