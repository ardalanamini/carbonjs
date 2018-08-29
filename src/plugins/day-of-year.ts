import * as Carbon from "../index";

module dayOfYear { }

const dayOfYear: Carbon.Plugin = (Base) => {
  Base.prototype.dayOfYear = function (this: Carbon) {
    return Math.floor((this.valueOf() - new Date(this._year, 0, 0).valueOf()) / (1000 * 60 * 60 * 24));
  };
};

export = dayOfYear;
