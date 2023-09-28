import Character from "../Character";

/**
 * アニメーションクラスの型
 */


/**
 * エネミークラス
 */
export default class Enemy {
    /**
     * @var 使用されるシーン
     */
    private readonly scene: Phaser.Scene;

    /**
     * @var エネミーオブジェクト
     *
     */
    object: Character | null = null;

    /**
     * @var エネミーのアニメーション
     */
    animation: Animation | null = null;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /**
     * エネミーの画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        // プレイヤーの画像を読み込む
        this.scene.load.spritesheet("caterpillar", "images/enemy/base-caterpillar1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    /**
     * プレイヤーの作成・初期化
     *
     * プレイヤーを作成し，アニメーションを設定する．
     * 衝突するオブジェクトを設定する
     *
     * @param {Phaser.Physics.Arcade.StaticGroup[]} objects 衝突するオブジェクト
     * @returns {void} 戻り値なし
     */
    create(objects?: Phaser.Physics.Arcade.StaticGroup[]): void {
        // プレイヤーとそのアニメーションの宣言
        this.object = new Character(this.scene, window.innerWidth / 2 + 10, window.innerHeight - 80, "caterpillar");

        // 衝突するオブジェクトの設定
        for (const object of objects ?? []) {
            this.object.collider(object);
        }
    }
}
