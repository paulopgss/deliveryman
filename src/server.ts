import express from "express";
import { logger } from "./util";

const app = express();

app.get("/", (request, response) => {
  return response.json({
    message: "Hello World!",
  });
});

app.listen(3000, () => logger.info("Listening on port 3000"));
