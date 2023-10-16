/**
 * @property {string} name 名前
 * @property {number} velocityX 速度
 * @property {number} point 倒した時のポイント
 * @property {number} frameWidth 画像の横幅
 * @property {number} frameHeight 画像の縦幅
 * @property {number} frameRate アニメーションのフレームレート
 */
type EnemyEntity = {
    name: string;
    velocityX: number;
    point: number;
    frameWidth: number;
    frameHeight: number;
    frameRate: number;
};

export const BASE_CATERPILLAR: EnemyEntity = {
    name: "base-caterpillar-sprite",
    velocityX: 20,
    point: 50,
    frameWidth: 30,
    frameHeight: 8,
    frameRate: 1,
};

export const ERROR_CATERPILLAR: EnemyEntity = {
    name: "error-caterpillar-sprite",
    velocityX: 80,
    point: 130,
    frameWidth: 30,
    frameHeight: 8,
    frameRate: 8,
};

export const RED_CATERPILLAR: EnemyEntity = {
    name: "red-caterpillar-sprite",
    velocityX: 100,
    point: 100,
    frameWidth: 30,
    frameHeight: 8,
    frameRate: 10,
};

export const GRASSHOPPER: EnemyEntity = {
    name: "grasshopper-sprite",
    velocityX: 80,
    point: 150,
    frameWidth: 23,
    frameHeight: 12,
    frameRate: 2,
};

export const ENEMY_CONFIGS = [BASE_CATERPILLAR, ERROR_CATERPILLAR, RED_CATERPILLAR, GRASSHOPPER];
