import Player from "../characters/player";
import Enemy from "../characters/enemy";
import FullScreenButton from "../components/buttons/FullScreenButton";
import MoveJumpButton from "../components/buttons/move/MoveJumpButton";
import MoveLeftButton from "../components/buttons/move/MoveLeftButton";
import MoveRightButton from "../components/buttons/move/MoveRightButton";
import MainStage from "../stages/main";

/**
 * ゲームのメインシーン
 */
export default class MainScene extends Phaser.Scene {
    /**
     * @var プレイヤー
     */
    private player: Player;

    /**
     * @var 敵
     */
    private enemy1: Enemy;
    private enemy2: Enemy;
    private enemy3: Enemy;
    private enemy4: Enemy;

    /**
     * @var ステージ
     */
    private stage: MainStage;

    /**
     * @var フルスクリーンボタン
     */
    private fullScreenButton: FullScreenButton;

    /**
     * @var 左移動ボタン
     */
    private leftButton: MoveLeftButton;

    /**
     * @var 右移動ボタン
     */
    private rightButton: MoveRightButton;

    /**
     * @var ジャンプボタン
     */
    private jumpButton: MoveJumpButton;

    /**
     * コンストラクタ
     *
     * 各種オブジェクトクラスのインスタンスを作成する
     */
    constructor() {
        super({ key: "Game" });

        this.player = new Player(this);
        this.stage = new MainStage(this);
        this.fullScreenButton = new FullScreenButton(this);
        this.leftButton = new MoveLeftButton(this);
        this.rightButton = new MoveRightButton(this);
        this.jumpButton = new MoveJumpButton(this);

        this.enemy1 = new Enemy(this, "base-caterpillar");
        this.enemy2 = new Enemy(this, "error-caterpillar")
        this.enemy3 = new Enemy(this, "red-caterpillar");
        this.enemy4 = new Enemy(this, "grasshopper");
    }

    /**
     * オブジェクトに使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.player.preload();
        this.stage.preload();

        this.enemy1.preload();
        this.enemy2.preload();
        this.enemy3.preload();
        this.enemy4.preload();
    }

    /**
     * オブジェクトを作成し，シーンの設定を行う
     *
     * @returns {void} 戻り値なし
     */
    create(): void {
        this.input.addPointer(1);
        this.input.addPointer(2);

        // 背景と地面の作成
        this.stage.create();

        // キャラクターの作成
        this.player.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[]);

        // 敵の作成
        this.enemy1.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, 30, 30);
        this.enemy2.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, this.cameras.main.width / 4  , 30);
        this.enemy3.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, this.cameras.main.width / 2 - 40, 30);
        this.enemy4.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, this.cameras.main.width - 60, 30);

        // ボタンの作成
        this.fullScreenButton.create();
        this.leftButton.create(this.player);
        this.rightButton.create(this.player);
        this.jumpButton.create(this.player);

        const stage = {
            stage_x: 0,
            stage_y: 0,
            width: window.innerWidth * 3,
            height: window.innerHeight,
        };

        // カメラの設定
        this.cameras.main.setBounds(stage.stage_x, stage.stage_y, stage.width, stage.height);

        // ワールドの境界を設定する
        this.physics.world.setBounds(stage.stage_x, stage.stage_y, stage.width, stage.height);
    }

    /**
     * オブジェクトの更新を行う
     *
     * @returns {void} 戻り値なし
     */
    update(): void {
        // プレイヤー落下時にゲームオーバー画面に遷移する
        if (!this.physics.world.bounds.contains(this.cameras.main.width / 2, (this.player.object?.y as number) + 17)) {
            this.player.object?.setAlpha(0);
            this.time.delayedCall(
                50,
                () => {
                    this.player.object?.destroy();
                    this.scene.start("GameOver");
                },
                [],
                this
            );
        }
    }
}
