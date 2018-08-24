import * as moment from "moment";
import * as MockDate from "mockdate";
import * as Carbon from "../src";

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

describe("Testing create new instance", () => {
  test("Now", () => {
    expect(Carbon.parse().valueOf()).toBe(moment().valueOf());
  });

  test("String 2013-02-08", () => {
    let date = "2013-01-08";

    expect(Carbon.parse(date).valueOf()).toBe(moment(date).valueOf());

    date = "2018-04-24";

    expect(Carbon.parse(date).valueOf()).toBe(moment(date).valueOf());

    date = "2018-05-02 11:12:13";

    expect(Carbon.parse(date).valueOf()).toBe(moment(date).valueOf());

    date = "2018-05-02 11:12:13.998";

    expect(Carbon.parse(date).valueOf()).toBe(moment(date).valueOf());

    date = "2018-4-1";

    expect(Carbon.parse(date).valueOf()).toBe(moment(date).valueOf()); // not recommend

    date = "2018-4-1 1:1:1:223";

    expect(Carbon.parse(date).valueOf()).toBe(moment(date).valueOf()); // not recommend

    date = "2018-01";

    expect(Carbon.parse(date).valueOf()).toBe(moment(date).valueOf()); // not recommend

    date = "2018";

    expect(Carbon.parse(date).format()).toBe(moment(date).format()); // not recommend

    date = "2018-05-02T11:12:13Z"; // should go direct to new Date() rather our regex

    expect(Carbon.parse(date).format()).toBe(moment(date).format()); // not recommend
  });

  test("String ISO 8601 date, time and zone", () => {
    const time = "2018-04-04T16:00:00.000Z";

    expect(Carbon.parse(time).valueOf()).toBe(moment(time).valueOf());
  });

  test("String Other, Null and isValid", () => {
    expect(Carbon.parse("otherString").toString().toLowerCase()).toBe(moment("otherString").toString().toLowerCase());
    expect(Carbon.parse().isValid()).toBe(true);
    expect(Carbon.parse("otherString").isValid()).toBe(false);
    expect(Carbon.parse(null).toString().toLowerCase()).toBe(moment(null).toString().toLowerCase());
  });

  test("Unix Timestamp Number (milliseconds) 1523520536000", () => {
    const timestamp = 1523520536000;

    expect(Carbon.parse(timestamp).valueOf()).toBe(moment(timestamp).valueOf());
  });

  test("String and Number 20180101", () => {
    expect(Carbon.parse(20180101).valueOf()).toBe(moment(20180101).valueOf());
    expect(Carbon.parse("20180101").valueOf()).toBe(moment("20180101").valueOf());
  });

  test("Number 0", () => {
    expect(Carbon.parse(0).valueOf()).toBe(moment(0).valueOf());
  });

  test("Clone not affect each other", () => {
    const base = Carbon.parse(20170101);
    const year = base.year();
    const another = base.set("year", year + 1);

    expect(another.unix() - base.unix()).toBe(31536000);
  });

  test("Clone with same value", () => {
    const base = Carbon.parse();
    const year = base.year();
    const newBase = base.set("year", year + 1);
    const another = newBase.clone();

    expect(newBase.toString()).toBe(another.toString());
  });

  describe("Parse with format", () => {
    const outputFormat = "YYYY-MM-DD HH:mm:ss.SSS";

    [
      {
        input: "2018/24/08 20:36:10,064",
        format: "YYYY/DD/MM HH:mm:ss,SSS",
      },
      {
        input: "18-8/24 8:51-46#164",
        format: "YY-M/D H:m-s#S",
      },
      {
        input: "2018-08-24 8 pm",
        format: "YYYY-MM-DD h A",
      },
      {
        input: "2018-08-24 8 am",
        format: "YYYY-MM-DD h a",
      },
      {
        input: "2018-08-24 8",
        format: "YYYY-MM-DD h",
      },
      {
        input: "2018-Aug-24",
        format: "YYYY-MMM-DD",
      },
      {
        input: "2018-August-24 hello 12",
        format: "YYYY-MMMM-DD [hello] HH",
      },
    ].forEach(({ input, format }) => {
      test(`(${input}) -> (${format})`, () => {
        expect(Carbon.parse(input, format).format(outputFormat))
          .toBe(moment(input, format).format(outputFormat));
      });
    });
  });
});
