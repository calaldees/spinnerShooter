import {initState, incrementModel} from './model.js'
import {render} from './render.js';

var canvas;
var ctx;

onmessage = function(event) {
    if (event.data.message == 'canvas') {
        canvas = event.data.canvas;
        ctx = canvas.getContext('2d');
        //const gl = canvas.getContext("webgl");
    }
    else if (event.data.message == 'resize') {
        canvas.width = event.data.width;
        canvas.height = event.data.height;
    }
    else if (event.data.message == 'input') {
        console.log(`input ${JSON.stringify(event.data, null, "  ")}`);
    }
    else {
        console.warn(`unknown message type ${event.data.message}`);
    }
};

const state = initState();
function main(time) {
    if (ctx) {
        incrementModel(state);
        render(ctx, state);
    }
    requestAnimationFrame(main);
}
requestAnimationFrame(main);
