// Selecting the canvas element and getting its 2D rendering context
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Setting canvas dimensions to match the window size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Class representing the player's spaceship
class Player {
    constructor({position, velocity}){
        this.position = position // {x, y}
        this.velocity = velocity
        this.rotation = 0
    }

    // Method to draw the player's spaceship
    draw() {
        // Saving the current transformation state
        c.save()
        // Translating to the spaceship's position
        c.translate(this.position.x, this.position.y)
        // Rotating the canvas based on spaceship's rotation
        c.rotate(this.rotation)
        // Drawing spaceship components
        // Drawing spaceship body (circle)
        c.beginPath()
        c.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
        // Drawing spaceship wings (triangle)
        c.beginPath()
        c.moveTo(this.position.x + 30, this.position.y)
        c.lineTo(this.position.x - 10, this.position.y - 10)
        c.lineTo(this.position.x - 10, this.position.y + 10)
        c.closePath()
        c.strokeStyle= 'white'
        c.stroke()
        // Restoring the previous transformation state
        c.restore()
    }

    // Method to update the player's position
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    // Method to get vertices of the spaceship (used for collision detection)
    getVertices(){
        const cos = Math.cos(this.rotation)
        const sin = Math.sin(this.rotation)
        return [
            {
                x: this.position.x + cos * 30 - sin * 0,
                y: this.position.y + sin * 30 + cos * 0,
            },
            {
                x: this.position.x + cos * -10 - sin * 10,
                y: this.position.y + sin * -10 + cos * 10,
            },
            {
                x: this.position.x + cos * -10 - sin * -10,
                y: this.position.y + sin * -10 + cos * -10,
            },
        ]
    }
}

// Class representing the projectiles fired by the player
class Projectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }

    // Method to draw the projectile
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.closePath()
        c.fillStyle = 'white'
        c.fill()
    }

    // Method to update the projectile's position
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// Creating a player object with initial position and velocity
const player = new Player({
    position: {x: canvas.width / 2, y: canvas.height / 2}, 
    velocity: {x: 0, y: 0},
})

// Drawing the player on the canvas
player.draw()

// Object to store key states for player controls
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

// Class representing the asteroids
class Asteroid {
    constructor({position, velocity, radius}){
        this.position = position
        this.velocity = velocity
        this.radius = radius
    }

    // Method to draw the asteroid
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.closePath()
        c.strokeStyle = 'white'
        c.stroke()
    }

    // Method to update the asteroid's position
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// Constants for game parameters
const SPEED = 3
const ROTATIONAL_SPEED = 0.05
const FRICTION = 0.97
const PROJECTILE_SPEED = 3

// Arrays to store projectiles and asteroids
const projectiles = []
const asteroids = []

// Interval to spawn asteroids
const intervalId = window.setInterval(() => {
    // Randomly select a side of the screen to spawn an asteroid
    const index = Math.floor(Math.random() * 4)
    let x, y
    let vx, vy
    let radius = 50 * Math.random() + 10

    switch (index) {
        case 0: // left side of the screen
            x = 0 - radius
            y = Math.random() * canvas.height
            vx = 1
            vy = 0
            break
        case 1: // bottom side of the screen
            x = Math.random() * canvas.width
            y = canvas.height + radius
            vx = 0
            vy = -1
            break
        case 2: // right side of the screen
            x = canvas.width + radius
            y = Math.random() * canvas.height
            vx = -1
            vy = 0
            break
        case 3: // top side of the screen
            x = Math.random() * canvas.width
            y = 0 - radius
            vx = 0
            vy = 1
            break
    }

    // Create a new asteroid and push it to the asteroids array
    asteroids.push(new Asteroid({
        position: {
            x: x,
            y: y,
        },
        velocity: {
            x: vx,
            y: vy,
        },
        radius,
    }))
}, 3000)

// Function to check collision between two circles
function circleCollision(circle1, circle2){
    const xDifference = circle2.position.x - circle1.position.x
    const yDifference = circle2.position.y - circle1.position.y
    const distance = Math.sqrt(xDifference * xDifference + yDifference * yDifference)
    return distance <= circle1.radius + circle2.radius
}

// Function to check collision between a circle and a triangle
function circleTriangleCollision(circle, triangle){
    // Implementation details for circle-triangle collision detection
}

// Function to check if a point is on a line segment
function isPointOnLineSegment(x, y, start, end){
    // Implementation details for point-line segment collision detection
}

// Function to continuously update and render the game
function animate() {
    const animationId = window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // Update player's position
    player.update()

    // Update and check collisions for projectiles
    for (let i = projectiles.length - 1; i >= 0; i--){
        const projectile = projectiles[i]
        projectile.update()

        // Garbage collection for projectiles outside the canvas
        if (
            projectile.position.x + projectile.radius < 0 ||
            projectile.position.x - projectile.radius > canvas.width ||
            projectile.position.y - projectile.radius > canvas.height ||
            projectile.position.y + projectile.radius < 0
        ){
            projectiles.splice(i, 1)
        }
    }

    // Update and check collisions for asteroids
    for (let i = asteroids.length - 1; i >= 0; i--){
        const asteroid = asteroids[i]
        asteroid.update()

        // Check collision between asteroid and player
        if (cirlceTriangleCollision(asteroid, player.getVertices())){   
            window.cancelAnimationFrame(animationId)
            clearInterval(intervalId)
        }

        // Garbage collection for asteroids outside the canvas
        if (
            asteroid.position.x + asteroid.radius < 0 ||
            asteroid.position.x - asteroid.radius > canvas.width ||
            asteroid.position.y - asteroid.radius > canvas.height ||
            asteroid.position.y + asteroid.radius < 0
        ){
            asteroids.splice(i, 1)
        }

        // Check collision between asteroid and projectiles
        for (let j = projectiles.length - 1; j >= 0; j--){
            const projectile = projectiles[j]
            if (circleCollision(asteroid, projectile)){
                asteroids.splice(i, 1)
                projectiles.splice(j, 1)
            }
        }
    }

    // Handle player controls
    if (keys.w.pressed) {
        player.velocity.x = Math.cos(player.rotation) * SPEED
        player.velocity.y = Math.sin(player.rotation) * SPEED
    } else if(!keys.w.pressed){
        player.velocity.x *= FRICTION
        player.velocity.y *= FRICTION
    }

    if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED
    else if(keys.a.pressed) player.rotation -= ROTATIONAL_SPEED
}

// Start the game loop
animate()

// Event listener for keydown event to handle player controls
window.addEventListener('keydown', (event) => {
    switch(event.code){
        case 'KeyW':
            keys.w.pressed = true
            break
        case 'KeyA':
            keys.a.pressed = true
            break
        case 'KeyD':
            keys.d.pressed = true
            break
        case 'Space':
            // Fire a projectile when Space key is pressed
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + Math.cos(player.rotation) * 30,
                    y: player.position.y + Math.sin(player.rotation) * 30,
                },
                velocity: {
                    x: Math.cos(player.rotation) * PROJECTILE_SPEED,
                    y: Math.sin(player.rotation) * PROJECTILE_SPEED,
                }
            }))
            break
    }
})

// Event listener for keyup event to handle player controls
window.addEventListener('keyup', (event) => {
    switch(event.code){
        case 'KeyW':
            keys.w.pressed = false
            break
        case 'KeyA':
            keys.a.pressed = false
            break
        case 'KeyD':
            keys.d.pressed = false
            break
    }
})
