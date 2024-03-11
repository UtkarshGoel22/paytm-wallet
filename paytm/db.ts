import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

/* Connect to MongoDB database */
mongoose.connect(`${process.env.DB_URL}`);
