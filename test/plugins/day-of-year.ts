import * as MockDate from "mockdate";
import * as moment from "moment";
import * as Carbon from "../../src";
import * as dayOfYear from "../../src/plugins/day-of-year";

Carbon.extend(dayOfYear);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("day-of-year", () => {
  test("dayOfYear", () => {
    const day = "2018-12-31T10:59:09+08:00";

    expect(Carbon.parse(day).dayOfYear()).toBe(moment(day).dayOfYear());
    expect(Carbon.parse().dayOfYear()).toBe(moment().dayOfYear());
  });
});
