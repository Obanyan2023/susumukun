import { is_set } from "../../../../utils/isType";
import { CHALLENGE as DIFFICULTY_CHALLENGE, NORMAL } from "../../constants/DifficultyLevel";
import { CHALLENGE, DEFAULT, PlayerConfig } from "../../constants/Player";
import { DIFFICULTY } from "../../constants/localStorageKeys";
import Character from "../Character";
import LeftAnimation from "./animations/LeftAnimation";
import RightAnimation from "./animations/RightAnimation";
import TurnAnimation from "./animations/TurnAnimation";

/**
 * アニメーションクラスの型
 */
type Animation = {
    /**
     * 正面を向いている際のアニメーション
     */
    turn: TurnAnimation;

    /**
     * 左向きのアニメーション
     */
    left: LeftAnimation;

    /**
     * 右向きのアニメーション
     */
    right: RightAnimation;
};

/**
 * プレイヤークラス
 */
export default class Player {
    /**
     * @var 使用されるシーン
     */
    private readonly scene: Phaser.Scene;

    /**
     * @var プレイヤーオブジェクト
     *
     */
    object: Character | null = null;

    /**
     * @var プレイヤーのアニメーション
     */
    animation: Animation | null = null;

    /**
     * @var キーボードのカーソルキー
     */
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    /**
     * @var ボタンが押されているかどうか
     */
    leftButtonPressed = false;
    rightButtonPressed = false;

    /**
     * @var 難易度
     */
    private readonly difficulty: number;

