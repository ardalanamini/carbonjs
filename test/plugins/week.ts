import * as MockDate from "mockdate";
import * as moment from "moment";
import * as Carbon from "../../src";
import * as week from "../../src/plugins/week";

Carbon.extend(week);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("week", () => {
  test("Week of year", () => {
    const day = "2018-12-31T10:59:09+08:00";

    expect(Carbon.parse(day).week()).toBe(moment(day).weeks());
    expect(Carbon.parse().week()).toBe(moment().weeks());
  });
});
