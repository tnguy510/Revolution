class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload(){
        // load assets
        this.load.path = "./assets/"

        //load images
        this.load.image('Claire', 'img/characters/Anime_Claire.png')
        this.load.image('Misha', 'img/characters/Anime_Misha.png')
        this.load.image('Rod', 'img/characters/Anime_Rod.png')
        this.load.image('Thane', 'img/characters/Anime_Thane.png')
        this.load.image('Yu', 'img/characters/Anime_Yu.png')

        this.load.image('dialogbox', 'img/dialogbox.png')

        //backgrounds
        this.load.image('cafeteriaBG', 'img/BGs/cafeteria_bg.png')
        this.load.image('classroomBG', 'img/BGs/classroom_BG.png')
        this.load.image('courtyardBG', 'img/BGs/courtyard_BG.png')
        this.load.image('examBG', 'img/BGs/exam_bg.png')
        this.load.image('hallwayBG', 'img/BGs/hallway_BG.png')
        this.load.image('libraryBG', 'img/BGs/library_BG.png')
        this.load.image('princeIntroBG', 'img/BGs/Prince_Intro_BG.png')
        this.load.image('thaneEventTwoBG', 'img/BGs/thaneEvent2_BG.png')
        this.load.image('titleScreenBG', 'img/BGs/Title_screen_BG.png')
        
        //Option Boxes
        this.load.image('glass-panel', 'Kennys UI Pack-Space Expansion/PNG/glassPanel.png')
        this.load.image('cursor-hand', 'Kennys UI Pack-Space Expansion/PNG/cursor_hand.png')

        // load JSON (ie dialog text)
        this.load.json('introDialog', 'json/intro.json')
        this.load.json('endofDayDialog', 'json/endofDay.json')

        //classroom topics JSONS
        this.load.json('etiquetteDialog', 'json/etiquette.json')

        //event dialogs
        this.load.json('princeIntroDialog', 'json/princeIntro.json')
        this.load.json('thaneDialog', 'json/thaneEvent.json')
        this.load.json('thaneDialog2', 'json/thaneEvent2.json')
        this.load.json('rodDialog', 'json/rodEvent.json')
        this.load.json('rodDialog2', 'json/rodEvent2.json')
        this.load.json('yuDialog', 'json/yuEvent.json')
        this.load.json('yuDialog2', 'json/yuEvent2.json')


        // load bitmap font
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
        this.load.bitmapFont('mixSerif_font', 'font/MixSerif.png', 'font/MixSerif.xml')

        //Sound
        this.load.audio('background music', 'keys-of-moon-white-petals(chosic.com).mp3')

        classCounter = 0
        ettiqueteLine = 0
        dayCounter = 0
        thaneAffectionLevel = 0
        rodAffectionLevel = 0
        yuAffectionLevel = 0

    }

    create(){
        //background noise logic
        this.bgm = this.sound.add('background music', {
        loop: true,
        volume: 0.75,
        })
        this.sound.pauseOnBlur = false
        this.bgm.play()
    }

    update(){
        this.scene.start("sceneKeys");
    }

    moveButtons(coords, scene){
        var index = 0
        while(index <= 2){
            var currentButton = scene.buttons[index]
            currentButton.x = coords
            index++
        }
    }

    //typeText function by Nathan Altice. Modified by Trish Nguyen
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
                    x: OFFSCREEN_X,
                    duration: tweenDuration,
                    ease: 'Linear',
                    onComplete: () => {
                        if(scene == scene.scene.get("introScene")){
                            scene.scene.start('classScene')
                        }
                        //plays for the normal days
                        else if(scene == scene.scene.get("endDayScene")){
                            if(dayCounter >= 7){
                                console.log('week over')
                                scene.scene.start('titleScene')
                            }
                            else{
                                //this.time.delayedCall(2000, () => {
                                    scene.scene.start("classScene");
                                //}, null, this)
                            }
                        }
                        else if(scene == scene.scene.get("eventScene")){
                            //Branches for what prince it is
                            if(scene.event == 'thane'){
                                thaneAffectionLevel = scene.eventAffectionLevel
                            }
                            else if(scene.event == 'rod'){
                                rodAffectionLevel = scene.eventAffectionLevel
                            }
                            else if(scene.event == 'yu'){
                                yuAffectionLevel = scene.eventAffectionLevel
                            }
                            //
                            scene.scene.start('classScene')
                        }
                        //Only happens if the dialog json file runs out of lines. Other wise the update if in Classroom.js kicks in first
                        else if(scene == scene.scene.get("classScene")){
                            console.log('Class Counter:')
                            console.log(classCounter)
                            scene.scene.start('eventScene')
                        }
                        //
                        else{
                            scene.scene.start('titleScene')
                        }
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
                        x: OFFSCREEN_X,
                        duration: tweenDuration,
                        ease: 'Linear'
                    })
                }
                // tween in new speaker's image
                scene.tweens.add({
                    targets: scene[scene.dialogSpeaker],
                    x: 1 / game.config.width,
                    duration: tweenDuration,
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
                delay: LETTER_TIMER,
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
                        scene.nextText = scene.add.bitmapText(NEXT_X, NEXT_Y, DBOX_FONT, NEXT_TEXT, TEXT_SIZE).setOrigin(1)
                        scene.dialogTyping = false   // un-lock input
                        scene.textTimer.destroy()    // destroy timer
                    }
                },
                callbackScope: scene // keep Scene context
            })
            
            scene.dialogText.maxWidth = TEXT_MAX_WIDTH  // set bounds on dialog
            scene.dialogLine++                               // increment dialog line
            scene.dialogLastSpeaker = scene.dialogSpeaker     // set past speaker
        }
    }
}