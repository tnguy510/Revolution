class Events extends Phaser.Scene {
    constructor() {
        super('eventScene')
    }
    create(){
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
       
        // parse dialog from JSON file
        this.thaneEvent = this.cache.json.get('thaneDialog')
        this.rodEvent = this.cache.json.get('rodDialog')
        this.yuEvent = this.cache.json.get('yuDialog')
        this.eventAffectionLevel = 0
        //FORMAT OF JSON FILE SHOULD BE:
        //Read 3 lines, then present choice
        //Next 3 lines are for the different choices
        //7th line is a goodbye/transitional line
        //Any additional lines should be for the sake of moving the scene along

        //Deciding what day it is for each prince
        if(dayCounter == 1){
            this.dialog = this.thaneEvent
            this.event = 'thane'
            this.eventAffectionLevel = thaneAffectionLevel
        }
        else if(dayCounter == 2){
            this.dialog = this.rodEvent
            this.event = 'rod'
            this.eventAffectionLevel = rodAffectionLevel
        }
        else if(dayCounter == 3){
            this.dialog = this.yuEvent
            this.event = 'yu'
            this.eventAffectionLevel = yuAffectionLevel
        }
        else{
            this.dialog = this.thaneEvent
        }

        //Segment of if Events are randomized. Discarded for time
        //this.dialogEvents = [this.thaneEvent, this.rodEvent, this.yuEvent]
        //var dialogRandom = this.dialogEvents[Phaser.Math.RND.integerInRange(0, 2)]
        //var dialogRandom = this.rodEvent
        //this.event = dialogRandom
        //this.dialog = dialogRandom

        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'classroomBG').setScale(.75).setOrigin(0.5, 0.5)

        const choice1 = this.add.image(OFFSCREEN_X, centerY / 3, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        const choice2 = this.add.image(choice1.x, choice1.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        const choice3 = this.add.image(choice2.x, choice2.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()

        const escButton = this.add.image(game.config.width - 128, game.config.height - 64, 'glass-panel').setDisplaySize(200, 100)
        this.add.text(escButton.x - 64, escButton.y - 16, 'ESC to return', textConfig)
        this.add.text(escButton.x - 64, escButton.y , 'to TitleScreen', textConfig)
       
        // ready the character dialog images offscreen
        this.claire = this.add.sprite(OFFSCREEN_X, game.config.height, 'Claire').setOrigin(0, 1).setScale(.5)
        this.misha = this.add.sprite(OFFSCREEN_X, game.config.height, 'Misha').setOrigin(0, 1).setScale(.5)
        this.rod = this.add.sprite(OFFSCREEN_X, game.config.height, 'Rod').setOrigin(0, 1).setScale(.5)
        this.thane = this.add.sprite(OFFSCREEN_X, game.config.height, 'Thane').setOrigin(0, 1).setScale(.5)
        this.yu = this.add.sprite(OFFSCREEN_X, game.config.height, 'Yu').setOrigin(0, 1).setScale(.5)
              
        // add dialog box sprite
        this.dialogbox = this.add.sprite(DBOX_X, DBOX_Y, 'dialogbox').setOrigin(0)
        this.dialogbox.scaleY = 2
       
        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(TEXT_X, TEXT_Y, DBOX_FONT, '', TEXT_SIZE)
        this.nextText = this.add.bitmapText(NEXT_X, NEXT_Y, DBOX_FONT, '', TEXT_SIZE)
       
        // input
        cursors = this.input.keyboard.createCursorKeys()

        // start first dialog conversation
        this.loadScene = this.scene.get('loadScene')
        this.loadScene.typeText(this)     

        this.titleScene = this.scene.get('titleScene')
        
        //selection buttons items
        this.buttonAppear = false
        this.selectedButtonIndex = 0

        this.buttons = [choice1, choice2, choice3]

        this.buttonSelector = this.add.image(OFFSCREEN_X, OFFSCREEN_Y, 'cursor-hand')

        //thane Dialouge Options
                                                                        //Option that loses Affection
        this.thaneOption1 = this.add.text(centerX, this.buttons[0].y, 'Oh I\'m so sorry! I would have never noticed!',textConfig).setOrigin(0.5).setVisible(false)
                                                                        //Option that gains Affection
        this.thaneOption2 = this.add.text(centerX, this.buttons[1].y, 'Thank you! I wouldn\'t have noticed until later.',textConfig).setOrigin(0.5).setVisible(false)
                                                                        //Option that gives no Affection
        this.thaneOption3 = this.add.text(centerX, this.buttons[2].y, 'That\'s not my book.',textConfig).setOrigin(0.5).setVisible(false)

        //Rod Dialouge Options
        this.rodOption1 = this.add.text(centerX, this.buttons[0].y, 'Go sit alone.',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gains Affection
        this.rodOption2 = this.add.text(centerX, this.buttons[1].y, 'Go sit with Prince Rod.',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gives no Affection
        this.rodOption3 = this.add.text(centerX, this.buttons[2].y, 'Go sit with Prince Misha.',textConfig).setOrigin(0.5).setVisible(false)

        //Yu Dialouge Options
        this.yuOption1 = this.add.text(centerX, this.buttons[0].y, 'Of course! Here you go!',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gains Affection
        this.yuOption2 = this.add.text(centerX, this.buttons[1].y, 'Hmm, how about we go through the assignment together and I\'ll help you out.',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gives no Affection
        this.yuOption3 = this.add.text(centerX, this.buttons[2].y, 'You should do the assignment yourself.',textConfig).setOrigin(0.5).setVisible(false)

        this.titleScene.selectButton(0, this)
        this.cameras.main.fadeIn(1000)
    }

    confirmSelection(){
        if(this.selectedButtonIndex == 0){
            //Option that loses Affection
            this.eventAffectionLevel -= 1
            this.dialogLine = 3
        }
        else if(this.selectedButtonIndex == 1){
            //Option to give most affection
            this.eventAffectionLevel += 3
            this.dialogLine = 4
        }
        else if(this.selectedButtonIndex == 2){
            //Option that gives little Affection
            this.eventAffectionLevel += 1
            this.dialogLine = 5
        }

        //Setting Visibility for what event it is
        if(this.event == 'thane'){
            this.thaneOption1.setVisible(false)
            this.thaneOption2.setVisible(false)
            this.thaneOption3.setVisible(false)
        }
        else if(this.event == 'rod'){
            this.rodOption1.setVisible(false)
            this.rodOption2.setVisible(false)
            this.rodOption3.setVisible(false)
        }
        else if(this.event == 'yu'){
            this.yuOption1.setVisible(false)
            this.yuOption2.setVisible(false)
            this.yuOption3.setVisible(false)
        }

        this.buttonSelector.x = OFFSCREEN_X
    }

    update(){
        //ESC to return to Title
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start("titleScene");
        }

        if(this.dialogLine == 1 && !this.dialogTyping){
            this.loadScene.moveButtons(centerX, this)
            this.buttonAppear = true

            if(this.event == 'thane'){
                this.thaneOption1.setVisible(true)
                this.thaneOption2.setVisible(true)
                this.thaneOption3.setVisible(true)
            }
            else if(this.event == 'rod'){
                this.rodOption1.setVisible(true)
                this.rodOption2.setVisible(true)
                this.rodOption3.setVisible(true)
            }
            else if(this.event == 'yu'){
                this.yuOption1.setVisible(true)
                this.yuOption2.setVisible(true)
                this.yuOption3.setVisible(true)
            }
        }


        //button Logic
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.buttonAppear == true){
            this.titleScene.selectNextButton(-1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.buttonAppear == true) {
            this.titleScene.selectNextButton(1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.buttonAppear == true){
            this.buttonAppear = false
            this.loadScene.moveButtons(OFFSCREEN_X, this)
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