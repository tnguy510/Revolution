class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload(){
        // load assets
        this.load.path = "./assets/"

        //load images
        this.load.image('Claire', 'characters/Anime_Claire.png')
        this.load.image('Misha', 'characters/Anime_Misha.png')
        this.load.image('Rod', 'characters/Anime_Rod.png')
        this.load.image('Thane', 'characters/Anime_Thane.png')
        this.load.image('Yu', 'characters/Anime_Yu.png')

    }

    create(){

    }

    typeText(scene) {
        // lock input while typing
        scene.dialogTyping = true

        // clear text
        scene.dialogText.text = ''
        scene.nextText.text = ''

        /* JSON dialog structure: 
            - each array within the main JSON array is a "conversation"
            - each object within a "conversation" is a "line"
            - each "line" can have 3 properties: 
                1. a speaker (required)
                2. the dialog text (required)
                3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(scene.dialogLine > scene.dialog[scene.dialogConvo].length - 1) {
            scene.dialogLine = 0
            // I increment the conversation count here...
            // ..but you could create logic to exit if each conversation was self-contained            
            scene.dialogConvo++
        }
        
        // make sure we haven't run out of conversations...
        if(scene.dialogConvo >= scene.dialog.length) {
            // here I'm exiting the final conversation to return to the title...
            // ...but you could add alternate logic if needed
            console.log('End of Conversations')
            // tween out prior speaker's image
            if(scene.dialogLastSpeaker) {
                scene.tweens.add({
                    targets: scene[scene.dialogLastSpeaker],
                    x: scene.OFFSCREEN_X,
                    duration: scene.tweenDuration,
                    ease: 'Linear',
                    onComplete: () => {
                        scene.scene.start('titleScene')
                    }
                })
            }
            // make text box invisible
            scene.dialogbox.visible = false

        } else {
            // if not, set current speaker
            scene.dialogSpeaker = scene.dialog[scene.dialogConvo][scene.dialogLine]['speaker']
            // check if there's a new speaker (for exit/enter animations)
            if(scene.dialog[scene.dialogConvo][scene.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if(scene.dialogLastSpeaker) {
                    scene.tweens.add({
                        targets: scene[scene.dialogLastSpeaker],
                        x: scene.OFFSCREEN_X,
                        duration: scene.tweenDuration,
                        ease: 'Linear'
                    })
                }
                // tween in new speaker's image
                scene.tweens.add({
                    targets: scene[scene.dialogSpeaker],
                    x: scene.DBOX_X + 50,
                    duration: scene.tweenDuration,
                    ease: 'Linear'
                })
            }

            // build dialog (concatenate speaker + colon + line of text)
            scene.dialogLines = 
                scene.dialog[scene.dialogConvo][scene.dialogLine]['speaker'].toUpperCase() 
                + ': ' 
                + scene.dialog[scene.dialogConvo][scene.dialogLine]['dialog']

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0
            scene.textTimer = scene.time.addEvent({
                delay: scene.LETTER_TIMER,
                repeat: scene.dialogLines.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    scene.dialogText.text += scene.dialogLines[currentChar]
                    // advance character position
                    currentChar++
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(scene.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        scene.nextText = scene.add.bitmapText(scene.NEXT_X, scene.NEXT_Y, scene.DBOX_FONT, scene.NEXT_TEXT, scene.TEXT_SIZE).setOrigin(1)
                        scene.dialogTyping = false   // un-lock input
                        scene.textTimer.destroy()    // destroy timer
                    }
                },
                callbackScope: scene // keep Scene context
            })
            
            scene.dialogText.maxWidth = scene.TEXT_MAX_WIDTH  // set bounds on dialog
            scene.dialogLine++                               // increment dialog line
            scene.dialogLastSpeaker = scene.dialogSpeaker     // set past speaker
        }
    }

    update(){
        this.scene.start("titleScene");
    }
}