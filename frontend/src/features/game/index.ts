import { wait } from "@testing-library/user-event/dist/utils";
import Phaser from "phaser"
import { useState } from "react";

class Game extends Phaser.Scene{  

  leftButton: Phaser.GameObjects.Text | null = null;
  rightButton: Phaser.GameObjects.Text | null = null;
  jumpButton: Phaser.GameObjects.Text | null = null;
  player: Phaser.Physics.Arcade.Sprite | null = null;

  constructor() {
    super({ key: 'Game' });
  }


  preload () {

    this.load.image('susumu-front', 'images/player/susumu-front.png' );
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

    this.leftButton = this.add.text(50, window.innerHeight-135, '←', { fontSize: '90px' });
    this.rightButton = this.add.text(170, window.innerHeight-135, '→', { fontSize: '90px' });
    this.jumpButton = this.add.text(window.innerWidth-200, window.innerHeight-120, 'Jump', { fontSize: '50px' });

    this.player = this.physics.add.sprite(600, 450, 'susumu-front');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player,platforms)
  }

  toggleFullscreen() {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  update() {
    this.leftButton?.setInteractive();
    this.rightButton?.setInteractive();
    this.jumpButton?.setInteractive();


    this.leftButton?.on('pointerdown', () => {
        this.player?.setVelocityX(-160);
     }, this)

    this.leftButton?.on('pointerup', () => { 
      this.player?.setVelocityX(0);
    }, this)

    this.rightButton?.on('pointerdown', () => { 
      this.player?.setVelocityX(160); 
    }, this)

    this.rightButton?.on('pointerup', () => {
      this.player?.setVelocityX(0); 
    }, this)
    this.jumpButton?.on('pointerdown', () => { 
      if (this.player?.body?.touching.down) {
        this.player?.setVelocityY(-400);
      }
    }, this)



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
      gravity: { y: 900 },
      debug: false
    }
  },
  scene: [Game],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};