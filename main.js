import {initState, incrementModel} from './model.js'
import {render} from './render.js';

onmessage = function(evt) {
    const canvas = evt.data.canvas;
    //const gl = canvas.getContext("webgl");
    const ctx = canvas.getContext('2d');
    const state = initState();

    function main(time) {
        incrementModel(state);
        render(ctx, state);
        requestAnimationFrame(main);
    }
    requestAnimationFrame(main);
};
