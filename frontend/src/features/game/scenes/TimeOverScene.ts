import TimeOverImage from "../components/images/TimeOverImage";
import TmpButton from "../components/buttons/TmpButton";
import GameEndScene from "./GameEndScene";
import {TIME_OVER} from "../constants/SceneKeys";

export default class TimeOverScene extends GameEndScene {
      /**
     * コンストラクタ
     */
      constructor() {
        super(TIME_OVER);

        this.gameEndImage = new TimeOverImage(this);
        this.tmpButton = new TmpButton(this);
    }
}