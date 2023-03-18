import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { pointJsonStore } from "./point-json-store.js";

const db = new Low(new JSONFile("./src/models/json/countries.json"));
db.data = { countries: [] };

export const countryJsonStore = {
  async getAllCountries() {
    await db.read();
    return db.data.countries;
  },

  async addCountry(country) {
    await db.read();
    country._id = v4();
    db.data.countries.push(country);
    await db.write();
    return country;
  },

  async getCountryById(id) {
    await db.read();
    let list = db.data.countries.find((country) => country._id === id);
    if (list) {
      list.points = await pointJsonStore.getPointsByCountryId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCountries(userid) {
    await db.read();
    return db.data.countries.filter((country) => country.userid === userid);
  },

  async deleteCountryById(id) {
    await db.read();
    const index = db.data.countries.findIndex((country) => country._id === id);
    if (index !== -1) db.data.countries.splice(index, 1);
    await db.write();
  },

  async deleteAllCountries() {
    db.data.countries = [];
    await db.write();
  },
};