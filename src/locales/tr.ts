import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "tr",
  weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
  months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
  relativeTime: {
    future: "%s sonra",
    past: "%s önce",
    s: "birkaç saniye",
    m: "bir dakika",
    mm: "%d dakika",
    h: "bir saat",
    hh: "%d saat",
    d: "bir gün",
    dd: "%d gün",
    M: "bir ay",
    MM: "%d ay",
    y: "bir yıl",
    yy: "%d yıl",
  },
  ordinal: (n) => `${n}.`,
};

Carbon.locale(locale, false);

export = locale;
