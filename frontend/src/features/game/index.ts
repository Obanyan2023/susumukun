import Phaser from "phaser"

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.image('mario', 'assets/mario_run.jpg');
    this.load.image('mario', 'assets/mario_stop.jpg');
    this.load.image('sky', 'sky.png');
    this.load.image('ground', 'platform.png');
  }

  create() {

    // 背景と地面の作成
    let platforms;
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(window.innerWidth / 2, window.innerHeight - 30, 'ground').setScale(2).refreshBody();

    // フルスクリーンボタンを作成
    const fullscreenButton = this.add.text(window.innerWidth - 100, 50, 'FS', { fontSize: '32px' });
    fullscreenButton.setInteractive();
    fullscreenButton.on('pointerup', this.toggleFullscreen, this);
    const leftButton = this.add.text(50, window.innerHeight - 135, '←', { fontSize: '90px' });
    const rightButton = this.add.text(170, window.innerHeight - 135, '→', { fontSize: '90px' });
    const jumpButton = this.add.text(window.innerWidth - 200, window.innerHeight - 120, 'Jump', { fontSize: '50px' });
  }

  toggleFullscreen() {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  update() {
  }
}

export const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.ScaleModes.FIT,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Game],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

