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





        console.log("window.innerWidth:" + window.innerWidth + "600:" + 600);
        this.setenemy_Block(32, 32);
        for (x = 0; x <= blocksize * 55; x += blocksize) {//全区画の1番下の地面
            console.log(x);
            this.setBlock(x, bottom);
            this.setBlock(x, bottom + blocksize);
        }
        for (x = blocksize * 59; x < blocksize * 121; x += blocksize) {//全区画の1番下の地面
            console.log(x);
            this.setBlock(x, bottom);
            this.setBlock(x, bottom + blocksize);
        }

        x = blocksize * 30;
        console.log(x);
        this.setBlock(x, bottom - blocksize * 3);//2区画目左側のブロック
        x += blocksize * 3;
        for (let i = x; i < x + blocksize * 3; i += blocksize) {//2区画目右側のブロック3つ
            console.log("i" + i);
            this.setBlock(i, bottom - blocksize * 3);
        }
        x = blocksize * 50;
        //console.log(x);
        end = x + blocksize * 6;
        for (let i = bottom - blocksize; i >= bottom - blocksize * 5; i -= blocksize) {//3区画目の登り階段
            console.log("ii" + i);
            for (let j = x; j < end; j += blocksize) {
                console.log("j" + j);
                this.setBlock(j, i);
            }
            x += blocksize;
        }

        x = blocksize * 59;
        console.log(x);
        end = x + blocksize;
        for (let i = bottom - blocksize * 5; i <= bottom - blocksize; i += blocksize) {//3区画目の下り階段
            console.log("iiii" + i);
            for (let j = x; j < end; j += blocksize) {
                console.log("jjjj" + j);
                this.setBlock(j, i);
            }
            end += blocksize;
        }



        x = blocksize * 90;
        console.log(x);
        this.setBlock(x, bottom - blocksize * 3);//4区画目左側のブロック

        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize * 3);//4区画目中央下側のブロック
        this.setBlock(x, bottom - blocksize * 6);//4区画目中央上側のブロック
        x += blocksize * 3;
        this.setBlock(x, bottom - blocksize * 3);//4区画目右側のブロック

        x += blocksize * 6;
        this.setBlock(x, bottom - blocksize * 5.5);//5区画目左側のブロック
        this.setBlock(x, bottom - blocksize * 11.5);//5区画目左側のブロック

        x += blocksize;
        this.setBlock(x, bottom - blocksize * 2.5);//5区画目右側のブロック
        this.setBlock(x, bottom - blocksize * 8.5);//5区画目右側のブロック

        for (let i = x; i < x + blocksize * 20; i++) {//5区画目上部の地面
            this.setBlock(i, bottom - blocksize * 14.5);
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

        this.object.create(x, y, "enemy_block").setScale(2).refreshBody();
        //this.object.scaleX = 2;
        this.object.setAlpha(0);
    }
}
