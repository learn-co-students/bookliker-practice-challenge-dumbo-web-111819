document.addEventListener("DOMContentLoaded", function() {
    const ulTag = document.querySelector("#list")
    const show = document.querySelector("#show-panel")
    fetch("http://localhost:3000/books")
    .then(r => r.json())
    .then(r => {
        r.forEach(obj => {
            turnJsonToHtml(obj)
            
        });
    })
    function turnJsonToHtml(obj){
        const liElement = document.createElement("li")
        liElement.innerText = obj.title
        ulTag.append(liElement)

        liElement.addEventListener("click",e => {
            show.innerText = ""
            const h2 = document.createElement("h2")
            const pTag = document.createElement("p")
            const imgTag = document.createElement("img")
            const bttn = document.createElement("button")

            // alert("hi")
            h2.innerText = obj.title
            pTag.innerText = obj.description
            imgTag.src = obj.img_url
            imgTag.alt = `${obj.id} picture`
            bttn.innerText = "Read"
            show.append(h2,imgTag,pTag,bttn)
            obj.users.forEach(e => {
                const userP = document.create("p")
                userP.innerText = e.username
                show.append(userP)
            })

            // bttn.addEventListener("click", e => {
                
            //     const mySelf = {
            //         "id":1,
            //         "username":"pouros"
            //     }
                
            //     const readerIndex = obj.users.length -1


            //     if(readers[readerIndex].id === mySelf.id){
            //         alert("you already liked it")
            //     }
            //     else{
            //         obj.users.push(mySelf)
            //         fetch(`http://localhost:3000/books/${obj.id}`{
            //             method:'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json'               
            //               },
            //             body: JSON.stringify({
            //                 users:obj.users
            //             })
            //         })
            //         .then(r => r.json())
            //         .then(console.log)
            //     }
        
                   
                   
            
            // })

        })
    }
    
});
