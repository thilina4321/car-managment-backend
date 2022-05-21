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

export const createAdminUser = async (req: Request, res: Response) => {
  const { email, password, firstName, secondName ,  vehicleName,
    price,
    year,
    transmission,
    ac,
    seats,
    image,
    description,
    fuelType} = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new BadRequest("This email is used");
  }

  const hashPw = await hash(password, 8);
  const createData = User.build({ email: email, password: hashPw, secondName, firstName });
  const user = await createData.save();


  const createCarData = Car.build({
    vehicleName,
    price,
    year,
    transmission,
    ac,
    seats,
    image,
    description,fuelType,
    userId : user._id
 
  });

  const data = await createCarData.save();

  
  res.status(201).send({ user, car :data , success:true});
};


export const findUserAndCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id)

  if (!user) {
    throw new BadRequest("No user found");
  }


  const car = await Car.findOne({userId : id})
  
  res.status(201).send({ user, car , success:true});
};

export const findUsers = async (req: Request, res: Response) => {

  const users = await User.find()
  
  res.status(200).send({ users , success:true});
};
