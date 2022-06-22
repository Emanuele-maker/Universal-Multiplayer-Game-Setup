import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js"

export default class Player {
    constructor(id) {
        this.id = id
        this.scale = {
            width: 150,
            height: 150
        }
        this.position = {
            x: Math.random() * (GAME_WIDTH - this.scale.width),
            y: Math.random() * (GAME_HEIGHT - this.scale.height)
        }
        this.maxSpeed = 5
        this.speed = {
            x: 0,
            y: 0
        }
    }
    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if (this.position.x <= 0) this.position.x = 0
        if (this.position.x + this.scale.width >= GAME_WIDTH) this.position.x = GAME_WIDTH - this.scale.width
        if (this.position.y <= 0) this.position.y = 0
        if (this.position.y + this.scale.height >= GAME_HEIGHT) this.position.y = GAME_HEIGHT - this.scale.height
    }
    stopX() {
        this.speed.x = 0
    }
    stopY() {
        this.speed.y = 0
    }
    moveLeft() {
        this.speed.x = -this.maxSpeed
    }
    moveRight() {
        this.speed.x = this.maxSpeed
    }
    moveUp() {
        this.speed.y = -this.maxSpeed
    }
    moveDown() {
        this.speed.y = this.maxSpeed
    }
}