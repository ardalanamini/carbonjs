import * as Carbon from "../index";

module leapYear { }

const leapYear: Carbon.Plugin = (Base) => {
  Base.prototype.isLeapYear = function (this: Carbon) {
    const year = this._year;

    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
  };
};

export = leapYear;
