import Player from "../characters/player";
import Enemy from "../characters/enemy";
import MoveJumpButton from "../components/buttons/move/MoveJumpButton";
import MoveLeftButton from "../components/buttons/move/MoveLeftButton";
import MoveRightButton from "../components/buttons/move/MoveRightButton";
import MainStage from "../stages/main";
import Goal from "../characters/goal";
import { GAME_CLEAR, GAME_OVER, TIME_OVER } from "../constants/SceneKeys";
import { DIFFICULTY } from "../constants/localStorageKeys";
import { CHALLENGE, DEFAULT, PlayerConfig } from "../constants/Player";
import { CHALLENGE as DIFFICULTY_CHALLENGE } from "../constants/DifficultyLevel";
import {is_set} from "../../../utils/isType";
import Character from "../characters/Character";
/*
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
     * @var スコア
     */
    private score: number = 0;
    private scoreText: Phaser.GameObjects.Text | null = null;

    /**
     * @var 制限時間 (秒)
     */
    private timeLimit: number;

    /**
     * @var テキストオブジェクト
     */
    private timeObject: Phaser.GameObjects.Text;

    /**
     * @var 難易度
     */
    private readonly difficulty: number = 2;

    /**
     * プレイヤーの設定
     *
     * @private
     */
    private readonly config: PlayerConfig;

    /**
     * ステージの設定
     *
     * @property {number} x - ステージのX座標
     * @property {number} y - ステージのY座標
     * @property {number} width - ステージの幅
     * @property {number} height - ステージの高さ
     */
    private readonly stageConfig: {
        x: number;
        y: number;
        width: number;
        height: number;
    } = {
        x: 0,
        y: -200,
        width: 6900,
        height: window.innerHeight + 200,
    };

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
        this.timeLimit = 180;

        this.goal = new Goal(this, "goal");

        this.timeObject = {} as Phaser.GameObjects.Text;

        this.events = new Phaser.Events.EventEmitter();

        this.events.on("update", this.updateTimer, this);

        this.difficulty = Number(localStorage.getItem(DIFFICULTY));
        this.config = this.difficulty !== DIFFICULTY_CHALLENGE.SEED ? DEFAULT : CHALLENGE;
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
        this.timeLimit = 180;
        this.score = 0;

        // 背景と地面の作成
        this.stage.create();

        // キャラクターの作成
        this.player.create([this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[]);

        // ゴールの作成
        this.goal.create(
            [this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[],
            this.player,
            11450,
            30
        );

        // ボタンの作成
        this.leftButton.create(this.player);
        this.rightButton.create(this.player);
        this.jumpButton.create(this.player);

        // スコア表示
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, { fontSize: "40px" });
        this.scoreText.setScrollFactor(0);

        /**
         * ステージの設定
         *
         * @property {number} stage_x - ステージのX座標
         * @property {number} stage_y - ステージのY座標 (画面を超えてジャンプできる様に -100)
         * @property {number} width - ステージの幅
         * @property {number} height - ステージの高さ（stage_y の負の値・カメラ位置調整）
         */
        const stage = {
            stage_x: 0,
            stage_y: -window.innerHeight,
            width: 11600,
            height: window.innerHeight*2,
        };

        // カメラの設定
        this.cameras.main.setBounds(this.stageConfig.x, this.stageConfig.y, this.stageConfig.width, this.stageConfig.height);

        // ワールドの境界を設定する
        this.physics.world.setBounds(this.stageConfig.x, this.stageConfig.y, this.stageConfig.width, this.stageConfig.height);

        this.cameras.main.setScroll(0, 0); // カメラのスクロールを0に設定

        this.timeObject = this.add.text(
            window.innerWidth - 20, // 固定のX座標
            20, // 固定のY座標
            "",
            {
                fontFamily: "Arial",
                fontSize: "24px",
                color: "#ffffff",
            }
        );
        this.timeObject.setScrollFactor(0); // スクロールに影響を受けないように設定
        this.timeObject.setOrigin(1, 0); // テキストの原点を左上に設定

        this.time.addEvent({
            delay: 1000, // 1000ミリ秒ごと（1秒ごと）
            loop: true,
            callback: this.updateTimer,
            callbackScope: this,
        });

        this.updateTimerDisplay();

        // 初期画面に敵を配置
        for (let i = 0; i < 6 / this.difficulty; i++) {
            const newEnemy = new Enemy(this, Enemy.get_enemyName(this.difficulty));
            newEnemy.create(
                [this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[],
                this.player,
                Phaser.Math.Between(window.innerWidth / 3, window.innerWidth),
                (window.innerHeight / 3) * 2
            );
            newEnemy.object?.on("destroy", () => {
                this.enemyGroup.splice(this.enemyGroup.indexOf(newEnemy), 1);
            });
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
        if (!this.physics.world.bounds.contains(this.cameras.main.width / 2, (this.player.object?.y as number) + 1)) {
            this.player.destroy(() => {
                this.startScene(GAME_OVER);
            }, 1000);
        }
        this.enemy_update();
    }

    /**
     * 敵オブジェクトの更新を行う
     *
     * @returns {void} 戻り値なし
     */
    enemy_update(): void {
        if (!is_set<Character>(this.player.object)) {
            return;
        }

        if (this.isCreateEnemy()) {
            const newEnemy = new Enemy(this, Enemy.get_enemyName(this.difficulty));
            newEnemy.create(
                [this.stage.ground.platform.object] as Phaser.Physics.Arcade.StaticGroup[],
                this.player,
                this.cameras.main.scrollX + window.innerWidth + Phaser.Math.Between(200, 500),
                window.innerHeight / 10
            );
            newEnemy.object?.on("destroy", () => {
                this.enemyGroup.splice(this.enemyGroup.indexOf(newEnemy), 1);
            });
            this.enemyGroup.push(newEnemy);
        }

        this.enemyGroup.forEach((enemy: Enemy, index: number) => {
            enemy.update();
            let height: number = 15;
            if (
                !this.physics.world.bounds.contains(this.cameras.main.width / 2, (enemy.object?.y as number) + height)
            ) {
                enemy.object?.destroy();
            }
        });
    }

    /**
     * 敵を生成するかどうかを判定する
     *
     * @returns {boolean} 敵を生成するかどうか
     */
    private isCreateEnemy(): boolean {
        const seed = Phaser.Math.Between(0, 100 * this.difficulty);

        return (
            // 敵の数が一定数以下のとき
            this.enemyGroup.length < this.scale.width / 75 / this.difficulty &&
            this.cameras.main.scrollX + window.innerWidth < this.stageConfig.width - 500 &&
            (
                    // 乱数の値が1のとき
                    seed === 1 ||
                    // 難易度が CHALLENGE のとき
                    (
                        DIFFICULTY_CHALLENGE.SEED === this.difficulty &&
                        seed <= 5
                    )

                )
        );
    }

    updateScore(score: number): void {
        this.score += score;
        this.scoreText?.setText(`Score: ${this.score}`);
    }
    getScore(): number {
        return this.score;
    }

    updateTimer(): void {
        this.timeLimit--;
        this.updateTimerDisplay();

        if (this.timeLimit <= 0) {
            this.startScene(TIME_OVER);
        }
    }

    private updateTimerDisplay(): void {
        this.timeObject.setText(`Time: ${this.timeLimit} s`);
    }

    /**
     * ゲームオーバー画面に遷移する 次のシーンにデータを引き継ぐ
     * @param {string} key 次のシーンのキー
     * @returns {void} 戻り値なし
     */
    startScene(key: String): void {
        // ゲームオーバー・タイムオーバー時はスコアを減点
        if (key === GAME_OVER || key === TIME_OVER) {
            this.score *= 0.8;
        }

        // ゲームクリア時は残り時間をスコアとして加算
        if (key === GAME_CLEAR && this.timeLimit >= 0) {
            if (this.difficulty === DIFFICULTY_CHALLENGE.SEED) {
                this.score += this.timeLimit * 5000;
                this.score += 1000000;
            } else {
                this.score += this.timeLimit * 5;
            }
        }

        // シーンを遷移する
        this.scene.start(`${key}`, {
            score: this.score,
        });
    }
}
