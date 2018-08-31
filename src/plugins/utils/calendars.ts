import * as astro from "./astro";

/*
       JavaScript functions for the Fourmilab Calendar Converter

                  by John Walker  --  September, MIM
              http://www.fourmilab.ch/documents/calendar/

                This program is in the public domain.
*/

/*  You may notice that a variety of array variables logically local
    to functions are declared globally here.  In JavaScript, construction
    of an array variable from source code occurs as the code is
    interpreted.  Making these variables pseudo-globals permits us
    to avoid overhead constructing and disposing of them in each
    call on the function in which whey are used.  */

//  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?

export const leap_gregorian = (year: number) => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

//  GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date

const GREGORIAN_EPOCH = 1721425.5;

export const gregorian_to_jd = (year: number, month: number, day: number) => (GREGORIAN_EPOCH - 1) +
  (365 * (year - 1)) +
  Math.floor((year - 1) / 4) +
  (-Math.floor((year - 1) / 100)) +
  Math.floor((year - 1) / 400) +
  Math.floor((((367 * month) - 362) / 12) +
    ((month <= 2) ? 0 :
      (leap_gregorian(year) ? -1 : -2)
    ) +
    day);

//  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

export const jd_to_gregorian = (jd: number) => {
  const wjd = Math.floor(jd - 0.5) + 0.5;
  const depoch = wjd - GREGORIAN_EPOCH;
  const quadricent = Math.floor(depoch / 146097);
  const dqc = astro.mod(depoch, 146097);
  const cent = Math.floor(dqc / 36524);
  const dcent = astro.mod(dqc, 36524);
  const quad = Math.floor(dcent / 1461);
  const dquad = astro.mod(dcent, 1461);
  const yindex = Math.floor(dquad / 365);
  let year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;

  if (!((cent === 4) || (yindex === 4))) year++;

  const yearday = wjd - gregorian_to_jd(year, 1, 1);
  const leapadj = ((wjd < gregorian_to_jd(year, 3, 1)) ? 0
    :
    (leap_gregorian(year) ? 1 : 2)
  );

  const month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
  const day = (wjd - gregorian_to_jd(year, month, 1)) + 1;

  return [year, month, day];
};
