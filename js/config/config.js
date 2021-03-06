"use strict"

const Config = {

    _init: () => {
        Config.INTERVAL = 1000 / (Config.GAME_UPDATE_RATE * Config.GAME_SPEED)
        Config.TANK_SPEED /= Config.GAME_UPDATE_RATE
        Config.BULLET_SPEED /= Config.GAME_UPDATE_RATE
        Config.TANK_COOLDOWN *= Config.GAME_UPDATE_RATE

        Config.UI_INTERVAL = 1000 / Config.FPS
    },

    // debug
    DEBUG_LOG: true,
    DEBUG_COLLIDE: false,

    // basic
    GAME_UPDATE_RATE: 50,
    GAME_SPEED: 5,
    FPS: 30,
    GAME_TIMEOUT: 60 * 1000,
    DEFAULT_CONTROL_MODE: 'mouse',
    PLAYER_ID: 'player',
    DUMP_FREQUENCY: 1000,

    // agent
    // AGENT_ID: ['bot0', 'bot1', 'bot2', 'bot3', 'bot4', 'bot5', 'bot6', 'bot7', 'bot8', 'bot9'],
    // AGENT_TYPE: ['dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn'],
    // AGENT_ID: ['bot0', 'bot1', 'bot2'],
    // AGENT_TYPE: ['dqn', 'dqn', 'dqn'],
    AGENT_ID: ['bot0', 'bot1'],
    AGENT_TYPE: ['dqn', 'simple'],

    // canvas
    CANVAS_ID: 'game',
    BACKGROUND_COLOR: 'rgb(0, 0, 0)',

    // grid
    GRID_X: 400,
    GRID_Y: 225,

    // pattern
    PATTERN_COLOR: 'rgb(255, 255, 255)',

    // tank
    TANK_WIDTH: 11,
    TANK_HEIGHT: 11,
    TANK_SPEED: 20,
    TANK_COLOR: 'rgb(255, 255, 255)',
    ALLY_COLOR: 'rgb(0, 255, 0)',
    ENEMY_COLOR: 'rgb(255, 0, 0)',
    TANK_HP: 10,
    TANK_COOLDOWN: 1,

    // bullet
    BULLET_WIDTH: 1,
    BULLET_HEIGHT: 3,
    BULLET_SPEED: 100,
    BULLET_COLOR: 'rgb(255, 0, 0)',
    BULLET_ATTACK: 1,

    // cd indicator
    CD_COLOR: 'rgb(0, 255, 255)',

    // hp indicator
    HP_HEIGHT: 2,
    HP_COLOR: 'rgb(255, 0, 0)',
    HP_COLOR_REMAIN: 'rgb(0, 255, 0)',

    // reward
    REWARD_ATTACK: 2,
    REWARD_DAMAGE: -1,
    REWARD_DIE: -15
}

Config._init()
