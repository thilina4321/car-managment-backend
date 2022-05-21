import express from "express";

import {
  getBrand,
  addHomeFaqs
} from "../controller/brand/brand";
import {
  getCars,
} from "../controller/car/car";
import {
  sendMail
} from "../controller/car/sendMail";


const router = express.Router();

router.get("/home/brand", getBrand);
router.get("/home/cars", getCars);
router.post("/home/mail", sendMail);

router.post(
  "/home/brand",
  
  addHomeFaqs
);


export { router as brandRouter };
