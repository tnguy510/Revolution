class Intro extends Phaser.Scene {
    constructor() {
        super("introScene")
    }

    create(){
        // dialog constants
        this.DBOX_X = 0			        // dialog box x-position
        this.DBOX_Y = 400			    // dialog box y-position
        this.DBOX_FONT = 'mickey_font'	    // dialog box font key
        
        this.TEXT_X = 50			    // text w/in dialog box x-position
        this.TEXT_Y = 445			    // text w/in dialog box y-position
        this.TEXT_SIZE = 32		        // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715	    // max width of text within box
       
        this.NEXT_TEXT = '[SPACE]'	    // text to display for next prompt
        this.NEXT_X = 775			    // next text prompt x-position
        this.NEXT_Y = 574			    // next text prompt y-position

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
        this.homer = null
        this.tweenDuration = 500
       
        this.OFFSCREEN_X = -500        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000
       
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('dialog')
       
        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0)
       
        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)
       
        // ready the character dialog images offscreen
        this.homer = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'homer').setOrigin(0, 1)
       
        // input
        cursors = this.input.keyboard.createCursorKeys()

        // start first dialog conversation
        Load.typeText(this)        
    }
}