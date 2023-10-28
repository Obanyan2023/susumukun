import Player from "../../../characters/player";
import Button from "../Button";
import MoveButton from "./MoveButton";

/**
 * オブジェクトの左移動を行うボタン
 */
export default class MoveLeftButton extends MoveButton {
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

        // 左移動を行う
        super.create(player, () => {
            player.object?.setVelocityX(this.config.leftVelocityX);
            player.object?.setAccelerationX(this.config.leftAccelerationX);
            player.animation?.left.update();
        });
    }

    /**
     * ボタンを作成する
     *
     * @returns {Button} ボタンオブジェクト
     */
    private createButton(): Button {
        return new Button(this.scene, 50, window.innerHeight - 120, "←", {
            fontSize: "90px",
        });
    }
}
