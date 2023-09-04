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

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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