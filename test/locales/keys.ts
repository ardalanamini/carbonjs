import * as fs from "fs";
import * as path from "path";
import * as Carbon from "../../src";

const localeDir = path.resolve(__dirname, "..", "..", "src", "locales");
const L = [];

// load all locales from locale dir
fs.readdirSync(localeDir)
  .forEach((file) => L.push(require(path.resolve(localeDir, file))));

describe("Testing locales", () => {
  test("Locale keys", () => {
    L.forEach((l) => {
      const {
        name,
        ordinal,
        weekdays,
        months,
        relativeTime,
        weekdaysShort,
        monthsShort,
        weekdaysMin,
      } = l;

      expect(name).toEqual(expect.any(String));
      expect(weekdays).toEqual(expect.any(Array));

      if (weekdaysShort) expect(weekdaysShort).toEqual(expect.any(Array));
      if (monthsShort) expect(monthsShort).toEqual(expect.any(Array));
      if (weekdaysMin) expect(weekdaysMin).toEqual(expect.any(Array));

      expect(months).toEqual(expect.any(Array));

      // function pass date return string or number or null
      if (ordinal) {
        expect(ordinal(1)).toEqual(expect.anything());
        expect(ordinal(3)).toEqual(expect.anything());
      }

      expect((Carbon.parse().locale(name) as any)._locale.name).toBe(name);

      if (relativeTime)
        expect(Object.keys(relativeTime).sort()).toEqual(["d", "dd", "future", "h", "hh", "m", "mm", "M", "MM",
          "past", "s", "y", "yy"]
          .sort());
    });
  });
});
