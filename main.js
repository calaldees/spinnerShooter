import {} from './core.js';
import {initState, incrementModel} from './model.js';
import {render} from './render.js';

console.log("main.js")

var running = true;
var canvas;
var ctx;
const state = initState();


onmessage = function(event) {
    if (event.data.message == 'init') {
        console.log("webworker init")
        canvas = event.data.canvas;
        ctx = canvas.getContext('2d', { alpha: false });
        state.settings.display.width = canvas.width;
        state.settings.display.height = canvas.height;
        setpixelated(ctx);
        //const gl = canvas.getContext("webgl");
        requestAnimationFrame(main);
    }
    else if (event.data.message == 'resize') {
        canvas.width = state.settings.display.width = event.data.width;
        canvas.height = state.settings.display.height = event.data.height;
    }
    else if (event.data.message == 'input') {
        if (!running) {return}
        state.input = {...state.input, ...event.data};
        //console.log(`input ${JSON.stringify(event.data, null, "  ")}`);
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


function setpixelated(context) {
    // https://stackoverflow.com/a/32798277/3356840
    context['imageSmoothingEnabled'] = false;       /* standard */
    context['mozImageSmoothingEnabled'] = false;    /* Firefox */
    context['oImageSmoothingEnabled'] = false;      /* Opera */
    context['webkitImageSmoothingEnabled'] = false; /* Safari */
    context['msImageSmoothingEnabled'] = false;     /* IE */

    // https://stackoverflow.com/a/3279863/3356840
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#A_lineWidth_example
    context.translate(0.5, 0.5);
}
