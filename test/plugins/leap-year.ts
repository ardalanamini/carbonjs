import * as MockDate from "mockdate";
import * as Carbon from "../../src";
import * as leapYear from "../../src/plugins/leap-year";

Carbon.extend(leapYear);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

test("IsLeapYear", () => {
  expect(Carbon.parse("20000101").isLeapYear()).toBe(true);
  expect(Carbon.parse("2100-01-01").isLeapYear()).toBe(false);
  expect(Carbon.parse("2018-01-01").isLeapYear()).toBe(false);
});
