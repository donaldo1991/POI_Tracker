import { Country } from "./country.js";
import { pointMongoStore } from "./point-mongo-store.js";

export const countryMongoStore = {
  async getAllCountries() {
    const countries = await Country.find().lean();
    return countries;
  },

  async getCountryById(id) {
    if (id) {
      const country = await Country.findOne({ _id: id }).lean();
      if (country) {
        country.points = await pointMongoStore.getPointsByCountryId(country._id);
      }
      return country;
    }
    return null;
  },

  async addCountry(country) {
    const newCountry = new Country(country);
    const countryObj = await newCountry.save();
    return this.getCountryById(countryObj._id);
  },

  async getUserCountries(id) {
    const country = await Country.find({ userid: id }).lean();
    return country;
  },

  async deleteCountryById(id) {
    try {
      await Country.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCountries() {
    await Country.deleteMany({});
  }
};
