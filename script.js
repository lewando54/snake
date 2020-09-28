//TODO: zoptymalizować renderowanie planszy (oddzielić generowanie od zmiany klas)

let planszaElement = document.querySelector("#plansza")
let h1 = document.querySelector("h1")
let score = document.querySelector("#score")

let player = {
    positionX: 7,
    positionY: 7,
    movDirectionX: 0,
    movDirectionY: 0,
    score: 0
}

let defaultTailSize = 0;
let tailSize = defaultTailSize;

let snakeTrail = []

let apple = {
    positionX: 0,
    positionY: 0
}

let planszaBin = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

renderPlansza()
updatePlayer()
let time = setInterval(renderPlansza, 100)
let playerTick = setInterval(updatePlayer, 1000)
newApple()

window.addEventListener('keydown', e => {
    if (e.key === 'a') {
        player.movDirectionX = -1
        player.movDirectionY = 0
    } else if (e.key === 'd'){
        player.movDirectionX = 1
        player.movDirectionY = 0
    }
    else if (e.key === 'w'){
        player.movDirectionX = 0
        player.movDirectionY = -1
    }
    else if (e.key === 's'){
        player.movDirectionX = 0
        player.movDirectionY = 1
    }
    clearInterval(playerTick)
    playerTick = setInterval(updatePlayer, 1000)
    updatePlayer()
})

window.addEventListener("resize", e => {
    resizeBoxes()
})

function newApple() {
    apple.positionX = Math.floor(Math.random() * 14) + 1
    apple.positionY = Math.floor(Math.random() * 14) + 1
    planszaBin[apple.positionY][apple.positionX] = 2
}

function updatePlayer(){
    player.positionY += player.movDirectionY
    player.positionX += player.movDirectionX
    if(snakeTrail.length > player.score){
        let last = snakeTrail.shift()
        planszaBin[last.y][last.x] = 0
    }
    snakeTrail.push({ x: player.positionX, y: player.positionY });
    planszaBin[player.positionY][player.positionX] = 3
    console.log(planszaBin, snakeTrail)
}

function renderPlansza() {
    planszaElement.innerHTML = ''
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            let box = document.createElement('div')
            if (planszaBin[i][j] === 1) {
                box.setAttribute('class', 'black box')
            } else if (planszaBin[i][j] === 2) {
                box.setAttribute('class', 'apple box')
            } else if (planszaBin[i][j] === 3) {
                box.setAttribute('class', 'snake box')
            } else {
                box.setAttribute('class', 'white box')
            }
            planszaElement.appendChild(box)
        }
    }

    if(player.positionX === apple.positionX && player.positionY === apple.positionY){
        newApple()
        tailSize++;
        player.score += 1       
    }
    if(player.positionX === 15 || player.positionX === 0 || player.positionY === 15 || player.positionY === 0)
        gameOver()
    for(let i = 1; i < snakeTrail.length; i++){
        if(snakeTrail[i].x === player.positionX && snakeTrail[i].y === player.positionY)
            gameOver()
    }
    resizeBoxes()
    score.innerHTML = player.score
    
}


function resizeBoxes() {
    let boxElements = document.querySelectorAll(".box")
    let planszaW = planszaElement.getBoundingClientRect().width - 4
    let dimensionW = planszaW / 16
    planszaElement.style.height = planszaW + 'px'
    boxElements.forEach(box => {
        box.style.width = dimensionW + "px"
        box.style.height = dimensionW + "px"
    })
}

function gameOver(){
    clearInterval(playerTick)
    clearInterval(time)
    window.removeEventListener("keydown", function(){}, true)
    h1.innerHTML = "Przegrałeś!"
}