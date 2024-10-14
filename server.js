import express from "express";
import entryRouter from "./routers/entryRouter.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/", entryRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
