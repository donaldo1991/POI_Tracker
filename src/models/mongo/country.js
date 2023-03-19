import Mongoose from "mongoose";

const { Schema } = Mongoose;

const countrySchema = new Schema({
  name: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Country = Mongoose.model("Country", countrySchema);
