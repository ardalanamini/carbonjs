import * as MockDate from "mockdate";
import * as Carbon from "../../src";
import * as isBetween from "../../src/plugins/is-between";

Carbon.extend(isBetween);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

test("is between", () => {
  expect(Carbon.parse("2018-01-01").isBetween("2017-01-01", "2019-01-01")).toBeTruthy();
  expect(Carbon.parse("2018-01-01").isBetween("2019-01-01", "2017-01-01")).toBeTruthy();
  expect(Carbon.parse("2018-01-01").isBetween("2016-01-01", "2017-01-01")).toBeFalsy();
});
