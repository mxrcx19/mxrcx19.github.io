// select elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Event-Listener for start-button
startButton.addEventListener('click', () => {
    startScreen.classList.remove('visible');
    gameScreen.classList.add('visible');
    permission();
    gameLoop();
});

document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";
});

const walls = [ //Breite der Wände mal auf 2
    { x: 0, y: 0, width: 4, height: 480 }, // Linke Wand vom Canvas
    { x: 0, y: 0, width: 480, height: 1 }, // Obere Wand vom Canvas
    { x: 476, y: 0, width: 4, height: 456 }, // Rechte Wand vom Canvas
    { x: 0, y: 476, width: 480, height: 4 }, // Untere Wand vom Canvas
    //Labyrinthwände
    { x: 30, y: 1, width: 480, height: 4 },
    { x: 30, y: 34, width: 60, height: 2 },
    { x: 30, y: 34, width: 2, height: 30 },
    { x: 30, y: 64, width: 30, height: 2 },
    { x: 30, y: 94, width: 2, height: 302 },
    { x: 0, y: 394, width: 30, height: 2 },
    { x: 30, y: 424, width: 30, height: 2 },
    { x: 30, y: 454, width: 60, height: 2 },
    { x: 60, y: 64, width: 2, height: 240 },
    { x: 60, y: 334, width: 2, height: 92 },
    { x: 60, y: 154, width: 150, height: 2 },
    { x: 60, y: 244, width: 60, height: 2 },
    { x: 60, y: 304, width: 30, height: 2 },
    { x: 60, y: 394, width: 60, height: 2 },
    { x: 90, y: 34, width: 2, height: 60 },
    { x: 90, y: 124, width: 2, height: 32 },
    { x: 90, y: 184, width: 2, height: 30 },
    { x: 90, y: 304, width: 2, height: 60 },
    { x: 90, y: 424, width: 2, height: 60 },
    { x: 90, y: 94, width: 60, height: 2 },
    { x: 90, y: 184, width: 90, height: 2 },
    { x: 90, y: 274, width: 60, height: 2 },
    { x: 90, y: 364, width: 30, height: 2 },
    { x: 120, y: 4, width: 2, height: 60 },
    { x: 120, y: 214, width: 2, height: 32 },
    { x: 120, y: 274, width: 2, height: 60 },
    { x: 120, y: 364, width: 2, height: 60 },
    { x: 120, y: 64, width: 120, height: 2 },
    { x: 120, y: 124, width: 120, height: 2 },
    { x: 120, y: 214, width: 30, height: 2 },
    { x: 120, y: 334, width: 30, height: 2 },
    { x: 120, y: 424, width: 120, height: 2 },
    { x: 120, y: 454, width: 60, height: 2 },
    { x: 150, y: 94, width: 2, height: 30 },
    { x: 150, y: 244, width: 2, height: 32 },
    { x: 150, y: 334, width: 2, height: 60 },
    { x: 150, y: 34, width: 30, height: 2 },
    { x: 150, y: 244, width: 30, height: 2 },
    { x: 150, y: 304, width: 30, height: 2 },
    { x: 150, y: 364, width: 30, height: 2 },
    { x: 150, y: 394, width: 60, height: 2 },
    { x: 180, y: 4, width: 2, height: 32 },
    { x: 180, y: 64, width: 2, height: 30 },
    { x: 180, y: 184, width: 2, height: 90 },
    { x: 180, y: 304, width: 2, height: 30 },
    { x: 180, y: 424, width: 2, height: 32 },
    { x: 180, y: 274, width: 90, height: 2 },
    { x: 180, y: 334, width: 30, height: 2 },
    { x: 210, y: 94, width: 2, height: 32 },
    { x: 210, y: 154, width: 2, height: 90 },
    { x: 210, y: 334, width: 2, height: 62 },
    { x: 210, y: 454, width: 2, height: 30 },
    { x: 210, y: 34, width: 60, height: 2 },
    { x: 210, y: 184, width: 90, height: 2 },
    { x: 210, y: 244, width: 30, height: 2 },
    { x: 210, y: 304, width: 120, height: 2 },
    { x: 240, y: 34, width: 2, height: 60 },
    { x: 240, y: 154, width: 2, height: 30 },
    { x: 240, y: 304, width: 2, height: 150 },
    { x: 240, y: 94, width: 30, height: 2 },
    { x: 240, y: 154, width: 30, height: 2 },
    { x: 240, y: 214, width: 30, height: 2 },
    { x: 240, y: 364, width: 30, height: 2 },
    { x: 270, y: 94, width: 2, height: 62 },
    { x: 270, y: 214, width: 2, height: 62 },
    { x: 270, y: 364, width: 2, height: 30 },
    { x: 270, y: 424, width: 2, height: 30 },
    { x: 270, y: 64, width: 60, height: 2 },
    { x: 270, y: 244, width: 60, height: 2 },
    { x: 270, y: 334, width: 30, height: 2 },
    { x: 270, y: 424, width: 30, height: 2 },
    { x: 300, y: 34, width: 2, height: 180 },
    { x: 300, y: 274, width: 2, height: 30 },
    { x: 300, y: 334, width: 2, height: 120 },
    { x: 300, y: 124, width: 30, height: 2 },
    { x: 300, y: 364, width: 90, height: 2 },
    { x: 300, y: 454, width: 30, height: 2 },
    { x: 330, y: 4, width: 2, height: 30 },
    { x: 330, y: 94, width: 2, height: 32 },
    { x: 330, y: 154, width: 2, height: 120 },
    { x: 330, y: 304, width: 2, height: 30 },
    { x: 330, y: 394, width: 2, height: 30 },
    { x: 330, y: 454, width: 2, height: 30 },
    { x: 330, y: 34, width: 30, height: 2 },
    { x: 330, y: 94, width: 150, height: 2 },
    { x: 330, y: 154, width: 30, height: 2 },
    { x: 330, y: 394, width: 30, height: 2 },
    { x: 330, y: 424, width: 30, height: 2 },
    { x: 360, y: 34, width: 2, height: 30 },
    { x: 360, y: 124, width: 2, height: 32 },
    { x: 360, y: 184, width: 2, height: 150 },
    { x: 360, y: 424, width: 2, height: 30 },
    { x: 360, y: 124, width: 60, height: 2 },
    { x: 360, y: 214, width: 30, height: 2 },
    { x: 360, y: 334, width: 30, height: 2 },
    { x: 360, y: 454, width: 30, height: 2 },
    { x: 390, y: 34, width: 2, height: 60 },
    { x: 390, y: 124, width: 2, height: 92 },
    { x: 390, y: 244, width: 2, height: 62 },
    { x: 390, y: 334, width: 2, height: 32 },
    { x: 390, y: 394, width: 2, height: 62 },
    { x: 390, y: 34, width: 30, height: 2 },
    { x: 390, y: 244, width: 60, height: 2 },
    { x: 390, y: 304, width: 30, height: 2 },
    { x: 390, y: 394, width: 90, height: 2 },
    { x: 420, y: 4, width: 2, height: 32 },
    { x: 420, y: 154, width: 2, height: 92 },
    { x: 420, y: 304, width: 2, height: 92 },
    { x: 420, y: 424, width: 2, height: 32 },
    { x: 420, y: 64, width: 60, height: 2 },
    { x: 420, y: 274, width: 60, height: 2 },
    { x: 420, y: 334, width: 30, height: 2 },
    { x: 420, y: 424, width: 60, height: 2 },
    { x: 420, y: 454, width: 60, height: 2 },
    { x: 450, y: 34, width: 2, height: 32 },
    { x: 450, y: 124, width: 2, height: 92 },
    { x: 450, y: 304, width: 2, height: 32 },
    { x: 450, y: 34, width: 30, height: 2 },
    { x: 450, y: 124, width: 30, height: 2 },
    { x: 450, y: 214, width: 30, height: 2 },
    { x: 450, y: 364, width: 30, height: 2 },
];


