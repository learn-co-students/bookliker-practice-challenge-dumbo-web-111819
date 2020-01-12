const ul = document.querySelector("#list")
const showDiv = document.querySelector("#show-panel")
console.log(showDiv);
//INDEX ACTION RENDER ALL BOOKS
fetch("http://localhost:3000/books")
.then((resp) => {
  return resp.json()
})
.then((booksArray) => {
  //iterate through each book and slap it on the DOM
  displayAllBooksToDom(booksArray)
})


function displayBookToDom(book){
  let li = document.createElement("li")
  li.dataset.id = book.id
  li.innerText = book.title
  ul.append(li)
    li.addEventListener("click", (evt) => {
      // let clickBook = evt.target.innerText
        fetch(`http://localhost:3000/books/${book.id}`)
        .then((resp) => {
          return resp.json()
        })
        .then((book) => {
          bookInfo(book)
        })
    })
}

function bookInfo(book){
    const h1 = document.createElement("h1");
    h1.innerText = book.title;
    const img = document.createElement("img");
    img.src = book.img_url
    const p = document.createElement("p");
    p.innerText = book.description;
    const h3 = document.createElement("h3");
    book.users.forEach((user) => { h3.innerText += `\n${user.username}`})
    const button = document.createElement("button");
    button.dataset.id = book.id
    button.innerText = "Read Book"
    showDiv.innerHTML = ""
    showDiv.append(h1, img, p, h3, button)
    buttonUpdate(book, button, h3)

  }


function buttonUpdate(book, button, h3){
  button.addEventListener("click", (evt) => {
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        users: book.users.concat([{id: 1, username:"pouros"}])
      })

    })
    .then((resp) => {
      return resp.json()
    })
    .then((bookObj) => {

      console.log(bookObj);
        h3.innerHTML = ""
        bookObj.users.forEach((user) => { h3.innerText += `\n${user.username}`})
    })
  })

}



function displayAllBooksToDom(booksArray){
  booksArray.forEach((book) => {
    displayBookToDom(book)
  })
}
