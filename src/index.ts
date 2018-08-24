import * as CONSTANTS from "./constants";
import * as utils from "./utils";
import * as en from "./locales/en";

let locale = "en";
const LOCALES: { [locale: string]: Carbon.Locale } = {
  en,
};

module Carbon {
  export type CarbonInput = string | number | Date | Carbon;

  export type Unit = "year" | "month" | "day" |
    "hour" | "minute" | "second" | "millisecond";

  export type CountableUnit = Carbon.Unit | "years" | "months" | "week" | "weeks" | "days" |
    "hours" | "minutes" | "seconds" | "milliseconds";

  export type ManipulationUnit = Carbon.CountableUnit | "y" | "M" | "w" | "d" | "h" | "m" | "s" | "ms";

  export type DateInputArray = [number, number, number, number, number, number, number];

  export interface Tokens {
    [token: string]: string;
  }

  export type Plugin<T = any> = (Base: typeof Carbon, options?: T) => void;

  export interface Locale {
    name: string;
    weekdays: string[];
    weekdaysShort?: string[];
    weekdaysMin?: string[];
    months: string[];
    monthsShort?: string[];
    relativeTime?: {
      future: string,
      past: string,
      s: string,
      m: string,
      mm: string,
      h: string,
      hh: string,
      d: string,
      dd: string,
      M: string,
      MM: string,
      y: string,
      yy: string,
    };
    ordinal?: (num: string | number) => string | number;
  }
}

interface Carbon {
  // isBetween
  isBetween(from: Carbon.CarbonInput, to: Carbon.CarbonInput): boolean;

  // leapYear
  isLeapYear(): boolean;

  // relativeTime
  from(input: Carbon.CarbonInput, withoutSuffix?: boolean): string;
  to(input: Carbon.CarbonInput, withoutSuffix?: boolean): string;
  fromNow(withoutSuffix?: boolean): string;
  toNow(withoutSuffix?: boolean): string;

  // week
  week(): number;
}

class Carbon {
  protected static _en = LOCALES.en;

  protected _localeName: string = locale;

  protected _date!: Date;

  protected _year!: number;
  protected _month!: number;
  protected _weekday!: number;
  protected _day!: number;
  protected _hours!: number;
  protected _minutes!: number;
  protected _seconds!: number;
  protected _milliseconds!: number;

  static isCarbon = (arg: any): arg is Carbon => arg instanceof Carbon;

  static extend = <T = any>(plugin: Carbon.Plugin<T>, options?: T) => plugin(Carbon, options);

  static locale = (preset: string | Carbon.Locale, global = true) => {
    let l = locale;

    if (typeof preset === "string") {
      if (LOCALES[preset]) l = preset;
    } else {
      const name = preset.name;

      LOCALES[name] = preset;
      l = name;
    }

    if (global) locale = l;

    return l;
  }

  static parse = (input?: Carbon.CarbonInput, format?: string) => new Carbon(input, format);

  constructor(input?: Carbon.CarbonInput, format?: string) {
    input = this._parseDate(input, format);

    this._date = input;
    this._year = input.getFullYear();
    this._month = input.getMonth();
    this._weekday = input.getDay();
    this._day = input.getDate();
    this._hours = input.getHours();
    this._minutes = input.getMinutes();
    this._seconds = input.getSeconds();
    this._milliseconds = input.getMilliseconds();
  }

  protected get _locale() {
    return LOCALES[this._localeName];
  }

