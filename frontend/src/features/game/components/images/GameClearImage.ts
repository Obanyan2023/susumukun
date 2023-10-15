/**
 * ゲームクリア画像
 */
export default class GameClearImage {
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
        this.scene.load.image("gameclear", "images/tmp/gameclear.jpg");
    }

    /**
     * 画像を作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        const gameClearImage = this.scene.add.image(window.innerWidth/2, window.innerHeight/2, "gameclear");
        const scale = window.innerWidth / gameClearImage.width;
        gameClearImage.setOrigin(0.5);
        gameClearImage.setScale(scale);
        }
    
}
