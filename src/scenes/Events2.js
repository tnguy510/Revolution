class Events2 extends Phaser.Scene {
    constructor() {
        super('event2Scene')
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
        this.thaneEvent = this.cache.json.get('thaneDialog2')
        this.rodEvent = this.cache.json.get('rodDialog2')
        this.yuEvent = this.cache.json.get('yuDialog2')
        //FORMAT OF JSON FILE SHOULD BE:
        //Read 3 lines, then present choice
        //Lines 4-8, Dialogue for Index 0 then present 2nd choice(if wanted)
        //Lines 9, 10, 11 are for the 2nd choice index respectively(1 line each)
        //Line 12 & 13 is for goodbye dialoge
        //Line 14-17(or EOF) is for Choice Index 1
        //No dialogue for Choice Index 2 where player decides to leave

        
        if(dayCounter == 4){
            this.dialog = this.thaneEvent
            this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'thaneEventTwoBG').setScale(.75).setOrigin(0.5, 0.5)
            this.event = 'thane'
            this.eventAffectionLevel = thaneAffectionLevel
        }
        else if(dayCounter == 5){
            this.dialog = this.rodEvent
            this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'courtyardBG').setScale(.75).setOrigin(0.5, 0.5)
            this.event = 'rod'
            this.eventAffectionLevel = rodAffectionLevel
        }
        else if(dayCounter == 6){
            this.dialog = this.yuEvent
            this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'courtyardBG').setScale(.75).setOrigin(0.5, 0.5)
            this.event = 'yu'
            this.eventAffectionLevel = yuAffectionLevel
        }
        else{
            this.dialog = this.thaneEvent
        }

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
        this.dateChoiceTwo = false

        this.buttons = [choice1, choice2, choice3]

        this.buttonSelector = this.add.image(OFFSCREEN_X, OFFSCREEN_Y, 'cursor-hand')

        //Order of Choice 1 is 1. Most AFfection. 2. Lose Affection. 3. No Affection
        //Order of Choice 2 is 1. Least AFfection. 2. Middle Affection. 3. Most Affection
        //Thane Event Cycle 1
        this.thaneOption1 = this.add.text(centerX, this.buttons[0].y, 'Wait for him to finish before talking.',textConfig).setOrigin(0.5).setVisible(false)
        this.thaneOption2 = this.add.text(centerX, this.buttons[1].y, 'Emerge and compliment him on his playing.',textConfig).setOrigin(0.5).setVisible(false)
        this.thaneOption3 = this.add.text(centerX, this.buttons[2].y, 'Leave, this seems like a private moment.',textConfig).setOrigin(0.5).setVisible(false)

        //Text for Thane Liking You
        this.thaneOption4 = this.add.text(centerX, this.buttons[0].y, '"I didn\'t like the music."',textConfig).setOrigin(0.5).setVisible(false)
        this.thaneOption5 = this.add.text(centerX, this.buttons[1].y, '"I think you have room for improvement."',textConfig).setOrigin(0.5).setVisible(false)
        this.thaneOption6 = this.add.text(centerX, this.buttons[2].y, '"You play very well."',textConfig).setOrigin(0.5).setVisible(false)

        //Rod Dialouge Options
        this.rodOption1 = this.add.text(centerX, this.buttons[0].y, '"Sure it sounds like a lot of fun!"',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gains Affection
        this.rodOption2 = this.add.text(centerX, this.buttons[1].y, '"Oh, no! I\'m not deserving to play with the likes of you!"',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gives no Affection
        this.rodOption3 = this.add.text(centerX, this.buttons[2].y, '"Sorry, I\'m not interested. See you later."',textConfig).setOrigin(0.5).setVisible(false)

        this.rodOption4 = this.add.text(centerX, this.buttons[0].y, 'Shoot it towards Prince Rod.',textConfig).setOrigin(0.5).setVisible(false)
        this.rodOption5 = this.add.text(centerX, this.buttons[1].y, 'Try to make it yourself.',textConfig).setOrigin(0.5).setVisible(false)
        this.rodOption6 = this.add.text(centerX, this.buttons[2].y, 'Shoot it towards your other classmate.',textConfig).setOrigin(0.5).setVisible(false)

        //Yu Dialouge Options
        this.yuOption1 = this.add.text(centerX, this.buttons[0].y, '"How about, "You do not know me, how can you say you love me?"',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gains Affection
        this.yuOption2 = this.add.text(centerX, this.buttons[1].y, '"How about, "I love you too much it hurts me!"',textConfig).setOrigin(0.5).setVisible(false)
        //Option that gives no Affection
        this.yuOption3 = this.add.text(centerX, this.buttons[2].y, '"Hmm sorry I\'m not good at poetry. Bye!"',textConfig).setOrigin(0.5).setVisible(false)

        this.yuOption4 = this.add.text(centerX, this.buttons[0].y, '"How about they just accept they won\'t see each other again."',textConfig).setOrigin(0.5).setVisible(false)
        this.yuOption5 = this.add.text(centerX, this.buttons[1].y, '"How about they meet each other within the rules."',textConfig).setOrigin(0.5).setVisible(false)
        this.yuOption6 = this.add.text(centerX, this.buttons[2].y, '"How about they plan to escape their circumstances."',textConfig).setOrigin(0.5).setVisible(false)
        this.titleScene.selectButton(0, this)
        this.cameras.main.fadeIn(1000)
    }

    confirmSelection(){
        //Thane Event Choices
        if(this.dateChoiceTwo == false){
            if(this.selectedButtonIndex == 0){
                //Option to give most affection
                this.eventAffectionLevel += 3
                this.dialogLine = 3
            }
            else if(this.selectedButtonIndex == 1){
                //Option that loses Affection
                this.eventAffectionLevel -= 1
                this.dialogLine = 14
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
            return
        }
        
        //Second Affection Choices
        if(this.dateChoiceTwo == true){
            if(this.selectedButtonIndex == 0){
                //Least Affection
                this.eventAffectionLevel += 1
                this.dialogLine = 8

            }
            else if(this.selectedButtonIndex == 1){
                //"I think you have room for improvement."
                this.eventAffectionLevel += 2
                this.dialogLine = 9
            }
            else if(this.selectedButtonIndex == 2){
                //"You play very well."
                this.eventAffectionLevel += 3
                this.dialogLine = 10
            }

            if(this.event == 'thane'){
                this.thaneOption4.setVisible(false)
                this.thaneOption5.setVisible(false)
                this.thaneOption6.setVisible(false)
            }
            else if(this.event == 'rod'){
                this.rodOption4.setVisible(false)
                this.rodOption5.setVisible(false)
                this.rodOption6.setVisible(false)
            }
            else if(this.event == 'yu'){
                this.yuOption4.setVisible(false)
                this.yuOption5.setVisible(false)
                this.yuOption6.setVisible(false)
            }
        }
        this.buttonSelector.x = OFFSCREEN_X
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

        //Thane likes you Choices
        if(this.dialogLine == 8 && !this.dialogTyping){
            this.loadScene.moveButtons(centerX, this)
            this.buttonAppear = true

            if(this.event == 'thane'){
                this.thaneOption4.setVisible(true)
                this.thaneOption5.setVisible(true)
                this.thaneOption6.setVisible(true)
            }
            else if(this.event == 'rod'){
                this.rodOption4.setVisible(true)
                this.rodOption5.setVisible(true)
                this.rodOption6.setVisible(true)
            }
            else if(this.event == 'yu'){
                this.yuOption4.setVisible(true)
                this.yuOption5.setVisible(true)
                this.yuOption6.setVisible(true)
            }
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
            this.loadScene.moveButtons(OFFSCREEN_X, this)
            this.confirmSelection()
            this.loadScene.typeText(this)
            if(this.dateChoiceTwo == true){
                if(this.selectedButtonIndex == 0){
                    this.dialogLine += 2
                }
                else if(this.selectedButtonIndex == 1){
                    this.dialogLine += 1
                }
            }

            //Placed after the above so it doesn't activate on the first choice
            if(this.selectedButtonIndex == 0){
                this.dateChoiceTwo = true
            }
        }

        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            //Check if end of 2nd choice branch
            if(this.dialogLine == 13){
                if(this.event == 'thane'){
                    thaneAffectionLevel = this.eventAffectionLevel
                }
                else if(this.event == 'rod'){
                    rodAffectionLevel = this.eventAffectionLevel
                }
                else if(this.event == 'yu'){
                    yuAffectionLevel = this.eventAffectionLevel
                }
                this.scene.start('classScene')
            }
            else{
                this.loadScene.typeText(this) // trigger dialog
            }
        }
    }
}