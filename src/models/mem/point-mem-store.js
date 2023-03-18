import { v4 } from "uuid";

let points = [];

export const pointMemStore = {
  async getAllPoints() {
    return points;
  },

  async addPoint(countryId, point) {
    point._id = v4();
    point.countryid = countryId;
    points.push(point);
    return point;
  },

  async getPointsByCountryId(id) {
    return points.filter((point) => point.countryid === id);
  },

  async getPointById(id) {
    return points.find((point) => point._id === id);
  },

  async getCountryPoints(countryId) {
    return points.filter((point) => point.countryid === countryId);
  },

  async deletePoint(id) {
    const index = points.findIndex((point) => point._id === id);
    points.splice(index, 1);
  },

  async deleteAllPoints() {
    points = [];
  },

  async updatePoint(point, updatedPoint) {
    point.name = updatedPoint.name;
    point.identifier = v4();
    point.coordinates = updatedPointk.coordinates;
  },
};