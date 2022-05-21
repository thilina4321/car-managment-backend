import mongoose, {  Schema } from "mongoose";

// users attributes
interface UserAttrs {
    vehicleName: string;
    year: string;
    image: string;
    price: string;
    description: string;
    transmission: string;
    fuelType: string;
    seats: string;
    ac: string;
    userId: string
    
}

// describe user model to asign static methods to the modal
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// single documents properties
interface UserDoc extends mongoose.Document {
    vehicleName: string;
    year: string;
    image: string;
    price: string;
    description: string;
    transmission: string;
    fuelType: string;
    seats: string;
    ac: string;
    userId: string

}

const faq = new Schema(
  {
    vehicleName: String,
    year: String,
    image: String,
    price: String,
    description: String,
    transmission: String,
    fuelType: String,
    seats: String,
    ac: String,
    userId : { type : Schema.Types.ObjectId, ref :'user' }
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

faq.statics.build = function (attrs: UserAttrs) {
  return new Car(attrs);
};

export const Car = mongoose.model<UserDoc, UserModel>("car", faq);
