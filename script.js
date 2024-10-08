const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

canvas.width = 600;
canvas.height = 400;

let fruits = [];
let score = 0;
let gameRunning = true;

document.getElementById("score").innerText = {score};

// Fruit class
class Fruit {
    constructor(x, y, size, speed, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.type = type;
        this.sliced = false;
    }

    draw() {
        ctx.fillStyle = this.sliced ? "lightgray" : "red"; // Color changes when sliced
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height && !this.sliced) {
            gameRunning = false; // End game if a fruit is missed
        }
    }
}

// Create fruits
function createFruits() {
    const x = Math.random() * canvas.width;
    const size = 20 + Math.random() * 30;
    const speed = 2 + Math.random() * 3;
    const fruit = new Fruit(x, 0, size, speed, "apple");
    fruits.push(fruit);
}

// Handle fruit slicing
canvas.addEventListener("click", function (e) {
    const clickX = e.clientX - canvas.getBoundingClientRect().left;
    const clickY = e.clientY - canvas.getBoundingClientRect().top;

    fruits.forEach(fruit => {
        const dist = Math.sqrt((fruit.x - clickX) * 2 + (fruit.y - clickY) * 2);
        if (dist < fruit.size && !fruit.sliced) {
            fruit.sliced = true;
            score += 1;
            document.getElementById("score").innerText = {score};
        }
    });
});

// Game loop
function gameLoop() {
    if (gameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fruits.forEach(fruit => {
            fruit.update();
            fruit.draw();
        });

        if (Math.random() < 0.02) { // 2% chance to create a new fruit each frame
            createFruits();
        }

        requestAnimationFrame(gameLoop);
    } else {
        alert("Game Over! Final Score: " + score);
        restartBtn.style.display = "block";
    }
}

// Restart the game
restartBtn.addEventListener("click", function () {
    score = 0;
    fruits = [];
    gameRunning = true;
    document.getElementById("score").innerText = {score};
    restartBtn.style.display = "none";
    gameLoop();
});

// Start the game loop
gameLoop();
