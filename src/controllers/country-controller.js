import { db } from "../models/db.js";
import { PointSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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
        longitude: Number(request.payload.longitude),
        latitude: Number(request.payload.latitude),
        description: request.payload.description,
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

  uploadImage: {
    handler: async function (request, h) {
      try {
        const country = await db.countryStore.getCountryById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          country.img = url;
          await db.countryStore.updateCountry(country);
        }
        return h.redirect(`/country/${country._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/country/${country._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

};