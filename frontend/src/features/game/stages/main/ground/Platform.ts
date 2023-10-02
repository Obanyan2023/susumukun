import BaseGround from "./BaseGround";

/**
 * プラットフォームクラス
 */
export default class Platform extends BaseGround {
    /**
     * @var プラットフォーム
     */
    object: Phaser.Physics.Arcade.StaticGroup | null = null;

    /**
     * プラットフォームに使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.scene.load.image("ground", "platform.png");
    }

    /**
     * プラットフォームを作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        let x;
        let end;
        const bottom = window.innerHeight - 30;
        const blocksize = 32;
        this.object = this.scene.physics.add.staticGroup();

        for (x = 16; x < window.innerWidth + blocksize *20; x += blocksize) {//全区画の1番下の地面
            console.log(x);
            this.setBlock(x, bottom);
        }
        this.setBlock(x-24, bottom);
        for (x = window.innerWidth + blocksize * 23; x < window.innerWidth * 3; x += blocksize) {//全区画の1番下の地面
            console.log(x);
            this.setBlock(x, bottom);
        }
        x = window.innerWidth - blocksize * 10;
        console.log(x);
        this.setBlock(x, bottom - blocksize * 3);//2区画目左側のブロック
        x += blocksize * 3;
        for (let i = x; i < x + blocksize * 3; i += blocksize) {//2区画目右側のブロック3つ
            console.log("i" + i);
            this.setBlock(i, bottom - blocksize * 3);
        }
        x = window.innerWidth + blocksize * 10;
        console.log(x);
        end = x + blocksize * 10;
        for (let i = bottom - blocksize; i >= bottom - blocksize * 5; i -= blocksize) {//3区画目の登り階段
            console.log("ii" + i);
            for (let j = x; j < end; j += blocksize) {
                console.log("j" + j);
                this.setBlock(j, i);
                this.setBlock(j+blocksize, i);
            }
            x += blocksize*2;
        }

        x = window.innerWidth + blocksize * 23;
        console.log(x);
        end = x + blocksize * 2;
        for (let i = bottom - blocksize * 5; i <= bottom - blocksize; i += blocksize) {//3区画目の下り階段
            console.log("iiii" + i);
            for (let j = x; j < end; j += blocksize) {
                console.log("jjjj" + j);
                this.setBlock(j, i);
                this.setBlock(j+blocksize, i);
            }
            end += blocksize*2;
        }
    }
    /**
     * ブロックの設置
     * 
     * @param {number: x, number: y} ブロックの座標
     * @returns {void} 戻り値なし
    */
    setBlock(x: number, y: number): void {
        if (this.object === null) {
            return;
        }

        this.object.create(x, y, "ground").setScale(2).refreshBody();
    }
}