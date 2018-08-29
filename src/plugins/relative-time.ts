import * as CONSTANTS from "../constants";
import * as Carbon from "../index";

module relativeTime { }

const T = [
  { l: "s", r: 44, d: CONSTANTS.SECOND },
  { l: "m", r: 89 },
  { l: "mm", r: 44, d: CONSTANTS.MINUTE },
  { l: "h", r: 89 },
  { l: "hh", r: 21, d: CONSTANTS.HOUR },
  { l: "d", r: 35 },
  { l: "dd", r: 25, d: CONSTANTS.DAY },
  { l: "M", r: 45 },
  { l: "MM", r: 10, d: CONSTANTS.MONTH },
  { l: "y", r: 17 },
  { l: "yy", d: CONSTANTS.YEAR },
];
const Tl = T.length;

const fromTo = (input: Carbon.CarbonInput, withoutSuffix = false, instance: Carbon, isFrom = false) => {
  const loc = (instance as any)._locale.relativeTime;
  let result!: number;
  let out;

  for (let i = 0; i < Tl; i += 1) {
    const t = T[i];

    if (t.d) result = isFrom
      ? Carbon.parse(input).diff(instance, t.d as any, true)
      : instance.diff(input, t.d as any, true);

    const abs = Math.ceil(Math.abs(result));

    if (abs <= (t.r as any) || !t.r) {
      out = loc[t.l].replace("%d", abs);
      break;
    }
  }

  if (withoutSuffix) return out;

  return ((result > 0) ? loc.future : loc.past).replace("%s", out);
};

const relativeTime: Carbon.Plugin = (Base) => {
  (Base as any)._en.relativeTime = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  };

  const proto = Base.prototype;

  proto.from = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this);
  };

  proto.to = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this, true);
  };

  proto.fromNow = function (withoutSuffix) {
    return this.from(Carbon.parse(), withoutSuffix);
  };

  proto.toNow = function (withoutSuffix) {
    return this.to(Carbon.parse(), withoutSuffix);
  };
};

export = relativeTime;
