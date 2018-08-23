import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "ja",
  weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
  months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  relativeTime: {
    future: "%s後",
    past: "%s前",
    s: "数秒",
    m: "1分",
    mm: "%d分",
    h: "1時間",
    hh: "%d時間",
    d: "1日",
    dd: "%d日",
    M: "1ヶ月",
    MM: "%dヶ月",
    y: "1年",
    yy: "%d年",
  },
  ordinal: (n) => `${n}日`,
};

Carbon.locale(locale, false);

export = locale;
