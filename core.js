export function clearObject(obj) {
    for (let key in obj) {
        delete obj[key];
    }
}

export default {}