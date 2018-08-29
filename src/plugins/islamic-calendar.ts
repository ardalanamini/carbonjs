import * as Carbon from "../index";
import { FORMAT_DEFAULT } from "../constants";
import * as utils from "../utils";
import * as astro from "./utils/astro";
import * as calendars from "./utils/calendars";
import * as leapYearPlugin from "./leap-year";
import * as dayOfYearPlugin from "./day-of-year";
import * as weekPlugin from "./week";

//  ISLAMIC_TO_JD  --  Determine Julian day from Islamic date
const ISLAMIC_EPOCH = 1948439.5;

const islamic_to_jd = (year: number, month: number, day: number) => (day +
  Math.ceil(29.5 * (month - 1)) +
  (year - 1) * 354 +
  Math.floor((3 + (11 * year)) / 30) +
  ISLAMIC_EPOCH) - 1;

//  JD_TO_ISLAMIC  --  Calculate Islamic date from Julian day
const jd_to_islamic = (jd: number) => {
  jd = Math.floor(jd) + 0.5;

  const year = Math.floor(((30 * (jd - ISLAMIC_EPOCH)) + 10646) / 10631);
  const month = Math.min(12, Math.ceil((jd - (29 + islamic_to_jd(year, 1, 1))) / 29.5) + 1);
  const day = (jd - islamic_to_jd(year, month, 1)) + 1;

  return [year, month, day];
};

const gregorian_to_islamic = (date: Date) =>
  jd_to_islamic(calendars.gregorian_to_jd(date.getFullYear(), date.getMonth() + 1, date.getDate()));

const islamic_to_gregorian = (year: number, month: number, day: number) =>
  calendars.jd_to_gregorian(islamic_to_jd(year, month, day) + 1);

// -------------------- Plugin --------------------

const CALENDAR = "islamic";
const MONTHS: { [locale: string]: string[] } = {
  // tslint:disable-next-line:max-line-length
  en: "Muharram_Safar_Rabi' al-Awwal_Rabi' al-Thani_Jumada al-Ula_Jumada al-Alkhirah_Rajab_Sha’ban_Ramadhan_Shawwal_Thul-Qi’dah_Thul-Hijjah"
    .split("_"),
  // tslint:disable-next-line:max-line-length
  ar: "ٱلْمُحَرَّم_صَفَر_رَبِيع ٱلْأَوَّل_رَبِيع ٱلْآخِر_جُمَادَىٰ ٱلْأُولَىٰ_جُمَادَىٰ ٱلْآخِرَة_رَجَب_شَعْبَان_رَمَضَان_شَوَّال_ذُو ٱلْقَعْدَة_ذُو ٱلْحِجَّة".split("_"),
};

const getMonths = (locale: string) => MONTHS[locale] || MONTHS.en;

const parse = (tokens: Carbon.Tokens, locale: Carbon.Locale) => {
  const now = utils.newDate();

  const year = +(tokens.YYYY || (tokens.YY ? (`${now.getFullYear()}`.slice(0, 2) + tokens.YY) : now.getFullYear()));

  let month: string | number = tokens.MM || tokens.M;
  if (month) month = (+month) - 1;
  else {
    const months = locale.months;
    const monthsShort = locale.monthsShort || months.map((month) => month.slice(0, 3));

    if (tokens.MMMM) month = months.indexOf(tokens.MMMM);
    else if (tokens.MMM) month = monthsShort.indexOf(tokens.MMM);
    else month = now.getMonth();
  }

  const day = +(tokens.DD || tokens.D || now.getDate());

  const iNow = gregorian_to_islamic(utils.newDate(year, month, day));

  const iYear = +(tokens.iYYYY || (tokens.iYY ? (`${iNow[0]}`.slice(0, 2) + tokens.iYY) : iNow[0]));

  let iMonth: string | number = tokens.iMM || tokens.iM;
  if (iMonth) iMonth = (+iMonth) - 1;
  else {
    const months = getMonths(locale.name);

    if (tokens.iMMMM) iMonth = months.indexOf(tokens.iMMMM);
    else if (tokens.iMMM) iMonth = months.map((month) => month.slice(0, 3)).indexOf(tokens.iMMM);
    else iMonth = iNow[1] - 1;
  }

  const iDay = +(tokens.iDD || tokens.iD || iNow[2]);

  const gregorian = islamic_to_gregorian(iYear, iMonth + 1, iDay);

  gregorian[1] -= 1;

  return gregorian;
};

function islamic_set(this: Carbon, index: number, value: number) {
  const islamic = gregorian_to_islamic(this._date);

  if (index === 1) {
    islamic[0] += Math.floor(value / 12);
    islamic[1] = (value % 12) + 1;
  } else islamic[index] = value;

  const gregorian = islamic_to_gregorian.apply(0, islamic);

  return this.set("year", gregorian[0]).set("month", gregorian[1] - 1).set("day", gregorian[2]);
}

module islamicCalendar { }

