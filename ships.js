// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

// ships are radius `1` - so a width of 2 and a height of 2. 0,0 is center. so -1,-1 to +1,+1


function normalise_svg_path(svg_path_string) {
    const REGEX_coord = /([\d.-]+),([\d.-]+)/g
    const [min_x, min_y, max_x, max_y] = [...svg_path_string.matchAll(REGEX_coord)]
        .reduce(
            (acc, match_array) => {acc.push(match_array.slice(1)); return acc},
            []
        )
        .reduce(
            ([min_x, min_y, max_x, max_y],[x,y]) => [Math.min(min_x, x), Math.min(min_y, y), Math.max(max_x, x), Math.max(max_y, y)],
            [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER]
        )
    const [width, height] = [max_x-min_x, max_y-min_y]
    console.log([min_x, min_y, max_x, max_y], [width, height])
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#replacing_a_fahrenheit_degree_with_its_celsius_equivalent
    return svg_path_string.replace(REGEX_coord, (_, x, y)=>{
        return `${((x-min_x)/width)*2-1},${(y-min_y)/height*2-1}`
    })
}
console.assert(normalise_svg_path("M 12.0,6.0 c 6,0 x 0,12")=="M 1,0 c 0,-1 x -1,1")
console.assert(normalise_svg_path("M 2,2 c -2,-2 x 1,1")=="M 1,1 c -1,-1 x 0.5,0.5")


function ship0() {
    // Test ship - circle and line
    const pp = []
    let p

    p = new Path2D()
    p.arc(0, 0, 1, 0, Math.PI*2, false);
    pp.push(p)

    p = new Path2D()
    //p.lineTo(0, -1)
    p.rect(0,0,0.1,1)
    pp.push(p)

    return pp
}

function ship1() {
    const pp = []
    let p
    
    p = new Path2D()
    //p.rect(-0.1, 1, 0.1, -1)
    p.rect(-1,-1,2,2)
    pp.push(p)

    p = new Path2D()
    p.rect(-0.5, -0.25, 1, 0.2)
    pp.push(p)

    return pp
}

function ship2() {
    const pp = []
    let p
    
    p = new Path2D()
    p.arc(0, 0.8, 0.4, 0, Math.PI*2, false)
    p.rect(-0.1,0.8,0.2,-1.6)
    p.moveTo(-1,0)
    p.moveTo(0,1)
    p.arcTo(0, 0.8, 0.4, 0, Math.PI*2, false)
    
    //p.moveTo(-1,0)
    //p.arc(0, 0, 1, 0, Math.PI, true)
    //p.arc(0, 0, 0.8, 0, Math.PI, false)
    //p.moveTo(0,0)
    //p.arc(0, 0, 0.8, 0, Math.PI, true)
    pp.push(p)

    p = new Path2D()
    
    pp.push(p)

    return pp
}

function ship3() {
    const pp = []
    let path = "M 36.783203,-0.12890625 C 30.148191,-0.12918785 24.769357,5.4446524 24.769531,12.320312 c 0.0026,5.487982 1.356523,10.326814 6.426658,11.91211 l 0.02658,34.962093 C 32.126764,69.484718 9.2533775,59.109761 8.7879949,40.14507 L -0.29950526,39.008449 C -1.0149334,68.387831 28.022488,74.114322 39.009017,74.985744 c 15.561114,-0.4308 35.479339,-20.15738 34.358939,-35.651338 -1.001642,0.918906 -9.010214,-0.6676 -9.218177,0.688429 C 62.117187,53.276418 42.363184,73.427726 42.536108,59.082299 L 41.996753,24.356911 c 5.069362,-1.586028 6.795846,-6.549173 6.798171,-12.036599 1.74e-4,-6.8748692 -5.37747,-12.44838216 -12.011719,-12.44921825 z"
    console.log(path, "\n\n", normalise_svg_path(path))
    //path = normalise_svg_path(path)
    pp.push(new Path2D(path))
    return pp
}


const ships = [ship0(), ship1(), ship2(), ship3()]
export {
    ships
}
