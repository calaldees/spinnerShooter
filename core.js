export function clearObject(obj) {
    for (let key in obj) {
        delete obj[key];
    }
}


// https://stackoverflow.com/a/37319954/3356840
export function filterInPlace(a, condition, thisArg) {
    let j = 0;
    a.forEach((e, i) => {
        if (condition.call(thisArg, e, i, a)) {
            if (i!==j) a[j] = e;
            j++;
        }
    });
    a.length = j;
    return a;
}

export default {}