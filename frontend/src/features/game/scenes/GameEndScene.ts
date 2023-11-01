import Phaser from "phaser";
import HomeButton from "../components/buttons/HomeButton";
import GameOverImage from "../components/images/GameOverImage";
import GameClearImage from "../components/images/GameClearImage";
import { storeScoresApi } from "../../scores/api";
import TimeOverImage from "../components/images/TimeOverImage";
import { is_set } from "../../../utils/isType";
import {CAN_CHALLENGE, DIFFICULTY, NICKNAME} from "../constants/localStorageKeys";
import ContinueButton from "../components/buttons/ContinueButton";
import {CHALLENGE, HARD} from "../constants/DifficultyLevel";

export default class GameEndScene extends Phaser.Scene {
  /**
   * @var ゲーム終了画像
   */
  protected gameEndImage: GameOverImage | GameClearImage | TimeOverImage;

  /**
   * @var ゲーム再スタートボタン
   */
  protected tmpButton: HomeButton;

  /**
   * @var ゲームリトライボタン
   */
  protected continueButton: ContinueButton;

  /**
   * @var スコア
   */
  protected score: number = 0;

  /**
   * @var チャレンジモードに挑戦するためのスコア
   */
  protected challengeScore: number = 2000;

  /**
   * コンストラクタ
   *
   * @param {string} key シーンのキー
   */
  constructor(key: string) {
    super({ key: key });

    this.tmpButton = new HomeButton(this);
    this.continueButton = new ContinueButton(this);
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
    this.continueButton.create();

    const scoreText = this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 4,
      `Score: ${this.score}`,
      {
        fontSize: "50px",
      }
    );
    scoreText.setOrigin(0.5);

    // ニックネームの取得
    const nickname =
      localStorage.getItem(NICKNAME)?.length !== 0
        ? localStorage.getItem(NICKNAME)
        : null;

    // プレイ難易度の取得
    const difficulty = Number(localStorage.getItem(DIFFICULTY));

    if (!is_set<number>(difficulty)) {
      return;
    }

    if (CHALLENGE.SEED === difficulty) {
      return;
    }

    if (HARD.SEED === difficulty && this.score >= this.challengeScore && this.gameEndImage instanceof GameClearImage) {
      localStorage.setItem(CAN_CHALLENGE, "true");
    }

    storeScoresApi(nickname ?? "名無し", this.score, difficulty);
  }
}
