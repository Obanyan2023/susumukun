import MainScene from "../../scenes/MainScene";
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
     * @var enemyを倒したときの得点
     */
    private point: number = 0;

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

    enemy_settings(): void {
        this.object?.setVelocityY(2000);
        this.object?.setBounceX(1);
        switch (this.name) {
            case "base-caterpillar":
                this.object?.setVelocity(20);
                this.point = 50;
                break;
            case "red-caterpillar":
                this.object?.setVelocity(100);
                this.point = 100;
                break;
            case "error-caterpillar":
                this.object?.setVelocity(80);
                this.point = 130;
                break;
            case "grasshopper":
                this.object?.setVelocityX(80)
                this.point = 150;
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
    static preload(scene:Phaser.Scene): void {
        for (let enemy of [ "base-caterpillar", "error-caterpillar", "red-caterpillar", "grasshopper"]) {
            scene.load.spritesheet(enemy , `images/enemy/${enemy}1.png`, {
                frameWidth: 32,
                frameHeight: 32,
            })
        }
    }
    /**
     * 敵の名前をランダムに取得する 
     * @returns {EnemyName} 敵の名前
     */
    static get_enemyName() : EnemyName {
        let enemy_name : EnemyName = "base-caterpillar";
        switch (Phaser.Math.Between(0, 3)) {
            case 0:
                enemy_name = "base-caterpillar";
                break;
            case 1:
                enemy_name = "error-caterpillar";
                break;
            case 2:
                enemy_name = "red-caterpillar";
                break;
            case 3:
                enemy_name = "grasshopper";
                break;
        }
        return enemy_name;
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
        this.object.visible = false;
        this.enemy_settings();
        // 衝突するオブジェクトの設定
        for (const object of objects) {
            this.object.collider(object, () => {
                if (this.object !== null) {
                    this.object.visible= true;
                }
                if (this.name === "grasshopper" &&  this.object?.body?.touching.down === true) {
                    this.object?.setVelocityY(-500);
                }
            });
        }
        
        // プレイヤーと接触時の処理　敵の消滅とゲームオーバ判定
        if (player.object != null) {
            this.scene.physics.add.overlap(this.object, player.object, () => {
                if (player.object !== null && this.object !== null && player.object.y < this.object.y) {
                    player.object.setVelocityY(-200);
                    this.object.setOrigin(0.5, 0);
                    this.object.destroy();
                    let mainscene: MainScene;
                    if (this.scene instanceof MainScene) {
                        mainscene = this.scene;
                        mainscene.updateScore(this.point);
                        console.log(mainscene.getScore());
                    }
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
