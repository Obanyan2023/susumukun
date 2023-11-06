import Phaser from "phaser"
import React from "react";
import { config } from "../../features/game/index";
import {customBoolean, is_set} from "../../utils/isType";
import {PLAYING} from "../../features/game/constants/localStorageKeys";

export const GameComponent = () => {
    const [game, setGame] = React.useState<Phaser.Game | null>(null);

    React.useEffect(() => {
        const game = new Phaser.Game(config);

        localStorage.setItem(PLAYING, "true");

        window.addEventListener('resize', () => {
            try {
                game.scale.setGameSize(window.innerWidth, window.innerHeight);
            } catch (e) {
                //
            }
        });

        setGame(game);

        return () => {
            game?.destroy(true)
        };

    }, []);

    return (
        <div />
    )

}