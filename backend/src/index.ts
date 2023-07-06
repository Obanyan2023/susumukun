import express, { Application } from "express";
import * as config from "./config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
    app.listen(config.APP_PORT);
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    }
}