  protected _parseToken(token: string, value: string, dateArray: Carbon.DateInputArray, tokens: Carbon.Tokens) {
    const locale = this._locale;

    switch (token) {
      case "YY":
        dateArray[0] = +(`${new Date().getFullYear()}`.slice(0, 2) + value);
        break;
      case "YYYY":
        dateArray[0] = +value;
        break;
      case "M":
      case "MM":
        dateArray[1] = (+value) - 1;
        break;
      case "MMM":
        dateArray[1] = utils.findShortIndex(locale.monthsShort, value, locale.months);
        break;
      case "MMMM":
        dateArray[1] = locale.months.indexOf(value);
        break;
      case "D":
      case "DD":
        dateArray[2] = +value;
        break;
      case "H":
      case "HH":
        dateArray[3] = +value;
        break;
      case "h":
      case "hh":
        const meridiem = (tokens.A || tokens.a || "am").toLowerCase();
        dateArray[3] = meridiem === "am" ? (+value) : (+value) + 12;
        break;
      case "m":
      case "mm":
        dateArray[4] = +value;
        break;
      case "s":
      case "ss":
        dateArray[5] = +value;
        break;
      case "S":
      case "SS":
      case "SSS":
        dateArray[6] = +value;
        break;
    }
  }

  private _parseDate(input?: Carbon.CarbonInput, format?: string) {
    if (Carbon.isCarbon(input)) {
      this._localeName = input._localeName;

      return input.toDate();
    }

    // Treat null as an invalid date
    if (input === null) return new Date(NaN);

    if (input === undefined) return new Date();

    if (typeof input === "string") {
      if (format) {
        const dateArray: Carbon.DateInputArray = [0, 0, 0, 0, 0, 0, 0];

        const tokens: Carbon.Tokens = {};

        let match;
        // tslint:disable-next-line:no-conditional-assignment
        while (match = CONSTANTS.PARSE_REGEX.exec(format)) {
          const token = match[0];

          if (/^\[.*\]$/.test(token)) {
            input = input.slice(token.length - 1).replace(/^\W+/, "");

            continue;
          }

          const value: string = (/\w+/.exec(input) as any)[0];

          tokens[token] = value;

          input = input.slice(value.length).replace(/^\W+/, "");
        }

        Object.keys(tokens)
          .forEach((token) => this._parseToken(token, tokens[token], dateArray, tokens));

        return new Date(...dateArray);
      }

      // looking for a better way
      if (/.*[^Z]$/i.test(input)) {
        const reg = input.match(CONSTANTS.REGEX_PARSE);

        if (reg)
          // 2018-08-08 or 20180808
          return new Date(reg[1] as any, (reg[2] as any) - 1, reg[3] || 1 as any,
            reg[5] || 0 as any, reg[6] || 0 as any, reg[7] || 0 as any, reg[8] || 0 as any
          );

      }
    }

    return new Date(input);
  }

  private _clone(input?: Carbon.CarbonInput) {
    const cloned = Carbon.parse(input);

    cloned._localeName = this._localeName;

    return cloned;
  }

  private _compare(input?: Carbon.CarbonInput) {
    return this.valueOf() - new Carbon(input).valueOf();
  }

  private _edge(unit: Carbon.CountableUnit, start: boolean = true) {
    unit = utils.prettyUnit(unit);

    const instanceFactory = (day: number, month: number): Carbon => {
      const ins = this._clone(new Date(this._year, month, day));

      return start ? ins : ins.endOf(CONSTANTS.DAY);
    };

    const instanceFactorySet = (method: string, slice: number) => {
      const argumentStart = [0, 0, 0, 0];
      const argumentEnd = [23, 59, 59, 999];
      const date = this.toDate();

      return this._clone((date as any)[method].apply(
        date,
        start ? argumentStart.slice(slice) : argumentEnd.slice(slice)
      ));
    };

    switch (unit) {
      case CONSTANTS.YEAR:
        return start ? instanceFactory(1, 0) :
          instanceFactory(31, 11);
      case CONSTANTS.MONTH:
        return start ? instanceFactory(1, this._month) :
          instanceFactory(0, this._month + 1);
      case CONSTANTS.WEEK:
        return start ? instanceFactory(this._day - this._weekday, this._month) :
          instanceFactory(this._day + (6 - this._weekday), this._month);
      case CONSTANTS.DAY:
        return instanceFactorySet("setHours", 0);
      case CONSTANTS.HOUR:
        return instanceFactorySet("setMinutes", 1);
      case CONSTANTS.MINUTE:
        return instanceFactorySet("setSeconds", 2);
      case CONSTANTS.SECOND:
        return instanceFactorySet("setMilliseconds", 3);
      default:
        return this.clone();
    }
  }

