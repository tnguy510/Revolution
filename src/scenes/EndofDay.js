class EndofDay extends Phaser.Scene {
    constructor() {
        super("endDayScene")
    }
    create(){
        //recounts what the player has done this day and is counting down the days until the next big event
        // dialog variables
        this.dialogConvo = 0			// current "conversation"
        this.dialogLine = 0			    // current line of conversation
        this.dialogSpeaker = null		// current speaker
        this.dialogLastSpeaker = null	// last speaker
        this.dialogTyping = false		// flag to lock player input while text is "typing"
        this.dialogText = null			// the actual dialog text
        this.nextText = null			// player prompt text to continue typing
        
        this.dialog = this.cache.json.get('endofDayDialog')
        
        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(TEXT_X, TEXT_Y, DBOX_FONT, '', TEXT_SIZE)
        this.nextText = this.add.bitmapText(NEXT_X, NEXT_Y, DBOX_FONT, '', TEXT_SIZE)
        
        // add dialog box sprite
        this.dialogbox = this.add.sprite(DBOX_X, DBOX_Y, 'dialogbox').setOrigin(0)
        this.dialogbox.scaleY = 2
       
        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(TEXT_X, TEXT_Y, DBOX_FONT, '', TEXT_SIZE)
        this.nextText = this.add.bitmapText(NEXT_X, NEXT_Y, DBOX_FONT, '', TEXT_SIZE)
       
        // start first dialog conversation
        this.loadScene = this.scene.get('loadScene')
        this.loadScene.typeText(this)     

        this.titleScene = this.scene.get('titleScene')
        
        classCounter = 0
        dayCounter++
        //Don't let affection go below 0
        if(thaneAffectionLevel < 0){
            thaneAffectionLevel = 0
        }
        if(rodAffectionLevel < 0){
            thaneAffectionLevel = 0
        }
        if(yuAffectionLevel < 0){
            thaneAffectionLevel = 0
        }

        this.thaneAffectionText = this.add.text(centerX, centerY / 3, 'Thane Affection: ' + thaneAffectionLevel, textConfig).setOrigin(0.5).setVisible(false)
        this.rodAffectionText = this.add.text(centerX, this.thaneAffectionText.y + 50, 'Rod Affection: ' + rodAffectionLevel, textConfig).setOrigin(0.5).setVisible(false)
        this.yuAffectionText = this.add.text(centerX, this.rodAffectionText.y + 50, 'Yu Affection: ' + yuAffectionLevel, textConfig).setOrigin(0.5).setVisible(false)
        
        console.log('dayCounter:')
        console.log(dayCounter)
        console.log("end of day")
    }

    update(){
        //ESC to return to Title
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start("titleScene");
        }
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.dialogTyping) {
            this.loadScene.typeText(this) // trigger dialog
        }

        if(this.dialogLine == 2){
            this.thaneAffectionText.setVisible(true)
            this.rodAffectionText.setVisible(true)
            this.yuAffectionText.setVisible(true)
        }
    }
}