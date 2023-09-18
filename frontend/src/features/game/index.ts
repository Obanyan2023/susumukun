import Phaser from "phaser"


class Game extends Phaser.Scene{  

  leftButton: Phaser.GameObjects.Text | null = null;
  rightButton: Phaser.GameObjects.Text | null = null;
  jumpButton: Phaser.GameObjects.Text | null = null;
  player: Phaser.Physics.Matter.Sprite | null = null;

  constructor() {
    super({ key: 'Game' });
  }


  preload () {
    this.load.image('mario', 'assets/mario_run.jpg');
    //this.load.image('mario', 'assets/mario_stop.jpg');

    this.load.image('susumu-front', 'images/player/susumu-front.png' );
    // this.load.image('susumu-left2', 'assets/player/susumu-left2.png');
    // this.load.image('susumu-left3', 'assets/player/susumu-left3.png');
    // this.load.image('susumu-right1', 'assets/player/susumu-right1.png');
    // this.load.image('susumu-right2', 'assets/player/susumu-right2.png');
    // this.load.image('susumu-right3', 'assets/player/susumu-right3.png');

  }

  create() {
    // フルスクリーンボタンを作成
    const fullscreenButton = this.add.text(window.innerWidth-100, 50, 'FS', { fontSize: '32px' });
    fullscreenButton.setInteractive();
    fullscreenButton.on('pointerup', this.toggleFullscreen, this);
    this.leftButton = this.add.text(50, window.innerHeight-135, '←', { fontSize: '90px' });
    this.rightButton = this.add.text(170, window.innerHeight-135, '→', { fontSize: '90px' });
    this.jumpButton = this.add.text(window.innerWidth-200, window.innerHeight-120, 'Jump', { fontSize: '50px' });
    /*
    const upButton = this.add.text(80, window.innerHeight-185, '↑', { fontSize: '50px' });
    const downButton = this.add.text(80, window.innerHeight-85, '↓', { fontSize: '50px' });
    */


    this.matter.world.setBounds(0, 0, this.sys.canvas.width, this.sys.canvas.height);
    this.player = this.matter.add.sprite(100, 450, 'susumu-front');
  }

  toggleFullscreen() {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  update () {
  }
}

export const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.ScaleModes.FIT,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 9.8,
        debug: false
      },
    }
  },
  scene: [Game],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};