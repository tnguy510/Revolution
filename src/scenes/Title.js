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
        this.add.text(centerX, centerY - 32, 'REVOLUTION', menuConfig).setOrigin(0.5)
        this.add.text(centerX, centerY, 'Press SPACE to start', menuConfig).setOrigin(0.5)

        const playButton = this.add.image(centerX, centerY, 'glass-panel').setDisplaySize(300, 100)
        this.add.text(playButton.x, playButton.y, 'Play').setOrigin(0.5)

        const settingsButton = this.add.image(playButton.x, playButton.y + 10, 'glass-panel').setDisplaySize(300, 100)
        this.add.text(settingsButton.x, settingsButton.y, 'Settings').setOrigin(0.5)

        const creditsButton = this.add.image(settingsButton.x, settingsButton.y + 10, 'glass-panel').setDisplaySize(300, 100)
        this.add.text(creditsButton.x, creditsButton.y, 'Credits').setOrigin(0.5)


        // create input
        cursors = this.input.keyboard.createCursorKeys()
    }

    selectButton(number){

    }

    selectNextButton(change = 1){

    }

    confirmSelection(){

    }

    update() {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(!cursors.up)
        const downJustPressed = Phaser.Input.Keyboard.JustDown(!cursors.down)
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(!cursors.space)

        if(upJustPressed){
            this.selectNextButton(-1)
        }
        else if (downJustPressed) {
            this.selectNextButton(1)
        }
        else if (spaceJustPressed){
            this.confirmSelection()
        }
    }
}