import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pointSchema = new Schema({
  name: String,
  coordinates: Number,
  countryid: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

export const Point = Mongoose.model("Point", pointSchema);
