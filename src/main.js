//ask about TypeError with menu buttons


"use strict"

// game config
let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    pixelArt: true,
    scene: [Load, Keys, Title, Intro]
    //Load, Title, Intro, Classroom, WeekEvents, SpecialEvents
}

const game = new Phaser.Game(config)

// globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null

let menuConfig = {
    fontFamily: 'Sans Serif',
    fontSize: '48px',
    color: '#FFFFFF',
    align: 'middle',
    padding: {
        top: 5,
        bottom: 5,
    }
}

var keyUP, keyDOWN, keySPACE