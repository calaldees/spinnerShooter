import {initState, incrementModel} from './model.js'
import {render} from './render.js';

var running = true;
var canvas;
var ctx;
const state = initState();


onmessage = function(event) {
    if (event.data.message == 'init') {
        canvas = event.data.canvas;
        ctx = canvas.getContext('2d', { alpha: false });
        //const gl = canvas.getContext("webgl");
        requestAnimationFrame(main);
    }
    else if (event.data.message == 'resize') {
        canvas.width = event.data.width;
        canvas.height = event.data.height;
    }
    else if (event.data.message == 'input' && running) {
        console.log(`input ${JSON.stringify(event.data, null, "  ")}`);
    }
    else if (event.data.message == 'pause') {
        running = event.data.running;
        console.log(`running ${running}`);
        if (running) {
            requestAnimationFrame(main);
        }
    }
    else {
        console.warn(`unknown message type ${event.data.message}`);
    }
};


function main(time) {
    if (ctx) {
        incrementModel(state);
        render(ctx, state);
    }
    if (running) {
        requestAnimationFrame(main);
    }
}

