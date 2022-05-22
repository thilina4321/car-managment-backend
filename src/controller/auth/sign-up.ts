import { Request, Response } from "express";
import { User } from "../../model/user";
import { Car } from "../../model/car";
import { hash } from "bcryptjs";
import { BadRequest } from "../../error";

export const signup = async (req: Request, res: Response) => {
  const { email, password, firstName, secondName } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new BadRequest("This email is used");
  }

  const hashPw = await hash(password, 8);
  const createData = User.build({ email: email, password: hashPw, secondName, firstName });
  const user = await createData.save();
  res.status(201).send({ user });
};

export const updateUser = async (req: Request, res: Response) => {
  const { firstName, secondName, email } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    throw new BadRequest("No user from this email");
  }

  await existingUser?.set({
    firstName,
    secondName,
  });

  await existingUser?.save();
  res.status(201).send({ existingUser });
};

export const adminLogin = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (email != "admin@car.com" || password != "admin1234") {
    throw new BadRequest("Email or password wrong");
  }

  res.status(200).send({ data : email, success:true });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id)

  res.status(200).send({ data : user, success:true });
};

export const createAdminUser = async (req: Request, res: Response) => {
  const {  vehicleName,
    price,
    year,
    transmission,
    ac,
    seats,
    image,
    description,
    fuelType,
    fav
  } = req.body;

  const createCarData = Car.build({
    vehicleName,
    price:+price,
    year,
    transmission,
    ac,
    seats,
    image,
    description,fuelType,
    fav,
    booked:false,
 
  });

  const car = await createCarData.save();

  
  res.status(201).send({  car , success:true});
};


export const findUserAndCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id)

  if (!user) {
    throw new BadRequest("No user found");
  }
  
  res.status(201).send({ user , success:true});
};



export const findUsers = async (req: Request, res: Response) => {

  const users = await User.find()
  
  res.status(200).send({ users , success:true});
};
