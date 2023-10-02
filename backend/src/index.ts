import express, { Application } from "express";
import cors from "cors";
import { APP_PORT, FRONT_HOST } from "./config";

const app: Application = express();
const corsOptions = {
    origin: FRONT_HOST,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

try {
    app.listen(APP_PORT);
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    }
}
