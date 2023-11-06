import Animation from "./Animation";

/**
 * 右向きのアニメーション
 */
export default class RightAnimation extends Animation {
    /**
     * アニメーションを作成する
     *
     * 右向きの場合は 5 ~ 8 のフレームを使用する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        if (this.scene.anims.exists("right")) {
            return;
        }

        this.scene.anims.create({
            key: "right",
            frames: this.scene.anims.generateFrameNumbers("susumu", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });
    }

    /**
     * アニメーションを更新する
     *
     * @returns {void} 戻り値なし
     */
    update(): void {
        this.player.object?.anims.play("right", true);
    }
}
