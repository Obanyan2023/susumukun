import { GAME_OVER } from "../../constants/SceneKeys";
import MainScene from "../../scenes/MainScene";
import Character from "../Character";
import Player from "../player";
import {
    BASE_CATERPILLAR,
    ERROR_CATERPILLAR,
    RED_CATERPILLAR,
    GRASSHOPPER,
    ENEMY_CONFIGS,
    EnemyEntity,
} from "../../constants/Enemies";
import { DIFFICULTY_LEVEL_MAP } from "../../constants/DifficultyLevel";
import { getAryRand } from "../../../../utils/Random";

/**
 * エネミーの種類
 */
type EnemyName = typeof BASE_CATERPILLAR | typeof ERROR_CATERPILLAR | typeof RED_CATERPILLAR | typeof GRASSHOPPER;

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
    private enemy: EnemyName;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     * @param {EnemyName} enemy 敵の情報
     */
    constructor(scene: Phaser.Scene, enemy: EnemyName) {
        this.scene = scene;
        this.enemy = enemy;
    }

    update(): void {
        if (!this.object?.body) {
            return;
        }

        // 特定のエネミーの場合，ランダムで反転する
        if (this.enemy === ERROR_CATERPILLAR) {
            const random = Phaser.Math.Between(1, 50);
            if (this.object.body.velocity !== undefined && random === 1) {
                this.object.setVelocityX(this.object.body.velocity.x * -1);
            }
        }

        // エネミーが右向きに移動している場合
        if (this.object.body.velocity.x >= 0) {
            this.object.anims.play(this.enemy.name + "right", true);
        }
        // エネミーが左向きに移動している場合
        else {
            this.object.anims.play(this.enemy.name + "left", true);
        }
    }

    enemy_settings(): void {
        this.object?.setVelocityY(1000);
        this.object?.setBounceX(1);

        this.object?.setVelocityX(this.enemy.velocityX);
    }

    /**
     * エネミーの画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    static preload(scene: Phaser.Scene): void {
        for (let enemy of ENEMY_CONFIGS) {
            scene.load.spritesheet(enemy.name, `images/enemy/${enemy.name}.png`, {
                frameWidth: enemy.frameWidth,
                frameHeight: enemy.frameHeight,
            });
        }
    }
    /**
     * 敵の名前をランダムに取得する
     *
     * @param {number} difficult 難易度
     * @returns {EnemyName} 敵の名前
     */
    static get_enemyName(difficult: number): EnemyName {
        return getAryRand<EnemyEntity>(DIFFICULTY_LEVEL_MAP[difficult].enemies);
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
        this.object = new Character(this.scene, x, y, this.enemy.name);
        this.object.visible = false;
        this.enemy_settings();

        // 衝突するオブジェクトの設定
        for (const object of objects) {
            this.object.collider(object, () => {
                if (this.object !== null) {
                    this.object.visible = true;
                }

                // Grasshopper の場合，地面衝突時にジャンプする
                if (this.enemy === GRASSHOPPER && this.object?.body?.touching.down === true) {
                    this.object?.setVelocityX(0);

                    const timer = Math.floor(Math.random() * 500);
                    this.scene.time.delayedCall(timer, () => {
                        if (this.object?.body?.velocity.x === 0) {
                            this.object?.setVelocityY(-timer);
                            this.object?.setVelocityX(GRASSHOPPER.velocityX);
                        }
                    });
                }
            });

            // 左向きアニメーション
            this.scene.anims.create({
                key: this.enemy.name + "left",
                frames: this.scene.anims.generateFrameNumbers(this.enemy.name, { start: 0, end: 1 }),
                frameRate: this.enemy.frameRate,
                repeat: -1,
            });

            // 右向きアニメーション
            this.scene.anims.create({
                key: this.enemy.name + "right",
                frames: this.scene.anims.generateFrameNumbers(this.enemy.name, { start: 2, end: 3 }),
                frameRate: this.enemy.frameRate,
                repeat: -1,
            });
        }

        // プレイヤーと接触時の処理　敵の消滅とゲームオーバ判定
        if (player.object != null) {
            this.scene.physics.add.overlap(this.object, player.object, () => {
                let mainscene: MainScene | null = null;
                if (this.scene instanceof MainScene) {
                    mainscene = this.scene;
                }
                // プレイヤが死亡していないかつ，プレイヤーが敵より上にいる場合
                if (
                    player.object !== null &&
                    this.object !== null &&
                    player.object.visible &&
                    player.object.y < this.object.y
                ) {
                    player.object.setVelocityY(-200);
                    this.object.setOrigin(0.5, 0);
                    this.object.destroy();
                    mainscene?.updateScore(this.enemy.point);
                } else {
                    player.destroy(() => {
                        mainscene?.startScene(GAME_OVER);
                    }, 1000);
                }
            });
        }
    }
}
