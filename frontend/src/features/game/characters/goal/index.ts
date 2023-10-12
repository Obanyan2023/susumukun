import Character from "../Character";
import Player from "../player";
import MainScene from "../../scenes/MainScene";


type GoalName = "goal";
/**
 * ゴールクラス
 */
export default class Goal {
    /**
     * @var 使用されるシーン
     */
    private readonly scene: Phaser.Scene;

    /**
     * @var ゴールオブジェクト
     */
    object: Character | null = null;

    /**
     * @var ゴールのアニメーション
     */
    private name: GoalName;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     * @param {GoalName} name goal
     */
    constructor(scene: Phaser.Scene, name: GoalName) {
        this.scene = scene;
        this.name = name;
    }
    /**
     * ゴールの画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.scene.load.image(this.name , `images/enemy/${this.name}1.png`);
    }

    /**
     * ゴールの作成・初期化
     *
     * ゴールを作成し，アニメーションを設定する．
     * 衝突するオブジェクトを設定する
     *
     * @param {Phaser.Physics.Arcade.StaticGroup[]} objects 衝突するオブジェクト
     * @param {Player} player プレイヤー
     * @param {number} x 初期位置
     * @param {number} y 初期位置
     * @returns {void} 戻り値なし
     */
    create(objects: Phaser.Physics.Arcade.StaticGroup[], player: Player, x: number, y: number): void {
        // ゴールの宣言
        this.object = new Character(this.scene, x, y, this.name);
        this.object.setOrigin(1, 1);
        this.object.setScale(window.innerHeight / this.object.height / 10);
        // 衝突するオブジェクトの設定
        for (const object of objects) {
            this.object.collider(object);
        }
        
        // プレイヤーと接触時の処理　の消滅とゲームクリア判定
        if (player.object != null) {
            this.scene.physics.add.overlap(this.object, player.object, () => {
                let height:number = 20
                if (player.object?.body?.velocity !== undefined && this.object !== null &&
                    player.object?.body.velocity.y > 0 && player.object?.y < this.object?.y - 100)  {

                    player.object?.setVelocityY(-200);
                    this.object?.destroy();
                } else {
                    player.destroy(() => {
                        if (this.scene instanceof MainScene) {
                            const mainscene = this.scene;
                            mainscene.startScene('GameClear');
                        }
                    }
                    , 1000);
                }
            });
        }

    }

}
