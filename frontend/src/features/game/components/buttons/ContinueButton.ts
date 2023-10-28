import { GAME } from "../../constants/SceneKeys";
import { DIFFICULTY, NICKNAME } from "../../constants/localStorageKeys";
import MainScene from "../../scenes/MainScene";
import Button from "./Button";

/**
 * ゲームオーバ画面のボタン
 */
export default class ContinueButton {
  /**
   * @var 使用されるシーン
   */
  private readonly scene: Phaser.Scene;

  /**
   * @var ボタンオブジェクト
   */
  object: Button | null = null;

  /**
   * コンストラクタ
   *
   * @param scene シーン
   */
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * ボタンを作成する
   *
   * @returns {void} 戻り値なし
   */
  create(): void {
    this.object = this.createButton();

    /**
     * ボタンのクリックが離されたときの処理
     */
    this.object.on(
      "pointerup",
      () => {
        console.log("ContinueButton is clicked!!");
        window.localStorage.getItem(DIFFICULTY);
        window.localStorage.getItem(NICKNAME);
        this.scene.scene.start(GAME);
      },
      this
    );
  }

  /**
   * ボタンを作成する
   *
   * @returns {Button} ボタンオブジェクト
   */
  createButton(): Button {
    return new Button(
      this.scene,
      window.innerWidth / 2 + 300,
      window.innerHeight / 2 + 150,
      "もう一度プレイ",
      {
        fontSize: "32px",
      }
    ).setOrigin(0.5, 0.5);
  }
}