import Phaser from "phaser"

class Game extends Phaser.Scene{  

  leftButton: Phaser.GameObjects.Text | null = null;
  rightButton: Phaser.GameObjects.Text | null = null;
  jumpButton: Phaser.GameObjects.Text | null = null;
  player: Phaser.Physics.Arcade.Sprite | null = null;

  constructor() {
    super({ key: 'Game' });
  }


  preload () {

    this.load.image('susumu-front', 'images/player/susumu-front.png' );
    this.load.image('sky', 'sky.png');
    this.load.image('ground', 'platform.png');
  }

  create() {

    this.input.addPointer(1);
    this.input.addPointer(2);

    const width = this.scale.width;
    const height = this.scale.height;

    // 背景と地面の作成
    let platforms;
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky');
    platforms = this.physics.add.staticGroup();

    const sky = {
      "x": window.innerWidth / 2,
      "y": window.innerHeight / 2,
      "img": 'sky',
      "move": 0
    };

    this.add.image(sky.x, sky.y, sky.img).setScrollFactor(sky.move);

    const 木の背景 = {
      X座標: 800,
      Y座標: height / 2,
      画像名: "ground",
      X位置調整: 0,
      Y位置調整: 0.75,
      移動量: 0.25
    };

    this.add
      .image(木の背景.X座標 * 0, 木の背景.Y座標, 木の背景.画像名)
      .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
      .setScrollFactor(木の背景.移動量);

    this.add
      .image(木の背景.X座標 * 1, 木の背景.Y座標, 木の背景.画像名)
      .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
      .setScrollFactor(木の背景.移動量);

    this.add
      .image(木の背景.X座標 * 2, 木の背景.Y座標, 木の背景.画像名)
      .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
      .setScrollFactor(木の背景.移動量);

    platforms.create(window.innerWidth / 2, window.innerHeight - 30, 'ground').setScale(2).refreshBody();
    platforms.create(window.innerWidth / 3, window.innerHeight - 30, 'ground').setScale(2).refreshBody();
    platforms.create(window.innerWidth, window.innerHeight - 30, 'ground').setScale(2).refreshBody();


    // プレイヤーの作成
    this.player = this.physics.add.sprite(window.innerWidth / 3, window.innerHeight - 80, 'susumu-front');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player,platforms)

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
      "x": 0,
      "y": 0,
      "width": width * 3,
      "height": height
    }

    this.cameras.main.setBounds(
      stage.x,
      stage.y,
      stage.width,
      stage.height
    );

    this.physics.world.setBounds(
      stage.x,
      stage.y,
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

    this.input.on('pointerup', (pointer:Phaser.Input.Pointer) => {
      if (pointer.x < this.cameras.main.width / 2 ) {
        this.player?.setVelocityX(0);
      }
      
    }, this)




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
  scene: [Game],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 2,
  }
};
