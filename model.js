import {filterInPlace} from './core.js';

const TEMPLATES = {
    ITEM: {
        x: 0,
        y: 0,
        _xy: [],
        vx: 0,
        vy: 0,
        fx: 0,
        fy: 0,
        mass: 0,
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


function initProjectile(player, template) {
    return {
        ...TEMPLATES.ITEM,
        ...template,
        from: player,
        x: player.x,
        y: player.y,
        vx: player.vx + (Math.sin(player.angle) * template.v),
        vy: player.vy + (Math.cos(player.angle) * template.v),
    }
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
            projectiles: [],
            players: {
                player1: initPlayer(1),
                player2: initPlayer(2),
                player3: initPlayer(3),
                player4: initPlayer(4),
            }
        }
    };
}

export function incrementModel(state) {
    processInput(state.input, state.items, state.settings.players);
    state.input = {};
    applyForces(state.items);
    expireProjectiles(state.items.projectiles, state.settings.display);
    return state;
}

export default {
    initState,
    incrementModel,
}

// Private ---------------------------------------------------------------------

function processInput(input, items, player_settings) {
    for (let playerId of ['player1', 'player2', 'player3', 'player4']) {
        const player = items.players[playerId];
        if (playerId in input && input[playerId]) {
            const spinner_calibration_factor = player_settings[playerId].spinner_calibration_factor || 0;
            player.angle = (
                player.angle + (input[playerId] * spinner_calibration_factor)
            ) % (Math.PI * 2);
        }

        if (input[`${playerId}_thrust`]) {
            applyThrustForce(player);
        }

        if (input[`${playerId}_shoot`]) {
            items.projectiles.push(
                initProjectile(player, TEMPLATES.PROJECTILES[player.weapon])
            );
        }

    }
}

function applyForces(items) {
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
    const history = u._xy;
    if (history.unshift([u.x, u.y]) > maxHistory) {
        history.pop();
    }
}

function expireProjectiles(projectiles, display) {
    filterInPlace(projectiles, (p) => (
        p.x < 0 ||
        p.y < 0 ||
        p.x > display.width ||
        p.y > display.height ||
        p.expire-- == 0 ||
        false
    ))
}

function applyThrustForce(u) {
    u.fx += u.thrust * Math.sin(u.angle);
    u.fy += u.thrust * Math.cos(u.angle);
}

