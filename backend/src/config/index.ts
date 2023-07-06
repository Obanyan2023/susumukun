import dotenv from "dotenv";

dotenv.config({ path: "/app/.env" });

export const APP_PORT = Number(process.env.APP_PORT);
export const FRONT_HOST = process.env.FRONT_HOST as string;
