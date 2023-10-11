import { axios } from "../../../lib/axios";
import Axios, {AxiosError, AxiosResponse} from "axios";

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
        .then((response: AxiosResponse) => {
             //
        })
        .catch((error: AxiosError) => {
            alert("スコアの保存に失敗しました")
        });
};