  locale(locale: string | Carbon.Locale) {
    const cloned = this.clone();

    cloned._localeName = Carbon.locale(locale, false);

    return cloned;
  }

  isValid() {
    return this._date.toString() !== "Invalid Date";
  }

  isSame(input?: Carbon.CarbonInput) {
    return this._compare(input) === 0;
  }

  isBefore(input?: Carbon.CarbonInput) {
    return this._compare(input) < 0;
  }

  isAfter(input?: Carbon.CarbonInput) {
    return this._compare(input) > 0;
  }

  year() {
    return this._year;
  }

  month() {
    return this._month;
  }

  weekday() {
    return this._weekday;
  }

  day() {
    return this._day;
  }

  hour() {
    return this._hours;
  }

  minute() {
    return this._minutes;
  }

  second() {
    return this._seconds;
  }

  millisecond() {
    return this._milliseconds;
  }

  utcOffset() {
    return this._date.getTimezoneOffset();
  }

  valueOf() {
    return this._date.getTime();
  }

  startOf(unit: Carbon.CountableUnit) {
    return this._edge(unit);
  }

  endOf(unit: Carbon.CountableUnit) {
    return this._edge(unit, false);
  }

  daysInMonth() {
    return this.endOf(CONSTANTS.MONTH).day();
  }

  unix() {
    return Math.floor(this.valueOf() / 1000);
  }

  set(unit: Carbon.Unit | "weekday", value: number) {
    const date = utils.cloneDate(this._date);

    switch (unit) {
      case CONSTANTS.YEAR:
        date.setFullYear(value);
        break;
      case CONSTANTS.MONTH:
        date.setMonth(value);
        break;
      case CONSTANTS.DAY:
        date.setDate(value);
        break;
      case CONSTANTS.WEEKDAY:
        date.setDate(this._day + (value - this._weekday));
        break;
      case CONSTANTS.HOUR:
        date.setHours(value);
        break;
      case CONSTANTS.MINUTE:
        date.setMinutes(value);
        break;
      case CONSTANTS.SECOND:
        date.setSeconds(value);
        break;
      case CONSTANTS.MILLISECOND:
        date.setMilliseconds(value);
        break;
      default:
        break;
    }

    return this._clone(date);
  }

  add(value: string | number, unit: Carbon.ManipulationUnit) {
    value = +value;
    unit = utils.prettyUnit(unit);

    const instanceFactory = (unit: Carbon.Unit | "weekday", num: number) => {
      const date = this.set(CONSTANTS.DAY, 1).set(unit, (value as number) + num);

      return date.set(CONSTANTS.DAY, Math.min(this._day, date.daysInMonth()));
    };

    if (unit === CONSTANTS.YEAR) return instanceFactory(unit, this._year);

    if (unit === CONSTANTS.MONTH) return instanceFactory(unit, this._month);

    let base;
    switch (unit) {
      case CONSTANTS.WEEK:
        value *= 7;
        base = this._day;
        unit = "day" as any;
        break;
      case CONSTANTS.DAY:
        unit = "day" as any;
        base = this._day;
        break;
      case CONSTANTS.HOUR:
        base = this._hours;
        break;
      case CONSTANTS.MINUTE:
        base = this._minutes;
        break;
      case CONSTANTS.SECOND:
        base = this._seconds;
        break;
      default: // milliseconds
        base = this._milliseconds;
        break;
    }

    return this.set(unit as any, base + value);
  }

  subtract(value: string | number, unit: Carbon.ManipulationUnit) {
    return this.add(-value, unit);
  }

