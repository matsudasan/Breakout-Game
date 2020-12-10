const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let score=0

const ballRadius = 10
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 3
let dy = -3

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false

let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30
const bricks = []

for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 }
    }
}
const KeyDownHandler = (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true
    }
}

const KeyUpHandler = (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false
    }
}

const DrawBall = () => {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "green"
    ctx.fill()

    
    if (x > canvas.width - ballRadius || x < ballRadius) {
        dx = -dx
    }

    if (y < ballRadius) {
        dy = -dy
    }
    else if (y > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        }
        else {
            alert("GAME OVER")
            document.location.reload()
            exit
        }
    }

    x += dx
    y += dy
}

const DrawPaddle = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7
    }
}

const DrawBricks = () => {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            const b = bricks[i][j]
            if (b.status == 1) {
                const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft
                const brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop
                b.x = brickX
                b.y = brickY
                ctx.fillStyle = "#0095DD";
                ctx.fillRect(brickX, brickY, brickWidth, brickHeight)

                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++
                }
            }
        }
    }
}

const DrawScore=()=>{
    ctx.font = "16px Arial"
    ctx.fillStyle = "#0095DD"
    ctx.fillText("Score: "+score, 8, 20)

    if(score == brickRowCount*brickColumnCount) {
        alert("YOU WIN, CONGRATULATIONS!")
        document.location.reload()
        exit
    }
}

const Draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    DrawBall()
    DrawPaddle()
    DrawBricks()
    DrawScore()
    requestAnimationFrame(Draw)
}
Draw()
document.addEventListener('keydown', KeyDownHandler)
document.addEventListener('keyup', KeyUpHandler)