import TimeOverImage from "../components/images/TimeOverImage";
import TmpButton from "../components/buttons/TmpButton";
import GameEndScene from "./GameEndScene";

export default class TimeOverScene extends GameEndScene {
      /**
     * コンストラクタ
     */
      constructor() {
        super("TimeOver");

        this.gameEndImage = new TimeOverImage(this);
        this.tmpButton = new TmpButton(this);
    }
}