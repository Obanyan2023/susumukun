import MoveEntity from "./MoveEntity";

/**
 * 動く背景のサンプル
 */
export default class ExampleMoveEntity extends MoveEntity {
    /**
     * 動く背景画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        //
    }

    /**
     * 動く背景画像を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        super.create({
            texture: "ground",
            x: 0,
            y: 600 / 2,
            xOrigin: 0,
            yOrigin: 0.75,
            scrollFactor: 0.25,
        });

        super.create({
            texture: "ground",
            x: 800 * 1,
            y: 600 / 2,
            xOrigin: 0,
            yOrigin: 0.75,
            scrollFactor: 0.25,
        });

        super.create({
            texture: "ground",
            x: 800 * 2,
            y: 600 / 2,
            xOrigin: 0,
            yOrigin: 0.75,
            scrollFactor: 0.25,
        });
    }
}
