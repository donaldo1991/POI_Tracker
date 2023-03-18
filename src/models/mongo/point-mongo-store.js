import { Point } from "./point.js";
import { v4 } from "uuid";

export const pointMongoStore = {
  async getAllPoints() {
    const points = await Point.find().lean();
    return points;
  },

  async addPoint(countryId, point) {
    point.countryid = countryId;
    const newPoint = new Point(point);
    const pointObj = await newPoint.save();
    return this.getPointById(pointObj._id);
  },

  async getPointsByCountryId(id) {
    const points = await Point.find({ countryid: id }).lean();
    return points;
  },

  async getPointById(id) {
    if (id) {
      const point = await Point.findOne({ _id: id }).lean();
      return point;
    }
    return null;
  },

  async deletePoint(id) {
    try {
      await Point.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPoints() {
    await Point.deleteMany({});
  },

  async updatePoint(point, updatedPoint) {
    const pointDoc = await Point.findOne({ _id: point._id });
    pointDoc.name = updatedPoint.name;
    pointDoc.identifier = v4();
    pointDoc.coordinates = updatedPoint.coordinates;
    await pointDoc.save();
  },
};
