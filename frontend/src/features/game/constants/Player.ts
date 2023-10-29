/**
 * @param {number} jumpVelocityY - ジャンプ時のベロシティ
 * @param {number} rightAccelerationX - 右移動時の加速度
 * @param {number} rightVelocityX - 右移動時のベロシティ
 * @param {number} leftAccelerationX - 左移動時の加速度
 * @param {number} leftVelocityX - 左移動時のベロシティ
 * @param {number | undefined} gravityY - 重力
 */
export type PlayerConfig = {
    jumpVelocityY: number;
    rightAccelerationX: number;
    rightVelocityX: number;
    leftAccelerationX: number;
    leftVelocityX: number;
    gravityY?: number;
};

export const DEFAULT: PlayerConfig = {
    jumpVelocityY: -400,
    rightAccelerationX: 300,
    rightVelocityX: 160,
    leftAccelerationX: -300,
    leftVelocityX: -160,
};

export const CHALLENGE: PlayerConfig = {
    jumpVelocityY: -900,
    rightAccelerationX: 1000,
    rightVelocityX: 400,
    leftAccelerationX: -1000,
    leftVelocityX: -400,
    gravityY: 2000,
};
