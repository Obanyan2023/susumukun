import BaseBackground from "./BaseBackground";
import ExampleMoveEntity from "./ExampleMoveEntity";
import Sky from "./Sky";

/**
 * 背景を管理するクラス
 */
export default class Background extends BaseBackground {
    /**
     * @var 背景画像（空）
     */
    sky: Sky;

    /**
     * @var 動く背景
     */
    exampleMoveEntity: ExampleMoveEntity;

    /**
     * コンストラクタ
     *
     * 背景を管理するクラスのインスタンスを作成する
     *
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.sky = new Sky(scene);
        this.exampleMoveEntity = new ExampleMoveEntity(scene);
    }

    /**
     * 背景に使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.sky.preload();
        this.exampleMoveEntity.preload();
    }

    /**
     * 背景を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.sky.create();
        this.exampleMoveEntity.create();
    }
}
