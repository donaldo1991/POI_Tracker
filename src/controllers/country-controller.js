import { db } from "../models/db.js";
import { PointSpec } from "../models/joi-schemas.js";

export const countryController = {
  index: {
    handler: async function (request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      const viewData = {
        name: "Country",
        country: country,
      };
      return h.view("country-view", viewData);
    },
  },

  addPoint: {
    validate: {
      payload: PointSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("country-view", { title: "Add point of interest error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      const newPoint = {
        name: request.payload.name,
        coordinates: Number(request.payload.coordinates),
      };
      await db.pointStore.addPoint(country._id, newPoint);
      return h.redirect(`/country/${country._id}`);
    },
  },

  deletePoint: {
    handler: async function(request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      await db.pointStore.deletePoint(request.params.pointid);
      return h.redirect(`/country/${country._id}`);
    },
  },
};