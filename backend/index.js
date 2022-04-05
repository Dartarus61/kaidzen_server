import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db_connect } from "./db_con.js";
import { router } from "./router/index.js";
import "dotenv/config";
import errorMiddleware from "./middlewares/error_midleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await db_connect();
    app.listen(3001, () => {
      console.log(`server started on ${3001}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
