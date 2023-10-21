import { axios } from "../../../lib/axios";

/**
 * スコアを保存する
 *
 * @param {string} nickname ニックネーム
 * @param {number} score スコア
 * @returns {Promise<void>} 戻り値無し
 */
export const storeScoresApi = async (nickname: string, score: number): Promise<void> => {
    return await axios
        .post("/api/scores", {
            nickname: nickname,
            score: score,
        })
        .then(() => {
            //
        })
        .catch(() => {
            //
        });
};
