export function render(ctx, state) {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI*2, 0);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.moveTo(100,100);
    ctx.lineTo(100,150);
    ctx.stroke();
}

export default {
    render,
}