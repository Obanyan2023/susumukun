import BaseBackground from "./BaseBackground";

/**
 * 背景の空を管理するクラス
 */
export default class Sky extends BaseBackground {
    /**
     * @var 背景画像（空）
     */
    image: Phaser.GameObjects.Image | null = null;

    /**
     * 背景に使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.scene.load.image("sky1", "hidari.jpg")
    }

    /**
     * 背景を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.image = this.scene.add.image(window.innerWidth, window.innerHeight, "sky1").setScrollFactor(1);
    }
}
