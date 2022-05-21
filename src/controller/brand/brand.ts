import {  Brand } from "../../model/brand/brand";
import { Request, Response } from "express";

export const getBrand = async (_: Request, res: Response) => {
  const data = await Brand.find();
  res.status(200).send({
    success: true,
    data,
    message: "Brand fetch successfully",
  });
};


export const addHomeFaqs = async (req: Request, res: Response) => {
  const { brand,
    color } = req.body;
  const createModelData =  Brand.build({
    brand,
    color,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: "create brand successfully" });
};


export const deleteHomeFaq = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Brand.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: "delete faq successfully",
  });
};
