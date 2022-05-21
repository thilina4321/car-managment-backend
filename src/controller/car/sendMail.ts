const nodemailer = require("nodemailer");
import { Request, Response } from "express";

export const sendMail = async  (req: Request, res: Response) => {
    const {email, text, subject} = req.body
  let config = {
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
        user: 'sampathbankinfor@gmail.com', // generated ethereal user
        pass: 'eivpabomlwxmzyjl', // generated ethereal password
      },
  };

  let transporter = nodemailer.createTransport(config);

  transporter.verify(function (error:any, success:any) {
    if (error) {
      console.log(error.message, "verify error");
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailInfo = await transporter.sendMail({
    from: 'sampathbankinfor@gmail.com',
    to: email,
    subject: subject,
    text: text,
    html: text,
  });

  return res.status(200).send({data : mailInfo.messageId});
};
