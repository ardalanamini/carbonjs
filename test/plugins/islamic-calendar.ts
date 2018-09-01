import * as MockDate from "mockdate";
import * as moment from "moment-hijri";
import * as Carbon from "../../src";
import * as islamicCalendar from "../../src/plugins/islamic-calendar";
import "../../src/locales/ru";

Carbon.extend(islamicCalendar);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("islamic-calendar", () => {
  moment.locale("en");

  test("parse", () => {
    const FORMAT = "YYYY-MM-DD";

    [
      {
        date: "1400-6-05",
        format: "iYYYY-iM-iDD",
        output: "1980-04-21",
      },
      {
        date: "1400-06-05",
        format: "iYYYY-iMM-iDD",
        output: "1980-04-21",
      },
      {
        date: "91-Muh-22",
        format: "iYY-iMMM-iD",
        output: "2068-03-26",
      },
      {
        date: "91-Muharram-22",
        format: "iYY-iMMMM-iD",
        output: "2068-03-26",
      },
      {
        date: "26 1981 5",
        format: "iD YYYY iM",
        output: "1981-04-01",
      },
      {
        date: "26 18 5",
        format: "iD YY iM",
        output: "2018-02-12",
      },
      {
        date: "26 1400 6",
        format: "iD iYYYY iM",
        output: "1980-05-12",
      },
      {
        date: "6 1400 26",
        format: "iM iYYYY iD",
        output: "1980-05-12",
      },
    ].forEach(({ date, format, output }) => {
      expect(Carbon.parse(date, format).format(FORMAT)).toBe(output);
    });

    let date = "1400-6-26";

    expect(Carbon.parse(date, "iYYYY-iMM-iDD", "ru").format(FORMAT)).toBe("1980-05-12");

    date = "0001-01-01";

    expect(Carbon.parse(date, "iYYYY-iMM-iDD").format(FORMAT)).toBe("622-07-19");

    date = "30000-02-02";

    expect(Carbon.parse(date, "iYYYY-iMM-iDD").format(FORMAT)).toBe("29728-05-08");

    date = "1397-08-01";

    expect(Carbon.parse(date, "iYYYY-MM-iDD").format(FORMAT)).toBe("1977-08-14");

    date = "1397-Aug-01";

    expect(Carbon.parse(date, "iYYYY-MMM-iDD").format(FORMAT)).toBe("1977-08-14");

    date = "1397-August-01";

    expect(Carbon.parse(date, "iYYYY-MMMM-iDD").format(FORMAT)).toBe("1977-08-14");

    date = "1397-01";

    expect(Carbon.parse(date, "iYYYY-iMM").format(FORMAT)).toEqual(expect.any(String));

    date = Carbon.parse().format("iYYYY/iM/iD hh:mm:ss.SSS a");

    expect(Carbon.parse(date, "iYYYY/iM/iD hh:mm:ss.SSS a").format("iYYYY/iM/iD hh:mm:ss.SSS a"))
      .toBe(date);

    date = "2018-05-02T11:12:13Z";

    expect(Carbon.parse(date).format()).toBe(moment(date).format());
  });

  test("get islamic year", () => {
    expect(Carbon.parse().year()).toBe(moment().year());
    expect(Carbon.parse().year("islamic")).toBe(moment().iYear());
  });

  test("get islamic month", () => {
    expect(Carbon.parse().month()).toBe(moment().month());
    expect(Carbon.parse().month("islamic")).toBe(moment().iMonth());
  });

  test("get islamic week", () => {
    expect(Carbon.parse().weekOfYear()).toBe(moment().week());

    expect(Carbon.parse("1980-05-17").weekOfYear("islamic")).toBe(27);

    const date = "1981-08-17";

    expect(Carbon.parse(date).weekOfYear()).toBe(moment(date).week());
    expect(Carbon.parse(date).weekOfYear("islamic")).toBe(41);
    expect(Carbon.parse(date).endOf("iMonth").weekOfYear("islamic")).toBe(43);
    expect(Carbon.parse(date).startOf("iYear").weekOfYear("islamic")).toBe(1);
    expect(Carbon.parse(date).endOf("iYear").set("iDay", 8).weekOfYear("islamic")).toBe(48);

  });

  test("get islamic day", () => {
    expect(Carbon.parse().day()).toBe(moment().date());
    expect(Carbon.parse("1439/12/18", "iYYYY/iM/iD").day("islamic")).toBe(18);
  });

  test("get islamic days in month", () => {
    const format = "iYYYY-iMM-iDD";
    let date = "1439-01-01";

    expect(Carbon.parse(date, format).daysInMonth()).toBe(30);
    expect(Carbon.parse(date, format).daysInMonth("islamic")).toBe(29);

    date = "1439-10-01";

    expect(Carbon.parse(date, format).daysInMonth("islamic")).toBe(30);

    date = "1439-12-01";

    expect(Carbon.parse(date, format).daysInMonth("islamic")).toBe(29);
  });

  test("day of year", () => {
    const date = "2018-08-30";

    expect(Carbon.parse(date).dayOfYear()).toBe(241);
    expect(Carbon.parse(date).dayOfYear("islamic")).toBe(343);
  });

  test("is leap year", () => {
    const date = "2018-08-30";

    expect(Carbon.parse(date).isLeapYear()).toBe(moment(date).isLeapYear());
    expect(Carbon.parse(date).isLeapYear("islamic")).toBe(true);
  });

  test("add", () => {
    const date = "2018-08-30";
    const format = "YYYY-MM-DD";

    expect(Carbon.parse(date).add(20, "iM").format(format)).toBe("2020-04-12");
    expect(Carbon.parse(date).add(20, "iMonth").format(format)).toBe("2020-04-12");

    expect(Carbon.parse(date).add(5, "iY").format(format)).toBe("2023-07-07");
    expect(Carbon.parse(date).add(5, "iYear").format(format)).toBe("2023-07-07");
  });

  test("set", () => {
    const date = "2018-08-30";
    const format = "YYYY-MM-DD";

    expect(Carbon.parse(date).set("iD", 3).format(format)).toBe("2018-08-15");
    expect(Carbon.parse(date).set("iDay", 3).format(format)).toBe("2018-08-15");
    expect(Carbon.parse(date).set("iDay", 500).format(format)).toBe("2019-12-25");
    expect(Carbon.parse(date).set("iM", 2).format(format)).toBe(moment(date).iMonth(2).format(format));
    expect(Carbon.parse(date).set("iMonth", 2).format(format)).toBe(moment(date).iMonth(2).format(format));
    expect(Carbon.parse(date).set("iY", 1400).format(format)).toBe(moment(date).iYear(1400).format(format));
    expect(Carbon.parse(date).set("iYear", 1400).format(format)).toBe(moment(date).iYear(1400).format(format));
  });

  test("start/end", () => {
    const date = "2018-08-30";
    const format = "YYYY-MM-DD";

    expect(Carbon.parse(date).startOf("iY").format(format)).toBe("2017-09-22");
    expect(Carbon.parse(date).startOf("iYear").format(format)).toBe("2017-09-22");

    expect(Carbon.parse(date).startOf("iM").format(format)).toBe("2018-08-13");
    expect(Carbon.parse(date).startOf("iMonth").format(format)).toBe("2018-08-13");

    expect(Carbon.parse(date).endOf("iY").format(format)).toBe("2018-09-10");
    expect(Carbon.parse(date).endOf("iYear").format(format)).toBe("2018-09-10");

    expect(Carbon.parse(date).endOf("iM").format(format)).toBe("2018-09-10");
    expect(Carbon.parse(date).endOf("iMonth").format(format)).toBe("2018-09-10");
  });

  test("format", () => {
    const date = "2018-02-17";
    let format = "iYYYY/iMM/iDD = YYYY-MM-DD";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));

    format = "iYYYY/iMM/iDD [is THIS Date] YYYY-MM-DD";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));

    format = "iM";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));

    format = "iMMM";

    expect(Carbon.parse(date).format(format)).toBe("Jum-II");

    format = "iMMMM";

    expect(Carbon.parse(date).format(format)).toBe("Jumada al-Alkhirah");

    format = "iYY";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));
  });
});
