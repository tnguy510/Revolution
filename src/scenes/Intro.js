class Intro extends Phaser.Scene {
    constructor() {
        super("introScene")
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
        this.dialog = this.cache.json.get('introDialog')

        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'classroomBG').setScale(.75).setOrigin(0.5, 0.5)

        const choice1 = this.add.image(this.OFFSCREEN_X, centerY / 3, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        const choice2 = this.add.image(choice1.x, choice1.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        const choice3 = this.add.image(choice2.x, choice2.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
       
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

        this.titleScene.selectButton(0, this)

    }

    moveButtons(coords){
        var index = 0
        while(index <= 2){
            var currentButton = this.buttons[index]
            currentButton.x = coords
            index++
        }
    }

    confirmSelection(){
        //claire event
        if(this.event == "claire"){
            if(this.selectedButtonIndex == 0){
                this.dialogLine = 11
            }
            else if(this.selectedButtonIndex == 1){
                this.dialogLine = 12
            }
            else if(this.selectedButtonIndex == 2){
                this.dialogLine = 13
            }
        }

        //leftover from being able to ask teacher to repeat the introdouctions
        //classroom introduction
        if(this.event == "class"){
            if(this.selectedButtonIndex == 0){
                this.dialogLine = 18
            }
            else if(this.selectedButtonIndex == 1){
                this.dialogLine = 21
            }
            else if(this.selectedButtonIndex == 2){
                this.dialogLine = 22
            }
        }

        this.textOption1.destroy()
        this.textOption1P2.destroy()
        this.textOption2.destroy()
        this.textOption3.destroy()
    }

    update() {
        //look into how to have the screen still show the textbox
        //if(this.dialogLine === 4){
            //this.cameras.main.setBackgroundColor(0xffffff)
        //    this.cameras.main.fadeIn(1000)
        //}
        if(this.dialogLine == 2 && this.dialogTyping == false){
            playerName = prompt("Enter your name", "...")
            this.loadScene.typeText(this) 
        }
        if(this.dialogLine == 10 && this.dialogTyping == false){
            //line 10
            this.moveButtons(centerX)
            this.event = "claire"
            this.buttonAppear = true
            this.textOption1 = this.add.text(this.buttons[0].x, this.buttons[0].y - 10, 'Sorry, seats are assigned.',textConfig).setOrigin(0.5)
            this.textOption1P2 = this.add.text(this.buttons[0].x, this.buttons[0].y+10, 'I shouldn\'t break the rules.',textConfig).setOrigin(0.5)
            this.textOption2 = this.add.text(this.buttons[1].x, this.buttons[1].y, 'No, why don\'t YOU move',textConfig).setOrigin(0.5)
            this.textOption3 = this.add.text(this.buttons[2].x, this.buttons[2].y, 'Let\'s try and get along seat neighbor!',textConfig).setOrigin(0.5)

        }

        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.buttonAppear == true){
            this.titleScene.selectNextButton(-1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)&& this.buttonAppear == true) {
            this.titleScene.selectNextButton(1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keySPACE)&& this.buttonAppear == true){
            this.buttonAppear = false
            this.moveButtons(this.OFFSCREEN_X)
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