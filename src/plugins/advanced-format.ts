import * as Carbon from "../index";
import { FORMAT_DEFAULT } from "../constants";
import * as utils from "../utils";

module leapYear { }

const s = ["th", "st", "nd", "rd"];

const leapYear: Carbon.Plugin = (Base) => {
  (Base as any)._en.ordinal = (n: number) => {
    const v = n % 100;

    return `[${n}${(s[(v - 20) % 10] || s[v] || s[0])}]`;
  };

  const proto = Base.prototype;

  const format = proto.format;
  proto.format = function (this: Carbon, formatStr = FORMAT_DEFAULT) {
    const result = formatStr.replace(/Q|Do|X|x|kk?|S/g, (match) => {
      switch (match) {
        case "Q":
          return Math.ceil((this._month + 1) / 3);
        case "Do":
          return (this._locale as any).ordinal(this._day);
        case "k":
        case "kk":
          return utils.padStart(`${this._hours === 0 ? 24 : this._hours}`, match === "k" ? 1 : 2, "0");
        case "X":
          return Math.floor(this._date.getTime() / 1000);
        default: // "x"
          return this._date.getTime();
      }
    });

    return format.call(this, result);
  };
};

export = leapYear;
