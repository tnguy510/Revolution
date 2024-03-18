class Settings extends Phaser.Scene {
    constructor() {
        super("settingScene")
    }
    create(){
        const choice1 = this.add.image(centerX, centerY / 3, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        this.choice1Text = this.add.text(choice1.x, choice1.y, 'Class Event',textConfig).setOrigin(0.5)

        const choice2 = this.add.image(choice1.x, choice1.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        this.choice1Text = this.add.text(choice1.x, choice2.y, 'Date Event',textConfig).setOrigin(0.5)

        const choice3 = this.add.image(choice2.x, choice2.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        this.choice1Text = this.add.text(choice1.x, choice3.y, 'End of Day Event',textConfig).setOrigin(0.5)  

        const escButton = this.add.image(game.config.width - 128, game.config.height - 64, 'glass-panel').setDisplaySize(200, 100)
        this.add.text(escButton.x - 64, escButton.y - 16, 'ESC to return', textConfig)
        this.add.text(escButton.x - 64, escButton.y , 'to TitleScreen', textConfig)
        
        //selection buttons items
        this.buttonAppear = false
        this.selectedButtonIndex = 0

        this.buttons = [choice1, choice2, choice3]

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand')

        this.titleScene = this.scene.get('titleScene')        
        this.titleScene.selectButton(0, this)
    }

    confirmSelection(){
        if(this.selectedButtonIndex == 0){
            this.scene.start("classScene");
        }
        else if(this.selectedButtonIndex == 1){
            classCounter += 1
            this.scene.start("eventScene");
        }
        else if(this.selectedButtonIndex == 2){
            this.scene.start("endDayScene");
        }
    }

    update(){
        //ESC to return to Title
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start("titleScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.titleScene.selectNextButton(-1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.titleScene.selectNextButton(1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.confirmSelection()
        }
    }
}