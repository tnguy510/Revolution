//Sstarting integration in json file
//Maybe check typeText to check for what scene it is in and pause the json file in order to
//ask for player input
//Errors:


"use strict"

// game config
let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    pixelArt: true,
    scene: [Load, Keys, Title, Settings, Intro, Classroom, Events, EndofDay]
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

let textConfig = {
    fontFamily: 'Arial',
    fontSize: '16px',
    color: '#FFFFFF',
    align: 'middle',
    padding: {
        top: 5,
        bottom: 5,
    }
}

var keyUP, keyDOWN, keySPACE, keyESC
let playerName
var classCounter, thaneAffection