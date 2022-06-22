import { createServer } from "http"
import { Server as SocketServer } from "socket.io"
import Game from "./game/game.js"

const server = createServer()
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
})
const PORT = 3000 || process.env.PORT

const game = new Game()
let gameInterval

io.on("connection", socket => {
    const uid = socket.id

    console.log(`A client just connected! Socket UID: ${uid}`)

    socket.emit("uid", uid)

    game.createPlayer(uid)

    const startGameInterval = () => {
        gameInterval = setInterval(() => {
            game.update()
            io.emit("gameState", game)
        }, 3)
    }

    if (io.sockets.sockets.size === 1) startGameInterval()

    socket.on("input", ({ left, right, up, down }) => {
        game.updatePlayerBindings(uid, left, right, up, down)
    })

    socket.on("disconnect", reason => {
        game.deletePlayer(uid)
        if (io.sockets.sockets.size < 1) clearInterval(gameInterval)
        console.log(`A client just disconnected... Socket UID: ${uid}. Reason: ${reason}`)
    })
})

server.listen(PORT, undefined, undefined, () => console.log(`Server started on port ${PORT}`))