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
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
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
        this.object = new Character(this.scene, window.innerWidth / 2, window.innerHeight - 80, "susumu");
        this.object.setOrigin(0.5, 1);
        this.cursors = this.scene.input.keyboard?.createCursorKeys();
        this.animation = {
            turn: new TurnAnimation(this.scene, this),
            left: new LeftAnimation(this.scene, this),
            right: new RightAnimation(this.scene, this),
        };

        // アニメーションの作成
        this.animation.turn.create();
        this.animation.left.create();
        this.animation.right.create();

        // 初めに正面を向かせるために1度呼び出し
        this.animation.turn.update();

        // カメラの追従
        this.scene.cameras.main.startFollow(this.object);

        // 衝突するオブジェクトの設定
        // 壁に衝突したら加速度と反対向きに減速
        for (const object of objects ?? []) {
            this.object.collider(object, () => {
                if(this.object?.body?.touching.left) {
                    this.object?.setVelocityX(20);
                }
                if(this.object?.body?.touching.right) {
                    this.object?.setVelocityX(-20);
                }
            });
        }

        this.cursors?.up?.on("down", () => {
            if (this.object?.body?.touching.down) {
                this.object?.setVelocityY(-400);
            }
        })

        this.cursors?.left?.on("up", () => {
            this.animation?.turn.update();
            this.object?.setVelocityX(0);
        })

        this.cursors?.right?.on("up", () => {
            this.animation?.turn.update();
            this.object?.setAccelerationX(0);
            this.object?.setVelocityX(0);
        })

        this.cursors?.left?.on( "down", () => {
            this.animation?.left.update();
            this.object?.setAccelerationX(-300);
            this.object?.setVelocityX(-160);
        })

        this.cursors?.right?.on( "down", () => {
            this.animation?.right.update();
            this.object?.setAccelerationX(300);
            this.object?.setVelocityX(160);
        })

    }
    /**
     * x方向の速度の上限・下限値を設定する
     * @returns {void} 戻り値なし
     * @param min 最小値
     * @param max 最大値
     */
    callLimitVelocityX(min:number, max:number): void {
        if (this.object?.body !== null) {
            this.object?.setVelocityX(Phaser.Math.Clamp(this.object?.body.velocity.x , min, max));
        }
    }

    update(): void {
    }

    /**
    * 削除処理
    * 
    * @param {()=>void} callback 削除時のコールバック関数
    * @param {number} timeout コールバック関数が呼び出されるまでの待機時間
    * @returns {void} 戻り値なし
    * @description プレイヤーを非表示にし、待機時間後にコールバック関数を呼び出す。
    */
    destroy(callback:()=>void, timeout:number): void {
        this.object?.setVisible(false);
        this.scene.cameras.main.stopFollow();
        this.scene.time.delayedCall(
            timeout,
            () => {
                callback();
            }
        )
    }
}
