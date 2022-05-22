import {  Booked } from "../model/booked";
import {  Car } from "../model/car";
import { Request, Response } from "express";
import { User } from "../model/user";

export const getBooked = async (_: Request, res: Response) => {
  const data = await Booked.find();

  res.status(200).send({
    success: true,
    data,
    message: "Booked fetch successfully",
  });
};

export const getUseBooked = async (req: Request, res: Response) => {

  const {id} = req.params
  const data = await Booked.find({userId:id});

  res.status(200).send({
    success: true,
    data,
    message: "Booked fetch successfully",
  });
};


export const addBooked = async (req: Request, res: Response) => {
  const { userId,carId } = req.body;
  const user = await User.findById(userId)
  const car = await Car.findById(carId);

  const createModelData =  Booked.build({
    userId,
    carId,
    userName : user!.firstName,
    carName: car!.vehicleName,
    price : car!.price,
    date : new Date().toString()
  });

  const data = await createModelData.save();

     car?.set({
    booked: true,
  });

  await car?.save();

  res
    .status(201)
    .send({ success: true, data, message: "create booked successfully" });
};


export const deleteBooked = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Booked.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: "delete faq successfully",
  });
};

export const availableCars = async (req: Request, res: Response) => {
  let cars = await Car.find();

  cars = cars.filter(c=> c.booked != true)
  res.status(200).send({
    success: true,
    cars,
    message: "delete faq successfully",
  });
};

export const bookedCarByUser = async (req: Request, res: Response) => {
    const {id} = req.params
  let cars = await Booked.find({userId:id});

  res.status(200).send({
    success: true,
    cars,
    message: "delete faq successfully",
  });
};

export const recommanded = async (req: Request, res: Response) => {
  let cars = await Car.find().sort({price:1});

  cars = cars.filter(c=>c.booked != true)

  res.status(200).send({
    success: true,
    cars,
    message: "recommanded car successfully",
  });
};


export const makeCarFav = async (req: Request, res: Response) => {
    const { userId, carId } = req.body;
    const car =  await Car.findById(carId)

    let favUsers :any[] = car!.fav || []
    let fav = false

    favUsers.forEach(element => {
        
        
        if(element == userId){
            fav = true
        }
    });
    if(fav){
        favUsers = favUsers.filter(f=> f != userId)
    }else{
        favUsers = [...favUsers, userId]
    }

    
    car?.set({
      fav: favUsers,
    });
  
    await car?.save();
  
    res
      .status(201)
      .send({ success: true, car, message: "create booked successfully" });
  };



export const favouriteCars = async (req: Request, res: Response) => {
    let car =   await Car.find()

    car = car.filter(c=> c.booked != true)

    let  favCars = car.map(ca=> ca)

    favCars = favCars.sort((a,b)=> b.fav.length - a.fav.length)
    // favCars = favCars.sort((a,b)=> a.fav.length - b.fav.length)

  
    res
      .status(201)
      .send({ success: true, cars: favCars, message: "create fav list successfully" });
  };