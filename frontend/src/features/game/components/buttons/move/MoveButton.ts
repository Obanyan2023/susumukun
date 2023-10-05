import Phaser from "phaser";
import Button from "../Button";
import Player from "../../../characters/player";

/**
 * オブジェクトの移動を行うボタンの基底クラス
 */
export default class MoveButton {
    /**
     * @var 使用されるシーン
     */
    protected readonly scene: Phaser.Scene;

    /**
     * @var ボタンオブジェクト
     */
    object: Button | null = null;

    /**
     * コンストラクタ
     *
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /**
     * ボタンの設定を行う
     *
     * 子クラスで呼び出される前提のメソッド
     * クリックが離されたときの処理を設定する
     *
     * @param {Player} player プレイヤー
     * @param {Function} pointerDown ボタンをクリックしたときの処理
     * @returns {void} 戻り値なし
     */
    create(player: Player, pointerDown: Function): void {
        if (this.object === null) {
            return;
        }

        this.pointerUp(player);
        this.object.on("pointerdown", pointerDown);
    }

    /**
     * クリックがはなされたときのイベントを定義する
     *
     * @param {Player} player プレイヤー
     * @returns {void} 戻り値なし
     */
    private pointerUp(player: Player): void {
        this.scene.input.on("pointerup", (pointer: Phaser.Input.Pointer) => this.event(player, pointer), this);
    }

    /**
     * クリックがはなされたときのイベント
     *
     * ポインターが画面左側の場合
     *  - アニメーションを正面に設定する
     *  - プレイヤーの移動を止める
     *
     * @param {Player} player プレイヤー
     * @param {Phaser.Input.Pointer} pointer ポインター
     * @returns {void} 戻り値なし
     */
    private event(player: Player, pointer: Phaser.Input.Pointer): void {
        if (pointer.x >= this.scene.cameras.main.width / 2) {
            return;   
        }

        player.animation?.turn.update();
        player.object?.setAccelerationX(0);
        player.object?.setVelocityX(0);
    }
}
