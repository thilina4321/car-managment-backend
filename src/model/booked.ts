import mongoose, { Schema } from "mongoose";

// users attributes
interface UserAttrs {
  userId: string;
  carId: string;
  date:string;
  userName:string;
  carName:string;
  price:number;

}

// describe user model to asign static methods to the modal
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// single documents properties
interface UserDoc extends mongoose.Document {
    userId: string;
    carId: string;
    date:string;
    userName:string;
    carName:string;
    price:number;




}

const user = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    carId: { type: Schema.Types.ObjectId },
    userName:String,
    carName:String,
    date : String,
    price: Number
  },
  { timestamps: true }
);

user.statics.build = (attrs: UserAttrs) => {
  return new Booked(attrs);
};

user.methods.toJSON = function () {
  const document = this;
  const documentObject = document.toObject();
  return documentObject;
};



const Booked = mongoose.model<UserDoc, UserModel>("booked", user);

export { Booked };
