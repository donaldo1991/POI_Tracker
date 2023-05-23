import { userApi } from "./api/user-api.js";
import { countryApi } from "./api/country-api.js";
import { pointApi } from "./api/point-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/countries", config: countryApi.create },
  { method: "DELETE", path: "/api/countries", config: countryApi.deleteAll },
  { method: "GET", path: "/api/countries", config: countryApi.find },
  { method: "GET", path: "/api/countries/{id}", config: countryApi.findOne },
  //{ method: "GET", path: "/api/countries/{id}", config: countryApi.deleteOne },
  { method: "DELETE", path: "/api/countries/{id}", config: countryApi.deleteOne },

  { method: "GET", path: "/api/points", config: pointApi.find },
  { method: "GET", path: "/api/points/{id}", config: pointApi.findOne },
  { method: "POST", path: "/api/countries/{id}/points", config: pointApi.create },
  { method: "DELETE", path: "/api/points", config: pointApi.deleteAll },
  { method: "DELETE", path: "/api/points/{id}", config: pointApi.deleteOne },

  //{ method: "POST", path: "/api/countries/{id}/image", config: countryApi.uploadImage },
  //{ method: "DELETE", path: "/api/countries/{id}/image", config: countryApi.deleteImage },
  //{ method: "POST", path: "/api/points/{id}/image", config: pointApi.uploadImage },
  //{ method: "DELETE", path: "/api/points/{id}/image", config: pointApi.deleteImage },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

];