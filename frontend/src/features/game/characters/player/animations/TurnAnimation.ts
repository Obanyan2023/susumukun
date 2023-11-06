import Animation from "./Animation";

/**
 * 正面を向いている際のアニメーション
 */
export default class TurnAnimation extends Animation {
    /**
     * アニメーションを作成する
     *
     * 立ち止まっている場合は 4 番目のフレームを使用する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        if (this.scene.anims.exists("turn")) {
            return;
        }

        this.scene.anims.create({
            key: "turn",
            frames: [{ key: "susumu", frame: 4 }],
            frameRate: 20,
        });
    }

    /**
     * アニメーションを更新する
     *
     * @returns {void} 戻り値なし
     */
    update(): void {
        this.player.object?.anims.play("turn");
    }
}
