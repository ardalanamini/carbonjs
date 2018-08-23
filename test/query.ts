import * as moment from "moment";
import * as MockDate from "mockdate";
import * as Carbon from "../src";

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

const testArr = [Carbon.parse, moment];

describe("Is Before Is After Is Same", () => {
  test("Compare to Carbon object", () => {
    testArr.forEach((instance: any) => {
      const dayA = instance();
      const dayB = dayA.clone().add(1, "day");
      const dayC = dayA.clone().subtract(1, "day");

      expect(dayC.isBefore(dayA)).toBe(true);
      expect(dayA.isSame(instance())).toBe(true);
      expect(dayB.isAfter(dayA)).toBe(true);
      expect(dayA.isSame()).toBe(true);
      expect(dayB.isAfter()).toBe(true);
      expect(dayC.isBefore()).toBe(true);
    });
  });

  test("No value", () => {
    testArr.forEach((instance: any) => {
      const dayA = instance();
      const dayB = dayA.clone().add(1, "day");
      const dayC = dayA.clone().subtract(1, "day");

      expect(dayA.isSame()).toBe(true);
      expect(dayB.isAfter()).toBe(true);
      expect(dayC.isBefore()).toBe(true);
    });
  });

  test("With string", () => {
    testArr.forEach((instance: any) => {
      const dayD = instance();

      expect(dayD.isSame("20180101")).toBe(false);
      expect(dayD.isAfter("20180101")).toBe(true);
      expect(dayD.isBefore("20180101")).toBe(false);
    });
  });
});
