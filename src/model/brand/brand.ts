import mongoose, { Schema } from "mongoose";

// users attributes
interface BrandAttrs {
  brand: string;
  color: string;
}

// describe user model to asign static methods to the modal
interface BrandModel extends mongoose.Model<BrandDoc> {
  build(attrs: BrandAttrs): BrandDoc;
}

// single documents properties
interface BrandDoc extends mongoose.Document {
    brand: string;
    color: string;
}

const faq = new Schema(
  {
    brand: String,
    color: String,
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

faq.statics.build = function (attrs: BrandAttrs) {
  return new Brand(attrs);
};

export const Brand = mongoose.model<BrandDoc, BrandModel>("brand", faq);
