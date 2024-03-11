class Settings extends Phaser.Scene {
    constructor() {
        super("settingScene")
    }
    create(){
        const choice1 = this.add.image(centerX, centerY / 3, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        this.choice1Text = this.add.text(choice1.x, choice1.y, 'Class Event',textConfig).setOrigin(0.5)

        const choice2 = this.add.image(choice1.x, choice1.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        this.choice1Text = this.add.text(choice1.x, choice2.y, 'Events Event',textConfig).setOrigin(0.5)

        const choice3 = this.add.image(choice2.x, choice2.y + 150, 'glass-panel').setDisplaySize(500, 100).setInteractive()
        this.choice1Text = this.add.text(choice1.x, choice3.y, 'Title Screen',textConfig).setOrigin(0.5)  

        this.titleScene = this.scene.get('titleScene')
        this.event = null
        
        //selection buttons items
        this.buttonAppear = false
        this.selectedButtonIndex = 0

        this.buttons = [choice1, choice2, choice3]

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand')

        this.titleScene.selectButton(0, this)
    }

    confirmSelection(){
        if(this.selectedButtonIndex == 0){
            this.scene.start("classScene");
        }
        else if(this.selectedButtonIndex == 1){
            this.scene.start("eventScene");
        }
        else if(this.selectedButtonIndex == 2){
            this.scene.start("titleScene");
        }
    }

    update(){
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