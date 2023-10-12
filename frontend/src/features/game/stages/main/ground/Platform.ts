import BaseGround from "./BaseGround";
import Player from "../../../characters/player";
import Enemy from "../../../characters/enemy";

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
        this.scene.load.image("enemy_block", "platform.png");
    }

    /**
     * プラットフォームを作成する
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        let x;
        let end;
        const bottom = 570;
        const blocksize = 32;
        this.object = this.scene.physics.add.staticGroup();





        this.setenemy_Block(32, 32);
        for (x = 0; x <= blocksize * 55; x += blocksize) {//全区画の1番下の地面
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }
        for (x = blocksize * 59; x < blocksize * 100; x += blocksize) {//全区画の1番下の地面
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        x = blocksize * 30;
        this.setBlock(x, bottom - blocksize * 3, 3);//2区画目左側のブロック
        x += blocksize * 3;
        for (let i = x; i < x + blocksize * 3; i += blocksize) {//2区画目右側のブロック3つ
            this.setBlock(i, bottom - blocksize * 3, 0);
        }
        x = blocksize * 50;
        end = x + blocksize * 6;
        for (let i = bottom - blocksize; i >= bottom - blocksize * 5; i -= blocksize) {//3区画目の登り階段
            for (let j = x; j < end; j += blocksize) {
                this.setBlock(j, i, 0);
            }
            x += blocksize;
        }

        x = blocksize * 59;
        this.setBlock(x, bottom - blocksize * 3, 3);//3区画目左側のブロック
        this.setBlock(x, bottom - blocksize * 4, 3);//3区画目右側のブロック
        x = blocksize * 70;
        end = x + blocksize;
        for (let i = bottom - blocksize * 5; i <= bottom - blocksize; i += blocksize) {//3区画目の下り階段
            for (let j = x; j < end; j += blocksize) {
                this.setBlock(j, i, 0);
            }
            end += blocksize;
        }

        x = blocksize * 90;
        this.setBlock(x, bottom - blocksize * 3, 3);//4区画目左側のブロック

        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize * 3, 3);//4区画目中央下側のブロック
        this.setBlock(x, bottom - blocksize * 6, 3);//4区画目中央上側のブロック
        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize * 3, 3);//4区画目右側のブロック

        x += blocksize * 6;
        this.setBlock(x, bottom - blocksize * 2, 0);//5区画目1段目のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 2, 0);

        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 4, 0);//5区画目2段目のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 4, 0);

        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 6, 0);//5区画目3段目のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 6, 0);

        //oitのロゴ
        x += blocksize * 2;
        for (let i = x; i < x + blocksize * 7; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 8, 0);
            this.setBlock(i, bottom - blocksize * 7, 0);
            this.setBlock(i, bottom - blocksize * 3, 0);
            this.setBlock(i, bottom - blocksize * 2, 0);
        }
        this.setBlock(x, bottom - blocksize * 5, 0);
        x += blocksize*2;
        for (let i = bottom - blocksize * 6; i < bottom - blocksize * 3; i += blocksize) {
            this.setBlock(x, i, 0);
        }
        x += blocksize*2;
        for (let i = bottom - blocksize * 6; i < bottom - blocksize * 3; i += blocksize) {
            this.setBlock(x, i, 0);
        }
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 5, 0);
        this.setBlock(x, bottom - blocksize * 4, 0);
    }
    /**
     * ブロックの設置
     * 
     * @param {x: number, y: number, mode: number} ブロックの座標とブロックの隅を指定するかどうかのフラグ(0なら隅判定なし，1なら左側，2なら右側,3なら両側)
     * @returns {void} 戻り値なし
    */
    setBlock(x: number, y: number, mode: number): void {
        if (this.object === null) {
            return;
        }

        this.object.create(x, y, "ground").setScale(2).refreshBody();

        switch (mode) {
            case 1:
                this.setenemy_Block(x - 22.5, y - 20.5);
                break;
            case 2:
                this.setenemy_Block(x + 22.5, y - 20.5);
                break;
            case 3:
                this.setenemy_Block(x - 22.5, y - 20.5);
                this.setenemy_Block(x + 22.5, y - 20.5);
                break;
            case 0:
                break;
        }
    }

    /**
    * ブロックの設置
    * 
    * @param {number: x, number: y} ブロックの座標
    * @returns {void} 戻り値なし
    */
    setenemy_Block(x: number, y: number): void {
        if (this.object === null) {
            return;
        }

        const enemyBlock = this.object.create(x, y, "enemy_block");
        enemyBlock.setScale(0.5);
        enemyBlock.setAlpha(0);
        enemyBlock.refreshBody();
    }
}
