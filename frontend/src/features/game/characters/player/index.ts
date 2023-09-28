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
        this.object = new Character(this.scene, window.innerWidth / 2, window.innerHeight - 80, "susumu");
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
        for (const object of objects ?? []) {
            this.object.collider(object);
        }
    }

    /*
    * 削除処理
    *
    * 
    * @param {()=>void} callback 削除時のコールバック関数
    * @param {number} timeout コールバック関数が呼び出されるまでの待機時間
    */
    distroy(callback:()=>void, timeout:number): void {
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
