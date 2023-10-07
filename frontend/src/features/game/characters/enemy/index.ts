import { createSecretKey } from "crypto";
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

    update(): void{
       if(this.name=="error-caterpillar"){
        var random=Phaser.Math.Between(1,50);
                if(this.object?.body?.velocity!==undefined && random === 1){
                    this.object?.setVelocityX(this.object.body?.velocity.x * -1 );
            }
       }
    }

    enemy_move(): void {
        this.object?.setBounceX(1);
        switch (this.name) {
            case "base-caterpillar":
                this.object?.setVelocity(20);
                break;
            case "red-caterpillar":
                this.object?.setVelocity(100);
                break;
            case "error-caterpillar":
                this.object?.setVelocity(40);
                break;
            case "grasshopper":
                this.object?.setAccelerationY(50);
                this.object?.setBounceY(1);
                break;
            default:
                break;
        }
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
        this.enemy_move();
        // 衝突するオブジェクトの設定
        for (const object of objects) {
            this.object.collider(object);
        }
        
        // プレイヤーと接触時の処理　敵の消滅とゲームオーバ判定
        if (player.object != null) {
            this.scene.physics.add.overlap(this.object, player.object, () => {
                if (player.object !== null && this.object !== null && player.object.y < this.object.y) {

                    player.object?.setVelocityY(-200);
                    this.object?.setOrigin(0.5, 0);
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
