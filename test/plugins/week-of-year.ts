import * as MockDate from "mockdate";
import * as moment from "moment";
import * as Carbon from "../../src";
import * as weekOfYear from "../../src/plugins/week-of-year";

Carbon.extend(weekOfYear);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("weekOfYear", () => {
  test("Week of year", () => {
    const day = "2018-12-31T10:59:09+08:00";

    expect(Carbon.parse(day).weekOfYear()).toBe(moment(day).weeks());
    expect(Carbon.parse().weekOfYear()).toBe(moment().weeks());
  });
});
