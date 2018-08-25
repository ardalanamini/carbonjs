export const SECONDS_A_MINUTE = 60;
export const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
export const SECONDS_A_DAY = SECONDS_A_HOUR * 24;
export const SECONDS_A_WEEK = SECONDS_A_DAY * 7;

export const MILLISECONDS_A_SECOND = 1e3;
export const MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;

// English locales
export const MILLISECOND = "millisecond";
export const SECOND = "second";
export const MINUTE = "minute";
export const HOUR = "hour";
export const DAY = "day";
export const WEEK = "week";
export const MONTH = "month";
export const QUARTER = "quarter";
export const YEAR = "year";
export const WEEKDAY = "weekday";

export const FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";

// regex
export const PARSE_REGEX = /\[.*\]|[^,<>./?'";:\\|\[\]{}=+\-_()*&^%$#@!`~ ]+/g;
export const REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})(.*?(\d{1,2}):(\d{1,2}):(\d{1,2}))?.?(\d{1,3})?$/;
export const REGEX_FORMAT = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
