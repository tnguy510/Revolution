class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'titleScreenBG').setScale(.75).setOrigin(0.5, 0.5)

        // add title text
        this.add.text(centerX, centerY / 3, 'REVOLUTION', menuConfig).setOrigin(0.5)
        //this.add.text(centerX, centerY, 'Press SPACE to start', menuConfig).setOrigin(0.5)

        const playButton = this.add.image(centerX, centerY, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(playButton.x, playButton.y, 'Press SPACE to start').setOrigin(0.5)
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

        this.selectButton(0, this)
    }

    selectButton(index, scene){
        const currentButton = scene.buttons[scene.selectedButtonIndex]

	    // set the current selected button to a white tint
	    currentButton.setTint(0xffffff)

	    //const button = this.buttons.get(index)
        const button = scene.buttons[index]

	    // set the newly selected button to a green tint
	    button.setTint(0x66ff7f)

	    // move the hand cursor to the right edge
	    scene.buttonSelector.x = button.x + button.displayWidth * 0.5
	    scene.buttonSelector.y = button.y + 10

	    // store the new selected index
	    scene.selectedButtonIndex = index
    }

    selectNextButton(change = 1, scene){
        let index = scene.selectedButtonIndex + change

        if(index >= 2){
            index = 2
        }
        
        else if(index <= 0){
            index = 0
        }

        this.selectButton(index, scene)
    }

    confirmSelection(){
        if(this.selectedButtonIndex == 0){
            this.scene.start("introScene");
        }
        if(this.selectedButtonIndex == 1){
            this.scene.start("settingScene");
        }
        if(this.selectedButtonIndex == 2){
            this.scene.start("creditScene");
        }
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.selectNextButton(-1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.selectNextButton(1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.confirmSelection()
        }
    }
}