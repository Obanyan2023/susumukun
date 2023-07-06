import express from "express";
import { httpArgs } from "../../types";
import { getMethod, postMethod } from "../../controllers/api/example";

const router = express.Router();

/**
 * @route GET /api/example
 *  （GETメソッドで /api/example にアクセスした場合）
 */
router.get("/example", ({ req, res }: httpArgs) => {
    try {
        res.status(200).json({ preAccess: getMethod() });
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @route POST /api/example
 * （POSTメソッドで /api/example にアクセスした場合）
 */
router.post("/example", ({ req, res }: httpArgs) => {
    try {
        postMethod();
        res.status(200).json({ message: getMethod() });
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
