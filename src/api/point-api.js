import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PointArray, PointSpec, PointSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";

export const pointApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const points = await db.pointStore.getAllPoints();
        return points;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PointArray, failAction: validationError },
    description: "Get all pointApi",
    notes: "Returns all pointApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No point with this id");
        }
        return point;
      } catch (err) {
        return Boom.serverUnavailable("No point with this id");
      }
    },
    tags: ["api"],
    description: "Find a Point",
    notes: "Returns a point",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PointSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const point = await db.pointStore.addPoint(request.params.id, request.payload);
        if (point) {
          return h.response(point).code(201);
        }
        return Boom.badImplementation("error creating point");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Point",
    notes: "Returns the newly created track",
    validate: { payload: PointSpec },
    response: { schema: PointSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.pointStore.deleteAllPoints();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all pointApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No Point with this id");
        }
        await db.pointStore.deletePoint(point._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Point with this id");
      }
    },
    tags: ["api"],
    description: "Delete a point",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};