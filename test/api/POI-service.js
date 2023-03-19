import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const poiService = {
  poiUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.poiUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },

  //

  async createCountry(country) {
    const res = await axios.post(`${this.poiUrl}/api/countries`, country);
    return res.data;
  },

  async deleteAllCountries() {
    const response = await axios.delete(`${this.poiUrl}/api/countries`);
    return response.data;
  },

  async deleteCountry(id) {
    const response = await axios.delete(`${this.poiUrl}/api/countries/${id}`);
    return response;
  },

  async getAllCountries() {
    const res = await axios.get(`${this.poiUrl}/api/countries`);
    return res.data;
  },

  async getCountry(id) {
    const res = await axios.get(`${this.poiUrl}/api/countries/${id}`);
    return res.data;
  },

  ////

  async createPoint(countryid, point) {
    const res = await axios.post(`${this.poiUrl}/api/countries/${countryid}/points`, point);
    return res.data;
  },

  async deleteAllPoints() {
    const response = await axios.delete(`${this.poiUrl}/api/points`);
    return response.data;
  },

  async deletePoint(id) {
    const response = await axios.delete(`${this.poiUrl}/api/points/${id}`);
    return response;
  },

  async getAllPoints() {
    const res = await axios.get(`${this.poiUrl}/api/points`);
    return res.data;
  },

  async getPoint(id) {
    const res = await axios.get(`${this.poiUrl}/api/points/${id}`);
    return res.data;
  },

  //

  async authenticate(user) {
    const response = await axios.post(`${this.poiUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  }

};