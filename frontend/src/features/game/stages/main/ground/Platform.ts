import BaseGround from "./BaseGround";

/**
 * プラットフォームクラス
 */
export default class Platform extends BaseGround {
    /**
     * @var プラットフォーム
     */
    object: Phaser.Physics.Arcade.StaticGroup | null = null;

    /**
     * プラットフォームに使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.scene.load.image("ground", "platform.png");
    }

    /**
     * プラットフォームを作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.object = this.scene.physics.add.staticGroup();

        for (let index = 16; index < window.innerWidth; index += 32) {
            this.object
                .create(index, window.innerHeight - 30, "ground")
                .setScale(2)
                .refreshBody();
        }
    }
}