    /**
     * @var プレイヤーの設定
     */
    private readonly config: PlayerConfig;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.difficulty = Number(localStorage.getItem(DIFFICULTY)) ?? NORMAL.SEED;
        this.config = this.difficulty !== DIFFICULTY_CHALLENGE.SEED ? DEFAULT : CHALLENGE;
    }

    /**
     * プレイヤーの画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        // プレイヤーの画像を読み込む
        this.scene.load.spritesheet("susumu", "images/player/susumu-sprite.png", {
            frameWidth: 20,
            frameHeight: 31,
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
        this.object = new Character(this.scene, window.innerWidth / 4, window.innerHeight / 2, "susumu");
        this.object.setOrigin(0.5, 1);
        this.cursors = this.scene.input.keyboard?.createCursorKeys();
        this.animation = {
            turn: new TurnAnimation(this.scene, this),
            left: new LeftAnimation(this.scene, this),
            right: new RightAnimation(this.scene, this),
        };

        // 難易度がCHALLENGEの場合は重力を設定する
        if (this.difficulty === DIFFICULTY_CHALLENGE.SEED) {
            this.object.setGravityY(this.config.gravityY ?? 800);
        }

        // アニメーションの作成
        this.animation.turn.create();
        this.animation.left.create();
        this.animation.right.create();

        // 初めに正面を向かせるために1度呼び出し
        this.animation.turn.update();

        // カメラの追従・Y軸の固定
        this.scene.cameras.main.startFollow(this.object, false, 1, 0);

        // 衝突するオブジェクトの設定
        // 壁に衝突したら加速度と反対向きに減速
        for (const object of objects ?? []) {
            this.object.collider(object, (): void => {
                if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)) {
                    return;
                }

                if (this.object.body.touching.left && is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)) {
                    this.object.setVelocityX(20);
                    return;
                }

                if (this.object.body.touching.right && is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)) {
                    this.object.setVelocityX(-20);
                    return;
                }
            });
        }

        this.cursors?.space?.on("down", () => {
            if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)) {
                return;
            }

            if (this.object.body.touching.down && is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)) {
                this.object.setVelocityY(this.config.jumpVelocityY);
                return;
            }
        });

        this.cursors?.up?.on("down", () => {
            if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)) {
                return;
            }

            if (this.object.body.touching.down && is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityY)) {
                this.object.setVelocityY(this.config.jumpVelocityY);
                return;
            }
        });

        this.cursors?.left?.on("up", () => {
            this.leftButtonPressed = false;
            this.stopPlayer();
        });

        this.cursors?.right?.on("up", () => {
            this.rightButtonPressed = false;
            this.stopPlayer();
        });

        this.cursors?.left?.on("down", () => {
            this.leftButtonPressed = true;
            this.movePlayer("left");
        });

        this.cursors?.right?.on("down", () => {
            this.rightButtonPressed = true;
            this.movePlayer("right");
        });

        const keyA = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const keyD = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyA?.on("down",() => {
            this.leftButtonPressed = true;
            this.movePlayer("left");
        });
        keyD?.on("down",() => {
            this.rightButtonPressed = true;
            this.movePlayer("right");
        });
        keyA?.on("up",() => {
            this.leftButtonPressed = false;
            this.stopPlayer();
        });
        keyD?.on("up",() => {
            this.rightButtonPressed = false;
            this.stopPlayer();
        });
    }

    movePlayer(direction: "left" | "right"): void {
        if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body) || !is_set<Animation>(this.animation)) {
            return;
        }

        if (!is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)) {
            return;
        }

        if (direction === "right") {
            this.animation.right.update();
            this.object.setAccelerationX(this.config.rightAccelerationX);
            this.object.setVelocityX(this.config.rightVelocityX);
        }
        if (direction === "left") {
            this.animation.left.update();
            this.object.setAccelerationX(this.config.leftAccelerationX);
            this.object.setVelocityX(this.config.leftVelocityX);
        }
    }

    stopPlayer(): void {
        if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body) || !is_set<Animation>(this.animation)) {
            return;
        }

        if (!is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)) {
            return;
        }

        if (!this.rightButtonPressed && !this.leftButtonPressed) {
            this.animation.turn.update();
            this.object.setAccelerationX(0);
            this.object.setVelocityX(0);
            return;
        }

        if (this.rightButtonPressed) {
            this.animation.right.update();
            this.movePlayer("right");
            return;
        }

        if (this.leftButtonPressed) {
            this.animation.left.update();
            this.movePlayer("left");
            return;
        }
    }

    /**
     * x方向の速度の上限・下限値を設定する
     * @returns {void} 戻り値なし
     * @param min 最小値
     * @param max 最大値
     */
    callLimitVelocityX(min: number, max: number): void {
        if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)) {
            return;
        }

        if (!is_set<(x: number)=>Phaser.Physics.Arcade.Sprite>(this.object.setVelocityX)) {
            return;
        }

        this.object.setVelocityX(Phaser.Math.Clamp(this.object.body.velocity.x, min, max));
    }

    /**
     * プレイヤーの更新
     *
     * @returns {void} 戻り値なし
     */
    update(): void {
        if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)) {
            return;
        }

        // プレイヤーが画面の上側（3割以上）に来たらカメラを上（上限50）に移動させる
        if (this.object.body.y < this.scene.scale.height * 0.3 && this.scene.cameras.main.scrollY > -50) {
            this.scene.cameras.main.setScroll(this.scene.cameras.main.scrollX, this.scene.cameras.main.scrollY - 1);
        }

        // プレイヤーが画面の下側（5割以下）に来たらカメラを下（下限0・中央まで）に移動させる
        if (this.scene.scale.height * 0.5 < this.object.body.y && this.scene.cameras.main.scrollY < 0) {
            if (this.object.body.y !== this.scene.cameras.main.scrollY) {
                this.scene.cameras.main.setScroll(this.scene.cameras.main.scrollX, this.scene.cameras.main.scrollY + 5);
            } else {
                this.scene.cameras.main.setScroll(this.scene.cameras.main.scrollX, this.object.body.y + 1);
            }
        }

        this.callLimitVelocityX(this.config.leftVelocityX, this.config.rightVelocityX);
    }

    /**
     * 削除処理
     *
     * @param {()=>void} callback 削除時のコールバック関数
     * @param {number} timeout コールバック関数が呼び出されるまでの待機時間
     * @returns {void} 戻り値なし
     * @description プレイヤーを非表示にし、待機時間後にコールバック関数を呼び出す。
     */
    destroy(callback: () => void, timeout: number): void {
        if (!is_set<Character>(this.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(this.object.body)) {
            return;
        }

        this.object.setVisible(false);
        this.scene.cameras.main.stopFollow();
        this.scene.time.delayedCall(timeout, () => {
            callback();
        });
    }
}
