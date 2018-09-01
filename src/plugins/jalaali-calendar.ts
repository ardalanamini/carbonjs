import * as Carbon from "../index";
import { FORMAT_DEFAULT } from "../constants";
import * as utils from "../utils";
import * as astro from "./utils/astro";
import * as calendars from "./utils/calendars";
import * as leapYearPlugin from "./leap-year";
import * as dayOfYearPlugin from "./day-of-year";
import * as weekOfYearPlugin from "./week-of-year";

const PERSIAN_EPOCH = 1948320.5;

/**
 * Calculate Persian date from Julian day
 */
const jd_to_persian = (jd: number) => {
  jd = Math.floor(jd) + 0.5;

  const depoch = jd - persian_to_jd(475, 1, 1);
  const cycle = Math.floor(depoch / 1029983);
  const cyear = astro.mod(depoch, 1029983);

  let ycycle;
  // if (cyear === 1029982) ycycle = 2820;
  // else {
  const aux1 = Math.floor(cyear / 366);
  const aux2 = astro.mod(cyear, 366);
  ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
    aux1 + 1;
  // }

  const year = ycycle + (2820 * cycle) + 474;

  // let year = ycycle + (2820 * cycle) + 474;

  // if (year <= 0) year--;

  const yday = (jd - persian_to_jd(year, 1, 1)) + 1;
  const month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
  const day = Math.floor(jd - persian_to_jd(year, month, 1)) + 1;

  return [year, month, day];
};

/**
 * Determine Julian day and fraction of the
 * March equinox at the Tehran meridian in a given Gregorian year.
 */
const tehran_equinox = (year: number) => {
  //  March equinox in dynamical time
  const equJED = astro.equinox(year, 0);

  //  Correct for delta T to obtain Universal time
  const equJD = equJED - (astro.deltat(year) / (24 * 60 * 60));

  //  Apply the equation of time to yield the apparent time at Greenwich
  const equAPP = equJD + astro.equationOfTime(equJED);

  /*  Finally, we must correct for the constant difference between
      the Greenwich meridian and the time zone standard for
      Iran Standard time, 52�30' to the East.  */

  const dtTehran = (52 + (30 / 60.0) + (0 / (60.0 * 60.0))) / 360;

  return equAPP + dtTehran;
};

/**
 * Calculate Julian day during which the
 * March equinox, reckoned from the Tehran meridian, occurred for a given Gregorian year.
 */
const tehran_equinox_jd = (year: number) => Math.floor(tehran_equinox(year));

/**
 * Determine the year in the Persian
 * astronomical calendar in which a
 * given Julian day falls.  Returns an
 * array of two elements:
 *  [0] Persian year
 *  [1] Julian day number containing equinox for this year.
 */
const persian_year = (jd: number) => {
  let guess = calendars.jd_to_gregorian(jd)[0] - 2;

  let lasteq = tehran_equinox_jd(guess);
  // while (lasteq > jd) {
  //   guess--;
  //   lasteq = tehran_equinox_jd(guess);
  // }

  let nexteq = lasteq - 1;

  while (!((lasteq <= jd) && (jd < nexteq))) {
    lasteq = nexteq;
    guess++;
    nexteq = tehran_equinox_jd(guess);
  }

  const adr = Math.round((lasteq - PERSIAN_EPOCH) / astro.TropicalYear) + 1;

  return [adr, lasteq];
};

/**
 * Obtain Julian day from a given Persian astronomical calendar date.
 */
const persian_to_jd = (year: number, month: number, day: number) => {
  let guess = (PERSIAN_EPOCH - 1) + (astro.TropicalYear * ((year - 1) - 1));
  let adr = [year - 1, 0];

  while (adr[0] < year) {
    adr = persian_year(guess);
    guess = adr[1] + (astro.TropicalYear + 2);
  }

  const equinox = adr[1];

  return equinox +
    ((month <= 7) ?
      ((month - 1) * 31) :
      (((month - 1) * 30) + 6)
    ) +
    (day - 1);
};

const gregorian_to_persian = (date: Date) =>
  jd_to_persian(calendars.gregorian_to_jd(date.getFullYear(), date.getMonth() + 1, date.getDate()));