const islamicCalendar: Carbon.Plugin = (Base) => {
  Base.extend(dayOfYearPlugin);
  Base.extend(leapYearPlugin);
  Base.extend(weekPlugin);

  const proto = Base.prototype;

  const _parseToken = (proto as any)._parseToken;
  (proto as any)._parseToken = function (
    this: Carbon, token: string, value: string, dateArray: Carbon.DateInputArray, tokens: Carbon.Tokens
  ) {
    const parsed = parse(tokens, this._locale);

    switch (token) {
      case "iYY":
      case "iYYYY":
        dateArray[0] = parsed[0];
        dateArray[1] = dateArray[1] || parsed[1];
        dateArray[2] = dateArray[2] || parsed[2];
        break;
      case "iM":
      case "iMM":
      case "iMMM":
      case "iMMMM":
        dateArray[0] = dateArray[0] || parsed[0];
        dateArray[1] = parsed[1];
        dateArray[2] = dateArray[2] || parsed[2];
        break;
      case "iD":
      case "iDD":
        dateArray[0] = dateArray[0] || parsed[0];
        dateArray[1] = dateArray[1] || parsed[1];
        dateArray[2] = parsed[2];
        break;
      default:
        _parseToken.call(this, token, value, dateArray, tokens);
    }
  };

  const year = proto.year;
  proto.year = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) return gregorian_to_islamic(this._date)[0];

    return year.call(this, calendar);
  };

  const month = proto.month;
  proto.month = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) return gregorian_to_islamic(this._date)[1] - 1;

    return month.call(this, calendar);
  };

  const day = proto.day;
  proto.day = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) return gregorian_to_islamic(this._date)[2];

    return day.call(this, calendar);
  };

  const daysInMonth = proto.daysInMonth;
  proto.daysInMonth = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) return this.endOf("iMonth").diff(this.startOf("iMonth"), "day");

    return daysInMonth.call(this, calendar);
  };

  const add = proto.add;
  proto.add = function (value: string | number, unit: Carbon.ManipulationUnit | "iY" | "iM" | "iYear" | "iMonth") {
    switch (unit) {
      case "iY":
      case "iYear":
        return this.set("iYear", this.year(CALENDAR) + (+value));
      case "iM":
      case "iMonth":
        return this.set("iMonth", this.month(CALENDAR) + (+value));
      default:
        return add.call(this, value, unit);
    }
  };

  const set = proto.set;
  proto.set = function (
    this: Carbon,
    unit: Carbon.Unit | "weekday" | "iY" | "iM" | "jD" | "iYear" | "iMonth" | "iDay",
    value: number) {
    switch (unit) {
      case "iY":
      case "iYear":
        return islamic_set.call(this, 0, value);
      case "iM":
      case "iMonth":
        return islamic_set.call(this, 1, value);
      case "jD":
      case "iDay":
        return islamic_set.call(this, 2, value);
      default:
        return set.call(this, unit, value);
    }
  };

  const startOf = proto.startOf;
  proto.startOf = function (this: Carbon, unit: Carbon.CountableUnit | "iY" | "iM" | "iYear" | "iMonth") {
    let carbon = this;

    switch (unit) {
      case "iY":
      case "iYear":
        carbon = carbon.set("iDay", 1).set("iMonth", 0);
      case "iM":
      case "iMonth":
        return carbon.set("iDay", 1).startOf("day");
      default:
        return startOf.call(carbon, unit);
    }
  };

  const endOf = proto.endOf;
  proto.endOf = function (this: Carbon, unit: Carbon.CountableUnit | "iY" | "iM" | "iYear" | "iMonth") {
    let carbon = this;

    switch (unit) {
      case "iY":
      case "iYear":
        carbon = carbon.set("iDay", 1).set("iMonth", 11);
      case "iM":
      case "iMonth":
        return carbon.set("iDay", carbon.daysInMonth(CALENDAR)).endOf("day");
      default:
        return endOf.call(carbon, unit);
    }
  };

  const dayOfYear = proto.dayOfYear;
  proto.dayOfYear = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) {
      const persianCalendar = gregorian_to_islamic(this._date);

      const year = persianCalendar[0];

      return islamic_to_jd(year, persianCalendar[1], persianCalendar[2]) - islamic_to_jd(year, 1, 1) + 1;
    }

    return dayOfYear.call(this, calendar);
  };

  const isLeapYear = proto.isLeapYear;
  proto.isLeapYear = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) return (((this.year(CALENDAR) * 11) + 14) % 30) < 11;

    return isLeapYear.call(this, calendar);
  };

  const week = proto.week;
  proto.week = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) {
      let daysToDayOfWeek = 12 - this._weekday;

      if (daysToDayOfWeek > 6) daysToDayOfWeek -= 7;

      return Math.ceil(this.add(daysToDayOfWeek, "d").dayOfYear(CALENDAR) / 7);
    }

    return week.call(this, calendar);
  };

  const format = proto.format;
  proto.format = function (this: Carbon, formatStr = FORMAT_DEFAULT) {
    const result = formatStr.replace(/\[.*?\]|iYYYY|iYY|iM{1,4}|iDD?/g, (match) => {
      if (match.indexOf("[") > -1) return match;
      let result = "";

      switch (match) {
        case "iYY":
          result = `${this.year(CALENDAR)}`.slice(2);
          break;
        case "iYYYY":
          result = `${this.year(CALENDAR)}`;
          break;
        case "iM":
        case "iMM":
          result = utils.padStart(`${this.month(CALENDAR) + 1}`, match === "iM" ? 1 : 2, "0");
          break;
        case "iMMM":
          result = getMonths(this._localeName)[this.month(CALENDAR)].slice(0, 3);
          break;
        case "iMMMM":
          result = getMonths(this._localeName)[this.month(CALENDAR)];
          break;
        case "iD":
        default: // iDD
          result = utils.padStart(`${this.day(CALENDAR)}`, match === "iD" ? 1 : 2, "0");
      }

      return `[${result}]`;
    });

    return format.call(this, result);
  };
};

export = islamicCalendar;
