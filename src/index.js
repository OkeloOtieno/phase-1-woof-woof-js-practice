document.addEventListener('DOMContentLoaded', initialize)


function showDogs(pup){
    let dogs = document.querySelector("#dog-bar")
    const dogsSpan = document.createElement('span')
    dogsSpan.innerText = pup.name
    dogsSpan.dataset.id = pup.id
    dogs.appendChild(dogsSpan)
    dogsSpan.addEventListener('click', onDogspanClick)
}

function onDogspanClick(e){
    getSingleDog(e.target.dataset.id)
    .then(addDogInfoToPage)
}

function getSingleDog(id){
    return fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json() )
}

function addDogInfoToPage(dog){
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    const dogImg = document.createElement("img")
    dogImg.src = dog.image
    const dogTitle = document.createElement("h2")
    dogTitle.innerText = dog.name
    const dogButton = document.createElement("button")
    dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = dog.id
    dogButton.addEventListener("click", onDogspanClick)
    dogInfo.append(dogImg, dogTitle, dogButton)
}



function getAllDogs(){
    fetch('http://localhost:3000/pups')
    .then(res=>res.json())
    .then(data => data.forEach(pup=>showDogs(pup)))
}








function initialize(){
    getAllDogs()
}
