import Phaser from "phaser";
import GameOverImage from "../components/images/GameOverImage";
import TmpButton from "../components/buttons/TmpButton";

/**
 * ゲームオーバーシーン
 */
export default class GameOverScene extends Phaser.Scene {
    /**
     * @var ゲームオーバー画像
     */
    private gameOverImage: GameOverImage;

    /**
     * @var ゲーム再スタートボタン
     */
    private tmpButton: TmpButton;

    /**
     * コンストラクタ
     */
    constructor() {
        super({ key: "GameOver" });

        this.gameOverImage = new GameOverImage(this);
        this.tmpButton = new TmpButton(this);
    }

    /**
     * 画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.gameOverImage.preload();
    }

    /**
     * 画像やボタンを作成する
     */
    create(): void {
        this.gameOverImage.create();
        this.tmpButton.create();

        console.log("GameOver!!");
    }
}
