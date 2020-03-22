export function render(ctx, state) {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

   ship(ctx, 100,100, state.players.s1);
}

function ship(ctx, x, y, d) {
    x = Math.floor(x);
    y = Math.floor(y);
    d = d % Math.PI*2;
    const s = 20;

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, s, 0, Math.PI*2, false);
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.moveTo(x, y);
    ctx.lineTo(
        x + Math.sin(d) * s,
        y + Math.cos(d) * s,
    );
    ctx.stroke();
}

export default {
    render,
}