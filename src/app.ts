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
import { faqRouter } from "./router/home/faq-router";
import { homeInformationRouter } from "./router/home/information";
import { youMayLikeRouter } from "./router/home/youMayLike";
import { doctorNotesRoutes } from "./router/about/doctor-note";
import { contactRouter } from "./router/contact/contact-router";
import { contactQueryRouter } from "./router/contact/query-router";
import { fotterRouter } from "./router/fotter/fotter";
import { brandRouter } from "./router/brand";

app.use(express.json());
app.use(cors());
app.use(currentUser);

app.use(basicAuth);

// router
app.use(authRouter);
app.use(faqRouter);
app.use(homeInformationRouter);
app.use(doctorNotesRoutes);
app.use(contactRouter);
app.use(contactQueryRouter);
app.use(fotterRouter);
app.use(youMayLikeRouter);
app.use(brandRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(ErrorHandling);

export { app };