const persian_to_gregorian = (year: number, month: number, day: number) =>
  calendars.jd_to_gregorian(persian_to_jd(year, month, day) + 1);

// -------------------- Plugin --------------------

const CALENDAR = "jalaali";
const MONTHS: { [locale: string]: string[] } = {
  en: "Farvardin_Ordibehesht_Khordaad_Tir_Mordaad_Shahrivar_Mehr_Aabaan_Aazar_Dey_Bahman_Esfand".split("_"),
  fa: "فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند".split("_"),
};

const getMonths = (locale: string) => (MONTHS[locale] || MONTHS.en);

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

  const jNow = gregorian_to_persian(utils.newDate(year, month, day));

  const jYear = +(tokens.jYYYY || (tokens.jYY ? (`${jNow[0]}`.slice(0, 2) + tokens.jYY) : jNow[0]));

  let jMonth: string | number = tokens.jMM || tokens.jM;
  if (jMonth) jMonth = (+jMonth) - 1;
  else {
    const months = getMonths(locale.name);

    if (tokens.jMMMM) jMonth = months.indexOf(tokens.jMMMM);
    else if (tokens.jMMM) jMonth = months.map((month) => month.slice(0, 3)).indexOf(tokens.jMMM);
    else jMonth = jNow[1] - 1;
  }

  const jDay = +(tokens.jDD || tokens.jD || jNow[2]);

  const gregorian = persian_to_gregorian(jYear, jMonth + 1, jDay);

  gregorian[1] -= 1;

  return gregorian;
};

function jalaali_set(this: Carbon, index: number, value: number) {
  const jalaali = gregorian_to_persian(this._date);

  if (index === 1) {
    jalaali[0] += Math.floor(value / 12);
    jalaali[1] = (value % 12) + 1;
  } else jalaali[index] = value;

  const gregorian = persian_to_gregorian.apply(0, jalaali);

  return this
    .set("d", 1)
    .set("y", gregorian[0])
    .set("M", gregorian[1] - 1)
    .set("d", gregorian[2]);
}

module jalaaliCalendar { }

