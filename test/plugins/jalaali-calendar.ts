import * as MockDate from "mockdate";
import * as moment from "moment-jalaali";
import * as Carbon from "../../src";
import * as jalaaliCalendar from "../../src/plugins/jalaali-calendar";
import "../../src/locales/ru";

// moment.loadPersian({ dialect: "persian-modern" });

Carbon.extend(jalaaliCalendar);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("jalaali-calendar", () => {
  test("parse", () => {
    const FORMAT = "YYYY-MM-DD";

    [
      {
        date: "1397-06-05",
        format: "jYYYY-jMM-jDD",
      },
      {
        date: "91-Far-22",
        format: "jYY-jMMM-jD",
      },
      {
        date: "91-Farvardin-22",
        format: "jYY-jMMMM-jD",
      },
      {
        date: "26 1981 5",
        format: "jD YYYY jM",
      },
      {
        date: "26 18 5",
        format: "jD YY jM",
      },
      {
        date: "26 1360 5",
        format: "jD jYYYY jM",
      },
      {
        date: "5 1360 26",
        format: "jM jYYYY jD",
      },
    ].forEach(({ date, format }) => {
      expect(Carbon.parse(date, format).format(FORMAT))
        .toBe(moment(date, format).format(FORMAT));
    });

    let date = "1397-Sha-01";

    expect(Carbon.parse(date, "jYYYY-jMMM-jDD", "ru").format(FORMAT)).toBe("2018-08-23");

    date = "0001-01-01";

    expect(Carbon.parse(date, "jYYYY-jMM-jDD").format(FORMAT)).toBe("622-03-22");

    date = "30000-02-02";

    expect(Carbon.parse(date, "jYYYY-jMM-jDD").format(FORMAT)).toBe("30621-01-13");

    date = "1397-08-01";

    expect(Carbon.parse(date, "jYYYY-MM-jDD").format(FORMAT)).toBe("2018-08-23");

    date = "1397-Aug-01";

    expect(Carbon.parse(date, "jYYYY-MMM-jDD").format(FORMAT)).toBe("2018-08-23");

    date = "1397-August-01";

    expect(Carbon.parse(date, "jYYYY-MMMM-jDD").format(FORMAT)).toBe("2018-08-23");

    date = "1397-01";

    expect(Carbon.parse(date, "jYYYY-jMM").format("YYYY-MM")).toBe("2018-03");

    date = Carbon.parse().format("jYYYY/jM/jD hh:mm:ss.SSS a");

    expect(Carbon.parse(date, "jYYYY/jM/jD hh:mm:ss.SSS a").format("jYYYY/jM/jD hh:mm:ss.SSS a"))
      .toBe(date);

    date = "2018-05-02T11:12:13Z";

    expect(Carbon.parse(date).format()).toBe(moment(date).format());
  });

  test("get jalaali year", () => {
    expect(Carbon.parse().year()).toBe(moment().year());
    expect(Carbon.parse().year("jalaali")).toBe(moment().jYear());
  });

  test("get jalaali month", () => {
    expect(Carbon.parse().month()).toBe(moment().month());
    expect(Carbon.parse().month("jalaali")).toBe(moment().jMonth());
  });

  test("get jalaali week", () => {
    expect(Carbon.parse().week()).toBe(moment().week());
    expect(Carbon.parse().week("jalaali")).toBe(moment().jWeek());

    const date = "1981-08-17";

    expect(Carbon.parse(date).week()).toBe(moment(date).week());
    expect(Carbon.parse(date).week("jalaali")).toBe(22);
    expect(Carbon.parse(date).startOf("jYear").week("jalaali")).toBe(1);
    expect(Carbon.parse(date).startOf("jYear").set("jDay", 8).week("jalaali")).toBe(2);
  });

  test("get jalaali day", () => {
    expect(Carbon.parse().day()).toBe(moment().date());
    expect(Carbon.parse().day("jalaali")).toBe(moment().jDate());
  });

  test("get jalaali days in month", () => {
    expect(Carbon.parse().daysInMonth()).toBe(moment().daysInMonth());

    let mom = moment();

    expect(Carbon.parse().daysInMonth("jalaali")).toBe(moment.jDaysInMonth(+mom.jYear(), +mom.jMonth()));

    const format = "jYYYY-jMM-jDD";
    let date = "1397-01-01";
    mom = moment(date, format);

    expect(Carbon.parse(date, format).daysInMonth("jalaali")).toBe(moment.jDaysInMonth(+mom.jYear(), +mom.jMonth()));

    date = "1396-07-01";
    mom = moment(date, format);

    expect(Carbon.parse(date, format).daysInMonth("jalaali")).toBe(moment.jDaysInMonth(+mom.jYear(), +mom.jMonth()));

    date = "1395-12-01";
    mom = moment(date, format);

    expect(Carbon.parse(date, format).daysInMonth("jalaali")).toBe(moment.jDaysInMonth(+mom.jYear(), +mom.jMonth()));
  });

  test("day of year", () => {
    expect(Carbon.parse().dayOfYear()).toBe(moment().dayOfYear());
    expect(Carbon.parse().dayOfYear("jalaali")).toBe(moment().jDayOfYear());
  });

  test("is leap year", () => {
    expect(Carbon.parse().isLeapYear()).toBe(moment().isLeapYear());
    expect(Carbon.parse().isLeapYear("jalaali")).toBe(moment.jIsLeapYear(+moment().format("jYYYY")));
  });

  test("add", () => {
    const format = "YYYY-MM-DD";

    expect(Carbon.parse().add(20, "jM").format(format)).toBe(moment().add(20, "jM").format(format));
    expect(Carbon.parse().add(20, "jMonth").format(format)).toBe(moment().add(20, "jMonth").format(format));
    expect(Carbon.parse().add(5, "jY").format(format)).toBe(moment().add(5, "jY").format(format));
    expect(Carbon.parse().add(5, "jYear").format(format)).toBe(moment().add(5, "jYear").format(format));
  });

  test("set", () => {
    const format = "YYYY-MM-DD";

    expect(Carbon.parse().set("jDay", 3).format(format)).toBe(moment().jDate(3).format(format));
    expect(Carbon.parse().set("jDay", 500).format(format)).toBe(moment().jDate(500).format(format));
    expect(Carbon.parse().set("jMonth", 2).format(format)).toBe(moment().jMonth(2).format(format));
    expect(Carbon.parse().set("jYear", 1390).format(format)).toBe(moment().jYear(1390).format(format));
  });

  test("start/end", () => {
    const format = "YYYY-MM-DD";

    expect(Carbon.parse().startOf("jYear").format(format)).toBe(moment().startOf("jYear").format(format));
    expect(Carbon.parse().startOf("jMonth").format(format)).toBe(moment().startOf("jMonth").format(format));
    expect(Carbon.parse().endOf("jYear").format(format)).toBe(moment().endOf("jYear").format(format));
    expect(Carbon.parse().endOf("jMonth").format(format)).toBe(moment().endOf("jMonth").format(format));
  });

  test("format", () => {
    let format = "jYYYY-jMM-jDD";

    expect(Carbon.parse().format(format)).toBe(moment().format(format));

    const date = "1981-08-17";
    format = "jYYYY/jMM/jDD = YYYY-MM-DD";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));

    format = "jYYYY/jMM/jDD [is THIS Date] YYYY-MM-DD";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));

    format = "jM";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));

    format = "jMMM";

    expect(Carbon.parse(date).format(format)).toBe("Mor");

    format = "jMMMM";

    expect(Carbon.parse(date).format(format)).toBe("Mordaad");

    format = "jYY";

    expect(Carbon.parse(date).format(format)).toBe(moment(date).format(format));
  });
});