function drawWalls(ctx) {
    ctx.fillStyle = "black";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

const ball = { x: 12, y: 7, radius: 6, vx: 0, vy: 0 };
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Simulate movement with arrow keys
window.addEventListener('keydown', (e) => {
    let dx = 0, dy = 0;
    const speed = 2;

    if (e.key === "ArrowUp") dy = -speed;
    if (e.key === "ArrowDown") dy = speed;
    if (e.key === "ArrowLeft") dx = -speed;
    if (e.key === "ArrowRight") dx = speed;

    updateBallPosition(ball, dx, dy)
});
/*
if(typeof DeviceMotionEvent !== "undefined") {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        //iOS: Ask for permission
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === "granted") {
                    window.addEventListener("devicemotion", handleMotion);
                } else {
                    alert("Bewegungssensor-Zugriff wurde verweigert.");
                }
            })
            .catch(console.error)
    } else {
        window.addEventListener("devicemotion", handleMotion);
    }
} else {
    alert("Dein Gerät unterstützt die Bewegungssensor-API nicht.");
}
*/
function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener( "devicemotion", (e) => {
                    // do something for 'e' here.
                })
            }
        })
            .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
    }
}

let vx = 0, vy = 0;
function handleMotion(event) {
    const acceleration = event.accelerationIncludingGravity;

    const ax = acceleration.x;
    const ay = acceleration.y;
    //Low-Pass-Filter with 80% old speed and 2ß% new
    vx = vx * 0.8 + ax * 0.2
    vy = vy * 0.8 + vy * 0.2

    updateBallPosition(ball, vx * 0.5, vy * -0.5)
}

function updateBallPosition(ball, dx, dy ) {
    const newX = ball.x + dx;
    const newY = ball.y + dy;

    let collision = false
    walls.forEach(wall => {
        if (isColliding({ x: newX, y: newY, radius: ball.radius }, wall)) {
            collision = true;
        }
    });
    if (!collision) {
        ball.x = newX;
        ball.y = newY;
    }
}

function isColliding(ball, wall) {
    return (
        ball.x + ball.radius >= wall.x &&
        ball.x - ball.radius <= wall.x + wall.width &&
        ball.y + ball.radius >= wall.y &&
        ball.y - ball.radius <= wall.y + wall.height
    );
}

window.addEventListener('keyup', () => {
    ball.vx = 0;
    ball.vy = 0;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen

    drawWalls(ctx); // Wände zeichnen
    drawBall();  // Kugel zeichnen

    requestAnimationFrame(gameLoop); // Animations-Loop
}

gameLoop();