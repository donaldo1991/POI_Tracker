import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { poiService } from "./POI-service.js";
import { maggie, testCountry, testPoint, testCountries, testPoints, maggieCredentials } from "../fixtures.js";

suite("Point API tests", () => {

  let user = null;
  let country = null;

  setup(async () => {
    poiService.clearAuth();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    await poiService.deleteAllCountries();
    await poiService.deleteAllPoints();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    testCountry.userid = user._id;
    country = await poiService.createCountry(testCountry);
  });

  teardown(async () => {});

  test("create point", async () => {
    const returnedTrack = await poiService.createPoint(country._id, testPoint);
    assertSubset(testPoint, returnedTrack);
  });

  test("create Multiple points", async () => {
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoint(country._id, testPoints[i]);
    }
    const returnedTracks = await poiService.getAllPoints();
    assert.equal(returnedTracks.length, testPoints.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const point = await poiService.getPoint(returnedTracks[i]._id);
      assertSubset(point, returnedTracks[i]);
    }
  });

  test("Delete PointApi", async () => {
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoint(country._id, testPoints[i]);
    }
    let returnedTracks = await poiService.getAllPoints();
    assert.equal(returnedTracks.length, testPoints.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await poiService.deletePoint(returnedTracks[i]._id);
    }
    returnedTracks = await poiService.getAllPoints();
    assert.equal(returnedTracks.length, 0);
  });

  test("denormalised country", async () => {
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoint(country._id, testPoints[i]);
    }
    const returnedCountry = await poiService.getCountry(country._id);
    assert.equal(returnedCountry.points.length, testPoints.length);
    for (let i = 0; i < testPoints.length; i += 1) {
      assertSubset(testPoints[i], returnedCountry.points[i]);
    }
  });
});
