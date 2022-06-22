import * as resources from "./resources.js"
import input from "./input.js"

// Socket.io - client side handling
const socket = io("https://i49cof.sse.codesandbox.io/")
let game, uid

socket.on("uid", id => uid = id)
socket.on("gameState", state => game = state)

// Canvas setup
const canvas = document.body.appendChild(document.createElement("canvas"))
const ctx = canvas.getContext("2d")

let CANVAS_WIDTH
let CANVAS_HEIGHT
const GAME_WIDTH = 1280
const GAME_HEIGHT = 720
const ratio = 16 / 9

const resize = () => {
    CANVAS_WIDTH = window.innerWidth - 4
    CANVAS_HEIGHT = window.innerHeight - 4

    if (CANVAS_HEIGHT < CANVAS_WIDTH / ratio) {
        CANVAS_WIDTH = CANVAS_HEIGHT * ratio
    } else {
        CANVAS_HEIGHT = CANVAS_WIDTH / ratio
    }
    canvas.style.aspectRatio = "16 / 9"

    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    canvas.style.width = `${CANVAS_WIDTH}px`
    canvas.style.height = `${CANVAS_HEIGHT}px`
    canvas.style.position = "absolute"
    canvas.style.left = "50%"
    canvas.style.top = "50%"
    canvas.style.transform = "translate(-50%, -50%)"
}

resize()
window.addEventListener("resize", resize)

// Rendering
const drawGameObject = (image, object) => {
    ctx.drawImage(image, object.position.x, object.position.y, object.scale.width, object.scale.height)
}

const drawText = (text, x, y, fontSize, FontFamily, color, textAlign = "left") => {
    ctx.font = `${fontSize}px ${FontFamily}`
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(text, x, y)
}

const gameLoop = () => {
    socket.emit("input", {
        left: input.isKeyPressed(37) || input.isKeyPressed(65),
        right: input.isKeyPressed(39) || input.isKeyPressed(68),
        up: input.isKeyPressed(38) || input.isKeyPressed(87),
        down: input.isKeyPressed(40) || input.isKeyPressed(83),
    })

    const clientPlayer = game.players.find(player => player.id === uid)

    game.players.forEach(player => drawGameObject(resources.cat, player))

    drawText("TU", clientPlayer.position.x + clientPlayer.scale.width / 2, clientPlayer.position.y, 50, "Comic Sans MS", "white", "center")
}

const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(resources.background, 0, 0, canvas.width, canvas.height)

    if (game) gameLoop()

    requestAnimationFrame(render)
}
render()