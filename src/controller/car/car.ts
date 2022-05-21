import {  Car } from "../../model/car";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const commonName = "car";

export const getCars = async (_: Request, res: Response) => {
  const stocks = await Car.find();
  
  res.status(200).send({
    success: true,
    data: stocks,
  });
};


export const addDoctorsNotes = async (req: Request, res: Response) => {
  const { vehicleName,
    price,
    year,
    transmission,
    ac,
    seats,
    image,     description,fuelType
  } = req.body;
  const createModelData = Car.build({
    vehicleName,
    price,
    year,
    transmission,
    ac,
    seats,
    image,
    description,fuelType,
    userId : ''

  });

  const data = await createModelData.save();
  res.status(201).send({
    success: true,
    data,
    message: `create ${commonName} successfully`,
  });
};

export const updateDoctorNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bodyData = req.body;

  const data = await findDataByIdHelper(id, Car, commonName);

  await data?.set({
    ...bodyData
  });

  await data?.save();

  res.status(200).send({
    success: true,
    data,
    message: `update ${commonName} successfully`,
  });
};

export const deleteDoctorNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Car, commonName);
  await Car.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${commonName} successfully`,
  });
};


export const searchCarsByType = async (req: Request, res: Response) => {
    const { types } = req.params;
    const cars = await findDataByIdHelper(types, Car, commonName);
  
    res.status(200).send({
      success: true,
      data: cars,
      message: `search ${commonName} successfully`,
    });
  };
