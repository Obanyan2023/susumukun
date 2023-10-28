import { homedir } from "os";
import Button from "./Button";
import { Home } from "../../../../pages/Home";

/**
 * ゲームオーバ画面のボタン
 */
export default class HomeButton {
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
        console.log("HomeButton is clicked!!");
        window.location.reload();
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
      window.innerWidth / 2 - 300,
      window.innerHeight / 2 + 150,
      "タイトルへ戻る",
      {
        fontSize: "32px",
      }
    ).setOrigin(0.5, 0.5);
  }
}
