import { v4 } from "uuid";
import { pointMemStore } from "./point-mem-store.js";

let countries = [];

export const countryMemStore = {
  async getAllCountries() {
    return countries;
  },

  async addCountry(country) {
    country._id = v4();
    countries.push(country);
    return country;
  },

  async getCountryById(id) {
    const list = countries.find((country) => country._id === id);
    if (list) {
      list.points = await pointMemStore.getPointsByCountryId(list._id);
      return list;
    }
    return null;
  },

  async deleteCountryById(id) {
    const index = countries.findIndex((country) => country._id === id);
    if (index !== -1) countries.splice(index, 1);
  },

  async deleteAllCountries() {
    countries = [];
  },

  async getUserCountries(userid) {
    return countries.filter((country) => country.userid === userid);
  },
};
