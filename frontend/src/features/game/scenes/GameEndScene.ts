import Phaser from "phaser";
import TmpButton from "../components/buttons/TmpButton";
import GameOverImage from "../components/images/GameOverImage";
import GameClearImage from "../components/images/GameClearImage";
import { storeScoresApi } from "../../scores/api";

export default class GameEndScene extends Phaser.Scene {
    /**
     * @var ゲーム終了画像
     */
    protected gameEndImage: GameOverImage | GameClearImage;

    /**
     * @var ゲーム再スタートボタン
     */
    protected tmpButton: TmpButton;

    /**
     * @var スコア
     */
    protected score: number = 0;

    /**
     * コンストラクタ
     *
     * @param {string} key シーンのキー
     */
    constructor(key: string) {
        super({ key: key });

        this.tmpButton = new TmpButton(this);
        this.gameEndImage = new GameOverImage(this);
    }

    /**
     * データの引き継ぎ
     *
     * @param {any} data 引き継ぎデータ
     * @returns {void} 戻り値なし
     */
    init(data: any): void {
        this.score = data.score;
    }

    /**
     * 画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.gameEndImage.preload();
    }

    /**
     * 画像やボタンを作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.gameEndImage.create();
        this.tmpButton.create();

        const scoreText = this.add.text(window.innerWidth / 2, window.innerHeight / 4, `Score: ${this.score}`, {
            fontSize: "50px",
        });
        scoreText.setOrigin(0.5);

        storeScoresApi(Math.random().toString(32).substring(2), this.score);
    }
}
