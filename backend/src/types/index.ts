import express from "express";

export type httpArgs = {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
};