const jalaaliCalendar: Carbon.Plugin = (Base) => {
  Base.extend(dayOfYearPlugin);
  Base.extend(leapYearPlugin);
  Base.extend(weekOfYearPlugin);

  const proto = Base.prototype;

  const _parseToken = (proto as any)._parseToken;
  (proto as any)._parseToken = function (
    this: Carbon, token: string, value: string, dateArray: Carbon.DateInputArray, tokens: Carbon.Tokens
  ) {
    const parsed = parse(tokens, this._locale);

    switch (token) {
      case "jYY":
      case "jYYYY":
        dateArray[0] = parsed[0];
        dateArray[1] = dateArray[1] || parsed[1];
        dateArray[2] = dateArray[2] || parsed[2];
        break;
      case "jM":
      case "jMM":
      case "jMMM":
      case "jMMMM":
        dateArray[0] = dateArray[0] || parsed[0];
        dateArray[1] = parsed[1];
        dateArray[2] = dateArray[2] || parsed[2];
        break;
      case "jD":
      case "jDD":
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
    if (calendar === CALENDAR) return gregorian_to_persian(this._date)[0];

    return year.call(this, calendar);
  };

  const month = proto.month;
  proto.month = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) return gregorian_to_persian(this._date)[1] - 1;

    return month.call(this, calendar);
  };

  const day = proto.day;
  proto.day = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) return gregorian_to_persian(this._date)[2];

    return day.call(this, calendar);
  };

  const daysInMonth = proto.daysInMonth;
  proto.daysInMonth = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) {
      const month = this.month(CALENDAR);

      if (month < 6) return 31;

      if (month < 11) return 30;

      if (this.isLeapYear(CALENDAR)) return 30;

      return 29;
    }

    return daysInMonth.call(this, calendar);
  };

  const add = proto.add;
  proto.add = function (value: string | number, unit: Carbon.ManipulationUnit | "jY" | "jM" | "jYear" | "jMonth") {
    switch (unit) {
      case "jY":
      case "jYear":
        return this.set("jY", this.year(CALENDAR) + (+value));
      case "jM":
      case "jMonth":
        return this.set("jM", this.month(CALENDAR) + (+value));
      default:
        return add.call(this, value, unit);
    }
  };

  const set = proto.set;
  proto.set = function (
    this: Carbon,
    unit: Carbon.Unit | "weekday" | "jY" | "jM" | "jD" | "jYear" | "jMonth" | "jDay",
    value: number) {
    const set_index = (index: number) => jalaali_set.call(this, index, value);

    switch (unit) {
      case "jY":
      case "jYear":
        return set_index(0);
      case "jM":
      case "jMonth":
        return set_index(1);
      case "jD":
      case "jDay":
        return set_index(2);
      default:
        return set.call(this, unit, value);
    }
  };

  const startOf = proto.startOf;
  proto.startOf = function (this: Carbon, unit: Carbon.ManipulationUnit | "jY" | "jM" | "jYear" | "jMonth") {
    let carbon = this;

    switch (unit) {
      case "jY":
      case "jYear":
        carbon = carbon.set("jD", 1).set("jM", 0);
      case "jM":
      case "jMonth":
        return carbon.set("jD", 1).startOf("d");
      default:
        return startOf.call(carbon, unit);
    }
  };

  const endOf = proto.endOf;
  proto.endOf = function (this: Carbon, unit: Carbon.ManipulationUnit | "jY" | "jM" | "jYear" | "jMonth") {
    let carbon = this;

    switch (unit) {
      case "jY":
      case "jYear":
        carbon = carbon.set("jD", 1).set("jM", 11);
      case "jM":
      case "jMonth":
        return carbon.set("jD", carbon.daysInMonth(CALENDAR)).endOf("d");
      default:
        return endOf.call(carbon, unit);
    }
  };

  const dayOfYear = proto.dayOfYear;
  proto.dayOfYear = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) {
      const persianCalendar = gregorian_to_persian(this._date);

      const year = persianCalendar[0];

      return persian_to_jd(year, persianCalendar[1], persianCalendar[2]) - persian_to_jd(year, 1, 1) + 1;
    }

    return dayOfYear.call(this, calendar);
  };

  const isLeapYear = proto.isLeapYear;
  proto.isLeapYear = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) {
      const year = this.year(CALENDAR);

      return (persian_to_jd(year + 1, 1, 1) - persian_to_jd(year, 1, 1)) > 365;
    }

    return isLeapYear.call(this, calendar);
  };

  const weekOfYear = proto.weekOfYear;
  proto.weekOfYear = function (this: Carbon, calendar?: string) {
    if (calendar === CALENDAR) {
      let daysToDayOfWeek = 12 - this._weekday;

      if (daysToDayOfWeek > 6) daysToDayOfWeek -= 7;

      return Math.ceil(this.add(daysToDayOfWeek, "d").dayOfYear(CALENDAR) / 7);
    }

    return weekOfYear.call(this, calendar);
  };

  const format = proto.format;
  proto.format = function (this: Carbon, formatStr = FORMAT_DEFAULT) {
    const result = formatStr.replace(/\[.*?\]|jYYYY|jYY|jM{1,4}|jDD?/g, (match) => {
      if (match.indexOf("[") > -1) return match;
      let result = "";

      switch (match) {
        case "jYY":
          result = `${this.year(CALENDAR)}`.slice(2);
          break;
        case "jYYYY":
          result = `${this.year(CALENDAR)}`;
          break;
        case "jM":
        case "jMM":
          result = utils.padStart(`${this.month(CALENDAR) + 1}`, match === "jM" ? 1 : 2, "0");
          break;
        case "jMMM":
          result = getMonths(this._localeName)[this.month(CALENDAR)].slice(0, 3);
          break;
        case "jMMMM":
          result = getMonths(this._localeName)[this.month(CALENDAR)];
          break;
        case "jD":
        default: // jDD
          result = utils.padStart(`${this.day(CALENDAR)}`, match === "jD" ? 1 : 2, "0");
      }

      return `[${result}]`;
    });

    return format.call(this, result);
  };
};

export = jalaaliCalendar;
