/**
 * キャラクターの基底クラス
 */
export default class Character extends Phaser.Physics.Arcade.Sprite {
    /**
     * @var 使用されるシーン
     */
    readonly scene: Phaser.Scene;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     * @param {number} x x座標
     * @param {number} y y座標
     * @param {string} texture テクスチャ（読み込んだ画像に割り当てた名前）
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.scene = scene;

        // シーンに追加
        this.scene.add.existing(this);

        // 物理エンジンに追加
        this.scene.physics.add.existing(this);

        // ワールドの境界に衝突するように設定
        this.setCollideWorldBounds(true);
        // x方向のバウンドを設定
        this.setBounceX(0.3);
    }

    /**
     * 衝突するオブジェクトの設定
     *
     * @param {Phaser.Physics.Arcade.StaticGroup} object 衝突するオブジェクト
     * @returns {void} 戻り値なし
     */
    collider(object: Phaser.Physics.Arcade.StaticGroup): void {
        this.scene.physics.add.collider(this, object);
    }
}
