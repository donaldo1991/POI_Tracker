import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const countryApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const countries = await db.countryStore.getAllCountries();
        return countries;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const country = await db.countryStore.getCountryById(request.params.id);
        if (!country) {
          return Boom.notFound("No Country with this id");
        }
        return country;
      } catch (err) {
        return Boom.serverUnavailable("No Country with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const country = request.payload;
        const newCountry = await db.countryStore.addCountry(country);
        if (newCountry) {
          return h.response(newCountry).code(201);
        }
        return Boom.badImplementation("error creating playlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const country = await db.countryStore.getCountryById(request.params.id);
        if (!country) {
          return Boom.notFound("No Country with this id");
        }
        await db.countryStore.deleteCountryById(country._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Country with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.countryStore.deleteAllCountries();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
