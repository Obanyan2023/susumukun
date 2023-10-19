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
        const blocksize = 32;
        const bottom = window.innerHeight - blocksize;
        this.object = this.scene.physics.add.staticGroup();


        for (x = 0; x <= blocksize * 64; x += blocksize) {//全区画の1番下の地面
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }
        for (x = blocksize * 67; x < blocksize * 114; x += blocksize) {//全区画の1番下の地面
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        x = blocksize * 30;
        this.setBlock(x, bottom - blocksize * 3, 0);//2区画目左側のブロック
        x += blocksize * 3;
        for (let i = x; i < x + blocksize * 3; i += blocksize) {//2区画目右側のブロック3つ
            this.setBlock(i, bottom - blocksize * 3, 0);
        }

        x = blocksize * 50;
        this.setBlock(x, bottom - blocksize, 0);//2区画目中央下側のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize, 0);//3区画目左側のブロック
        this.setBlock(x, bottom - blocksize * 2, 0);//3区画目右側のブロック
        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize, 0);//3区画目中央下側のブロック
        this.setBlock(x, bottom - blocksize * 2, 0);//3区画目中央下側のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize, 0);//3区画目右側のブロック

        x = blocksize * 59;
        end = x + blocksize * 6;
        for (let i = bottom - blocksize; i >= bottom - blocksize * 5; i -= blocksize) {//3区画目の登り階段
            for (let j = x; j < end; j += blocksize) {
                this.setBlock(j, i, 0);
            }
            x += blocksize;
        }
        x += blocksize * 3;
        end = x + blocksize;
        for (let i = bottom - blocksize * 5; i <= bottom - blocksize; i += blocksize) {//3区画目の下り階段
            for (let j = x; j < end; j += blocksize) {
                this.setBlock(j, i, 0);
            }
            end += blocksize;
        }

        x = blocksize * 90;
        this.setBlock(x, bottom - blocksize * 3, 0);//4区画目左側のブロック

        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize * 3, 0);//4区画目中央下側のブロック
        this.setBlock(x, bottom - blocksize * 6, 0);//4区画目中央上側のブロック
        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize * 3, 0);//4区画目右側のブロック


        x += blocksize * 6;
        this.setBlock(x, bottom - blocksize, 0);//5区画目左側のブロック
        this.setBlock(x, bottom - blocksize * 2, 0);//5区画目右側のブロック
        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize, 0);//5区画目左側のブロック
        this.setBlock(x, bottom - blocksize * 2, 0);//5区画目右側のブロック
        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize * 4, 0);//5区画目左側のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 4, 0);//5区画目左側のブロック
        x += blocksize * 4;
        this.setBlock(x, bottom - blocksize, 0);//5区画目左側のブロック
        this.setBlock(x, bottom - blocksize * 2, 0);//5区画目右側のブロック
        this.setBlock(x, bottom - blocksize * 3, 0);//5区画目右側のブロック
        this.setBlock(x, bottom - blocksize * 4, 0);//5区画目右側のブロック

        for (x = blocksize * 116; x < blocksize * 130; x += blocksize) {//6区画目の地面
            this.setBlock(x, bottom - blocksize, 0);
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }
        for (x = blocksize * 132; x < blocksize * 150; x += blocksize) {//6区画目の地面
            this.setBlock(x, bottom - blocksize * 3, 0);
            this.setBlock(x, bottom - blocksize * 2, 0);
            this.setBlock(x, bottom - blocksize, 0);
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        x = blocksize * 135;
        this.setBlock(x, bottom - blocksize * 7, 0);//6区画目の地面
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 7, 0);//6区画目の地面
        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 9, 0);//6区画目の地面
        this.setBlock(x, bottom - blocksize * 5, 0);//6区画目の地面
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 9, 0);//6区画目の地面
        this.setBlock(x, bottom - blocksize * 5, 0);//6区画目の地面
        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 7, 0);//6区画目の地面
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 7, 0);//6区画目の地面


        for (x = blocksize * 152; x < blocksize * 160; x += blocksize) {//7区画目の地面
            this.setBlock(x, bottom - blocksize * 5, 0);
            this.setBlock(x, bottom - blocksize * 4, 0);
            this.setBlock(x, bottom - blocksize * 3, 0);
            this.setBlock(x, bottom - blocksize * 2, 0);
            this.setBlock(x, bottom - blocksize, 0);
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        x = blocksize * 156;
        this.setBlock(x, bottom - blocksize * 8, 0);//7区画目の地面

        x = blocksize * 163;
        this.setBlock(x, bottom - blocksize * 6, 0);//7区画目の地面
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 6, 0);//7区画目の地面

        for (x = blocksize * 167; x < blocksize * 177; x += blocksize) {//7区画目の地面
            this.setBlock(x, bottom - blocksize * 7, 0);
            this.setBlock(x, bottom - blocksize * 6, 0);
            this.setBlock(x, bottom - blocksize * 5, 0);
            this.setBlock(x, bottom - blocksize * 4, 0);
            this.setBlock(x, bottom - blocksize * 3, 0);
            this.setBlock(x, bottom - blocksize * 2, 0);
            this.setBlock(x, bottom - blocksize, 0);
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        x = blocksize * 170;
        this.setBlock(x, bottom - blocksize * 8, 0);//7区画目の地面
        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 10, 0);//7区画目の地面
        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 8, 0);//7区画目の地面

        for (x = blocksize * 183; x < blocksize * 198; x += blocksize) {
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        x = blocksize * 187;
        for (let i = x; i < blocksize * 195; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 2, 0);//7区画目の地面
        }

        x = blocksize * 190;
        for (let i = x; i < blocksize * 193; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 4, 0);//7区画目の地面
        }

        x = blocksize * 200;
        for (let i = x; i < blocksize * 203; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 2, 0);
            this.setBlock(i, bottom - blocksize, 0);
            this.setBlock(i, bottom, 0);
            this.setBlock(i, bottom + blocksize, 0);
        }
        x = blocksize * 205;
        end = x + blocksize;
        for (let i = bottom - blocksize * 3; i <= bottom - blocksize; i += blocksize) {//8区画目の下り階段
            for (let j = x; j < end; j += blocksize) {
                this.setBlock(j, i, 0);
            }
            end += blocksize;
        }
        for (let i = x; i < blocksize * 208; i += blocksize) {
            this.setBlock(i, bottom, 0);
            this.setBlock(i, bottom + blocksize, 0);
        }

        x = blocksize * 210;
        for (let i = x; i < blocksize * 225; i += blocksize) {
            this.setBlock(i, 0, 0);
            this.setBlock(i, blocksize, 0);
            this.setBlock(i, blocksize * 2, 0);
            this.setBlock(i, blocksize * 3, 0);
            this.setBlock(i, blocksize * 4, 0);
            this.setBlock(i, blocksize * 5, 0);
            this.setBlock(i, blocksize * 6, 0);
        }

        for (let i = blocksize * 210; i < blocksize * 215; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 3, 0);
        }
        for (let i = blocksize * 218; i < blocksize * 223; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 3, 0);
        }
        for (let i = blocksize * 211; i < blocksize * 214; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 2, 0);
            this.setBlock(i, bottom - blocksize, 0);
            this.setBlock(i, bottom, 0);
            this.setBlock(i, bottom + blocksize, 0);
        }
        for (let i = blocksize * 219; i < blocksize * 222; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 2, 0);
            this.setBlock(i, bottom - blocksize, 0);
            this.setBlock(i, bottom, 0);
            this.setBlock(i, bottom + blocksize, 0);
        }


        for (x = blocksize * 226; x < blocksize * 231; x += blocksize) {
            this.setBlock(x, bottom - blocksize * 3, 0);
        }

        for (x = blocksize * 234; x < blocksize * 239; x += blocksize) {
            this.setBlock(x, bottom - blocksize * 3, 0);
        }

        for (let i = bottom - blocksize * 2; i <= bottom + blocksize; i += blocksize) {
            this.setBlock(blocksize * 236, i, 0);
        }
        for (x = blocksize * 241; x < blocksize * 249; x += blocksize) {
            this.setBlock(x, bottom - blocksize * 5, 0);
        }

        for (x = blocksize * 252; x <= blocksize * 265; x += blocksize) {
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        for (let i = bottom - blocksize * 11; i <= bottom - blocksize * 3; i += blocksize) {
            this.setBlock(blocksize * 260, i, 0);
        }

        for (let i = bottom - blocksize * 11; i <= bottom; i += blocksize) {
            this.setBlock(blocksize * 265, i, 0);
        }


        this.setBlock(blocksize * 264, bottom - blocksize * 3, 0);
        this.setBlock(blocksize * 264, bottom - blocksize * 7, 0);
        this.setBlock(blocksize * 264, bottom - blocksize * 11, 0);
        this.setBlock(blocksize * 261, bottom - blocksize * 5, 0);
        this.setBlock(blocksize * 261, bottom - blocksize * 9, 0);

        for (x = blocksize * 268; x < blocksize * 273; x += blocksize) {
            this.setBlock(x, bottom - blocksize * 11, 0);
        }

        for (x = blocksize * 276; x < blocksize * 281; x += blocksize) {
            this.setBlock(x, bottom - blocksize * 11, 0);
        }

        x = blocksize * 284;
        this.setBlock(x, bottom - blocksize * 8, 0);
        this.setBlock(x + blocksize, bottom - blocksize * 8, 0);
        x = blocksize * 287;
        this.setBlock(x, bottom - blocksize * 5, 0);
        this.setBlock(x + blocksize, bottom - blocksize * 5, 0);
        x = blocksize * 290;
        this.setBlock(x, bottom - blocksize * 2, 0);
        this.setBlock(x + blocksize, bottom - blocksize * 2, 0);
        for (x = blocksize * 293; x <= blocksize * 300; x += blocksize) {
            this.setBlock(x, bottom, 0);
            this.setBlock(x, bottom + blocksize, 0);
        }

        x = blocksize * 301;
        this.setBlock(x, bottom - blocksize * 2, 0);//ゴール区画1段目のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 2, 0);

        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 4, 0);//ゴール区画2段目のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 4, 0);

        x += blocksize * 2;
        this.setBlock(x, bottom - blocksize * 6, 0);//ゴール区画3段目のブロック
        x += blocksize;
        this.setBlock(x, bottom - blocksize * 6, 0);

        //oitのロゴ
        x += blocksize * 2;
        for (let i = x; i < x + blocksize * 7; i += blocksize) {
            this.setBlock(i, bottom - blocksize * 8, 0);
            this.setBlock(i, bottom - blocksize * 7, 0);
            this.setBlock(i, bottom - blocksize * 3, 0);
            this.setBlock(i, bottom - blocksize * 2, 0);
            console.log(i);
        }
        this.setBlock(x, bottom - blocksize * 5, 0);
        x += blocksize * 2;
        for (let i = bottom - blocksize * 6; i < bottom - blocksize * 3; i += blocksize) {
            this.setBlock(x, i, 0);
        }
        x += blocksize * 2;
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
