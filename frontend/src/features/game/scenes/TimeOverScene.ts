import TimeOverImage from "../components/images/TimeOverImage";
import HomeButton from "../components/buttons/HomeButton";
import GameEndScene from "./GameEndScene";
import { TIME_OVER } from "../constants/SceneKeys";

export default class TimeOverScene extends GameEndScene {
  /**
   * コンストラクタ
   */
  constructor() {
    super(TIME_OVER);

    this.gameEndImage = new TimeOverImage(this);
    this.tmpButton = new HomeButton(this);
  }
}
