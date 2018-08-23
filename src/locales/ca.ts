import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "ca",
  weekdays: "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),
  months: "Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),
  relativeTime: {
    future: "en %s",
    past: "fa %s",
    s: "uns segons",
    m: "un minut",
    mm: "%d minuts",
    h: "una hora",
    hh: "%d hores",
    d: "un dia",
    dd: "%d dies",
    M: "un mes",
    MM: "%d mesos",
    y: "un any",
    yy: "%d anys",
  },
  ordinal: (n) => `${n}º`,
};

Carbon.locale(locale, false);

export = locale;
