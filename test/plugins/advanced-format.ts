import * as MockDate from "mockdate";
import * as moment from "moment";
import * as Carbon from "../../src";
import * as advancedFormat from "../../src/plugins/advanced-format";

Carbon.extend(advancedFormat);

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

test("Format empty string", () => {
  expect(Carbon.parse().format()).toBe(moment().format());
});

test("Format Quarter Q", () => {
  expect(Carbon.parse().format("Q")).toBe(moment().format("Q"));
});

test("Format Timestamp X x", () => {
  expect(Carbon.parse().format("X")).toBe(moment().format("X"));
  expect(Carbon.parse().format("x")).toBe(moment().format("x"));
});

test("Format Day of Month Do 1 - 31", () => {
  expect(Carbon.parse().format("Do")).toBe(moment().format("Do"));

  let date = "2018-05-02 00:00:00.000";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));

  date = "2018-05-01 00:00:00.000";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));

  date = "2018-05-03 00:00:00.000";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));

  date = "2018-05-04 00:00:00.000";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));

  date = "2018-05-11";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));

  date = "2018-05-12";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));

  date = "2018-05-13";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));

  date = "2018-05-22";

  expect(Carbon.parse(date).format("Do")).toBe(moment(date).format("Do"));
});

test("Format Hour k kk 24-hour 1 - 24", () => {
  expect(Carbon.parse().format("k")).toBe(moment().format("k"));
  expect(Carbon.parse().format("kk")).toBe(moment().format("kk"));

  let date = "2018-05-02 00:00:00.000";

  expect(Carbon.parse(date).format("k")).toBe(moment(date).format("k"));

  date = "2018-05-02 01:00:00.000";

  expect(Carbon.parse(date).format("k")).toBe(moment(date).format("k"));
});
