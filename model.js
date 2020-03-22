export function initState() {
    return {
        players: {
            spinner1: 0,
            spinner2: 0,
            spinner3: 0,
            spinner4: 0,
        }
    };
}

export function incrementModel(state) {
    return state;
}

export default {
    initState,
    incrementModel,
}