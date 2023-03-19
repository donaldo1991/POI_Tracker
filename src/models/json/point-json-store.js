import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/points.json"));
db.data = { points: [] };

export const pointJsonStore = {
  async getAllPoints() {
    await db.read();
    return db.data.points;
  },

  async addPoint(countryId, point) {
    await db.read();
    point._id = v4();
    point.countryid = countryId;
    db.data.points.push(point);
    await db.write();
    return point;
  },

  async getPointsByCountryId(id) {
    await db.read();
    return db.data.points.filter((point) => point.countryid === id);
  },

  async getPointById(id) {
    await db.read();
    return db.data.points.find((point) => point._id === id);
  },

  async deletePoint(id) {
    await db.read();
    const index = db.data.points.findIndex((point) => point._id === id);
    db.data.points.splice(index, 1);
    await db.write();
  },

  async deleteAllPoints() {
    db.data.points = [];
    await db.write();
  },

  async updatePoint(point, updatedPoint) {
    point.name = updatedPoint.name;
    point.identifier = v4();
    point.longitude = updatedPoint.longitude;
    point.latitude = updatedPoint.latitude;
    point.description = updatedPoint.description;
    await db.write();
  },
};