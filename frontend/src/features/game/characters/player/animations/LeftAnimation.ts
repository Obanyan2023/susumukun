import Animation from "./Animation";

/**
 * 左向きのアニメーション
 */
export default class LeftAnimation extends Animation {
    /**
     * アニメーションを作成する
     *
     * 左向きの場合は 0 ~ 3 のフレームを使用する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.scene.anims.create({
            key: "left",
            frames: this.scene.anims.generateFrameNumbers("susumu", { start: 0, end: 3 }),
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
        this.player.object?.anims.play("left", true);
    }
}
