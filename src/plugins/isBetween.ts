import * as Carbon from "../index";

module isBetween { }

const isBetween: Carbon.Plugin = (Base) => {
  Base.prototype.isBetween = function(this: Carbon, from: Carbon.CarbonInput, to: Carbon.CarbonInput) {
    // from = Base.parse(from);
    // to = Base.parse(to);

    return (this.isAfter(from) && this.isBefore(to)) || (this.isBefore(from) && this.isAfter(to));
  };
};

export = isBetween;
