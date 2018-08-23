import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "da",
  weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
  months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "få sekunder",
    m: "et minut",
    mm: "%d minutter",
    h: "en time",
    hh: "%d timer",
    d: "en dag",
    dd: "%d dage",
    M: "en måned",
    MM: "%d måneder",
    y: "et år",
    yy: "%d år",
  },
  ordinal: (n) => `${n}.`,
};

Carbon.locale(locale, false);

export = locale;
