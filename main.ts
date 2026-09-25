// Galaga-style shooter for micro:bit
// Player moves left/right and shoots enemies

let playerX = 2
let bulletY = -1
let enemyX = Math.randomRange(0, 4)
let enemyY = 0
let score = 0
let bulletActive = false

// Draw the player ship
function drawPlayer() {
    led.plot(playerX, 4)
}

// Draw the enemy
function drawEnemy() {
    led.plot(enemyX, enemyY)
}

// Draw the bullet
function drawBullet() {
    if (bulletActive) {
        led.plot(playerX, bulletY)
    }
}

// Move player left
input.onButtonPressed(Button.A, function () {
    if (playerX > 0) {
        playerX--
    }
})

// Move player right
input.onButtonPressed(Button.B, function () {
    if (playerX < 4) {
        playerX++
    }
})

// Shoot bullet
input.onButtonPressed(Button.AB, function () {
    if (!bulletActive) {
        bulletY = 3
        bulletActive = true
    }
})

// Game loop
basic.forever(function () {
    basic.clearScreen()

    // Move enemy down
    enemyY++
    if (enemyY > 4) {
        enemyY = 0
        enemyX = Math.randomRange(0, 4)
    }

    // Move bullet up
    if (bulletActive) {
        bulletY--
        if (bulletY < 0) {
            bulletActive = false
        }
    }

    // Collision detection
    if (bulletActive && bulletY == enemyY && playerX == enemyX) {
        score++
        bulletActive = false
        enemyY = 0
        enemyX = Math.randomRange(0, 4)
    }

    // Draw everything
    drawPlayer()
    drawEnemy()
    drawBullet()

    basic.pause(200)
})

