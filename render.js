import {previousValueIterator} from './core.js';

export function render(ctx, state) {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, state.settings.display.width, state.settings.display.height);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    for (let player of ['player1', 'player2', 'player3', 'player4']) {
        ship(ctx, state.items.players[player]);
    }

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    for (let p of state.items.projectiles) {
        projectile(ctx, p);
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

    ctx.strokeStyle = 'red';
    ctx.moveTo(x, y);
    ctx.lineTo(
        x + Math.sin(angle) * s,
        y + Math.cos(angle) * s,
    );
    ctx.stroke();
}

function projectile(ctx, p) {
    const s = Math.floor(p.size / 2);
    ctx.fillRect(p.x-s, p.y-s, p.size, p.size);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    for (let [x, y] of p._xy) {
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

export default {
    render,
}