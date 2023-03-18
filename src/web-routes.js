import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { countryController } from "./controllers/country-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcountry", config: dashboardController.addCountry },

  { method: "GET", path: "/country/{id}", config: countryController.index },
  { method: "POST", path: "/country/{id}/addpoint", config: countryController.addPoint },

  { method: "GET", path: "/dashboard/deletecountry/{id}", config: dashboardController.deleteCountry },
  { method: "GET", path: "/country/{id}/deletepoint/{pointid}", config: countryController.deletePoint },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }


];
