class EndofDay extends Phaser.Scene {
    constructor() {
        super("endDayScene")
    }
    create(){
        //recounts what the player has done this day and is counting down the days until the next big event
        console.log("end of day")
        //console.log(thaneAffection)
        classCounter = 0
        dayCounter++
        console.log('dayCounter:')
        console.log(dayCounter)
        if(dayCounter >= 7){
            console.log('week over')
            this.scene.start('titleScene')
        }
        else{
            //this.time.delayedCall(2000, () => {
                this.scene.start("classScene");
            //}, null, this)
        }
    }
}