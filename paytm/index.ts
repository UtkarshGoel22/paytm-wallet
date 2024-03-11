import cors from "cors";
import express from "express";

import config from "./settings/config";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(config.PORT, () => {
  console.log("Listening on port", config.PORT);
});
