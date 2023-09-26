import Phaser from "phaser";
import Button from "./Button";

/**
 * フルスクリーンボタン
 */
export default class FullScreenButton {
    /**
     * @var 使用されるシーン
     */
    private readonly scene: Phaser.Scene;

    /**
     * @var ボタンオブジェクト
     */
    object: Button | null = null;

    /**
     * コンストラクタ
     *
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /**
     * ボタンを作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.object = this.createButton();
        this.pointerDown();
    }

    /**
     * ボタンを作成する
     *
     * @returns {Button} ボタンオブジェクト
     */
    private createButton(): Button {
        return new Button(this.scene, window.innerWidth - 100, 50, "FS", {
            color: "white",
            fontSize: "32px",
        });
    }

    /**
     * ボタンをクリックしたときの処理
     *
     * ボタンクリック時にフルスクリーンを切り替える
     *
     * @returns {void} 戻り値なし
     */
    private pointerDown(): void {
        this.object?.on("pointerdown", this.toggleFullscreen, this);
    }

    /**
     * フルスクリーンを切り替える
     *
     * @returns {void} 戻り値なし
     */
    private toggleFullscreen(): void {
        if (this.scene.scale.isFullscreen) {
            this.scene.scale.stopFullscreen();
        } else {
            this.scene.scale.startFullscreen();
        }
    }
}
