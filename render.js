export function render(ctx, state) {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    for (let player of ['player1', 'player2', 'player3', 'player4']) {
        ship(ctx, state.items.players[player]);
    }

    ctx.fillStyle = 'rgb(255, 255, 255)';
    for (let p of state.items.projectiles) {
        const s = Math.floor(p.size / 2);
        ctx.fillRect(p.x-s, p.y-s, p.size, p.size);
    }

}

function ship(ctx, u) {
    const x = Math.floor(u.x);
    const y = Math.floor(u.y);
    const angle = u.angle;
    const s = 20;

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, s, 0, Math.PI*2, false);
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.moveTo(x, y);
    ctx.lineTo(
        x + Math.sin(angle) * s,
        y + Math.cos(angle) * s,
    );
    ctx.stroke();
}

function projectile() {

}

export default {
    render,
}