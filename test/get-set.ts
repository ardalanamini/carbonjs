import * as moment from "moment";
import * as MockDate from "mockdate";
import * as Carbon from "../src";

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("Testing get/set", () => {
  test("Year", () => {
    expect(Carbon.parse().year()).toBe(moment().year());
  });

  test("Month", () => {
    expect(Carbon.parse().month()).toBe(moment().month());
  });

  test("Day of Week", () => {
    expect(Carbon.parse().weekday()).toBe(moment().day());
  });

  test("Date", () => {
    expect(Carbon.parse().day()).toBe(moment().date());
  });

  test("Hour", () => {
    expect(Carbon.parse().hour()).toBe(moment().hour());
  });

  test("Minute", () => {
    expect(Carbon.parse().minute()).toBe(moment().minute());
  });

  test("Second", () => {
    expect(Carbon.parse().second()).toBe(moment().second());
  });

  test("Millisecond", () => {
    expect(Carbon.parse().millisecond()).toBe(moment().millisecond());
  });

  test("Set Day", () => {
    expect(Carbon.parse().set("date", 30).valueOf()).toBe(moment().set("date", 30).valueOf());
  });

  test("Set Day of Week", () => {
    expect(Carbon.parse().set("day", 0).valueOf()).toBe(moment().set("day", 0).valueOf());
  });

  test("Set Month", () => {
    expect(Carbon.parse().set("month", 11).valueOf()).toBe(moment().set("month", 11).valueOf());
  });

  test("Set Year", () => {
    expect(Carbon.parse().set("year", 2008).valueOf()).toBe(moment().set("year", 2008).valueOf());
  });

  test("Set Hour", () => {
    expect(Carbon.parse().set("hour", 6).valueOf()).toBe(moment().set("hour", 6).valueOf());
  });

  test("Set Minute", () => {
    expect(Carbon.parse().set("minute", 59).valueOf()).toBe(moment().set("minute", 59).valueOf());
  });

  test("Set Second", () => {
    expect(Carbon.parse().set("second", 59).valueOf()).toBe(moment().set("second", 59).valueOf());
  });

  test("Set Millisecond", () => {
    expect(Carbon.parse().set("millisecond", 999).valueOf()).toBe(moment().set("millisecond", 999).valueOf());
  });

  test("Set Unknown String", () => {
    const newDate = Carbon.parse().set("Unknown String" as any, 1);

    expect(newDate.valueOf())
      .toBe(moment().set("Unknown String" as any, 1).valueOf());
  });

  test("Immutable Set", () => {
    const carbonA = Carbon.parse();
    const carbonB = carbonA.set("year", 2011);
    const momentA = moment();
    const momentB = momentA.set("year", 2011);

    expect(carbonA.valueOf()).not.toBe(carbonB.valueOf());
    expect(momentA.valueOf()).toBe(momentB.valueOf());
  });
});
