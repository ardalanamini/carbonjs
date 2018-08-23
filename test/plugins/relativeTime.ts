import * as MockDate from "mockdate";
import * as moment from "moment";
import * as Carbon from "../../src";
import * as relativeTime from "../../src/plugins/relativeTime";

Carbon.extend(relativeTime);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

test("Time from X", () => {
  const T = [
    [0, "second"], // a few seconds
    [44, "second"], // a few seconds
    [45, "second"], // a minute
    [89, "second"], // a minute
    [90, "second"], // 2 minutes
    [44, "minute"], // 44 minutes
    [45, "minute"], // an hour
    [89, "minute"], // an hour
    [90, "minute"], // 2 hours
    [21, "hour"], // 21 hours
    [22, "hour"], // a day
    [35, "hour"], // a day
    [36, "hour"], // 2 days
    [25, "day"], // 25 days
    [26, "day"], // a month
    [45, "day"], // a month
    [47, "day"], // 2 month
    [10, "month"], // 2 month
    [11, "month"], // a year
    [17, "month"], // a year
    [18, "month"], // 2 years
  ];

  T.forEach((t) => {
    expect(Carbon.parse().from(Carbon.parse().add(t[0], t[1] as any)))
      .toBe(moment().from(moment().add(t[0] as any, t[1])));
  });
  // withoutSuffix
  expect(Carbon.parse().from(Carbon.parse().add(3, "year"), true)).toBe(moment().from(moment().add(3, "year"), true));
  // past date
  expect(Carbon.parse().from(Carbon.parse().subtract(3, "year"))).toBe(moment().from(moment().subtract(3, "year")));
});

it("Time from now", () => {
  expect(Carbon.parse().fromNow()).toBe(moment().fromNow());
  expect(Carbon.parse().fromNow(true)).toBe(moment().fromNow(true));
});

it("Time to now", () => {
  expect(Carbon.parse().toNow()).toBe(moment().toNow());
  expect(Carbon.parse().toNow(true)).toBe(moment().toNow(true));
});

it("Time to X", () => {
  // withoutSuffix
  expect(Carbon.parse().to(Carbon.parse().add(3, "year"), true)).toBe(moment().to(moment().add(3, "year"), true));
  // past date
  expect(Carbon.parse().to(Carbon.parse().subtract(3, "year"))).toBe(moment().to(moment().subtract(3, "year")));
});
