import Background from "./background";
import Ground from "./ground";

/**
 * メインステージクラス
 */
export default class MainStage {
    /**
     * @var 地面
     */
    ground: Ground;

    /**
     * @var 背景
     */
    background: Background;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.background = new Background(scene);
        this.ground = new Ground(scene);
    }

    /**
     * メインステージに使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.background.preload();
        this.ground.preload();
    }

    /**
     * メインステージを作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.background.create();
        this.ground.create();
    }
}
