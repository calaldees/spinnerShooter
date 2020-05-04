import {range, filterInPlace} from './core.js';

const TEMPLATES = {
    ITEM: {
        x: 0,
        y: 0,
        _xy: null,
        vx: 0,
        vy: 0,
        fx: 0,
        fy: 0,
        mass: 0,
    },
    PARTICLES: {
        thrust: {
            size: 1,
            mass: 1,
            decay_colors: [],  // TODO
            v: 3,
            expire: 10,
            random: 4,
        },
    },
    PROJECTILES: {
        bullet: {
            damage: 1,
            size: 1,
            mass: 1,
            type: null,
            v: 10,
            expire: 300,
        }
    }
};

function initParticle(template, origin, offset={}) {
    const particle = {
        ...TEMPLATES.ITEM,
        ...template,
        x: origin.x,
        y: origin.y,
        vx: origin.vx,
        vy: origin.vy,
    }
    for (let [key, value] of Object.entries(offset)) {
        if (key in particle) {particle[key] += value;}
        else                 {particle[key] = value;}
    }
    return particle;
}

function initProjectile(template, player) {
    return initParticle(
        template,
        player,
        {
            from: player,
            vx: Math.sin(player.angle) * template.v,
            vy: Math.cos(player.angle) * template.v,
        },
    );
}
function initPlayer(p) {
    p = p || 1;
    return {
        ...TEMPLATES.ITEM,
        angle: 0,  // angle
        thrust: 10,  // force
        mass: 50,
        x: p * 100,
        y: p * 100,
        weapon: 'bullet',
    }
}

export function initState() {
    return {
        settings: {
            display: {
                width: 0,
                height: 0,
            },
            history: {
                ticks: 3,
            },
            players: {
                player1: {
                    spinner_calibration_factor: (Math.PI * 1) / 360,
                },
                player2: {
                    spinner_calibration_factor: (Math.PI * 1) / 360,
                },
                player3: {
                    spinner_calibration_factor: (Math.PI * 1) / 360,
                },
                player4: {
                    spinner_calibration_factor: (Math.PI * 1) / 360,
                },
            },
        },
        input: {},
        items: {
            particles: [],
            projectiles: [],
            players: {
                player1: initPlayer(1),
                player2: initPlayer(2),
                player3: initPlayer(3),
                player4: initPlayer(4),
            }
        },
        tick: 0,
    };
}

export function incrementModel(state) {
    processInput(state.input, state.items, state.settings.players);
    state.input = {...state.input, ...Object.keys(state.items.players).reduce((acc, player)=>{acc[player]=0; return acc;},{}) };
    applyForces(state.items);
    bounce(state.items, state.settings.display);
    expire(state.items, state.settings.display);
    state.tick += 1;
    return state;
}

export default {
    initState,
    incrementModel,
}

// Private ---------------------------------------------------------------------

function processInput(input, items, player_settings) {
    for (let playerId of Object.keys(items.players)) {
        const player = items.players[playerId];
        if (playerId in input && input[playerId]) {
            const spinner_calibration_factor = player_settings[playerId].spinner_calibration_factor || 0;
            player.angle = (
                player.angle + (input[playerId] * spinner_calibration_factor)
            ) % (Math.PI * 2);
        }

        if (input[`${playerId}_thrust`]) {
            applyThrustForce(player);
            const template = TEMPLATES.PARTICLES['thrust'];
            for (let i of range(2)) {
                items.projectiles.push(
                    initParticle(template, player, {
                        vx: Math.sin(player.angle-Math.PI) * (template.v + (Math.random() * template.random)),
                        vy: Math.cos(player.angle-Math.PI) * (template.v + (Math.random() * template.random)),
                    })
                )
            }
        }

        if (input[`${playerId}_shoot`]) {
            items.projectiles.push(
                initProjectile(TEMPLATES.PROJECTILES[player.weapon], player)
            );
        }

    }
}

function applyForces(items) {
    for (let item of items.particles) {
        applyForceToItem(item);
    }
    for (let item of [
        ...Object.values(items.players),
        ...items.projectiles,
    ]) {
        applyForceToItem(item);
        maintainHistory(item);
    }
}
function applyForceToItem(u) {
    u.vx += (u.fx / u.mass);
    u.vy += (u.fy / u.mass);
    u.x += u.vx;
    u.y += u.vy;
    u.fx = 0;
    u.fy = 0;
}
function maintainHistory(u, maxHistory=3) {
    if (u._xy == null) {u._xy=[];}  // Not very good. We check for creation on every tick
    const history = u._xy;
    if (history.unshift([u.x, u.y]) > maxHistory) {
        history.pop();
    }
}

function expire(items, display) {
    for (let array of [
        items.particles,
        items.projectiles,
    ]) {
        filterInPlace(array, (p) => !(
            p.x < 0 ||
            p.y < 0 ||
            p.x > display.width ||
            p.y > display.height ||
            p.expire-- == 0 ||
            false
        ));
    }
}

function bounce(items, display) {
    for (let p of [
        ...items.projectiles,
        ...Object.values(items.players),
    ]) {
        if (p.x < 0 || p.x > display.width) {
            p.x = Math.min(Math.max(p.x, 0), display.width);
            p.vx = -p.vx * 0.7;
        }
        if (p.y < 0 || p.y > display.height) {
            p.y = Math.min(Math.max(p.y, 0), display.height);
            p.vy = -p.vy * 0.7;
        }
    }
}

function applyThrustForce(u) {
    u.fx += u.thrust * Math.sin(u.angle);
    u.fy += u.thrust * Math.cos(u.angle);
}

