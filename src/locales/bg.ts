import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "bg",
  weekdays: "Неделя_Понеделник_Вторник_Сряда_Четвъртък_Петък_Събота".split("_"),
  months: "Януари_Февруари_Март_Април_Май_Юни_Юли_Август_Септември_Октомври_Ноември_Декември".split("_"),
  ordinal: (n) => `${n}.`,
};

Carbon.locale(locale, false);

export = locale;
