import GameClearImage from "../components/images/GameClearImage";
import TmpButton from "../components/buttons/TmpButton";
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
        this.tmpButton = new TmpButton(this);
    }
}
