import Player from "..";

/**
 * プレイヤーのアニメーションの抽象クラス
 */
export default abstract class Animation {
    /**
     * @var 使用されるシーン
     */
    protected readonly scene: Phaser.Scene;

    /**
     * @var プレイヤー
     */
    player: Player;

    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     * @param {Player} player プレイヤー
     */
    constructor(scene: Phaser.Scene, player: Player) {
        this.scene = scene;
        this.player = player;
    }

    /**
     * アニメーションの作成
     *
     * @returns {void} 戻り値なし
     */
    abstract create(): void;

    /**
     * アニメーションの更新
     *
     * @returns {void} 戻り値なし
     */
    abstract update(): void;
}
