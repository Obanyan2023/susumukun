import { axios } from "../../../lib/axios";

/**
 * スコアを取得する
 *
 * @param {string} mode ソートモード (ASC: 昇順, DESC: 降順)
 * @returns {void} 戻り値無し
 */
export const getScoresApi = (mode?: string): void => {
    axios
        .get("/api/scores", {
            params: {
                mode: mode,
            },
        })
        .then((response) => (process.env.NODE_ENV === "development" ? console.log(response.data) : null))
        .catch((error) => (process.env.NODE_ENV === "development" ? console.log(error) : null));
};
