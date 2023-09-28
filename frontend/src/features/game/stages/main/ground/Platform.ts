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
        let x;
        const bottom = window.innerHeight-30;
        this.object = this.scene.physics.add.staticGroup();
        
        for (x = 16; x < window.innerWidth; x += 32) {
            this.object
                .create(x, bottom, "ground")
                .setScale(2)
                .refreshBody();
        }
        x += 32;
        this.object.create(x, bottom-64, "ground").setScale(2).refreshBody();
        x += 64;
        this.object.create(x, bottom-128, "ground").setScale(2).refreshBody();
        x += 64;
        this.object.create(x, bottom-192, "ground").setScale(2).refreshBody();

    }
}
