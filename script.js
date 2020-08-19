//TODO: zoptymalizować renderowanie planszy (oddzielić generowanie od zmiany klas)

let planszaElement = document.querySelector("#plansza")

let player = {
    positionX: 7,
    positionY: 7
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
let time = setInterval(renderPlansza, 100)
newApple()

window.addEventListener('keydown', e => {
    if (e.key === 'a') {
        movePlayer(-1, 0)
    } else if (e.key === 'd')
        movePlayer(1, 0)
    else if (e.key === 'w')
        movePlayer(0, -1)
    else if (e.key === 's')
        movePlayer(0, 1)
    updatePlayer()
})

window.addEventListener("resize", e => {
    resizeBoxes()
})

function newApple() {
    let randX = Math.floor(Math.random() * 14) + 1
    let randY = Math.floor(Math.random() * 14) + 1
    planszaBin[randY][randX] = 2
}

function movePlayer(x, y) {
    planszaBin[player.positionY][player.positionX] = 0
    player.positionY += y
    player.positionX += x
    console.log(player)
}

function updatePlayer() {
    planszaBin[player.positionY][player.positionX] = 3
}

function renderPlansza() {
    planszaElement.innerHTML = ''
    updatePlayer()
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
    resizeBoxes()
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