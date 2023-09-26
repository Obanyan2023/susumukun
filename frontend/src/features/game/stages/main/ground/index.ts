import BaseGround from "./BaseGround";
import Platform from "./Platform";

/**
 * 地面を管理するクラス
 */
export default class Ground extends BaseGround {
    /**
     * @var 地面（プラットフォーム）
     */
    platform: Platform;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene
     */
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.platform = new Platform(scene);
    }

    /**
     * 地面に使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.platform.preload();
    }

    /**
     * 地面を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.platform.create();
    }
}
