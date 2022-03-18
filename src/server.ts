import express from "express";
import { routes } from "./routes";
import { logger } from "./util";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => logger.info("Listening on port 3000"));
