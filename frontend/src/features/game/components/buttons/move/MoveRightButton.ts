import Player from "../../../characters/player";
import Button from "../Button";
import MoveButton from "./MoveButton";

/**
 * オブジェクトの右移動を行うボタン
 */
export default class MoveRightButton extends MoveButton {
    /**
     * ボタンを作成する
     *
     * ボタンをクリックしたときの処理を設定する
     *
     * @param {Player} player プレイヤー
     * @returns {void} 戻り値なし
     */
    create(player: Player): void {
        this.object = this.createButton();

        // 右移動を行う
        super.create(player, () => {
            player.object?.setVelocityX(160);
            player.animation?.right.update();
        });
    }

    /**
     * ボタンを作成する
     *
     * @returns {Button} ボタンオブジェクト
     */
    private createButton(): Button {
        return new Button(this.scene, 170, window.innerHeight - 135, "→", {
            fontSize: "90px",
        });
    }
}
