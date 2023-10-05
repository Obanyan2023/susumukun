import Phaser from "phaser";
import GameOverScene from "./scenes/GameOverScene";
import MainScene from "./scenes/MainScene";

/**
 * ゲームの設定
 */
export const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.ScaleModes.FIT,
    width: window.innerWidth,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false,
        },
    },

    scene: [MainScene, GameOverScene],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    input: {
        activePointers: 2,
    },
};
