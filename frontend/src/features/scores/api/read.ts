import { axios } from "../../../lib/axios";
import {ScoreEntity} from "../../../types";
import {AxiosError, AxiosResponse} from "axios";

/**
 * スコアを取得する
 *
 * @param {string} mode ソートモード (ASC: 昇順, DESC: 降順)
 * @returns {Promise<ScoreEntity[] | []>} 戻り値無し
 */
export const getScoresApi = async (mode?: string): Promise<ScoreEntity[] | []> => {
    return await axios
        .get("/api/scores", {
            params: {
                mode: mode,
            },
        }).then((response: AxiosResponse<{data: ScoreEntity[]}>) => {
            return response.data.data;
        }).catch((error: AxiosError) => {
            return [];
        });
};
