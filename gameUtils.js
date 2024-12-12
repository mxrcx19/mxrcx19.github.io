export function drawWalls(ctx, walls) {
    ctx.fillStyle = "grey";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}