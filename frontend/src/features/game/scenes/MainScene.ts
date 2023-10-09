import Player from "../characters/player";
import Enemy from "../characters/enemy";
import FullScreenButton from "../components/buttons/FullScreenButton";
import MoveJumpButton from "../components/buttons/move/MoveJumpButton";
import MoveLeftButton from "../components/buttons/move/MoveLeftButton";
import MoveRightButton from "../components/buttons/move/MoveRightButton";
import MainStage from "../stages/main";
import Goal from "../characters/goal";

type EnemyName = "base-caterpillar" | "error-caterpillar" | "red-caterpillar" | "grasshopper";
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
    private enemyGroup: Enemy[] = [];

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
     * @var ゴール
     */
     private goal: Goal;

     /**
      * @var 前回のカメラ位置
      */
     private before_x: number | undefined;

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


        this.goal = new Goal(this, "goal");
    }

    /**
     * オブジェクトに使用する画像を読み込む
     *
     * @returns {void} 戻り値なし
     */
    preload(): void {
        this.player.preload();
        this.stage.preload();
        Enemy.preload(this);
        this.goal.preload();
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

        // ゴールの作成
        this.goal.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player,  this.cameras.main.width + 3100, 30)

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

        // 初期画面に敵を配置
        for (let i = 0; i < 5; i++) {
            let newEnemy = new Enemy(this, this.get_enemyName());
            newEnemy.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, Phaser.Math.Between(window.innerWidth / 4 + 100, window.innerWidth) , window.innerHeight/2);
            this.enemyGroup.push(newEnemy);
        }
    }

    /**
     * オブジェクトの更新を行う
     *
     * @returns {void} 戻り値なし
     */
    update(): void {
        this.player.update();

        // プレイヤー落下時にゲームオーバー画面に遷移する
        if (!this.physics.world.bounds.contains(this.cameras.main.width / 2, this.player.object?.y as number + 1)) {
            this.player.destroy(
               () => {
                    this.scene.start("GameOver");
               } 
                , 1000);
        }
        this.player.callLimitVelocityX(-160, 160);
        this.enemy_update();
    }

    /**
     * 敵オブジェクトの更新を行う
     *
     * @returns {void} 戻り値なし
     */
    enemy_update(): void {
        if (this.player.object === null ) {
            return;
        }

        let rand = Phaser.Math.Between(0, 70);

        let enemy_name = this.get_enemyName();
        if (this.before_x === undefined) { 
            this.before_x = this.cameras.main.scrollX;
        }
        if (this.cameras.main.scrollX > this.before_x && rand === 1) {
            let newEnemy = new Enemy(this, enemy_name)
            newEnemy.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, this.cameras.main.scrollX + window.innerWidth + 10 , window.innerHeight/2);
            this.enemyGroup.push(newEnemy);
            this.before_x = this.cameras.main.scrollX;
        }

        this.enemyGroup.forEach((enemy) => {
            enemy.update();
            let height : number = 15;
            if (!this.physics.world.bounds.contains(this.cameras.main.width / 2, enemy.object?.y as number + height)) {
                enemy.object?.destroy();
            }
        })
    }

    /**
     * 敵の名前をランダムに取得する 
     * @returns {EnemyName} 敵の名前
     */
    get_enemyName() : EnemyName {
        let enemy_name : EnemyName = "base-caterpillar";
        switch (Phaser.Math.Between(0, 3)) {
            case 0:
                enemy_name = "base-caterpillar";
                break;
            case 1:
                enemy_name = "error-caterpillar";
                break;
            case 2:
                enemy_name = "red-caterpillar";
                break;
            case 3:
                enemy_name = "grasshopper";
                break;
        }
        return enemy_name;
    }
}