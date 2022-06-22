const createImage = (src) => {
    const img = new Image()
    img.src = src
    return img
}

// example
const cat = createImage("./src/cat.png")
const background = createImage("./src/background.jpg")

export {
    cat,
    background
}