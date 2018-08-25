import * as Carbon from "./index";
import * as CONSTANTS from "./constants";

export const padStart = (str: string | number, length: number, pad: string) => {
  str = `${str}`;

  if (!str || str.length >= length) return str;

  return `${Array((length + 1) - str.length).join(pad)}${str}`;
};

export const padZoneStr = (negMinutes: number) => {
  const minutes = Math.abs(negMinutes);
  const hourOffset = Math.floor(minutes / 60);
  const minuteOffset = minutes % 60;

  return `${negMinutes <= 0 ? "+" : "-"}${padStart(hourOffset, 2, "0")}:${padStart(minuteOffset, 2, "0")}`;
};

export const prettyUnit = (unit: string = "") => {
  const special: any = {
    y: CONSTANTS.YEAR,
    M: CONSTANTS.MONTH,
    w: CONSTANTS.WEEK,
    d: CONSTANTS.DAY,
    h: CONSTANTS.HOUR,
    m: CONSTANTS.MINUTE,
    s: CONSTANTS.SECOND,
    ms: CONSTANTS.MILLISECOND,
  };

  return special[unit] || unit.toLowerCase().replace(/s$/, "");
};

export const monthDiff = (a: Carbon, b: Carbon) => {
  // function from moment.js in order to keep the same result
  const wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month());
  const anchor = a.add(wholeMonthDiff, "months").valueOf();
  const c = (b.valueOf() - anchor) < 0;
  const anchor2 = a.add(wholeMonthDiff + (c ? -1 : 1), "months").valueOf();

  return -(wholeMonthDiff +
    ((b.valueOf() - anchor) / (
      c ?
        (anchor - anchor2) :
        (anchor2 - anchor))
    )
  );
};

export const getShort = (arr: any, index: number, full: any[], length: number) =>
  (arr && arr[index]) || full[index].substr(0, length);

export const findShortIndex = (arr: any, short: string, full: any[]) =>
  (arr && arr.indexOf(short)) || full.findIndex((f) => f.indexOf(short) === 0);

export const absFloor = (num: number) => num < 0 ? (Math.ceil(num) || 0) : Math.floor(num);

// better minifying
export const newDate = (...args: any[]): Date => new (Date as any)(...args);
