import express from "express";

import helloController from "./controller/hello";
import errorMiddleware from "./middleware/error";

const app = express();

app.use("/", helloController);
app.use(errorMiddleware);

export default app;
