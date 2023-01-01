import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import compression from "compression";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import commonResponse from "./common-response.js";

// import winstonInstance from './winston';

export default (app) => {
  commonResponse(app);
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors());
  app.use(
    morgan(
      `${chalk.blue(
        'Address :remote-addr\nUser :remote-user\nDate [:date[clf]]\n":method :url HTTP/:http-version" :status :res[content-length] ":referrer"\n":user-agent"'
      )}`
    )
  );
};
