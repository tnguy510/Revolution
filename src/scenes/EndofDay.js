class EndofDay extends Phaser.Scene {
    constructor() {
        super("endDayScene")
    }
    create(){
        //recounts what the player has done this day and is counting down the days until the next big event
        console.log("end of day")
        console.log(thaneAffection)
        this.scene.start("titleScene");
    }
}