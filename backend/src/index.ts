import express, { Application } from "express";
import cors from "cors";
import scoresApiRouter from "./routes/api/scores";
import { APP_PORT, FRONT_HOST } from "./config";

// アプリケーションの作成
const app: Application = express();

// CORSの設定
const corsOptions = {
    origin: FRONT_HOST,
};

// その他設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// ルーティングの設定
app.use("/api", scoresApiRouter);

// サーバーの起動
try {
    app.listen(APP_PORT);
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    }
}
