import {previousValueIterator, zip} from './core.js'
import {ships} from './ships.js'

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
    for (let p of state.items.particles) {
        particle(ctx, p);
    }
    for (let p of state.items.projectiles) {
        projectile(ctx, p);
    }

}

function ship(ctx, u) {
    const x = Math.floor(u.x);
    const y = Math.floor(u.y);
    const angle = u.angle;
    const s = u.size;

    const ship_paths = ships[3]
    const colors = ['white', 'red']

    const t = ctx.getTransform()
    ctx.translate(x,y)
    ctx.rotate(-angle)
    ctx.scale(s,s)
    for (let [path, color] of zip(ship_paths, colors)) {
        ctx.fillStyle = color
        ctx.fill(path)
    }
    ctx.setTransform(t)
}

function particle(ctx, p) {
    const c = p.decay_colors[p.expire];
    ctx.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    const s = Math.floor(p.size / 2);
    ctx.fillRect(p.x-s, p.y-s, p.size, p.size);
    ctx.fill();
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