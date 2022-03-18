import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";
import { logger } from "./util";

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      logger.error(err);
      response.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    }

    return response.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
);

app.listen(3000, () => logger.info("Listening on port 3000"));
