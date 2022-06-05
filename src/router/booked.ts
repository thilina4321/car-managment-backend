import express from "express";

import {
  getBooked,
  addBooked,
  deleteBooked,
  availableCars,
  bookedCarByUser,
  recommanded,
   makeCarFav,
   favouriteCars, getUseBooked
} from "../controller/booked";


const router = express.Router();

router.get("/cars/booked", getBooked);
router.get("/cars/booked/:id", getUseBooked);
router.post("/cars/booked", addBooked);
router.get("/cars/available", availableCars);
router.get("/cars/booked/:id", bookedCarByUser);
router.delete("/cars/booked/:id/:carId", deleteBooked);
router.get("/cars/recommanded", recommanded);
router.post("/cars/make-fav", makeCarFav);
router.get("/cars/fav-list", favouriteCars);



export { router as bookedRouter };
