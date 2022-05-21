import { DoctorNote } from "../../model/about/doctors-note";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";
import { Contact } from "../../model/contact/contact";

const commonName = "doctor's notes";


export const addLoveToCar = async (req: Request, res: Response) => {
    const { id, userId , review } = req.params;
    const car = await findDataByIdHelper(id, DoctorNote, commonName);

  
    res.status(200).send({
      success: true,
      data: car,
      message: `search ${commonName} successfully`,
    }); 
  };

  export const featuredCars = async (req: Request, res: Response) => {
    
    const car = await DoctorNote.find().sort({note : 1}).limit(10)
  
    res.status(200).send({
      success: true,
      data: car,
      message: `fetch featured cars ${commonName} successfully`,
    });
  };
