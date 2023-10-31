import Player from "../../../characters/player";
import Button from "../Button";
import MoveButton from "./MoveButton";
import {is_set} from "../../../../../utils/isType";
import Character from "../../../characters/Character";

/**
 * オブジェクトのジャンプを行うボタン
 */
export default class MoveJumpButton extends MoveButton {
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

        // 地面に着地しているときのみオブジェクトのジャンプを行う
        super.create(player, () => {
            if (!is_set<Character>(player.object) || !is_set<Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody>(player.object.body)) {
                return;
            }

            if (player.object.body.touching.down) {
                player.object.setVelocityY(this.config.jumpVelocityY);
                return;
            }
        });
    }

    /**
     * ボタンを作成する
     *
     * @returns {Button} ボタンオブジェクト
     */
    private createButton(): Button {
        return new Button(this.scene, window.innerWidth - 220, window.innerHeight - 115, "Jump", {
            fontSize: "70px",
        });
    }
}
