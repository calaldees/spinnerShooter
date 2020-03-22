export function initState() {
    return {
        players: {
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
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