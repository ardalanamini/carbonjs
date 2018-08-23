import * as moment from "moment";
import * as MockDate from "mockdate";
import * as Carbon from "../src";
import * as th from "../src/locales/th";

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("Testing display methods", () => {
  test("Format no formatStr", () => {
    expect(Carbon.parse().format()).toBe(moment().format());
  });

  test("Format Year YY YYYY", () => {
    expect(Carbon.parse().format("YY")).toBe(moment().format("YY"));
    expect(Carbon.parse().format("YYYY")).toBe(moment().format("YYYY"));
  });

  test("Format Month M MM MMM MMMM", () => {
    expect(Carbon.parse().format("M")).toBe(moment().format("M"));
    expect(Carbon.parse().format("MM")).toBe(moment().format("MM"));
    expect(Carbon.parse().format("MMM")).toBe(moment().format("MMM"));
    expect(Carbon.parse().format("MMMM")).toBe(moment().format("MMMM"));
  });

  test("Format Day of Month D DD 1 - 31", () => {
    expect(Carbon.parse().format("D")).toBe(moment().format("D"));
    expect(Carbon.parse().format("DD")).toBe(moment().format("DD"));
  });

  test("Format Day of Week d Sun - Sat", () => {
    expect(Carbon.parse().format("d")).toBe(moment().format("d"));
    expect(Carbon.parse().format("dd")).toBe(moment().format("dd"));
    expect(Carbon.parse().format("ddd")).toBe(moment().format("ddd"));
    expect(Carbon.parse().format("dddd")).toBe(moment().format("dddd"));
  });

  test("Format Hour H HH 24-hour", () => {
    expect(Carbon.parse().format("H")).toBe(moment().format("H"));
    expect(Carbon.parse().format("HH")).toBe(moment().format("HH"));
  });

  test("Format Hour h hh 12-hour", () => {
    MockDate.set(new Date("2018-05-02T00:00:00.000"));

    expect(Carbon.parse().format("h")).toBe(moment().format("h"));
    expect(Carbon.parse().format("hh")).toBe(moment().format("hh"));

    MockDate.set(new Date("2018-05-02T01:00:00.000"));

    expect(Carbon.parse().format("h")).toBe(moment().format("h"));
    expect(Carbon.parse().format("hh")).toBe(moment().format("hh"));

    MockDate.set(new Date("2018-05-02T23:00:00.000"));

    expect(Carbon.parse().format("h")).toBe(moment().format("h"));
    expect(Carbon.parse().format("hh")).toBe(moment().format("hh"));
  });

  test("Format meridiens a A am / pm", () => {
    MockDate.set(new Date("2018-05-02T01:00:00.000"));

    expect(Carbon.parse().format("a")).toBe(moment().format("a"));
    expect(Carbon.parse().format("A")).toBe(moment().format("A"));

    MockDate.set(new Date("2018-05-02T23:00:00.000"));

    expect(Carbon.parse().format("a")).toBe(moment().format("a"));
    expect(Carbon.parse().format("A")).toBe(moment().format("A"));
  });

  test("Format Minute m mm", () => {
    expect(Carbon.parse().format("m")).toBe(moment().format("m"));
    expect(Carbon.parse().format("mm")).toBe(moment().format("mm"));
  });

  test("Format Second s ss SSS", () => {
    expect(Carbon.parse().format("s")).toBe(moment().format("s"));
    expect(Carbon.parse().format("ss")).toBe(moment().format("ss"));
    expect(Carbon.parse().format("SSS")).toBe(moment().format("SSS"));

    const date = "2011-11-05T14:48:01.002Z";

    expect(Carbon.parse(date).format("s-ss-SSS")).toBe(moment(date).format("s-ss-SSS"));
  });

  test("Format Time Zone ZZ", () => {
    MockDate.set(new Date("2018-05-02T23:00:00.000"), 60 * 8);

    expect(Carbon.parse().format("Z")).toBe(moment().format("Z"));
    expect(Carbon.parse().format("ZZ")).toBe(moment().format("ZZ"));

    MockDate.set(new Date("2018-05-02T23:00:00.000"), 60 * 8 * -1);

    expect(Carbon.parse().format("ZZ")).toBe(moment().format("ZZ"));

    MockDate.set(new Date("2018-05-02T23:00:00.000"), 0);

    expect(Carbon.parse().format("ZZ")).toBe(moment().format("ZZ"));

    MockDate.set(new Date("2018-05-02T23:00:00.000"), 60 * 10);

    expect(Carbon.parse().format("ZZ")).toBe(moment().format("ZZ"));

    MockDate.set(new Date("2018-05-02T23:00:00.000"), 60 * 11 * -1);

    expect(Carbon.parse().format("ZZ")).toBe(moment().format("ZZ"));

    MockDate.set(new Date("2018-05-02T23:00:00.000"), 60 * 5.5 * -1);

    expect(Carbon.parse().format("ZZ")).toBe(moment().format("ZZ"));
  });

  test("Format ddd dd MMM with short locale", () => {
    expect(Carbon.parse().locale(th).format("dd")).toBe(moment().locale("th").format("dd"));
    expect(Carbon.parse().locale(th).format("ddd")).toBe(moment().locale("th").format("ddd"));
    expect(Carbon.parse().locale(th).format("MMM")).toBe(moment().locale("th").format("MMM"));
  });

  test("Format Complex with other string - : / ", () => {
    const str = "YY-M-D / HH:mm:ss";

    expect(Carbon.parse().format(str)).toBe(moment().format(str));
  });

  test("Format Escaping characters", () => {
    const str = "[Z] Z";

    expect(Carbon.parse().format(str)).toBe(moment().format(str));
  });

  describe("Difference", () => {
    test("empty -> default milliseconds", () => {
      const dateString = "20110101";
      const carbonA = Carbon.parse();
      const carbonB = Carbon.parse(dateString);
      const momentA = moment();
      const momentB = moment(dateString);

      expect(carbonA.diff(carbonB)).toBe(momentA.diff(momentB));
    });

    test("diff -> none carbon object", () => {
      const dateString = "2013-02-08";
      const carbonA = Carbon.parse();
      const carbonB = new Date(dateString);
      const momentA = moment();
      const momentB = new Date(dateString);

      expect(carbonA.diff(carbonB)).toBe(momentA.diff(momentB));
    });

    test("diff -> in seconds, minutes, hours, days, weeks, months, quarters, years ", () => {
      const carbonA = Carbon.parse();
      const carbonB = Carbon.parse().add(1000, "days");
      const carbonC = Carbon.parse().subtract(1000, "days");
      const momentA = moment();
      const momentB = moment().add(1000, "days");
      const momentC = moment().subtract(1000, "days");

      ["seconds", "minutes", "hours", "days", "weeks", "months", "quarters", "years"]
        .forEach((unit: any) => {
          expect(carbonA.diff(carbonB, unit)).toBe(momentA.diff(momentB, unit));
          expect(carbonA.diff(carbonB, unit, true)).toBe(momentA.diff(momentB, unit, true));
          expect(carbonA.diff(carbonC, unit)).toBe(momentA.diff(momentC, unit));
          expect(carbonA.diff(carbonC, unit, true)).toBe(momentA.diff(momentC, unit, true));
        });
    });

    test("Special diff in month according to moment.js", () => {
      const carbonA = Carbon.parse("20160115");
      const carbonB = Carbon.parse("20160215");
      const carbonC = Carbon.parse("20170115");
      const momentA = moment("20160115");
      const momentB = moment("20160215");
      const momentC = moment("20170115");

      ["months", "quarters", "years"]
        .forEach((unit: any) => {
          expect(carbonA.diff(carbonB, unit)).toBe(momentA.diff(momentB, unit));
          expect(carbonA.diff(carbonB, unit, true)).toBe(momentA.diff(momentB, unit, true));
          expect(carbonA.diff(carbonC, unit)).toBe(momentA.diff(momentC, unit));
          expect(carbonA.diff(carbonC, unit, true)).toBe(momentA.diff(momentC, unit, true));
        });
    });
  });

  test("Unix Timestamp (milliseconds)", () => {
    expect(Carbon.parse().valueOf()).toBe(moment().valueOf());
  });

  test("Unix Timestamp (seconds)", () => {
    expect(Carbon.parse().unix()).toBe(moment().unix());
  });

  test("Days in Month", () => {
    expect(Carbon.parse().daysInMonth()).toBe(moment().daysInMonth());
    expect(Carbon.parse("20140201").daysInMonth()).toBe(moment("20140201").daysInMonth());
  });

  test("As Javascript Date -> toDate", () => {
    const base = Carbon.parse();
    const momentBase = moment();
    const jsDate = base.toDate();

    expect(jsDate).toEqual(momentBase.toDate());
    expect(jsDate).toEqual(new Date());

    jsDate.setFullYear(1970);

    expect(jsDate.toUTCString()).not.toBe(base.toString());
  });

  test("As Array -> toArray", () => {
    expect(Carbon.parse().toArray()).toEqual(moment().toArray());
  });

  test("As JSON -> toJSON", () => {
    expect(Carbon.parse().toJSON()).toBe(moment().toJSON());
  });

  test("As ISO 8601 String -> toISOString e.g. 2013-02-04T22:44:30.652Z", () => {
    expect(Carbon.parse().toISOString()).toBe(moment().toISOString());
  });

  test("As Object -> toObject", () => {
    expect(Carbon.parse().toObject()).toEqual(moment().toObject());
  });
});
