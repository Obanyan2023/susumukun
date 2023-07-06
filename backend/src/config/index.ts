import dotenv from "dotenv";
dotenv.config({ path: "/app/.env" });
dotenv.config({ path: "/app/.env.example" });

export const APP_PORT = Number(process.env.APP_PORT) || 8080;
