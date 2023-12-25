// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

// ships are radius `1` - so a width of 2 and a height of 2. 0,0 is center. so -1,-1 to +1,+1

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
    p.rect(-0.1,0.8,0.2,-1.6)
    p.arc(0, 0.8, 0.4, 0, Math.PI*2, false)
    p.moveTo(-1,0)
    p.arc(0, 0, 1, 0, Math.PI, true)
    //p.arc(0, 0, 0.8, 0, Math.PI, false)
    //p.moveTo(0,0)
    //p.arc(0, 0, 0.8, 0, Math.PI, true)
    pp.push(p)

    p = new Path2D()
    
    pp.push(p)

    return pp
}


const ships = [ship0(), ship1(), ship2()]
export {
    ships
}
