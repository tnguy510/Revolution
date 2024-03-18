//Sstarting integration in json file
//Maybe check typeText to check for what scene it is in and pause the json file in order to
//ask for player input
//Errors:

//To Do List: Add in Rod and Yu 2nd events. 
//First event on day 0 will be the introduction to the Princes
//Look into being able to remember current position in the subject jsons
//Exam section
//Audio and sound elements


"use strict"

// game config
let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    pixelArt: true,
    scene: [Load, Keys, Title, Settings, Intro, Classroom, Events, Events2, EndofDay, StudyEvent]
    //Load, Title, Intro, Classroom, WeekEvents, SpecialEvents
}

const game = new Phaser.Game(config)

// globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
const OFFSCREEN_X = -500        // x,y values to place characters offscreen
const OFFSCREEN_Y = 1000

// dialog constants
// # ms each letter takes to "type" onscreen
const DBOX_X = game.config.width / 5       // dialog box x-position
const DBOX_Y = game.config.height * 2 / 3	// dialog box y-position
const DBOX_FONT = 'gem_font'	    // dialog box font key

const TEXT_X = game.config.width / 5  + 50			    // text w/in dialog box x-position
const TEXT_Y = DBOX_Y + 45			    // text w/in dialog box y-position
const TEXT_SIZE = 32		        // text font size (in pixels)
const TEXT_MAX_WIDTH = 715	    // max width of text within box

const NEXT_TEXT = '[SPACE]'	    // text to display for next prompt
const NEXT_X = game.config.width / 5 + 775			    // next text prompt x-position
const NEXT_Y = TEXT_Y + 180			    // next text prompt y-position

const LETTER_TIMER = 10	
const tweenDuration = 500


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
var classCounter, dayCounter
var thaneAffectionLevel, rodAffectionLevel, yuAffectionLevel