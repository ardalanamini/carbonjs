import * as Carbon from "../index";
import { leap_gregorian } from "./utils/calendars";

module leapYear { }

const leapYear: Carbon.Plugin = (Base) => {
  Base.prototype.isLeapYear = function (this: Carbon) {
    return leap_gregorian(this._year);
  };
};

export = leapYear;
