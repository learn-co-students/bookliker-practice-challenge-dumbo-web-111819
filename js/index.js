const URL_PREFIX = "http://localhost:3000/books"

const bookList = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

let loggedInUser = {id:1,username:"pouros"} // fetch users first user

fetch(URL_PREFIX)
.then(r => r.json())
.then(fillBooksList)

function fillBooksList(books){
   bookList.innerHTML = ""
   books.forEach(createBookLi);
}

function createBookLi(book){
   let newLi = document.createElement("li")
      newLi.innerText = book.title
      bookList.append(newLi)
   newLi.addEventListener("click", () => {
      fillShowPanel(book)
   })
}

function fillShowPanel(book){
   showPanel.innerHTML = ""
      let titleH2 = document.createElement("h2")
         titleH2.innerText = book.title
      let descriptionP = document.createElement("p")
         descriptionP.innerText = book.description
      let image = document.createElement("img")
         image.src = book.img_url
      let likeButton = document.createElement("button")
         likeButton.innerText = "Like"
      let br1 = document.createElement("br")
      let br2 = document.createElement("br")
      let likesHeader = document.createElement("h3")
         likesHeader = "These Users Liked This Book:"
      let likeUl = document.createElement("ul")
      book.users.forEach(user => {
         let userLi = document.createElement("li")
         userLi.innerText = user.username
         likeUl.append(userLi)
      })

   showPanel.append(titleH2,descriptionP,image,likeButton,br1,br2,likesHeader,likeUl)
   
   let bookUsersArray = book.users

   likeButton.addEventListener("click", () => {
      console.log(bookUsersArray)
      // if (Object.keys(bookUsersArray.find(user => user.username === loggedInUser.username)).length !== 0){
      if ((bookUsersArray.find(user => user.username === loggedInUser.username)) !== undefined){
         bookUsersArray.pop()
         console.log(bookUsersArray)
         usersPatch(book, bookUsersArray)
      } else {
         bookUsersArray.push(loggedInUser)
         console.log(bookUsersArray)
         usersPatch(book, bookUsersArray)
      }
   })
}

function usersPatch(book, bookUsersArray){
   fetch(`${URL_PREFIX}/${book.id}`, {
      method: "PATCH",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         users: bookUsersArray
      })
   })
   .then(r => r.json())
   .then(fillShowPanel(book))
}

