/**
 * @property {number} SEED - 難易度のシード値
 * @property {string} NAME - 難易度の名前
 */
export type DifficultyLevel = {
    SEED: number;
    NAME: string;
};

export const HARD: DifficultyLevel = {
    SEED: 1,
    NAME: "Hard",
};
export const NORMAL: DifficultyLevel = {
    SEED: 2,
    NAME: "Normal",
};
export const EASY: DifficultyLevel = {
    SEED: 4,
    NAME: "Easy",
};

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [HARD, NORMAL, EASY];
