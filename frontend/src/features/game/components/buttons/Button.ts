import Phaser from "phaser";

/**
 * ボタンの基底クラス
 */
export default class Button extends Phaser.GameObjects.Text {
    /**
     * コンストラクタ
     *
     * @param {Phaser.Scene} scene シーン
     * @param {number} x x座標
     * @param {number} y y座標
     * @param {string} text テキスト
     * @param {object} style ボタンのスタイル
     */
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style: object) {
        super(scene, x, y, text, style);

        // シーンに追加
        scene.add.existing(this);

        // ボタンをクリックできるように
        this.setInteractive({ useHandCursor: true });

        // 画面スクロールに追従
        this.setScrollFactor(0);

        // ボタンのスタイルを設定
        this.setStyle(style);
    }
}
