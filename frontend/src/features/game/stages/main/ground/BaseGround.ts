/**
 * 地面の基底クラス
 */
export default abstract class BaseGround {
    /**
     * @var シーン
     */
    protected readonly scene: Phaser.Scene;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
}
