import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pointSchema = new Schema({
  name: String,
  longitude: Number,
  latitude: Number,
  description: String,
  countryid: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

export const Point = Mongoose.model("Point", pointSchema);
