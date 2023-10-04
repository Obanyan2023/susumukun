import Character from "../Character";
import Player from "../player";

/**
 * エネミーの種類
 */
type EnemyName = "base-caterpillar" | "error-caterpillar" | "red-caterpillar" | "grasshopper";
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
     */
    object: Character | null = null;

    /**
     * @var エネミーのアニメーション
     */
    private name: EnemyName;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     * @param {EnemyName} name base-caterpillar, error-caterpillar, red-caterpillar or grasshopper
     */
    constructor(scene: Phaser.Scene, name: EnemyName) {
        this.scene = scene;
        this.name = name;
    }


    /**
     * エネミーの画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.scene.load.spritesheet(this.name , `images/enemy/${this.name}1.png`, {
            frameWidth: 32,
            frameHeight: 32,
        })
    }

    /**
     * エネミーの作成・初期化
     *
     * エネミーを作成し，アニメーションを設定する．
     * 衝突するオブジェクトを設定する
     *
     * @param {Phaser.Physics.Arcade.StaticGroup[]} objects 衝突するオブジェクト
     * @param {Player} player プレイヤー
     * @param {number} x 初期位置
     * @param {number} y 初期位置
     * @returns {void} 戻り値なし
     */
    create(objects: Phaser.Physics.Arcade.StaticGroup[], player: Player, x: number, y: number): void {
        // エネミーの宣言
        this.object = new Character(this.scene, x, y, this.name);

        // 衝突するオブジェクトの設定
        for (const object of objects) {
            this.object.collider(object);
        }

        // プレイヤーと接触時の処理　敵の消滅とゲームオーバ判定
        if (player.object != null) {
            this.scene.physics.add.overlap(this.object, player.object, () => {
                const height:number = 34;
                if (player.object?.body?.velocity !== undefined && this.object?.y !== null && player.object?.body.velocity.y > 0 && player.object?.y < this.object?.y - height) {

                    player.object?.setVelocityY(-200);
                    this.object?.destroy();
                } else {
                    player.destroy(() => {
                        this.scene.scene.start("GameOver")
                    }
                    , 1000);
                }
            });
        }
    }
}
