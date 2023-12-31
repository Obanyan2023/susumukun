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
        this.scene.load.image("parkingarea", "images/background/ground.png");
    }

    /**
     * 背景を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.image = this.scene.add.image(0, window.innerHeight / 2, "parkingarea").setScrollFactor(0.1);
        const maxSize = Math.min(window.innerWidth, window.innerHeight);
        const imageMarginHeight = Math.max(50000 / maxSize, 1);
        const imageHeight = this.image.height - imageMarginHeight;
        const scale = window.innerHeight / imageHeight;

        this.image.setScale(scale, scale);
        this.image.setOrigin(0, 0.5);
        this.image.setPosition(0, window.innerHeight / 2 - imageMarginHeight / 3);
    }
}
