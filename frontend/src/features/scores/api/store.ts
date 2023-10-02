import { axios } from "../../../lib/axios";

/**
 * スコアを保存する
 *
 * @param {string} nickname ニックネーム
 * @param {number} score スコア
 * @returns {void} 戻り値無し
 */
export const storeScoresApi = (nickname: string, score: number): void => {
    axios
        .post("/api/scores", {
            nickname: nickname,
            score: score,
        })
        .then((response) => (process.env.NODE_ENV === "development" ? console.log(response.data) : null))
        .catch((error) => (process.env.NODE_ENV === "development" ? console.log(error) : null));
};
