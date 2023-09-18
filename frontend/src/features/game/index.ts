import Phaser from "phaser"
import hero from '/app/src/assets/player/susumu-front.png'

class Game extends Phaser.Scene{  
  constructor() {
    super({ key: 'Game' });
  }

  preload () {
    this.load.image('mario', 'assets/mario_run.jpg');
    //this.load.image('mario', 'assets/mario_stop.jpg');

    this.load.image('susumu-front', '/app/src/assets/plyer/susumu-front.png' );
    // this.load.image('susumu-left1', 'assets/player/susumu-left1.png');
    // this.load.image('susumu-left2', 'assets/player/susumu-left2.png');
    // this.load.image('susumu-left3', 'assets/player/susumu-left3.png');
    // this.load.image('susumu-right1', 'assets/player/susumu-right1.png');
    // this.load.image('susumu-right2', 'assets/player/susumu-right2.png');
    // this.load.image('susumu-right3', 'assets/player/susumu-right3.png');

  }

  create() {
    // フルスクリーンボタンを作成
    const fullscreenButton = this.add.text(window.innerWidth-100, window.innerHeight-50, 'FS', { fontSize: '32px' });
    fullscreenButton.setInteractive();
    fullscreenButton.on('pointerup', this.toggleFullscreen, this);
    const leftButton = this.add.text(30, window.innerHeight-135, '←', { fontSize: '50px' });
    const upButton = this.add.text(80, window.innerHeight-185, '↑', { fontSize: '50px' });
    const downButton = this.add.text(80, window.innerHeight-85, '↓', { fontSize: '50px' });
    const rightButton = this.add.text(130, window.innerHeight-135, '→', { fontSize: '50px' });


    this.matter.world.setBounds(0, 0, this.sys.canvas.width, this.sys.canvas.height);
    const player = this.matter.add.sprite(100, 450, 'mario');

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

