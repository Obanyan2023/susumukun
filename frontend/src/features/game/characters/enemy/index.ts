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
    CHALLENGE_ERROR_CATERPILLAR,
    CHALLENGE_GRASSHOPPER,
} from "../../constants/Enemies";
import { DIFFICULTY_LEVEL_MAP } from "../../constants/DifficultyLevel";
import { getAryRand } from "../../../../utils/Random";
import { is_set } from "../../../../utils/isType";

/**
 * エネミーの種類
 */
type EnemyName =
    | typeof BASE_CATERPILLAR
    | typeof ERROR_CATERPILLAR
    | typeof RED_CATERPILLAR
    | typeof GRASSHOPPER
    | typeof CHALLENGE_ERROR_CATERPILLAR
    | typeof CHALLENGE_GRASSHOPPER;

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

    /**
     * シーンの更新
     *
     * @return {void} 戻り値なし
     */
    update(): void {
        if (
            !is_set<Character>(this.object) ||
            !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)
        ) {
            return;
        }

        if (this.scene.cameras.main.scrollX !== 0 && this.object.body.x + 200 < this.scene.cameras.main.scrollX) {
            this.object.setPosition(this.scene.cameras.main.scrollX + this.scene.scale.width + 200, this.object.y / 1.2);
        }

        // ERROR_CATERPILLAR の場合，ランダムで反転する
        if (this.enemy === ERROR_CATERPILLAR) {
            const random = Phaser.Math.Between(1, 50);
            if (random === 1) {
                this.object.setVelocityX(this.object.body.velocity.x * -1);
            }
        }

        // CHALLENGE_ERROR_CATERPILLAR の場合，ランダムで反転する
        if (this.enemy === CHALLENGE_ERROR_CATERPILLAR) {
            const seed = Phaser.Math.Between(1, 50);
            const velocityX = this.object.body.velocity.x;
            const pm = Math.floor(Math.random() * 2) - 1;
            const deceleration = 5;

            // 速度が一定以上の場合，減速する
            // 速度が一定以下の場合，ランダムな方向に移動する
            if (deceleration <= velocityX) {
                this.object.setVelocityX(velocityX - deceleration);
            } else if (0 < velocityX) {
                this.object.setVelocityX(CHALLENGE_ERROR_CATERPILLAR.velocityX * pm);
            } else if (velocityX <= -deceleration) {
                this.object.setVelocityX(velocityX + deceleration);
            } else if (velocityX < 0) {
                this.object.setVelocityX(CHALLENGE_ERROR_CATERPILLAR.velocityX * pm);
            } else {
                this.object.setVelocityX(CHALLENGE_ERROR_CATERPILLAR.velocityX * pm);
            }

            // シード値が 1 の場合，反転する
            if (seed === 1) {
                this.object.setVelocityX(this.object.body.velocity.x * -1);
            }

            // シード値が 2 の場合，ランダム時間停止する
            if (this.object.body.velocity.x !== 0 && seed === 2) {
                const timer = Math.floor(Math.random() * 2);

                this.object.setVelocityX(0);
                this.scene.time.delayedCall(timer, () => {
                    try {
                        if (is_set<Character>(this.object) && is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)) {
                            this.object.setVelocityX(CHALLENGE_ERROR_CATERPILLAR.velocityX * pm);
                        }
                    } catch (e) {
                        //
                    }
                });
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
        if (!is_set<Character>(this.object)) {
            return;
        }

        this.object.setVelocityY(1000);
        this.object.setBounceX(1);

        this.object.setVelocityX(this.enemy.velocityX);
    }

    /**
     * エネミーの画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    static preload(scene: Phaser.Scene): void {
        for (const enemy of ENEMY_CONFIGS) {
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
                if (
                    !is_set<Character>(this.object) ||
                    !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)
                ) {
                    return;
                }

                this.object.visible = true;

                // Grasshopper の場合，地面衝突時にジャンプする
                if (this.enemy === GRASSHOPPER && this.object.body.touching.down === true) {
                    this.object.setVelocityX(0);

                    const timer = Math.floor(Math.random() * 500);
                    this.scene.time.delayedCall(timer, () => {
                        try {
                            if (
                                !is_set<Character>(this.object) ||
                                !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body) ||
                                !is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)
                            ) {
                                return;
                            }

                            if (this.object.body.velocity.x === 0) {
                                this.object.setVelocityY(-timer);
                                this.object.setVelocityX(GRASSHOPPER.velocityX);
                            }
                        } catch (e) {
                            //
                        }
                    });
                }

                // CHALLENGE_GRASSHOPPER の場合，地面衝突時にジャンプする
                if (this.enemy === CHALLENGE_GRASSHOPPER && this.object.body.touching.down === true) {
                    this.object.setVelocityX(0);

                    const timer = Math.floor(Math.random() * 500) + 500;
                    this.scene.time.delayedCall(timer, () => {
                        try {
                            if (
                                !is_set<Character>(this.object) ||
                                !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body) ||
                                !is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)
                            ) {
                                return;
                            }

                            if (this.object.body.velocity.x === 0) {
                                this.object.setVelocityY(-timer);
                                this.object.setVelocityX(CHALLENGE_GRASSHOPPER.velocityX);
                            }
                        } catch (e) {
                            //
                        }
                    });
                }
            });

            if (!this.scene.anims.exists(this.enemy.name + "left") && !this.scene.anims.exists(this.enemy.name + "right")) {
                // 左向きアニメーション
                this.scene.anims.create({
                    key: this.enemy.name + "left",
                    frames: this.scene.anims.generateFrameNumbers(this.enemy.name, {start: 0, end: 1}),
                    frameRate: this.enemy.frameRate,
                    repeat: -1,
                });

                // 右向きアニメーション
                this.scene.anims.create({
                    key: this.enemy.name + "right",
                    frames: this.scene.anims.generateFrameNumbers(this.enemy.name, {start: 2, end: 3}),
                    frameRate: this.enemy.frameRate,
                    repeat: -1,
                });
            }
        }

        if (!is_set<Player>(player) || !is_set<Character>(player.object)) {
            return;
        }

        // プレイヤーと接触時の処理　敵の消滅とゲームオーバ判定
        this.scene.physics.add.overlap(this.object, player.object, () => {
            if (!(this.scene instanceof MainScene)) {
                return;
            }

            const mainScene: MainScene = this.scene as MainScene;

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
                mainScene.updateScore(this.enemy.point);
            } else {
                player.destroy(() => {
                    mainScene.startScene(GAME_OVER);
                }, 1000);
            }
        });
    }
}
