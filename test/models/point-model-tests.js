import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCountries, testPoints, testCountry, testPoint, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Point Model tests", () => {

  let countryTest = null;

  setup(async () => {
    db.init("mongo");
    await db.countryStore.deleteAllCountries();
    await db.pointStore.deleteAllPoints();
    countryTest = await db.countryStore.addCountry(testCountry);
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPoints[i] = await db.pointStore.addPoint(countryTest._id, testPoints[i]);
    }
  });

  test("create single point", async () => {
    const list = await db.countryStore.addCountry(testCountry);
    const point = await db.pointStore.addPoint(list._id, testPoint)
    assert.isNotNull(point._id);
    assertSubset (testPoint, point);
  });

  test("get multiple points", async () => {
    const points = await db.pointStore.getPointsByCountryId(countryTest._id);
    assert.equal(points.length, testPoints.length)
  });

  test("delete all points", async () => {
    const points = await db.pointStore.getAllPoints();
    assert.equal(testPoints.length, points.length);
    await db.pointStore.deleteAllPoints();
    const newPoints = await db.pointStore.getAllPoints();
    assert.equal(0, newPoints.length);
  });

  test("get a point - success", async () => {
    const country = await db.countryStore.addCountry(testCountry);
    const point = await db.pointStore.addPoint(country._id, testPoint)
    const newPoint = await db.pointStore.getPointById(point._id);
    assertSubset (testPoint, newPoint);
  });

  test("delete One Point - success", async () => {
    await db.pointStore.deletePoint(testPoints[0]._id);
    const points = await db.pointStore.getAllPoints();
    assert.equal(points.length, testCountries.length - 1);
    const deletedPoint = await db.pointStore.getPointById(testPoints[0]._id);
    assert.isNull(deletedPoint);
  });

  test("get a point - bad params", async () => {
    assert.isNull(await db.pointStore.getPointById(""));
    assert.isNull(await db.pointStore.getPointById());
  });

  test("delete one point - fail", async () => {
    await db.pointStore.deletePoint("bad-id");
    const points = await db.pointStore.getAllPoints();
    assert.equal(points.length, testCountries.length);
  });
});
