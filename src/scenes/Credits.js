//Music is:
//White Petals by Keys of Moon | https://soundcloud.com/keysofmoon
//Attribution 4.0 International (CC BY 4.0)
//https://creativecommons.org/licenses/by/4.0/
//Music promoted by https://www.chosic.com/free-music/all/ 

class Credits extends Phaser.Scene {
    constructor(){
        super('creditScene')
    }
    create(){
        let creditConfig = {
            fontFamily: 'Mix Serif',
            fontSize: '25px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //credits
        this.add.text(game.config.width/2, game.config.height/ 10, 'White Petals by Keys of Moon ', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height * 2 / 10, 'Menu buttons and cursor by Kennys UI Pack for Phaser 3', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*3 / 10, 'Original Story by Inori and illustrated by Hanagata', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*4 / 10, 'and licensed by Crunchyroll', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*6 / 10, 'All other images originally created by studio Platinum Vision', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*7 / 10, 'and editted by Trish Nguyen', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*9 / 10, 'Code by Trish Nguyen and Nathan Altice', creditConfig).setOrigin(0.5)
        
        //return to title
        const escButton = this.add.image(game.config.width - 128, game.config.height - 64, 'glass-panel').setDisplaySize(200, 100)
        this.add.text(escButton.x - 64, escButton.y - 16, 'ESC to return', textConfig)
        this.add.text(escButton.x - 64, escButton.y , 'to TitleScreen', textConfig)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start('titleScene')
        }
        
    }

}
