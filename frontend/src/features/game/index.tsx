import Phaser from "phaser"
import { useEffect } from "react";

export const Game = () => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
    };

    useEffect(() => {
        const g = new Phaser.Game(config)
        return () => {
          g?.destroy(true)
        }
      }, []);

    return (
        <div></div>
    )
        
}
