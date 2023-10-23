import Phaser from "phaser"
import React from "react";
import { config } from "../../features/game/index";
import { is_set } from "../../utils/isType";

export const GameComponent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [game, setGame] = React.useState<Phaser.Game | null>(null);
    const screenOrientation = window.screen.orientation;

    // 画面を横向きに固定
    if (is_set(screenOrientation) && (screenOrientation as any).lock) {
        // @ts-ignore
        (screenOrientation as any).lock('landscape')
            .catch((error: unknown) => {
                //
            });
    }

    React.useEffect(() => {
        const game = new Phaser.Game(config);
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