import { Response } from "express";
import { is_set } from "../utils/isType";

/**
 * 正常に処理が行われたかどうかを判定し、レスポンスを返す
 *
 * @param {Response} res レスポンス
 * @param {()=>void} callback 実行する処理
 * @returns {void} 戻り値無し
 */
export function TryProcess(res: Response, callback: () => void): void {
    try {
        callback();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * HttpOk関数の引数
 */
type httpOkProps = {
    data?: unknown;
    callback?: () => void;
};

/**
 * 正常に処理が行われた場合のレスポンスを返す
 *
 * @param res レスポンス
 * @param {HttpOkProps.data | undefined} data レスポンスデータ
 * @param {HttpOkProps.callback | undefined} callback 実行する処理
 * @returns {void} 戻り値無し
 */
export function httpOk(res: Response, { data, callback }: httpOkProps) {
    TryProcess(res, () => {
        if (is_set<() => void>(callback)) callback();

        res.status(200).json(data !== undefined ? { data: data } : { message: "OK" });
    });
}
