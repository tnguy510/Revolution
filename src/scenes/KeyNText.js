/*
Keys is a persistent scene that allows keyboard input to be abstracted across all subsequent scenes.
Code solution from StinOfSin: https://phaser.discourse.group/t/configure-keyboard-inputs-once-for-all-scenes-to-use/10470/6
*/

class Keys extends Phaser.Scene {
    constructor() {
        super('sceneKeys')
    }

    create() {
        const { KeyCodes } = Phaser.Input.Keyboard
        this.KEYS = this.input.keyboard.addKeys({
            SPACE:   KeyCodes.SPACE,
            UP: KeyCodes.UP,
            DOWN:   KeyCodes.DOWN,
            PAUSE:  KeyCodes.P
        })

        // launch next scene so it will run concurrently with this one
        this.scene.launch('titleScene')
    }
}