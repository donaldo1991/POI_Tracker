import { userMemStore } from "./mem/user-mem-store.js";
import { countryMemStore } from "./mem/country-mem-store.js";
import { pointMemStore } from "./mem/point-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { countryJsonStore } from "./json/country-json-store.js";
import { pointJsonStore } from "./json/point-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { countryMongoStore } from "./mongo/country-mongo-store.js";
import { pointMongoStore } from "./mongo/point-mongo-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  userStore: null,
  countryStore: null,
  pointStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.countryStore = countryJsonStore;
        this.pointStore = pointJsonStore;
        break;
      case "mongo":
        this.countryStore = countryMongoStore;
        this.pointStore = pointMongoStore;
        this.userStore = userMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.countryStore = countryMemStore;
        this.pointStore = pointMemStore;
    }
  },
};
