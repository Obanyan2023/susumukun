import express, { NextFunction, Request, Response } from "express";
import { getMethod, postMethod } from "../../controllers/api/scores";
import { is_number, is_string } from "../../utils/isType";
import { httpOk } from "../httpBase";

/**
 * スコアAPIのルーティング
 */
const router = express.Router();

/**
 * スコア取得API
 *
 * @param {Request} req リクエスト
 * @param {Response} res レスポンス
 * @param {NextFunction} next 次の処理
 * @returns {void} 戻り値無し
 */
router.get("/scores", (req: Request, res: Response, next: NextFunction): void => {
    const mode = req.query.mode ?? "0";

    // リクエストクエリのバリデーション
    if (!is_string(mode)) {
        res.status(400).json({ message: "Bad request" });
        return;
    }

    httpOk(res, { data: getMethod(mode) });
});

/**
 * スコア保存API
 *
 * @param {Request} req リクエスト
 * @param {Response} res レスポンス
 * @param {NextFunction} next 次の処理
 * @returns {void} 戻り値無し
 */
router.post("/scores", (req: Request, res: Response, next: NextFunction): void => {
    const nickname = req.body.nickname;
    const score = req.body.score;

    // リクエストボディのバリデーション
    if (!is_string(nickname) || !is_number(score)) {
        res.status(400).json({ message: "Bad request" });
        return;
    }

    httpOk(res, { callback: () => postMethod(nickname, score) });
});

export default router;
