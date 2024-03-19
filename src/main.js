//Name: Trish Nguyen
//Phaser Components used. Camerias, text objects, tween manager(through Nathan's function), timers(through Nation's function),
//global variables

//Disclaimer: Class dialouge does not have enoug material to make it through the week and there is no final exam at the end of the week
//to close out the game
//I believe that the sheer amount of writing that went into the game should count for extra polish as well as
//working with Nathan's function which, while documented very well, gave me a couple bugs that I had to debug myself without
//the help of the community

"use strict"

// game config
let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    pixelArt: true,
    scene: [Load, Keys, Title, Settings, Credits, Intro, Classroom, Events, Events2, EndofDay, Exam]
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
    fontFamily: 'Mix Serif',
    fontSize: '72px',
    color: '#F1c232',
    align: 'middle',
    padding: {
        top: 5,
        bottom: 5,
    }
}

let textConfig = {
    fontFamily: 'Arial',
    fontSize: '16px',
    color: '#ffffff',
    align: 'middle',
    padding: {
        top: 5,
        bottom: 5,
    }
}

var keyUP, keyDOWN, keySPACE, keyESC
let playerName
var classCounter, dayCounter, ettiqueteLine
var thaneAffectionLevel, rodAffectionLevel, yuAffectionLevel