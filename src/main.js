//Sstarting integration in json file
//Maybe check typeText to check for what scene it is in and pause the json file in order to
//ask for player input
//Errors:

//To Do List: Add in Rod and Yu events. 
//Last event before exams should be player attempting to ask one of the princes for study help.
//Princes will help if their affection is high enough
//Look into being able to remove a certain event from the event array
    //Probably with turning the array into a global variable
//Same thing with current position in the subject jsons
//Exam section
//Audio and sound elements


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
const OFFSCREEN_X = -500        // x,y values to place characters offscreen
const OFFSCREEN_Y = 1000
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
var classCounter, thaneAffection, dayCounter