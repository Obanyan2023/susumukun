import Character from "../Character";
import Player from "../player";

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
     * @var エネミーのアニメーション
     */
    name: String | null = null;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     * @param {string} name base-caterpillar, error-caterpillar, red-caterpillar or grasshopper
     */
    constructor(scene: Phaser.Scene, name: String) {
        this.scene = scene;
        this.name = name;
    }

    /**
     * エネミーの画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {

        let spritesheetPath: string | null = null;

        // スプライトシートの名前と画像のパスを条件に応じて設定
        switch (this.name) {
            case "base-caterpillar":
                spritesheetPath = "images/enemy/base-caterpillar1.png";
                break;
            case "error-caterpillar":
                spritesheetPath = "images/enemy/error-caterpillar1.png";
                break;
            case "red-caterpillar":
                spritesheetPath = "images/enemy/red-caterpillar1.png";
                break;
            case "grasshopper":
                spritesheetPath = "images/enemy/grasshopper1.png";
                break;
        }

        // spritesheetPath が設定されている場合にのみ読み込みを行う
        if (spritesheetPath) {
            this.scene.load.spritesheet(`${this.name}`, spritesheetPath, {
                frameWidth: 32,
                frameHeight: 32,
            });
        }
    }

    /**
     * エネミーの作成・初期化
     *
     * エネミーを作成し，アニメーションを設定する．
     * 衝突するオブジェクトを設定する
     *
     * @param {Phaser.Physics.Arcade.StaticGroup[]} objects 衝突するオブジェクト
     * @returns {void} 戻り値なし
     */
    create(objects?: Phaser.Physics.Arcade.StaticGroup[], player?: Player, x?: number, y?: number): void {
        // エネミーとそのアニメーションの宣言
        this.object = new Character(this.scene, x as number, y as number, `${this.name}`);

        // 衝突するオブジェクトの設定
        for (const object of objects ?? []) {
            this.object.collider(object);
        }

        player?.object &&
        this.scene.physics.add.overlap(this.object, player?.object, () => {
            //仮の衝突処理
            player.distroy(() => {
                this.scene.scene.start("GameOver")
            }
            , 1000);
        });



    }
}
