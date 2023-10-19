/**
 * タイムオーバー画像
 */
export default class TimeOverImage {
    /**
     * @var 使用されるシーン
     */
    private readonly scene: Phaser.Scene;

    /**
     * コンストラクタ
     *
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /**
     * 画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.scene.load.image("TimeOver", "images/tmp/timeover.jpg");
    }

    /**
     * 画像を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        const timeOverImage = this.scene.add
            .image(window.innerWidth /2, window.innerHeight /2, "TimeOver")
            .setOrigin(0.5, 0.5)
            .setScale(0.5);
            const scale = window.innerWidth / timeOverImage.width;
        timeOverImage.setOrigin(0.5);
        timeOverImage.setScale(scale);
    }
}