  format(format: string = CONSTANTS.FORMAT_DEFAULT) {
    const zoneStr = utils.padZoneStr(this._date.getTimezoneOffset());
    const locale = this._locale;
    const { weekdays, months } = locale;

    return format.replace(CONSTANTS.REGEX_FORMAT, (match) => {
      if (match.indexOf("[") > -1) return match.replace(/\[|\]/g, "");

      switch (match) {
        case "YY":
          return `${this._year}`.slice(-2);
        case "YYYY":
          return `${this._year}`;
        case "M":
          return `${this._month + 1}`;
        case "MM":
          return utils.padStart(this._month + 1, 2, "0");
        case "MMM":
          return utils.getShort(locale.monthsShort, this._month, months, 3);
        case "MMMM":
          return months[this._month];
        case "D":
          return `${this._day}`;
        case "DD":
          return utils.padStart(this._day, 2, "0");
        case "d":
          return `${this._weekday}`;
        case "dd":
          return utils.getShort(locale.weekdaysMin, this._weekday, weekdays, 2);
        case "ddd":
          return utils.getShort(locale.weekdaysShort, this._weekday, weekdays, 3);
        case "dddd":
          return weekdays[this._weekday];
        case "H":
          return `${this._hours}`;
        case "HH":
          return utils.padStart(this._hours, 2, "0");
        case "h":
        case "hh":
          if (this._hours === 0) return 12;
          return utils.padStart(this._hours < 13 ? this._hours : this._hours - 12, match === "hh" ? 2 : 1, "0");
        case "a":
          return this._hours < 12 ? "am" : "pm";
        case "A":
          return this._hours < 12 ? "AM" : "PM";
        case "m":
          return `${this._minutes}`;
        case "mm":
          return utils.padStart(this._minutes, 2, "0");
        case "s":
          return `${this._seconds}`;
        case "ss":
          return utils.padStart(this._seconds, 2, "0");
        case "SSS":
          return utils.padStart(this._milliseconds, 3, "0");
        case "Z":
          return zoneStr;
        default: // "ZZ"
          return zoneStr.replace(":", "");
      }
    });
  }

  diff(date: Carbon.CarbonInput, unit?: Carbon.ManipulationUnit | "quarter" | "quarters", float = false) {
    date = this._clone(date);
    unit = utils.prettyUnit(unit);

    const diff = this.valueOf() - date.valueOf();
    const zoneDelta = (this.utcOffset() - date.utcOffset()) * 6e4;

    let result = utils.monthDiff(this, date);

    switch (unit) {
      case CONSTANTS.YEAR:
        result /= 12;
        break;
      case CONSTANTS.MONTH:
        break;
      case CONSTANTS.QUARTER:
        result /= 3;
        break;
      case CONSTANTS.WEEK:
        result = (diff - zoneDelta) / CONSTANTS.MILLISECONDS_A_WEEK;
        break;
      case CONSTANTS.DAY:
        result = (diff - zoneDelta) / CONSTANTS.MILLISECONDS_A_DAY;
        break;
      case CONSTANTS.HOUR:
        result = diff / CONSTANTS.MILLISECONDS_A_HOUR;
        break;
      case CONSTANTS.MINUTE:
        result = diff / CONSTANTS.MILLISECONDS_A_MINUTE;
        break;
      case CONSTANTS.SECOND:
        result = diff / CONSTANTS.MILLISECONDS_A_SECOND;
        break;
      default: // milliseconds
        result = diff;
        break;
    }

    return float ? result : utils.absFloor(result);
  }

  clone() {
    return this._clone(this);
  }

  toDate() {
    return new Date(this._date);
  }

  toArray() {
    return [
      this._year,
      this._month,
      this._day,
      this._hours,
      this._minutes,
      this._seconds,
      this._milliseconds,
    ];
  }

  toObject() {
    return {
      years: this._year,
      months: this._month,
      date: this._day,
      hours: this._hours,
      minutes: this._minutes,
      seconds: this._seconds,
      milliseconds: this._milliseconds,
    };
  }

  toISOString() {
    return this.toDate().toISOString();
  }

  toJSON() {
    return this.toISOString();
  }

  toString() {
    return this._date.toUTCString();
  }
}

export = Carbon;
