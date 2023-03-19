import { EventEmitter } from "events";
import { assert } from "chai";
import { poiService } from "./POI-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testCountry, testCountries, maggieCredentials } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Country API tests", () => {

  let user = null;

  setup(async () => {
    poiService.clearAuth();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    await poiService.deleteAllCountries();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    testCountry.userid = user._id;
  });

  teardown(async () => {});

  test("create country", async () => {
    const returnedCountry = await poiService.createCountry(testCountry);
    assert.isNotNull(returnedCountry);
    assertSubset(testCountry, returnedCountry);
  });

  test("delete a country", async () => {
    const country = await poiService.createCountry(testCountry);
    const response = await poiService.deleteCountry(country._id);
    assert.equal(response.status, 204);
    try {
      const returnedCountry = await poiService.getCountry(country.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
    }
  });

  test("create multiple countries", async () => {
    for (let i = 0; i < testCountries.length; i += 1) {
      testCountries[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createCountry(testCountries[i]);
    }
    let returnedLists = await poiService.getAllCountries();
    assert.equal(returnedLists.length, testCountries.length);
    await poiService.deleteAllCountries();
    returnedLists = await poiService.getAllCountries();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant country", async () => {
    try {
      const response = await poiService.deleteCountry("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
    }
  });
});
