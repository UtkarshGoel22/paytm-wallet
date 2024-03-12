import cors from "cors";
import express from "express";

import mainRouter from "./routes/index";
import config from "./settings";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(config.PORT, () => {
  console.log("Listening on port", config.PORT);
});
