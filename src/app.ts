import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { NotFoundError } from "./error";
import { ErrorHandling, basicAuth } from "./middleware";
import { currentUser } from "./middleware/current-user";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// rooutes
import { authRouter } from "./router/auth-router";
import { brandRouter } from "./router/brand";
import { bookedRouter } from "./router/booked";

app.use(express.json());
app.use(cors());
app.use(currentUser);

app.use(basicAuth);

// router
app.use(authRouter);
app.use(brandRouter);
app.use(bookedRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(ErrorHandling);

export { app };

