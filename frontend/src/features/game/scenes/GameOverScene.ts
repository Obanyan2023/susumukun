import GameOverImage from "../components/images/GameOverImage";
import TmpButton from "../components/buttons/TmpButton";
import GameEndScene from "./GameEndScene";

/**
 * ゲームオーバーシーン
 */
export default class GameOverScene extends GameEndScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super("GameOver");

        this.gameEndImage = new GameOverImage(this);
        this.tmpButton = new TmpButton(this);
    }
}
