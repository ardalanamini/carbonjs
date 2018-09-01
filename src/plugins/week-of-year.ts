import { YEAR, DAY, WEEK, MILLISECOND } from "../constants";
import * as Carbon from "../index";

module weekOfYear { }

const weekOfYear: Carbon.Plugin = (Base) => {
  Base.prototype.weekOfYear = function (this: Carbon) {
    const endOfYear = this.endOf(YEAR);

    if (endOfYear.weekday() !== 6 && this._month === 11 && (31 - this._day) <= endOfYear.weekday())
      return 1;

    const startOfYear = this.startOf(YEAR);

    return Math.ceil(
      this.diff(
        startOfYear
          .subtract(startOfYear.weekday(), DAY)
          .subtract(1, MILLISECOND),
        WEEK,
        true
      )
    );
  };
};

export = weekOfYear;
