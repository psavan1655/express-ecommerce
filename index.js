import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import middleware from "./utils/middleware.js";
import indexRouter from "./routes/index.routes.js";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 4000;

middleware(app);

// DB Connection
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_URL,
  {
    autoIndex: true,
    dbName: "ecommerce",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100,
  },
  (error) => {
    if (error) {
      throw error;
    }
  }
);

app.use("/", indexRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(chalk.red("Cannot run!"));
  } else {
    console.log(
      chalk.green.bold(
        `
      Yep this is working 🍺
      App listen on port: ${PORT} 🍕
      Env: ${process.env.ENVIRONMENT} 🦄
    `
      )
    );
  }
});
