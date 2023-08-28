import Phaser from "phaser"

export const Gamewindow = () => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
    };
    const game = new Phaser.Game(config);
}