import Player from "./player.js"

export default class Game {
    constructor() {
        this.players = []
        this.objects = [this.players]
    }
    update() {
        this.objects.forEach(object => {
            if (Array.isArray(object)) object.forEach(obj => obj.update())
            else object.update()
        })
    }
    createPlayer(id) {
        this.players.push(new Player(id))
    }
    deletePlayer(id) {
        const playerIndex = this.players.findIndex(player => player?.id === id)
        if (playerIndex === -1) return
        this.players.splice(playerIndex, 1)
    }
    updatePlayerBindings(uid, left, right, up, down) {
        const player = this.players.find(player => player.id === uid)

        if (left) player.moveLeft()
        if (right) player.moveRight()
        if (up) player.moveUp()
        if (down) player.moveDown()

        if (!left && !right) player.stopX()
        if (!up && !down) player.stopY()
    }
}