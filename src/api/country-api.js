import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { CountryArray, CountrySpec, CountrySpecPlus, IdSpec, UserArray, UserSpec } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";

export const countryApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const countries = await db.countryStore.getAllCountries();
        return countries;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all countryApi",
    notes: "Returns details of all countryApi",
    response: { schema: CountryArray, failAction: validationError }
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Get a specific country",
    notes: "Returns country details",
    response: { schema: CountrySpecPlus, failAction: validationError },
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Create a Country",
    notes: "Returns the newly created country",
    validate: { payload: CountrySpec, failAction: validationError },
    response: { schema: CountrySpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Delete a specific country",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.countryStore.deleteAllCountries();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all countryApi",
    notes: "All countryApi removed from tourist attractions",
  },
};
