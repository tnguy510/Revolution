class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    preload()
    {
        this.load.image('glass-panel', 'assets/Kennys UI Pack-Space Expansion/PNG/glassPanel.png')
        this.load.image('cursor-hand', 'assets/Kennys UI Pack-Space Expansion/PNG/cursor_hand.png')
    }

    create() {
        // add title text
        //this.add.text(centerX, centerY - 32, 'REVOLUTION', menuConfig).setOrigin(0.5)
        //this.add.text(centerX, centerY, 'Press SPACE to start', menuConfig).setOrigin(0.5)

        const playButton = this.add.image(centerX, centerY, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(playButton.x, playButton.y, 'Play').setOrigin(0.5)
        //playButton.setTintFill(0xffffff)
        const settingsButton = this.add.image(playButton.x, playButton.y + 100, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(settingsButton.x, settingsButton.y, 'Settings').setOrigin(0.5)

        const creditsButton = this.add.image(settingsButton.x, settingsButton.y + 100, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(creditsButton.x, creditsButton.y, 'Credits').setOrigin(0.5)


        // create input
        cursors = this.input.keyboard.createCursorKeys()
        //this.buttons = Phaser.GameObjects.Image
	    this.selectedButtonIndex = 0

        //this.buttons = this.add.group([playButton, settingsButton, creditsButton])
        this.buttons = [playButton, settingsButton, creditsButton]

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand')

        this.selectButton(0)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    selectButton(index){
        //const currentButton = this.buttons.get(this.selectedButtonIndex)
        const currentButton = this.buttons[this.selectedButtonIndex]

	    // set the current selected button to a white tint
	    currentButton.setTintFill(0xffffff)

	    //const button = this.buttons.get(index)
        const button = this.buttons[index]

	    // set the newly selected button to a green tint
	    button.setTint(0x66ff7f)

	    // move the hand cursor to the right edge
	    this.buttonSelector.x = button.x + button.displayWidth * 0.5
	    this.buttonSelector.y = button.y + 10

	    // store the new selected index
	    this.selectedButtonIndex = index
    }

    selectNextButton(change = 1){
        let index = this.selectedButtonIndex + change

        if(index >= 2){
            index = 2
        }
        
        else if(index <= 0){
            index = 0
        }

        //console.log(this.selectedButtonIndex)    
        this.selectButton(index)
    }

    confirmSelection(){

    }

    update() {
        //const upJustPressed = Phaser.Input.Keyboard.JustDown(keyUP)
        const downJustPressed = Phaser.Input.Keyboard.JustDown(!cursors.down)
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(!cursors.space)

        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.selectNextButton(-1)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.selectNextButton(1)
        }
        else if (spaceJustPressed){
            this.confirmSelection()
        }
    }
}