import GameClearImage from "../components/images/GameClearImage";
import TmpButton from "../components/buttons/TmpButton";
import GameEndScene from "./GameEndScene";

/**
 * ゲームクリアシーン
 */
export default class GameClearScene extends GameEndScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super("GameClear");

        this.gameEndImage = new GameClearImage(this);
        this.tmpButton = new TmpButton(this);
    }
}
