import Phaser from "phaser"
import GameOver from "../../scene/gameover";

class Game extends Phaser.Scene {

  leftButton: Phaser.GameObjects.Text | null = null;
  rightButton: Phaser.GameObjects.Text | null = null;
  jumpButton: Phaser.GameObjects.Text | null = null;
  player: Phaser.Physics.Arcade.Sprite | null = null;
  platforms: Platform;

  constructor() {
    super({ key: 'Game' });

    this.platforms = new Platform(this);
  }


  preload() {

    this.load.image('susumu-front', 'images/player/susumu-front.png');
    this.load.image('sky', 'sky.png');
    this.platforms.preload();
  }

  create() {

    this.input.addPointer(1);
    this.input.addPointer(2);

    // 背景と地面の作成
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky').setScrollFactor(0);
    this.platforms.create();

    const movebackground = {
      x: 800,
      y: window.innerHeight / 2,
      img: "ground",
      x_justtification: 0,
      y_justtification: 0.75,
      move: 0.25
    };

    this.add
      .image(movebackground.x * 0, movebackground.y, movebackground.img)
      .setOrigin(movebackground.x_justtification, movebackground.y_justtification)
      .setScrollFactor(movebackground.move);

    this.add
      .image(movebackground.x * 1, movebackground.y, movebackground.img)
      .setOrigin(movebackground.x_justtification, movebackground.y_justtification)
      .setScrollFactor(movebackground.move);

    this.add
      .image(movebackground.x * 2, movebackground.y, movebackground.img)
      .setOrigin(movebackground.x_justtification, movebackground.y_justtification)
      .setScrollFactor(movebackground.move);


    // プレイヤーの作成
    this.player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight - 80, 'susumu-front');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms.platform as Phaser.Physics.Arcade.StaticGroup)


    // フルスクリーンボタンを作成
    const fullscreenButton = this.add.text(window.innerWidth - 100, 50, 'FS', { fontSize: '32px' }).setScrollFactor(0);
    fullscreenButton.setInteractive();
    fullscreenButton.on('pointerup', this.toggleFullscreen, this);


    this.leftButton = this.add.text(50, window.innerHeight-135, '←', { fontSize: '90px' }).setScrollFactor(0);
    this.rightButton = this.add.text(170, window.innerHeight-135, '→', { fontSize: '90px' }).setScrollFactor(0);
    this.jumpButton = this.add.text(window.innerWidth-200, window.innerHeight-120, 'Jump', { fontSize: '50px' }).setScrollFactor(0);
    this.leftButton?.setInteractive();
    this.rightButton?.setInteractive();
    this.jumpButton?.setInteractive();

    this.cameras.main.startFollow(this.player);

    const stage = {
      "stage_x": 0,
      "stage_y": 0,
      "width": window.innerWidth * 3,
      "height": window.innerHeight
    }

    this.cameras.main.setBounds(
      stage.stage_x,
      stage.stage_y,
      stage.width,
      stage.height
    );

    this.physics.world.setBounds(
      stage.stage_x,
      stage.stage_y,
      stage.width,
      stage.height
    );

  }

  toggleFullscreen() {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  update() {

    this.leftButton?.on('pointerdown', () => {
      this.player?.setVelocityX(-160);
    }, this)


    this.rightButton?.on('pointerdown', () => {
      this.player?.setVelocityX(160);
    }, this)

    this.jumpButton?.on('pointerdown', () => {
      if (this.player?.body?.touching.down) {
        this.player?.setVelocityY(-400);
      }
    }, this)

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.x < this.cameras.main.width / 2) {
        this.player?.setVelocityX(0);
      }

    }, this)

    if (!this.physics.world.bounds.contains(this.cameras.main.width / 2, this.player?.y as number + 17)) {
      this.player?.setAlpha(0);
      this.time.delayedCall(50, () => {
        this.player?.destroy();
        this.scene.start('GameOver');
      }, [], this);
  
     }


  }

}

//Platformクラス
class Platform {
  self: Phaser.Scene;
  platform: Phaser.Physics.Arcade.StaticGroup | null = null;

  constructor(self: Phaser.Scene) {
    this.self = self;
  }

  preload() {
    this.self.load.image('ground', 'platform.png');

    this.platform = this.self.physics.add.staticGroup();
  }

  create() {
    if (this.platform === null) {
      return;
    }
    this.set_plat();
  }

  set_plat() {
    if (this.platform === null) {
      return;
    }

    for (let index = 16; index < window.innerWidth; index += 32) {
      this.platform.create(index, window.innerHeight - 30, 'ground').setScale(2).refreshBody();
    }
  }
  update() {

  }
}

export const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.ScaleModes.FIT,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false
    }
  },
  scene: [Game, GameOver],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 2,
  }
};
