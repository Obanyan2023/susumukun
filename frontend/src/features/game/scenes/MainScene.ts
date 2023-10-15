import Player from "../characters/player";
import Enemy from "../characters/enemy";
import MoveJumpButton from "../components/buttons/move/MoveJumpButton";
import MoveLeftButton from "../components/buttons/move/MoveLeftButton";
import MoveRightButton from "../components/buttons/move/MoveRightButton";
import MainStage from "../stages/main";
import Goal from "../characters/goal";
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
      * @var スコア
      */
     private score: number = 0;
     private scoreText: Phaser.GameObjects.Text | null = null;
    /**
     * コンストラクタ
     *
     * 各種オブジェクトクラスのインスタンスを作成する
     */
    constructor() {
        super({ key: "Game" });

        this.player = new Player(this);
        this.stage = new MainStage(this);
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
        this.leftButton.create(this.player);
        this.rightButton.create(this.player);
        this.jumpButton.create(this.player);

        // スコア表示
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {fontSize: "40px",});
        this.scoreText.setScrollFactor(0);

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
            let newEnemy = new Enemy(this, Enemy.get_enemyName());
            newEnemy.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, Phaser.Math.Between(window.innerWidth / 3, window.innerWidth) , window.innerHeight/3 * 2);
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
                    this.startScene('GameOver');
               }, 1000 )
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

        let enemy_name = Enemy.get_enemyName();
        if (this.before_x === undefined) { 
            this.before_x = this.cameras.main.scrollX;
        }
        if (this.cameras.main.scrollX > this.before_x && rand === 1) {
            let newEnemy = new Enemy(this, enemy_name)
            newEnemy.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[], this.player, this.cameras.main.scrollX + window.innerWidth + 50 , window.innerHeight / 10 );
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

    updateScore(score: number): void {
        this.score += score;
        this.scoreText?.setText(`Score: ${this.score}`)
    }
    /**
     * ゲームオーバー画面に遷移する 次のシーンにデータを引き継ぐ
     * @param {string} key 次のシーンのキー
     * @returns {void} 戻り値なし
     */
    startScene(key:String) : void {
        const data = {
            score: this.score,
        }
        this.scene.start(`${key}`, data)
    }
}