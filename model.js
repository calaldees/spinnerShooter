function initPlayer(p) {
    return {
        x: p * 100,
        y: p * 100,
        angle: 0,  // angle
        thrust: 10,  // force
        vx: 0,  // velocity x
        vy: 0,  // velocity y
        mass: 50,  // mass
        fx: 0,
        fy: 0,
    }
}

export function initState() {
    return {
        settings: {
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
        units: {
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
    processInput(state.input, state.units.players, state.settings.players);
    state.input = {};
    moveUnits(state.units);
    return state;
}

export default {
    initState,
    incrementModel,
}

// Private ---------------------------------------------------------------------

function processInput(input, players, player_settings) {
    for (let playerId of ['player1', 'player2', 'player3', 'player4']) {
        const player = players[playerId];
        if (playerId in input && input[playerId]) {
            const spinner_calibration_factor = player_settings[playerId].spinner_calibration_factor || 0;
            player.angle = (
                player.angle + (input[playerId] * spinner_calibration_factor)
            ) % (Math.PI * 2);
        }

        if (input[`${playerId}_thrust`]) {
            applyThrustForce(player);
        }
    }
}

function moveUnits(units) {
    for (let unit of Object.values(units.players)) {
        applyForce(unit);
    }
}

function applyForce(u) {
    u.vx = (u.fx / u.mass);
    u.vy = (u.fy / u.mass);
    u.x += u.vx;
    u.y += u.vy;
}

function applyThrustForce(u) {
    u.fx += u.thrust * Math.sin(u.angle);
    u.fy += u.thrust * Math.cos(u.angle);
}

