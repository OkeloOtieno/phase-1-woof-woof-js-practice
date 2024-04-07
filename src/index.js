document.addEventListener('DOMContentLoaded', initialize)

//shows dog info on the dog-bar
function showDogs(pup){
    let dogs = document.querySelector("#dog-bar")
    const dogsSpan = document.createElement('span')
    dogsSpan.innerText = pup.name
    dogsSpan.dataset.id = pup.id
    dogs.appendChild(dogsSpan)
    dogsSpan.addEventListener('click', onDogspanClick)
}
//invokes the addDogInfoToPage function that renders the info
function onDogspanClick(event){
    getSingleDog(event.target.dataset.id)
    .then(addDogInfoToPage)
}

//creates dogs information and renders it to the dog info div
function addDogInfoToPage(pup){
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    const dogImg = document.createElement("img")
    dogImg.src = pup.image
    const dogTitle = document.createElement("h2")
    dogTitle.innerText = pup.name
    const dogButton = document.createElement("button")
    dogButton.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = pup.id
    dogButton.addEventListener("click", onGoodDogButtonClick)
    dogInfo.append(dogImg, dogTitle, dogButton)
}
//sets a new isGoodDog value
function onGoodDogButtonClick(event){
    let newValue;
    if (event.target.innerText.includes("Good")){
        event.target.innerText = "Bad Dog"
        newValue = false
    } else {
        event.target.innerText = "Good Dog"
        newValue = true
    }
    toggleGoodDog(event.target.dataset.id, newValue)
}
//http requests
function getSingleDog(id){
    return fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json() )
}

function toggleGoodDog(id, newValue){
    return fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': `application/json`
        },
        body: JSON.stringify({
            isGoodDog: newValue
        })
    }).then(res=>res.json())
    
}

function getAllDogs(){
    fetch('http://localhost:3000/pups')
    .then(res=>res.json())
    .then(data => data.forEach(pup=>showDogs(pup)))
}

function initialize(){
    getAllDogs()
}
