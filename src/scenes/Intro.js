class Intro extends Phaser.Scene {
    constructor() {
        super("introScene")
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

        this.minerva = null
       
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('introDialog')

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

        this.minerva = this.add.sprite(OFFSCREEN_X, DBOX_Y+8, 'minerva').setOrigin(0, 1)
              
        // add dialog box sprite
        this.dialogbox = this.add.sprite(DBOX_X, DBOX_Y, 'dialogbox').setOrigin(0)
        this.dialogbox.scaleY = 1.5
       
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

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand')

        this.titleScene.selectButton(0, this)

        this.textOption1 = this.add.text(centerX, this.buttons[0].y - 10, 'Sorry, seats are assigned.',textConfig).setOrigin(0.5).setVisible(false)
        this.textOption1P2 = this.add.text(centerX, this.buttons[0].y+10, 'I shouldn\'t break the rules.',textConfig).setOrigin(0.5).setVisible(false)
        this.textOption2 = this.add.text(centerX, this.buttons[1].y, 'No, why don\'t YOU move',textConfig).setOrigin(0.5).setVisible(false)
        this.textOption3 = this.add.text(centerX, this.buttons[2].y, 'Let\'s try and get along seat neighbor!',textConfig).setOrigin(0.5).setVisible(false)

    }

    moveButtons(coords){
        var index = 0
        while(index <= 2){
            var currentButton = this.buttons[index]
            currentButton.x = coords
            index++
        }
        this.textOption1.setVisible(true)
        this.textOption1P2.setVisible(true)
        this.textOption2.setVisible(true)
        this.textOption3.setVisible(true)
    }

    confirmSelection(){
        //at some point the dialogLine desynced from the lines in the json file
        if(this.selectedButtonIndex == 0){
            this.dialogLine = 11
            console.log("claire affection went up 3")
        }
        else if(this.selectedButtonIndex == 1){
            this.dialogLine = 12
            console.log("claire affection went down 1")
        }
        else if(this.selectedButtonIndex == 2){
            this.dialogLine = 13
            console.log("claire affection went up 0")
        }

        this.textOption1.setVisible(false)
        this.textOption1P2.setVisible(false)
        this.textOption2.setVisible(false)
        this.textOption3.setVisible(false)
    }

    update() {
        //look into how to have the screen still show the textbox
        //if(this.dialogLine === 4){
            //this.cameras.main.setBackgroundColor(0xffffff)
        //    this.cameras.main.fadeIn(1000)
        //}

        //ESC to return to Title
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            console.log("escape")
            this.scene.start("titleScene");
        }


        //Dialouge Mapping here
        if(this.dialogLine == 2 && this.dialogTyping == false){
            playerName = prompt("Enter your name", "...")
            this.loadScene.typeText(this) 
        }
        if(this.dialogLine == 11 && this.dialogTyping == false){
            //line 10
            //at some point the dialogLine desynced from the lines in the json file
            this.moveButtons(centerX)
            this.buttonAppear = true
            this.textOption1.setVisible(true)
            this.textOption1P2.setVisible(true)
            this.textOption2.setVisible(true)
            this.textOption3.setVisible(true)

        }

        //Options Logic
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.buttonAppear == true){
            this.titleScene.selectNextButton(-1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)&& this.buttonAppear == true) {
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