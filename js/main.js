"use strict"

window.onload = () => {
    Main.main()
    // Main.debug()
}

let log

class Main {
    static main() {
        Main.log = Config.DEBUG_LOG
        Main._toggleLog(false) 
        Main._setDescription()
        document.getElementById('control-mode').onclick = () => {
            Main._toggleControlMode()
        }
        document.getElementById('description').onclick = () => {
            Main._toggleDescription()
        }
        document.getElementById('log').onclick = () => {
            Main._toggleLog(true)
        }
    
        Main._initActionController()

        Main.episode = 0
        Main._initAgents()
        const canvas = document.getElementById(Config.CANVAS_ID)
        Main.updateTankGame(canvas)
    }

    static _setDescription() {
        const div = document.getElementById('description-content')
        if (div === null) return
        for (let action in KeyActions) {
            let description = "[" + action + "]" + " : " + KeyActions[action].description
            div.innerHTML += "<p>" + description + "</p>"
        }
    }

    static _initActionController() {
        Main.mActionController = ActionController.new()
        if(this.player != undefined) {
            Main.controlMode = Config.DEFAULT_CONTROL_MODE
        } else {
            Main.controlMode = 'test'
        }
        Main._toggleControlMode('KEEP')
    }

    static _initAgents() {
        Main.agentId = Config.AGENT_ID
        Main.agentType = Config.AGENT_TYPE
        Main.agents = []
        let agent
        for (let i = 0; i < Config.AGENT_ID.length; i++) {
            if(Main.agentType[i] === 'agent') {
                agent = TankAgent.new()
            } else if(Main.agentType[i] === 'simple') {
                agent = SimpleAiTankAgent.new()
            } else if(Main.agentType[i] === 'dqn') {
                agent = DqnAiTankAgent.new()
            } else {
                agent = AiTankAgent.new()
            }
            if (Main.agentId[i] === Config.PLAYER_ID) {
                Main.player = agent
            }
            Main.agents.push(agent)
        }
    }

    static _setAgents() {
        for (let i = 0; i < Config.AGENT_ID.length; i++) {
            Main.agents[i].die = false
            Main.mTankGame.setAgent(i, Main.agents[i])
        }
    }

    static updateTankGame(canvas) {
        log('Episode ' + Main.episode)
        Main.mTankGame = TankGame.new(Main.episode, canvas,
            Vector.new(Config.GRID_X, Config.GRID_Y), Main.agentId)
        Main.mActionController.game = Main.mTankGame
        Main._setAgents()
        if(Main.player) {
            Main.mTankGame.setPlayer(Main.player)
        }
        Main.mTankGame.start()
        Main.episode++
    }

    static _toggleControlMode(controlMode) {
        if (controlMode != 'KEEP') {
            Main.mActionController.removeActions(Main.controlMode)
            if (Main.controlMode === 'test') {
                Main.controlMode = 'mouse'
            } else if(Main.controlMode === 'mouse') {
                Main.controlMode = 'keyboard'
            } else {
                Main.controlMode = 'test'
            }
        }
        Main.mActionController.addActions(Main.controlMode)
        document.getElementById('control-mode').value = 'Control by ' + Main.controlMode
    }

    static _toggleDescription() {
        const div = document.getElementById('description-content')
        if (div.style.visibility === 'visible') {
            div.style.visibility = 'hidden'
        } else if (div.style.visibility === 'hidden') {
            div.style.visibility = 'visible'
        } else {
            div.style.visibility = 'hidden'
        }
    }

    static _toggleLog(change) {
        if(change) {
            Main.log = !Main.log
        }
        if(Main.log) {
            log = console.log.bind(console)
        } else {
            log = () => {}
        }
        document.getElementById('log').value = 'Log: ' + Main.log
    }

    static debug() {
        Main.log = Config.DEBUG_LOG
        Main._toggleLog(false)

        const nn = NeuralNetwork.new(3, 3, 1)
        const input = [[1, 1, 1]]
        const actualOutput = [0.8]
        log('DEBUG')
        let out, loss
        for(let i = 0; i < 100; i++) {
            nn.input(input[0])
            out = nn.output()
            loss = actualOutput[0] - out
            nn.updateWeight(input[0], 0, loss)
            if(i % 10 === 0) log('out', out)
        }
    }
}
