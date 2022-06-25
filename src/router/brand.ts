import express from "express";

// import {
//   getBrand,
//   addHomeFaqs,
//   deleteHomeFaq
// } from "../controller/brand/brand";
import {
  getCars, findCar, getOneCar, deleteCar
} from "../controller/car/car";
import {
  sendMail
} from "../controller/car/sendMail";


const router = express.Router();

// router.get("/home/brand", getBrand);
router.get("/home/cars", getCars);
router.delete("/home/cars/:id", deleteCar);
router.get("/home/car/:id", getOneCar);
router.get("/home/car/:id", findCar);
router.post("/home/mail", sendMail);

// router.post(
//   "/home/brand",
  
//   addHomeFaqs
// );


export { router as brandRouter };
