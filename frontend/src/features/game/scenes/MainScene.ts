import Player from "../characters/player";
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
    }

    /**
     * オブジェクトに使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.player.preload();
        this.stage.preload();
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
