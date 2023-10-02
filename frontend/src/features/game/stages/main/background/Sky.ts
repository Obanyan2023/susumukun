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
        this.scene.load.image("hidari", "bgimage.jpg")
    }

    /**
     * 背景を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.image = this.scene.add.image(window.innerWidth/2, window.innerHeight/2,"hidari").setScrollFactor(1);
        const scaleX = window.innerWidth / this.image.width;
        const scaleY = window.innerHeight / this.image.height;
        this.image.setScale(scaleX, scaleY);
        this.image.setOrigin(0.5,0.5);
    }
}
