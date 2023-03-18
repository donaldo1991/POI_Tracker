import { db } from "../models/db.js";
import { CountrySpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const countries = await db.countryStore.getUserCountries(loggedInUser._id);
      const viewData = {
        title: "Point of Interest Dashboard",
        user: loggedInUser,
        countries: countries,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCountry: {
    validate: {
      payload: CountrySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Country error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCountries = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.countryStore.addCountry(newCountries);
      return h.redirect("/dashboard");
    },
  },

  deleteCountry: {
    handler: async function (request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      await db.countryStore.deleteCountryById(country._id);
      return h.redirect("/dashboard");
    },
  },
};
