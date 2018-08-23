import * as moment from "moment";
import * as MockDate from "mockdate";
import * as Carbon from "../src";

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("StartOf EndOf", () => {
  test("StartOf EndOf Year ... with s and upper case", () => {
    const testArr = ["Year", "year", "YearS", "month", "day",
      "week", "hour", "minute", "second"];

    testArr.forEach((d: any) => {
      expect(Carbon.parse().startOf(d).valueOf()).toBe(moment().startOf(d).valueOf());
      expect(Carbon.parse().endOf(d).valueOf()).toBe(moment().endOf(d).valueOf());
    });
  });

  test("StartOf EndOf Other -> no change", () => {
    expect(Carbon.parse().startOf("otherString" as any).valueOf())
      .toBe(moment().startOf("otherString" as any).valueOf());
    expect(Carbon.parse().endOf("otherString" as any).valueOf())
      .toBe(moment().endOf("otherString" as any).valueOf());
  });
});

test("Add Time days", () => {
  expect(Carbon.parse().add(1, "ms").valueOf()).toBe(moment().add(1, "ms").valueOf());
  expect(Carbon.parse().add(1, "milliseconds").valueOf()).toBe(moment().add(1, "milliseconds").valueOf());
  expect(Carbon.parse().add(1, "s").valueOf()).toBe(moment().add(1, "s").valueOf());
  expect(Carbon.parse().add(1, "seconds").valueOf()).toBe(moment().add(1, "seconds").valueOf());
  expect(Carbon.parse().add(1, "m").valueOf()).toBe(moment().add(1, "m").valueOf());
  expect(Carbon.parse().add(1, "minutes").valueOf()).toBe(moment().add(1, "minutes").valueOf());
  expect(Carbon.parse().add(1, "h").valueOf()).toBe(moment().add(1, "h").valueOf());
  expect(Carbon.parse().add(1, "hours").valueOf()).toBe(moment().add(1, "hours").valueOf());
  expect(Carbon.parse().add(1, "w").valueOf()).toBe(moment().add(1, "w").valueOf());
  expect(Carbon.parse().add(1, "weeks").valueOf()).toBe(moment().add(1, "weeks").valueOf());
  expect(Carbon.parse().add(1, "d").valueOf()).toBe(moment().add(1, "d").valueOf());
  expect(Carbon.parse().add(1, "days").valueOf()).toBe(moment().add(1, "days").valueOf());
  expect(Carbon.parse().add(1, "M").valueOf()).toBe(moment().add(1, "M").valueOf());
  expect(Carbon.parse().add(1, "y").valueOf()).toBe(moment().add(1, "y").valueOf());
  expect(Carbon.parse("20111031").add(1, "months").valueOf()).toBe(moment("20111031").add(1, "months").valueOf());
  expect(Carbon.parse("20160131").add(1, "months").valueOf()).toBe(moment("20160131").add(1, "months").valueOf());
  expect(Carbon.parse("20160229").add(1, "year").valueOf()).toBe(moment("20160229").add(1, "year").valueOf());

  expect(Carbon.parse().add("2", "years").valueOf()).toBe(moment().add("2", "years").valueOf());
});

test("Subtract Time days", () => {
  expect(Carbon.parse().subtract(1, "days").valueOf()).toBe(moment().subtract(1, "days").valueOf());
});
