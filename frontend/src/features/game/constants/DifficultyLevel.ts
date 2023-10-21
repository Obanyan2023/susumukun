import { BASE_CATERPILLAR, ERROR_CATERPILLAR, EnemyEntity, GRASSHOPPER, RED_CATERPILLAR } from "./Enemies";

/**
 * 難易度レベル
 *
 * @property {number} SEED シード値
 * @property {string} NAME 難易度名
 * @property {EnemyEntity[]} enemies 出現する敵の配列
 */
export type DifficultyLevel = {
    SEED: number;
    NAME: string;
    enemies: EnemyEntity[];
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

// シード値をキーにした難易度レベルのマップ
export const DIFFICULTY_LEVEL_MAP: { [key: string]: DifficultyLevel } = {
    [HARD.SEED]: HARD,
    [NORMAL.SEED]: NORMAL,
    [EASY.SEED]: EASY,
};
