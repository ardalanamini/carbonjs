import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "fa",
  weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
  weekdaysMin: "ش_ی_د_س_چ_پ_ج".split("_"),
  months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
};

Carbon.locale(locale, false);

export = locale;
