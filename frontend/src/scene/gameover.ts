import Phaser from 'phaser';
class GameOver extends Phaser.Scene {

    tmpbutton: Phaser.GameObjects.Text | null = null;


    constructor() {
        super({ key: 'GameOver' });
    }


    preload() {
        this.load.image('gameover', 'images/tmp/gameover.jpeg');
    }
    create()  {
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'gameover').setOrigin(0.5, 0.5).setScale(0.5);

        this.tmpbutton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 100, 'tmp', { fontSize: '32px' }).setOrigin(0.5, 0.5);

    }
    update() {
        console.log("GameOver!!")

        this.tmpbutton?.setInteractive();
        this.tmpbutton?.on('pointerup', () => {
            console.log("tmpButton is clicked!!")
            window.location.reload();
        }
        , this);
    }

}

export default GameOver;