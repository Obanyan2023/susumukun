import { ASC, DESC } from "../../config";
import { nodeCache } from "../../lib/nodeCache";

/**
 * スコアの型
 */
type scoresEntity = {
    nickname: string;
    score: number;
    difficulty: number;
};

/**
 * スコアを取得する
 *
 * @param {string | undefined} mode ソートモード ASC: 昇順, DESC: 降順
 * @returns {Array<scoresEntity> | []} スコアの配列
 */
export const getMethod = (mode?: string): Array<scoresEntity> | [] => {
    const res: Array<scoresEntity> | [] = nodeCache.get("scores") ?? [];

    // 昇順にソート
    if (mode === ASC) return res.sort((i, j) => i.score - j.score);

    // 降順にソート
    if (mode === DESC) return res.sort((i, j) => j.score - i.score);

    // ソートしない
    return res;
};

/**
 * スコアを保存する
 *
 * @param {string} nickname プレイヤー名
 * @param {number} score スコア
 * @param {number} difficulty 難易度
 * @returns {void} 戻り値無し
 */
export const postMethod = (nickname: string, score: number, difficulty: number): void => {
    const scores: Array<scoresEntity> = nodeCache.get("scores") ?? [];

    scores.push({
        nickname: nickname,
        score: score,
        difficulty: difficulty,
    });

    nodeCache.set("scores", scores);
};
