import BaseBackground from "./BaseBackground";

/**
 * 動く背景クラスの設定に必要なプロパティ
 */
type Props = {
    /**
     * 画像読み込み時に割り当てたキー
     */
    texture: string;

    /**
     * x座標
     */
    x: number;

    /**
     * y座標
     */
    y: number;

    /**
     * x座標の原点
     */
    xOrigin: number;

    /**
     * y座標の原点
     */
    yOrigin: number;

    /**
     * スクロール係数
     */
    scrollFactor: number;
};

/**
 * 動く背景クラスの抽象クラス
 */
export default abstract class MoveEntity extends BaseBackground {
    /**
     * 動く背景画像を作成する
     */
    abstract preload(): void;

    /**
     * 動く背景画像を作成する
     *
     * @param {Props} props 設定に必要なプロパティ
     * @returns {void} 戻り値なし
     */
    create(props: Props): void {
        this.scene.add
            .image(props.x, props.y, props.texture)
            .setOrigin(props.xOrigin, props.yOrigin)
            .setScrollFactor(props.scrollFactor);
    }
}
