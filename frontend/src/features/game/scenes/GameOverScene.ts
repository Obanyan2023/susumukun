import GameOverImage from "../components/images/GameOverImage";
import HomeButton from "../components/buttons/HomeButton";
import GameEndScene from "./GameEndScene";
import { GAME_OVER } from "../constants/SceneKeys";

/**
 * ゲームオーバーシーン
 */
export default class GameOverScene extends GameEndScene {
  /**
   * コンストラクタ
   */
  constructor() {
    super(GAME_OVER);

    this.gameEndImage = new GameOverImage(this);
    this.tmpButton = new HomeButton(this);
  }
}
