import GameClearImage from "../components/images/GameClearImage";
import HomeButton from "../components/buttons/HomeButton";
import GameEndScene from "./GameEndScene";
import { GAME_CLEAR } from "../constants/SceneKeys";

/**
 * ゲームクリアシーン
 */
export default class GameClearScene extends GameEndScene {
  /**
   * コンストラクタ
   */
  constructor() {
    super(GAME_CLEAR);

    this.gameEndImage = new GameClearImage(this);
    this.tmpButton = new HomeButton(this);
  }
}
