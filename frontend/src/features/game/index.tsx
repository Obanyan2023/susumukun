import Phaser from "phaser"
import { useEffect } from "react";

export const Game = () => {
  const fullscreen = () => {
    const isFullscreen = document.fullscreenElement;
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const preload = () => {
    game.load.image('mario', 'assets/mario_run.jpg');
    game.load.image('mario', 'assets/mario_stop.jpg');
  }
  const create = () => {
  }
  const update = () => {
  }

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
      preload: preload,
      create: create,
      update: update,
    }
  };


  useEffect(() => {
    const game = new Phaser.Game(config);
    return () => {
      game?.destroy(true)
    }
  }, []);

  return (
    <button onClick={fullscreen}>「 」</button>
  )

}

Class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }
}