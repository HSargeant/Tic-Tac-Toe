let xscore= localStorage.getItem("xscore") || 0
let oscore= localStorage.getItem("oscore") || 0
document.querySelector("#oscore").innerText= oscore
document.querySelector("#xscore").innerText= xscore

const boxes = document.querySelectorAll('#box')

document.querySelector("#restart").addEventListener('click', restartGame)
let oTurn=true

const winCases = [ [0,3,6], [1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6] ]

boxes.forEach(element=>{
    element.addEventListener('click',start, {once: true})
})

function start(element){

let cell = element.target
const currentTurn = oTurn ? "O" : "X"

placeXO(cell, currentTurn)

if(draw(currentTurn)){
    document.querySelector("#winningMessage").innerText = `It's a Tie!`
    document.querySelector(".gameOver").classList.add("show")
}

if(win(currentTurn)){
    document.querySelector("#winningMessage").innerText =`The Winner is ${currentTurn}!`
    document.querySelector(".gameOver").classList.add("show")
    console.log(currentTurn, "winner")

    //update storage
    currentTurn == "X" ? xscore++ : oscore++
    localStorage.setItem("xscore",xscore)
    localStorage.setItem("oscore",oscore)
    document.querySelector("#oscore").innerText= oscore
    document.querySelector("#xscore").innerText= xscore
    console.log(xscore,oscore)
}

nextTurn()
win(winCases)
draw(currentTurn)
console.log(oTurn, currentTurn)
}

//check functions

function placeXO(cell,currentTurn){
    cell.innerText = currentTurn
}

function nextTurn(){
    oTurn = !oTurn
}

function win(currentTurn){
   return winCases.some(match=>{
       return match.every(i=>{
           return boxes[i].innerText ==currentTurn
       })
   })
}

function draw(){
    return Object.values(boxes).every(e=>{
        return e.innerText !==""
    })
}

function restartGame(){
    boxes.forEach(element=>{
        document.querySelector(".gameOver").classList.remove("show")
        element.innerText=""
        element.addEventListener('click',start, {once: true})
    })
}

document.querySelector('.resetScore').addEventListener('click',x=>{
    oscore=0
    xscore=0
    localStorage.setItem("xscore",xscore)
    localStorage.setItem("oscore",oscore)
    document.querySelector("#oscore").innerText= oscore
    document.querySelector("#xscore").innerText= xscore
    restartGame()
})