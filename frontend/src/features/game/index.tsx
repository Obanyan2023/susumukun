import Phaser from "phaser"
import { useEffect } from "react";

export class Game extends Phaser.Scene{
  config = {
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
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update
    }
  };  

  preload () {
    this.load.image('mario', 'assets/mario_run.jpg');
    this.load.image('mario', 'assets/mario_stop.jpg');
  }

  create () {
  }

  update () {
  }
}


class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }
}