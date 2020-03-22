import {initState, incrementModel} from './model.js'
import {render} from './render.js';

var running = true;
var canvas;
var ctx;
const state = initState();

const spinner_calibration_factor = (Math.PI * 1) / 360 ;
//let cc = 0;

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
    else if (event.data.message == 'input') {
        if (!running) {return}
        //console.log(`input ${JSON.stringify(event.data, null, "  ")}`);
        //cc += event.data.spinner1;
        console.log(event.data);
        for (let spinnerId of ['spinner1', 'spinner2', 'spinner3', 'spinner4']) {
            if (spinnerId in state.players && event.data[spinnerId]) {
                state.players[spinnerId] += (event.data[spinnerId] * spinner_calibration_factor);
                state.players[spinnerId] = state.players[spinnerId] % (Math.PI * 2);
            }
        }
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

