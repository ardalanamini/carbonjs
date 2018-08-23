import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "sv",
  weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
  months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
  relativeTime: {
    future: "om %s",
    past: "för %s sedan",
    s: "några sekunder",
    m: "en minut",
    mm: "%d minuter",
    h: "en timme",
    hh: "%d timmar",
    d: "en dag",
    dd: "%d dagar",
    M: "en månad",
    MM: "%d månader",
    y: "ett år",
    yy: "%d år",
  },
  ordinal: (n) => {
    const b = (+n) % 10;

    return `${n}${(b === 1) || (b === 2) ? "a" : "e"}`;
  },
};

Carbon.locale(locale, false);

export = locale;
