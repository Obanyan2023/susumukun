import Phaser from 'phaser';
import { callbackify } from 'util';

export default class Time extends Phaser.Scene {
    private timer!: Phaser.Time.Clock;
       

    constructor() {
        super({ key: 'time' });

        this.time.addEvent({
            delay: 1000,
            callback: ()=> console.log('Current time:', this.timer.now),
            callbackScope: this,
            loop: true,
    });
        
    }

    preload() {
        // 何かプリロードがあればここで行う
    }

    create() {
        this.time.addEvent({
            delay: 1000,
            callback: ()=> console.log('Current time:', this.timer.now),
            callbackScope: this,
            loop: true,
    });


    }

 
        
}
