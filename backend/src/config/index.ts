import dotenv from "dotenv";

dotenv.config({ path: "/app/.env" });
dotenv.config({ path: "../.env" });

export const APP_PORT = Number(process.env.APP_PORT);
export const FRONT_HOST = String(process.env.FRONT_HOST) ?? "http://localhost:3000";
export const ASC = "1";
export const DESC = "2";
