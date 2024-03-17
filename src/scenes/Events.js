class Events extends Phaser.Scene {
    constructor() {
        super('eventScene')
    }
    create(){
        // dialog constants
        this.DBOX_X = 0      // dialog box x-position
        this.DBOX_Y = game.config.height * 2 / 3			    // dialog box y-position
        this.DBOX_FONT = 'gem_font'	    // dialog box font key
        
        this.TEXT_X = 50			    // text w/in dialog box x-position
        this.TEXT_Y = this.DBOX_Y + 45			    // text w/in dialog box y-position
        this.TEXT_SIZE = 32		        // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715	    // max width of text within box
       
        this.NEXT_TEXT = '[SPACE]'	    // text to display for next prompt
        this.NEXT_X = 775			    // next text prompt x-position
        this.NEXT_Y = this.TEXT_Y + 180			    // next text prompt y-position

        this.LETTER_TIMER = 10		    // # ms each letter takes to "type" onscreen
       
        // dialog variables
        this.dialogConvo = 0			// current "conversation"
        this.dialogLine = 0			    // current line of conversation
        this.dialogSpeaker = null		// current speaker
        this.dialogLastSpeaker = null	// last speaker
        this.dialogTyping = false		// flag to lock player input while text is "typing"
        this.dialogText = null			// the actual dialog text
        this.nextText = null			// player prompt text to continue typing
       
        // character variables
        this.claire = null
        this.misha = null
        this.rod = null
        this.thane = null
        this.yu = null

        this.minerva = null
        this.tweenDuration = 500
       
        this.OFFSCREEN_X = -500        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000
       
        // parse dialog from JSON file
        this.thaneEvent = this.cache.json.get('thaneDialog')
        this.thaneAffection = false
        //3 choices should be
        //Wait for him to finish before talking
        //Emerge and compliment him on his playing
        //Leave, this seems like a private moment
        this.rodEvent = this.cache.json.get('rodDialog')

        //this.dialogEvents = [this.thaneEvent, this.rodEvent]
        //var dialogRandom = this.dialogEvents[Phaser.Math.RND.integerInRange(0, 1)]

        var dialogRandom = this.rodEvent

        this.dialog = dialogRandom

        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'classroomBG').setScale(.75).setOrigin(0.5, 0.5)

        const choice1 = this.add.image(this.OFFSCREEN_X, centerY / 3, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        const choice2 = this.add.image(choice1.x, choice1.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        const choice3 = this.add.image(choice2.x, choice2.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()

        const escButton = this.add.image(centerX + centerX /2, game.config.height - 64, 'glass-panel').setDisplaySize(200, 100)
        this.add.text(escButton.x - 64, escButton.y - 16, 'ESC to return', textConfig)
        this.add.text(escButton.x - 64, escButton.y , 'to TitleScreen', textConfig)
       
        // ready the character dialog images offscreen
        this.claire = this.add.sprite(this.OFFSCREEN_X, game.config.height, 'Claire').setOrigin(0, 1).setScale(.5)
        this.misha = this.add.sprite(this.OFFSCREEN_X, game.config.height, 'Misha').setOrigin(0, 1).setScale(.5)
        this.rod = this.add.sprite(this.OFFSCREEN_X, game.config.height, 'Rod').setOrigin(0, 1).setScale(.5)
        this.thane = this.add.sprite(this.OFFSCREEN_X, game.config.height, 'Thane').setOrigin(0, 1).setScale(.5)
        this.yu = this.add.sprite(this.OFFSCREEN_X, game.config.height, 'Yu').setOrigin(0, 1).setScale(.5)

        this.minerva = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'minerva').setOrigin(0, 1)
              
        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0)
        this.dialogbox.scaleY = 2
       
        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)
       
        // input
        cursors = this.input.keyboard.createCursorKeys()

        // start first dialog conversation
        this.loadScene = this.scene.get('loadScene')
        this.loadScene.typeText(this)     

        this.titleScene = this.scene.get('titleScene')
        this.event = null
        
        //selection buttons items
        this.buttonAppear = false
        this.selectedButtonIndex = 0

        this.buttons = [choice1, choice2, choice3]

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand')

        this.textOption1 = this.add.text(centerX, this.buttons[0].y - 10, 'Wait for him to finish before talking.',textConfig).setOrigin(0.5).setVisible(false)
        this.textOption2 = this.add.text(centerX, this.buttons[1].y, 'Emerge and compliment him on his playing.',textConfig).setOrigin(0.5).setVisible(false)
        this.textOption3 = this.add.text(centerX, this.buttons[2].y, 'Leave, this seems like a private moment.',textConfig).setOrigin(0.5).setVisible(false)

        //Text for Thane Liking You
        this.textOption4 = this.add.text(centerX, this.buttons[0].y - 10, '"You play very well."',textConfig).setOrigin(0.5).setVisible(false)
        this.textOption5 = this.add.text(centerX, this.buttons[1].y, '"I think you have room for improvement."',textConfig).setOrigin(0.5).setVisible(false)
        this.textOption6 = this.add.text(centerX, this.buttons[2].y, '"I didn\'t like the music.',textConfig).setOrigin(0.5).setVisible(false)

        this.titleScene.selectButton(0, this)
        this.cameras.main.fadeIn(1000)

        //Check what time of day it is
        if(classCounter == 0){
            console.log("morning event")
        }
        else if(classCounter == 1){
            console.log("afternoon event")
        }
        else if(classCounter == 3){
            console.log("evening event")
        }
    }

    confirmSelection(){
        if(this.thaneAffection == false){
            if(this.selectedButtonIndex == 0){
                //Option to give most affection
                this.dialogLine = 4
            }
            else if(this.selectedButtonIndex == 1){
                //Option that loses Affection
                this.dialogLine = 13
            }
            else if(this.selectedButtonIndex == 2){
                //Option for player to walk away that raises no affection
                if(classCounter > 2){
                    this.scene.start('endDayScene')
                }
                else{
                    this.scene.start('classScene')
                }
            }
            this.textOption1.setVisible(false)
            this.textOption2.setVisible(false)
            this.textOption3.setVisible(false)
        }
        
        //Thane Affection Choices
        if(this.thaneAffection == true){
            if(this.selectedButtonIndex == 0){
                this.dialogLine = 10
            }
            else if(this.selectedButtonIndex == 1){
                this.dialogLine = 11
            }
            else if(this.selectedButtonIndex == 2){
                this.dialogLine = 9
            }
            
            this.textOption4.setVisible(false)
            this.textOption5.setVisible(false)
            this.textOption6.setVisible(false)
        }

    }

    update(){
        //ESC to return to Title
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start("titleScene");
        }

        //Initial Choices
        if(this.dialogLine == 3 && !this.dialogTyping){
            this.loadScene.moveButtons(centerX, this)
            this.buttonAppear = true
            this.textOption1.setVisible(true)
            this.textOption2.setVisible(true)
            this.textOption3.setVisible(true)
        }

        //Thane likes you Choices
        if(this.dialogLine == 8 && !this.dialogTyping){
            this.loadScene.moveButtons(centerX, this)
            this.buttonAppear = true
            this.textOption4.setVisible(true)
            this.textOption5.setVisible(true)
            this.textOption6.setVisible(true)
            //9, 10, 11
        }


        //button Logic
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.buttonAppear == true){
            this.titleScene.selectNextButton(-1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)&& this.buttonAppear == true) {
            this.titleScene.selectNextButton(1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keySPACE)&& this.buttonAppear == true){
            this.buttonAppear = false
            this.loadScene.moveButtons(this.OFFSCREEN_X, this)
            this.confirmSelection()
            this.loadScene.typeText(this)
            if(this.selectedButtonIndex == 0){
                this.dialogLine += 2
            }
            else if(this.selectedButtonIndex == 1){
                this.dialogLine += 1
            }
        }

        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            this.loadScene.typeText(this) // trigger dialog
        }
    }
}