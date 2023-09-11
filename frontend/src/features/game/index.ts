import Phaser from "phaser"

class Game extends Phaser.Scene{  
  constructor() {
    super({ key: 'Game' });
  }

  preload () {
    this.load.image('mario', 'assets/mario_run.jpg');
    this.load.image('mario', 'assets/mario_stop.jpg');
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

