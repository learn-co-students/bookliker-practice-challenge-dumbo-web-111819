const books_url = 'http://localhost:3000/books'
const book_list = document.querySelector('#list-panel')
const book_info = document.querySelector('#show-panel')



// Fetch function
    // Returns a promise 
    
    // Why this won;t work, objects = the objectArrays
    // return fetch(books_url).then(res => res.json()).then(objects => console.log(objects))
    function fetchBooks(){

        return fetch(books_url).then(res => res.json())

        // Good practice to write out headers even for get fetch, sometimes it can be html coming back. 
            // function fetchBooks(){
    //     // Returns a promise 
    //     return fetch(books_url, {
    //       headers: {
    //         "Accept": "application/json"
    //       }
    //     })
    //     .then(res => res.json())
    //   }

    }

// Get fetch
    fetchBooks()
    .then(books_objs => {
        books_objs.forEach(book => {
            slapBookToDOM(book)
        })
    })


// Slap to DOM function

function slapBookToDOM(book){
  
    newLi = document.createElement('li')
    newLi.innerText = book.title 
    book_list.append(newLi)

    // Show book when clicked on title  
    newLi.addEventListener('click', e => {

        const like_btn = document.createElement('button')
            like_btn.innerText = 'Like'
            
        const titleTag = document.createElement('h3')
        titleTag.innerText = book.title

        const bookImg = document.createElement('img')
        bookImg.src = book.img_url
        bookImg.alt ='A book duh'

        const bookDes = document.createElement('p')
        bookDes.innerText = book.description 
        book_info.innerHTML = ''
        const user_ul = document.createElement('ul')

        book.users.forEach(user => {
            
            // Append to the div also,and later grab from the div.
            const user_li = document.createElement('li')
            user_li.innerText = user.username
            user_ul.append(user_li)
        })
        
        book_info.append(titleTag, bookImg, bookDes,user_ul, like_btn)  
        
         //Like button 
        // Select from the div that we created. 
        // Need to be inside this scope because show_div only has something after the click on title happen.
        
        like_btn.addEventListener('click', e => {
            let new_user = {'id': 1, 'username': 'yuho'}
            book.users.push(new_user)
 
            fetch(books_url + `/${book.id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    users: book.users
                })
            })// end of fetch 
            .then(res => res.json())
            .then(book_obj => { // Here get back the object, the param being passed in from the previous callback is the object
                   const new_user_li = document.createElement('li')
                   

                
                   new_user_li.innerText = book_obj.users[book_obj.users.length -1 ].username
                   user_ul.append(new_user_li)
            }) 
        })


    })

     
        
 



}






