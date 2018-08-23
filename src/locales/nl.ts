import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "nl",
  weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
  months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
  relativeTime: {
    future: "over %s",
    past: "%s geleden",
    s: "een paar seconden",
    m: "een minuut",
    mm: "%d minuten",
    h: "een uur",
    hh: "%d uren",
    d: "een dag",
    dd: "%d dagen",
    M: "een maand",
    MM: "%d maanden",
    y: "een jaar",
    yy: "%d jaren",
  },
  ordinal: (n) => `${n}.`,
};

Carbon.locale(locale, false);

export = locale;
