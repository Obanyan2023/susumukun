import {
    BASE_CATERPILLAR,
    CHALLENGE_ERROR_CATERPILLAR,
    CHALLENGE_GRASSHOPPER,
    ERROR_CATERPILLAR,
    EnemyEntity,
    GRASSHOPPER,
    RED_CATERPILLAR,
} from "./Enemies";

/**
 * 難易度レベル
 *
 * @param {number} SEED シード値
 * @param {string} NAME 難易度名
 * @param {EnemyEntity[]} enemies 出現する敵の配列
 */
export type DifficultyLevel = {
    SEED: number;
    NAME: string;
    enemies: EnemyEntity[];
};

export const CHALLENGE: DifficultyLevel = {
    SEED: 0.9,
    NAME: "Challenge",
    enemies: [CHALLENGE_ERROR_CATERPILLAR, CHALLENGE_GRASSHOPPER],
};

export const HARD: DifficultyLevel = {
    SEED: 1,
    NAME: "Hard",
    enemies: [BASE_CATERPILLAR, RED_CATERPILLAR, ERROR_CATERPILLAR, GRASSHOPPER],
};
export const NORMAL: DifficultyLevel = {
    SEED: 2,
    NAME: "Normal",
    enemies: [BASE_CATERPILLAR, RED_CATERPILLAR, ERROR_CATERPILLAR],
};
export const EASY: DifficultyLevel = {
    SEED: 4,
    NAME: "Easy",
    enemies: [BASE_CATERPILLAR, RED_CATERPILLAR],
};

// 難易度レベルの配列
export const DIFFICULTY_LEVELS: DifficultyLevel[] = [CHALLENGE, HARD, NORMAL, EASY];

// シード値をキーにした難易度レベルのマップ
export const DIFFICULTY_LEVEL_MAP: { [key: string]: DifficultyLevel } = {
    [CHALLENGE.SEED]: CHALLENGE,
    [HARD.SEED]: HARD,
    [NORMAL.SEED]: NORMAL,
    [EASY.SEED]: EASY,
};
