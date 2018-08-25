import * as Carbon from "../index";

module leapYear { }

const leapYear: Carbon.Plugin = (Base) => {
  Base.prototype.isLeapYear = function(this: Carbon) {
    return ((this._year % 4 === 0) && (this._year % 100 !== 0)) || (this._year % 400 === 0);
  };
};

export = leapYear;
