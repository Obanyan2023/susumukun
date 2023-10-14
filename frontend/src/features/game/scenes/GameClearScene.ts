import Phaser from "phaser";
import GameClearImage from "../components/images/GameClearImage";
import TmpButton from "../components/buttons/TmpButton";

/**
 * ゲームオーバーシーン
 */
export default class GameClearScene extends Phaser.Scene {
    /**
     * @var ゲームオーバー画像
     */
    private gameClearImage: GameClearImage;

    /**
     * @var ゲーム再スタートボタン
     */
    private tmpButton: TmpButton;

    /**
     * @var スコア
     */
    private score: number = 0;

    /**
     * コンストラクタ
     */
    constructor() {
        super({ key: "GameClear" });

        this.gameClearImage = new GameClearImage(this);
        this.tmpButton = new TmpButton(this);
    }

    /**
     * データの引き継ぎ
     */
    init(data:any) {
        this.score = data.score;
    }
    /**
     * 画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.gameClearImage.preload();
    }

    /**
     * 画像やボタンを作成する
     */
    create(): void {
        this.gameClearImage.create();
        this.tmpButton.create();

        const scoreText = this.add.text(window.innerWidth /2 , window.innerHeight /4, `Score: ${this.score}`, {fontSize: "50px"});
        scoreText.setOrigin(0.5);

        console.log("GameClear!!");
    }
}
