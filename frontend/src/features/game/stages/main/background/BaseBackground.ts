/**
 * 背景の基底クラス
 */
export default abstract class BaseBackground {
    /**
     * @var シーン
     */
    protected readonly scene: Phaser.Scene;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
}
