import * as MockDate from "mockdate";
import * as Carbon from "../src";
import * as es from "../src/locales/es";

beforeEach(() => MockDate.set(new Date()));

afterEach(() => MockDate.reset());

const format = "dddd D, MMMM";

describe("Testing locale method", () => {
  test("Uses spanish locale through constructor", () => { // not recommend
    expect(Carbon.parse("2018-4-28").locale(es)
      .format(format))
      .toBe("Sábado 28, Abril");
  });

  test("set locale for one instance only", () => {
    Carbon.locale("fa");

    expect(Carbon.parse("2018-4-28")
      .format(format))
      .toBe("Saturday 28, April");

    expect(Carbon.parse("2018-4-28")
      .locale(es).format(format))
      .toBe("Sábado 28, Abril");

    expect(Carbon.parse("2018-4-28")
      .format(format))
      .toBe("Saturday 28, April");
  });

  test("set global locale", () => {
    Carbon.locale("en");
    expect(Carbon.parse("2018-4-28").format(format))
      .toBe("Saturday 28, April");
    Carbon.locale(es);
    expect(Carbon.parse("2018-4-28").format(format))
      .toBe("Sábado 28, Abril");
    Carbon.locale("en");
    expect(Carbon.parse("2018-4-28").format(format))
      .toBe("Saturday 28, April");
  });

  test("immutable instance locale", () => {
    Carbon.locale("en");
    const origin = Carbon.parse("2018-4-28");
    expect(origin.format(format))
      .toBe("Saturday 28, April");
    expect(origin.locale("es").format(format))
      .toBe("Sábado 28, Abril");
    const changed = origin.locale("es");
    expect(changed.format(format))
      .toBe("Sábado 28, Abril");
    expect(origin.format(format))
      .toBe("Saturday 28, April");
  });

  test("User custom locale", () => {
    expect(Carbon.parse("2018-4-28")
      .locale({
        name: "xx",
        weekdays: Array(7).fill("week"),
        months: Array(12).fill("month"),
      })
      .format(format))
      .toBe("week 28, month");
  });

  describe("Instance locale inheritance", () => {
    const carbon = Carbon.parse("2018-4-28").locale(es);

    test("Clone", () => {
      expect(carbon.clone().format(format))
        .toBe("Sábado 28, Abril");
      expect(Carbon.parse(carbon).format(format))
        .toBe("Sábado 28, Abril");
    });

    test("StartOf EndOf", () => {
      expect(carbon.startOf("year").format(format))
        .toBe("Lunes 1, Enero");
      expect(carbon.endOf("day").format(format))
        .toBe("Sábado 28, Abril");
    });

    test("Set", () => {
      expect(carbon.set("year", 2017).format(format))
        .toBe("Viernes 28, Abril");
    });

    test("Add", () => {
      expect(carbon.add(1, "year").format(format))
        .toBe("Domingo 28, Abril");
      expect(carbon.add(1, "month").format(format))
        .toBe("Lunes 28, Mayo");
      expect(carbon.add(1, "minute").format(format))
        .toBe("Sábado 28, Abril");
    });
  });
});
